// input: None (TypeScript type definitions for internationalization dictionary)
// output: Exported Translation schema interfaces for SEO, UI, Quiz, Souls, and FAQ
// pos: src/i18n/types.ts (更新规则：文件变更需同步本注释与所属目录 README)

import type { SoulCode, SoulDefinition } from '../data/souls';
import type { QuestionItem } from '../data/questions';

export interface NavTranslations {
  startTest: string;
  sevenVirtues: string;
  howItWorks: string;
  faq: string;
  about: string;
  takeQuiz: string;
}

export interface FooterTranslations {
  title: string;
  desc: string;
  contact: string;
  exploreTitle: string;
  testLink: string;
  traitsLink: string;
  scoringLink: string;
  faqLink: string;
  legalTitle: string;
  aboutLink: string;
  privacyLink: string;
  termsLink: string;
  contactLink: string;
  feedbackLink: string;
  copyright: string;
  disclaimer: string;
}

export interface SectionWhat {
  title: string;
  p1: string;
  p2: string;
  p3: string;
  p4: string;
}

export interface SectionWhy {
  title: string;
  intro: string;
  points: Array<{ title: string; desc: string }>;
}

export interface SectionTraits {
  title: string;
  subtitle: string;
}

export interface SectionColors {
  title: string;
  desc: string;
  note: string;
  items: Array<{ title: string; desc: string; colSpan2?: boolean }>;
}

export interface SectionScoring {
  title: string;
  intro: string;
  cards: Array<{ title: string; desc: string }>;
  note: string;
}

export interface SectionFeatures {
  title: string;
  subtitle: string;
  items: Array<{ num: string; title: string; desc: string }>;
}

export interface FAQItem {
  q: string;
  a: string;
}

export interface SectionFAQ {
  title: string;
  subtitle: string;
  items: FAQItem[];
}

export interface QuizUITranslations {
  title: string;
  settingsBtn: string;
  audioSettingsTitle: string;
  musicBgmLabel: string;
  soundSfxLabel: string;
  muteBtn: string;
  soundEngineNote: string;
  introScenes: string[];
  introContinueHint: string;
  skipBtn: string;
  startTitle: string;
  startDesc: string;
  startProceedBtn: string;
  startResumeBtn: string;
  startFeatures: string[];
  hudResetBtn: string;
  resetConfirm: string;
  dialogueHint: string;
  extremeLeft: string;
  extremeRight: string;
  tapAnswerHint: string;
  likertLabels: string[];
  backBtn: string;
  confirmBtn: string;
  skipNeutralBtn: string;
  resultComplete: string;
  primaryVirtue: string;
  secondaryVirtue: string;
  breakdownTitle: string;
  downloadCardBtn: string;
  copyResultBtn: string;
  copiedNotice: string;
  reviewAnswersBtn: string;
  browseSoulsBtn: string;
  retakeBtn: string;
  reviewTitle: string;
  reviewBackBtn: string;
  soulsGalleryTitle: string;
  soulsBackBtn: string;
  soulSelectHint: string;
}

export interface Translations {
  locale: 'en' | 'ja' | 'es' | 'pt';
  localeName: string;
  pageTitle: string;
  pageDescription: string;
  heroBadge: string;
  heroTitle: string;
  heroTitleHighlight: string;
  heroSubtitle: string;
  heroNote: string;
  nav: NavTranslations;
  footer: FooterTranslations;
  what: SectionWhat;
  why: SectionWhy;
  traits: SectionTraits;
  colors: SectionColors;
  scoring: SectionScoring;
  features: SectionFeatures;
  faq: SectionFAQ;
  quizUI: QuizUITranslations;
  souls: Record<SoulCode, SoulDefinition>;
  questions: QuestionItem[];
}
