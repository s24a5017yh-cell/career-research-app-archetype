/* ARCHETYPE - Application Logic & State Management */

// ==========================================================================
// 1. Initial Mock Database (Preserving detailed and realistic information)
// ==========================================================================
const DEFAULT_COMPANIES = [
  {
    id: "tech-frontier",
    name: "TechFrontier",
    industry: "IT・ソフトウェア",
    url: "https://example.com/tech-frontier",
    summary3: [
      "最先端AIとクラウドソリューションを提供する、創業10年の急成長ITベンチャー。",
      "「若手に権限を委譲する」風土が徹底しており、新卒1年目から主担当プロジェクトを牽引可能。",
      "リモートワーク率85%、フレックスタイム制など、個人の自律性を重んじる自由度の高い就業環境。"
    ],
    fullSummary: `
      <p>TechFrontierは、ディープラーニングおよびLLMの技術を中核に、製造業から金融業まで幅広い企業のDXを強力に推進するテクノロジーカンパニーです。設立わずか10年でありながら、業界のゲームチェンジャーとして頭角を現し、昨年東証グロース市場へ上場を果たしました。</p>
      <p>同社の最大の特徴は、<span class="highlight-yellow">フラットな組織構造とスピード重視の意思決定</span>にあります。年功序列は一切なく、本質的な成果と技術力に基づき評価されるため、入社2年目でマネージャーや海外支社立ち上げに抜擢される例も珍しくありません。</p>
      <p>一方で、市場競争が激しく技術トレンドの移り変わりが速いため、常に自己学習を継続する姿勢が求められます。安定したマニュアル通りの業務を好む学生にとってはプレッシャーが大きい一方、<span class="highlight-blue">「どこでも通用する汎用的な技術者・事業家になりたい」という強い成長意欲を持つ就活生には最良の環境</span>です。</p>
    `,
    idealCandidate: "未知の課題に対して自ら仮説を立て、泥臭く挑戦し続けられる人。知的好奇心が高く、新しい技術を貪欲に吸収できる人。他者の強みを尊重し、チームで相乗効果を発揮できる人。",
    values: {
      growth: 95,      // 成長環境
      stability: 45,   // 安定性
      autonomy: 90,    // 裁量・自由度
      team: 70,        // チーム・社風
      salary: 80       // 給与・待遇
    },
    metrics: {
      turnover: "4.2%",
      tenure: "4.1年", // 若い会社なので短い
      age: "29.8歳",
      genderRatio: "32%",
      oneLiner: "業界シェア急上昇、3年で売上3.2倍の超成長AI企業。"
    },
    financials: {
      years: ["2022", "2023", "2024", "2025", "2026 (見込)"],
      sales: [12.4, 21.8, 38.5, 62.1, 98.4], // 億円
      profit: [1.1, 2.5, 4.8, 8.2, 14.5]    // 億円
    },
    competitors: {
      names: ["TechFrontier", "A社 (競合)", "B社 (競合)", "C社 (業界大手)"],
      shares: [98.4, 65.0, 42.0, 180.0] // 売上高（億円）
    }
  },
  {
    id: "nexus-life",
    name: "NexusLife 製薬",
    industry: "メーカー・医薬品",
    url: "https://example.com/nexus-life",
    summary3: [
      "グローバル展開に強みを持つ準大手医薬品メーカーで、新薬開発力に高い評価。",
      "業界最高水準の財務基盤を有し、非常に高い従業員の平均年収と手厚い福利厚生を提供。",
      "長期視点での人材育成が根付いており、メンター制度や各種海外留学支援が充実。"
    ],
    fullSummary: `
      <p>NexusLife製薬は、循環器およびオンコロジー領域に独自の強みを持つ、創業70年の歴史を誇る新薬開発型研究開発企業です。徹底した研究投資を行い、国内外の主要アカデミアと提携して革新的な医療ソリューションを提供しています。</p>
      <p>同社の最大の強みは、<span class="highlight-green">堅牢な財務基盤と長期的な視点での事業経営</span>にあります。医薬品開発は10年単位の長い歳月が必要となるため、企業文化としても腰を据えてじっくりと物事に取り組む姿勢が奨励されます。そのため、個人の短期的な成果を競わせるよりも、<span class="highlight-yellow">協調して長期の研究開発に貢献する協調性</span>が何よりも重視されます。</p>
      <p>待遇面では、家賃補助や保養所、充実した教育研修など、国内屈指の福利厚生を完備しています。離職率が極めて低く、ライフイベント（出産・育児）を経ても安心して働き続けられるため、キャリアの持続可能性は非常に高いです。主体的な急進さよりも、<span class="highlight-blue">社会的意義の高さと、基盤の安定した人生設計を両立したい就活生</span>に向いています。</p>
    `,
    idealCandidate: "人々の生命と健康に真摯に向き合う高い倫理観を持つ人。多様な専門領域の研究者と協働できる対話力を持つ人。粘り強く困難な課題に立ち向かう忍耐力がある人。",
    values: {
      growth: 75,
      stability: 95,
      autonomy: 60,
      team: 85,
      salary: 92
    },
    metrics: {
      turnover: "1.8%",
      tenure: "16.8年",
      age: "42.5歳",
      genderRatio: "28%",
      oneLiner: "営業利益率20%超、終身雇用型で国内最高峰の福利厚生を誇る優良メーカー。"
    },
    financials: {
      years: ["2022", "2023", "2024", "2025", "2026 (見込)"],
      sales: [1850, 1920, 2050, 2120, 2200], // 億円
      profit: [360, 390, 420, 410, 440]
    },
    competitors: {
      names: ["NexusLife", "N社 (業界トップ)", "T社 (競合)", "D社 (競合)"],
      shares: [2200, 4800, 3100, 1950]
    }
  },
  {
    id: "green-energy",
    name: "日本グリーン電力",
    industry: "インフラ・エネルギー",
    url: "https://example.com/green-energy",
    summary3: [
      "脱炭素社会の実現を牽引する再生可能エネルギー特化型のインフラサービス企業。",
      "公共性が非常に高く、事業の永続性とインフラ特有の圧倒的な経営安定性を誇る。",
      "「社会貢献」を軸にする社員が集まり、和を重んじるアットホームで家族的な社風。"
    ],
    fullSummary: `
      <p>日本グリーン電力（JGE）は、風力・太陽光・バイオマス発電などを日本全国に展開し、地域社会と共生する持続可能なエネルギー網を構築しているインフラ企業です。カーボンニュートラルの国策支援を受けており、その安定性は競合他社と比較しても群を抜いています。</p>
      <p>企業文化の根底には、<span class="highlight-blue">「インフラを支えるという強い責任感と使命感」</span>があります。一人で突出すべき仕事は少なく、ほとんどがエンジニア、開発営業、法務、地域社会との調整役が一体となった大規模なチームワークによって推進されます。そのため、社員同士の繋がりが非常に強く、社風は温和でフラットです。</p>
      <p>一方、安全性と確実性が最優先されるインフラ事業であるため、組織のルールや行政との手続き、コンプライアンスの遵守が厳格であり、ベンチャーのような「スピード重視で意思決定し行動する」裁量はありません。じっくりと<span class="highlight-green">社会貢献性の高い仕事をこなしつつ、周囲と助け合って波風の立たないキャリアを築きたい学生</span>に最適です。</p>
    `,
    idealCandidate: "責任感を持って地道な業務をやり遂げられる人。様々な関係者の調整を行いながら、合意形成を図れる人。社会的な使命感を持って地球の未来に貢献したい人。",
    values: {
      growth: 60,
      stability: 98,
      autonomy: 40,
      team: 95,
      salary: 75
    },
    metrics: {
      turnover: "0.9%",
      tenure: "19.2年",
      age: "44.1歳",
      genderRatio: "22%",
      oneLiner: "離職率0.9%、圧倒的インフラ独占による国策支援型の安定経営企業。"
    },
    financials: {
      years: ["2022", "2023", "2024", "2025", "2026 (見込)"],
      sales: [3200, 3250, 3310, 3400, 3450],
      profit: [180, 195, 210, 225, 230]
    },
    competitors: {
      names: ["日本グリーン電力", "大手電力A社", "大手電力B社", "新電力C社"],
      shares: [3450, 18500, 12000, 1500]
    }
  },
  {
    id: "global-finance",
    name: "GlobalFinance 信託銀行",
    industry: "金融・不動産",
    url: "https://example.com/global-finance",
    summary3: [
      "個人・法人向けの高度な資産運用・信託コンサルティングに定評のある大手金融機関。",
      "若手教育が極めて体系化されており、難関資格（証券アナリストなど）の取得支援も充実。",
      "実力主義と高い給与待遇があり、プロフェッショナルとしての誇りを持って働ける環境。"
    ],
    fullSummary: `
      <p>GlobalFinance信託銀行は、預金業務にとどまらず、遺産相続、不動産、年金、M&Aなどの高度なソリューション提供を行う信託のエキスパート集団です。高付加価値な金融コンサルティングを提供し、富裕層や大手法人から絶大な支持を得ています。</p>
      <p>特徴は、<span class="highlight-yellow">知的な成長と高い専門性が求められる環境</span>です。顧客へ提案する内容が多岐にわたるため、若手には金融知識だけでない幅広い見識が求められます。そのため、研修制度は非常に厳しく体系的であり、数年間で高度なプロフェッショナルへと叩き上げられます。</p>
      <p>待遇は<span class="highlight-blue">成果と役職に連動して大きく昇給する実績主義</span>を採用しています。努力がしっかりと給与という目に見える形で還元されるため、高い給与水準を目指す学生の大きなモチベーションとなっています。一方で、金融機関ゆえのコンプライアンスの高さや、一部での厳格な規律が存在します。<span class="highlight-green">「自己を律し、圧倒的な知見で顧客の信頼を勝ち取り、プロとして稼ぎたい」という学生</span>に向いています。</p>
    `,
    idealCandidate: "難解な金融・税法知識を絶えず学習し、自分の言葉で提案できる人。顧客の信頼に応えるための高い責任感と倫理観がある人。目標に向けてロジカルに行動し続けられる人。",
    values: {
      growth: 85,
      stability: 85,
      autonomy: 55,
      team: 65,
      salary: 95
    },
    metrics: {
      turnover: "6.8%",
      tenure: "11.2年",
      age: "37.5歳",
      genderRatio: "41%",
      oneLiner: "平均年収1000万円超、金融のスペシャリストを養成する厳格なる超一流信託銀行。"
    },
    financials: {
      years: ["2022", "2023", "2024", "2025", "2026 (見込)"],
      sales: [8900, 9200, 9500, 9800, 10100],
      profit: [1200, 1310, 1420, 1390, 1500]
    },
    competitors: {
      names: ["GlobalFinance", "M信託", "S信託", "T信託"],
      shares: [10100, 14500, 11200, 8500]
    }
  }
];

