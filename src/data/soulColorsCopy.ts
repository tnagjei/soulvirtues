// input: None (exact C-site soul color page copy from the approved plan)
// output: SoulColorsCopy dictionary for English and the Spanish route wrapper
// pos: src/data/soulColorsCopy.ts (更新规则：文件变更需同步本注释与所属目录 README)

export interface SoulColorsCopy {
  title: string;
  desc: string;
  h1: string;
  intro: string;
  facts: string[];
  compare: { title: string; heads: string[]; rows: string[][]; note: string };
  howto: { title: string; steps: string[] };
  maker: { title: string; hint: string; colors: Record<string, string> };
  faq: Array<{ q: string; a: string }>;
  cta: { start: string; colorLead: string };
}

const EN_SOUL_COLORS_COPY: SoulColorsCopy = {
  "title": "Soul Color Test - Undertale Soul Colors Quiz",
  "desc": "Take the free soul color test: 66 questions, 7 Undertale soul colors, instant result with a shareable card. No sign-up, English and Espanol.",
  "h1": "Soul Color Test: Find Your Undertale Soul Color",
  "intro": "The soul color test matches you to one of the seven Undertale soul colors by scoring 66 statements across Determination, Bravery, Justice, Kindness, Patience, Integrity, and Perseverance. This page is an unofficial fan project and is not affiliated with Toby Fox.",
  "facts": [
    "7 colors / 7 virtues, one color for one virtue: Determination=red, Bravery=orange, Justice=yellow, Kindness=green, Patience=cyan, Integrity=blue, Perseverance=purple",
    "66 questions, Local Client-Side Calculation",
    "100% Free & No Sign-Up",
    "Complete seven-virtue scores + answer review + PNG card"
  ],
  "compare": {
    "title": "Soul Color Test vs Soul Trait Quiz vs \"Official\" Test",
    "heads": [
      "Result",
      "Questions",
      "Notes"
    ],
    "rows": [
      [
        "Soul color test",
        "One color + seven-virtue scores",
        "66",
        "This site, free, shareable card"
      ],
      [
        "Soul trait quiz",
        "One trait name",
        "Depends on the site",
        "Most sites give one result"
      ],
      [
        "\"Official\" quiz",
        "—",
        "—",
        "There is no official soul color test; any page calling itself official is third-party"
      ]
    ],
    "note": "This page is an unofficial fan project and is not affiliated with Toby Fox."
  },
  "howto": {
    "title": "How it works",
    "steps": [
      "Answer 66 short statements — no login, nothing leaves your browser.",
      "Get your seven-virtue scores and the color that leads.",
      "Save the PNG card or open that color's page to read its traits."
    ]
  },
  "maker": {
    "title": "Pick Your Color Directly",
    "hint": "Prefer to pick instead of answer? Tap a color to read its traits.",
    "colors": {
      "determination": "Determination=red",
      "bravery": "Bravery=orange",
      "justice": "Justice=yellow",
      "kindness": "Kindness=green",
      "patience": "Patience=cyan",
      "integrity": "Integrity=blue",
      "perseverance": "Perseverance=purple"
    }
  },
  "faq": [
    {
      "q": "Is this the official Undertale soul test?",
      "a": "No. This is an unofficial fan project, not affiliated with Toby Fox."
    },
    {
      "q": "How long does it take?",
      "a": "66 statements, one tap each, five response options per statement. The result appears as soon as the last statement is answered, with no sign-up, email or payment step in between. Progress is saved in this browser, so closing the tab does not force a restart."
    },
    {
      "q": "Is it free?",
      "a": "Yes. The complete seven-score result, answer review and PNG card are free, with no account, payment or invitation required."
    },
    {
      "q": "Is there a Spanish version?",
      "a": "Yes. Open the <a href=\"/es/soul-colors/\">Spanish soul color test</a>."
    }
  ],
  "cta": {
    "start": "Start Test",
    "colorLead": "{color} leads your profile"
  }
};

export const SOUL_COLORS_COPY: Record<"en" | "es", SoulColorsCopy> = {
  en: EN_SOUL_COLORS_COPY,
  es: EN_SOUL_COLORS_COPY,
};

export const SOUL_COLORS_COPY_PLAN_LINES = {
  title: 91,
  description: 92,
  h1: 93,
  intro: 98,
  facts: "100-104",
  compare: "106-112",
  howto: "114-117",
  maker: "119-120",
  faq: "122-126",
};
