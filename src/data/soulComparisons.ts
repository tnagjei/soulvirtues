// input: Six V2 Undertale soul-trait comparison pairs
// output: Five new localized comparison records plus the approved pilot record
// pos: src/data/soulComparisons.ts (更新规则：对比组合或文案变化需同步本注释与 src/data/README.md)

import type { Locale } from '../i18n';
import {
  DETERMINATION_VS_PERSEVERANCE,
  type ComparisonCopy,
  type ComparisonSample,
} from './soulComparisonSample';

type SharedKey =
  | 'eyebrow'
  | 'quickAnswerLabel'
  | 'matrixTitle'
  | 'gameEvidenceLabel'
  | 'interpretationLabel'
  | 'differenceTitle'
  | 'scenariosTitle'
  | 'hybridTitle'
  | 'strengthsTitle'
  | 'risksTitle'
  | 'evidenceTitle'
  | 'testTitle'
  | 'testButton'
  | 'exploreLabel'
  | 'breadcrumbCompare';

const SHARED_COPY: Record<Locale, Pick<ComparisonCopy, SharedKey>> = {
  en: {
    eyebrow: 'SOUL TRAIT COMPARISON',
    quickAnswerLabel: 'QUICK ANSWER',
    matrixTitle: 'The Core Difference',
    gameEvidenceLabel: 'Game evidence',
    interpretationLabel: 'Interpretation',
    differenceTitle: 'Why These Traits Are Easy to Confuse',
    scenariosTitle: "A question for reflection",
    hybridTitle: 'If Both Scores Are High',
    strengthsTitle: "One everyday example",
    risksTitle: "What this quiz can and cannot tell you",
    evidenceTitle: 'Canon and Community Interpretation',
    testTitle: 'Which Pattern Drives You?',
    testButton: 'TAKE THE UNDERTALE SOUL TEST (66 QUESTIONS)',
    exploreLabel: 'Read the complete trait guide',
    breadcrumbCompare: 'Comparisons',
  },
  ja: {
    eyebrow: 'ソウル特質比較',
    quickAnswerLabel: 'ひとことで言うと',
    matrixTitle: '本質的な違い',
    gameEvidenceLabel: 'ゲーム内根拠',
    interpretationLabel: 'サイト独自の解釈',
    differenceTitle: 'なぜ混同しやすいのか',
    scenariosTitle: "振り返るための問い",
    hybridTitle: '両方のスコアが高い場合',
    strengthsTitle: "日常の例",
    risksTitle: "このテストの限界",
    evidenceTitle: '公式設定とコミュニティ解釈',
    testTitle: 'あなたを動かすのはどちら？',
    testButton: 'Undertale ソウル診断テストを受ける (全66問)',
    exploreLabel: '特質の完全ガイドを見る',
    breadcrumbCompare: '比較',
  },
  es: {
    eyebrow: 'COMPARACIÓN DE RASGOS DEL ALMA',
    quickAnswerLabel: 'RESPUESTA RÁPIDA',
    matrixTitle: 'La Diferencia Central',
    gameEvidenceLabel: 'Evidencia del juego',
    interpretationLabel: 'Interpretación',
    differenceTitle: 'Por Qué Se Confunden',
    scenariosTitle: "Una pregunta para reflexionar",
    hybridTitle: 'Si Ambas Puntuaciones Son Altas',
    strengthsTitle: "Un ejemplo cotidiano",
    risksTitle: "Qué puede decir este test",
    evidenceTitle: 'Canon e Interpretación',
    testTitle: '¿Qué Patrón Te Impulsa?',
    testButton: 'HACER EL TEST DE ALMAS DE UNDERTALE',
    exploreLabel: 'Leer la guía completa del rasgo',
    breadcrumbCompare: 'Comparaciones',
  },
  pt: {
    eyebrow: 'COMPARAÇÃO DE TRAÇOS DA ALMA',
    quickAnswerLabel: 'RESPOSTA RÁPIDA',
    matrixTitle: 'A Diferença Central',
    gameEvidenceLabel: 'Evidência do jogo',
    interpretationLabel: 'Interpretação',
    differenceTitle: 'Por Que Esses Traços se Confundem',
    scenariosTitle: "Uma pergunta para refletir",
    hybridTitle: 'Se as Duas Pontuações Forem Altas',
    strengthsTitle: "Um exemplo cotidiano",
    risksTitle: "O que este teste pode dizer",
    evidenceTitle: 'Cânone e Interpretação',
    testTitle: 'Qual Padrão Move Você?',
    testButton: 'FAZER O TESTE DAS ALMAS DE UNDERTALE',
    exploreLabel: 'Ler o guia completo do traço',
    breadcrumbCompare: 'Comparações',
  },
  ru: {
    eyebrow: 'СРАВНЕНИЕ ЧЕРТ ДУШИ',
    quickAnswerLabel: 'КРАТКИЙ ОТВЕТ',
    matrixTitle: 'Ключевое различие',
    gameEvidenceLabel: 'Игровые факты',
    interpretationLabel: 'Интерпретация',
    differenceTitle: 'Почему эти черты легко спутать',
    scenariosTitle: "Вопрос для размышления",
    hybridTitle: 'Если обе шкалы высоки',
    strengthsTitle: "Повседневный пример",
    risksTitle: "Что может сказать этот тест",
    evidenceTitle: 'Канон и фанатская интерпретация',
    testTitle: 'Какая черта движет вами?',
    testButton: 'ПРОЙТИ ТЕСТ ДУШИ UNDERTALE',
    exploreLabel: 'Читать полный гид по черте души',
    breadcrumbCompare: 'Сравнения',
  },
};

function withShared(lang: Locale, copy: Omit<ComparisonCopy, SharedKey>): ComparisonCopy {
  return { ...SHARED_COPY[lang], ...copy };
}

