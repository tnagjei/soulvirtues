// input: None (static Undertale soul traits metadata source)
// output: Exported SOULS definition dictionary and trait types
// pos: src/data/souls.ts (更新规则：文件变更需同步本注释与所属目录 README)

export type SoulCode = 'DET' | 'BRV' | 'JUS' | 'KND' | 'PAT' | 'INT' | 'PER';

export interface SoulDefinition {
  code: SoulCode;
  name: string;
  label: string;
  hex: string;
  confuse: string | null;
  tag: string;
  description: string;
}

export const SOULS: Record<SoulCode, SoulDefinition> = {
  DET: {
    code: 'DET',
    name: 'DETERMINATION',
    label: 'RED',
    hex: '#ff0000',
    confuse: 'PER',
    tag: "What still makes this goal worth pursuing, and what evidence would make you change it?",
    description: "Choosing a goal that matters to you, then deciding how to recommit after a setback. Changing direction after thoughtful review can fit this theme.",
  },
  BRV: {
    code: 'BRV',
    name: 'BRAVERY',
    label: 'ORANGE',
    hex: '#fca600',
    confuse: 'DET',
    tag: "What is one safe action you could take without pretending the fear is gone?",
    description: "Expressing or acting despite fear or social pressure when doing so is reasonably safe. The score does not reward danger or require an outgoing personality.",
  },
  JUS: {
    code: 'JUS',
    name: 'JUSTICE',
    label: 'YELLOW',
    hex: '#ffff00',
    confuse: 'INT',
    tag: "Would you accept the same standard if it were applied to you or someone you dislike?",
    description: "Applying fair standards to different people, with attention to rights, opportunity and shared outcomes. Fairness can require understanding different needs.",
  },
  KND: {
    code: 'KND',
    name: 'KINDNESS',
    label: 'GREEN',
    hex: '#00c000',
    confuse: 'PAT',
    tag: "What help would answer this person's actual need, and what can you reasonably offer?",
    description: "Caring, listening and offering useful help within reasonable limits. Being kind does not require taking over another person's choices or neglecting your own needs.",
  },
  PAT: {
    code: 'PAT',
    name: 'PATIENCE',
    label: 'CYAN',
    hex: '#42fcff',
    confuse: 'KND',
    tag: "When is a reasonable follow-up time, and what can you do while waiting?",
    description: "How you respond to waiting, minor frustration and annoyance. This theme includes pausing and calming down; it does not ask you to tolerate harm or indefinite delay.",
  },
  INT: {
    code: 'INT',
    name: 'INTEGRITY',
    label: 'BLUE',
    hex: '#003cff',
    confuse: 'JUS',
    tag: "What is the honest next sentence, and which commitment can you actually keep?",
    description: "Honesty, confidentiality and keeping commitments, including admitting mistakes. A score does not establish a person's moral worth or make their beliefs automatically right.",
  },
  PER: {
    code: 'PER',
    name: 'PERSEVERANCE',
    label: 'PURPLE',
    hex: '#d400d4',
    confuse: 'DET',
    tag: "What small practice step can you repeat, and how will you tell whether it is working?",
    description: "Continuing useful effort during execution, managing distractions and trying to finish work. A productive routine also makes room for rest and changes based on feedback.",
  }
};

export const SOUL_CODES: SoulCode[] = ['DET', 'BRV', 'JUS', 'KND', 'PAT', 'INT', 'PER'];

// 灵魂代码到详情页 slug 的唯一映射源，供 SoulCard 与各语言首页颜色清单共用
export const SOUL_SLUGS_BY_CODE: Record<SoulCode, string> = {
  DET: 'determination',
  BRV: 'bravery',
  JUS: 'justice',
  KND: 'kindness',
  PAT: 'patience',
  INT: 'integrity',
  PER: 'perseverance',
};