// ==========================================================================
// 2. Application State Management
// ==========================================================================
let state = {
  theme: "light",
  currentView: "view-home",
  selectedCompanyId: null,
  companies: [],
  userValues: {
    growth: 20,
    stability: 20,
    autonomy: 20,
    team: 20,
    salary: 20
  },
  userFreeText: {
    vision: "",
    avoid: ""
  },
  compareList: [], // Array of company IDs being compared
  myNotes: {},    // { companyId: { status, rating, feelings, ob, briefing, schedules: [] } }
  charts: {
    financial: null,
    share: null
  }
};

// ==========================================================================
// 3. Helper Functions
// ==========================================================================

// Date Formatting
function getTodayString() {
  const d = new Date();
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
}

// Calculate Compatibility Score (Weighted Average: 0-100)
function calculateCompatibility(companyValues, userWeights) {
  let scoreSum = 0;
  let weightSum = 0;
  
  for (const axis in userWeights) {
    const weight = userWeights[axis];
    const companyVal = companyValues[axis] || 50; // default to 50 if missing
    scoreSum += companyVal * weight;
    weightSum += weight;
  }
  
  if (weightSum === 0) return 0;
  return Math.round(scoreSum / weightSum);
}

// Dynamic Compatibility reasoning generator
function generateReasoningText(company, userWeights) {
  // Sort axes by weight in user profile
  const sortedAxes = Object.keys(userWeights).map(key => ({
    key: key,
    weight: userWeights[key]
  })).sort((a, b) => b.weight - a.weight);

  const topAxis = sortedAxes[0].key;
  const secondAxis = sortedAxes[1].key;

  const axisNames = {
    growth: "「成長環境」",
    stability: "「安定性・経営基盤」",
    autonomy: "「裁量・自由な働き方」",
    team: "「協調性・社風」",
    salary: "「給与・待遇水準」"
  };

  const compValTop = company.values[topAxis];
  const compValSecond = company.values[secondAxis];

  let reasoning = `あなたが最も重視する${axisNames[topAxis]}について、${company.name}は`;

  if (compValTop >= 80) {
    reasoning += `極めて高い実績と風土（自己指標: ${compValTop}%）があり、あなたの価値観と完全に合致しています。`;
  } else if (compValTop >= 60) {
    reasoning += `標準以上の環境（自己指標: ${compValTop}%）が整っており、十分に志望軸を満たし得ます。`;
  } else {
    reasoning += `指標は低め（自己指標: ${compValTop}%）です。`;
    if (compValSecond >= 80) {
      reasoning += `しかし、次に重視される${axisNames[secondAxis]}においては極めて優良（自己指標: ${compValSecond}%）であり、別の角度から強い相性を示しています。`;
      return reasoning;
    }
  }

  // Add sub reasoning
  if (company.values[topAxis] >= 70) {
    if (topAxis === "growth") {
      reasoning += " 若手から主担当として抜擢されるため、短期間での市場価値向上が見込めます。";
    } else if (topAxis === "stability") {
      reasoning += " 国内最高峰の強固な財務体質と終身雇用風土があり、精神的な安定をもって働けます。";
    } else if (topAxis === "autonomy") {
      reasoning += " リモートワーク比率が高く個人の裁量に委ねられているため、自律的なワークスタイルが可能です。";
    } else if (topAxis === "team") {
      reasoning += " 温和で家族的な社員が集まっており、他者との過剰な競争を避け、協力して業務を進められます。";
    } else if (topAxis === "salary") {
      reasoning += " 業界内でも群を抜いた給与水準と、評価基準の明確さがあるため、努力が直接報酬で報われます。";
    }
  }
  
  return reasoning;
}

