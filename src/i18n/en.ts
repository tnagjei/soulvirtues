// input: Static english translation dictionary and references
// output: Full English Translations object implementation
// pos: src/i18n/en.ts (更新规则：文件变更需同步本注释与所属目录 README)

import type { Translations } from './types';
import { ASSESSMENT_COPY } from '../data/assessmentContent';
import { SOULS } from '../data/souls';
import { QUESTIONS } from '../data/questions';

export const enTranslations: Translations = {
  locale: 'en',
  localeName: 'English',
  pageTitle: "Soul Virtues Extractor - Free 66-Question Soul Virtues Test",
  pageDescription: "Take the free 66-question Soul Virtues Extractor test. Discover your Undertale SOUL trait and color percentage across Determination, Bravery, Justice, and more.",
  heroBadge: "Free 66-Question Soul Trait Test",
  heroTitle: "SOUL VIRTUES",
  heroTitleHighlight: "EXTRACTOR",
  heroSubtitle: 'Take the free 66-question <strong class="text-white">Soul Virtues Test</strong> to discover your Undertale SOUL profile across Determination, Bravery, Justice, Kindness, Patience, Integrity, and Perseverance.',
  heroNote: "The complete seven-score result, answer review and PNG card are free, with no account, payment or invitation required.",
  nav: {
    startTest: "Start Test",
    sevenVirtues: "7 Virtues",
    howItWorks: "How It Works",
    faq: "FAQ",
    about: "About",
    takeQuiz: "Take Quiz",
  },
  footer: {
    title: "SOUL VIRTUES EXTRACTOR",
    desc: "A free, comprehensive 66-question assessment exploring the seven human soul virtues inspired by the Undertale universe. All calculations are performed 100% locally in your browser.",
    contact: "Contact:",
    exploreTitle: "Explore",
    testLink: "Soul Virtues Test",
    traitsLink: "7 Soul Traits",
    scoringLink: "Scoring Logic",
    faqLink: "Frequently Asked Questions",
    legalTitle: "Legal & About",
    aboutLink: "About Us",
    privacyLink: "Privacy Policy",
    termsLink: "Terms of Service",
    contactLink: "Contact",
    feedbackLink: "Feedback",
    copyright: "© 2026 Soul Virtues Extractor (soulvirtues.org). All rights reserved.",
    disclaimer: "Disclaimer: This is an independent fan-made analytical tool. Undertale is a trademark of Toby Fox. This website is not officially affiliated with or endorsed by Toby Fox or original game creators.",
  },
  what: {
    title: "What Is the Soul Virtues Extractor?",
    p1: "Soul Virtues Extractor is a free, independent fan quiz for self-reflection. Its 66 statements explore seven everyday themes using an Undertale-inspired presentation. It is not an official game test or a clinical assessment.",
    p2: "50 marks the neutral midpoint of this answer scale. A higher score means your answers fit more of this site’s statements for that theme. It is not a population percentile or a moral grade. All-neutral answers have no leading theme. Ties are shown as ties; scores within 3 points are shown together as a reading aid, not a statistical finding.",
    p3: "The current bank adapts 56 public-domain IPIP statements and adds 10 independently written Determination statements. We selected material from the larger item pool, not a fixed IPIP 56-question test. Our seven groupings and wording are our own design.",
    p4: "The complete seven-score result, answer review and PNG card are free, with no account, payment or invitation required.",
  },
  why: {
    title: "Why Take the Soul Virtues Extractor?",
    intro: "Soul Virtues Extractor is a free, independent fan quiz for self-reflection. Its 66 statements explore seven everyday themes using an Undertale-inspired presentation. It is not an official game test or a clinical assessment.",
    points: [
  {
    "title": "Seven scores, one complete result",
    "desc": "The complete seven-score result, answer review and PNG card are free, with no account, payment or invitation required."
  },
  {
    "title": "Traceable question sources",
    "desc": "The current bank adapts 56 public-domain IPIP statements and adds 10 independently written Determination statements. We selected material from the larger item pool, not a fixed IPIP 56-question test. Our seven groupings and wording are our own design."
  },
  {
    "title": "Read your answers in context",
    "desc": "50 marks the neutral midpoint of this answer scale. A higher score means your answers fit more of this site’s statements for that theme. It is not a population percentile or a moral grade. All-neutral answers have no leading theme. Ties are shown as ties; scores within 3 points are shown together as a reading aid, not a statistical finding."
  },
  {
    "title": "Local progress without an account",
    "desc": "Answers are calculated and saved in this browser by stable question ID and bank version. The same progress can be resumed in any of our five languages on this browser; switching devices does not transfer it. Earlier-bank answers are kept separate and cannot be silently scored against new statements. Audio settings are stored separately."
  }
],
  },
  traits: {
    title: "The 7 Undertale Souls and the Traits They Represent",
    subtitle: "These are the seven souls of Undertale: each has its own color and a trait that defines it. Here they are all together, with what each one means — before you find out which one is dominant in you.",
  },
  colors: {
    title: "What Is Your Undertale Soul Color?",
    desc: "The result shows seven independent scores. A clear leading score may be shown as a Soul color; neutral or tied answers are displayed without forcing a single type.",
    note: "*Note: In Undertale lore, the Red SOUL is commonly associated with Determination by fans and community assessments, though the original game does not explicitly name its official trait.",
    items: [
      { title: "RED SOUL · Determination*", desc: "Choosing a goal that matters to you, then deciding how to recommit after a setback. Changing direction after thoughtful review can fit this theme." },
      { title: "ORANGE SOUL · Bravery", desc: "Expressing or acting despite fear or social pressure when doing so is reasonably safe. The score does not reward danger or require an outgoing personality." },
      { title: "YELLOW SOUL · Justice", desc: "Applying fair standards to different people, with attention to rights, opportunity and shared outcomes. Fairness can require understanding different needs." },
      { title: "GREEN SOUL · Kindness", desc: "Caring, listening and offering useful help within reasonable limits. Being kind does not require taking over another person's choices or neglecting your own needs." },
      { title: "CYAN SOUL · Patience", desc: "How you respond to waiting, minor frustration and annoyance. This theme includes pausing and calming down; it does not ask you to tolerate harm or indefinite delay." },
      { title: "BLUE SOUL · Integrity", desc: "Honesty, confidentiality and keeping commitments, including admitting mistakes. A score does not establish a person's moral worth or make their beliefs automatically right." },
      { title: "PURPLE SOUL · Perseverance", desc: "Continuing useful effort during execution, managing distractions and trying to finish work. A productive routine also makes room for rest and changes based on feedback.", colSpan2: true },
    ],
  },
  scoring: {
    title: "How the Scoring Algorithm Works",
    intro: "How each score is calculated",
    cards: [
  {
    "title": "Five choices and reverse statements",
    "desc": "Choose one of five responses, from strongly disagree (1) to strongly agree (5). For a reverse statement, use 6 minus the response. Each statement belongs to one theme."
  },
  {
    "title": "An average for each theme",
    "desc": "Average the keyed responses within that theme, then calculate 100 × (average − 1) ÷ 4."
  },
  {
    "title": "A transparent 0–100 scale",
    "desc": "The seven scores are independent. They do not need to add up to 100, and different item counts do not increase a theme’s maximum."
  }
],
    note: "Choose one of five responses, from strongly disagree (1) to strongly agree (5). For a reverse statement, use 6 minus the response. Each statement belongs to one theme. Average the keyed responses within that theme, then calculate 100 × (average − 1) ÷ 4. The seven scores are independent. They do not need to add up to 100, and different item counts do not increase a theme’s maximum.",
  },
  features: {
    title: "Key Features & Highlights",
    subtitle: "66 questions, seven trait scores, and an instant shareable result.",
    items: [
      { num: "66", title: "66 Questions", desc: "66 statements covering choices and preferences across the seven traits." },
      { num: "7", title: "7 Trait Scores", desc: "See your percentage across all seven traits used by the test." },
      { num: "PNG", title: "Instant Share Card", desc: "Download your result as a PNG card and share it anywhere." },
      { num: "NO", title: "Sign-Up Required", desc: "Take the full 66-question test without creating an account." },
    ],
  },
  faq: {
    title: "Frequently Asked Questions",
    subtitle: "Everything you need to know about the Soul Virtues Extractor, Undertale soul traits, and test scoring.",
    items: ASSESSMENT_COPY.en.faqItems,
  },
  quizUI: {
    resultReading: {
      "cardScaleNote": "50% = NEUTRAL · INDEPENDENT QUIZ SCORES",
      "summaryBadge": "PROFILE SUMMARY",
      "noPreferenceTitle": "NO CLEAR PREFERENCE",
      "noPreferenceBody": "These answers show no trait above the neutral midpoint. Review your answers rather than treating the first bar as a dominant personality.",
      "incompleteTitle": "FINISH THE TEST",
      "incompleteBody": "Some answers are missing or invalid. Complete all 66 statements before interpreting this profile.",
      "tieTitle": "TIED LEADING TRAITS",
      "tieBody": "Several traits share the highest displayed score. Their order does not choose a winner.",
      "closeBody": "The two leading scores are within 3 points. We display them together as a reading aid, not as a test of statistical significance.",
      "scoreScaleNote": "These are independent 0–100 scores for your answers to this quiz, not population percentiles or moral grades. They do not add up to 100.",
      "evidenceTitle": "HOW YOUR ANSWERS AFFECTED THE SCORE",
      "evidenceRaised": "Raised this trait",
      "evidenceLowered": "Lowered this trait",
      "feedbackLink": "SEND A SUGGESTION",
      "allSoulsLink": "EXPLORE ALL SEVEN TRAITS"
    },
    title: "UNDERTALE SOUL EXTRACTOR",
    settingsBtn: "SETTINGS",
    audioSettingsTitle: "AUDIO SETTINGS",
    musicBgmLabel: "MUSIC (BGM):",
    soundSfxLabel: "SOUNDS (SFX):",
    muteBtn: "MUTE",
    soundEngineNote: "Pixel audio · Settings saved",
    introScenes: ["ARE WE CONNECTED?","A SOUL IN THE VOID...","LET US EXPLORE YOUR ANSWERS."],
    introContinueHint: "press Z or click to continue",
    skipBtn: "SKIP",
    startTitle: "SOUL VIRTUES EXTRACTOR",
    startDesc: "Seven human soul virtues. Seven colors. 66 statements designed to reveal your multi-dimensional resonance across Determination, Bravery, Justice, Kindness, Patience, Integrity, and Perseverance.",
    startProceedBtn: "* PROCEED (START 66 QUESTIONS)",
    startResumeBtn: "* RESUME",
    startFeatures: [
      "✓ 100% Free & No Sign-Up",
      "✓ Local Client-Side Calculation",
      "✓ Undertale Dialogue & Sound FX",
    ],
    hudResetBtn: "RESET",
    resetConfirm: "Reset all 66 questions?",
    dialogueHint: "Click or press Z/Enter to skip typing animation",
    extremeLeft: "Strongly disagree",
    extremeRight: "Strongly agree",
    tapAnswerHint: "Tap one answer to continue",
    likertLabels: ["Strongly disagree","Disagree","Neutral","Agree","Strongly agree"],
    backBtn: "BACK",
    confirmBtn: "CONFIRM",
    skipNeutralBtn: "SKIP (NEUTRAL)",
    resultComplete: "EXTRACTION COMPLETE",
    primaryVirtue: "PRIMARY SOUL VIRTUE",
    secondaryVirtue: "SECONDARY VIRTUE / SHADOW TRAIT",
    breakdownTitle: "7 SOUL VIRTUES BREAKDOWN",
    shareResultBtn: "SHARE RESULT",
    shareResultChannels: "X · INSTAGRAM · MESSAGES · MORE",
    shareHint: "Open your phone's share sheet, then choose any available app.",
    shareCardMeta: "66 QUESTIONS · 7 TRAITS",
    shareCardQuestion: "WHAT IS YOUR SOUL?",
    shareCardCta: "TAKE THE TEST",
    downloadCardBtn: "DOWNLOAD PNG",
    saveCardHint: "Press and hold image to save to Photos / right click to save.",
    copyLinkBtn: "COPY LINK",
    linkCopiedNotice: "Link copied!",
    reviewAnswersBtn: "REVIEW ANSWERS",
    browseSoulsBtn: "BROWSE 7 SOULS",
    retakeBtn: "RETAKE TEST",
    reviewTitle: "ANSWER REVIEW (66 QUESTIONS)",
    reviewBackBtn: "BACK TO RESULTS",
    soulsGalleryTitle: "THE SEVEN HUMAN SOULS",
    soulsBackBtn: "BACK TO RESULTS",
    soulSelectHint: "Click a soul to inspect its trait details",
    feedbackVote: {
      title: "What should we build next? (Vote with 1 click)",
      subtitle: "You've extracted your soul virtues. Help us shape the next chapter of this realm:",
      optFusion: "Dual-Trait Fusion Lore — How my top two virtues blend together",
      optCards: "Customizable Soul Cards — More pixel art styles & badges to share",
      optRealLife: "Deeper Real-Life Analysis — Strengths, weaknesses, and game lore for my soul",
      optDeltarune: "Deltarune Soul Test — New traits and mechanics from Deltarune",
      optEnough: "The current test is already great as it is",
      optOther: "Or have your own idea? Write to us directly:",
      otherPlaceholder: "Type your suggestion here...",
      submitBtn: "Cast Vote",
      thankYouTitle: "Your SOUL's voice is now etched into our future timeline.",
      thankYouMessage: "You're not just a visitor—you're building this realm with us. Every honest choice shapes what comes next. Thank you for walking this path with us; when the next chapter awakens, your spark will have guided it.",
    },
  },
  souls: SOULS,
  questions: QUESTIONS,
};