export const BRAVERY_VS_DETERMINATION: ComparisonSample = {
  slug: 'bravery-vs-determination',
  leftSlug: 'bravery',
  rightSlug: 'determination',
  copy: {
    en: withShared('en', {
      seoTitle: 'Bravery vs Determination: Undertale Soul Traits Compared',
      seoDescription: "Compare Bravery and Determination in Undertale: starting despite fear versus refusing to accept defeat, with game evidence and real-life examples.",
      heading: 'Bravery vs Determination',
      intro: "Bravery concerns action despite fear; Determination concerns choosing and reconsidering the direction of a meaningful goal.",
      quickAnswer: "Bravery concerns action despite fear; Determination concerns choosing and reconsidering the direction of a meaningful goal.",
      leftLabel: 'Bravery',
      rightLabel: 'Determination',
      rows: [
  {
    "label": "What this quiz focuses on",
    "left": "Expressing or acting despite fear or social pressure when doing so is reasonably safe. The score does not reward danger or require an outgoing personality.",
    "right": "Choosing a goal that matters to you, then deciding how to recommit after a setback. Changing direction after thoughtful review can fit this theme.",
    "evidence": "interpretation"
  },
  {
    "label": "Undertale evidence",
    "left": "The orange Ball Game result describes rushing “fists-first through all obstacles.”",
    "right": "Determination is named as the resolve to change fate and enables SOULs to persist after death.",
    "evidence": "game"
  },
  {
    "label": "A question for reflection",
    "left": "What is one safe action you could take without pretending the fear is gone?",
    "right": "What still makes this goal worth pursuing, and what evidence would make you change it?",
    "evidence": "interpretation"
  }
],
      differenceParagraphs: [
  "A project needs a difficult conversation. Bravery addresses the safe step of voicing a concern despite nerves. Determination addresses whether the project still matters and which next step serves that goal. A brave conversation alone does not establish a long-term aim.",
  "Is the main difficulty facing fear now, or deciding which goal to stand behind?"
],
      scenarios: [
  {
    "title": "Is the main difficulty facing fear now, or deciding which goal to stand behind?",
    "left": "What is one safe action you could take without pretending the fear is gone?",
    "right": "What still makes this goal worth pursuing, and what evidence would make you change it?"
  }
],
      hybridIntro: "Two close scores can describe different responses to the same situation. Read both definitions and notice which part of the decision each addresses. The 3-point display rule does not show that a difference is psychologically significant.",
      strengths: [
  "You need to raise a concern. You choose a small safe action, such as asking for a private conversation, while acknowledging that you feel nervous.",
  "A study plan fails. You reconsider why the qualification matters and choose a next step, rather than keeping the same target just to avoid admitting failure."
],
      risks: [
  "These are self-reported responses to an independently adapted quiz. Public-domain source material does not make the seven-theme combination a validated psychological inventory. Mood, experience and interpretation can affect answers. A low score does not prove you lack a virtue; a high score cannot justify unsafe behavior or diagnose anyone."
],
      evidenceBody: 'Bravery is explicitly named among the six Ball Game traits and linked to the orange result. Determination is canonical as a power tied to persistence, SAVE, and changing fate, but the game does not explicitly name it as the red SOUL trait. The comparison beyond those facts is this site’s interpretation.',
      testBody: "The complete seven-score result, answer review and PNG card are free, with no account, payment or invitation required.",
    }),
    ja: withShared('ja', {
      seoTitle: 'Undertale ゆうきとケツイの違い',
      seoDescription: "Undertaleのゆうきとケツイを比較。怖くても始める力と、失敗を受け入れず再挑戦する力の違いをゲーム内根拠と例で解説。",
      heading: 'ゆうき vs ケツイ',
      intro: "ゆうきは怖さがあっても行動すること、ケツイは大切な目標への方向を選び直すことです。",
      quickAnswer: "ゆうきは怖さがあっても行動すること、ケツイは大切な目標への方向を選び直すことです。",
      leftLabel: 'ゆうき',
      rightLabel: 'ケツイ',
      rows: [
  {
    "label": "このテストで見るテーマ",
    "left": "無理のない安全を保ちつつ、怖さや周囲からの圧力があっても伝えたり行動したりすること。危険を求めることや外向的な性格は条件ではない。",
    "right": "自分にとって大切な目標を選び、つまずいた後にどう取り組み直すか判断すること。十分に考えた上で方向を変えることも、このテーマに含まれる。",
    "evidence": "interpretation"
  },
  {
    "label": "Undertaleでの根拠",
    "left": "オレンジのボールゲーム結果は、障害へ拳から突進する姿を描く。",
    "right": "ケツイは運命を変える意志であり、死後もソウルを持続させる力として描かれる。",
    "evidence": "game"
  },
  {
    "label": "振り返るための問い",
    "left": "怖さが消えたふりをせずにできる、安全な一歩は何ですか。",
    "right": "その目標を今も追う理由は何ですか。どんな事実があれば目標を変えますか。",
    "evidence": "interpretation"
  }
],
      differenceParagraphs: [
  "プロジェクトで難しい話し合いが必要になった。ゆうきでは緊張しながらも安全に問題を伝える一歩を見る。ケツイでは、プロジェクトが今も大切か、目標に合う次の一歩は何かを見る。勇気ある話し合いだけで長期の目標が決まるわけではない。",
  "難しいのは今の怖さに向き合うことですか。それとも目指す目標を決めることですか。"
],
      scenarios: [
  {
    "title": "難しいのは今の怖さに向き合うことですか。それとも目指す目標を決めることですか。",
    "left": "怖さが消えたふりをせずにできる、安全な一歩は何ですか。",
    "right": "その目標を今も追う理由は何ですか。どんな事実があれば目標を変えますか。"
  }
],
      hybridIntro: "近い2つの得点は、同じ状況の違う部分への反応を示すことがあります。両方の定義を読み、それぞれが判断のどの部分を見るか考えてください。3点という表示基準は心理学的に意味のある差を示しません。",
      strengths: [
  "気になる問題を伝えたい。緊張を認めながら、個別に話す時間を頼むなど、小さく安全な行動を選ぶ。",
  "勉強の計画がうまくいかなかった。失敗を認めたくないから同じ目標にこだわるのではなく、その資格を目指す理由を見直して次の一歩を選ぶ。"
],
      risks: [
  "結果は、独自に改編した質問への自己申告の回答です。出典がパブリックドメインでも、7つのテーマの組合せが検証済み心理尺度になるわけではありません。気分、経験、解釈で回答は変わります。低い得点は美徳がない証拠ではなく、高い得点も危険な行動や診断を正当化しません。"
],
      evidenceBody: 'ゆうきはボールゲームで明示される6特質の一つで、オレンジの結果と結びつきます。ケツイは持続、SAVE、運命を変える力として公式に描かれますが、赤いソウルの特質名とは明言されません。それ以上の比較は当サイトの解釈です。',
      testBody: "7つの得点、回答の確認、PNGカードはすべて無料です。アカウント、支払い、招待は不要です。",
    }),
    es: withShared('es', {
      seoTitle: 'Valentía vs Determinación en Undertale',
      seoDescription: "Compara Valentía y Determinación en Undertale: empezar pese al miedo frente a rechazar la derrota, con evidencia del juego y ejemplos.",
      heading: 'Valentía vs Determinación',
      intro: "La Valentía trata de actuar pese al miedo; la Determinación, de elegir y revisar el rumbo de un objetivo importante.",
      quickAnswer: "La Valentía trata de actuar pese al miedo; la Determinación, de elegir y revisar el rumbo de un objetivo importante.",
      leftLabel: 'Valentía',
      rightLabel: 'Determinación',
      rows: [
  {
    "label": "Qué explora este test",
    "left": "Expresarte o actuar pese al miedo o la presión social cuando hacerlo es razonablemente seguro. La puntuación no premia el peligro ni exige ser extrovertido.",
    "right": "Elegir un objetivo que te importe y decidir cómo volver a comprometerte tras un revés. Cambiar de rumbo después de reflexionar también encaja en este tema.",
    "evidence": "interpretation"
  },
  {
    "label": "Evidencia en Undertale",
    "left": "El resultado naranja describe lanzarse con los puños por delante contra los obstáculos.",
    "right": "La Determinación es la voluntad de cambiar el destino y permite que las almas persistan tras la muerte.",
    "evidence": "game"
  },
  {
    "label": "Una pregunta para reflexionar",
    "left": "¿Qué acción segura puedes dar sin fingir que el miedo ha desaparecido?",
    "right": "¿Qué hace que este objetivo siga mereciendo la pena y qué prueba te haría cambiarlo?",
    "evidence": "interpretation"
  }
],
      differenceParagraphs: [
  "Un proyecto necesita una conversación difícil. La Valentía aborda expresar una preocupación de forma segura pese a los nervios. La Determinación aborda si el proyecto aún importa y qué paso sirve a su objetivo. Una conversación valiente no establece por sí sola una meta a largo plazo.",
  "¿La dificultad principal es afrontar el miedo ahora o decidir qué objetivo defender?"
],
      scenarios: [
  {
    "title": "¿La dificultad principal es afrontar el miedo ahora o decidir qué objetivo defender?",
    "left": "¿Qué acción segura puedes dar sin fingir que el miedo ha desaparecido?",
    "right": "¿Qué hace que este objetivo siga mereciendo la pena y qué prueba te haría cambiarlo?"
  }
],
      hybridIntro: "Dos resultados cercanos pueden describir respuestas a partes distintas de una situación. Lee ambas definiciones y observa qué parte de la decisión trata cada una. La regla de 3 puntos no demuestra una diferencia psicológicamente significativa.",
      strengths: [
  "Necesitas plantear una preocupación. Reconoces tus nervios y eliges una acción pequeña y segura, como pedir una conversación privada.",
  "Falla un plan de estudio. Revisas por qué te importa la titulación y eliges un siguiente paso, en lugar de mantener el objetivo solo para no admitir el fracaso."
],
      risks: [
  "Son respuestas personales a un test adaptado de forma independiente. Las fuentes de dominio público no convierten estos siete temas en un instrumento psicológico validado. El ánimo, la experiencia y la interpretación pueden cambiar las respuestas. Una puntuación baja no prueba que te falte una virtud; una alta no justifica riesgos ni permite diagnosticar."
],
      evidenceBody: 'Valentía aparece explícitamente entre los seis rasgos del Juego de Pelota y se vincula al resultado naranja. La Determinación es canónica como poder relacionado con persistir, SAVE y cambiar el destino, pero el juego no la nombra como rasgo del Alma Roja. El resto es interpretación del sitio.',
      testBody: "El resultado completo de siete temas, la revisión de respuestas y la tarjeta PNG son gratuitos, sin cuenta, pago ni invitaciones.",
    }),
    pt: withShared('pt', {
      seoTitle: 'Bravura vs Determinação em Undertale',
      seoDescription: "Compare Bravura e Determinação em Undertale: começar apesar do medo versus recusar a derrota, com evidências do jogo e exemplos.",
      heading: 'Bravura vs Determinação',
      intro: "A Bravura trata de agir apesar do medo; a Determinação, de escolher e rever o rumo de um objetivo importante.",
      quickAnswer: "A Bravura trata de agir apesar do medo; a Determinação, de escolher e rever o rumo de um objetivo importante.",
      leftLabel: 'Bravura',
      rightLabel: 'Determinação',
      rows: [
  {
    "label": "O que este teste explora",
    "left": "Expressar-se ou agir apesar do medo ou da pressão social quando isso é razoavelmente seguro. A pontuação não premia o perigo nem exige extroversão.",
    "right": "Escolher um objetivo importante para você e decidir como voltar a se comprometer depois de um revés. Mudar de rumo após uma reflexão também combina com esse tema.",
    "evidence": "interpretation"
  },
  {
    "label": "Evidência em Undertale",
    "left": "O resultado laranja descreve avançar de punhos contra os obstáculos.",
    "right": "Determinação é a vontade de mudar o destino e permite que almas persistam após a morte.",
    "evidence": "game"
  },
  {
    "label": "Uma pergunta para refletir",
    "left": "Que ação segura você pode tomar sem fingir que o medo desapareceu?",
    "right": "O que ainda faz esse objetivo valer a pena e que evidência faria você mudá-lo?",
    "evidence": "interpretation"
  }
],
      differenceParagraphs: [
  "Um projeto precisa de uma conversa difícil. A Bravura aborda expressar uma preocupação com segurança apesar do nervosismo. A Determinação aborda se o projeto ainda importa e qual passo serve ao objetivo. Uma conversa corajosa não estabelece sozinha uma meta de longo prazo.",
  "A principal dificuldade é enfrentar o medo agora ou decidir qual objetivo defender?"
],
      scenarios: [
  {
    "title": "A principal dificuldade é enfrentar o medo agora ou decidir qual objetivo defender?",
    "left": "Que ação segura você pode tomar sem fingir que o medo desapareceu?",
    "right": "O que ainda faz esse objetivo valer a pena e que evidência faria você mudá-lo?"
  }
],
      hybridIntro: "Dois resultados próximos podem descrever respostas a partes diferentes da mesma situação. Leia as duas definições e veja qual parte da decisão cada uma aborda. A regra de 3 pontos não demonstra uma diferença psicologicamente significativa.",
      strengths: [
  "Você precisa levantar uma preocupação. Reconhece o nervosismo e escolhe uma ação pequena e segura, como pedir uma conversa particular.",
  "Um plano de estudo falha. Você revê por que a qualificação importa e escolhe um próximo passo, em vez de manter o objetivo só para não admitir o fracasso."
],
      risks: [
  "São respostas pessoais a um teste adaptado de forma independente. Fontes de domínio público não transformam os sete temas em um instrumento psicológico validado. Humor, experiência e interpretação podem afetar as respostas. Uma pontuação baixa não prova falta de uma virtude; uma alta não justifica riscos nem permite diagnosticar."
],
      evidenceBody: 'Bravura aparece entre os seis traços do Jogo da Bola e se liga ao resultado laranja. Determinação é canônica como poder ligado a persistir, SAVE e mudar o destino, mas o jogo não a nomeia como traço da Alma Vermelha. O restante é interpretação do site.',
      testBody: "O resultado completo dos sete temas, a revisão de respostas e o cartão PNG são gratuitos, sem conta, pagamento ou convites.",
    }),
    ru: withShared('ru', {
      seoTitle: 'Храбрость против Решимости в Undertale - Сравнение черт души',
      seoDescription: "Сравнение Храбрости и Решимости в Undertale: первый шаг наперекор страху против отказа сдаваться, факты из игры и примеры.",
      heading: 'Храбрость против Решимости',
      intro: "Храбрость относится к действию несмотря на страх; Решимость — к выбору и пересмотру направления важной цели.",
      quickAnswer: "Храбрость относится к действию несмотря на страх; Решимость — к выбору и пересмотру направления важной цели.",
      leftLabel: 'Храбрость',
      rightLabel: 'Решимость',
      rows: [
  {
    "label": "На чём сосредоточен тест",
    "left": "Выражение позиции или действие несмотря на страх и давление окружающих, когда это достаточно безопасно. Оценка не поощряет опасность и не требует общительности.",
    "right": "Выбор важной для вас цели и решение о том, как снова к ней обратиться после неудачи. Обдуманная смена направления тоже соответствует этой теме.",
    "evidence": "interpretation"
  },
  {
    "label": "Факты Undertale",
    "left": "Оранжевый флаг в гольфе Сноудина описывает «кулаками напролом через все преграды».",
    "right": "Решимость названа силой изменять судьбу и позволяет душам жить после смерти.",
    "evidence": "game"
  },
  {
    "label": "Вопрос для размышления",
    "left": "Какой безопасный шаг можно сделать, не притворяясь, что страх исчез?",
    "right": "Почему эта цель всё ещё стоит усилий и какие факты могли бы заставить вас её изменить?",
    "evidence": "interpretation"
  }
],
      differenceParagraphs: [
  "Проект требует трудного разговора. Храбрость помогает безопасно высказать опасение несмотря на волнение. Решимость помогает оценить важность проекта и выбрать шаг к его цели. Один смелый разговор сам по себе не определяет долгосрочную цель.",
  "Главная трудность — встретиться со страхом сейчас или решить, какую цель поддерживать?"
],
      scenarios: [
  {
    "title": "Главная трудность — встретиться со страхом сейчас или решить, какую цель поддерживать?",
    "left": "Какой безопасный шаг можно сделать, не притворяясь, что страх исчез?",
    "right": "Почему эта цель всё ещё стоит усилий и какие факты могли бы заставить вас её изменить?"
  }
],
      hybridIntro: "Две близкие оценки могут отражать реакции на разные части одной ситуации. Прочитайте оба определения и отметьте, к какой части решения относится каждое. Правило 3 пунктов не доказывает психологически значимой разницы.",
      strengths: [
  "Нужно высказать опасение. Вы признаёте своё волнение и выбираете небольшой безопасный шаг, например просите поговорить наедине.",
  "План подготовки не сработал. Вы заново оцениваете, зачем вам квалификация, и выбираете следующий шаг вместо сохранения цели лишь ради нежелания признать неудачу."
],
      risks: [
  "Это личные ответы на независимо адаптированный тест. Источники из общественного достояния не делают сочетание семи тем валидированным психологическим опросником. Ответы зависят от настроения, опыта и понимания текста. Низкий балл не доказывает отсутствие добродетели, а высокий не оправдывает риск и не позволяет поставить диагноз."
],
      evidenceBody: 'Храбрость входит в число шести черт игры в мяч и связана с оранжевым флагом. Решимость канонично связана с силой сохранения (SAVE) и изменением судьбы.',
      testBody: "Полный результат по семи темам, просмотр ответов и PNG-карточка бесплатны. Учётная запись, оплата и приглашения не нужны.",
    }),
  },
};