// Ensure total slider percentage is equal to 100% (Interactive Smart Control)
function balanceSliders(activeSliderId, value) {
  const sliderIds = ["growth", "stability", "autonomy", "team", "salary"];
  const otherSliderIds = sliderIds.filter(id => id !== activeSliderId);
  
  // Calculate remaining amount
  const remaining = 100 - value;
  
  // Get sum of current other sliders
  const currentOtherSum = otherSliderIds.reduce((sum, id) => {
    return sum + parseFloat(document.getElementById(`slider-${id}`).value);
  }, 0);

  if (currentOtherSum === 0) {
    // If all other are zero, distribute remaining equally
    otherSliderIds.forEach(id => {
      const share = Math.round(remaining / otherSliderIds.length);
      document.getElementById(`slider-${id}`).value = share;
      document.getElementById(`val-pct-${id}`).textContent = `${share}%`;
      state.userValues[id] = share;
    });
  } else {
    // Pro-rata distribution based on previous values
    let totalAssigned = 0;
    otherSliderIds.forEach((id, index) => {
      const prevVal = parseFloat(document.getElementById(`slider-${id}`).value);
      let newVal = Math.round((prevVal / currentOtherSum) * remaining);
      
      // Prevent rounding errors on last element
      if (index === otherSliderIds.length - 1) {
        newVal = remaining - totalAssigned;
      }
      
      // Constrain newVal to range [0, 100]
      newVal = Math.max(0, Math.min(100, newVal));
      totalAssigned += newVal;
      
      document.getElementById(`slider-${id}`).value = newVal;
      document.getElementById(`val-pct-${id}`).textContent = `${newVal}%`;
      state.userValues[id] = newVal;
    });
  }

  // Update active slider text
  document.getElementById(`val-pct-${activeSliderId}`).textContent = `${value}%`;
  state.userValues[activeSliderId] = value;

  // Render check
  const total = sliderIds.reduce((sum, id) => sum + parseFloat(document.getElementById(`slider-${id}`).value), 0);
  const totalBar = document.getElementById("slider-total-bar");
  const totalVal = document.getElementById("slider-total-val");
  const totalMsg = document.getElementById("slider-total-msg");

  totalVal.textContent = `${total}%`;
  if (total === 100) {
    totalBar.className = "total-status-bar";
    totalMsg.textContent = "理想的なバランスです。";
  } else {
    totalBar.className = "total-status-bar warning";
    totalMsg.textContent = "合計が100%になるよう、自動で再調整します。";
  }
}

// Balance sliders specifically for the compare view (Quick weight adjust)
function balanceCompareSliders(activeAxis, value) {
  const axes = ["growth", "stability", "autonomy", "team", "salary"];
  const otherAxes = axes.filter(ax => ax !== activeAxis);
  const remaining = 100 - value;
  
  const currentOtherSum = otherAxes.reduce((sum, ax) => {
    return sum + parseFloat(document.getElementById(`cmp-slider-${ax}`).value);
  }, 0);

  if (currentOtherSum === 0) {
    otherAxes.forEach(ax => {
      const share = Math.round(remaining / otherAxes.length);
      document.getElementById(`cmp-slider-${ax}`).value = share;
      document.getElementById(`cmp-pct-${ax}`).textContent = `${share}%`;
      state.userValues[ax] = share;
    });
  } else {
    let totalAssigned = 0;
    otherAxes.forEach((ax, index) => {
      const prevVal = parseFloat(document.getElementById(`cmp-slider-${ax}`).value);
      let newVal = Math.round((prevVal / currentOtherSum) * remaining);
      if (index === otherAxes.length - 1) {
        newVal = remaining - totalAssigned;
      }
      newVal = Math.max(0, Math.min(100, newVal));
      totalAssigned += newVal;
      document.getElementById(`cmp-slider-${ax}`).value = newVal;
      document.getElementById(`cmp-pct-${ax}`).textContent = `${newVal}%`;
      state.userValues[ax] = newVal;
    });
  }
  document.getElementById(`cmp-pct-${activeAxis}`).textContent = `${value}%`;
  state.userValues[activeAxis] = value;

  // Instantly sync main view sliders
  axes.forEach(ax => {
    document.getElementById(`slider-${ax}`).value = state.userValues[ax];
    document.getElementById(`val-pct-${ax}`).textContent = `${state.userValues[ax]}%`;
  });

  // Re-calculate and update comparison table
  renderComparisonTable();
}

// ==========================================================================
// 4. LocalStorage State Syncing
// ==========================================================================
function saveStateToLocalStorage() {
  localStorage.setItem("archetype_state", JSON.stringify({
    theme: state.theme,
    userValues: state.userValues,
    userFreeText: state.userFreeText,
    compareList: state.compareList,
    myNotes: state.myNotes,
    companies: state.companies
  }));
}

function loadStateFromLocalStorage() {
  const saved = localStorage.getItem("archetype_state");
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      state.theme = parsed.theme || "light";
      state.userValues = parsed.userValues || { growth: 20, stability: 20, autonomy: 20, team: 20, salary: 20 };
      state.userFreeText = parsed.userFreeText || { vision: "", avoid: "" };
      state.compareList = parsed.compareList || [];
      state.myNotes = parsed.myNotes || {};
      state.companies = parsed.companies && parsed.companies.length > 0 ? parsed.companies : [...DEFAULT_COMPANIES];
    } catch (e) {
      console.error("Error parsing localstorage state", e);
      state.companies = [...DEFAULT_COMPANIES];
    }
  } else {
    state.companies = [...DEFAULT_COMPANIES];
    // Set initial custom notes for preloaded companies
    state.companies.forEach(comp => {
      state.myNotes[comp.id] = {
        status: "検討中",
        rating: "3",
        feelings: "",
        ob: "",
        briefing: "",
        schedules: [
          { id: Math.random().toString(36).substr(2, 9), date: "2026-06-15", title: "エントリーシート(ES)締切" }
        ]
      };
    });
    saveStateToLocalStorage();
  }
}

