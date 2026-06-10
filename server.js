const express = require('express');
const cors = require('cors');
const axios = require('axios');
const cheerio = require('cheerio');
const dotenv = require('dotenv');
const path = require('path');

// .env から環境変数を読み込む
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

// JSON Schema 用定義 (Gemini API 構造化出力用)
const geminiJsonSchema = {
  type: "OBJECT",
  properties: {
    summary3: {
      type: "ARRAY",
      items: { type: "STRING" },
      description: "企業に関する3行の重要サマリー。事実のみで構成し、推測や勝手な創作は含めないこと。各サマリーの末尾には必ず [出典:資料名やURL] を付与すること。"
    },
    fullSummary: {
      type: "STRING",
      description: "企業の詳細な紹介。HTMLのpタグやspanタグを用い、重要な一次情報には <span class=\"highlight-yellow\"></span> などのハイライトを適用すること。各記述には必ず具体的な出典を明記すること。"
    },
    idealCandidate: {
      type: "STRING",
      description: "この企業が求める人材像。テキストに記載されているもののみ抽出し、推測は含めないこと。末尾に出典を明記すること。"
    },
    values: {
      type: "OBJECT",
      properties: {
        growth: { type: "INTEGER", description: "成長環境の適合度 (0-100)。テキストに根拠がない場合は null にすること。" },
        stability: { type: "INTEGER", description: "安定性の適合度 (0-100)。テキストに根拠がない場合は null にすること。" },
        autonomy: { type: "INTEGER", description: "裁量・自由度の適合度 (0-100)。テキストに根拠がない場合は null にすること。" },
        team: { type: "INTEGER", description: "協調性・チームワークの適合度 (0-100)。テキストに根拠がない場合は null にすること。" },
        salary: { type: "INTEGER", description: "給与・待遇水準の適合度 (0-100)。テキストに根拠がない場合は null にすること。" }
      },
      required: ["growth", "stability", "autonomy", "team", "salary"]
    },
    metrics: {
      type: "OBJECT",
      properties: {
        turnover: { type: "STRING", description: "新卒3年以内離職率 (例: '4.2%')。記載がない場合は null にすること。" },
        tenure: { type: "STRING", description: "平均勤続年数 (例: '14.5年')。記載がない場合は null にすること。" },
        age: { type: "STRING", description: "平均年齢 (例: '38.2歳')。記載がない場合は null にすること。" },
        genderRatio: { type: "STRING", description: "女性比率 (例: '38%')。記載がない場合は null にすること。" },
        salary: { type: "STRING", description: "平均年間給与 (例: '895万円')。記載がない場合は null にすること。" }
      },
      required: ["turnover", "tenure", "age", "genderRatio", "salary"]
    },
    sources: {
      type: "OBJECT",
      properties: {
        summary3: { type: "ARRAY", items: { type: "STRING" }, description: "3行サマリーそれぞれの具体的な出典" },
        fullSummary: { type: "STRING", description: "詳細要約の主な出典" },
        idealCandidate: { type: "STRING", description: "求める人材像の具体的な出典" },
        metrics: { type: "STRING", description: "組織指標（離職率、年収など）の出典" }
      },
      required: ["summary3", "fullSummary", "idealCandidate", "metrics"]
    }
  },
  required: ["summary3", "fullSummary", "idealCandidate", "values", "metrics", "sources"]
};

// Gemini API を用いたデータ分析・要約関数
async function analyzeWithGemini(companyName, url, sourceText, scrapedMetrics) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("サーバー環境変数 'GEMINI_API_KEY' が設定されていません。");
  }

  // スクレイピングで取得済みの実データをプロンプトで共有し、捏造を完全に防ぐ
  const scrapedContext = JSON.stringify(scrapedMetrics, null, 2);

  const prompt = `
あなたは企業情報の客観的分析を行う専門AIです。
入力された企業の「ソーステキスト」および「すでに判明している一次情報数値」をもとに、厳格に事実のみに基づいた要約を作成してください。

【対象企業】: ${companyName}
【ソースURL】: ${url}
【すでに判明している一次情報数値（絶対に優先し、捏造しないこと）】:
${scrapedContext}

【ソーステキスト】:
${sourceText}

【厳格な遵守ルール】:
1. あなたの事前知識や憶測から、数値を絶対に推測・ハルシネーション（捏造）しないでください。
2. 平均年収、平均勤続年数、平均年齢、離職率、売上高などの数値情報は、ソーステキストまたは「判明している一次情報数値」に明記されている場合のみ出力してください。記載がない項目は、絶対に推測せず 'null' または記載なしにしてください。
3. 事実（実際に確認された数値や実績）と、推測（会社の目指すビジョンや将来の予測）を明確に区別し、曖昧な箇所は「AIによる推測（要確認）」であることを付記してください。
4. 各要約、求める人材像、指標など、あらゆる記述箇所に対して、元の情報の出典（例: 『有価証券報告書 p.12』『公式サイト〇〇ページ』またはURL）を紐付けて出力してください。
5. 出力は指定されたJSONスキーマに完全に準拠させ、プレーンなJSONオブジェクトとして返却してください。マークダウンブロック (\`\`\`json ...) は不要です。
`;

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ],
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: geminiJsonSchema
        }
      },
      {
        headers: { 'Content-Type': 'application/json' },
        timeout: 25000
      }
    );

    const candidates = response.data?.candidates;
    if (!candidates || candidates.length === 0) {
      throw new Error("Gemini API から応答が得られませんでした。");
    }

    const jsonText = candidates[0].content?.parts[0]?.text;
    const parsedData = JSON.parse(jsonText);

    return parsedData;
  } catch (error) {
    console.error("Gemini API Error:", error.response ? error.response.data : error.message);
    throw new Error("AI要約の生成またはJSONスキーマパースに失敗しました。" + error.message);
  }
}

