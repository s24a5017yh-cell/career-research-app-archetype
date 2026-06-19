const express = require('express');
const cors = require('cors');
const axios = require('axios');
const cheerio = require('cheerio');
const dotenv = require('dotenv');

// .env から環境変数を読み込む（念のため）
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// 静的ファイルの配信 (HTML/CSS/JS)
app.use(express.static(__dirname));

// URLから本文テキストを抽出する関数
async function fetchUrlText(url) {
  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'ja,en-US;q=0.9,en;q=0.8'
      },
      timeout: 15000
    });
    
    const $ = cheerio.load(response.data);
    
    // 不要な要素（ナビゲーション、スクリプト、スタイル、広告など）を徹底的に排除
    $('script, style, nav, footer, header, iframe, noscript, .header, .footer, #header, #footer, ads, .ads, .navigation').remove();
    
    // 主要テキストの抽出
    let text = $('body').text();
    // 余計なホワイトスペース、改行の削減
    text = text.replace(/\s+/g, ' ').replace(/\n+/g, ' ').trim();
    
    // LLMのコンテキスト長制限に合わせて切り出し（約12000文字）
    return text.substring(0, 12000);
  } catch (error) {
    console.error(`Fetch URL Error (${url}):`, error.message);
    throw new Error(`指定されたURL (${url}) の取得に失敗しました。CORS保護またはアクセス拒否の可能性があります。`);
  }
}

// Yahoo!ファイナンスから上場企業の有報ベース一次情報を取得する関数
async function fetchYahooFinanceData(securityCode) {
  const result = {
    turnover: null,
    tenure: null,
    age: null,
    genderRatio: null,
    salary: null,
    employeeCount: null,
    financials: {
      years: [],
      sales: [],
      profit: []
    },
    competitors: {
      names: [],
      shares: []
    }
  };

  if (!securityCode || !/^\d{4}$/.test(securityCode)) {
    return result; // 証券コードが不正な場合は空で返す（捏造しない）
  }

  try {
    // 1. プロフィール情報（年収、年齢、勤続年数）の取得
    const profileUrl = `https://finance.yahoo.co.jp/quote/${securityCode}.T/profile`;
    const profileRes = await axios.get(profileUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      timeout: 10000
    });
    
    const $ = cheerio.load(profileRes.data);
    
    $('table tr').each((i, el) => {
      const header = $(el).find('th').text().trim();
      const value = $(el).find('td').text().trim();
      
      if (header.includes('平均年齢')) {
        result.age = value; // 例: "40.8歳"
      } else if (header.includes('平均勤続年数')) {
        result.tenure = value; // 例: "16.4年"
      } else if (header.includes('平均年間給与') || header.includes('平均年収')) {
        result.salary = value; // 例: "8,954,000円"
      } else if (header.includes('従業員数')) {
        result.employeeCount = value;
      }
    });

    // 2. 業績推移（売上・営業利益）の取得
    const financialsUrl = `https://finance.yahoo.co.jp/quote/${securityCode}.T/financials`;
    const financialsRes = await axios.get(financialsUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      timeout: 10000
    });
    
    const $fin = cheerio.load(financialsRes.data);
    const rawYears = [];
    const rawSales = [];
    const rawProfit = [];

    // ヤフー財務ページの決算期、売上高、営業利益行を探す
    $fin('table tr').each((i, el) => {
      const rowHeader = $fin(el).find('td, th').first().text().trim();
      const cells = [];
      $fin(el).find('td, th').slice(1).each((j, cell) => {
        cells.push($fin(cell).text().trim());
      });

      if (rowHeader.includes('決算期') || rowHeader.includes('期間') || rowHeader.includes('決算年月')) {
        rawYears.push(...cells);
      } else if (rowHeader.includes('売上高') || rowHeader.includes('売上収益')) {
        rawSales.push(...cells);
      } else if (rowHeader.includes('営業利益') || rowHeader.includes('営業損失')) {
        rawProfit.push(...cells);
      }
    });

    // クリーンアップして3-5年分を格納
    if (rawYears.length > 0) {
      result.financials.years = rawYears.filter(y => y !== '').slice(-5);
      result.financials.sales = rawSales.filter(s => s !== '').map(s => parseToNumber(s)).slice(-5);
      result.financials.profit = rawProfit.filter(p => p !== '').map(p => parseToNumber(p)).slice(-5);
    }
  } catch (error) {
    console.error(`Yahoo Finance Scraping Error (${securityCode}):`, error.message);
    // エラーの場合は空データを返し、絶対にハルシネーション（捏造）しない
  }

  return result;
}

// 数値パースヘルパー (万円・億円対応)
function parseToNumber(str) {
  const cleanStr = str.replace(/,/g, '').replace(/円/g, '').trim();
  let num = parseFloat(cleanStr);
  if (str.includes('億')) {
    num = parseFloat(cleanStr.replace(/億/g, ''));
  } else if (str.includes('百万')) {
    num = parseFloat(cleanStr.replace(/百万/g, '')) / 100;
  } else if (!isNaN(num) && num > 10000) {
    num = num / 100000000; // 億円単位に変換
  }
  return isNaN(num) ? null : Math.round(num * 10) / 10;
}

// スクレイピング専用エンドポイント (APIキーは送受信しない)
app.post('/api/scrape', async (req, res) => {
  const { url, securityCode } = req.body;

  if (!url) {
    return res.status(400).json({ error: "URLは必須です。" });
  }

  try {
    console.log(`[Scrape] Fetching text from URL: ${url}`);
    const sourceText = await fetchUrlText(url);

    let scrapedMetrics = null;
    if (securityCode) {
      console.log(`[Scrape] Scraping Yahoo Finance for code: ${securityCode}`);
      scrapedMetrics = await fetchYahooFinanceData(securityCode);
    }

    return res.json({
      sourceText,
      scrapedMetrics
    });
  } catch (error) {
    console.error("API Scrape Error:", error);
    return res.status(500).json({ error: error.message || "データスクレイピング中にエラーが発生しました。" });
  }
});

app.listen(PORT, () => {
  console.log(`--------------------------------------------------`);
  console.log(`ARCHETYPE Scraper Server is running on http://localhost:${PORT}`);
  console.log(`This server handles only CORS bypass scraping and contains no API keys.`);
  console.log(`--------------------------------------------------`);
});