// ==========================================================================
// 5. Dynamic Rendering Logic
// ==========================================================================

// Theme Toggling
function applyTheme() {
  document.body.setAttribute("data-theme", state.theme);
  const themeBtn = document.getElementById("theme-toggle");
  if (state.theme === "dark") {
    themeBtn.innerHTML = '<i data-lucide="sun"></i>';
  } else {
    themeBtn.innerHTML = '<i data-lucide="moon"></i>';
  }
  lucide.createIcons();
}

// Render Corporate Cards Grid on Home
function renderCompanyCards() {
  const grid = document.getElementById("company-card-list");
  grid.innerHTML = "";

  // Sort logic
  const sortVal = document.getElementById("home-sort").value;
  let sorted = [...state.companies];

  if (sortVal === "score") {
    sorted.sort((a, b) => {
      const scoreA = calculateCompatibility(a.values, state.userValues);
      const scoreB = calculateCompatibility(b.values, state.userValues);
      return scoreB - scoreA;
    });
  } else if (sortVal === "status") {
    const statusWeight = { "内定": 7, "最終面接": 6, "二次面接": 5, "一次面接": 4, "ES提出済": 3, "ES提出前": 2, "検討中": 1, "選考辞退": 0 };
    sorted.sort((a, b) => {
      const statA = state.myNotes[a.id]?.status || "検討中";
      const statB = state.myNotes[b.id]?.status || "検討中";
      return (statusWeight[statB] || 0) - (statusWeight[statA] || 0);
    });
  } else if (sortVal === "name") {
    sorted.sort((a, b) => a.name.localeCompare(b.name, 'ja'));
  }

  sorted.forEach(comp => {
    const score = calculateCompatibility(comp.values, state.userValues);
    const notes = state.myNotes[comp.id] || { status: "検討中", schedules: [] };
    const hasNoteContent = notes.feelings || notes.ob || notes.briefing;
    
    // Check if status requires highlighting (e.g., active selection)
    const isStatusActive = ["ES提出前", "ES提出済", "一次面接", "二次面接", "最終面接", "内定"].includes(notes.status);

    const card = document.createElement("div");
    card.className = "company-card";
    card.setAttribute("data-id", comp.id);
    card.innerHTML = `
      <div class="card-top">
        <div class="card-meta">
          <span class="card-industry">${comp.industry}</span>
          <h3 class="card-name">${comp.name}</h3>
        </div>
        <div class="score-badge">
          <span class="score-val">${score}</span>
          <span class="score-lbl">相性度</span>
        </div>
      </div>
      <p class="card-summary">${comp.summary3[0]}</p>
      <div class="card-bottom">
        <span class="status-badge ${isStatusActive ? 'highlight' : ''}">${notes.status}</span>
        <span class="card-note-indicator">
          ${hasNoteContent ? '<i data-lucide="file-text" style="width:12px;height:12px;"></i> メモ有' : ''}
          ${notes.schedules?.length > 0 ? `<i data-lucide="calendar" style="width:12px;height:12px;"></i> 予定${notes.schedules.length}` : ''}
        </span>
      </div>
    `;

    // Click handler to open detail page
    card.addEventListener("click", () => {
      openCompanyDetail(comp.id);
    });

    grid.appendChild(card);
  });
  lucide.createIcons();
}

// Render Top Home Reminders chronologically
function renderHomeReminders() {
  const container = document.getElementById("quick-reminders");
  container.innerHTML = "";

  let allEvents = [];
  state.companies.forEach(comp => {
    const notes = state.myNotes[comp.id];
    if (notes && notes.schedules && notes.schedules.length > 0) {
      notes.schedules.forEach(ev => {
        allEvents.push({
          companyName: comp.name,
          companyId: comp.id,
          ...ev
        });
      });
    }
  });

  // Sort by date ascending
  allEvents.sort((a, b) => new Date(a.date) - new Date(b.date));

  // Filter only upcoming or recent events
  const today = new Date();
  today.setHours(0,0,0,0);
  
  const upcomingEvents = allEvents.filter(ev => {
    const evDate = new Date(ev.date);
    return evDate >= today;
  });

  if (upcomingEvents.length === 0) {
    container.innerHTML = `<p class="empty-state">近日中の選考予定・ES締切はありません。</p>`;
    return;
  }

  // Display top 3 events
  upcomingEvents.slice(0, 3).forEach(ev => {
    const evCard = document.createElement("div");
    evCard.className = "reminder-alert-card";
    
    // Add quick link to notes tab on detail
    evCard.addEventListener("click", () => {
      openCompanyDetail(ev.companyId, "tab-notes");
    });
    
    evCard.style.cursor = "pointer";

    const dateFormatted = ev.date.replace(/-/g, '.');
    evCard.innerHTML = `
      <i data-lucide="bell"></i>
      <div>
        <span class="date">${dateFormatted}</span> - 
        <strong>${ev.companyName}</strong> 
        <span>// ${ev.title}</span>
      </div>
    `;
    container.appendChild(evCard);
  });
  lucide.createIcons();
}

// Render Self-Analysis UI Form Inputs
function renderSelfAnalysisForm() {
  const values = state.userValues;
  const axes = ["growth", "stability", "autonomy", "team", "salary"];

  axes.forEach(axis => {
    const val = values[axis] !== undefined ? values[axis] : 20;
    const slider = document.getElementById(`slider-${axis}`);
    const pct = document.getElementById(`val-pct-${axis}`);
    
    if (slider) slider.value = val;
    if (pct) pct.textContent = `${val}%`;
  });

  // Load free text values
  document.getElementById("self-vision").value = state.userFreeText.vision || "";
  document.getElementById("self-avoid").value = state.userFreeText.avoid || "";

  // Set total bar
  const total = axes.reduce((sum, ax) => sum + values[ax], 0);
  document.getElementById("slider-total-val").textContent = `${total}%`;
}

// Render Checkboxes in Custom Comparison view
function renderCompareCheckboxes() {
  const container = document.getElementById("compare-checkboxes");
  container.innerHTML = "";

  state.companies.forEach(comp => {
    const isChecked = state.compareList.includes(comp.id);
    const label = document.createElement("label");
    label.className = `checkbox-editorial ${isChecked ? 'checked' : ''}`;
    label.innerHTML = `
      <input type="checkbox" value="${comp.id}" ${isChecked ? 'checked' : ''}>
      <span>${comp.name}</span>
    `;

    const input = label.querySelector("input");
    input.addEventListener("change", (e) => {
      if (e.target.checked) {
        if (state.compareList.length >= 3) {
          // Limit to max 3 companies
          e.target.checked = false;
          alert("カスタム比較は一度に最大3社まで選択可能です。");
          return;
        }
        state.compareList.push(comp.id);
      } else {
        state.compareList = state.compareList.filter(id => id !== comp.id);
      }
      label.classList.toggle("checked", e.target.checked);
      saveStateToLocalStorage();
      renderComparisonTable();
    });

    container.appendChild(label);
  });
}

