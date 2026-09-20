// input: None (static detailed metadata and lore for 7 Undertale soul traits in English)
// output: Exported SOUL_DETAILS dictionary with evidence-bounded lore, equipment, mechanics, flags, deepDive essays, and SEO copy
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
  deepDiveHeading: string;
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
  deepDive: string[];
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
  deepDiveHeading: 'Going Deeper: The Trait in Real Life',
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
    gameLore: 'Undertale establishes Determination as a power connected with human SOUL persistence and SAVE. The game does not explicitly name Determination as the Red SOUL trait; that label is a familiar fan interpretation. For a direct breakdown of raw willpower versus disciplined routine, compare <a href="/compare/determination-vs-perseverance/" class="text-red-400 hover:text-white underline font-semibold">Determination vs Perseverance</a>.',
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
    deepDive: [
      'In everyday life Determination rarely looks like a dramatic last stand. It looks like the eleventh job application sent after ten rejections, the fitness plan restarted after every lapse, and the difficult conversation reopened because walking away felt worse. People led by this trait keep goals alive long after others would archive them. The drive is not borrowed from hype or competition; it renews itself each time things go wrong. That self-restarting quality is why Determination often outlasts talent, luck, and even support from the people around it.',
      'A common misconception is that Determination means never stopping. In reality the mature form of this trait includes honest cost accounting: knowing which wall deserves another attempt and which wall is information that a route has closed. Determination blended with Perseverance becomes patient, systemized endurance, while Determination blended with Bravery becomes decisive risk-taking under pressure. Left unbalanced, the same fuel narrows into tunnel vision, where quitting any path feels like losing a part of the self. Naming that fear is usually the first step toward flexibility.',
      'Two questions help separate healthy resolve from stubborn harm. First, after a setback, do you adapt the plan within days, or replay the loss for weeks without changing anything? Second, are you pursuing this goal because it still matters to you, or mainly because quitting would feel unbearable? Writing down what you refuse to sacrifice, such as sleep, health, or close relationships, converts raw willpower into a sustainable long-term engine. Determination at its best is not a refusal to fall; it is a refusal to stop deciding who you want to become.'
    ],
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
    deepDive: [
      'Bravery in daily life is rarely cinematic. It is the hand raised in a meeting when everyone else stays silent, the first message sent to someone new, and the decision to start over in a city where you know nobody. People with this core move toward discomfort while it is still small, which is why their problems often stay solvable. They feel fear like anyone else; the difference is that fear functions as a starting signal rather than a stop sign. Momentum, once created, tends to protect itself.',
      'The most common misunderstanding is equating Bravery with the absence of caution. True courage includes choosing which risks are worth taking, and knowing that some charges are better delayed. Combined with Patience, Bravery becomes well-timed courage that strikes at the right moment; combined with Justice, it becomes the willingness to defend others at personal cost. Without balance, the same impulse can slide into recklessness, mistaking speed for wisdom and exhaustion for commitment. Brave people need honest friends who can say wait, not only go.',
      'A practical self-check: when you avoid something today, is it because the timing is wrong, or because the fear is loud? Writing down the worst realistic outcome of an avoided action often shrinks it to a manageable size. Bravery grows through repetition, not through one grand gesture. Start with actions that scare you at level three out of ten, complete them, and let the evidence accumulate. Over time the comfort zone expands from the inside, and the trait becomes a reliable habit rather than a mood that comes and goes.'
    ],
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
    deepDive: [
      'Justice shows up in small, repeated moments long before it appears in dramatic stands: correcting an unfair rumor about a colleague, splitting a group bill precisely because someone quietly overpaid, or naming a rule that everyone else quietly ignores. People with this core keep an internal ledger of fairness, and imbalance genuinely bothers them, sometimes physically. They are often the person others consult when a conflict needs an honest reading. Their loyalty attaches first to principles, then to personalities, which makes their approval meaningful and their criticism useful.',
      'The shadow side deserves attention. A strong fairness drive can harden into black-and-white judgment, where every dispute has one guilty party and context gets flattened. Justice blended with Kindness becomes advocacy that protects people while correcting systems; blended with Integrity, it becomes a life of consistent principles even at personal cost. Without empathy as a counterweight, the same trait can turn self-righteous, punishing others for faults it excuses in itself. The healthiest Justice holders ask whose voice is missing from the verdict before closing the case.',
      'Useful reflection: when you feel wronged, do you seek to be effective or merely to be right? Before confronting an unfair situation, write down what outcome would actually repair the harm, because anger without a goal often recreates the unfairness in reverse. Practicing proportional responses, such as asking one clarifying question before issuing a judgment, keeps the trait credible. Justice is most powerful when it is patient enough to hear the whole story and still firm enough to act on it. That combination is rare, and people notice it.'
    ],
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
    deepDive: [
      'Kindness is often mistaken for softness, yet in daily life it functions more like infrastructure: the colleague who notices the newcomer eating alone, the friend who remembers the difficult date on your calendar, the stranger who returns the dropped wallet without expecting applause. People with this core track emotional weather that others miss. They give without invoicing, which makes them anchors in families, teams, and friendships. Their warmth is strategic in the best sense, directed where it genuinely reduces suffering rather than where it earns visible credit.',
      'The recurring failure mode is boundary collapse. Givers attract takers, and Kindness without limits becomes a martyr cycle: resentment builds quietly while the surface keeps smiling. Blended with Justice, Kindness learns to say no to exploitation while still defending the vulnerable; blended with Patience, it becomes steady long-term care instead of dramatic rescue missions. The green heart serves best when it accepts a hard truth: you cannot pour sustainably from an empty container, and protecting your own energy is part of the service, not a betrayal of it.',
      'Practical checks: do you apologize for having needs, or state them plainly? When someone repeatedly takes without reciprocating, do you adjust, or double your giving hoping to earn fairness? One useful habit is scheduling generosity, deliberately reserving rest as seriously as helping others. Another is asking before rescuing, because unsolicited saving can quietly communicate that someone cannot cope. Kindness at full strength is not endless sacrifice; it is reliable warmth with working boundaries, the kind people trust for decades rather than admire briefly and forget.'
    ],
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
    deepDive: [
      'Patience is frequently misread as slowness, but in practice it is precise timing. It is the negotiator who lets a bad offer die without rushing to fill silence, the parent who repeats the same instruction calmly for the fifth time, and the builder who ships in a year what others abandon in a month. People with this core tolerate uncertainty without needing immediate relief. That tolerance lets them see patterns that hurried people miss, and their decisions carry fewer expensive corrections precisely because they were not made under artificial urgency.',
      'The trap is hesitation disguised as wisdom. Waiting forever on a decision that deserves ten minutes is its own form of error. Patience blended with Bravery becomes strategic boldness, striking exactly when the window opens; blended with Perseverance, it becomes the long game, where slow visible progress compounds. The cyan heart works best with deadlines attached: patience for outcomes, urgency for preparation. Deciding in advance what signal will trigger action, such as a date, a threshold, or a repeated event, prevents calm observation from decaying into passivity.',
      'A useful audit: list the three things you are currently waiting on, and for each ask whether waiting is a strategy or a hiding place. For genuine strategy, write down the condition that will end the wait. For hiding, take the smallest possible action this week. Patience also benefits from physical anchors, because calm is easier to maintain with steady sleep, walks, and breathing than through willpower alone. Managed well, this trait becomes quiet authority: the person in the room who panics last and therefore decides best.'
    ],
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
    deepDive: [
      'Integrity lives in unglamorous choices: admitting the mistake before anyone checks the records, giving back the extra change, refusing to laugh at the joke that targets someone absent. People with this core experience alignment between values and actions as physical comfort, and deception as a kind of low-grade pain. That internal consistency makes them predictable in the best way; colleagues hand them sensitive work without elaborate contracts. Their word functions like a signature, and over years this quietly compounds into a reputation that no marketing budget could buy.',
      'The pressure point is rigidity. High principles can shade into harsh self-judgment and intolerance for moral gray zones, where ordinary compromises feel like betrayals. Integrity blended with Kindness becomes honesty delivered with care, truthful but not wounding; blended with Justice, it becomes principled conduct that also protects others from unfair systems. The blue heart stays healthy when it accepts that integrity concerns your own conduct, not the policing of everyone else. Standards applied inward build trust; the same standards weaponized outward build distance and quiet resentment.',
      'Two habits protect this trait. First, decide hard cases before meeting them: define in advance what you will do when asked to cover for a friend, exaggerate on a resume, or stay silent about a harm. Pre-decided positions hold better under social pressure. Second, keep the repair path open: integrity is not flawlessness but a pattern of honest correction, and a fast apology is itself an act of alignment. Ask regularly whether your public story and private behavior would still match if everyone could read both.'
    ],
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
    gameLore: 'Snowdin’s Ball Game presents Perseverance in purple, while the Torn Notebook and Cloudy Glasses are associated with the purple human through game evidence. Undertale does not provide that human’s occupation or study history. To examine how quiet discipline contrasts with outcome-driven resolve, see our analysis of <a href="/compare/determination-vs-perseverance/" class="text-purple-400 hover:text-white underline font-semibold">Determination vs Perseverance</a>.',
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
    deepDive: [
      'Perseverance is the methodical cousin of grit: the language learner who completes the daily deck for two years, the researcher who fills the notebook before trusting a hunch, the small builder who ships weekly improvements while others wait for inspiration. People with this core convert effort into systems, and systems into results that survive bad days. They rarely need dramatic motivation because the structure carries them when enthusiasm dips. Their progress often looks unimpressive from week to week and unbeatable when viewed across whole years of accumulated work.',
      'The cost is burnout risk. The same engine that refuses to skip a day can also refuse to rest, and over-analysis can stretch simple decisions into research projects. Perseverance blended with Patience becomes durable long-horizon consistency; blended with Determination, it becomes unstoppable follow-through on goals that genuinely matter. The purple heart stays healthy when rest is scheduled with the same discipline as work, treated as maintenance rather than theft. Progress metrics should include recovery, because a system that cannot pause eventually breaks at the worst possible moment.',
      'Practical checks: do your goals have weekly processes attached, or only outcomes attached? Write the process version, such as thirty focused minutes rather than fluency, and let the streak do the motivating. When stuck, ask whether the problem needs more effort or a different method, because persisting with a broken approach is waste wearing the costume of virtue. Review your notes monthly to see the distance traveled. Perseverance at its best is not suffering beautifully; it is boring, repeatable progress that quietly outlasts every flashier strategy.'
    ],
    labels: defaultEnLabels,
    relatedSouls: [
      { code: 'DET', slug: 'determination', name: 'DETERMINATION', colorName: 'Red', hex: '#ff0000' },
      { code: 'PAT', slug: 'patience', name: 'PATIENCE', colorName: 'Cyan', hex: '#42fcff' }
    ]
  }
};

export const SOUL_SLUGS = ['determination', 'bravery', 'justice', 'kindness', 'patience', 'integrity', 'perseverance'];
