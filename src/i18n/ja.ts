// input: Static japanese translation dictionary aligned with official Undertale localizations
// output: Full Japanese Translations object implementation
// pos: src/i18n/ja.ts (更新规则：文件变更需同步本注释与所属目录 README)

import type { Translations } from './types';
import { ASSESSMENT_COPY } from '../data/assessmentContent';
import type { SoulCode, SoulDefinition } from '../data/souls';
import type { QuestionItem } from '../data/questions';
import { getQuestions } from '../data/questions';

export const JA_SOULS: Record<SoulCode, SoulDefinition> = {
  DET: {
    code: 'DET',
    name: 'ケツイ',
    label: '赤',
    hex: '#ff0000',
    confuse: 'PER',
    tag: "その目標を今も追う理由は何ですか。どんな事実があれば目標を変えますか。",
    description: "自分にとって大切な目標を選び、つまずいた後にどう取り組み直すか判断すること。十分に考えた上で方向を変えることも、このテーマに含まれる。",
  },
  BRV: {
    code: 'BRV',
    name: 'ゆうき',
    label: 'オレンジ',
    hex: '#fca600',
    confuse: 'DET',
    tag: "怖さが消えたふりをせずにできる、安全な一歩は何ですか。",
    description: "無理のない安全を保ちつつ、怖さや周囲からの圧力があっても伝えたり行動したりすること。危険を求めることや外向的な性格は条件ではない。",
  },
  JUS: {
    code: 'JUS',
    name: 'せいぎ',
    label: '黄',
    hex: '#ffff00',
    confuse: 'INT',
    tag: "その基準が自分や苦手な相手に使われても受け入れられますか。",
    description: "権利、機会、共同の成果に目を向け、相手によらず公平な基準を使うこと。公平さには人ごとの必要を理解することも含まれる。",
  },
  KND: {
    code: 'KND',
    name: 'やさしさ',
    label: '緑',
    hex: '#00c000',
    confuse: 'PAT',
    tag: "相手の本当の必要に合う助けは何ですか。無理なく何を提供できますか。",
    description: "無理のない範囲で気にかけ、話を聞き、役に立つ助けを提供すること。相手の選択を代わりに決めたり、自分の必要を無視したりする必要はない。",
  },
  PAT: {
    code: 'PAT',
    name: 'にんたい',
    label: '水色',
    hex: '#42fcff',
    confuse: 'KND',
    tag: "いつ確認するのが適切ですか。待つ間に何ができますか。",
    description: "待ち時間、小さなつまずき、いらだちにどう対応するか。このテーマには一呼吸置いて落ち着くことが含まれるが、害や終わりのない遅れを我慢する必要はない。",
  },
  INT: {
    code: 'INT',
    name: 'せいじつ',
    label: '青',
    hex: '#003cff',
    confuse: 'JUS',
    tag: "次に伝える正直な一言は何ですか。実際に守れる約束はどれですか。",
    description: "正直さ、秘密を守ること、約束を守ること、間違いを認めること。得点は人の道徳的な価値や信念の正しさを決めない。",
  },
  PER: {
    code: 'PER',
    name: 'こんき',
    label: '紫',
    hex: '#d535d5',
    confuse: 'DET',
    tag: "繰り返せる小さな練習は何ですか。効果があるかどう確認しますか。",
    description: "実行の途中でも有用な努力を続け、注意のそれを抑え、仕事の完成を目指すこと。役立つ習慣には休息やフィードバックに応じた変更も必要。",
  },
};

export const JA_QUESTIONS: QuestionItem[] = getQuestions('ja');