// Render Custom Quick Sliders inside Compare View
function renderCompareWeightsSliders() {
  const container = document.getElementById("compare-weights-sliders");
  container.innerHTML = "";

  const axes = [
    { key: "growth", name: "成長環境", icon: "trending-up" },
    { key: "stability", name: "安定基盤", icon: "shield" },
    { key: "autonomy", name: "裁量自由", icon: "unlock" },
    { key: "team", name: "協調社風", icon: "users" },
    { key: "salary", name: "給与待遇", icon: "coins" }
  ];

  axes.forEach(ax => {
    const val = state.userValues[ax.key] !== undefined ? state.userValues[ax.key] : 20;
    const box = document.createElement("div");
    box.className = "compare-weight-slider-box";
    box.innerHTML = `
      <div class="compare-weight-lbls">
        <span><i data-lucide="${ax.icon}" style="width:12px;height:12px;display:inline-block;vertical-align:middle;margin-right:2px;"></i> ${ax.name}</span>
        <span id="cmp-pct-${ax.key}">${val}%</span>
      </div>
      <input type="range" id="cmp-slider-${ax.key}" min="0" max="100" value="${val}" class="slider-editorial">
    `;

    const slider = box.querySelector("input");
    slider.addEventListener("input", (e) => {
      balanceCompareSliders(ax.key, parseInt(e.target.value));
    });

    container.appendChild(box);
  });
  lucide.createIcons();
}

// Render Compare Table dynamically
function renderComparisonTable() {
  const table = document.getElementById("comparison-table");
  const advisor = document.getElementById("comparison-advisor-content");

  if (state.compareList.length === 0) {
    table.innerHTML = `<tr><td style="text-align:center;padding:2rem;" class="empty-state">比較する企業を選択してください。</td></tr>`;
    advisor.innerHTML = `<p class="empty-state">比較する企業を2社以上選択すると、詳細な差分とアドバイスが生成されます。</p>`;
    return;
  }

  // Get selected company objects
  const selectedComps = state.compareList.map(id => state.companies.find(c => c.id === id)).filter(Boolean);

  let headerRow = `<tr><th>比較項目</th>`;
  selectedComps.forEach(comp => {
    headerRow += `<th class="company-header">${comp.name}</th>`;
  });
  headerRow += `</tr>`;

  // Row: Weighted Compatibility Score
  let scoreRow = `<tr><th>自己相性スコア</th>`;
  selectedComps.forEach(comp => {
    const score = calculateCompatibility(comp.values, state.userValues);
    scoreRow += `<td class="score-cell">${score} <span style="font-size:0.6rem;color:var(--text-muted);">/100</span></td>`;
  });
  scoreRow += `</tr>`;

  // General Attributes rows to render
  const rows = [
    { label: "業界・ドメイン", key: "industry" },
    { label: "一言健全性要約", key: "oneLiner", isMetric: true },
    { label: "平均年収（給与待遇）", key: "salary", isAxis: true },
    { label: "キャリア成長（成長環境）", key: "growth", isAxis: true },
    { label: "雇用継続（安定基盤）", key: "stability", isAxis: true },
    { label: "働き方の柔軟（裁量自由）", key: "autonomy", isAxis: true },
    { label: "仲間・社風（協調社風）", key: "team", isAxis: true },
    { label: "新卒3年以内離職率", key: "turnover", isMetric: true },
    { label: "平均勤続年数", key: "tenure", isMetric: true },
    { label: "女性比率", key: "genderRatio", isMetric: true },
    { label: "現在の選考状況", key: "status", isStatus: true }
  ];

  let tbodyRows = "";
  rows.forEach(row => {
    let rHtml = `<tr><th>${row.label}</th>`;
    
    // Find dynamic maximum or minimum for differential highlighting
    let numericVals = [];
    selectedComps.forEach(comp => {
      if (row.isAxis) {
        numericVals.push({ id: comp.id, val: comp.values[row.key] });
      } else if (row.key === "turnover" || row.key === "tenure" || row.key === "genderRatio") {
        const strVal = comp.metrics[row.key];
        const numVal = parseFloat(strVal);
        numericVals.push({ id: comp.id, val: numVal });
      }
    });

    let bestId = null;
    if (numericVals.length > 1) {
      if (row.key === "turnover") {
        // Turnover: lower is better
        numericVals.sort((a,b) => a.val - b.val);
      } else {
        // Others: higher is better
        numericVals.sort((a,b) => b.val - a.val);
      }
      bestId = numericVals[0].id;
    }

    selectedComps.forEach(comp => {
      let cellContent = "";
      let classAttr = "";
      
      if (row.isAxis) {
        cellContent = `${comp.values[row.key]}% (自己指標)`;
        if (comp.id === bestId) classAttr = 'class="diff-highlight"';
      } else if (row.isMetric) {
        cellContent = comp.metrics[row.key];
        if (comp.id === bestId && row.key !== "oneLiner") classAttr = 'class="diff-highlight"';
      } else if (row.isStatus) {
        cellContent = state.myNotes[comp.id]?.status || "検討中";
      } else {
        cellContent = comp[row.key];
      }

      rHtml += `<td ${classAttr}>${cellContent}</td>`;
    });
    rHtml += `</tr>`;
    tbodyRows += rHtml;
  });

  table.innerHTML = headerRow + scoreRow + tbodyRows;

  // Render differential advisor advice dynamically if 2 or more companies compared
  if (selectedComps.length >= 2) {
    let comp1 = selectedComps[0];
    let comp2 = selectedComps[1];
    let comp3 = selectedComps[2] || null;

    let score1 = calculateCompatibility(comp1.values, state.userValues);
    let score2 = calculateCompatibility(comp2.values, state.userValues);

    let topChoice = score1 >= score2 ? comp1 : comp2;
    let nextChoice = score1 >= score2 ? comp2 : comp1;

    if (comp3) {
      let score3 = calculateCompatibility(comp3.values, state.userValues);
      if (score3 > calculateCompatibility(topChoice.values, state.userValues)) {
        nextChoice = topChoice;
        topChoice = comp3;
      } else if (score3 > calculateCompatibility(nextChoice.values, state.userValues)) {
        nextChoice = comp3;
      }
    }

    let adviseHtml = `
      <p>あなたの分析スライダーに基づくと、現在最もフィットしているのは <strong>${topChoice.name}</strong> （相性スコア: ${calculateCompatibility(topChoice.values, state.userValues)}点）です。</p>
      <p style="margin-top: 0.5rem;"><strong>企業間の決定的な差異と決め手：</strong></p>
      <ul class="advisor-bullet-list">
        <li><strong>社風・成長対比:</strong> 
          ${comp1.name}は${comp1.values.growth >= 80 ? '「成長環境と裁量」に特化したキャリアスピード重視' : '「安定した基盤とチームワーク」を重んじる環境'}であり、
          これに対し、${comp2.name}は${comp2.values.growth >= 80 ? '「挑戦志向の高い環境」' : '「健全なワークライフバランスと長期安定性」'}に絶対の強みがあります。
        </li>
        <li><strong>雇用の健全性と勤続年数:</strong> 
          新卒の離職率は <strong>${comp1.name}が${comp1.metrics.turnover}</strong>、<strong>${comp2.name}が${comp2.metrics.turnover}</strong> です。
          長期的なキャリアの安泰や福利厚生を極限まで求める場合は、<strong>${parseFloat(comp1.metrics.turnover) < parseFloat(comp2.metrics.turnover) ? comp1.name : comp2.name}</strong> が論理的適合性を示しています。
        </li>
        <li><strong>自己分析テキストとの合致:</strong>
          ${state.userFreeText.vision ? `あなたの希望する「${state.userFreeText.vision.substring(0, 20)}...」というビジョンに対しては、` : 'あなたの自己分析に照らすと、'}
          ${topChoice.values.growth > 85 ? `早期から裁量を持って難題に挑める <strong>${topChoice.name}</strong> での挑戦が、最短で目標に近づくパスとなります。` : `財務基盤が盤石で、教育体制に定評のある <strong>${topChoice.name}</strong> でじっくり専門性を高めることが、安定したステップに繋がります。`}
        </li>
      </ul>
    `;
    advisor.innerHTML = adviseHtml;
  } else {
    advisor.innerHTML = `<p class="empty-state">3社以上を同時に比較したり、2社の詳細な差分を出すには、もう1社チェックを入れてください。</p>`;
  }
}