export const INTEGRITY_VS_JUSTICE: ComparisonSample = {
  slug: 'integrity-vs-justice',
  leftSlug: 'integrity',
  rightSlug: 'justice',
  copy: {
    en: withShared('en', {
      seoTitle: 'Integrity vs Justice: Undertale Soul Traits Compared',
      seoDescription: "Compare Integrity and Justice in Undertale: holding yourself to a standard versus defending fairness, with game evidence and practical examples.",
      heading: 'Integrity vs Justice',
      intro: "Integrity concerns truthful, reliable conduct; Justice concerns fair standards across different people.",
      quickAnswer: "Integrity concerns truthful, reliable conduct; Justice concerns fair standards across different people.",
      leftLabel: 'Integrity',
      rightLabel: 'Justice',
      rows: [
  {
    "label": "What this quiz focuses on",
    "left": "Honesty, confidentiality and keeping commitments, including admitting mistakes. A score does not establish a person's moral worth or make their beliefs automatically right.",
    "right": "Applying fair standards to different people, with attention to rights, opportunity and shared outcomes. Fairness can require understanding different needs.",
    "evidence": "interpretation"
  },
  {
    "label": "Undertale evidence",
    "left": "The blue Ball Game result praises an original style that pulled the player through.",
    "right": "The yellow result praises sure-fire accuracy that ended the mayhem.",
    "evidence": "game"
  },
  {
    "label": "A question for reflection",
    "left": "What is the honest next sentence, and which commitment can you actually keep?",
    "right": "Would you accept the same standard if it were applied to you or someone you dislike?",
    "evidence": "interpretation"
  }
],
      differenceParagraphs: [
  "An error affects a team. Integrity can mean admitting your own part and correcting a promise. Justice can mean checking the facts and applying the same fair accountability standard to everyone, including friends. These actions can support each other without being identical.",
  "Are you aligning your own words and actions, or deciding what treatment is fair for everyone?"
],
      scenarios: [
  {
    "title": "Are you aligning your own words and actions, or deciding what treatment is fair for everyone?",
    "left": "What is the honest next sentence, and which commitment can you actually keep?",
    "right": "Would you accept the same standard if it were applied to you or someone you dislike?"
  }
],
      hybridIntro: "Two close scores can describe different responses to the same situation. Read both definitions and notice which part of the decision each addresses. The 3-point display rule does not show that a difference is psychologically significant.",
      strengths: [
  "You have made a promise you can no longer keep. You explain the problem promptly and discuss a new commitment rather than hiding it.",
  "A group divides credit for a project. You check contributions and use a standard you could also accept if you were not the person benefiting."
],
      risks: [
  "These are self-reported responses to an independently adapted quiz. Public-domain source material does not make the seven-theme combination a validated psychological inventory. Mood, experience and interpretation can affect answers. A low score does not prove you lack a virtue; a high score cannot justify unsafe behavior or diagnose anyone."
],
      evidenceBody: 'Integrity and Justice are explicitly named in the Ball Game. The blue result references original style; the yellow result references accuracy ending mayhem. “Self-restraint versus protecting fairness” is a practical interpretation, not a line stated by the game.',
      testBody: "The complete seven-score result, answer review and PNG card are free, with no account, payment or invitation required.",
    }),
    ja: withShared('ja', {
      seoTitle: 'Undertale せいじつとせいぎの違い',
      seoDescription: "Undertaleのせいじつとせいぎを比較。自分を原則で律する力と、公平を守り不正を正す力の違いを解説。",
      heading: 'せいじつ vs せいぎ',
      intro: "せいじつは正直で信頼できる行動、せいぎは相手によらない公平な基準に目を向けます。",
      quickAnswer: "せいじつは正直で信頼できる行動、せいぎは相手によらない公平な基準に目を向けます。",
      leftLabel: 'せいじつ',
      rightLabel: 'せいぎ',
      rows: [
  {
    "label": "このテストで見るテーマ",
    "left": "正直さ、秘密を守ること、約束を守ること、間違いを認めること。得点は人の道徳的な価値や信念の正しさを決めない。",
    "right": "権利、機会、共同の成果に目を向け、相手によらず公平な基準を使うこと。公平さには人ごとの必要を理解することも含まれる。",
    "evidence": "interpretation"
  },
  {
    "label": "Undertaleでの根拠",
    "left": "青の結果は独自のスタイルで切り抜けたことを称える。",
    "right": "黄の結果は確かな正確さで混乱を終わらせたことを称える。",
    "evidence": "game"
  },
  {
    "label": "振り返るための問い",
    "left": "次に伝える正直な一言は何ですか。実際に守れる約束はどれですか。",
    "right": "その基準が自分や苦手な相手に使われても受け入れられますか。",
    "evidence": "interpretation"
  }
],
      differenceParagraphs: [
  "間違いがチームに影響した。せいじつでは自分の責任を認め、約束を修正する。せいぎでは事実を確認し、友人を含む全員に公平な責任の基準を使う。両方は支え合えるが、同じ行動ではない。",
  "自分の言葉と行動をそろえていますか。それとも全員への公平な対応を決めていますか。"
],
      scenarios: [
  {
    "title": "自分の言葉と行動をそろえていますか。それとも全員への公平な対応を決めていますか。",
    "left": "次に伝える正直な一言は何ですか。実際に守れる約束はどれですか。",
    "right": "その基準が自分や苦手な相手に使われても受け入れられますか。"
  }
],
      hybridIntro: "近い2つの得点は、同じ状況の違う部分への反応を示すことがあります。両方の定義を読み、それぞれが判断のどの部分を見るか考えてください。3点という表示基準は心理学的に意味のある差を示しません。",
      strengths: [
  "守れない約束をしてしまった。隠すのではなく、問題を早めに説明して、守れる新しい約束を相談する。",
  "グループで成果の評価を分ける。各自の貢献を確認し、自分が得をしない立場でも受け入れられる基準を使う。"
],
      risks: [
  "結果は、独自に改編した質問への自己申告の回答です。出典がパブリックドメインでも、7つのテーマの組合せが検証済み心理尺度になるわけではありません。気分、経験、解釈で回答は変わります。低い得点は美徳がない証拠ではなく、高い得点も危険な行動や診断を正当化しません。"
],
      evidenceBody: 'せいじつとせいぎはボールゲームで明示されます。青は独自のスタイル、黄は混乱を終える正確さを示します。「自分を律する／公平を守る」は実生活向けの解釈で、ゲームの直接表現ではありません。',
      testBody: "7つの得点、回答の確認、PNGカードはすべて無料です。アカウント、支払い、招待は不要です。",
    }),
    es: withShared('es', {
      seoTitle: 'Integridad vs Justicia en Undertale',
      seoDescription: "Compara Integridad y Justicia en Undertale: exigirte coherencia frente a defender la equidad, con evidencia del juego y ejemplos.",
      heading: 'Integridad vs Justicia',
      intro: "La Integridad trata de una conducta honesta y fiable; la Justicia, de criterios justos para personas diferentes.",
      quickAnswer: "La Integridad trata de una conducta honesta y fiable; la Justicia, de criterios justos para personas diferentes.",
      leftLabel: 'Integridad',
      rightLabel: 'Justicia',
      rows: [
  {
    "label": "Qué explora este test",
    "left": "Honestidad, confidencialidad y cumplimiento de compromisos, incluido reconocer errores. Una puntuación no establece el valor moral de nadie ni hace correctas sus creencias.",
    "right": "Aplicar criterios justos a personas diferentes, atendiendo a sus derechos, oportunidades y resultados compartidos. La justicia puede requerir entender necesidades distintas.",
    "evidence": "interpretation"
  },
  {
    "label": "Evidencia en Undertale",
    "left": "El resultado azul elogia un estilo original que permitió superar la prueba.",
    "right": "El amarillo elogia una precisión segura que terminó el caos.",
    "evidence": "game"
  },
  {
    "label": "Una pregunta para reflexionar",
    "left": "¿Cuál es la siguiente frase honesta y qué compromiso puedes cumplir de verdad?",
    "right": "¿Aceptarías el mismo criterio si se aplicara a ti o a alguien que te cae mal?",
    "evidence": "interpretation"
  }
],
      differenceParagraphs: [
  "Un error afecta al equipo. La Integridad puede consistir en reconocer tu parte y corregir una promesa. La Justicia puede consistir en comprobar los hechos y aplicar el mismo criterio justo de responsabilidad a todos, incluidos los amigos. Se apoyan sin ser idénticas.",
  "¿Estás alineando tus palabras y acciones o decidiendo qué trato es justo para todos?"
],
      scenarios: [
  {
    "title": "¿Estás alineando tus palabras y acciones o decidiendo qué trato es justo para todos?",
    "left": "¿Cuál es la siguiente frase honesta y qué compromiso puedes cumplir de verdad?",
    "right": "¿Aceptarías el mismo criterio si se aplicara a ti o a alguien que te cae mal?"
  }
],
      hybridIntro: "Dos resultados cercanos pueden describir respuestas a partes distintas de una situación. Lee ambas definiciones y observa qué parte de la decisión trata cada una. La regla de 3 puntos no demuestra una diferencia psicológicamente significativa.",
      strengths: [
  "Ya no puedes cumplir una promesa. Explicas el problema pronto y acuerdas un nuevo compromiso en lugar de ocultarlo.",
  "Un grupo reparte el reconocimiento de un proyecto. Revisas las contribuciones y usas un criterio que aceptarías incluso sin beneficiarte de él."
],
      risks: [
  "Son respuestas personales a un test adaptado de forma independiente. Las fuentes de dominio público no convierten estos siete temas en un instrumento psicológico validado. El ánimo, la experiencia y la interpretación pueden cambiar las respuestas. Una puntuación baja no prueba que te falte una virtud; una alta no justifica riesgos ni permite diagnosticar."
],
      evidenceBody: 'Integridad y Justicia aparecen en el Juego de Pelota. El resultado azul alude al estilo original; el amarillo, a la precisión que termina el caos. “Regularse a uno mismo frente a proteger la equidad” es una interpretación práctica.',
      testBody: "El resultado completo de siete temas, la revisión de respuestas y la tarjeta PNG son gratuitos, sin cuenta, pago ni invitaciones.",
    }),
    pt: withShared('pt', {
      seoTitle: 'Integridade vs Justiça em Undertale',
      seoDescription: "Compare Integridade e Justiça em Undertale: cobrar coerência de si versus defender a equidade, com evidências e exemplos.",
      heading: 'Integridade vs Justiça',
      intro: "A Integridade trata de uma conduta honesta e confiável; a Justiça, de critérios justos para pessoas diferentes.",
      quickAnswer: "A Integridade trata de uma conduta honesta e confiável; a Justiça, de critérios justos para pessoas diferentes.",
      leftLabel: 'Integridade',
      rightLabel: 'Justiça',
      rows: [
  {
    "label": "O que este teste explora",
    "left": "Honestidade, confidencialidade e cumprimento de compromissos, inclusive admitir erros. Uma pontuação não define o valor moral de alguém nem torna suas crenças corretas.",
    "right": "Aplicar critérios justos a pessoas diferentes, considerando direitos, oportunidades e resultados compartilhados. A justiça pode exigir entender necessidades diferentes.",
    "evidence": "interpretation"
  },
  {
    "label": "Evidência em Undertale",
    "left": "O resultado azul elogia um estilo original que superou a prova.",
    "right": "O amarelo elogia a precisão que encerrou o caos.",
    "evidence": "game"
  },
  {
    "label": "Uma pergunta para refletir",
    "left": "Qual é a próxima frase honesta e que compromisso você realmente pode cumprir?",
    "right": "Você aceitaria o mesmo critério se ele fosse aplicado a você ou a alguém de quem não gosta?",
    "evidence": "interpretation"
  }
],
      differenceParagraphs: [
  "Um erro afeta a equipe. A Integridade pode significar admitir sua parte e corrigir uma promessa. A Justiça pode significar verificar os fatos e aplicar o mesmo critério justo de responsabilidade a todos, inclusive amigos. As ações se apoiam sem serem idênticas.",
  "Você está alinhando suas palavras e ações ou decidindo qual tratamento é justo para todos?"
],
      scenarios: [
  {
    "title": "Você está alinhando suas palavras e ações ou decidindo qual tratamento é justo para todos?",
    "left": "Qual é a próxima frase honesta e que compromisso você realmente pode cumprir?",
    "right": "Você aceitaria o mesmo critério se ele fosse aplicado a você ou a alguém de quem não gosta?"
  }
],
      hybridIntro: "Dois resultados próximos podem descrever respostas a partes diferentes da mesma situação. Leia as duas definições e veja qual parte da decisão cada uma aborda. A regra de 3 pontos não demonstra uma diferença psicologicamente significativa.",
      strengths: [
  "Você não consegue mais cumprir uma promessa. Explica o problema logo e combina um novo compromisso em vez de escondê-lo.",
  "Um grupo divide o reconhecimento de um projeto. Você verifica as contribuições e usa um critério que aceitaria mesmo sem se beneficiar dele."
],
      risks: [
  "São respostas pessoais a um teste adaptado de forma independente. Fontes de domínio público não transformam os sete temas em um instrumento psicológico validado. Humor, experiência e interpretação podem afetar as respostas. Uma pontuação baixa não prova falta de uma virtude; uma alta não justifica riscos nem permite diagnosticar."
],
      evidenceBody: 'Integridade e Justiça aparecem no Jogo da Bola. O resultado azul cita estilo original; o amarelo, precisão encerrando o caos. “Regular a si versus proteger a equidade” é interpretação prática.',
      testBody: "O resultado completo dos sete temas, a revisão de respostas e o cartão PNG são gratuitos, sem conta, pagamento ou convites.",
    }),
    ru: withShared('ru', {
      seoTitle: 'Порядочность против Справедливости в Undertale - Сравнение черт души',
      seoDescription: "Сравнение Порядочности и Справедливости в Undertale: внутренняя верность себе против защиты прав других и восстановления баланса.",
      heading: 'Порядочность против Справедливости',
      intro: "Порядочность относится к честному и надёжному поведению; Справедливость — к справедливым критериям для разных людей.",
      quickAnswer: "Порядочность относится к честному и надёжному поведению; Справедливость — к справедливым критериям для разных людей.",
      leftLabel: 'Порядочность',
      rightLabel: 'Справедливость',
      rows: [
  {
    "label": "На чём сосредоточен тест",
    "left": "Честность, сохранение доверенной информации и выполнение обязательств, включая признание ошибок. Балл не определяет моральную ценность человека и не делает его убеждения верными.",
    "right": "Применение справедливых критериев к разным людям с учётом прав, возможностей и общих результатов. Справедливость может требовать понимания разных потребностей.",
    "evidence": "interpretation"
  },
  {
    "label": "Факты Undertale",
    "left": "Синий флаг: «Твой оригинальный стиль помог пройти игру в мяч». Пуанты и пачка.",
    "right": "Жёлтый флаг: «Твоя меткая стрельба положила конец бесчинствам». Пистолет и шляпа.",
    "evidence": "game"
  },
  {
    "label": "Вопрос для размышления",
    "left": "Какой будет следующая честная фраза и какое обязательство вы действительно можете выполнить?",
    "right": "Вы приняли бы тот же критерий, если бы он применялся к вам или к неприятному вам человеку?",
    "evidence": "interpretation"
  }
],
      differenceParagraphs: [
  "Ошибка затронула команду. Порядочность может означать признание своей ответственности и исправление обещания. Справедливость — проверку фактов и единые справедливые критерии ответственности для всех, включая друзей. Эти действия дополняют друг друга, но не совпадают.",
  "Вы согласуете свои слова и действия или решаете, какое отношение справедливо для всех?"
],
      scenarios: [
  {
    "title": "Вы согласуете свои слова и действия или решаете, какое отношение справедливо для всех?",
    "left": "Какой будет следующая честная фраза и какое обязательство вы действительно можете выполнить?",
    "right": "Вы приняли бы тот же критерий, если бы он применялся к вам или к неприятному вам человеку?"
  }
],
      hybridIntro: "Две близкие оценки могут отражать реакции на разные части одной ситуации. Прочитайте оба определения и отметьте, к какой части решения относится каждое. Правило 3 пунктов не доказывает психологически значимой разницы.",
      strengths: [
  "Вы больше не можете выполнить обещание. Вместо сокрытия проблемы вы быстро объясняете её и обсуждаете новое обязательство.",
  "Группа распределяет признание за проект. Вы проверяете вклад каждого и применяете критерий, с которым согласились бы и без личной выгоды."
],
      risks: [
  "Это личные ответы на независимо адаптированный тест. Источники из общественного достояния не делают сочетание семи тем валидированным психологическим опросником. Ответы зависят от настроения, опыта и понимания текста. Низкий балл не доказывает отсутствие добродетели, а высокий не оправдывает риск и не позволяет поставить диагноз."
],
      evidenceBody: 'Порядочность и Справедливость — две самостоятельные человеческие души из гольфа Сноудина.',
      testBody: "Полный результат по семи темам, просмотр ответов и PNG-карточка бесплатны. Учётная запись, оплата и приглашения не нужны.",
    }),
  },
};

