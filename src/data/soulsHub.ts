// input: None (static hub-page copy for the /souls/ index route in 5 locales)
// output: SOULS_HUB_COPY dictionary keyed by locale, plus SoulsHubCopy type
// pos: src/data/soulsHub.ts（更新规则：文件变更需同步本注释与所属目录 README）

import type { Locale } from '../i18n/types';

export interface SoulsHubCopy {
  metaTitle: string;
  metaDescription: string;
  h1: string;
  lede: string[];
  breadcrumbHome: string;
  tableHeaders: { color: string; trait: string; meaning: string; detail: string };
  sectionWhatTitle: string;
  sectionWhatBody: string[];
  sectionListTitle: string;
  sectionListSub: string;
  sectionHumanTitle: string;
  sectionHumanBody: string[];
  sectionStrongestTitle: string;
  sectionStrongestBody: string[];
  sectionTestTitle: string;
  sectionTestBody: string;
  faqTitle: string;
  faqSub: string;
  faq: { q: string; a: string }[];
  ctaTitle: string;
  ctaBody: string;
  ctaButton: string;
  evidenceNote: string;
  detailLinkLabel: string;
  navLabel: string;
}

export const SOULS_HUB_COPY: Record<Locale, SoulsHubCopy> = {
  en: {
    metaTitle: 'The 7 Undertale Souls: Colors, Traits and Meanings',
    metaDescription: 'All 7 Undertale souls and their colors: Red, Orange, Yellow, Green, Cyan, Blue and Purple. Learn which trait each soul represents and what it means.',
    h1: 'The 7 Undertale Souls: Colors, Traits and Meanings',
    lede: [
      'Undertale revolves around human souls, each tied to a color and a single defining trait. Seven of them appear across the game: Determination, Bravery, Justice, Kindness, Patience, Integrity and Perseverance.',
      'This page lists all seven souls in one place — their color, the trait they represent, and what that trait means in practice. Each entry links to a full breakdown covering loot, battle mechanics and personality.',
    ],
    breadcrumbHome: 'Home',
    tableHeaders: { color: 'Color', trait: 'Trait', meaning: 'What it means', detail: 'Details' },
    sectionWhatTitle: 'What Are the 7 Undertale Souls?',
    sectionWhatBody: [
      'Every human in Undertale has a soul that determines the color of their SOUL mode and, according to the game\'s internal logic, the trait that defines them. The Snowdin Ball Game is the clearest in-game source: each flag you can win is named after one of these traits.',
      'A soul is not a personality type in the strict sense. It marks the dominant drive of that person — the thing they fall back on under pressure. That is why two people with the same soul color can behave very differently in ordinary life.',
    ],
    sectionListTitle: 'All 7 Souls and Their Colors',
    sectionListSub: 'Color, trait and meaning side by side. Tap any soul for the full page.',
    sectionHumanTitle: 'Human Souls vs SOUL Modes in Battle',
    sectionHumanBody: [
      'Do not confuse a human\'s soul color with the SOUL mode you are forced into during a boss fight. Undyne turns your SOUL green to force blocking, Mettaton turns it yellow to hand you a gun, and Muffet turns it purple to restrict you to horizontal lines.',
      'Those battle modes are mechanics, not identities. A green SOUL mode in battle does not make the player Kindness, and a yellow mode does not make them Justice. The battle mode simply mirrors the trait the boss is testing.',
    ],
    sectionStrongestTitle: 'Which Undertale Soul Is the Strongest?',
    sectionStrongestBody: [
      'There is no official ranking, and any answer is interpretation rather than fact. What the game does show consistently is that Determination is the rarest and the one tied to the ability to SAVE, LOAD and RESET — which is why it is usually treated as the strongest in fan discussion.',
      'In practice, strength in Undertale is written as situational. Perseverance outlasts, Bravery acts first, Justice refuses to let a wrong stand, Kindness absorbs harm, Patience waits, and Integrity refuses to bend. None of them is written as universally better.',
    ],
    sectionTestTitle: 'Find Out Which Soul You Have',
    sectionTestBody: 'Reading about the seven souls tells you what each one means. To find out which one is actually dominant in you, the free 66-question test scores your answers against all seven traits at once and returns a percentage breakdown.',
    faqTitle: 'Frequently Asked Questions',
    faqSub: 'Short answers to the questions people ask most about the seven souls.',
    faq: [
      {
        q: 'How many souls are there in Undertale?',
        a: 'There are seven human souls with an assigned color and trait: Determination (red), Bravery (orange), Justice (yellow), Kindness (green), Patience (cyan), Integrity (blue) and Perseverance (purple). Monsters have souls too, but those are inverted and not assigned one of the seven colors.',
      },
      {
        q: 'Are the trait names official?',
        a: 'The colors are shown in the game, and the trait names come from the Snowdin Ball Game flags. Undertale does not attach a full personality profile to each one, so anything beyond the name is fan interpretation rather than confirmed canon.',
      },
      {
        q: 'Can you have more than one soul trait?',
        a: 'The game assigns one soul per human, but a test that scores all seven traits at once usually returns a mix with clear leaders rather than a single 100% result. Being dominant in one trait does not mean the others are absent.',
      },
      {
        q: 'What is the rarest soul in Undertale?',
        a: 'Determination is the rarest in the game\'s story: only the fallen human and the player carry it, which is why it is treated separately from the other six.',
      },
    ],
    ctaTitle: 'Discover Your Own Soul',
    ctaBody: 'Answer 66 questions and get your percentage breakdown across all seven traits. Free, no sign-up, and nothing leaves your browser.',
    ctaButton: 'Take the 66-Question Soul Test',
    evidenceNote: 'The seven colors are shown in game. The trait labels come from the Snowdin Ball Game flags, and the personality descriptions are fan interpretation built on that evidence — not official Undertale canon.',
    detailLinkLabel: 'Full breakdown',
    navLabel: 'See all 7 souls and their colors',
  },

  es: {
    metaTitle: 'Guía de las 7 Almas de Undertale: Colores y Significado',
    metaDescription: 'Las 7 almas de Undertale y sus colores: Roja, Naranja, Amarilla, Verde, Cian, Azul y Morada. Descubre qué rasgo representa cada una y su significado.',
    h1: 'Las 7 Almas de Undertale: Colores y Significado',
    lede: [
      'Undertale gira alrededor de las almas humanas. Cada una está ligada a un color y a un rasgo que la define: Determinación, Valentía, Justicia, Amabilidad, Paciencia, Integridad y Perseverancia.',
      'En esta página están las siete reunidas: su color, el rasgo que representan y qué significa ese rasgo en la práctica. Cada una enlaza a su ficha completa con objetos, mecánicas de combate y perfil de personalidad.',
    ],
    breadcrumbHome: 'Inicio',
    tableHeaders: { color: 'Color', trait: 'Rasgo', meaning: 'Qué significa', detail: 'Detalle' },
    sectionWhatTitle: '¿Qué son las 7 Almas de Undertale?',
    sectionWhatBody: [
      'Cada humano de Undertale tiene un alma que determina el color de su modo de ALMA y, según la lógica interna del juego, el rasgo que lo define. El Juego de Pelota de Snowdin es la fuente más clara: cada bandera que se puede ganar lleva el nombre de uno de estos rasgos.',
      'Un alma no es un tipo de personalidad en sentido estricto. Marca el impulso dominante de esa persona, aquello a lo que recurre cuando está bajo presión. Por eso dos personas con el mismo color de alma pueden comportarse de forma muy distinta en la vida cotidiana.',
    ],
    sectionListTitle: 'Las 7 Almas y sus Colores',
    sectionListSub: 'Color, rasgo y significado uno al lado del otro. Entra en cualquiera para ver la ficha completa.',
    sectionHumanTitle: 'Almas Humanas y Modos de ALMA en Combate',
    sectionHumanBody: [
      'No confundas el color del alma de un humano con el modo de ALMA al que te obliga un jefe durante la batalla. Undyne vuelve tu ALMA verde para forzar el bloqueo, Mettaton la vuelve amarilla para darte un arma y Muffet la vuelve morada para restringirte a líneas horizontales.',
      'Esos modos son mecánicas, no identidades. Que tu ALMA sea verde en combate no te convierte en Amabilidad, ni el amarillo en Justicia. El modo de batalla solo refleja el rasgo que ese jefe está poniendo a prueba.',
    ],
    sectionStrongestTitle: '¿Cuál es el Alma más Fuerte de Undertale?',
    sectionStrongestBody: [
      'No existe un ranking oficial, y cualquier respuesta es interpretación, no un hecho. Lo que el juego sí muestra de forma constante es que la Determinación es la más rara y la única ligada a la capacidad de GUARDAR, CARGAR y REINICIAR, motivo por el cual suele considerarse la más fuerte al hablar del tema.',
      'En la práctica, la fuerza en Undertale está escrita como situacional. La Perseverancia aguanta más, la Valentía actúa primero, la Justicia no deja pasar una injusticia, la Amabilidad absorbe el daño, la Paciencia espera y la Integridad no se dobla. Ninguna está escrita como mejor de forma universal.',
    ],
    sectionTestTitle: 'Descubre Qué Alma Tienes',
    sectionTestBody: 'Leer sobre las siete almas te dice qué significa cada una. Para saber cuál domina en ti, el test gratuito de 66 preguntas puntúa tus respuestas contra los siete rasgos a la vez y te devuelve un desglose porcentual.',
    faqTitle: 'Preguntas Frecuentes',
    faqSub: 'Respuestas cortas a lo que más se pregunta sobre las siete almas.',
    faq: [
      {
        q: '¿Cuántas almas hay en Undertale?',
        a: 'Hay siete almas humanas con color y rasgo asignados: Determinación (roja), Valentía (naranja), Justicia (amarilla), Amabilidad (verde), Paciencia (cian), Integridad (azul) y Perseverancia (morada). Los monstruos también tienen alma, pero están invertidas y no llevan ninguno de esos siete colores.',
      },
      {
        q: '¿Los nombres de los rasgos son oficiales?',
        a: 'Los colores sí aparecen en el juego, y los nombres de los rasgos provienen de las banderas del Juego de Pelota de Snowdin. Undertale no asocia un perfil de personalidad completo a cada uno, así que todo lo que va más allá del nombre es interpretación de fans y no canon confirmado.',
      },
      {
        q: '¿Se puede tener más de un rasgo de alma?',
        a: 'El juego asigna un alma por humano, pero un test que puntúa los siete rasgos a la vez suele devolver una mezcla con líderes claros en lugar de un único resultado al 100%. Ser dominante en un rasgo no significa que los demás no estén presentes.',
      },
      {
        q: '¿Cuál es el alma más rara de Undertale?',
        a: 'La Determinación es la más rara en la historia del juego: solo el humano caído y el jugador la portan, y por eso se trata aparte de las otras seis.',
      },
    ],
    ctaTitle: 'Descubre tu Propia Alma',
    ctaBody: 'Responde 66 preguntas y obtén tu desglose porcentual en los siete rasgos. Gratis, sin registro y nada sale de tu navegador.',
    ctaButton: 'Hacer el Test de Almas de Undertale',
    evidenceNote: 'Los siete colores aparecen en el juego. Las etiquetas de los rasgos provienen de las banderas del Juego de Pelota de Snowdin, y las descripciones de personalidad son interpretación de fans construida sobre esa evidencia, no canon oficial de Undertale.',
    detailLinkLabel: 'Ficha completa',
    navLabel: 'Ver las 7 almas y sus colores',
  },

  pt: {
    metaTitle: 'As 7 Almas de Undertale: Cores, Traços e Significados',
    metaDescription: 'As 7 almas de Undertale e suas cores: Vermelha, Laranja, Amarela, Verde, Ciano, Azul e Roxa. Descubra qual traço cada uma representa e seu significado.',
    h1: 'As 7 Almas de Undertale: Cores, Traços e Significados',
    lede: [
      'Undertale gira em torno das almas humanas. Cada uma está ligada a uma cor e a um traço que a define: Determinação, Bravura, Justiça, Bondade, Paciência, Integridade e Perseverança.',
      'Nesta página estão as sete reunidas: a cor, o traço que representam e o que esse traço significa na prática. Cada uma leva à ficha completa com itens, mecânicas de batalha e perfil de personalidade.',
    ],
    breadcrumbHome: 'Início',
    tableHeaders: { color: 'Cor', trait: 'Traço', meaning: 'O que significa', detail: 'Detalhes' },
    sectionWhatTitle: 'O que são as 7 Almas de Undertale?',
    sectionWhatBody: [
      'Todo humano em Undertale tem uma alma que determina a cor do seu modo de ALMA e, pela lógica interna do jogo, o traço que o define. O Jogo da Bola de Snowdin é a fonte mais clara: cada bandeira que se pode ganhar leva o nome de um desses traços.',
      'Uma alma não é um tipo de personalidade em sentido estrito. Ela marca o impulso dominante daquela pessoa, aquilo a que ela recorre sob pressão. Por isso duas pessoas com a mesma cor de alma podem agir de formas bem diferentes no dia a dia.',
    ],
    sectionListTitle: 'As 7 Almas e suas Cores',
    sectionListSub: 'Cor, traço e significado lado a lado. Toque em qualquer alma para ver a página completa.',
    sectionHumanTitle: 'Almas Humanas e Modos de ALMA em Batalha',
    sectionHumanBody: [
      'Não confunda a cor da alma de um humano com o modo de ALMA que um chefe impõe durante a batalha. Undyne deixa sua ALMA verde para forçar o bloqueio, Mettaton deixa amarela para te dar uma arma e Muffet deixa roxa para restringir você a linhas horizontais.',
      'Esses modos são mecânicas, não identidades. Sua ALMA ficar verde em combate não faz de você Bondade, nem o amarelo faz de você Justiça. O modo de batalha apenas espelha o traço que aquele chefe está testando.',
    ],
    sectionStrongestTitle: 'Qual é a Alma mais Forte de Undertale?',
    sectionStrongestBody: [
      'Não existe um ranking oficial, e qualquer resposta é interpretação, não fato. O que o jogo mostra de forma consistente é que a Determinação é a mais rara e a única ligada à capacidade de SALVAR, CARREGAR e REINICIAR, o que costuma fazê-la ser tratada como a mais forte nas discussões.',
      'Na prática, a força em Undertale é escrita como situacional. A Perseverança aguenta mais, a Bravura age primeiro, a Justiça não deixa uma injustiça passar, a Bondade absorve o dano, a Paciência espera e a Integridade não se dobra. Nenhuma é escrita como universalmente melhor.',
    ],
    sectionTestTitle: 'Descubra Qual Alma Você Tem',
    sectionTestBody: 'Ler sobre as sete almas diz o que cada uma significa. Para saber qual domina em você, o teste gratuito de 66 perguntas pontua suas respostas nos sete traços ao mesmo tempo e devolve uma divisão percentual.',
    faqTitle: 'Perguntas Frequentes',
    faqSub: 'Respostas curtas para as dúvidas mais comuns sobre as sete almas.',
    faq: [
      {
        q: 'Quantas almas existem em Undertale?',
        a: 'São sete almas humanas com cor e traço atribuídos: Determinação (vermelha), Bravura (laranja), Justiça (amarela), Bondade (verde), Paciência (ciano), Integridade (azul) e Perseverança (roxa). Monstros também têm alma, mas elas são invertidas e não recebem nenhuma dessas sete cores.',
      },
      {
        q: 'Os nomes dos traços são oficiais?',
        a: 'As cores aparecem no jogo e os nomes dos traços vêm das bandeiras do Jogo da Bola de Snowdin. Undertale não associa um perfil de personalidade completo a cada uma, então tudo além do nome é interpretação de fãs, não cânone confirmado.',
      },
      {
        q: 'É possível ter mais de um traço de alma?',
        a: 'O jogo atribui uma alma por humano, mas um teste que pontua os sete traços ao mesmo tempo costuma devolver uma mistura com líderes claros em vez de um resultado único de 100%. Ser dominante em um traço não significa que os outros estejam ausentes.',
      },
      {
        q: 'Qual é a alma mais rara de Undertale?',
        a: 'A Determinação é a mais rara na história do jogo: apenas o humano caído e o jogador a carregam, e por isso ela é tratada separadamente das outras seis.',
      },
    ],
    ctaTitle: 'Descubra sua Própria Alma',
    ctaBody: 'Responda 66 perguntas e receba sua divisão percentual nos sete traços. Gratuito, sem cadastro e nada sai do seu navegador.',
    ctaButton: 'Fazer o Teste de Almas de Undertale',
    evidenceNote: 'As sete cores aparecem no jogo. As etiquetas dos traços vêm das bandeiras do Jogo da Bola de Snowdin, e as descrições de personalidade são interpretação de fãs construída sobre essa evidência, não cânone oficial de Undertale.',
    detailLinkLabel: 'Ficha completa',
    navLabel: 'Ver as 7 almas e suas cores',
  },

  ja: {
    metaTitle: 'Undertaleの7つの魂まとめ｜色・特徴・意味を一覧で解説【赤・橙・黄・緑・水色・青・紫】',
    metaDescription: 'Undertaleに登場する7つの魂（赤・橙・黄・緑・水色・青・紫）の色と特徴、それぞれが表す意味を一覧で解説。無料の66問テストで自分の魂も診断できます。',
    h1: 'Undertaleの7つの魂：色・特徴・意味',
    lede: [
      'Undertaleは人間の「タマシイ」を軸にした物語です。タマシイはそれぞれ色と、その人を定義する1つの特徴に対応します。決意・勇気・正義・親切・忍耐・誠実・不屈の7つです。',
      'このページでは7つを一覧にまとめました。色、対応する特徴、そしてその特徴が実際に何を意味するのかを並べています。各項目からは、装備・戦闘ギミック・性格分析を含む詳細ページへ移動できます。',
    ],
    breadcrumbHome: 'ホーム',
    tableHeaders: { color: '色', trait: '特徴', meaning: '意味', detail: '詳細' },
    sectionWhatTitle: 'Undertaleの7つの魂とは',
    sectionWhatBody: [
      'Undertaleに登場する人間はそれぞれタマシイを持ち、それが戦闘中のタマシイの色と、その人を定義する特徴を決めます。最も明確な作中の根拠はスノーフルの「ボールゲーム」で、獲得できる旗にはこの7つの特徴の名前が付けられています。',
      'タマシイは厳密な意味での性格分類ではありません。その人が追い詰められたときに拠り所にする、支配的な衝動を示すものです。同じ色のタマシイを持つ二人でも、日常の振る舞いは大きく異なります。',
    ],
    sectionListTitle: '7つの魂と色の一覧',
    sectionListSub: '色・特徴・意味を並べて比較できます。各項目から詳細ページへ移動できます。',
    sectionHumanTitle: '人間のタマシイと戦闘中のタマシイモード',
    sectionHumanBody: [
      '人間のタマシイの色と、ボス戦で強制的に切り替わるタマシイモードを混同しないでください。Undyneはタマシイを緑にしてブロックを強制し、Mettatonは黄色にして銃を渡し、Muffetは紫にして左右の動きだけに制限します。',
      'これらはゲームの仕組みであり、正体ではありません。戦闘でタマシイが緑だからといってプレイヤーが「親切」になるわけではなく、黄色だから「正義」になるわけでもありません。ボスのタマシイモードは、そのボスが試している特徴を映しているだけです。',
    ],
    sectionStrongestTitle: 'Undertaleで最も強い魂はどれか',
    sectionStrongestBody: [
      '公式な順位は存在せず、どの答えも事実ではなく解釈です。作中で一貫して示されるのは、決意が最も希少で、セーブ・ロード・リセットの能力に結びついた唯一の特徴だという点です。そのため一般には最も強いものとして扱われます。',
      '実際のところ、Undertaleにおける強さは状況依存として描かれています。不屈は耐え続け、勇気は最初に動き、正義は不正を放置せず、親切はダメージを引き受け、忍耐は待ち、誠実は曲がりません。どれかが普遍的に優れているとは描かれていません。',
    ],
    sectionTestTitle: '自分の魂を診断する',
    sectionTestBody: '7つの魂を読めば、それぞれの意味が分かります。自分の中でどれが優勢かを知るには、無料の66問テストが7つの特徴すべてを同時に採点し、割合として結果を返します。',
    faqTitle: 'よくある質問',
    faqSub: '7つの魂について特によく聞かれる点への短い回答です。',
    faq: [
      {
        q: 'Undertaleには何個の魂がありますか',
        a: '色と特徴が割り当てられた人間のタマシイが7つあります。決意（赤）、勇気（橙）、正義（黄）、親切（緑）、忍耐（水色）、誠実（青）、不屈（紫）です。モンスターにもタマシイはありますが、それらは反転しており、この7色のどれにも当てはまりません。',
      },
      {
        q: '特徴の名前は公式ですか',
        a: '色は作中に登場し、特徴の名前はスノーフルのボールゲームの旗に由来します。Undertaleはそれぞれに完全な性格プロファイルを与えているわけではないため、名前以外の部分はファンの解釈であり、確定した公式設定ではありません。',
      },
      {
        q: '複数の魂の特徴を持つことはできますか',
        a: 'ゲーム上は1人の人間に1つのタマシイが割り当てられますが、7つすべてを同時に採点するテストでは、100%の単一結果ではなく、明確な優劣のある混合として返るのが一般的です。1つの特徴が優勢でも、他が存在しないわけではありません。',
      },
      {
        q: '最も珍しい魂はどれですか',
        a: '作中の物語において最も希少なのは決意です。落ちてきた人間とプレイヤーだけが持つため、他の6つとは別扱いされています。',
      },
    ],
    ctaTitle: '自分のタマシイを診断する',
    ctaBody: '66問に答えると、7つの特徴すべての割合が表示されます。無料・登録不要で、データはブラウザの外に出ません。',
    ctaButton: '66問のUndertale魂診断を始める',
    evidenceNote: '7つの色は作中に登場します。特徴の名前はスノーフルのボールゲームの旗に由来し、性格の記述はその根拠に基づくファンの解釈です。公式設定ではありません。',
    detailLinkLabel: '詳細を見る',
    navLabel: '7つの魂と色をまとめて見る',
  },

  ru: {
    metaTitle: '7 душ Undertale: цвета, черты и значения',
    metaDescription: 'Все 7 душ Undertale и их цвета: красная, оранжевая, жёлтая, зелёная, голубая, синяя и фиолетовая. Узнайте, какую черту представляет каждая душа.',
    h1: '7 душ Undertale: цвета, черты и значения',
    lede: [
      'Undertale строится вокруг человеческих душ. Каждая связана с цветом и одной определяющей чертой: Решимость, Храбрость, Справедливость, Доброта, Терпение, Честность и Упорство.',
      'На этой странице собраны все семь: цвет, представляемая черта и то, что эта черта значит на практике. Каждая душа ведёт на полную страницу с предметами, механикой боя и психологическим профилем.',
    ],
    breadcrumbHome: 'Главная',
    tableHeaders: { color: 'Цвет', trait: 'Черта', meaning: 'Что значит', detail: 'Подробнее' },
    sectionWhatTitle: 'Что такое 7 душ Undertale',
    sectionWhatBody: [
      'У каждого человека в Undertale есть душа, которая задаёт цвет режима ДУШИ и, по внутренней логике игры, определяющую его черту. Самый ясный источник в игре — «Игра с мячом» в Сноудине: каждый флаг, который можно выиграть, назван по одной из этих черт.',
      'Душа — это не тип личности в строгом смысле. Она отмечает ведущий импульс человека, то, на что он опирается под давлением. Поэтому два человека с одинаковым цветом души могут вести себя в обычной жизни совершенно по-разному.',
    ],
    sectionListTitle: 'Все 7 душ и их цвета',
    sectionListSub: 'Цвет, черта и значение рядом. Выберите любую душу, чтобы открыть полную страницу.',
    sectionHumanTitle: 'Души людей и режимы ДУШИ в бою',
    sectionHumanBody: [
      'Не путайте цвет души человека с режимом ДУШИ, в который вас принудительно переводит босс. Undyne делает ДУШУ зелёной, чтобы заставить блокировать, Mettaton делает её жёлтой, вручая оружие, а Muffet делает её фиолетовой, ограничивая движение горизонтальными линиями.',
      'Эти режимы — механика, а не сущность. Зелёная ДУША в бою не делает игрока Добротой, а жёлтая — Справедливостью. Режим боя лишь отражает ту черту, которую проверяет конкретный босс.',
    ],
    sectionStrongestTitle: 'Какая душа в Undertale самая сильная',
    sectionStrongestBody: [
      'Официального рейтинга не существует, и любой ответ — интерпретация, а не факт. Игра последовательно показывает одно: Решимость самая редкая и единственная, связанная со способностью СОХРАНЯТЬ, ЗАГРУЖАТЬ и СБРАСЫВАТЬ, поэтому в обсуждениях её обычно считают сильнейшей.',
      'На практике сила в Undertale подана как ситуативная. Упорство выдерживает дольше, Храбрость действует первой, Справедливость не позволяет оставить проступок без ответа, Доброта принимает урон на себя, Терпение ждёт, а Честность не гнётся. Ни одна не описана как универсально лучшая.',
    ],
    sectionTestTitle: 'Узнайте, какая душа у вас',
    sectionTestBody: 'Чтение о семи душах объясняет, что означает каждая. Чтобы понять, какая доминирует у вас, бесплатный тест из 66 вопросов оценивает ответы сразу по всем семи чертам и возвращает процентное распределение.',
    faqTitle: 'Частые вопросы',
    faqSub: 'Короткие ответы на самые частые вопросы о семи душах.',
    faq: [
      {
        q: 'Сколько душ в Undertale?',
        a: 'Семь человеческих душ с назначенным цветом и чертой: Решимость (красная), Храбрость (оранжевая), Справедливость (жёлтая), Доброта (зелёная), Терпение (голубая), Честность (синяя) и Упорство (фиолетовая). У монстров тоже есть души, но они перевёрнуты и не получают ни одного из этих семи цветов.',
      },
      {
        q: 'Названия черт официальные?',
        a: 'Цвета показаны в игре, а названия черт происходят от флагов «Игры с мячом» в Сноудине. Undertale не приписывает каждой полный профиль личности, поэтому всё за пределами названия — интерпретация фанатов, а не подтверждённый канон.',
      },
      {
        q: 'Можно ли иметь больше одной черты души?',
        a: 'Игра назначает по одной душе на человека, но тест, оценивающий все семь черт сразу, обычно возвращает смесь с явными лидерами, а не единственный результат в 100%. Доминирование в одной черте не означает отсутствия остальных.',
      },
      {
        q: 'Какая душа в Undertale самая редкая?',
        a: 'Самая редкая в сюжете игры — Решимость: ею обладают только падший человек и игрок, поэтому её рассматривают отдельно от остальных шести.',
      },
    ],
    ctaTitle: 'Узнайте свою душу',
    ctaBody: 'Ответьте на 66 вопросов и получите процентное распределение по всем семи чертам. Бесплатно, без регистрации, данные не покидают браузер.',
    ctaButton: 'Пройти тест душ Undertale',
    evidenceNote: 'Семь цветов показаны в игре. Названия черт происходят от флагов «Игры с мячом» в Сноудине, а описания личности — это интерпретация фанатов, построенная на этих данных, а не официальный канон Undertale.',
    detailLinkLabel: 'Подробный разбор',
    navLabel: 'Все 7 душ и их цвета',
  },
};