// Load company details and view switching
function openCompanyDetail(companyId, targetTab = "tab-summary") {
  state.selectedCompanyId = companyId;
  const comp = state.companies.find(c => c.id === companyId);
  if (!comp) return;

  // Switch View to Detail
  state.currentView = "view-detail";
  document.querySelectorAll(".view-section").forEach(v => v.classList.remove("active"));
  document.getElementById("view-detail").classList.add("active");

  // Redraw Header Area
  const headerArea = document.getElementById("detail-header-area");
  const score = calculateCompatibility(comp.values, state.userValues);
  const reasoning = generateReasoningText(comp, state.userValues);
  
  headerArea.innerHTML = `
    <div class="detail-headline-group">
      <div class="detail-comp-meta">
        <span class="detail-industry-tag">${comp.industry}</span>
        <h1 class="detail-company-title">${comp.name}</h1>
      </div>
      <div class="detail-score-box">
        <div class="detail-score-circle">
          <span class="score-num">${score}</span>
          <span class="score-lbl">相性度</span>
        </div>
        <div class="detail-score-reasoning">
          ${reasoning}
        </div>
      </div>
    </div>
  `;

  // Tab: AI Summary Content
  const listSummary = document.getElementById("detail-3line-summary");
  listSummary.innerHTML = comp.summary3.map(li => `<li>${li}</li>`).join("");

  document.getElementById("detail-full-summary").innerHTML = comp.fullSummary;
  document.getElementById("detail-ideal-candidate").textContent = comp.idealCandidate;

  // Value characteristics bars on Summary Sidebar
  const barContainer = document.getElementById("detail-value-bars");
  const axisLabels = { growth: "成長環境", stability: "安定基盤", autonomy: "裁量自由", team: "協調社風", salary: "給与待遇" };
  barContainer.innerHTML = Object.keys(comp.values).map(axis => `
    <div class="mini-bar-item">
      <div class="lbl">
        <span>${axisLabels[axis]}</span>
        <span>${comp.values[axis]}%</span>
      </div>
      <div class="bar-outer">
        <div class="bar-inner" style="width: ${comp.values[axis]}%"></div>
      </div>
    </div>
  `).join("");

  // Tab: Dashboard Content
  document.getElementById("dashboard-one-liner").textContent = comp.metrics.oneLiner;
  document.getElementById("stat-turnover").textContent = comp.metrics.turnover;
  document.getElementById("stat-tenure").textContent = comp.metrics.tenure;
  document.getElementById("stat-age").textContent = comp.metrics.age;
  document.getElementById("stat-gender-ratio").textContent = comp.metrics.genderRatio;

  // Adjust custom comparison badges dynamically
  const isTurnoverGood = parseFloat(comp.metrics.turnover) < 4.0;
  const turnoverTag = document.querySelector("#stat-turnover + .comparison-tag");
  if (turnoverTag) {
    turnoverTag.textContent = isTurnoverGood ? "超低水準 (優)" : "業界標準水準";
    turnoverTag.className = `comparison-tag ${isTurnoverGood ? 'good' : ''}`;
  }

  // Render Charts in Dashboard Tab
  setTimeout(() => {
    renderDashboardCharts(comp);
  }, 100);

  // Tab: My Notes Content
  let notes = state.myNotes[companyId];
  if (!notes) {
    notes = { status: "検討中", rating: "3", feelings: "", ob: "", briefing: "", schedules: [] };
    state.myNotes[companyId] = notes;
    saveStateToLocalStorage();
  }

  document.getElementById("note-status-select").value = notes.status || "検討中";
  document.getElementById("note-rating-select").value = notes.rating || "3";
  document.getElementById("memo-feelings").value = notes.feelings || "";
  document.getElementById("memo-ob").value = notes.ob || "";
  document.getElementById("memo-briefing").value = notes.briefing || "";

  renderCompanyTimeline(companyId);

  // Set designated active tab
  document.querySelectorAll(".editorial-tabs .tab-btn").forEach(btn => {
    btn.classList.toggle("active", btn.getAttribute("data-tab") === targetTab);
  });
  document.querySelectorAll("#view-detail .tab-content").forEach(tc => {
    tc.classList.toggle("active", tc.getAttribute("id") === targetTab);
  });

  // Smooth scroll detail page to top
  document.querySelector(".app-main").scrollTop = 0;
}

// Render local schedules and events list inside Company Note Tab
function renderCompanyTimeline(companyId) {
  const container = document.getElementById("company-schedule-list");
  container.innerHTML = "";

  const notes = state.myNotes[companyId];
  if (!notes || !notes.schedules || notes.schedules.length === 0) {
    container.innerHTML = `<p class="empty-state" style="margin-top:0.5rem;">登録された選考予定・締切はありません。</p>`;
    return;
  }

  // Sort chronological ascending
  const sorted = [...notes.schedules].sort((a,b) => new Date(a.date) - new Date(b.date));

  sorted.forEach(ev => {
    const item = document.createElement("div");
    item.className = "timeline-event-item";
    
    const dFormatted = ev.date.replace(/-/g, '.');
    item.innerHTML = `
      <span class="date-box">${dFormatted}</span>
      <span class="title-box">${ev.title}</span>
      <button type="button" class="delete-event-btn" data-event-id="${ev.id}">
        <i data-lucide="trash-2" style="width:14px;height:14px;"></i>
      </button>
    `;

    // Click handler to remove date event
    item.querySelector(".delete-event-btn").addEventListener("click", () => {
      notes.schedules = notes.schedules.filter(x => x.id !== ev.id);
      saveStateToLocalStorage();
      renderCompanyTimeline(companyId);
      renderHomeReminders();
    });

    container.appendChild(item);
  });
  lucide.createIcons();
}

