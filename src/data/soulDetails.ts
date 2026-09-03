// input: None (static detailed metadata and lore for 7 Undertale soul traits in English)
// output: Exported SOUL_DETAILS dictionary with evidence-bounded lore, equipment, mechanics, flags, and SEO copy
// pos: src/data/soulDetails.ts (更新规则：文件变更需同步本注释与所属目录 README)

import type { SoulCode } from './souls';

export interface SoulItem {
  name: string;
  type: string;
  location: string;
  stats: string;
  lore: string;
}

export interface SoulDetailLabels {
  home: string;
  traitsBreadcrumb: string;
  interpretationLabel: string;
  ballGameLabel: string;
  loreHeading: string;
  itemsHeading: string;
  itemsSub: string;
  mechanicsHeading: string;
  personalityHeading: string;
  motivationLabel: string;
  strengthsLabel: string;
  weaknessesLabel: string;
  realWorldLabel: string;
  ctaTitle: string;
  ctaDesc: string;
  ctaBtn: string;
  exploreOther: string;
  itemLocation: string;
}

export interface SoulDetail {
  code: SoulCode;
  slug: string;
  name: string;
  colorName: string;
  hex: string;
  ballGameFlag: string;
  ballGameQuote: string;
  tagQuote: string;
  seoTitle: string;
  seoDescription: string;
  gameLore: string;
  battleMechanicsTitle: string;
  battleMechanicsDesc: string;
  items: SoulItem[];
  personalityAnalysis: {
    coreMotivation: string;
    strengths: string[];
    weaknesses: string[];
    realWorldTraits: string;
  };
  labels: SoulDetailLabels;
  relatedSouls: {
    code: SoulCode;
    slug: string;
    name: string;
    colorName: string;
    hex: string;
  }[];
}

const defaultEnLabels: SoulDetailLabels = {
  home: 'Home',
  traitsBreadcrumb: 'Soul Traits',
  interpretationLabel: 'Fan interpretation:',
  ballGameLabel: 'Snowdin Ball Game theme:',
  loreHeading: 'Underground Lore & Human Identity',
  itemsHeading: 'Signature Weapons & Armor Equipment',
  itemsSub: 'Undertale associates each item pair with a human SOUL color. Any personality connection discussed here is a fan interpretation, not a confirmed biography.',
  mechanicsHeading: 'Battle Mode & Combat Mechanics',
  personalityHeading: 'Personality Profile & Psychological Analysis',
  motivationLabel: 'Core Motivation',
  strengthsLabel: 'Dominant Strengths',
  weaknessesLabel: 'Potential Blindspots & Shadow',
  realWorldLabel: 'Real-World Behavioral Expression:',
  ctaTitle: 'Discover Your True Undertale Soul Trait',
  ctaDesc: 'Do you possess pure virtues or a blend of multiple traits? Take the free 66-question Soul Virtues Extractor test to calculate your percentage breakdown.',
  ctaBtn: 'TAKE THE 66-QUESTION UNDERTALE SOUL TEST',
  exploreOther: 'Explore Other Undertale Soul Traits',
  itemLocation: 'Found at:',
};