export const KINDNESS_VS_PATIENCE: ComparisonSample = {
  slug: 'kindness-vs-patience',
  leftSlug: 'kindness',
  rightSlug: 'patience',
  copy: {
    en: withShared('en', {
      seoTitle: 'Kindness vs Patience: Undertale Soul Traits Compared',
      seoDescription: "Compare Kindness and Patience in Undertale: caring for others versus regulating urgency, with game evidence, examples, strengths, and risks.",
      heading: 'Kindness vs Patience',
      intro: "Kindness concerns useful care for another person; Patience concerns your response to waiting, irritation or repeated difficulty.",
      quickAnswer: "Kindness concerns useful care for another person; Patience concerns your response to waiting, irritation or repeated difficulty.",
      leftLabel: 'Kindness',
      rightLabel: 'Patience',
      rows: [
  {
    "label": "What this quiz focuses on",
    "left": "Caring, listening and offering useful help within reasonable limits. Being kind does not require taking over another person's choices or neglecting your own needs.",
    "right": "How you respond to waiting, minor frustration and annoyance. This theme includes pausing and calming down; it does not ask you to tolerate harm or indefinite delay.",
    "evidence": "interpretation"
  },
  {
    "label": "Undertale evidence",
    "left": "The green Ball Game result praises concern and care for the ball.",
    "right": "The light-blue result praises waiting still for the right opportunity.",
    "evidence": "game"
  },
  {
    "label": "A question for reflection",
    "left": "What help would answer this person's actual need, and what can you reasonably offer?",
    "right": "When is a reasonable follow-up time, and what can you do while waiting?",
    "evidence": "interpretation"
  }
],
      differenceParagraphs: [
  "A friend repeats a worry. Kindness asks what kind of support the friend actually wants. Patience concerns how you handle frustration while listening. You can care and still set a time limit; staying calm does not automatically mean the support was useful.",
  "Are you deciding what help to offer, or how to manage your reaction while the situation continues?"
],
      scenarios: [
  {
    "title": "Are you deciding what help to offer, or how to manage your reaction while the situation continues?",
    "left": "What help would answer this person's actual need, and what can you reasonably offer?",
    "right": "When is a reasonable follow-up time, and what can you do while waiting?"
  }
],
      hybridIntro: "Two close scores can describe different responses to the same situation. Read both definitions and notice which part of the decision each addresses. The 3-point display rule does not show that a difference is psychologically significant.",
      strengths: [
  "A friend is struggling. Before offering help, you ask whether they want listening, practical support or some space.",
  "A reply is late. You choose a reasonable time to follow up and turn to another task instead of repeatedly checking or taking frustration out on someone."
],
      risks: [
  "These are self-reported responses to an independently adapted quiz. Public-domain source material does not make the seven-theme combination a validated psychological inventory. Mood, experience and interpretation can affect answers. A low score does not prove you lack a virtue; a high score cannot justify unsafe behavior or diagnose anyone."
],
      evidenceBody: 'Kindness and Patience are explicitly named in the Ball Game. The green result refers to concern and care; the light-blue result refers to waiting still for an opportunity. The broader behavioral comparison is this site’s interpretation.',
      testBody: "The complete seven-score result, answer review and PNG card are free, with no account, payment or invitation required.",
    }),
    ja: withShared('ja', {
      seoTitle: 'Undertale しんせつとにんたいの違い',
      seoDescription: "Undertaleのしんせつとにんたいを比較。他人を気づかう力と、自分の焦りを抑え適切な時機を待つ力の違いを解説。",
      heading: 'しんせつ vs にんたい',
      intro: "やさしさは相手に役立つ気遣い、にんたいは待ち時間やいらだちへの自分の対応です。",
      quickAnswer: "やさしさは相手に役立つ気遣い、にんたいは待ち時間やいらだちへの自分の対応です。",
      leftLabel: 'しんせつ',
      rightLabel: 'にんたい',
      rows: [
  {
    "label": "このテストで見るテーマ",
    "left": "無理のない範囲で気にかけ、話を聞き、役に立つ助けを提供すること。相手の選択を代わりに決めたり、自分の必要を無視したりする必要はない。",
    "right": "待ち時間、小さなつまずき、いらだちにどう対応するか。このテーマには一呼吸置いて落ち着くことが含まれるが、害や終わりのない遅れを我慢する必要はない。",
    "evidence": "interpretation"
  },
  {
    "label": "Undertaleでの根拠",
    "left": "緑の結果はボールへの気づかいと世話を称える。",
    "right": "水色の結果は好機まで静かに待ったことを称える。",
    "evidence": "game"
  },
  {
    "label": "振り返るための問い",
    "left": "相手の本当の必要に合う助けは何ですか。無理なく何を提供できますか。",
    "right": "いつ確認するのが適切ですか。待つ間に何ができますか。",
    "evidence": "interpretation"
  }
],
      differenceParagraphs: [
  "友人が同じ心配を繰り返す。やさしさでは相手が本当に求める支援を考える。にんたいでは聞く間のいらだちへの対応を見る。気にかけながら時間を区切ることもでき、落ち着いているだけで役立つ支援になるわけではない。",
  "どんな助けを提供するか考えていますか。それとも状況が続く間の反応を調整していますか。"
],
      scenarios: [
  {
    "title": "どんな助けを提供するか考えていますか。それとも状況が続く間の反応を調整していますか。",
    "left": "相手の本当の必要に合う助けは何ですか。無理なく何を提供できますか。",
    "right": "いつ確認するのが適切ですか。待つ間に何ができますか。"
  }
],
      hybridIntro: "近い2つの得点は、同じ状況の違う部分への反応を示すことがあります。両方の定義を読み、それぞれが判断のどの部分を見るか考えてください。3点という表示基準は心理学的に意味のある差を示しません。",
      strengths: [
  "友人が困っている。助ける前に、話を聞いてほしいのか、具体的な支援がほしいのか、少し一人でいたいのかを聞く。",
  "返事が遅れている。適切に確認する時刻を決め、何度も確認したり誰かにいらだちをぶつけたりする代わりに、別の作業に取り組む。"
],
      risks: [
  "結果は、独自に改編した質問への自己申告の回答です。出典がパブリックドメインでも、7つのテーマの組合せが検証済み心理尺度になるわけではありません。気分、経験、解釈で回答は変わります。低い得点は美徳がない証拠ではなく、高い得点も危険な行動や診断を正当化しません。"
],
      evidenceBody: 'しんせつとにんたいはボールゲームで明示されます。緑は気づかいと世話、水色は好機まで静かに待つことを示します。それ以上の行動比較は当サイトの解釈です。',
      testBody: "7つの得点、回答の確認、PNGカードはすべて無料です。アカウント、支払い、招待は不要です。",
    }),
    es: withShared('es', {
      seoTitle: 'Bondad vs Paciencia en Undertale',
      seoDescription: "Compara Bondad y Paciencia en Undertale: cuidar a otros frente a regular la urgencia, con evidencia del juego, ejemplos y riesgos.",
      heading: 'Bondad vs Paciencia',
      intro: "La Bondad trata del cuidado útil de otra persona; la Paciencia, de tu reacción a la espera, la irritación o las dificultades repetidas.",
      quickAnswer: "La Bondad trata del cuidado útil de otra persona; la Paciencia, de tu reacción a la espera, la irritación o las dificultades repetidas.",
      leftLabel: 'Bondad',
      rightLabel: 'Paciencia',
      rows: [
  {
    "label": "Qué explora este test",
    "left": "Preocuparte, escuchar y ofrecer ayuda útil dentro de límites razonables. Ser amable no exige decidir por otra persona ni descuidar tus necesidades.",
    "right": "Cómo respondes a la espera, la frustración leve y la irritación. Incluye hacer una pausa y calmarte; no exige tolerar daño ni retrasos indefinidos.",
    "evidence": "interpretation"
  },
  {
    "label": "Evidencia en Undertale",
    "left": "El resultado verde elogia la preocupación y el cuidado por la pelota.",
    "right": "El celeste elogia esperar quieto la oportunidad adecuada.",
    "evidence": "game"
  },
  {
    "label": "Una pregunta para reflexionar",
    "left": "¿Qué ayuda responde a su necesidad real y qué puedes ofrecer razonablemente?",
    "right": "¿Cuándo sería razonable preguntar de nuevo y qué puedes hacer mientras esperas?",
    "evidence": "interpretation"
  }
],
      differenceParagraphs: [
  "Un amigo repite una preocupación. La Bondad pregunta qué apoyo desea realmente. La Paciencia trata de gestionar la frustración al escuchar. Puedes preocuparte y poner un límite de tiempo; mantener la calma no demuestra por sí solo que la ayuda fuera útil.",
  "¿Estás decidiendo qué ayuda ofrecer o cómo gestionar tu reacción mientras continúa la situación?"
],
      scenarios: [
  {
    "title": "¿Estás decidiendo qué ayuda ofrecer o cómo gestionar tu reacción mientras continúa la situación?",
    "left": "¿Qué ayuda responde a su necesidad real y qué puedes ofrecer razonablemente?",
    "right": "¿Cuándo sería razonable preguntar de nuevo y qué puedes hacer mientras esperas?"
  }
],
      hybridIntro: "Dos resultados cercanos pueden describir respuestas a partes distintas de una situación. Lee ambas definiciones y observa qué parte de la decisión trata cada una. La regla de 3 puntos no demuestra una diferencia psicológicamente significativa.",
      strengths: [
  "Un amigo tiene dificultades. Antes de ayudar, preguntas si quiere que lo escuches, apoyo práctico o un poco de espacio.",
  "Una respuesta tarda. Eliges un momento razonable para preguntar y haces otra tarea, en vez de revisar sin parar o descargar la frustración en alguien."
],
      risks: [
  "Son respuestas personales a un test adaptado de forma independiente. Las fuentes de dominio público no convierten estos siete temas en un instrumento psicológico validado. El ánimo, la experiencia y la interpretación pueden cambiar las respuestas. Una puntuación baja no prueba que te falte una virtud; una alta no justifica riesgos ni permite diagnosticar."
],
      evidenceBody: 'Bondad y Paciencia aparecen en el Juego de Pelota. El verde habla de preocupación y cuidado; el celeste, de esperar quieto una oportunidad. La comparación amplia es interpretación del sitio.',
      testBody: "El resultado completo de siete temas, la revisión de respuestas y la tarjeta PNG son gratuitos, sin cuenta, pago ni invitaciones.",
    }),
    pt: withShared('pt', {
      seoTitle: 'Bondade vs Paciência em Undertale',
      seoDescription: "Compare Bondade e Paciência em Undertale: cuidar dos outros versus regular a urgência, com evidências, exemplos e riscos.",
      heading: 'Bondade vs Paciência',
      intro: "A Bondade trata do cuidado útil com outra pessoa; a Paciência, da sua reação à espera, à irritação ou às dificuldades repetidas.",
      quickAnswer: "A Bondade trata do cuidado útil com outra pessoa; a Paciência, da sua reação à espera, à irritação ou às dificuldades repetidas.",
      leftLabel: 'Bondade',
      rightLabel: 'Paciência',
      rows: [
  {
    "label": "O que este teste explora",
    "left": "Cuidar, ouvir e oferecer ajuda útil dentro de limites razoáveis. Ser gentil não exige decidir por outra pessoa nem ignorar suas próprias necessidades.",
    "right": "Como você reage à espera, à frustração leve e à irritação. Inclui pausar e se acalmar; não exige tolerar danos ou atrasos indefinidos.",
    "evidence": "interpretation"
  },
  {
    "label": "Evidência em Undertale",
    "left": "O resultado verde elogia preocupação e cuidado com a bola.",
    "right": "O azul-claro elogia esperar imóvel pela oportunidade certa.",
    "evidence": "game"
  },
  {
    "label": "Uma pergunta para refletir",
    "left": "Que ajuda atende à necessidade real dessa pessoa e o que você pode oferecer de forma razoável?",
    "right": "Quando seria razoável perguntar de novo e o que você pode fazer enquanto espera?",
    "evidence": "interpretation"
  }
],
      differenceParagraphs: [
  "Um amigo repete uma preocupação. A Bondade pergunta qual apoio ele realmente quer. A Paciência trata de lidar com a frustração ao ouvir. Você pode se importar e estabelecer um limite de tempo; ficar calmo não prova sozinho que a ajuda foi útil.",
  "Você está decidindo que ajuda oferecer ou como lidar com sua reação enquanto a situação continua?"
],
      scenarios: [
  {
    "title": "Você está decidindo que ajuda oferecer ou como lidar com sua reação enquanto a situação continua?",
    "left": "Que ajuda atende à necessidade real dessa pessoa e o que você pode oferecer de forma razoável?",
    "right": "Quando seria razoável perguntar de novo e o que você pode fazer enquanto espera?"
  }
],
      hybridIntro: "Dois resultados próximos podem descrever respostas a partes diferentes da mesma situação. Leia as duas definições e veja qual parte da decisão cada uma aborda. A regra de 3 pontos não demonstra uma diferença psicologicamente significativa.",
      strengths: [
  "Um amigo está com dificuldades. Antes de ajudar, você pergunta se ele quer ser ouvido, apoio prático ou um pouco de espaço.",
  "Uma resposta demora. Você escolhe um momento razoável para perguntar e faz outra tarefa, em vez de verificar sem parar ou descontar a frustração em alguém."
],
      risks: [
  "São respostas pessoais a um teste adaptado de forma independente. Fontes de domínio público não transformam os sete temas em um instrumento psicológico validado. Humor, experiência e interpretação podem afetar as respostas. Uma pontuação baixa não prova falta de uma virtude; uma alta não justifica riscos nem permite diagnosticar."
],
      evidenceBody: 'Bondade e Paciência aparecem no Jogo da Bola. O verde fala de preocupação e cuidado; o azul-claro, de esperar imóvel por uma oportunidade. A comparação ampla é interpretação do site.',
      testBody: "O resultado completo dos sete temas, a revisão de respostas e o cartão PNG são gratuitos, sem conta, pagamento ou convites.",
    }),
    ru: withShared('ru', {
      seoTitle: 'Доброта против Терпения в Undertale - Сравнение черт души',
      seoDescription: "Сравнение Доброты и Терпения в Undertale: деятельная забота против мудрого выжидания и душевного спокойствия.",
      heading: 'Доброта против Терпения',
      intro: "Доброта относится к полезной заботе о другом; Терпение — к вашей реакции на ожидание, раздражение или повторяющиеся трудности.",
      quickAnswer: "Доброта относится к полезной заботе о другом; Терпение — к вашей реакции на ожидание, раздражение или повторяющиеся трудности.",
      leftLabel: 'Доброта',
      rightLabel: 'Терпение',
      rows: [
  {
    "label": "На чём сосредоточен тест",
    "left": "Забота, умение слушать и полезная помощь в разумных пределах. Доброта не требует решать за другого человека или пренебрегать своими потребностями.",
    "right": "Реакция на ожидание, небольшие неудачи и раздражение. Сюда относятся пауза и самоуспокоение, но не обязанность терпеть вред или бесконечную задержку.",
    "evidence": "interpretation"
  },
  {
    "label": "Факты Undertale",
    "left": "Зелёный флаг, сковорода и фартук. Зелёная магия исцеляет.",
    "right": "Голубой флаг, игрушечный нож и лента. Голубые атаки требуют неподвижности.",
    "evidence": "game"
  },
  {
    "label": "Вопрос для размышления",
    "left": "Какая помощь отвечает реальной потребности человека и что вы можете разумно предложить?",
    "right": "Когда разумно уточнить ответ и что можно сделать во время ожидания?",
    "evidence": "interpretation"
  }
],
      differenceParagraphs: [
  "Друг повторяет своё беспокойство. Доброта помогает спросить, какая поддержка ему действительно нужна. Терпение относится к управлению раздражением во время разговора. Можно заботиться и ограничить время; спокойствие само по себе не доказывает полезность помощи.",
  "Вы решаете, какую помощь предложить, или как управлять своей реакцией, пока ситуация продолжается?"
],
      scenarios: [
  {
    "title": "Вы решаете, какую помощь предложить, или как управлять своей реакцией, пока ситуация продолжается?",
    "left": "Какая помощь отвечает реальной потребности человека и что вы можете разумно предложить?",
    "right": "Когда разумно уточнить ответ и что можно сделать во время ожидания?"
  }
],
      hybridIntro: "Две близкие оценки могут отражать реакции на разные части одной ситуации. Прочитайте оба определения и отметьте, к какой части решения относится каждое. Правило 3 пунктов не доказывает психологически значимой разницы.",
      strengths: [
  "У друга трудности. Прежде чем помогать, вы спрашиваете, хочет ли он, чтобы его выслушали, нужна ли практическая помощь или время наедине.",
  "Ответ задерживается. Вы выбираете разумное время для уточнения и занимаетесь другой задачей вместо постоянных проверок или раздражения на других."
],
      risks: [
  "Это личные ответы на независимо адаптированный тест. Источники из общественного достояния не делают сочетание семи тем валидированным психологическим опросником. Ответы зависят от настроения, опыта и понимания текста. Низкий балл не доказывает отсутствие добродетели, а высокий не оправдывает риск и не позволяет поставить диагноз."
],
      evidenceBody: 'Доброта и Терпение канонично представлены зелёной и голубой душами в Undertale.',
      testBody: "Полный результат по семи темам, просмотр ответов и PNG-карточка бесплатны. Учётная запись, оплата и приглашения не нужны.",
    }),
  },
};

