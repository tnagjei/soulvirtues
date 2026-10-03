// input: None (approved determination-versus-perseverance V2 comparison copy in five locales)
// output: Localized pilot comparison data and shared comparison types
// pos: src/data/soulComparisonSample.ts (更新规则：文案或证据边界变化需同步本注释与 src/data/README.md)

import type { Locale } from '../i18n';

export interface ComparisonRow {
  label: string;
  left: string;
  right: string;
  evidence: 'game' | 'interpretation';
}

export interface ComparisonScenario {
  title: string;
  left: string;
  right: string;
}

export interface ComparisonCopy {
  seoTitle: string;
  seoDescription: string;
  eyebrow: string;
  heading: string;
  intro: string;
  quickAnswerLabel: string;
  quickAnswer: string;
  matrixTitle: string;
  leftLabel: string;
  rightLabel: string;
  gameEvidenceLabel: string;
  interpretationLabel: string;
  rows: ComparisonRow[];
  differenceTitle: string;
  differenceParagraphs: string[];
  scenariosTitle: string;
  scenarios: ComparisonScenario[];
  hybridTitle: string;
  hybridIntro: string;
  strengthsTitle: string;
  strengths: string[];
  risksTitle: string;
  risks: string[];
  evidenceTitle: string;
  evidenceBody: string;
  testTitle: string;
  testBody: string;
  testButton: string;
  exploreLabel: string;
  breadcrumbCompare: string;
}

export interface ComparisonSample {
  slug: string;
  leftSlug: string;
  rightSlug: string;
  copy: Record<Locale, ComparisonCopy>;
}