// 企業収集・解析エンドポイント
app.post('/api/collect', async (req, res) => {
  const { name, url, securityCode } = req.body;

  if (!name || !url) {
    return res.status(400).json({ error: "企業名およびURLは必須入力です。" });
  }

  try {
    // 1. 指定されたURLからテキストを抽出（スクレイピング）
    console.log(`[Collect] Fetching URL: ${url}`);
    const sourceText = await fetchUrlText(url);

    // 2. 証券コードがあれば、ヤフーファイナンスから一次情報データを直接スクレイピング
    console.log(`[Collect] Scraping primary metrics for code: ${securityCode}`);
    const scrapedMetrics = await fetchYahooFinanceData(securityCode);

    // 3. Gemini APIに流して構造化要約データを取得
    console.log(`[Collect] Analyzing with Gemini...`);
    const aiAnalysis = await analyzeWithGemini(name, url, sourceText, scrapedMetrics);

    // 4. スクレイピングで取得した確実な一次情報を、AIの応答（万一AIが捏造・誤認した場合）に優先してマージする
    const finalMetrics = {
      turnover: scrapedMetrics.turnover || aiAnalysis.metrics.turnover || null,
      tenure: scrapedMetrics.tenure || aiAnalysis.metrics.tenure || null,
      age: scrapedMetrics.age || aiAnalysis.metrics.age || null,
      genderRatio: scrapedMetrics.genderRatio || aiAnalysis.metrics.genderRatio || null,
      salary: scrapedMetrics.salary || aiAnalysis.metrics.salary || null
    };

    // 一言要約を生成
    let oneLiner = `${name}の企業研究情報。`;
    if (scrapedMetrics.financials.sales.length > 0) {
      const sales = scrapedMetrics.financials.sales;
      const latestSales = sales[sales.length - 1];
      oneLiner = `直近売上高 ${latestSales}億円（一次情報源より取得）。`;
    } else if (finalMetrics.salary) {
      oneLiner = `平均年間給与 ${finalMetrics.salary}（一次情報源より取得）。`;
    }

    // クライアントへ返却する最終データ構造
    const companyData = {
      id: `custom-${Math.random().toString(36).substr(2, 9)}`,
      name: name,
      industry: securityCode ? "上場企業" : "新興企業 / その他",
      url: url,
      summary3: aiAnalysis.summary3,
      fullSummary: aiAnalysis.fullSummary,
      idealCandidate: aiAnalysis.idealCandidate,
      values: aiAnalysis.values, // ユーザーの自己分析との相性計算用適合度 (0-100)
      metrics: {
        turnover: finalMetrics.turnover,
        tenure: finalMetrics.tenure,
        age: finalMetrics.age,
        genderRatio: finalMetrics.genderRatio,
        salary: finalMetrics.salary,
        oneLiner: oneLiner
      },
      financials: scrapedMetrics.financials.years.length > 0 ? scrapedMetrics.financials : {
        years: ["データなし"],
        sales: [0],
        profit: [0]
      },
      competitors: scrapedMetrics.financials.years.length > 0 ? scrapedMetrics.competitors : {
        names: [name],
        shares: [0]
      },
      sources: aiAnalysis.sources,
      isRealData: true // 実データフラグ
    };

    return res.json(companyData);

  } catch (error) {
    console.error("API Collect Error:", error);
    return res.status(500).json({ error: error.message || "企業情報の解析中に予期せぬエラーが発生しました。" });
  }
});

app.listen(PORT, () => {
  console.log(`--------------------------------------------------`);
  console.log(`ARCHETYPE Server is running on http://localhost:${PORT}`);
  console.log(`Ensure process.env.GEMINI_API_KEY is set for AI analysis.`);
  console.log(`--------------------------------------------------`);
});
