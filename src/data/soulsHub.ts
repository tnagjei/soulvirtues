// input: Game-color references, six Ball Game trait labels, community red-SOUL usage and site reflection definitions
// output: Five-language hub copy separating game evidence, fan interpretation and independent answer-scale results
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
    metaDescription: "Explore seven Undertale SOUL colors, six Ball Game trait names and the community Red / Determination reading, with links to lore and reflection exercises.",
    h1: 'The 7 Undertale Souls: Colors, Traits and Meanings',
    lede: [
      "This guide brings together seven SOUL colors and the everyday themes used by our quiz. Six virtue names appear in the Snowdin Ball Game; Red / Determination is a familiar community interpretation.",
      "Use the table to compare colors and our reflection definitions. Each entry links to game references, associated items, battle mechanics and optional writing exercises. These exercises do not establish the personalities of the fallen humans or the player.",
    ],
    breadcrumbHome: 'Home',
    tableHeaders: { color: 'Color', trait: 'Trait', meaning: 'What it means', detail: 'Details' },
    sectionWhatTitle: 'What Are the 7 Undertale Souls?',
    sectionWhatBody: [
      "The Snowdin Ball Game names Bravery, Justice, Kindness, Patience, Integrity and Perseverance. The game does not explicitly name Determination as the Red SOUL’s official trait.",
      "The everyday definitions here belong to this site’s reflection framework. Game colors and mechanics do not establish a player’s psychological profile.",
    ],
    sectionListTitle: 'All 7 Souls and Their Colors',
    sectionListSub: 'Color, trait and meaning side by side. Tap any soul for the full page.',
    sectionHumanTitle: 'Human Souls vs SOUL Modes in Battle',
    sectionHumanBody: [
      'Do not confuse a human\'s soul color with the SOUL mode you are forced into during a boss fight. Undyne turns your SOUL green to force blocking, Mettaton turns it yellow to hand you a gun, and Muffet turns it purple to restrict you to horizontal lines.',
      "Battle modes are mechanics, not personality results. Being placed in a green or yellow mode does not establish the player’s Kindness or Justice; our quiz scores come from the statements you answer.",
    ],
    sectionStrongestTitle: 'Which Undertale Soul Is the Strongest?',
    sectionStrongestBody: [
      "This guide does not rank SOUL colors by strength or rarity. To discuss a battle ability, identify the specific encounter and mechanic; a color or virtue name alone does not establish a character’s power.",
      "Our seven reflection themes are not combat statistics. A higher quiz score means that this set of answers shows stronger support for this site’s statements for that theme; it does not make a person stronger, better or more like a particular game character.",
    ],
    sectionTestTitle: "Explore Your Answers Across Seven Themes",
    sectionTestBody: "The free 66-question quiz gives seven independent scores from 0 to 100. Each score describes how this set of answers supports the statements grouped under a theme. The scores do not need to add up to 100 and are not a diagnosis or a measure of your character’s combat ability.",
    faqTitle: 'Frequently Asked Questions',
    faqSub: 'Short answers to the questions people ask most about the seven souls.',
    faq: [
      {
        q: "Which seven SOUL colors does this guide cover?",
        a: "Red, orange, yellow, green, cyan, blue and purple. The six non-red colors are associated with trait names in the Snowdin Ball Game. This site uses the community Red / Determination interpretation for its seventh reflection theme.",
      },
      {
        q: "Are all seven trait names official?",
        a: "The Ball Game names Bravery, Justice, Kindness, Patience, Integrity and Perseverance. Undertale does not explicitly name Determination as the Red SOUL’s official trait. The everyday definitions and exercises here are this site’s design, not confirmed biographies of the humans.",
      },
      {
        q: "Can more than one quiz score be high?",
        a: "Yes. All seven 0–100 scores are independent, so several can be high, low or tied. They do not form a percentage share of a whole. A score reflects these answers, not proof that you possess or lack a virtue; all-neutral answers have no leading theme.",
      },
      {
        q: "Does this guide identify the rarest SOUL?",
        a: "No. It does not establish a rarity ranking from the story or from quiz results. We have no population data for this quiz, so a result cannot show how rare you are or predict your abilities.",
      },
    ],
    ctaTitle: "Try the Seven-Theme Reflection Quiz",
    ctaBody: "The complete seven-score result is free and needs no account. Free scoring and card generation run in your browser. Optional paid reports use separate server storage and AI processing after consent; analytics and advertising are explained in the Privacy Policy.",
    ctaButton: 'Take the 66-Question Soul Test',
    evidenceNote: "Six trait names come from the Snowdin Ball Game; Red / Determination is a community interpretation. The everyday definitions, examples and exercises are this site’s reflection framework, not official character biographies or validated psychological findings.",
    detailLinkLabel: 'Full breakdown',
    navLabel: 'See all 7 souls and their colors',
  },

  es: {
    metaTitle: 'Guía de las 7 Almas de Undertale: Colores y Significado',
    metaDescription: "Explora siete colores de Alma de Undertale, seis rasgos del Juego de Pelota y la interpretación roja de la comunidad, con historia y ejercicios de reflexión.",
    h1: 'Las 7 Almas de Undertale: Colores y Significado',
    lede: [
      "Esta guía reúne siete colores de Alma y los temas cotidianos usados por nuestro test. Seis nombres de virtudes aparecen en el Juego de Pelota de Snowdin; Rojo / Determinación es una interpretación habitual de la comunidad.",
      "Usa la tabla para comparar colores y nuestras definiciones para la reflexión. Cada entrada enlaza a referencias del juego, objetos asociados, mecánicas de combate y ejercicios opcionales de escritura. Estos ejercicios no establecen la personalidad de los humanos caídos ni del jugador.",
    ],
    breadcrumbHome: 'Inicio',
    tableHeaders: { color: 'Color', trait: 'Rasgo', meaning: 'Qué significa', detail: 'Detalle' },
    sectionWhatTitle: '¿Qué son las 7 Almas de Undertale?',
    sectionWhatBody: [
      "El juego de pelota de Snowdin nombra Valentía, Justicia, Amabilidad, Paciencia, Integridad y Perseverancia. El juego no nombra explícitamente la Determinación como rasgo oficial del Alma roja.",
      "Las definiciones cotidianas pertenecen al marco de reflexión de este sitio. Los colores y las mecánicas del juego no establecen el perfil psicológico de un jugador.",
    ],
    sectionListTitle: 'Las 7 Almas y sus Colores',
    sectionListSub: 'Color, rasgo y significado uno al lado del otro. Entra en cualquiera para ver la ficha completa.',
    sectionHumanTitle: 'Almas Humanas y Modos de ALMA en Combate',
    sectionHumanBody: [
      'No confundas el color del alma de un humano con el modo de ALMA al que te obliga un jefe durante la batalla. Undyne vuelve tu ALMA verde para forzar el bloqueo, Mettaton la vuelve amarilla para darte un arma y Muffet la vuelve morada para restringirte a líneas horizontales.',
      "Los modos de combate son mecánicas, no resultados de personalidad. Entrar en un modo verde o amarillo no establece la Amabilidad ni la Justicia del jugador; las puntuaciones de este test proceden de sus respuestas.",
    ],
    sectionStrongestTitle: '¿Cuál es el Alma más Fuerte de Undertale?',
    sectionStrongestBody: [
      "Esta guía no clasifica los colores de Alma por fuerza ni rareza. Para hablar de una habilidad de combate, identifica el encuentro y la mecánica concretos; un color o el nombre de una virtud no establece por sí solo el poder de un personaje.",
      "Nuestros siete temas de reflexión no son estadísticas de combate. Una puntuación mayor indica que estas respuestas apoyan con mayor intensidad las afirmaciones del sitio para ese tema; no hace a una persona más fuerte, mejor ni más parecida a un personaje del juego.",
    ],
    sectionTestTitle: "Explora tus Respuestas en Siete Temas",
    sectionTestBody: "El test gratuito de 66 preguntas ofrece siete puntuaciones independientes de 0 a 100. Cada una describe cuánto apoyan estas respuestas las afirmaciones agrupadas bajo un tema. No tienen que sumar 100 y no son un diagnóstico ni una medida de la capacidad de combate de tu personaje.",
    faqTitle: 'Preguntas Frecuentes',
    faqSub: 'Respuestas cortas a lo que más se pregunta sobre las siete almas.',
    faq: [
      {
        q: "¿Qué siete colores de Alma cubre esta guía?",
        a: "Rojo, naranja, amarillo, verde, cian, azul y morado. Los seis colores distintos del rojo se asocian con nombres de rasgos en el Juego de Pelota de Snowdin. Este sitio usa la interpretación comunitaria Rojo / Determinación para su séptimo tema de reflexión.",
      },
      {
        q: "¿Son oficiales los siete nombres de rasgos?",
        a: "El Juego de Pelota nombra Valentía, Justicia, Amabilidad, Paciencia, Integridad y Perseverancia. Undertale no nombra explícitamente la Determinación como rasgo oficial del Alma roja. Las definiciones cotidianas y los ejercicios son un diseño de este sitio, no biografías confirmadas de los humanos.",
      },
      {
        q: "¿Pueden ser altas varias puntuaciones?",
        a: "Sí. Las siete puntuaciones de 0 a 100 son independientes: varias pueden ser altas, bajas o iguales. No son partes porcentuales de un total. Una puntuación refleja estas respuestas y no demuestra que tengas o carezcas de una virtud; si todas son neutrales, no hay un tema principal.",
      },
      {
        q: "¿Esta guía identifica el Alma más rara?",
        a: "No. No establece una clasificación de rareza a partir de la historia ni de los resultados del test. No tenemos datos poblacionales de este cuestionario, así que un resultado no indica lo excepcional que eres ni predice tus capacidades.",
      },
    ],
    ctaTitle: "Prueba el Test de Reflexión de Siete Temas",
    ctaBody: "El resultado completo de siete puntuaciones es gratuito y no requiere cuenta. La puntuación gratuita y la tarjeta se generan en tu navegador. Los informes de pago opcionales usan almacenamiento en el servidor y procesamiento de IA tras el consentimiento; la Política de Privacidad explica la analítica y la publicidad.",
    ctaButton: 'Hacer el Test de Almas de Undertale',
    evidenceNote: "Seis nombres de rasgos proceden del Juego de Pelota de Snowdin; Rojo / Determinación es una interpretación de la comunidad. Las definiciones cotidianas, ejemplos y ejercicios forman el marco de reflexión de este sitio, no biografías oficiales ni conclusiones psicológicas validadas.",
    detailLinkLabel: 'Ficha completa',
    navLabel: 'Ver las 7 almas y sus colores',
  },

  pt: {
    metaTitle: 'As 7 Almas de Undertale: Cores, Traços e Significados',
    metaDescription: "Explore sete cores de Alma de Undertale, seis traços do Jogo de Bola e a interpretação vermelha da comunidade, com história e exercícios de reflexão.",
    h1: 'As 7 Almas de Undertale: Cores, Traços e Significados',
    lede: [
      "Este guia reúne sete cores de Alma e os temas cotidianos usados pelo nosso teste. Seis nomes de virtudes aparecem no Jogo de Bola de Snowdin; Vermelho / Determinação é uma interpretação comum da comunidade.",
      "Use a tabela para comparar cores e nossas definições para reflexão. Cada entrada leva a referências do jogo, itens associados, mecânicas de batalha e exercícios opcionais de escrita. Esses exercícios não estabelecem a personalidade dos humanos caídos nem do jogador.",
    ],
    breadcrumbHome: 'Início',
    tableHeaders: { color: 'Cor', trait: 'Traço', meaning: 'O que significa', detail: 'Detalhes' },
    sectionWhatTitle: 'O que são as 7 Almas de Undertale?',
    sectionWhatBody: [
      "O jogo de bola de Snowdin nomeia Bravura, Justiça, Bondade, Paciência, Integridade e Perseverança. O jogo não nomeia explicitamente a Determinação como traço oficial da Alma vermelha.",
      "As definições cotidianas pertencem à estrutura de reflexão deste site. As cores e mecânicas do jogo não estabelecem o perfil psicológico de um jogador.",
    ],
    sectionListTitle: 'As 7 Almas e suas Cores',
    sectionListSub: 'Cor, traço e significado lado a lado. Toque em qualquer alma para ver a página completa.',
    sectionHumanTitle: 'Almas Humanas e Modos de ALMA em Batalha',
    sectionHumanBody: [
      'Não confunda a cor da alma de um humano com o modo de ALMA que um chefe impõe durante a batalha. Undyne deixa sua ALMA verde para forçar o bloqueio, Mettaton deixa amarela para te dar uma arma e Muffet deixa roxa para restringir você a linhas horizontais.',
      "Modos de combate são mecânicas, não resultados de personalidade. Entrar em um modo verde ou amarelo não estabelece a Bondade ou a Justiça do jogador; as pontuações deste teste vêm das respostas.",
    ],
    sectionStrongestTitle: 'Qual é a Alma mais Forte de Undertale?',
    sectionStrongestBody: [
      "Este guia não classifica as cores de Alma por força ou raridade. Para discutir uma habilidade de batalha, identifique o encontro e a mecânica específicos; uma cor ou o nome de uma virtude, por si só, não estabelece o poder de um personagem.",
      "Nossos sete temas de reflexão não são estatísticas de combate. Uma pontuação maior significa que estas respostas apoiam com mais intensidade as afirmações do site para aquele tema; isso não torna uma pessoa mais forte, melhor ou mais parecida com um personagem do jogo.",
    ],
    sectionTestTitle: "Explore suas Respostas em Sete Temas",
    sectionTestBody: "O teste gratuito de 66 perguntas fornece sete pontuações independentes de 0 a 100. Cada uma descreve quanto estas respostas apoiam as afirmações agrupadas em um tema. Elas não precisam somar 100 e não são um diagnóstico nem uma medida da capacidade de combate do seu personagem.",
    faqTitle: 'Perguntas Frequentes',
    faqSub: 'Respostas curtas para as dúvidas mais comuns sobre as sete almas.',
    faq: [
      {
        q: "Quais sete cores de Alma este guia apresenta?",
        a: "Vermelho, laranja, amarelo, verde, ciano, azul e roxo. As seis cores diferentes do vermelho são associadas a nomes de traços no Jogo de Bola de Snowdin. Este site usa a interpretação comunitária Vermelho / Determinação para seu sétimo tema de reflexão.",
      },
      {
        q: "Os sete nomes dos traços são oficiais?",
        a: "O Jogo de Bola nomeia Bravura, Justiça, Bondade, Paciência, Integridade e Perseverança. Undertale não nomeia explicitamente a Determinação como traço oficial da Alma vermelha. As definições cotidianas e os exercícios são um projeto deste site, não biografias confirmadas dos humanos.",
      },
      {
        q: "Várias pontuações podem ser altas?",
        a: "Sim. As sete pontuações de 0 a 100 são independentes: várias podem ser altas, baixas ou iguais. Elas não são parcelas percentuais de um total. Uma pontuação reflete estas respostas, não prova que você tenha ou não uma virtude; respostas todas neutras não têm tema principal.",
      },
      {
        q: "Este guia identifica a Alma mais rara?",
        a: "Não. Ele não estabelece uma classificação de raridade a partir da história ou dos resultados do teste. Não temos dados populacionais deste questionário; um resultado não mostra quão raro você é nem prevê suas capacidades.",
      },
    ],
    ctaTitle: "Experimente o Teste de Reflexão de Sete Temas",
    ctaBody: "O resultado completo de sete pontuações é gratuito e dispensa conta. A pontuação gratuita e a criação do cartão acontecem no navegador. Relatórios pagos opcionais usam armazenamento no servidor e processamento de IA após consentimento; a Política de Privacidade explica a análise de uso e a publicidade.",
    ctaButton: 'Fazer o Teste de Almas de Undertale',
    evidenceNote: "Seis nomes de traços vêm do Jogo de Bola de Snowdin; Vermelho / Determinação é uma interpretação da comunidade. As definições cotidianas, exemplos e exercícios formam a estrutura de reflexão deste site, não biografias oficiais nem conclusões psicológicas validadas.",
    detailLinkLabel: 'Ficha completa',
    navLabel: 'Ver as 7 almas e suas cores',
  },

  ja: {
    metaTitle: 'Undertaleの7つの魂まとめ｜色・特徴・意味を一覧で解説【赤・橙・黄・緑・水色・青・紫】',
    metaDescription: "Undertaleの7色のタマシイ、ボールゲームに由来する6特質、赤とケツイを結ぶコミュニティの解釈を区別して紹介。ゲーム資料と任意の振り返り練習への入口をまとめています。",
    h1: 'Undertaleの7つの魂：色・特徴・意味',
    lede: [
      "このガイドは7色のタマシイと、このテストで使う日常のテーマをまとめています。6つの美徳名はスノーフルのボールゲームに登場します。赤／ケツイはコミュニティで親しまれている解釈です。",
      "一覧では色と本サイトの振り返り用の定義を比べられます。各項目からゲームの資料、関連する装備、戦闘の仕組み、任意の記述練習へ進めます。練習は、落ちたニンゲンやプレイヤーの性格を確定するものではありません。",
    ],
    breadcrumbHome: 'ホーム',
    tableHeaders: { color: '色', trait: '特徴', meaning: '意味', detail: '詳細' },
    sectionWhatTitle: 'Undertaleの7つの魂とは',
    sectionWhatBody: [
      "ボールゲームに示される6特質を、本サイトでは「ゆうき」「せいぎ」「やさしさ」「にんたい」「せいじつ」「こんき」と呼びます。これらは本サイトの表記であり、原作の引用は別に示します。ゲームはケツイを赤いタマシイの公式特質として明示していません。",
      "ここでの日常の定義は、このサイトの振り返りの枠組みです。ゲームの色や仕組みがプレイヤーの心理的なプロフィールを証明するわけではありません。",
    ],
    sectionListTitle: '7つの魂と色の一覧',
    sectionListSub: '色・特徴・意味を並べて比較できます。各項目から詳細ページへ移動できます。',
    sectionHumanTitle: '人間のタマシイと戦闘中のタマシイモード',
    sectionHumanBody: [
      '人間のタマシイの色と、ボス戦で強制的に切り替わるタマシイモードを混同しないでください。Undyneはタマシイを緑にしてブロックを強制し、Mettatonは黄色にして銃を渡し、Muffetは紫にして左右の動きだけに制限します。',
      "戦闘モードは仕組みであり、性格の結果ではありません。緑や黄色のモードになっても、プレイヤーのやさしさやせいぎが確定するわけではなく、このテストの得点は回答から計算されます。",
    ],
    sectionStrongestTitle: 'Undertaleで最も強い魂はどれか',
    sectionStrongestBody: [
      "このガイドはタマシイの色を強さや希少さで順位付けしません。戦闘能力を考えるときは、具体的な戦闘と仕組みを確認してください。色や美徳の名前だけでは、登場人物の強さは決まりません。",
      "本サイトの7つの振り返りテーマは戦闘能力値ではありません。高い得点は、今回の回答がそのテーマの文により強く当てはまることを示します。人の強さや優劣、特定の登場人物との類似を証明するものではありません。",
    ],
    sectionTestTitle: "7つのテーマから今回の回答を振り返る",
    sectionTestBody: "無料の66問テストは、独立した7つの得点を0〜100で示します。各得点は、そのテーマに分けられた文に今回の回答がどの程度当てはまるかを表します。合計が100になる割合ではなく、診断や登場人物の戦闘能力の測定でもありません。",
    faqTitle: 'よくある質問',
    faqSub: '7つの魂について特によく聞かれる点への短い回答です。',
    faq: [
      {
        q: "このガイドではどの7色を扱いますか",
        a: "赤、橙、黄、緑、水色、青、紫です。赤以外の6色はスノーフルのボールゲームで特質名と結びつけられています。本サイトは7つ目の振り返りテーマとして、コミュニティの赤／ケツイという解釈を使います。",
      },
      {
        q: "7つの特質名はすべて公式ですか",
        a: "ボールゲームに由来する6特質を、本サイトでは「ゆうき」「せいぎ」「やさしさ」「にんたい」「せいじつ」「こんき」と呼びます。これは本サイトの表記です。ゲームはケツイを赤いタマシイの公式特質として明示していません。日常の定義と練習は本サイトの設計であり、ニンゲンたちの確定した人物像ではありません。",
      },
      {
        q: "複数の得点が高くなることはありますか",
        a: "はい。0〜100の7得点は独立しているため、複数が高い、低い、同点になることがあります。全体を分けた割合ではありません。得点は今回の回答を表すもので、美徳があるかないかの証明ではありません。すべて中立の回答なら、主となるテーマはありません。",
      },
      {
        q: "このガイドで最も珍しいタマシイは分かりますか",
        a: "分かりません。物語やテスト結果から希少さの順位を決めるものではありません。このテストには母集団のデータがないため、結果から人の珍しさや能力を判断することはできません。",
      },
    ],
    ctaTitle: "7つのテーマで振り返るテストを試す",
    ctaBody: "7得点を含む結果はすべて無料で、登録も不要です。無料の採点とカード作成はブラウザ内で行います。任意の有料レポートは同意後に別途サーバー保存とAI処理を使います。アクセス解析と広告についてはプライバシーポリシーをご覧ください。",
    ctaButton: "66問の振り返りテストを始める",
    evidenceNote: "6特質はスノーフルのボールゲームに由来し、赤／ケツイはコミュニティの解釈です。日常の定義、例、練習は本サイトの振り返りの枠組みであり、公式の人物像や検証済みの心理学的知見ではありません。",
    detailLinkLabel: '詳細を見る',
    navLabel: '7つの魂と色をまとめて見る',
  },

  ru: {
    metaTitle: '7 душ Undertale: цвета, черты и значения',
    metaDescription: "Семь цветов душ Undertale, шесть черт из игры с мячом и фанатская трактовка красной души: игровые сведения и упражнения для самоанализа.",
    h1: '7 душ Undertale: цвета, черты и значения',
    lede: [
      "В этом руководстве собраны семь цветов души и повседневные темы нашего теста. Шесть названий добродетелей встречаются в игре с мячом в Сноудине; Красная душа / Решимость — привычное толкование сообщества.",
      "Таблица помогает сравнить цвета и наши определения для самоанализа. Каждая запись ведёт к игровым источникам, связанным предметам, механике боя и необязательным письменным упражнениям. Упражнения не устанавливают характер упавших людей или игрока.",
    ],
    breadcrumbHome: 'Главная',
    tableHeaders: { color: 'Цвет', trait: 'Черта', meaning: 'Что значит', detail: 'Подробнее' },
    sectionWhatTitle: 'Что такое 7 душ Undertale',
    sectionWhatBody: [
      "Игра с мячом в Сноудине называет Храбрость, Справедливость, Доброту, Терпение, Порядочность и Настойчивость. Игра явно не называет Решимость официальной чертой Красной души.",
      "Повседневные определения относятся к системе самоанализа этого сайта. Цвета и механика игры не устанавливают психологический профиль игрока.",
    ],
    sectionListTitle: 'Все 7 душ и их цвета',
    sectionListSub: 'Цвет, черта и значение рядом. Выберите любую душу, чтобы открыть полную страницу.',
    sectionHumanTitle: 'Души людей и режимы ДУШИ в бою',
    sectionHumanBody: [
      'Не путайте цвет души человека с режимом ДУШИ, в который вас принудительно переводит босс. Undyne делает ДУШУ зелёной, чтобы заставить блокировать, Mettaton делает её жёлтой, вручая оружие, а Muffet делает её фиолетовой, ограничивая движение горизонтальными линиями.',
      "Боевые режимы — механика, а не результаты теста личности. Зелёный или жёлтый режим не устанавливает Доброту или Справедливость игрока; оценки нашего теста вычисляются по ответам.",
    ],
    sectionStrongestTitle: 'Какая душа в Undertale самая сильная',
    sectionStrongestBody: [
      "Это руководство не ранжирует цвета душ по силе или редкости. Обсуждая боевую способность, укажите конкретный бой и механику: один лишь цвет или название добродетели не устанавливает силу персонажа.",
      "Наши семь тем для самоанализа не являются боевыми характеристиками. Более высокий балл означает, что эти ответы сильнее поддерживают утверждения сайта по данной теме; он не делает человека сильнее, лучше или похожим на конкретного персонажа.",
    ],
    sectionTestTitle: "Рассмотрите свои ответы по семи темам",
    sectionTestBody: "Бесплатный тест из 66 вопросов даёт семь независимых оценок от 0 до 100. Каждая показывает, насколько эти ответы поддерживают утверждения, отнесённые к данной теме. Оценки не обязаны складываться в 100 и не являются диагнозом или мерой боевых способностей персонажа.",
    faqTitle: 'Частые вопросы',
    faqSub: 'Короткие ответы на самые частые вопросы о семи душах.',
    faq: [
      {
        q: "Какие семь цветов души представлены в руководстве?",
        a: "Красный, оранжевый, жёлтый, зелёный, голубой, синий и фиолетовый. Шесть цветов, кроме красного, связаны с названиями черт в игре с мячом в Сноудине. Для седьмой темы самоанализа сайт использует фанатскую трактовку Красная душа / Решимость.",
      },
      {
        q: "Все семь названий черт официальные?",
        a: "Игра с мячом называет Храбрость, Справедливость, Доброту, Терпение, Порядочность и Настойчивость. Undertale прямо не называет Решимость официальной чертой Красной души. Повседневные определения и упражнения разработаны для этого сайта, а не являются подтверждёнными биографиями людей.",
      },
      {
        q: "Могут ли несколько оценок быть высокими?",
        a: "Да. Все семь оценок от 0 до 100 независимы: несколько могут быть высокими, низкими или равными. Это не процентные доли целого. Балл отражает эти ответы, а не доказывает наличие или отсутствие добродетели; у полностью нейтральных ответов нет ведущей темы.",
      },
      {
        q: "Определяет ли руководство самую редкую душу?",
        a: "Нет. Оно не устанавливает рейтинг редкости по сюжету или результатам теста. У нас нет популяционных данных для этого опросника, поэтому результат не показывает вашу редкость и не предсказывает способности.",
      },
    ],
    ctaTitle: "Попробуйте тест для самоанализа по семи темам",
    ctaBody: "Полный результат с семью оценками бесплатен и не требует аккаунта. Бесплатный расчёт и создание карточки выполняются в браузере. Необязательные платные отчёты используют отдельное хранение на сервере и обработку ИИ после согласия; аналитика и реклама описаны в Политике конфиденциальности.",
    ctaButton: 'Пройти тест душ Undertale',
    evidenceNote: "Шесть названий черт происходят из игры с мячом в Сноудине; Красная душа / Решимость — толкование сообщества. Повседневные определения, примеры и упражнения относятся к системе самоанализа сайта, а не к официальным биографиям персонажей или подтверждённым психологическим выводам.",
    detailLinkLabel: 'Подробный разбор',
    navLabel: 'Все 7 душ и их цвета',
  },
};
