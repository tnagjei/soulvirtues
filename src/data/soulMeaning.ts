// input: None (static "what does this soul mean" copy for the 35 localized soul detail pages)
// output: SOUL_MEANING dictionary keyed by locale, plus SoulsMeaningCopy type
// pos: src/data/soulMeaning.ts（更新规则：文件变更需同步本注释与所属目录 README）
//
// 设计说明：
// - h1ColorPhrase 是 H1 的前半句模板，{color} 由 soulDetail.colorName 替换；后半句沿用既有的大写灵魂名，
//   与首页 hero 的「主文案 + 高亮 span」写法保持一致。
// - sectionHeading 直接对应用户搜索「alma <color> undertale」时想要的答案，放在首屏之后、
//   游戏机制之前，作为意图匹配与摘要抽取的首要区块。
// - bySlug 的段落只回答「这个灵魂代表什么」，不复述装备/战斗机制，避免与页面既有小节重复。

import type { Locale } from '../i18n/types';

export interface SoulsMeaningCopy {
  h1ColorPhrase: string;
  sectionHeading: string;
  bySlug: Record<string, string>;
}

export const SOUL_MEANING: Record<Locale, SoulsMeaningCopy> = {
  en: {
    h1ColorPhrase: 'The {color} Undertale SOUL',
    sectionHeading: 'What Does the {color} Soul Mean in Undertale?',
    bySlug: {
      determination:
        'The red soul stands for Determination: the refusal to accept an ending you did not choose. It is the trait tied to SAVE, LOAD and RESET, and it is the one every player carries. In practice it shows up as stubborn forward motion — you keep going even when nothing suggests things will improve, and you find it genuinely hard to walk away from an unfinished story.',
      bravery:
        'The orange soul stands for Bravery: not the absence of fear, but forward motion while afraid. Where others freeze, this trait pushes you to speak first, choose first and move first. In practice it looks like a willingness to accept a painful, visible failure over the quieter regret of never having tried at all.',
      justice:
        'The yellow soul stands for Justice: the conviction that fairness comes before comfort. Slights against you can sometimes be let go; slights against someone who could not defend themselves almost never can. In practice it makes you the person who names a wrongdoing out loud, often at a personal cost.',
      kindness:
        'The green soul stands for Kindness: warm, active empathy rather than passive politeness. It is the choice to heal instead of harm, and to keep offering warmth even when the world has not earned it. In practice it shows up as noticing who has been left out and moving toward them, absorbing hostility without passing it on.',
      patience:
        'The cyan soul stands for Patience: emotional balance and the discipline to wait. It is the ability to observe clearly while a situation is still unresolved, instead of forcing an answer that is not ready yet. In practice it keeps you steady through delay, and it tends to make you the calmest person in a room that is panicking.',
      integrity:
        'The blue soul stands for Integrity: alignment between what you believe and what you actually do. It is doing the right thing when nobody is watching, and refusing to pretend to be someone you are not. In practice it produces a strong, almost physical discomfort when you are asked to perform or to bend your own code.',
      perseverance:
        'The purple soul stands for Perseverance: methodical endurance rather than burning motivation. Where Determination is hot and stubborn, Perseverance is cool and disciplined — notes, systems, repetition. In practice it is how you finish long, unglamorous work through habit and quiet dedication instead of waiting to feel inspired.',
    },
  },

  es: {
    h1ColorPhrase: 'Alma {color} de Undertale',
    sectionHeading: '¿Qué significa el Alma {color} en Undertale?',
    bySlug: {
      determination:
        'El Alma Roja representa la Determinación: negarse a aceptar un final que no elegiste. Es el rasgo ligado a GUARDAR, CARGAR y REINICIAR, y el que lleva todo jugador. En la práctica se manifiesta como avance obstinado: sigues adelante aunque nada indique que vaya a mejorar, y te cuesta de verdad abandonar una historia sin terminar.',
      bravery:
        'El Alma Naranja representa la Valentía: no la ausencia de miedo, sino avanzar con el miedo encima. Donde otros se bloquean, este rasgo te empuja a hablar primero, elegir primero y moverte primero. En la práctica se ve como preferir un fracaso visible y doloroso antes que el arrepentimiento silencioso de no haberlo intentado.',
      justice:
        'El Alma Amarilla representa la Justicia: la convicción de que la equidad va antes que la comodidad. Las ofensas contra ti a veces se pueden soltar; las ofensas contra alguien que no podía defenderse, casi nunca. En la práctica te convierte en quien nombra una injusticia en voz alta, muchas veces pagando un coste personal.',
      kindness:
        'El Alma Verde representa la Amabilidad: empatía cálida y activa, no cortesía pasiva. Es elegir curar en lugar de dañar, y seguir ofreciendo calidez aunque el entorno no se la haya ganado. En la práctica se nota en quien detecta a los excluidos y se acerca a ellos, absorbiendo la hostilidad sin devolverla.',
      patience:
        'El Alma Cian representa la Paciencia: equilibrio emocional y disciplina para esperar. Es la capacidad de observar con claridad mientras una situación sigue sin resolverse, en lugar de forzar una respuesta que aún no está lista. En la práctica te mantiene estable ante la espera y suele hacerte la persona más calmada de una sala que entra en pánico.',
      integrity:
        'El Alma Azul representa la Integridad: coherencia entre lo que crees y lo que haces. Es hacer lo correcto cuando nadie mira y negarse a fingir ser alguien que no eres. En la práctica produce una incomodidad fuerte, casi física, cuando te piden interpretar un papel o ceder en tu propio código.',
      perseverance:
        'El Alma Morada representa la Perseverancia: resistencia metódica, no motivación ardiente. Donde la Determinación es caliente y terca, la Perseverancia es fría y disciplinada: apuntes, sistemas, repetición. En la práctica es cómo terminas trabajos largos y poco vistosos, por hábito y dedicación silenciosa en vez de esperar a sentirte inspirado.',
    },
  },

  pt: {
    h1ColorPhrase: 'Alma {color} de Undertale',
    sectionHeading: 'O que significa a Alma {color} em Undertale?',
    bySlug: {
      determination:
        'A Alma Vermelha representa a Determinação: recusar um final que você não escolheu. É o traço ligado a SALVAR, CARREGAR e REINICIAR, e o que todo jogador carrega. Na prática aparece como avanço teimoso: você continua mesmo sem sinal de melhora, e sente dificuldade real em abandonar uma história inacabada.',
      bravery:
        'A Alma Laranja representa a Bravura: não a ausência de medo, mas seguir em frente com medo. Onde outros travam, este traço empurra você a falar primeiro, escolher primeiro e agir primeiro. Na prática é preferir um fracasso visível e doloroso ao arrependimento silencioso de nunca ter tentado.',
      justice:
        'A Alma Amarela representa a Justiça: a convicção de que a equidade vem antes do conforto. Ofensas contra você às vezes podem ser soltas; contra quem não podia se defender, quase nunca. Na prática faz de você quem nomeia uma injustiça em voz alta, muitas vezes pagando um custo pessoal por isso.',
      kindness:
        'A Alma Verde representa a Bondade: empatia quente e ativa, não gentileza passiva. É escolher curar em vez de ferir e continuar oferecendo acolhimento mesmo quando o ambiente não o mereceu. Na prática aparece em quem percebe os excluídos e se aproxima deles, absorvendo hostilidade sem repassá-la.',
      patience:
        'A Alma Ciano representa a Paciência: equilíbrio emocional e disciplina para esperar. É a capacidade de observar com clareza enquanto a situação segue indefinida, em vez de forçar uma resposta que ainda não está pronta. Na prática mantém você estável diante da demora e costuma fazer de você a pessoa mais calma numa sala em pânico.',
      integrity:
        'A Alma Azul representa a Integridade: alinhamento entre o que você acredita e o que faz. É fazer o certo quando ninguém está olhando e recusar fingir ser quem você não é. Na prática gera um desconforto forte quando pedem que você atue ou ceda no seu próprio código.',
      perseverance:
        'A Alma Roxa representa a Perseverança: resistência metódica, não motivação ardente. Onde a Determinação é quente e teimosa, a Perseverança é fria e disciplinada: anotações, sistemas, repetição. Na prática é como você termina trabalhos longos e sem brilho, por hábito e dedicação silenciosa, em vez de esperar inspiração.',
    },
  },

  ja: {
    h1ColorPhrase: 'Undertale の{color}のタマシイ',
    sectionHeading: 'Undertale の{color}のタマシイに込められた意味',
    bySlug: {
      determination:
        '赤いタマシイが表すのは「ケツイ」です。自分が選んでいない結末を受け入れない意志を指し、セーブ・ロード・リセットの能力に結びついた唯一の特質であり、プレイヤー自身が持つタマシイでもあります。実際には、先が見えなくても進み続け、未完の物語を手放すことが極端に難しい形で現れます。',
      bravery:
        'オレンジのタマシイが表すのは「ゆうき」です。恐れがないことではなく、恐れたまま前に進む力を指します。周囲が固まる場面で、最初に発言し、最初に選び、最初に動くよう後押しします。実際には、何もしなかった後悔よりも、痛みを伴う失敗を選ぶ姿勢として現れます。',
      justice:
        '黄色のタマシイが表すのは「せいぎ」です。快適さより公平さを優先する信念を指します。自分への扱いには目を瞑れても、守れなかった誰かへの不当な扱いは見逃せません。実際には、不正をはっきり言葉にする役割として現れ、しばしば個人的な代償を伴います。',
      kindness:
        '緑のタマシイが表すのは「やさしさ」です。受け身の礼儀ではなく、能動的で温かい共感を指します。傷つけるより癒すことを選び、周囲に報われていなくても温かさを差し出し続けます。実際には、仲間外れになっている人に気づいて近づき、敵意を引き受けても他者へ渡さない形で現れます。',
      patience:
        '水色のタマシイが表すのは「にんたい」です。感情の均衡と、待つための規律を指します。状況が未解決のままでも冷静に観察し、準備のできていない答えを無理に引き出そうとしません。実際には、遅延の中でも姿勢を崩さず、混乱した場で最も落ち着いている人になります。',
      integrity:
        '青いタマシイが表すのは「まこと」です。信じていることと実際の行動が一致している状態を指します。誰も見ていないときでも正しい選択をし、自分ではない誰かを演じることを拒みます。実際には、自分の中核を偽れと求められたときに強い違和感として現れます。',
      perseverance:
        '紫のタマシイが表すのは「ふくつ」です。燃え上がるやる気ではなく、地道な持続力を指します。ケツイが熱く頑固であるのに対し、ふくつは冷静で規律的です。ノート、仕組み、反復によって、長く地味な作業をやり切る力として現れます。',
    },
  },

  ru: {
    h1ColorPhrase: '{color} душа Undertale',
    sectionHeading: 'Что означает {color} душа в Undertale?',
    bySlug: {
      determination:
        'Красная душа — это Решимость: отказ принимать концовку, которую вы не выбирали. Это единственная черта, связанная со способностью СОХРАНЯТЬ, ЗАГРУЖАТЬ и СБРАСЫВАТЬ, и она есть у самого игрока. На практике она проявляется как упрямое движение вперёд, когда ничто не обещает улучшений.',
      bravery:
        'Оранжевая душа — это Храбрость: не отсутствие страха, а движение вперёд, пока страшно. Там, где другие замирают, эта черта заставляет говорить первым, выбирать первым и действовать первым. На практике это готовность принять болезненную ошибку вместо тихого сожаления о бездействии.',
      justice:
        'Жёлтая душа — это Справедливость: убеждение, что честность важнее комфорта. Обиду на себя иногда можно отпустить; обиду на того, кто не мог защититься, — почти никогда. На практике вы становитесь тем, кто называет несправедливость вслух, часто за собственный счёт.',
      kindness:
        'Зелёная душа — это Доброта: тёплое и деятельное сочувствие, а не пассивная вежливость. Это выбор лечить, а не ранить, и продолжать давать тепло даже без отдачи. На практике она проявляется в тех, кто замечает исключённых и подходит к ним, принимая враждебность без ответа.',
      patience:
        'Голубая душа — это Терпение: эмоциональный баланс и дисциплина ожидания. Это способность ясно наблюдать, пока ситуация не разрешилась, вместо того чтобы вынуждать ответ, к которому ещё не готов. На практике оно удерживает вас спокойным в задержке и в паникующей комнате.',
      integrity:
        'Синяя душа — это Порядочность: согласованность между тем, во что вы верите, и тем, что вы делаете. Это поступать правильно, когда никто не смотрит, и отказываться играть чужую роль. На практике вызывает сильный дискомфорт, когда от вас требуют поступиться собственными принципами.',
      perseverance:
        'Фиолетовая душа — это Настойчивость: методичная выносливость, а не яркая мотивация. Где Решимость горяча и упряма, Настойчивость холодна и дисциплинированна: записи, системы, повторение. На практике это умение доводить долгую и неяркую работу до конца за счёт привычки.',
    },
  },
};