export const BRAVERY_VS_PATIENCE: ComparisonSample = {
  slug: 'bravery-vs-patience',
  leftSlug: 'bravery',
  rightSlug: 'patience',
  copy: {
    en: withShared('en', {
      seoTitle: 'Bravery vs Patience: Undertale Soul Traits Compared',
      seoDescription: "Compare Bravery and Patience in Undertale: acting despite fear versus waiting for the right moment, with game evidence, examples, strengths, and risks.",
      heading: 'Bravery vs Patience',
      intro: "Bravery concerns a safe action despite fear; Patience concerns pausing and managing frustration when timing matters.",
      quickAnswer: "Bravery concerns a safe action despite fear; Patience concerns pausing and managing frustration when timing matters.",
      leftLabel: 'Bravery',
      rightLabel: 'Patience',
      rows: [
  {
    "label": "What this quiz focuses on",
    "left": "Expressing or acting despite fear or social pressure when doing so is reasonably safe. The score does not reward danger or require an outgoing personality.",
    "right": "How you respond to waiting, minor frustration and annoyance. This theme includes pausing and calming down; it does not ask you to tolerate harm or indefinite delay.",
    "evidence": "interpretation"
  },
  {
    "label": "Undertale evidence",
    "left": "The orange Ball Game result rewards rushing through obstacles.",
    "right": "The light-blue result rewards waiting still before a sharp attack.",
    "evidence": "game"
  },
  {
    "label": "A question for reflection",
    "left": "What is one safe action you could take without pretending the fear is gone?",
    "right": "When is a reasonable follow-up time, and what can you do while waiting?",
    "evidence": "interpretation"
  }
],
      differenceParagraphs: [
  "A meeting becomes heated. Bravery can help you raise a necessary concern even while nervous. Patience can help you pause, listen and choose a calmer moment. Speaking quickly is not always brave, and waiting is not always patient.",
  "What needs to be said, and what timing lets you say it safely and clearly?"
],
      scenarios: [
  {
    "title": "What needs to be said, and what timing lets you say it safely and clearly?",
    "left": "What is one safe action you could take without pretending the fear is gone?",
    "right": "When is a reasonable follow-up time, and what can you do while waiting?"
  }
],
      hybridIntro: "Two close scores can describe different responses to the same situation. Read both definitions and notice which part of the decision each addresses. The 3-point display rule does not show that a difference is psychologically significant.",
      strengths: [
  "You need to raise a concern. You choose a small safe action, such as asking for a private conversation, while acknowledging that you feel nervous.",
  "A reply is late. You choose a reasonable time to follow up and turn to another task instead of repeatedly checking or taking frustration out on someone."
],
      risks: [
  "These are self-reported responses to an independently adapted quiz. Public-domain source material does not make the seven-theme combination a validated psychological inventory. Mood, experience and interpretation can affect answers. A low score does not prove you lack a virtue; a high score cannot justify unsafe behavior or diagnose anyone."
],
      evidenceBody: 'Bravery and Patience are explicitly named in the Ball Game. Orange rewards fast, obstacle-facing play; light blue rewards waiting still for an opportunity. The broader decision model is this site’s interpretation.',
      testBody: "The complete seven-score result, answer review and PNG card are free, with no account, payment or invitation required.",
    }),
    ja: withShared('ja', {
      seoTitle: 'Undertale ゆうきとにんたいの違い',
      seoDescription: "Undertaleのゆうきとにんたいを比較。怖くても行動する力と、適切な時機まで待つ力の違いをゲーム内根拠と例で解説。",
      heading: 'ゆうき vs にんたい',
      intro: "ゆうきは怖さがあっても安全に行動すること、にんたいは一呼吸置き、いらだちとタイミングを扱うことです。",
      quickAnswer: "ゆうきは怖さがあっても安全に行動すること、にんたいは一呼吸置き、いらだちとタイミングを扱うことです。",
      leftLabel: 'ゆうき',
      rightLabel: 'にんたい',
      rows: [
  {
    "label": "このテストで見るテーマ",
    "left": "無理のない安全を保ちつつ、怖さや周囲からの圧力があっても伝えたり行動したりすること。危険を求めることや外向的な性格は条件ではない。",
    "right": "待ち時間、小さなつまずき、いらだちにどう対応するか。このテーマには一呼吸置いて落ち着くことが含まれるが、害や終わりのない遅れを我慢する必要はない。",
    "evidence": "interpretation"
  },
  {
    "label": "Undertaleでの根拠",
    "left": "オレンジの結果は障害を突き進む行動を称える。",
    "right": "水色の結果は鋭い攻撃の前に静かに待つ行動を称える。",
    "evidence": "game"
  },
  {
    "label": "振り返るための問い",
    "left": "怖さが消えたふりをせずにできる、安全な一歩は何ですか。",
    "right": "いつ確認するのが適切ですか。待つ間に何ができますか。",
    "evidence": "interpretation"
  }
],
      differenceParagraphs: [
  "会議が熱くなった。ゆうきは緊張していても必要な問題を伝える助けになる。にんたいは一度止まり、話を聞き、落ち着いた時を選ぶ助けになる。早く話せば勇敢、待てば辛抱強いとは限らない。",
  "何を伝える必要がありますか。安全にはっきり伝えるには、いつがよいですか。"
],
      scenarios: [
  {
    "title": "何を伝える必要がありますか。安全にはっきり伝えるには、いつがよいですか。",
    "left": "怖さが消えたふりをせずにできる、安全な一歩は何ですか。",
    "right": "いつ確認するのが適切ですか。待つ間に何ができますか。"
  }
],
      hybridIntro: "近い2つの得点は、同じ状況の違う部分への反応を示すことがあります。両方の定義を読み、それぞれが判断のどの部分を見るか考えてください。3点という表示基準は心理学的に意味のある差を示しません。",
      strengths: [
  "気になる問題を伝えたい。緊張を認めながら、個別に話す時間を頼むなど、小さく安全な行動を選ぶ。",
  "返事が遅れている。適切に確認する時刻を決め、何度も確認したり誰かにいらだちをぶつけたりする代わりに、別の作業に取り組む。"
],
      risks: [
  "結果は、独自に改編した質問への自己申告の回答です。出典がパブリックドメインでも、7つのテーマの組合せが検証済み心理尺度になるわけではありません。気分、経験、解釈で回答は変わります。低い得点は美徳がない証拠ではなく、高い得点も危険な行動や診断を正当化しません。"
],
      evidenceBody: 'ゆうきとにんたいはボールゲームで明示されます。オレンジは障害を素早く進む行動、水色は好機まで静かに待つ行動を示します。それ以上の判断モデルは当サイトの解釈です。',
      testBody: "7つの得点、回答の確認、PNGカードはすべて無料です。アカウント、支払い、招待は不要です。",
    }),
    es: withShared('es', {
      seoTitle: 'Valentía vs Paciencia en Undertale',
      seoDescription: "Compara Valentía y Paciencia en Undertale: actuar pese al miedo frente a esperar el momento adecuado, con evidencia y ejemplos.",
      heading: 'Valentía vs Paciencia',
      intro: "La Valentía trata de actuar con seguridad pese al miedo; la Paciencia, de pausar y gestionar la frustración cuando importa el momento.",
      quickAnswer: "La Valentía trata de actuar con seguridad pese al miedo; la Paciencia, de pausar y gestionar la frustración cuando importa el momento.",
      leftLabel: 'Valentía',
      rightLabel: 'Paciencia',
      rows: [
  {
    "label": "Qué explora este test",
    "left": "Expresarte o actuar pese al miedo o la presión social cuando hacerlo es razonablemente seguro. La puntuación no premia el peligro ni exige ser extrovertido.",
    "right": "Cómo respondes a la espera, la frustración leve y la irritación. Incluye hacer una pausa y calmarte; no exige tolerar daño ni retrasos indefinidos.",
    "evidence": "interpretation"
  },
  {
    "label": "Evidencia en Undertale",
    "left": "El resultado naranja recompensa atravesar obstáculos con rapidez.",
    "right": "El celeste recompensa esperar quieto antes de un ataque preciso.",
    "evidence": "game"
  },
  {
    "label": "Una pregunta para reflexionar",
    "left": "¿Qué acción segura puedes dar sin fingir que el miedo ha desaparecido?",
    "right": "¿Cuándo sería razonable preguntar de nuevo y qué puedes hacer mientras esperas?",
    "evidence": "interpretation"
  }
],
      differenceParagraphs: [
  "Una reunión se caldea. La Valentía ayuda a plantear una preocupación necesaria pese a los nervios. La Paciencia ayuda a parar, escuchar y elegir un momento más tranquilo. Hablar deprisa no siempre es valiente y esperar no siempre es paciente.",
  "¿Qué necesitas decir y qué momento te permite decirlo con seguridad y claridad?"
],
      scenarios: [
  {
    "title": "¿Qué necesitas decir y qué momento te permite decirlo con seguridad y claridad?",
    "left": "¿Qué acción segura puedes dar sin fingir que el miedo ha desaparecido?",
    "right": "¿Cuándo sería razonable preguntar de nuevo y qué puedes hacer mientras esperas?"
  }
],
      hybridIntro: "Dos resultados cercanos pueden describir respuestas a partes distintas de una situación. Lee ambas definiciones y observa qué parte de la decisión trata cada una. La regla de 3 puntos no demuestra una diferencia psicológicamente significativa.",
      strengths: [
  "Necesitas plantear una preocupación. Reconoces tus nervios y eliges una acción pequeña y segura, como pedir una conversación privada.",
  "Una respuesta tarda. Eliges un momento razonable para preguntar y haces otra tarea, en vez de revisar sin parar o descargar la frustración en alguien."
],
      risks: [
  "Son respuestas personales a un test adaptado de forma independiente. Las fuentes de dominio público no convierten estos siete temas en un instrumento psicológico validado. El ánimo, la experiencia y la interpretación pueden cambiar las respuestas. Una puntuación baja no prueba que te falte una virtud; una alta no justifica riesgos ni permite diagnosticar."
],
      evidenceBody: 'Valentía y Paciencia aparecen en el Juego de Pelota. El naranja premia rapidez ante obstáculos; el celeste, esperar quieto una oportunidad. El modelo amplio es interpretación del sitio.',
      testBody: "El resultado completo de siete temas, la revisión de respuestas y la tarjeta PNG son gratuitos, sin cuenta, pago ni invitaciones.",
    }),
    pt: withShared('pt', {
      seoTitle: 'Bravura vs Paciência em Undertale',
      seoDescription: "Compare Bravura e Paciência em Undertale: agir apesar do medo versus esperar o momento certo, com evidências e exemplos.",
      heading: 'Bravura vs Paciência',
      intro: "A Bravura trata de uma ação segura apesar do medo; a Paciência, de pausar e lidar com a frustração quando o momento importa.",
      quickAnswer: "A Bravura trata de uma ação segura apesar do medo; a Paciência, de pausar e lidar com a frustração quando o momento importa.",
      leftLabel: 'Bravura',
      rightLabel: 'Paciência',
      rows: [
  {
    "label": "O que este teste explora",
    "left": "Expressar-se ou agir apesar do medo ou da pressão social quando isso é razoavelmente seguro. A pontuação não premia o perigo nem exige extroversão.",
    "right": "Como você reage à espera, à frustração leve e à irritação. Inclui pausar e se acalmar; não exige tolerar danos ou atrasos indefinidos.",
    "evidence": "interpretation"
  },
  {
    "label": "Evidência em Undertale",
    "left": "O resultado laranja recompensa atravessar obstáculos rapidamente.",
    "right": "O azul-claro recompensa esperar imóvel antes de um ataque preciso.",
    "evidence": "game"
  },
  {
    "label": "Uma pergunta para refletir",
    "left": "Que ação segura você pode tomar sem fingir que o medo desapareceu?",
    "right": "Quando seria razoável perguntar de novo e o que você pode fazer enquanto espera?",
    "evidence": "interpretation"
  }
],
      differenceParagraphs: [
  "Uma reunião fica acalorada. A Bravura ajuda a levantar uma preocupação necessária apesar do nervosismo. A Paciência ajuda a pausar, ouvir e escolher um momento mais calmo. Falar rápido nem sempre é corajoso, e esperar nem sempre é paciente.",
  "O que precisa ser dito e qual momento permite dizer isso com segurança e clareza?"
],
      scenarios: [
  {
    "title": "O que precisa ser dito e qual momento permite dizer isso com segurança e clareza?",
    "left": "Que ação segura você pode tomar sem fingir que o medo desapareceu?",
    "right": "Quando seria razoável perguntar de novo e o que você pode fazer enquanto espera?"
  }
],
      hybridIntro: "Dois resultados próximos podem descrever respostas a partes diferentes da mesma situação. Leia as duas definições e veja qual parte da decisão cada uma aborda. A regra de 3 pontos não demonstra uma diferença psicologicamente significativa.",
      strengths: [
  "Você precisa levantar uma preocupação. Reconhece o nervosismo e escolhe uma ação pequena e segura, como pedir uma conversa particular.",
  "Uma resposta demora. Você escolhe um momento razoável para perguntar e faz outra tarefa, em vez de verificar sem parar ou descontar a frustração em alguém."
],
      risks: [
  "São respostas pessoais a um teste adaptado de forma independente. Fontes de domínio público não transformam os sete temas em um instrumento psicológico validado. Humor, experiência e interpretação podem afetar as respostas. Uma pontuação baixa não prova falta de uma virtude; uma alta não justifica riscos nem permite diagnosticar."
],
      evidenceBody: 'Bravura e Paciência aparecem no Jogo da Bola. O laranja premia rapidez diante de obstáculos; o azul-claro, esperar imóvel por uma oportunidade. O modelo amplo é interpretação do site.',
      testBody: "O resultado completo dos sete temas, a revisão de respostas e o cartão PNG são gratuitos, sem conta, pagamento ou convites.",
    }),
    ru: withShared('ru', {
      seoTitle: 'Храбрость против Терпения в Undertale - Сравнение черт души',
      seoDescription: "Сравнение Храбрости и Терпения в Undertale: стремительное действие против выжидания и наблюдения, игровая механика и реальные примеры.",
      heading: 'Храбрость против Терпения',
      intro: "Храбрость относится к безопасному действию несмотря на страх; Терпение — к паузе и управлению раздражением с учётом времени.",
      quickAnswer: "Храбрость относится к безопасному действию несмотря на страх; Терпение — к паузе и управлению раздражением с учётом времени.",
      leftLabel: 'Храбрость',
      rightLabel: 'Терпение',
      rows: [
  {
    "label": "На чём сосредоточен тест",
    "left": "Выражение позиции или действие несмотря на страх и давление окружающих, когда это достаточно безопасно. Оценка не поощряет опасность и не требует общительности.",
    "right": "Реакция на ожидание, небольшие неудачи и раздражение. Сюда относятся пауза и самоуспокоение, но не обязанность терпеть вред или бесконечную задержку.",
    "evidence": "interpretation"
  },
  {
    "label": "Механика Undertale",
    "left": "Оранжевые снаряды: двигайтесь, чтобы не получить урон.",
    "right": "Голубые снаряды: замрите, чтобы пропустить урон.",
    "evidence": "game"
  },
  {
    "label": "Вопрос для размышления",
    "left": "Какой безопасный шаг можно сделать, не притворяясь, что страх исчез?",
    "right": "Когда разумно уточнить ответ и что можно сделать во время ожидания?",
    "evidence": "interpretation"
  }
],
      differenceParagraphs: [
  "Обсуждение стало напряжённым. Храбрость помогает высказать необходимое опасение даже при волнении. Терпение помогает остановиться, выслушать и выбрать спокойный момент. Быстрая речь не всегда означает храбрость, а ожидание — терпение.",
  "Что нужно сказать и когда это можно сделать безопасно и ясно?"
],
      scenarios: [
  {
    "title": "Что нужно сказать и когда это можно сделать безопасно и ясно?",
    "left": "Какой безопасный шаг можно сделать, не притворяясь, что страх исчез?",
    "right": "Когда разумно уточнить ответ и что можно сделать во время ожидания?"
  }
],
      hybridIntro: "Две близкие оценки могут отражать реакции на разные части одной ситуации. Прочитайте оба определения и отметьте, к какой части решения относится каждое. Правило 3 пунктов не доказывает психологически значимой разницы.",
      strengths: [
  "Нужно высказать опасение. Вы признаёте своё волнение и выбираете небольшой безопасный шаг, например просите поговорить наедине.",
  "Ответ задерживается. Вы выбираете разумное время для уточнения и занимаетесь другой задачей вместо постоянных проверок или раздражения на других."
]
,
      risks: [
  "Это личные ответы на независимо адаптированный тест. Источники из общественного достояния не делают сочетание семи тем валидированным психологическим опросником. Ответы зависят от настроения, опыта и понимания текста. Низкий балл не доказывает отсутствие добродетели, а высокий не оправдывает риск и не позволяет поставить диагноз."
],
      evidenceBody: 'Оранжевая и голубая механики атак в Undertale служат прямым отражением этих качеств.',
      testBody: "Полный результат по семи темам, просмотр ответов и PNG-карточка бесплатны. Учётная запись, оплата и приглашения не нужны.",
    }),
  },
};