// Render Chart.js line and bar graphs inside Dashboard
function renderDashboardCharts(company) {
  // Destruct existing charts to avoid overlapping canvas bugs
  if (state.charts.financial) state.charts.financial.destroy();
  if (state.charts.share) state.charts.share.destroy();

  const ctxFin = document.getElementById("financialChart").getContext("2d");
  const ctxShare = document.getElementById("marketShareChart").getContext("2d");

  const isDark = state.theme === "dark";
  const textClr = isDark ? "#b0b0b0" : "#4a4a4a";
  const gridClr = isDark ? "#2d2d2d" : "#e2dfd8";

  // Financial Graph (Sales & Profit)
  state.charts.financial = new Chart(ctxFin, {
    type: 'bar',
    data: {
      labels: company.financials.years,
      datasets: [
        {
          label: '売上高 (億円)',
          data: company.financials.sales,
          backgroundColor: isDark ? 'rgba(141, 169, 196, 0.6)' : 'rgba(27, 54, 93, 0.75)',
          borderColor: isDark ? '#8da9c4' : '#1b365d',
          borderWidth: 1,
          yAxisID: 'y'
        },
        {
          label: '営業利益 (億円)',
          data: company.financials.profit,
          type: 'line',
          borderColor: '#e07a5f',
          backgroundColor: '#e07a5f',
          borderWidth: 2,
          pointRadius: 4,
          fill: false,
          yAxisID: 'y1'
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          grid: { color: gridClr },
          ticks: { color: textClr, font: { family: 'Inter' } }
        },
        y: {
          type: 'linear',
          display: true,
          position: 'left',
          grid: { color: gridClr },
          ticks: { color: textClr, font: { family: 'Inter' } },
          title: { display: true, text: '売上高', color: textClr }
        },
        y1: {
          type: 'linear',
          display: true,
          position: 'right',
          grid: { drawOnChartArea: false }, // only want grid lines for one axis
          ticks: { color: textClr, font: { family: 'Inter' } },
          title: { display: true, text: '営業利益', color: textClr }
        }
      },
      plugins: {
        legend: {
          labels: { color: textClr, font: { family: 'Noto Sans JP', size: 10 } }
        }
      }
    }
  });

  // Market Share / Competitors Share (Horizontal Bar)
  state.charts.share = new Chart(ctxShare, {
    type: 'bar',
    data: {
      labels: company.competitors.names,
      datasets: [{
        label: '年間売上高 (億円)',
        data: company.competitors.shares,
        backgroundColor: company.competitors.names.map(name => 
          name.includes(company.name) 
            ? (isDark ? '#e07a5f' : '#8c2d19') 
            : (isDark ? '#2d2d2d' : '#e2dfd8')
        ),
        borderWidth: 1,
        borderColor: isDark ? '#444' : '#ccc'
      }]
    },
    options: {
      indexAxis: 'y', // Horizontal bars
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          grid: { color: gridClr },
          ticks: { color: textClr, font: { family: 'Inter' } }
        },
        y: {
          grid: { display: false },
          ticks: { color: textClr, font: { family: 'Noto Sans JP', size: 11 } }
        }
      },
      plugins: {
        legend: { display: false }
      }
    }
  });
}

// Navigation flow logic
function navigateToView(viewId) {
  state.currentView = viewId;
  
  // Update view visibility classes
  document.querySelectorAll(".view-section").forEach(v => {
    v.classList.toggle("active", v.getAttribute("id") === viewId);
  });

  // Update navigation items active state
  const btnIds = { "view-home": "nav-btn-home", "view-self": "nav-btn-self", "view-compare": "nav-btn-compare" };
  document.querySelectorAll(".app-navigation .nav-item").forEach(btn => {
    btn.classList.toggle("active", btn.getAttribute("id") === btnIds[viewId]);
  });

  // Trigger special loading procedures per view
  if (viewId === "view-home") {
    renderCompanyCards();
    renderHomeReminders();
  } else if (viewId === "view-self") {
    renderSelfAnalysisForm();
  } else if (viewId === "view-compare") {
    renderCompareCheckboxes();
    renderCompareWeightsSliders();
    renderComparisonTable();
  }
}