export const jaTranslations: Translations = {
  locale: 'ja',
  localeName: '日本語',
  pageTitle: "Soul Virtues Extractor - 無料のUndertale魂の特質・ソウル診断(全66問)",
  pageDescription: "無料・全66問のUndertale（アンダーテール）魂の特質・ソウル診断テスト。あなたのタマシイの色とケツイ・ゆうき・せいぎ・やさしさ・にんたい・せいじつ・こんきの7つの美徳比率を完全測定。登録不要ですぐに診断できます。",
  heroBadge: "無料・全66問 魂の特質・ソウル診断",
  heroTitle: "SOUL VIRTUES",
  heroTitleHighlight: "EXTRACTOR",
  heroSubtitle: '無料の66問 <strong class="text-white">Soul Virtues Test（アンダーテール ソウル診断テスト）</strong> を受けて、『UNDERTALE』の世界観に基づくあなたの魂のプロファイル（ケツイ・ゆうき・せいぎ・やさしさ・にんたい・せいじつ・こんき）を解き明かしましょう。',
  heroNote: "7つの得点、回答の確認、PNGカードはすべて無料です。アカウント、支払い、招待は不要です。",
  nav: {
    startTest: "診断開始",
    sevenVirtues: "7つの魂",
    howItWorks: "判定の仕組み",
    faq: "よくある質問",
    about: "サイトについて",
    takeQuiz: "テストを受ける",
  },
  footer: {
    title: "SOUL VIRTUES EXTRACTOR",
    desc: "『UNDERTALE』の世界観にインスパイアされた、7つの人間の魂の美徳を測定する無料の66問診断テスト。すべてのスコア計算はお使いのブラウザ上で100%ローカルに実行されます。",
    contact: "お問い合わせ:",
    exploreTitle: "コンテンツ",
    testLink: "魂の美徳テスト",
    traitsLink: "7つの魂の特質",
    scoringLink: "スコア計算ロジック",
    faqLink: "よくある質問 (FAQ)",
    legalTitle: "規約・情報",
    aboutLink: "About Us",
    privacyLink: "プライバシーポリシー",
    termsLink: "利用規約",
    contactLink: "お問い合わせ",
    feedbackLink: "フィードバック",
    copyright: "© 2026 Soul Virtues Extractor (soulvirtues.org). All rights reserved.",
    disclaimer: "免責事項：当サイトはファンによって制作された非公式の分析ツールです。『UNDERTALE』は Toby Fox の商標です。当サイトは Toby Fox および原作者とは一切関係ありません。",
  },
  what: {
    title: "Soul Virtues Extractor とは？",
    p1: "Soul Virtues Extractor は、自分を振り返るための無料の独立したファンテストです。Undertale に着想を得た表現で、66の文から日常の7つのテーマを考えます。公式ゲームテストや臨床評価ではありません。",
    p2: "50はこの回答尺度の中立の中点です。高い得点は、そのテーマの文に合う回答が多かったことを示します。人口の中での順位や道徳の点数ではありません。すべて中立なら主なテーマはありません。同点は同点として示し、3点以内の得点は読み方の補助として併記します。統計的な結論ではありません。",
    p3: "現在の題庫は、パブリックドメインのIPIPの56項目を改編し、独自に作成したケツイの10項目を加えたものです。固定のIPIP56問テストではなく、大きな項目プールから選んでいます。7つの分類と表現はこのサイトの設計です。",
    p4: "7つの得点、回答の確認、PNGカードはすべて無料です。アカウント、支払い、招待は不要です。",
  },
  why: {
    title: "なぜ Soul Virtues Extractor を受けるのか？",
    intro: "Soul Virtues Extractor は、自分を振り返るための無料の独立したファンテストです。Undertale に着想を得た表現で、66の文から日常の7つのテーマを考えます。公式ゲームテストや臨床評価ではありません。",
    points: [
  {
    "title": "7つの得点をまとめて読む",
    "desc": "7つの得点、回答の確認、PNGカードはすべて無料です。アカウント、支払い、招待は不要です。"
  },
  {
    "title": "質問の出典を確かめる",
    "desc": "現在の題庫は、パブリックドメインのIPIPの56項目を改編し、独自に作成したケツイの10項目を加えたものです。固定のIPIP56問テストではなく、大きな項目プールから選んでいます。7つの分類と表現はこのサイトの設計です。"
  },
  {
    "title": "回答を状況とともに読む",
    "desc": "50はこの回答尺度の中立の中点です。高い得点は、そのテーマの文に合う回答が多かったことを示します。人口の中での順位や道徳の点数ではありません。すべて中立なら主なテーマはありません。同点は同点として示し、3点以内の得点は読み方の補助として併記します。統計的な結論ではありません。"
  },
  {
    "title": "登録不要で進行状況を保存",
    "desc": "回答はこのブラウザ内で計算され、固定の質問IDと題庫の版を使って保存されます。同じブラウザなら5言語のどれでも同じ進行状況を続けられます。端末を変えても転送されません。旧版の回答は新しい文の採点に使われず、音の設定は別に保存されます。"
  }
],
  },
  traits: {
    title: "Undertale の7つの魂と、それぞれが表す特質",
    subtitle: "Undertale に登場する7つの魂をまとめました。それぞれに固有の色と、それを定義する特質があります。自分の中でどれが優勢かを知る前に、7つすべてをここで確認できます。",
  },
  colors: {
    title: "あなたの魂の色は何色？",
    desc: "結果には独立した7つの得点を表示します。はっきりした最高得点はタマシイの色で示すことがありますが、中立や同点では無理に1つの型を選びません。",
    note: "※注記：Undertaleのファンコミュニティでは赤色のタマシイは「ケツイ（Determination）」と広く認識されていますが、原作ゲーム内では赤の正式な特質名は明言されていません。",
    items: [
      { title: "赤のタマシイ · ケツイ（決意）*", desc: "自分にとって大切な目標を選び、つまずいた後にどう取り組み直すか判断すること。十分に考えた上で方向を変えることも、このテーマに含まれる。" },
      { title: "オレンジのタマシイ · ゆうき（勇気）", desc: "無理のない安全を保ちつつ、怖さや周囲からの圧力があっても伝えたり行動したりすること。危険を求めることや外向的な性格は条件ではない。" },
      { title: "黄のタマシイ · せいぎ（正義）", desc: "権利、機会、共同の成果に目を向け、相手によらず公平な基準を使うこと。公平さには人ごとの必要を理解することも含まれる。" },
      { title: "緑のタマシイ · やさしさ（優しさ）", desc: "無理のない範囲で気にかけ、話を聞き、役に立つ助けを提供すること。相手の選択を代わりに決めたり、自分の必要を無視したりする必要はない。" },
      { title: "水色のタマシイ · にんたい（忍耐）", desc: "待ち時間、小さなつまずき、いらだちにどう対応するか。このテーマには一呼吸置いて落ち着くことが含まれるが、害や終わりのない遅れを我慢する必要はない。" },
      { title: "青のタマシイ · せいじつ（誠実）", desc: "正直さ、秘密を守ること、約束を守ること、間違いを認めること。得点は人の道徳的な価値や信念の正しさを決めない。" },
      { title: "紫のタマシイ · こんき（根気）", desc: "実行の途中でも有用な努力を続け、注意のそれを抑え、仕事の完成を目指すこと。役立つ習慣には休息やフィードバックに応じた変更も必要。", colSpan2: true },
    ],
  },
  scoring: {
    title: "スコア算出アルゴリズムの仕組み",
    intro: "各得点の計算方法",
    cards: [
  {
    "title": "5つの選択肢と逆転項目",
    "desc": "まったくそう思わない（1）から強くそう思う（5）まで、5つの回答から選びます。 逆転項目では6から回答値を引きます。各文は1つのテーマに属します。"
  },
  {
    "title": "テーマごとの平均値",
    "desc": "そのテーマの採点後の値を平均し、100 ×（平均値 − 1）÷ 4で計算します。"
  },
  {
    "title": "分かりやすい0〜100の尺度",
    "desc": "7つの得点は独立しています。合計が100になる必要はなく、項目数が違っても最高得点は変わりません。"
  }
],
    note: "まったくそう思わない（1）から強くそう思う（5）まで、5つの回答から選びます。 逆転項目では6から回答値を引きます。各文は1つのテーマに属します。 そのテーマの採点後の値を平均し、100 ×（平均値 − 1）÷ 4で計算します。 7つの得点は独立しています。合計が100になる必要はなく、項目数が違っても最高得点は変わりません。",
  },
  features: {
    title: "主な機能と特徴",
    subtitle: "全66問、7つの魂のスコア測定、そして瞬時に共有できる結果カード。",
    items: [
      { num: "66", title: "全66問の本格診断", desc: "7つの魂の特質を多角的に掘り下げる66の設問を用意。" },
      { num: "7", title: "7つの魂のスコア表示", desc: "ケツイからこんきまで、全7特質の割合を完全可視化。" },
      { num: "PNG", title: "結果カード画像出力", desc: "診断結果をドット絵風のPNG画像として保存・シェア可能。" },
      { num: "NO", title: "登録不要・完全無料", desc: "メール登録や課金なしで、今すぐ全問受検できます。" },
    ],
  },
  faq: {
    title: "よくある質問 (FAQ)",
    subtitle: "Soul Virtues Extractor、Undertaleの魂の特質、スコア算出についての解説。",
    items: ASSESSMENT_COPY.ja.faqItems,
  },
  quizUI: {
    resultReading: {
      "cardScaleNote": "50%は中立・各スコアは独立",
      "summaryBadge": "プロフィールのまとめ",
      "noPreferenceTitle": "明確な傾向はありません",
      "noPreferenceBody": "今回の回答では、中立の基準を超える特質がありません。最初の項目を主な性格と決めつけず、回答を見直してください。",
      "incompleteTitle": "すべての質問に回答してください",
      "incompleteBody": "未回答または無効な回答があります。66問すべてに回答してから結果を解釈してください。",
      "tieTitle": "同点の上位特質",
      "tieBody": "表示上の最高点が同じ特質が複数あります。表示順は優劣を決めるものではありません。",
      "closeBody": "上位2項目の差は3ポイント以内です。読みやすさのために並べて表示しています。統計的な有意差の判定ではありません。",
      "scoreScaleNote": "各得点は、このテストへの回答を表す独立した0〜100の値です。人口の中での順位や道徳の点数ではなく、合計が100になる必要はありません。",
      "evidenceTitle": "回答がスコアに与えた影響",
      "evidenceRaised": "この特質の点数を上げた回答",
      "evidenceLowered": "この特質の点数を下げた回答",
      "feedbackLink": "提案を送る",
      "allSoulsLink": "7つの特質をすべて見る"
    },
    title: "UNDERTALE SOUL EXTRACTOR",
    settingsBtn: "設定",
    audioSettingsTitle: "オーディオ設定",
    musicBgmLabel: "BGM音量:",
    soundSfxLabel: "効果音 (SFX):",
    muteBtn: "ミュート",
    soundEngineNote: "ピクセル音 · 設定を保存",
    introScenes: ["つながっている？","ここに一つのタマシイがある…","あなたの回答を見てみよう。"],
    introContinueHint: "Zキーまたはクリックで進む",
    skipBtn: "スキップ",
    startTitle: "SOUL VIRTUES EXTRACTOR",
    startDesc: "7つの人間の魂の美徳。7つの色彩。ケツイ・ゆうき・せいぎ・やさしさ・にんたい・せいじつ・こんきの7つの共鳴度を解き明かす全66問の診断。",
    startProceedBtn: "* ケツイヲ モッテ ハジメル（全66問）",
    startResumeBtn: "* つづきから",
    startFeatures: [
      "✓ 100% 無料・登録不要",
      "✓ ブラウザ内で安全に計算",
      "✓ 原作風ダイアログ＆効果音",
    ],
    hudResetBtn: "リセット",
    resetConfirm: "全66問の回答をリセットしますか？",
    dialogueHint: "クリックまたはZ/Enterで早送り",
    extremeLeft: "まったくそう思わない",
    extremeRight: "強くそう思う",
    tapAnswerHint: "答えを1つタップして次へ",
    likertLabels: ["まったくそう思わない","そう思わない","どちらでもない","そう思う","強くそう思う"],
    backBtn: "もどる",
    confirmBtn: "決定",
    skipNeutralBtn: "スキップ（中立）",
    resultComplete: "抽出完了",
    primaryVirtue: "あなたの主たる魂の美徳",
    secondaryVirtue: "第2の美徳 / シャドウ特性",
    breakdownTitle: "7つの魂の美徳 詳細割合",
    shareResultBtn: "結果を共有",
    shareResultChannels: "X · INSTAGRAM · MESSAGES · MORE",
    shareHint: "スマートフォンの共有メニューを開き、利用可能なアプリを選んでください。",
    shareCardMeta: "66問 · 7つの特性",
    shareCardQuestion: "あなたの魂は？",
    shareCardCta: "テストを受ける",
    downloadCardBtn: "PNGを保存",
    saveCardHint: "画像を長押し（または右クリック）して保存してください。",
    copyLinkBtn: "リンクをコピー",
    linkCopiedNotice: "リンクをコピーしました",
    reviewAnswersBtn: "回答を振り返る",
    browseSoulsBtn: "7つの魂図鑑",
    retakeBtn: "もう一度テストする",
    reviewTitle: "回答の振り返り（全66問）",
    reviewBackBtn: "結果に戻る",
    soulsGalleryTitle: "7つの人間の魂",
    soulsBackBtn: "結果に戻る",
    soulSelectHint: "魂をクリックすると詳細を確認できます",
    feedbackVote: {
      title: "次に何を追加すべきですか？（1クリックで投票）",
      subtitle: "あなたの魂の特質が抽出されました。この世界の次の章を共に創りましょう：",
      optFusion: "2つの主要特性の融合解説 — 上位2つの特質がどう調和するか",
      optCards: "カスタマイズ可能なソウルカード — 保存・共有用のドット絵やバッジの追加",
      optRealLife: "現実での詳細な分析 — 実生活での強み・弱みとゲーム設定の深掘り",
      optDeltarune: "DELTARUNE版ソウル診断 — 新たな特質と仕組みの追加",
      optEnough: "今のテストで十分素晴らしい",
      optOther: "または独自のアイデアを直接提案：",
      otherPlaceholder: "アイデアを入力してください...",
      submitBtn: "投票する",
      thankYouTitle: "あなたの魂（SOUL）の声は、これからの未来に刻まれました。",
      thankYouMessage: "あなたはただの訪問者ではなく、私たちと共にこの世界を創る仲間です。あなたの選択が次の章の形を決めます。共に歩んでくれてありがとう。新たな旅が始まるとき、あなたの残した光が道を照らします。",
    },
  },
  souls: JA_SOULS,
  questions: JA_QUESTIONS,
};