export const SOUL_DETAILS: Record<string, SoulDetail> = {
  determination: {
    code: 'DET',
    slug: 'determination',
    name: 'DETERMINATION',
    colorName: 'Red',
    hex: '#ff0000',
    ballGameFlag: 'Red Flag',
    ballGameQuote: "Bravery. Justice. Integrity. Kindness. Perseverance. Patience. Using these, you were able to win at 'Ball Game.'",
    tagQuote: 'Despite how many times I fell, I always got back up.',
    seoTitle: 'Determination Soul Undertale (Red SOUL) - Lore, Items & Meaning',
    seoDescription: 'Complete guide to the Red Determination SOUL in Undertale. Learn its game lore, weapons and armor (Stick, Real Knife), battle mechanics, and personality traits.',
    gameLore: "Undertale establishes Determination as a power connected with human SOUL persistence and SAVE. The game does not explicitly name Determination as the Red SOUL trait; that label is a familiar fan interpretation.",
    battleMechanicsTitle: 'Standard Red SOUL (Free 360-Degree Movement)',
    battleMechanicsDesc: 'The Red SOUL allows completely unhindered 360-degree free movement within the bullet box. It represents baseline human autonomy and the refusal to succumb to fatal blows.',
    items: [
      {
        name: 'Stick / Real Knife',
        type: 'Weapon',
        location: 'Ruins / New Home (Asgores Home)',
        stats: 'ATK +0 (Stick) / ATK +99 (Real Knife)',
        lore: 'A plain bark branch that can distract dog guards, later contrasting with the fatal blade found in Asgores home.'
      },
      {
        name: 'Bandage / The Locket',
        type: 'Armor',
        location: 'Ruins / New Home (Asgores Home)',
        stats: 'DEF +0 (Bandage) / DEF +99 (The Locket)',
        lore: 'A worn first-aid strip that recovers 10 HP when reapplied, later replaced by the gold heart locket inscribed Best Friends Forever.'
      }
    ],
    personalityAnalysis: {
      coreMotivation: 'Relentless persistence and refusal to accept unwanted endings.',
      strengths: ['Unbreakable resolve', 'Immunity to despair', 'Capacity to reshape reality', 'Action-oriented drive'],
      weaknesses: ['Stubbornness bordering on obsession', 'Difficulty accepting loss', 'Risk of ruthless tunnel vision'],
      realWorldTraits: 'People with strong Determination do not require guaranteed optimism to take action. They push through friction purely out of an inner refusal to quit.'
    },
    labels: defaultEnLabels,
    relatedSouls: [
      { code: 'PER', slug: 'perseverance', name: 'PERSEVERANCE', colorName: 'Purple', hex: '#d400d4' },
      { code: 'BRV', slug: 'bravery', name: 'BRAVERY', colorName: 'Orange', hex: '#fca600' }
    ]
  },
  bravery: {
    code: 'BRV',
    slug: 'bravery',
    name: 'BRAVERY',
    colorName: 'Orange',
    hex: '#fca600',
    ballGameFlag: 'Orange Flag',
    ballGameQuote: 'You are the kind of person who rushes into every challenge with your fist raised high.',
    tagQuote: 'Even with trembling in my legs, I refused to back down.',
    seoTitle: 'Bravery Soul Undertale (Orange SOUL) - Lore, Items & Meaning',
    seoDescription: 'Explore the Orange Bravery SOUL in Undertale. Discover its game lore, weapons (Tough Glove, Manly Bandanna), orange attack movement mechanics, and traits.',
    gameLore: "Snowdin’s Ball Game presents Bravery in orange, while the Tough Glove and Manly Bandanna are associated with the orange human through game evidence. Undertale does not provide that human’s personality or journey.",
    battleMechanicsTitle: 'Orange Attack Phase (Continuous Movement)',
    battleMechanicsDesc: 'To avoid taking damage from Orange attacks, the player must keep moving continuously through the hazard. Pausing or standing still triggers immediate damage.',
    items: [
      {
        name: 'Tough Glove',
        type: 'Weapon',
        location: 'Snowdin Dimensional Box / Snowdin Shopkeeper',
        stats: 'ATK +5',
        lore: 'A worn leather glove with punch-bar timing that rewards aggressive, rhythmic button inputs during attacks.'
      },
      {
        name: 'Manly Bandanna',
        type: 'Armor',
        location: 'Snowdin Shop',
        stats: 'DEF +7',
        lore: 'A rugged patterned bandanna that imbues the wearer with fearless confidence in cold territory.'
      }
    ],
    personalityAnalysis: {
      coreMotivation: 'Facing fear head-on and taking immediate initiative.',
      strengths: ['Fearless initiation', 'Honesty in confrontation', 'Willingness to take risks', 'Inspiring leadership'],
      weaknesses: ['Impatience with caution', 'Reckless decision-making', 'Struggles with passive reflection'],
      realWorldTraits: 'Bravery individuals would rather endure painful mistakes than live with the regret of passive inaction. They speak up first in tense rooms.'
    },
    labels: defaultEnLabels,
    relatedSouls: [
      { code: 'PAT', slug: 'patience', name: 'PATIENCE', colorName: 'Cyan', hex: '#42fcff' },
      { code: 'JUS', slug: 'justice', name: 'JUSTICE', colorName: 'Yellow', hex: '#ffff00' }
    ]
  },
  justice: {
    code: 'JUS',
    slug: 'justice',
    name: 'JUSTICE',
    colorName: 'Yellow',
    hex: '#ffff00',
    ballGameFlag: 'Yellow Flag',
    ballGameQuote: "Your sure-fire accuracy put an end to the mayhem of 'Ball Game.'",
    tagQuote: 'Despite the cruelty I endured, I never let myself be corrupted.',
    seoTitle: 'Justice Soul Undertale (Yellow SOUL) - Lore, Items & Meaning',
    seoDescription: 'Complete guide to the Yellow Justice SOUL in Undertale. Learn about the Empty Gun and Cowboy Hat, the inverted shooting SOUL mechanic, and personality profile.',
    gameLore: "Snowdin’s Ball Game presents Justice in yellow, while the Empty Gun and Cowboy Hat are associated with the yellow human through game evidence. Undertale does not provide that human’s personality or moral history.",
    battleMechanicsTitle: 'Yellow SOUL Shooter Mode (Inverted Shooting)',
    battleMechanicsDesc: 'Alphys upgrades the phone to flip the Yellow SOUL upside down, allowing it to fire offensive yellow energy bullets to destroy oncoming projectiles and robotic targets in the Mettaton EX battle.',
    items: [
      {
        name: 'Empty Gun',
        type: 'Weapon',
        location: 'Hotland Bratty & Catty Shop',
        stats: 'ATK +12',
        lore: 'An antique revolver without ammunition that relies on precision timing across 4 expanding aiming circles.'
      },
      {
        name: 'Cowboy Hat',
        type: 'Armor',
        location: 'Hotland Bratty & Catty Shop',
        stats: 'DEF +12, ATK +5',
        lore: 'A sturdy wide-brimmed hat that commands respect and offers dual offensive and defensive advantages.'
      }
    ],
    personalityAnalysis: {
      coreMotivation: 'Upholding fairness, truth, and moral accountability.',
      strengths: ['Unshakeable sense of fairness', 'Protector of the underdog', 'Sharp critical judgment', 'Moral clarity'],
      weaknesses: ['Rigid black-and-white thinking', 'Difficulty forgiving transgressions', 'Risk of self-righteous judgment'],
      realWorldTraits: 'Justice types cannot look away from unfair treatment. They are willing to absorb social tension to make sure rules apply equally to everyone.'
    },
    labels: defaultEnLabels,
    relatedSouls: [
      { code: 'INT', slug: 'integrity', name: 'INTEGRITY', colorName: 'Blue', hex: '#003cff' },
      { code: 'KND', slug: 'kindness', name: 'KINDNESS', colorName: 'Green', hex: '#00c000' }
    ]
  },
  kindness: {
    code: 'KND',
    slug: 'kindness',
    name: 'KINDNESS',
    colorName: 'Green',
    hex: '#00c000',
    ballGameFlag: 'Green Flag',
    ballGameQuote: "Your care and concern for 'Ball Game' brought you delicious victory.",
    tagQuote: 'No matter how many times I got hurt, I never let that make me cruel.',
    seoTitle: 'Kindness Soul Undertale (Green SOUL) - Lore, Items & Meaning',
    seoDescription: 'Discover the Green Kindness SOUL in Undertale. Explore lore, items (Burnt Pan, Stained Apron), green shield battle mechanics, and personality analysis.',
    gameLore: "Snowdin’s Ball Game presents Kindness in green, while the Burnt Pan and Stained Apron are associated with the green human through game evidence. Undertale does not say that this human cooked for or cared for monsters.",
    battleMechanicsTitle: 'Green SOUL Shield Mode & Healing Hazards (Deflection & Recovery)',
    battleMechanicsDesc: 'Undyne turns the SOUL green, rooting it in place while granting a magic spear shield to deflect projectile spears from 4 directions. In standard fights, Green projectiles restore HP when touched.',
    items: [
      {
        name: 'Burnt Pan',
        type: 'Weapon',
        location: 'Hotland Steam Vent Room',
        stats: 'ATK +10 (Consumable items heal +4 extra HP)',
        lore: 'A heavy cast-iron cooking pan that enhances the restorative potency of all recovery items eaten in battle.'
      },
      {
        name: 'Stained Apron',
        type: 'Armor',
        location: 'Hotland Floor 2 Conveyor Area',
        stats: 'DEF +11 (Heals 1 HP every other turn)',
        lore: 'A practical kitchen apron that slowly regenerates health throughout sustained confrontations.'
      }
    ],
    personalityAnalysis: {
      coreMotivation: 'Protecting others from suffering and fostering mutual empathy.',
      strengths: ['Deep empathy', 'Generosity without expectation', 'Conflict de-escalation', 'Emotional healing capacity'],
      weaknesses: ['Martyr complex', 'Neglecting personal boundaries', 'Difficulty saying no to exploitation'],
      realWorldTraits: 'Kindness personalities absorb environmental hostility and return warmth. They naturally notice who is excluded and step in to welcome them.'
    },
    labels: defaultEnLabels,
    relatedSouls: [
      { code: 'PAT', slug: 'patience', name: 'PATIENCE', colorName: 'Cyan', hex: '#42fcff' },
      { code: 'JUS', slug: 'justice', name: 'JUSTICE', colorName: 'Yellow', hex: '#ffff00' }
    ]
  },
  patience: {
    code: 'PAT',
    slug: 'patience',
    name: 'PATIENCE',
    colorName: 'Cyan',
    hex: '#42fcff',
    ballGameFlag: 'Cyan Flag',
    ballGameQuote: "'Ball Game' is made of the times you paused and waited for the right opportunity.",
    tagQuote: 'Even when everything urged haste, I chose to wait for the right moment.',
    seoTitle: 'Patience Soul Undertale (Cyan SOUL) - Lore, Items & Meaning',
    seoDescription: 'Master the Cyan Patience SOUL in Undertale. Learn about the Toy Knife, Faded Ribbon, cyan still-stand mechanics, and the psychology of the Patient SOUL.',
    gameLore: "Snowdin’s Ball Game presents Patience in light blue, while the Toy Knife and Faded Ribbon are associated with the light-blue human through game evidence. Undertale does not describe how long that human stayed in the Ruins.",
    battleMechanicsTitle: 'Cyan Attack Phase (Stationary Stillness)',
    battleMechanicsDesc: 'To safely pass through Cyan or Light Blue attacks (such as Doggo swords, Gyftrot ornaments, or Papyrus blue bones), the SOUL must remain completely stationary. Any movement triggers damage.',
    items: [
      {
        name: 'Toy Knife',
        type: 'Weapon',
        location: 'Ruins Hidden Crack',
        stats: 'ATK +3',
        lore: 'A harmless plastic blade that proves its owner possessed gentle restraint and zero malicious intent.'
      },
      {
        name: 'Faded Ribbon',
        type: 'Armor',
        location: 'Ruins Hidden Switch Room',
        stats: 'DEF +3',
        lore: 'A delicate hair ribbon that makes the wearer look adorable, slightly reducing enemy aggression.'
      }
    ],
    personalityAnalysis: {
      coreMotivation: 'Observing clearly, waiting for the right window, and staying grounded.',
      strengths: ['Emotional equilibrium', 'Strategic timing', 'Immunity to rash panic', 'High tolerance for uncertainty'],
      weaknesses: ['Hesitation leading to missed moments', 'Apparent passivity', 'Suppression of urgent reactions'],
      realWorldTraits: 'Patience individuals do not panic when answers are delayed. They understand that premature action often causes more damage than waiting.'
    },
    labels: defaultEnLabels,
    relatedSouls: [
      { code: 'BRV', slug: 'bravery', name: 'BRAVERY', colorName: 'Orange', hex: '#fca600' },
      { code: 'PER', slug: 'perseverance', name: 'PERSEVERANCE', colorName: 'Purple', hex: '#d400d4' }
    ]
  },
  integrity: {
    code: 'INT',
    slug: 'integrity',
    name: 'INTEGRITY',
    colorName: 'Blue',
    hex: '#003cff',
    ballGameFlag: 'Blue Flag',
    ballGameQuote: "Hopping and twirling, your original style got you through 'Ball Game.'",
    tagQuote: 'Regardless of what others do, I hold true to my inner code.',
    seoTitle: 'Integrity Soul Undertale (Blue SOUL) - Lore, Items & Meaning',
    seoDescription: 'Detailed analysis of the Blue Integrity SOUL in Undertale. Discover Ballet Shoes, Old Tutu, blue gravity physics battle mode, and core character traits.',
    gameLore: "Snowdin’s Ball Game presents Integrity in blue, while the Ballet Shoes and Old Tutu are associated with the blue human through game evidence. Undertale does not confirm that this human was a dancer.",
    battleMechanicsTitle: 'Blue SOUL Gravity Mode (Platformer Jump Physics)',
    battleMechanicsDesc: 'Papyrus and Sans cast blue magic to pull the SOUL downward with gravity. The player must jump over floor bones and land on platforms, transforming the battle into a platformer.',
    items: [
      {
        name: 'Ballet Shoes',
        type: 'Weapon',
        location: 'Waterfall Bush Path',
        stats: 'ATK +7 (Features 3 precision timing bars)',
        lore: 'Satin dance shoes with hard pointe tips that deliver triple-hit combinations when executed rhythmically.'
      },
      {
        name: 'Old Tutu',
        type: 'Armor',
        location: 'Waterfall Secret Waterfall Chamber',
        stats: 'DEF +10',
        lore: 'A layered dusty stage tutu that provides sturdy defense through graceful posture and discipline.'
      }
    ],
    personalityAnalysis: {
      coreMotivation: 'Living in alignment with personal ethics and maintaining authenticity.',
      strengths: ['Uncompromising honesty', 'High self-discipline', 'Genuine self-expression', 'Loyalty to personal code'],
      weaknesses: ['Severe self-criticism', 'Intolerance for moral gray zones', 'Inflexibility in pragmatic dilemmas'],
      realWorldTraits: 'Integrity people do what is right even when no one is watching. They feel acute physical discomfort when asked to pretend or deceive.'
    },
    labels: defaultEnLabels,
    relatedSouls: [
      { code: 'JUS', slug: 'justice', name: 'JUSTICE', colorName: 'Yellow', hex: '#ffff00' },
      { code: 'KND', slug: 'kindness', name: 'KINDNESS', colorName: 'Green', hex: '#00c000' }
    ]
  },
  perseverance: {
    code: 'PER',
    slug: 'perseverance',
    name: 'PERSEVERANCE',
    colorName: 'Purple',
    hex: '#d400d4',
    ballGameFlag: 'Purple Flag',
    ballGameQuote: "Even when you felt you were not good enough, you kept taking notes until you succeeded at 'Ball Game.'",
    tagQuote: 'When motivation faded, discipline carried me through to the end.',
    seoTitle: 'Perseverance Soul Undertale (Purple SOUL) - Lore, Items & Meaning',
    seoDescription: 'Complete guide to the Purple Perseverance SOUL in Undertale. Learn about the Torn Notebook, Cloudy Glasses, purple line-trap battle mode, and traits.',
    gameLore: "Snowdin’s Ball Game presents Perseverance in purple, while the Torn Notebook and Cloudy Glasses are associated with the purple human through game evidence. Undertale does not provide that human’s occupation or study history.",
    battleMechanicsTitle: 'Purple SOUL Web Line Switching (Three-String Traversal)',
    battleMechanicsDesc: 'Muffet pours purple cider to trap the SOUL on 3 horizontal string lines. Movement is restricted to moving left/right and hopping up and down between strings to dodge spider pets.',
    items: [
      {
        name: 'Torn Notebook',
        type: 'Weapon',
        location: 'Waterfall Gerson Shop',
        stats: 'ATK +2 (Extends INV invulnerability frames by +6)',
        lore: 'A dense notebook filled with legible study notes that prolongs post-hit invincibility when attacked.'
      },
      {
        name: 'Cloudy Glasses',
        type: 'Armor',
        location: 'Waterfall Gerson Shop',
        stats: 'DEF +5 (Extends INV invulnerability frames by +9)',
        lore: 'Thick spectacles that help the wearer anticipate danger and recover composure faster after taking damage.'
      }
    ],
    personalityAnalysis: {
      coreMotivation: 'Achieving mastery through methodical study, habit, and grit.',
      strengths: ['Scholarly discipline', 'Analytical problem solving', 'Long-term stamina', 'Resilience through preparation'],
      weaknesses: ['Prone to burnout and overwork', 'Over-analyzing simple situations', 'Reluctance to act without data'],
      realWorldTraits: 'Perseverance types do not rely on sudden bursts of motivation. They rely on daily systems, notes, and consistent routines to finish hard work.'
    },
    labels: defaultEnLabels,
    relatedSouls: [
      { code: 'DET', slug: 'determination', name: 'DETERMINATION', colorName: 'Red', hex: '#ff0000' },
      { code: 'PAT', slug: 'patience', name: 'PATIENCE', colorName: 'Cyan', hex: '#42fcff' }
    ]
  }
};

export const SOUL_SLUGS = ['determination', 'bravery', 'justice', 'kindness', 'patience', 'integrity', 'perseverance'];