// ==========================================================================
// 6. Form Submission handlers & Listeners
// ==========================================================================
function setupEventListeners() {
  
  // Navigation Tabs Event Listeners
  document.getElementById("nav-btn-home").addEventListener("click", () => navigateToView("view-home"));
  document.getElementById("nav-btn-self").addEventListener("click", () => navigateToView("view-self"));
  document.getElementById("nav-btn-compare").addEventListener("click", () => navigateToView("view-compare"));

  // Sort selector listener
  document.getElementById("home-sort").addEventListener("change", renderCompanyCards);

  // Theme Toggler
  document.getElementById("theme-toggle").addEventListener("click", () => {
    state.theme = state.theme === "light" ? "dark" : "light";
    applyTheme();
    saveStateToLocalStorage();
    
    // Refresh graphs to adapt colors
    if (state.selectedCompanyId && state.currentView === "view-detail") {
      const comp = state.companies.find(c => c.id === state.selectedCompanyId);
      if (comp) renderDashboardCharts(comp);
    }
  });

  // Self Analysis Sliders Smart Balance Listeners
  const sliders = ["growth", "stability", "autonomy", "team", "salary"];
  sliders.forEach(axis => {
    document.getElementById(`slider-${axis}`).addEventListener("input", (e) => {
      balanceSliders(axis, parseInt(e.target.value));
    });
  });

  // Self Analysis Form Save
  document.getElementById("save-analysis").addEventListener("click", () => {
    state.userFreeText.vision = document.getElementById("self-vision").value;
    state.userFreeText.avoid = document.getElementById("self-avoid").value;
    
    saveStateToLocalStorage();
    alert("自己分析・価値観データを正常に保存しました。");
    
    // Auto return to dashboard to see updated scores
    navigateToView("view-home");
  });

  // Dynamic Tabs switching on Company Detail Page
  document.querySelectorAll(".editorial-tabs .tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const tabTarget = btn.getAttribute("data-tab");
      
      document.querySelectorAll(".editorial-tabs .tab-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      document.querySelectorAll("#view-detail .tab-content").forEach(tc => {
        tc.classList.remove("active");
        if (tc.getAttribute("id") === tabTarget) {
          tc.classList.add("active");
        }
      });
      
      // Special render hook for dashboard tab to force canvas layout update
      if (tabTarget === "tab-dashboard" && state.selectedCompanyId) {
        const comp = state.companies.find(c => c.id === state.selectedCompanyId);
        if (comp) renderDashboardCharts(comp);
      }
    });
  });

  // Selected note fields autosave to LocalStorage
  const noteFields = ["note-status-select", "note-rating-select", "memo-feelings", "memo-ob", "memo-briefing"];
  noteFields.forEach(fieldId => {
    const element = document.getElementById(fieldId);
    
    // Keyup for texts, Change for select dropdowns
    const eventName = element.tagName === "SELECT" ? "change" : "keyup";
    
    element.addEventListener(eventName, () => {
      const companyId = state.selectedCompanyId;
      if (!companyId) return;

      const saveStatus = document.getElementById("memo-save-status");
      saveStatus.textContent = "下書き保存中...";

      let notes = state.myNotes[companyId];
      if (!notes) {
        notes = { status: "検討中", rating: "3", feelings: "", ob: "", briefing: "", schedules: [] };
        state.myNotes[companyId] = notes;
      }

      notes.status = document.getElementById("note-status-select").value;
      notes.rating = document.getElementById("note-rating-select").value;
      notes.feelings = document.getElementById("memo-feelings").value;
      notes.ob = document.getElementById("memo-ob").value;
      notes.briefing = document.getElementById("memo-briefing").value;

      saveStateToLocalStorage();
      
      // Short delay for visual save verification
      setTimeout(() => {
        saveStatus.textContent = "自動保存済み";
      }, 500);
    });
  });

  // Add event/schedule form
  document.getElementById("schedule-add-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const companyId = state.selectedCompanyId;
    if (!companyId) return;

    const dateVal = document.getElementById("schedule-date").value;
    const titleVal = document.getElementById("schedule-title").value;

    let notes = state.myNotes[companyId];
    if (!notes) {
      notes = { status: "検討中", rating: "3", feelings: "", ob: "", briefing: "", schedules: [] };
      state.myNotes[companyId] = notes;
    }
    if (!notes.schedules) notes.schedules = [];

    notes.schedules.push({
      id: Math.random().toString(36).substr(2, 9),
      date: dateVal,
      title: titleVal
    });

    saveStateToLocalStorage();
    
    // Clear inputs and reload lists
    document.getElementById("schedule-date").value = "";
    document.getElementById("schedule-title").value = "";
    renderCompanyTimeline(companyId);
    renderHomeReminders();
  });

  // New Corporate AI collect simulator
  document.getElementById("url-collect-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("collect-company-name").value.trim();
    const url = document.getElementById("collect-company-url").value.trim();
    
    const loadingEl = document.getElementById("collect-loading");
    loadingEl.classList.remove("hidden");
    
    // Disable submit
    const submitBtn = document.querySelector("#url-collect-form button[type='submit']");
    submitBtn.disabled = true;

    // Simulate LLM analytical pipeline delay (2.5 seconds)
    setTimeout(() => {
      // Create new dynamic mock corporate profile based on dynamic calculations
      const randomId = "custom-" + Math.random().toString(36).substr(2, 9);
      
      // Distribute random balance points for Dynamic Custom corporate profile values
      const valG = Math.floor(Math.random() * 40) + 55;
      const valS = Math.floor(Math.random() * 40) + 50;
      const valA = Math.floor(Math.random() * 40) + 50;
      const valT = Math.floor(Math.random() * 40) + 55;
      const valSal = Math.floor(Math.random() * 45) + 50;

      const newCompany = {
        id: randomId,
        name: name,
        industry: "IT・コンサルティング / 新興企業",
        url: url,
        summary3: [
          `AIを活用した生産性向上サービスを提供する注目ベンチャー企業：${name}。`,
          "少数精鋭体制を掲げており、主体性とロジカルシンキングが強く求められる風土。",
          "個人の自律性を徹底重視し、自己表現力と行動力のある人材にとって最高の舞台。"
        ],
        fullSummary: `
          <p>新しくAIが要約・収集したデータです。${name}はデジタルテクノロジーを駆使して新たな社会的バリューを創造することを目指すイノベーター集団です。</p>
          <p>公式プレスリリースおよび口コミサイト等から抽出した情報によると、<span class="highlight-yellow">一人ひとりの裁量と自律したキャリア形成</span>に最大の魅力があります。短期間でのスキル成長を目指す環境として、新卒生からの関心も高まりつつあります。</p>
          <p>雇用面では、安定したマニュアル型業務よりも<span class="highlight-blue">「不確実性を楽しみながらイノベーションを起こす」</span>という社風であり、求める人物像とも密接に結びついています。</p>
        `,
        idealCandidate: "新しいサービスを生み出すエネルギーがあり、自ら率先して行動できる人。自分の意見を持ち、健全な議論を交わせる人。主体的に行動しキャリアを掴み取れる人。",
        values: {
          growth: valG,
          stability: valS,
          autonomy: valA,
          team: valT,
          salary: valSal
        },
        metrics: {
          turnover: "3.5%",
          tenure: "3.8年",
          age: "31.2歳",
          genderRatio: "35%",
          oneLiner: "業界内で急成長を遂げる注目株。少数精鋭のプロフェッショナル集団。"
        },
        financials: {
          years: ["2022", "2023", "2024", "2025", "2026 (見込)"],
          sales: [8.5, 14.2, 22.8, 38.0, 52.4],
          profit: [0.6, 1.2, 2.1, 4.5, 6.8]
        },
        competitors: {
          names: [name, "競合大手A社", "競合中堅B社", "新興ライバルC社"],
          shares: [52.4, 210.0, 95.0, 32.0]
        }
      };

      // Add to dynamic companies & state notes
      state.companies.push(newCompany);
      state.myNotes[randomId] = {
        status: "検討中",
        rating: "3",
        feelings: "",
        ob: "",
        briefing: "",
        schedules: []
      };

      saveStateToLocalStorage();
      
      // Reset form
      document.getElementById("collect-company-name").value = "";
      document.getElementById("collect-company-url").value = "";
      loadingEl.classList.add("hidden");
      submitBtn.disabled = false;

      // Update grid
      renderCompanyCards();
      alert(`「${name}」のWebサイトおよびIRデータから情報を収集し、無事に要約・相性スコア算出が完了しました！`);
      
    }, 2500);
  });
}

// ==========================================================================
// 7. Initializer
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  // Sync state
  loadStateFromLocalStorage();
  
  // Set date
  document.getElementById("current-date").textContent = getTodayString();
  
  // Apply visual settings
  applyTheme();
  
  // Route to home initial
  navigateToView("view-home");
  
  // Forms & sliders bindings
  setupEventListeners();
});