export const JUSTICE_VS_KINDNESS: ComparisonSample = {
  slug: 'justice-vs-kindness',
  leftSlug: 'justice',
  rightSlug: 'kindness',
  copy: {
    en: withShared('en', {
      seoTitle: 'Justice vs Kindness: Undertale Soul Traits Compared',
      seoDescription: "Compare Justice and Kindness in Undertale: defending fairness versus reducing harm, with game evidence, difficult scenarios, strengths, and risks.",
      heading: 'Justice vs Kindness',
      intro: "Justice concerns fair treatment and consistent standards; Kindness concerns care that answers someone's actual need.",
      quickAnswer: "Justice concerns fair treatment and consistent standards; Kindness concerns care that answers someone's actual need.",
      leftLabel: 'Justice',
      rightLabel: 'Kindness',
      rows: [
  {
    "label": "What this quiz focuses on",
    "left": "Applying fair standards to different people, with attention to rights, opportunity and shared outcomes. Fairness can require understanding different needs.",
    "right": "Caring, listening and offering useful help within reasonable limits. Being kind does not require taking over another person's choices or neglecting your own needs.",
    "evidence": "interpretation"
  },
  {
    "label": "Undertale evidence",
    "left": "The yellow Ball Game result praises accuracy ending the mayhem.",
    "right": "The green result praises concern and care leading to victory.",
    "evidence": "game"
  },
  {
    "label": "A question for reflection",
    "left": "Would you accept the same standard if it were applied to you or someone you dislike?",
    "right": "What help would answer this person's actual need, and what can you reasonably offer?",
    "evidence": "interpretation"
  }
],
      differenceParagraphs: [
  "A teammate misses a deadline because of illness. Justice asks how to apply a fair standard with the relevant facts. Kindness asks what practical support would help within your limits. Fairness need not ignore needs, and care need not excuse every commitment.",
  "What standard would remain fair for everyone, and what support would help this person?"
],
      scenarios: [
  {
    "title": "What standard would remain fair for everyone, and what support would help this person?",
    "left": "Would you accept the same standard if it were applied to you or someone you dislike?",
    "right": "What help would answer this person's actual need, and what can you reasonably offer?"
  }
],
      hybridIntro: "Two close scores can describe different responses to the same situation. Read both definitions and notice which part of the decision each addresses. The 3-point display rule does not show that a difference is psychologically significant.",
      strengths: [
  "A group divides credit for a project. You check contributions and use a standard you could also accept if you were not the person benefiting.",
  "A friend is struggling. Before offering help, you ask whether they want listening, practical support or some space."
],
      risks: [
  "These are self-reported responses to an independently adapted quiz. Public-domain source material does not make the seven-theme combination a validated psychological inventory. Mood, experience and interpretation can affect answers. A low score does not prove you lack a virtue; a high score cannot justify unsafe behavior or diagnose anyone."
],
      evidenceBody: 'Justice and Kindness are explicitly named in the Ball Game. Yellow refers to accuracy ending mayhem; green refers to concern and care. “Fairness versus reducing harm” is a practical interpretation, not a direct rule stated by the game.',
      testBody: "The complete seven-score result, answer review and PNG card are free, with no account, payment or invitation required.",
    }),
    ja: withShared('ja', {
      seoTitle: 'Undertale せいぎとしんせつの違い',
      seoDescription: "Undertaleのせいぎとしんせつを比較。公平を守り責任を求める力と、不要な害を減らし人を気づかう力の違いを解説。",
      heading: 'せいぎ vs しんせつ',
      intro: "せいぎは公平な対応と一貫した基準、やさしさは相手の本当の必要に合う気遣いです。",
      quickAnswer: "せいぎは公平な対応と一貫した基準、やさしさは相手の本当の必要に合う気遣いです。",
      leftLabel: 'せいぎ',
      rightLabel: 'しんせつ',
      rows: [
  {
    "label": "このテストで見るテーマ",
    "left": "権利、機会、共同の成果に目を向け、相手によらず公平な基準を使うこと。公平さには人ごとの必要を理解することも含まれる。",
    "right": "無理のない範囲で気にかけ、話を聞き、役に立つ助けを提供すること。相手の選択を代わりに決めたり、自分の必要を無視したりする必要はない。",
    "evidence": "interpretation"
  },
  {
    "label": "Undertaleでの根拠",
    "left": "黄の結果は混乱を終わらせた正確さを称える。",
    "right": "緑の結果は勝利につながる気づかいと世話を称える。",
    "evidence": "game"
  },
  {
    "label": "振り返るための問い",
    "left": "その基準が自分や苦手な相手に使われても受け入れられますか。",
    "right": "相手の本当の必要に合う助けは何ですか。無理なく何を提供できますか。",
    "evidence": "interpretation"
  }
],
      differenceParagraphs: [
  "病気でチームの仲間が期限に遅れた。せいぎでは必要な事実を踏まえて公平な基準を考える。やさしさでは無理のない具体的な支援を考える。公平さは必要を無視することではなく、気遣いもすべての約束を免除することではない。",
  "全員に公平な基準は何ですか。この人にはどんな支援が役立ちますか。"
],
      scenarios: [
  {
    "title": "全員に公平な基準は何ですか。この人にはどんな支援が役立ちますか。",
    "left": "その基準が自分や苦手な相手に使われても受け入れられますか。",
    "right": "相手の本当の必要に合う助けは何ですか。無理なく何を提供できますか。"
  }
],
      hybridIntro: "近い2つの得点は、同じ状況の違う部分への反応を示すことがあります。両方の定義を読み、それぞれが判断のどの部分を見るか考えてください。3点という表示基準は心理学的に意味のある差を示しません。",
      strengths: [
  "グループで成果の評価を分ける。各自の貢献を確認し、自分が得をしない立場でも受け入れられる基準を使う。",
  "友人が困っている。助ける前に、話を聞いてほしいのか、具体的な支援がほしいのか、少し一人でいたいのかを聞く。"
],
      risks: [
  "結果は、独自に改編した質問への自己申告の回答です。出典がパブリックドメインでも、7つのテーマの組合せが検証済み心理尺度になるわけではありません。気分、経験、解釈で回答は変わります。低い得点は美徳がない証拠ではなく、高い得点も危険な行動や診断を正当化しません。"
],
      evidenceBody: 'せいぎとしんせつはボールゲームで明示されます。黄は混乱を終える正確さ、緑は気づかいと世話を示します。「公平／害を減らす」は実生活向けの解釈です。',
      testBody: "7つの得点、回答の確認、PNGカードはすべて無料です。アカウント、支払い、招待は不要です。",
    }),
    es: withShared('es', {
      seoTitle: 'Justicia vs Bondad en Undertale',
      seoDescription: "Compara Justicia y Bondad en Undertale: defender la equidad frente a reducir el daño, con evidencia, escenarios, fortalezas y riesgos.",
      heading: 'Justicia vs Bondad',
      intro: "La Justicia trata del trato justo y los criterios coherentes; la Bondad, del cuidado que responde a una necesidad real.",
      quickAnswer: "La Justicia trata del trato justo y los criterios coherentes; la Bondad, del cuidado que responde a una necesidad real.",
      leftLabel: 'Justicia',
      rightLabel: 'Bondad',
      rows: [
  {
    "label": "Qué explora este test",
    "left": "Aplicar criterios justos a personas diferentes, atendiendo a sus derechos, oportunidades y resultados compartidos. La justicia puede requerir entender necesidades distintas.",
    "right": "Preocuparte, escuchar y ofrecer ayuda útil dentro de límites razonables. Ser amable no exige decidir por otra persona ni descuidar tus necesidades.",
    "evidence": "interpretation"
  },
  {
    "label": "Evidencia en Undertale",
    "left": "El resultado amarillo elogia la precisión que termina el caos.",
    "right": "El verde elogia la preocupación y el cuidado que llevan a la victoria.",
    "evidence": "game"
  },
  {
    "label": "Una pregunta para reflexionar",
    "left": "¿Aceptarías el mismo criterio si se aplicara a ti o a alguien que te cae mal?",
    "right": "¿Qué ayuda responde a su necesidad real y qué puedes ofrecer razonablemente?",
    "evidence": "interpretation"
  }
],
      differenceParagraphs: [
  "Un compañero incumple un plazo por enfermedad. La Justicia pregunta cómo aplicar un criterio justo con los hechos relevantes. La Bondad pregunta qué apoyo práctico puedes ofrecer dentro de tus límites. Ser justo no exige ignorar necesidades y cuidar no exige excusar todo compromiso.",
  "¿Qué criterio seguiría siendo justo para todos y qué apoyo ayudaría a esta persona?"
],
      scenarios: [
  {
    "title": "¿Qué criterio seguiría siendo justo para todos y qué apoyo ayudaría a esta persona?",
    "left": "¿Aceptarías el mismo criterio si se aplicara a ti o a alguien que te cae mal?",
    "right": "¿Qué ayuda responde a su necesidad real y qué puedes ofrecer razonablemente?"
  }
],
      hybridIntro: "Dos resultados cercanos pueden describir respuestas a partes distintas de una situación. Lee ambas definiciones y observa qué parte de la decisión trata cada una. La regla de 3 puntos no demuestra una diferencia psicológicamente significativa.",
      strengths: [
  "Un grupo reparte el reconocimiento de un proyecto. Revisas las contribuciones y usas un criterio que aceptarías incluso sin beneficiarte de él.",
  "Un amigo tiene dificultades. Antes de ayudar, preguntas si quiere que lo escuches, apoyo práctico o un poco de espacio."
],
      risks: [
  "Son respuestas personales a un test adaptado de forma independiente. Las fuentes de dominio público no convierten estos siete temas en un instrumento psicológico validado. El ánimo, la experiencia y la interpretación pueden cambiar las respuestas. Una puntuación baja no prueba que te falte una virtud; una alta no justifica riesgos ni permite diagnosticar."
],
      evidenceBody: 'Justicia y Bondad aparecen en el Juego de Pelota. El amarillo habla de precisión que termina el caos; el verde, de preocupación y cuidado. “Equidad frente a reducir daño” es interpretación práctica.',
      testBody: "El resultado completo de siete temas, la revisión de respuestas y la tarjeta PNG son gratuitos, sin cuenta, pago ni invitaciones.",
    }),
    pt: withShared('pt', {
      seoTitle: 'Justiça vs Bondade em Undertale',
      seoDescription: "Compare Justiça e Bondade em Undertale: defender equidade versus reduzir dano, com evidências, cenários, forças e riscos.",
      heading: 'Justiça vs Bondade',
      intro: "A Justiça trata de tratamento justo e critérios coerentes; a Bondade, do cuidado que responde a uma necessidade real.",
      quickAnswer: "A Justiça trata de tratamento justo e critérios coerentes; a Bondade, do cuidado que responde a uma necessidade real.",
      leftLabel: 'Justiça',
      rightLabel: 'Bondade',
      rows: [
  {
    "label": "O que este teste explora",
    "left": "Aplicar critérios justos a pessoas diferentes, considerando direitos, oportunidades e resultados compartilhados. A justiça pode exigir entender necessidades diferentes.",
    "right": "Cuidar, ouvir e oferecer ajuda útil dentro de limites razoáveis. Ser gentil não exige decidir por outra pessoa nem ignorar suas próprias necessidades.",
    "evidence": "interpretation"
  },
  {
    "label": "Evidência em Undertale",
    "left": "O resultado amarelo elogia a precisão que encerra o caos.",
    "right": "O verde elogia preocupação e cuidado que levam à vitória.",
    "evidence": "game"
  },
  {
    "label": "Uma pergunta para refletir",
    "left": "Você aceitaria o mesmo critério se ele fosse aplicado a você ou a alguém de quem não gosta?",
    "right": "Que ajuda atende à necessidade real dessa pessoa e o que você pode oferecer de forma razoável?",
    "evidence": "interpretation"
  }
],
      differenceParagraphs: [
  "Um colega perde um prazo por doença. A Justiça pergunta como aplicar um critério justo com os fatos relevantes. A Bondade pergunta que apoio prático cabe nos seus limites. Ser justo não exige ignorar necessidades, e cuidar não exige desculpar todo compromisso.",
  "Que critério continuaria justo para todos e que apoio ajudaria essa pessoa?"
],
      scenarios: [
  {
    "title": "Que critério continuaria justo para todos e que apoio ajudaria essa pessoa?",
    "left": "Você aceitaria o mesmo critério se ele fosse aplicado a você ou a alguém de quem não gosta?",
    "right": "Que ajuda atende à necessidade real dessa pessoa e o que você pode oferecer de forma razoável?"
  }
],
      hybridIntro: "Dois resultados próximos podem descrever respostas a partes diferentes da mesma situação. Leia as duas definições e veja qual parte da decisão cada uma aborda. A regra de 3 pontos não demonstra uma diferença psicologicamente significativa.",
      strengths: [
  "Um grupo divide o reconhecimento de um projeto. Você verifica as contribuições e usa um critério que aceitaria mesmo sem se beneficiar dele.",
  "Um amigo está com dificuldades. Antes de ajudar, você pergunta se ele quer ser ouvido, apoio prático ou um pouco de espaço."
],
      risks: [
  "São respostas pessoais a um teste adaptado de forma independente. Fontes de domínio público não transformam os sete temas em um instrumento psicológico validado. Humor, experiência e interpretação podem afetar as respostas. Uma pontuação baixa não prova falta de uma virtude; uma alta não justifica riscos nem permite diagnosticar."
],
      evidenceBody: 'Justiça e Bondade aparecem no Jogo da Bola. O amarelo fala de precisão encerrando o caos; o verde, de preocupação e cuidado. “Equidade versus reduzir dano” é interpretação prática.',
      testBody: "O resultado completo dos sete temas, a revisão de respostas e o cartão PNG são gratuitos, sem conta, pagamento ou convites.",
    }),
    ru: withShared('ru', {
      seoTitle: 'Справедливость против Доброты в Undertale - Сравнение черт души',
      seoDescription: "Сравнение Справедливости и Доброты в Undertale: беспристрастный закон против милосердия и прощения, лор и практические примеры.",
      heading: 'Справедливость против Доброты',
      intro: "Справедливость относится к справедливому отношению и последовательным критериям; Доброта — к заботе, отвечающей реальной потребности.",
      quickAnswer: "Справедливость относится к справедливому отношению и последовательным критериям; Доброта — к заботе, отвечающей реальной потребности.",
      leftLabel: 'Справедливость',
      rightLabel: 'Доброта',
      rows: [
  {
    "label": "На чём сосредоточен тест",
    "left": "Применение справедливых критериев к разным людям с учётом прав, возможностей и общих результатов. Справедливость может требовать понимания разных потребностей.",
    "right": "Забота, умение слушать и полезная помощь в разумных пределах. Доброта не требует решать за другого человека или пренебрегать своими потребностями.",
    "evidence": "interpretation"
  },
  {
    "label": "Снаряжение Undertale",
    "left": "Пустой пистолет и ковбойская шляпа (оружие возмездия).",
    "right": "Сковорода и фартук (предметы заботы и питания).",
    "evidence": "game"
  },
  {
    "label": "Вопрос для размышления",
    "left": "Вы приняли бы тот же критерий, если бы он применялся к вам или к неприятному вам человеку?",
    "right": "Какая помощь отвечает реальной потребности человека и что вы можете разумно предложить?",
    "evidence": "interpretation"
  }
],
      differenceParagraphs: [
  "Коллега пропустил срок из-за болезни. Справедливость ставит вопрос о критерии с учётом нужных фактов. Доброта — о посильной практической помощи. Справедливость не требует игнорировать потребности, а забота — оправдывать любое невыполнение обязательства.",
  "Какой критерий останется справедливым для всех и какая поддержка поможет этому человеку?"
],
      scenarios: [
  {
    "title": "Какой критерий останется справедливым для всех и какая поддержка поможет этому человеку?",
    "left": "Вы приняли бы тот же критерий, если бы он применялся к вам или к неприятному вам человеку?",
    "right": "Какая помощь отвечает реальной потребности человека и что вы можете разумно предложить?"
  }
],
      hybridIntro: "Две близкие оценки могут отражать реакции на разные части одной ситуации. Прочитайте оба определения и отметьте, к какой части решения относится каждое. Правило 3 пунктов не доказывает психологически значимой разницы.",
      strengths: [
  "Группа распределяет признание за проект. Вы проверяете вклад каждого и применяете критерий, с которым согласились бы и без личной выгоды.",
  "У друга трудности. Прежде чем помогать, вы спрашиваете, хочет ли он, чтобы его выслушали, нужна ли практическая помощь или время наедине."
],
      risks: [
  "Это личные ответы на независимо адаптированный тест. Источники из общественного достояния не делают сочетание семи тем валидированным психологическим опросником. Ответы зависят от настроения, опыта и понимания текста. Низкий балл не доказывает отсутствие добродетели, а высокий не оправдывает риск и не позволяет поставить диагноз."
],
      evidenceBody: 'Жёлтая душа правосудия и зелёная душа доброты символизируют две грани морального выбора в Undertale.',
      testBody: "Полный результат по семи темам, просмотр ответов и PNG-карточка бесплатны. Учётная запись, оплата и приглашения не нужны.",
    }),
  },
};

export const SOUL_COMPARISONS: ComparisonSample[] = [
  BRAVERY_VS_DETERMINATION,
  DETERMINATION_VS_PERSEVERANCE,
  INTEGRITY_VS_JUSTICE,
  KINDNESS_VS_PATIENCE,
  BRAVERY_VS_PATIENCE,
  JUSTICE_VS_KINDNESS,
];

export function getComparisonsForSoul(slug: string): ComparisonSample[] {
  return SOUL_COMPARISONS.filter(({ leftSlug, rightSlug }) => leftSlug === slug || rightSlug === slug);
}