export const DETERMINATION_VS_PERSEVERANCE: ComparisonSample = {
  slug: 'determination-vs-perseverance',
  leftSlug: 'determination',
  rightSlug: 'perseverance',
  copy: {
    en: {
      seoTitle: 'Determination vs Perseverance: Undertale Soul Traits',
      seoDescription: "Compare Determination and Perseverance in Undertale: desired outcomes vs steady routines, game evidence, real-life examples, and a dual-trait profile.",
      eyebrow: 'SOUL TRAIT COMPARISON',
      heading: 'Determination vs Perseverance',
      intro: "Determination concerns the goal you choose and reconsider; Perseverance concerns useful effort while carrying out the work.",
      quickAnswerLabel: 'QUICK ANSWER',
      quickAnswer: "Determination concerns the goal you choose and reconsider; Perseverance concerns useful effort while carrying out the work.",
      matrixTitle: 'The Core Difference',
      leftLabel: 'Determination',
      rightLabel: 'Perseverance',
      gameEvidenceLabel: 'Game evidence',
      interpretationLabel: 'Interpretation',
      rows: [
  {
    "label": "What this quiz focuses on",
    "left": "Choosing a goal that matters to you, then deciding how to recommit after a setback. Changing direction after thoughtful review can fit this theme.",
    "right": "Continuing useful effort during execution, managing distractions and trying to finish work. A productive routine also makes room for rest and changes based on feedback.",
    "evidence": "interpretation"
  },
  {
    "label": "Undertale evidence",
    "left": "Determination is directly tied to human persistence, SAVE, and the ability to continue after death.",
    "right": "Perseverance is named by the Snowdin Ball Game, whose purple result emphasizes continuing and taking notes.",
    "evidence": "game"
  },
  {
    "label": "A question for reflection",
    "left": "What still makes this goal worth pursuing, and what evidence would make you change it?",
    "right": "What small practice step can you repeat, and how will you tell whether it is working?",
    "evidence": "interpretation"
  }
],
      differenceTitle: 'Why These Traits Are Easy to Confuse',
      differenceParagraphs: [
  "Your first study plan fails. Determination asks whether the qualification still serves a goal you value and what direction to choose next. Perseverance asks how to practice regularly, use feedback and complete the next useful task.",
  "Are you deciding what is worth pursuing, or how to keep doing the work?"
],
      scenariosTitle: "A question for reflection",
      scenarios: [
  {
    "title": "Are you deciding what is worth pursuing, or how to keep doing the work?",
    "left": "What still makes this goal worth pursuing, and what evidence would make you change it?",
    "right": "What small practice step can you repeat, and how will you tell whether it is working?"
  }
],
      hybridTitle: 'If Both Scores Are High',
      hybridIntro: "Two close scores can describe different responses to the same situation. Read both definitions and notice which part of the decision each addresses. The 3-point display rule does not show that a difference is psychologically significant.",
      strengthsTitle: "One everyday example",
      strengths: [
  "A study plan fails. You reconsider why the qualification matters and choose a next step, rather than keeping the same target just to avoid admitting failure.",
  "You keep making an error while learning. You plan a short practice session, record one change to try and check whether the change helps."
],
      risksTitle: "What this quiz can and cannot tell you",
      risks: [
  "These are self-reported responses to an independently adapted quiz. Public-domain source material does not make the seven-theme combination a validated psychological inventory. Mood, experience and interpretation can affect answers. A low score does not prove you lack a virtue; a high score cannot justify unsafe behavior or diagnose anyone."
],
      evidenceTitle: 'Canon and Community Interpretation',
      evidenceBody: 'The game does not explicitly name the red SOUL trait Determination. Determination itself is canonically established as a power or substance produced by human SOULs, while Perseverance is one of the six traits named by the Snowdin Ball Game. This page uses the common community label “Red SOUL / Determination” for search clarity, but it does not present that label as confirmed canon.',
      testTitle: 'Which Pattern Drives You?',
      testBody: "The complete seven-score result, answer review and PNG card are free, with no account, payment or invitation required.",
      testButton: 'TAKE THE UNDERTALE SOUL TEST (66 QUESTIONS)',
      exploreLabel: 'Read the complete trait guide',
      breadcrumbCompare: 'Comparisons',
    },
    ja: {
      seoTitle: 'Undertale ケツイとふくつの違い',
      seoDescription: "Undertaleのケツイとふくつを比較。望む結末を諦めない力と、習慣や方法を続ける力の違い、ゲーム内根拠、複合タイプを解説。",
      eyebrow: 'ソウル特質比較',
      heading: 'ケツイ vs ふくつ',
      intro: "ケツイは選び直す目標、こんきは仕事を進める中での有用な努力に目を向けます。",
      quickAnswerLabel: 'ひとことで言うと',
      quickAnswer: "ケツイは選び直す目標、こんきは仕事を進める中での有用な努力に目を向けます。",
      matrixTitle: '本質的な違い',
      leftLabel: 'ケツイ',
      rightLabel: 'ふくつ',
      gameEvidenceLabel: 'ゲーム内根拠',
      interpretationLabel: 'サイト独自の解釈',
      rows: [
  {
    "label": "このテストで見るテーマ",
    "left": "自分にとって大切な目標を選び、つまずいた後にどう取り組み直すか判断すること。十分に考えた上で方向を変えることも、このテーマに含まれる。",
    "right": "実行の途中でも有用な努力を続け、注意のそれを抑え、仕事の完成を目指すこと。役立つ習慣には休息やフィードバックに応じた変更も必要。",
    "evidence": "interpretation"
  },
  {
    "label": "Undertaleでの根拠",
    "left": "ケツイは人間の持続、SAVE、死後も続ける力と直接結びつく。",
    "right": "ふくつはスノーフルのボールゲームで明示され、紫の結果は継続と記録を強調する。",
    "evidence": "game"
  },
  {
    "label": "振り返るための問い",
    "left": "その目標を今も追う理由は何ですか。どんな事実があれば目標を変えますか。",
    "right": "繰り返せる小さな練習は何ですか。効果があるかどう確認しますか。",
    "evidence": "interpretation"
  }
],
      differenceTitle: 'なぜ混同しやすいのか',
      differenceParagraphs: [
  "最初の勉強計画が失敗した。ケツイでは、その資格が今も大切な目標につながるか、次にどの方向を選ぶかを考える。こんきでは、定期的に練習し、助言を生かし、次の有用な作業を完成させる方法を考える。",
  "今考えているのは追う価値のある目標ですか。それとも作業を続ける方法ですか。"
],
      scenariosTitle: "振り返るための問い",
      scenarios: [
  {
    "title": "今考えているのは追う価値のある目標ですか。それとも作業を続ける方法ですか。",
    "left": "その目標を今も追う理由は何ですか。どんな事実があれば目標を変えますか。",
    "right": "繰り返せる小さな練習は何ですか。効果があるかどう確認しますか。"
  }
],
      hybridTitle: '両方のスコアが高い場合',
      hybridIntro: "近い2つの得点は、同じ状況の違う部分への反応を示すことがあります。両方の定義を読み、それぞれが判断のどの部分を見るか考えてください。3点という表示基準は心理学的に意味のある差を示しません。",
      strengthsTitle: "日常の例",
      strengths: [
  "勉強の計画がうまくいかなかった。失敗を認めたくないから同じ目標にこだわるのではなく、その資格を目指す理由を見直して次の一歩を選ぶ。",
  "学習中に同じ間違いを繰り返す。短い練習時間を決め、試す変更を一つ記録し、その変更が役立つか確かめる。"
],
      risksTitle: "このテストの限界",
      risks: [
  "結果は、独自に改編した質問への自己申告の回答です。出典がパブリックドメインでも、7つのテーマの組合せが検証済み心理尺度になるわけではありません。気分、経験、解釈で回答は変わります。低い得点は美徳がない証拠ではなく、高い得点も危険な行動や診断を正当化しません。"
],
      evidenceTitle: '公式設定とコミュニティ解釈',
      evidenceBody: 'ゲームは赤いソウルの特質を「ケツイ」と明言していません。ケツイは人間のソウルが生み出す力・物質として公式に描かれ、ふくつはスノーフルのボールゲームで示される6特質の一つです。このページは検索上分かりやすい一般的な「赤いソウル／ケツイ」という呼び方を使いますが、公式確定設定としては扱いません。',
      testTitle: 'あなたを動かすのはどちら？',
      testBody: "7つの得点、回答の確認、PNGカードはすべて無料です。アカウント、支払い、招待は不要です。",
      testButton: 'Undertale ソウル診断テストを受ける (全66問)',
      exploreLabel: '特質の完全ガイドを見る',
      breadcrumbCompare: '比較',
    },
    es: {
      seoTitle: 'Determinación vs Perseverancia en Undertale',
      seoDescription: "Compara Determinación y Perseverancia en Undertale: resultado deseado frente a rutina constante, evidencia del juego, ejemplos y perfil combinado.",
      eyebrow: 'COMPARACIÓN DE RASGOS DEL ALMA',
      heading: 'Determinación vs Perseverancia',
      intro: "La Determinación trata del objetivo que eliges y reconsideras; la Perseverancia, del esfuerzo útil al realizar el trabajo.",
      quickAnswerLabel: 'RESPUESTA RÁPIDA',
      quickAnswer: "La Determinación trata del objetivo que eliges y reconsideras; la Perseverancia, del esfuerzo útil al realizar el trabajo.",
      matrixTitle: 'La Diferencia Central',
      leftLabel: 'Determinación',
      rightLabel: 'Perseverancia',
      gameEvidenceLabel: 'Evidencia del juego',
      interpretationLabel: 'Interpretación',
      rows: [
  {
    "label": "Qué explora este test",
    "left": "Elegir un objetivo que te importe y decidir cómo volver a comprometerte tras un revés. Cambiar de rumbo después de reflexionar también encaja en este tema.",
    "right": "Mantener un esfuerzo útil durante la ejecución, gestionar distracciones e intentar terminar el trabajo. Una rutina productiva también permite descansar y cambiar según la experiencia.",
    "evidence": "interpretation"
  },
  {
    "label": "Evidencia en Undertale",
    "left": "La Determinación se vincula directamente con la persistencia humana, SAVE y continuar después de la muerte.",
    "right": "La Perseverancia aparece en el Juego de Pelota de Snowdin; el resultado morado destaca continuar y tomar notas.",
    "evidence": "game"
  },
  {
    "label": "Una pregunta para reflexionar",
    "left": "¿Qué hace que este objetivo siga mereciendo la pena y qué prueba te haría cambiarlo?",
    "right": "¿Qué pequeño paso puedes repetir y cómo sabrás si está funcionando?",
    "evidence": "interpretation"
  }
],
      differenceTitle: 'Por Qué Se Confunden',
      differenceParagraphs: [
  "Tu primer plan de estudio falla. La Determinación pregunta si la titulación sigue sirviendo a algo que valoras y qué rumbo elegir. La Perseverancia pregunta cómo practicar con regularidad, usar lo aprendido y completar la siguiente tarea útil.",
  "¿Estás decidiendo qué merece la pena perseguir o cómo seguir haciendo el trabajo?"
],
      scenariosTitle: "Una pregunta para reflexionar",
      scenarios: [
  {
    "title": "¿Estás decidiendo qué merece la pena perseguir o cómo seguir haciendo el trabajo?",
    "left": "¿Qué hace que este objetivo siga mereciendo la pena y qué prueba te haría cambiarlo?",
    "right": "¿Qué pequeño paso puedes repetir y cómo sabrás si está funcionando?"
  }
],
      hybridTitle: 'Si Ambas Puntuaciones Son Altas',
      hybridIntro: "Dos resultados cercanos pueden describir respuestas a partes distintas de una situación. Lee ambas definiciones y observa qué parte de la decisión trata cada una. La regla de 3 puntos no demuestra una diferencia psicológicamente significativa.",
      strengthsTitle: "Un ejemplo cotidiano",
      strengths: [
  "Falla un plan de estudio. Revisas por qué te importa la titulación y eliges un siguiente paso, en lugar de mantener el objetivo solo para no admitir el fracaso.",
  "Repites un error mientras aprendes. Planificas una práctica breve, anotas un cambio y compruebas si ayuda."
],
      risksTitle: "Qué puede decir este test",
      risks: [
  "Son respuestas personales a un test adaptado de forma independiente. Las fuentes de dominio público no convierten estos siete temas en un instrumento psicológico validado. El ánimo, la experiencia y la interpretación pueden cambiar las respuestas. Una puntuación baja no prueba que te falte una virtud; una alta no justifica riesgos ni permite diagnosticar."
],
      evidenceTitle: 'Canon e Interpretación de la Comunidad',
      evidenceBody: 'El juego no nombra explícitamente Determinación al rasgo del Alma Roja. La Determinación sí está establecida como poder o sustancia producida por las almas humanas, mientras que Perseverancia es uno de los seis rasgos nombrados por el Juego de Pelota de Snowdin. Esta página usa la etiqueta comunitaria “Alma Roja / Determinación” para facilitar la búsqueda, sin presentarla como canon confirmado.',
      testTitle: '¿Qué Patrón Te Impulsa?',
      testBody: "El resultado completo de siete temas, la revisión de respuestas y la tarjeta PNG son gratuitos, sin cuenta, pago ni invitaciones.",
      testButton: 'HACER EL TEST DE ALMAS DE UNDERTALE',
      exploreLabel: 'Leer la guía completa del rasgo',
      breadcrumbCompare: 'Comparaciones',
    },
    pt: {
      seoTitle: 'Determinação vs Perseverança em Undertale',
      seoDescription: "Compare Determinação e Perseverança em Undertale: resultado desejado versus rotina constante, evidências do jogo, exemplos e perfil combinado.",
      eyebrow: 'COMPARAÇÃO DE TRAÇOS DA ALMA',
      heading: 'Determinação vs Perseverança',
      intro: "A Determinação trata do objetivo que você escolhe e reconsidera; a Perseverança, do esforço útil para realizar o trabalho.",
      quickAnswerLabel: 'RESPOSTA RÁPIDA',
      quickAnswer: "A Determinação trata do objetivo que você escolhe e reconsidera; a Perseverança, do esforço útil para realizar o trabalho.",
      matrixTitle: 'A Diferença Central',
      leftLabel: 'Determinação',
      rightLabel: 'Perseverança',
      gameEvidenceLabel: 'Evidência do jogo',
      interpretationLabel: 'Interpretação',
      rows: [
  {
    "label": "O que este teste explora",
    "left": "Escolher um objetivo importante para você e decidir como voltar a se comprometer depois de um revés. Mudar de rumo após uma reflexão também combina com esse tema.",
    "right": "Manter um esforço útil durante a execução, lidar com distrações e tentar terminar o trabalho. Uma rotina produtiva também permite descanso e mudanças com base no aprendizado.",
    "evidence": "interpretation"
  },
  {
    "label": "Evidência em Undertale",
    "left": "A Determinação se liga diretamente à persistência humana, SAVE e continuar após a morte.",
    "right": "A Perseverança aparece no Jogo da Bola de Snowdin; o resultado roxo destaca continuar e fazer anotações.",
    "evidence": "game"
  },
  {
    "label": "Uma pergunta para refletir",
    "left": "O que ainda faz esse objetivo valer a pena e que evidência faria você mudá-lo?",
    "right": "Que pequeno passo você pode repetir e como vai saber se está funcionando?",
    "evidence": "interpretation"
  }
],
      differenceTitle: 'Por Que Esses Traços se Confundem',
      differenceParagraphs: [
  "Seu primeiro plano de estudo falha. A Determinação pergunta se a qualificação ainda serve a algo que você valoriza e qual rumo escolher. A Perseverança pergunta como praticar com regularidade, usar o aprendizado e concluir a próxima tarefa útil.",
  "Você está decidindo o que vale a pena buscar ou como continuar fazendo o trabalho?"
],
      scenariosTitle: "Uma pergunta para refletir",
      scenarios: [
  {
    "title": "Você está decidindo o que vale a pena buscar ou como continuar fazendo o trabalho?",
    "left": "O que ainda faz esse objetivo valer a pena e que evidência faria você mudá-lo?",
    "right": "Que pequeno passo você pode repetir e como vai saber se está funcionando?"
  }
],
      hybridTitle: 'Se as Duas Pontuações Forem Altas',
      hybridIntro: "Dois resultados próximos podem descrever respostas a partes diferentes da mesma situação. Leia as duas definições e veja qual parte da decisão cada uma aborda. A regra de 3 pontos não demonstra uma diferença psicologicamente significativa.",
      strengthsTitle: "Um exemplo cotidiano",
      strengths: [
  "Um plano de estudo falha. Você revê por que a qualificação importa e escolhe um próximo passo, em vez de manter o objetivo só para não admitir o fracasso.",
  "Você repete um erro enquanto aprende. Planeja uma prática curta, registra uma mudança e verifica se ela ajuda."
],
      risksTitle: "O que este teste pode dizer",
      risks: [
  "São respostas pessoais a um teste adaptado de forma independente. Fontes de domínio público não transformam os sete temas em um instrumento psicológico validado. Humor, experiência e interpretação podem afetar as respostas. Uma pontuação baixa não prova falta de uma virtude; uma alta não justifica riscos nem permite diagnosticar."
],
      evidenceTitle: 'Cânone e Interpretação da Comunidade',
      evidenceBody: 'O jogo não nomeia explicitamente Determinação como o traço da Alma Vermelha. A Determinação é estabelecida como poder ou substância produzida pelas almas humanas, enquanto Perseverança é um dos seis traços citados no Jogo da Bola de Snowdin. Esta página usa o rótulo comunitário “Alma Vermelha / Determinação” para facilitar a busca, sem apresentá-lo como cânone confirmado.',
      testTitle: 'Qual Padrão Move Você?',
      testBody: "O resultado completo dos sete temas, a revisão de respostas e o cartão PNG são gratuitos, sem conta, pagamento ou convites.",
      testButton: 'FAZER O TESTE DAS ALMAS DE UNDERTALE',
      exploreLabel: 'Ler o guia completo do traço',
      breadcrumbCompare: 'Comparações',
    },
    ru: {
      seoTitle: 'Решимость против Настойчивости в Undertale - Сравнение душ',
      seoDescription: "Сравнение Решимости и Настойчивости в Undertale: отказ от поражения против дисциплины и привычки, игровые факты и комбинированный профиль.",
      eyebrow: 'СРАВНЕНИЕ ЧЕРТ ДУШИ',
      heading: 'Решимость против Настойчивости',
      intro: "Решимость относится к выбору и пересмотру цели; Настойчивость — к полезным усилиям при выполнении работы.",
      quickAnswerLabel: 'КРАТКИЙ ОТВЕТ',
      quickAnswer: "Решимость относится к выбору и пересмотру цели; Настойчивость — к полезным усилиям при выполнении работы.",
      matrixTitle: 'Ключевое различие',
      leftLabel: 'Решимость',
      rightLabel: 'Настойчивость',
      gameEvidenceLabel: 'Игровые факты',
      interpretationLabel: 'Интерпретация',
      rows: [
  {
    "label": "На чём сосредоточен тест",
    "left": "Выбор важной для вас цели и решение о том, как снова к ней обратиться после неудачи. Обдуманная смена направления тоже соответствует этой теме.",
    "right": "Продолжение полезной работы, управление отвлечениями и стремление завершить задачу. Продуктивный распорядок также предусматривает отдых и изменения с учётом обратной связи.",
    "evidence": "interpretation"
  },
  {
    "label": "Факты в Undertale",
    "left": "Решимость связана со способностью сохраняться (SAVE) и жить после смерти.",
    "right": "Настойчивость описана в гольфе Сноудина: фиолетовый результат подчёркивает упорство и конспекты.",
    "evidence": "game"
  },
  {
    "label": "Вопрос для размышления",
    "left": "Почему эта цель всё ещё стоит усилий и какие факты могли бы заставить вас её изменить?",
    "right": "Какой небольшой шаг можно повторять и как понять, что он работает?",
    "evidence": "interpretation"
  }
],
      differenceTitle: 'Почему эти черты легко спутать',
      differenceParagraphs: [
  "Первый план учёбы не сработал. Решимость ставит вопрос, служит ли квалификация тому, что вам важно, и какое направление выбрать. Настойчивость ставит вопрос о регулярной практике, использовании обратной связи и завершении следующей полезной задачи.",
  "Вы решаете, к чему стоит стремиться, или как продолжать работу?"
],
      scenariosTitle: "Вопрос для размышления",
      scenarios: [
  {
    "title": "Вы решаете, к чему стоит стремиться, или как продолжать работу?",
    "left": "Почему эта цель всё ещё стоит усилий и какие факты могли бы заставить вас её изменить?",
    "right": "Какой небольшой шаг можно повторять и как понять, что он работает?"
  }
],
      hybridTitle: 'Если обе шкалы высоки',
      hybridIntro: "Две близкие оценки могут отражать реакции на разные части одной ситуации. Прочитайте оба определения и отметьте, к какой части решения относится каждое. Правило 3 пунктов не доказывает психологически значимой разницы.",
      strengthsTitle: "Повседневный пример",
      strengths: [
  "План подготовки не сработал. Вы заново оцениваете, зачем вам квалификация, и выбираете следующий шаг вместо сохранения цели лишь ради нежелания признать неудачу.",
  "При обучении вы повторяете ошибку. Планируете короткую практику, записываете одно изменение и проверяете, помогает ли оно."
],
      risksTitle: "Что может сказать этот тест",
      risks: [
  "Это личные ответы на независимо адаптированный тест. Источники из общественного достояния не делают сочетание семи тем валидированным психологическим опросником. Ответы зависят от настроения, опыта и понимания текста. Низкий балл не доказывает отсутствие добродетели, а высокий не оправдывает риск и не позволяет поставить диагноз."
],
      evidenceTitle: 'Канон и фанатская интерпретация',
      evidenceBody: 'В оригинальной игре Undertale черта Красной Души прямо не названа Решимостью. Решимость описана как субстанция и сила человеческих душ. Название «Красная Душа / Решимость» используется как общепринятый ориентир сообщества.',
      testTitle: 'Какая черта движет вами?',
      testBody: "Полный результат по семи темам, просмотр ответов и PNG-карточка бесплатны. Учётная запись, оплата и приглашения не нужны.",
      testButton: 'ПРОЙТИ ТЕСТ ДУШИ UNDERTALE',
      exploreLabel: 'Читать полный гид по черте души',
      breadcrumbCompare: 'Сравнения',
    },
  },
};
