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
  chineseName: string;
  chineseColor: string;
}

export const SOULS: Record<SoulCode, SoulDefinition> = {
  DET: {
    code: 'DET',
    name: 'DETERMINATION',
    label: 'RED',
    hex: '#ff0000',
    confuse: 'PER',
    tag: 'Despite how many times I fell, I always got back up.',
    description: "Determination does not necessarily mean optimism or hopefulness, as they imply expecting things to work out. Determination doesn't require that. It's the part of a person that drives them to keep going even when everything seems to be for nothing. It shows up as a specific kind of restlessness. You are hard to talk out of things. You have a sense of how a story is supposed to end and a physical difficulty accepting versions where it doesn't.",
    chineseName: '决心',
    chineseColor: '红色'
  },
  BRV: {
    code: 'BRV',
    name: 'BRAVERY',
    label: 'ORANGE',
    hex: '#fca600',
    confuse: 'DET',
    tag: 'Even with trembling in my legs, I refused to back down.',
    description: "Bravery is not the absence of fear; rather, it's the drive to keep moving in spite of it. Where others would give up when faced with a seemingly impossible challenge, it shines by leading the charge. It tends to look like a willingness to be the first one to speak, the first one to make a choice, the first one to pursue its wishes. Brave people would much rather be hurt than sit idly by to avoid pain.",
    chineseName: '勇气',
    chineseColor: '橙色'
  },
  JUS: {
    code: 'JUS',
    name: 'JUSTICE',
    label: 'YELLOW',
    hex: '#ffff00',
    confuse: 'INT',
    tag: 'Despite the cruelty I endured, I never let myself be corrupted.',
    description: "Justice is the ideal that fairness should come first: All individuals deserve equal consideration. Slights against yourself can sometimes be let go of; slights against someone who couldn't stop them, almost never. It makes you the kind of person who will bring a wrongdoing to light no matter what, often at your own expense.",
    chineseName: '正义',
    chineseColor: '黄色'
  },
  KND: {
    code: 'KND',
    name: 'KINDNESS',
    label: 'GREEN',
    hex: '#00c000',
    confuse: 'PAT',
    tag: 'No matter how many times I got hurt, I never let that make me cruel.',
    description: "Kindness is warm, active empathy and genuine consideration for others. It values compassion and forgiveness above cold efficiency. It is the ability to offer warmth and care even when the world feels indifferent or harsh, choosing to heal rather than harm.",
    chineseName: '善良',
    chineseColor: '绿色'
  },
  PAT: {
    code: 'PAT',
    name: 'PATIENCE',
    label: 'CYAN',
    hex: '#42fcff',
    confuse: 'KND',
    tag: 'Even when everything urged haste, I chose to wait for the right moment.',
    description: "Patience is emotional equilibrium and tranquility. It is the wisdom to know when to pause, observe, and let events unfold naturally rather than rushing into rash action. It brings calm into chaotic situations and provides steady emotional resilience.",
    chineseName: '耐心',
    chineseColor: '青色'
  },
  INT: {
    code: 'INT',
    name: 'INTEGRITY',
    label: 'BLUE',
    hex: '#003cff',
    confuse: 'JUS',
    tag: 'Regardless of what others do, I hold true to my inner code.',
    description: "Integrity is unwavering honesty and alignment with personal principles. It is doing what is right even when nobody is watching. People with strong integrity refuse to compromise their moral core or pretend to be someone they are not.",
    chineseName: '正直',
    chineseColor: '蓝色'
  },
  PER: {
    code: 'PER',
    name: 'PERSEVERANCE',
    label: 'PURPLE',
    hex: '#d400d4',
    confuse: 'DET',
    tag: 'When motivation faded, discipline carried me through to the end.',
    description: "Perseverance is methodical discipline, study, and endurance. While Determination burns hot and stubborn, Perseverance is steady, calculated, and disciplined. It is the grit to finish what you started through habit and quiet dedication.",
    chineseName: '毅力',
    chineseColor: '紫色'
  }
};

export const SOUL_CODES: SoulCode[] = ['DET', 'BRV', 'JUS', 'KND', 'PAT', 'INT', 'PER'];
