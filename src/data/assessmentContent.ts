// input: Five-language assessment definitions, method copy and GSC-supported FAQ scope clarifications
// output: Source-based V2 reading content reused by the quiz, method and detail pages
// pos: src/data/assessmentContent.ts (更新规则：定义或计分说明变化需同步题库、公开页面与所属目录 README)

import type { Locale } from '../i18n/types';
import type { SoulCode } from './souls';

interface TraitReading { focus: string; scenario: string; prompt: string; }

export const TRAIT_READING: Record<Locale, Record<SoulCode, TraitReading>> = {
  "en": {
    "DET": {
      "focus": "Choosing a goal that matters to you, then deciding how to recommit after a setback. Changing direction after thoughtful review can fit this theme.",
      "scenario": "A study plan fails. You reconsider why the qualification matters and choose a next step, rather than keeping the same target just to avoid admitting failure.",
      "prompt": "What still makes this goal worth pursuing, and what evidence would make you change it?"
    },
    "BRV": {
      "focus": "Expressing or acting despite fear or social pressure when doing so is reasonably safe. The score does not reward danger or require an outgoing personality.",
      "scenario": "You need to raise a concern. You choose a small safe action, such as asking for a private conversation, while acknowledging that you feel nervous.",
      "prompt": "What is one safe action you could take without pretending the fear is gone?"
    },
    "JUS": {
      "focus": "Applying fair standards to different people, with attention to rights, opportunity and shared outcomes. Fairness can require understanding different needs.",
      "scenario": "A group divides credit for a project. You check contributions and use a standard you could also accept if you were not the person benefiting.",
      "prompt": "Would you accept the same standard if it were applied to you or someone you dislike?"
    },
    "KND": {
      "focus": "Caring, listening and offering useful help within reasonable limits. Being kind does not require taking over another person's choices or neglecting your own needs.",
      "scenario": "A friend is struggling. Before offering help, you ask whether they want listening, practical support or some space.",
      "prompt": "What help would answer this person's actual need, and what can you reasonably offer?"
    },
    "PAT": {
      "focus": "How you respond to waiting, minor frustration and annoyance. This theme includes pausing and calming down; it does not ask you to tolerate harm or indefinite delay.",
      "scenario": "A reply is late. You choose a reasonable time to follow up and turn to another task instead of repeatedly checking or taking frustration out on someone.",
      "prompt": "When is a reasonable follow-up time, and what can you do while waiting?"
    },
    "INT": {
      "focus": "Honesty, confidentiality and keeping commitments, including admitting mistakes. A score does not establish a person's moral worth or make their beliefs automatically right.",
      "scenario": "You have made a promise you can no longer keep. You explain the problem promptly and discuss a new commitment rather than hiding it.",
      "prompt": "What is the honest next sentence, and which commitment can you actually keep?"
    },
    "PER": {
      "focus": "Continuing useful effort during execution, managing distractions and trying to finish work. A productive routine also makes room for rest and changes based on feedback.",
      "scenario": "You keep making an error while learning. You plan a short practice session, record one change to try and check whether the change helps.",
      "prompt": "What small practice step can you repeat, and how will you tell whether it is working?"
    }
  },
  "ja": {
    "DET": {
      "focus": "自分にとって大切な目標を選び、つまずいた後にどう取り組み直すか判断すること。十分に考えた上で方向を変えることも、このテーマに含まれる。",
      "scenario": "勉強の計画がうまくいかなかった。失敗を認めたくないから同じ目標にこだわるのではなく、その資格を目指す理由を見直して次の一歩を選ぶ。",
      "prompt": "その目標を今も追う理由は何ですか。どんな事実があれば目標を変えますか。"
    },
    "BRV": {
      "focus": "無理のない安全を保ちつつ、怖さや周囲からの圧力があっても伝えたり行動したりすること。危険を求めることや外向的な性格は条件ではない。",
      "scenario": "気になる問題を伝えたい。緊張を認めながら、個別に話す時間を頼むなど、小さく安全な行動を選ぶ。",
      "prompt": "怖さが消えたふりをせずにできる、安全な一歩は何ですか。"
    },
    "JUS": {
      "focus": "権利、機会、共同の成果に目を向け、相手によらず公平な基準を使うこと。公平さには人ごとの必要を理解することも含まれる。",
      "scenario": "グループで成果の評価を分ける。各自の貢献を確認し、自分が得をしない立場でも受け入れられる基準を使う。",
      "prompt": "その基準が自分や苦手な相手に使われても受け入れられますか。"
    },
    "KND": {
      "focus": "無理のない範囲で気にかけ、話を聞き、役に立つ助けを提供すること。相手の選択を代わりに決めたり、自分の必要を無視したりする必要はない。",
      "scenario": "友人が困っている。助ける前に、話を聞いてほしいのか、具体的な支援がほしいのか、少し一人でいたいのかを聞く。",
      "prompt": "相手の本当の必要に合う助けは何ですか。無理なく何を提供できますか。"
    },
    "PAT": {
      "focus": "待ち時間、小さなつまずき、いらだちにどう対応するか。このテーマには一呼吸置いて落ち着くことが含まれるが、害や終わりのない遅れを我慢する必要はない。",
      "scenario": "返事が遅れている。適切に確認する時刻を決め、何度も確認したり誰かにいらだちをぶつけたりする代わりに、別の作業に取り組む。",
      "prompt": "いつ確認するのが適切ですか。待つ間に何ができますか。"
    },
    "INT": {
      "focus": "正直さ、秘密を守ること、約束を守ること、間違いを認めること。得点は人の道徳的な価値や信念の正しさを決めない。",
      "scenario": "守れない約束をしてしまった。隠すのではなく、問題を早めに説明して、守れる新しい約束を相談する。",
      "prompt": "次に伝える正直な一言は何ですか。実際に守れる約束はどれですか。"
    },
    "PER": {
      "focus": "実行の途中でも有用な努力を続け、注意のそれを抑え、仕事の完成を目指すこと。役立つ習慣には休息やフィードバックに応じた変更も必要。",
      "scenario": "学習中に同じ間違いを繰り返す。短い練習時間を決め、試す変更を一つ記録し、その変更が役立つか確かめる。",
      "prompt": "繰り返せる小さな練習は何ですか。効果があるかどう確認しますか。"
    }
  },
  "es": {
    "DET": {
      "focus": "Elegir un objetivo que te importe y decidir cómo volver a comprometerte tras un revés. Cambiar de rumbo después de reflexionar también encaja en este tema.",
      "scenario": "Falla un plan de estudio. Revisas por qué te importa la titulación y eliges un siguiente paso, en lugar de mantener el objetivo solo para no admitir el fracaso.",
      "prompt": "¿Qué hace que este objetivo siga mereciendo la pena y qué prueba te haría cambiarlo?"
    },
    "BRV": {
      "focus": "Expresarte o actuar pese al miedo o la presión social cuando hacerlo es razonablemente seguro. La puntuación no premia el peligro ni exige ser extrovertido.",
      "scenario": "Necesitas plantear una preocupación. Reconoces tus nervios y eliges una acción pequeña y segura, como pedir una conversación privada.",
      "prompt": "¿Qué acción segura puedes dar sin fingir que el miedo ha desaparecido?"
    },
    "JUS": {
      "focus": "Aplicar criterios justos a personas diferentes, atendiendo a sus derechos, oportunidades y resultados compartidos. La justicia puede requerir entender necesidades distintas.",
      "scenario": "Un grupo reparte el reconocimiento de un proyecto. Revisas las contribuciones y usas un criterio que aceptarías incluso sin beneficiarte de él.",
      "prompt": "¿Aceptarías el mismo criterio si se aplicara a ti o a alguien que te cae mal?"
    },
    "KND": {
      "focus": "Preocuparte, escuchar y ofrecer ayuda útil dentro de límites razonables. Ser amable no exige decidir por otra persona ni descuidar tus necesidades.",
      "scenario": "Un amigo tiene dificultades. Antes de ayudar, preguntas si quiere que lo escuches, apoyo práctico o un poco de espacio.",
      "prompt": "¿Qué ayuda responde a su necesidad real y qué puedes ofrecer razonablemente?"
    },
    "PAT": {
      "focus": "Cómo respondes a la espera, la frustración leve y la irritación. Incluye hacer una pausa y calmarte; no exige tolerar daño ni retrasos indefinidos.",
      "scenario": "Una respuesta tarda. Eliges un momento razonable para preguntar y haces otra tarea, en vez de revisar sin parar o descargar la frustración en alguien.",
      "prompt": "¿Cuándo sería razonable preguntar de nuevo y qué puedes hacer mientras esperas?"
    },
    "INT": {
      "focus": "Honestidad, confidencialidad y cumplimiento de compromisos, incluido reconocer errores. Una puntuación no establece el valor moral de nadie ni hace correctas sus creencias.",
      "scenario": "Ya no puedes cumplir una promesa. Explicas el problema pronto y acuerdas un nuevo compromiso en lugar de ocultarlo.",
      "prompt": "¿Cuál es la siguiente frase honesta y qué compromiso puedes cumplir de verdad?"
    },
    "PER": {
      "focus": "Mantener un esfuerzo útil durante la ejecución, gestionar distracciones e intentar terminar el trabajo. Una rutina productiva también permite descansar y cambiar según la experiencia.",
      "scenario": "Repites un error mientras aprendes. Planificas una práctica breve, anotas un cambio y compruebas si ayuda.",
      "prompt": "¿Qué pequeño paso puedes repetir y cómo sabrás si está funcionando?"
    }
  },
  "pt": {
    "DET": {
      "focus": "Escolher um objetivo importante para você e decidir como voltar a se comprometer depois de um revés. Mudar de rumo após uma reflexão também combina com esse tema.",
      "scenario": "Um plano de estudo falha. Você revê por que a qualificação importa e escolhe um próximo passo, em vez de manter o objetivo só para não admitir o fracasso.",
      "prompt": "O que ainda faz esse objetivo valer a pena e que evidência faria você mudá-lo?"
    },
    "BRV": {
      "focus": "Expressar-se ou agir apesar do medo ou da pressão social quando isso é razoavelmente seguro. A pontuação não premia o perigo nem exige extroversão.",
      "scenario": "Você precisa levantar uma preocupação. Reconhece o nervosismo e escolhe uma ação pequena e segura, como pedir uma conversa particular.",
      "prompt": "Que ação segura você pode tomar sem fingir que o medo desapareceu?"
    },
    "JUS": {
      "focus": "Aplicar critérios justos a pessoas diferentes, considerando direitos, oportunidades e resultados compartilhados. A justiça pode exigir entender necessidades diferentes.",
      "scenario": "Um grupo divide o reconhecimento de um projeto. Você verifica as contribuições e usa um critério que aceitaria mesmo sem se beneficiar dele.",
      "prompt": "Você aceitaria o mesmo critério se ele fosse aplicado a você ou a alguém de quem não gosta?"
    },
    "KND": {
      "focus": "Cuidar, ouvir e oferecer ajuda útil dentro de limites razoáveis. Ser gentil não exige decidir por outra pessoa nem ignorar suas próprias necessidades.",
      "scenario": "Um amigo está com dificuldades. Antes de ajudar, você pergunta se ele quer ser ouvido, apoio prático ou um pouco de espaço.",
      "prompt": "Que ajuda atende à necessidade real dessa pessoa e o que você pode oferecer de forma razoável?"
    },
    "PAT": {
      "focus": "Como você reage à espera, à frustração leve e à irritação. Inclui pausar e se acalmar; não exige tolerar danos ou atrasos indefinidos.",
      "scenario": "Uma resposta demora. Você escolhe um momento razoável para perguntar e faz outra tarefa, em vez de verificar sem parar ou descontar a frustração em alguém.",
      "prompt": "Quando seria razoável perguntar de novo e o que você pode fazer enquanto espera?"
    },
    "INT": {
      "focus": "Honestidade, confidencialidade e cumprimento de compromissos, inclusive admitir erros. Uma pontuação não define o valor moral de alguém nem torna suas crenças corretas.",
      "scenario": "Você não consegue mais cumprir uma promessa. Explica o problema logo e combina um novo compromisso em vez de escondê-lo.",
      "prompt": "Qual é a próxima frase honesta e que compromisso você realmente pode cumprir?"
    },
    "PER": {
      "focus": "Manter um esforço útil durante a execução, lidar com distrações e tentar terminar o trabalho. Uma rotina produtiva também permite descanso e mudanças com base no aprendizado.",
      "scenario": "Você repete um erro enquanto aprende. Planeja uma prática curta, registra uma mudança e verifica se ela ajuda.",
      "prompt": "Que pequeno passo você pode repetir e como vai saber se está funcionando?"
    }
  },
  "ru": {
    "DET": {
      "focus": "Выбор важной для вас цели и решение о том, как снова к ней обратиться после неудачи. Обдуманная смена направления тоже соответствует этой теме.",
      "scenario": "План подготовки не сработал. Вы заново оцениваете, зачем вам квалификация, и выбираете следующий шаг вместо сохранения цели лишь ради нежелания признать неудачу.",
      "prompt": "Почему эта цель всё ещё стоит усилий и какие факты могли бы заставить вас её изменить?"
    },
    "BRV": {
      "focus": "Выражение позиции или действие несмотря на страх и давление окружающих, когда это достаточно безопасно. Оценка не поощряет опасность и не требует общительности.",
      "scenario": "Нужно высказать опасение. Вы признаёте своё волнение и выбираете небольшой безопасный шаг, например просите поговорить наедине.",
      "prompt": "Какой безопасный шаг можно сделать, не притворяясь, что страх исчез?"
    },
    "JUS": {
      "focus": "Применение справедливых критериев к разным людям с учётом прав, возможностей и общих результатов. Справедливость может требовать понимания разных потребностей.",
      "scenario": "Группа распределяет признание за проект. Вы проверяете вклад каждого и применяете критерий, с которым согласились бы и без личной выгоды.",
      "prompt": "Вы приняли бы тот же критерий, если бы он применялся к вам или к неприятному вам человеку?"
    },
    "KND": {
      "focus": "Забота, умение слушать и полезная помощь в разумных пределах. Доброта не требует решать за другого человека или пренебрегать своими потребностями.",
      "scenario": "У друга трудности. Прежде чем помогать, вы спрашиваете, хочет ли он, чтобы его выслушали, нужна ли практическая помощь или время наедине.",
      "prompt": "Какая помощь отвечает реальной потребности человека и что вы можете разумно предложить?"
    },
    "PAT": {
      "focus": "Реакция на ожидание, небольшие неудачи и раздражение. Сюда относятся пауза и самоуспокоение, но не обязанность терпеть вред или бесконечную задержку.",
      "scenario": "Ответ задерживается. Вы выбираете разумное время для уточнения и занимаетесь другой задачей вместо постоянных проверок или раздражения на других.",
      "prompt": "Когда разумно уточнить ответ и что можно сделать во время ожидания?"
    },
    "INT": {
      "focus": "Честность, сохранение доверенной информации и выполнение обязательств, включая признание ошибок. Балл не определяет моральную ценность человека и не делает его убеждения верными.",
      "scenario": "Вы больше не можете выполнить обещание. Вместо сокрытия проблемы вы быстро объясняете её и обсуждаете новое обязательство.",
      "prompt": "Какой будет следующая честная фраза и какое обязательство вы действительно можете выполнить?"
    },
    "PER": {
      "focus": "Продолжение полезной работы, управление отвлечениями и стремление завершить задачу. Продуктивный распорядок также предусматривает отдых и изменения с учётом обратной связи.",
      "scenario": "При обучении вы повторяете ошибку. Планируете короткую практику, записываете одно изменение и проверяете, помогает ли оно.",
      "prompt": "Какой небольшой шаг можно повторять и как понять, что он работает?"
    }
  }
};

export const ASSESSMENT_COPY = {
  "en": {
    "seoTitle": "How Soul Virtues Extractor Works: Questions and Scoring",
    "seoDescription": "See the sources behind our 66 questions, the seven independent scores, reverse scoring, result limits and how your progress stays in your own browser.",
    "heading": "Questions, sources and scoring",
    "intro": "Soul Virtues Extractor is a free, independent fan quiz for self-reflection. Its 66 statements explore seven everyday themes using an Undertale-inspired presentation. It is not an official game test or a clinical assessment.",
    "sourceTitle": "Where the questions come from",
    "sourceBody": "The current bank adapts 56 public-domain IPIP statements and adds 10 independently written Determination statements. We selected material from the larger item pool, not a fixed IPIP 56-question test. Our seven groupings and wording are our own design.",
    "formulaTitle": "How each score is calculated",
    "formulaSteps": [
      "Choose one of five responses, from strongly disagree (1) to strongly agree (5).",
      "For a reverse statement, use 6 minus the response. Each statement belongs to one theme.",
      "Average the keyed responses within that theme, then calculate 100 × (average − 1) ÷ 4.",
      "The seven scores are independent. They do not need to add up to 100, and different item counts do not increase a theme’s maximum."
    ],
    "readingTitle": "How to read your result",
    "readingBody": "50 marks the neutral midpoint of this answer scale. A higher score means your answers fit more of this site’s statements for that theme. It is not a population percentile or a moral grade. All-neutral answers have no leading theme. Ties are shown as ties; scores within 3 points are shown together as a reading aid, not a statistical finding.",
    "limitsTitle": "What this quiz can and cannot tell you",
    "limitsBody": "These are self-reported responses to an independently adapted quiz. Public-domain source material does not make the seven-theme combination a validated psychological inventory. Mood, experience and interpretation can affect answers. A low score does not prove you lack a virtue; a high score cannot justify unsafe behavior or diagnose anyone.",
    "storageTitle": "Versions and local progress",
    "storageBody": "Answers are calculated and saved in this browser by stable question ID and bank version. The same progress can be resumed in any of our five languages on this browser; switching devices does not transfer it. Earlier-bank answers are kept separate and cannot be silently scored against new statements. Audio settings are stored separately.",
    "versionNotice": "This quiz uses a new question bank. Earlier-bank answers cannot be used for it; start a new response. Your audio settings are unchanged.",
    "ledgerTitle": "Item source ledger",
    "ledgerIntro": "Expand the ledger to inspect the current statement, its official IPIP item number and English source, or its independent origin. Adaptations are not claimed to be exact translations or unchanged original scales.",
    "originalLabel": "Official English source",
    "adaptedLabel": "Current statement",
    "directLabel": "Direct scoring",
    "reverseLabel": "Reverse scoring",
    "siteLabel": "Independently written for this site",
    "ledgerToggle": "Show all 66 items",
    "editorialTitle": "Publisher and review",
    "editorialBody": "This independent site is maintained by Tangjei. AI tools assist drafting, translation and software work. The source ledger, language direction and scoring behavior are checked together before release. Corrections can be sent to the maintainer; please do not include private answers or personal health information.",
    "updatedLabel": "Question bank",
    "methodLink": "Questions & scoring method",
    "definitionTitle": "What this quiz focuses on",
    "exampleTitle": "One everyday example",
    "questionTitle": "A question for reflection",
    "versionTitle": "About this V2 reading",
    "closeReading": "Two close scores can describe different responses to the same situation. Read both definitions and notice which part of the decision each addresses. The 3-point display rule does not show that a difference is psychologically significant.",
    "freeBody": "The complete seven-score result, answer review and PNG card are free, with no account, payment or invitation required.",
    "officialBody": "This is an independent fan project, not an official Undertale or Deltarune test. Red / Determination is community shorthand; the game does not explicitly name Determination as the Red SOUL’s official trait.",
    "faqItems": [
      {
        "q": "What is the Soul Virtues Extractor?",
        "a": "Soul Virtues Extractor is a free, independent fan quiz for self-reflection. Its 66 statements explore seven everyday themes using an Undertale-inspired presentation. It is not an official game test or a clinical assessment."
      },
      {
        "q": "Where do the 66 questions come from?",
        "a": "The current bank adapts 56 public-domain IPIP statements and adds 10 independently written Determination statements. We selected material from the larger item pool, not a fixed IPIP 56-question test. Our seven groupings and wording are our own design."
      },
      {
        "q": "How does scoring work?",
        "a": "Choose one of five responses, from strongly disagree (1) to strongly agree (5). For a reverse statement, use 6 minus the response. Each statement belongs to one theme. Average the keyed responses within that theme, then calculate 100 × (average − 1) ÷ 4. The seven scores are independent. They do not need to add up to 100, and different item counts do not increase a theme’s maximum."
      },
      {
        "q": "Can several Soul Virtues be high or tied?",
        "a": "50 marks the neutral midpoint of this answer scale. A higher score means your answers fit more of this site’s statements for that theme. It is not a population percentile or a moral grade. All-neutral answers have no leading theme. Ties are shown as ties; scores within 3 points are shown together as a reading aid, not a statistical finding."
      },
      {
        "q": "How accurate is this quiz?",
        "a": "These are self-reported responses to an independently adapted quiz. Public-domain source material does not make the seven-theme combination a validated psychological inventory. Mood, experience and interpretation can affect answers. A low score does not prove you lack a virtue; a high score cannot justify unsafe behavior or diagnose anyone."
      },
      {
        "q": "Can I change language or resume later?",
        "a": "Answers are calculated and saved in this browser by stable question ID and bank version. The same progress can be resumed in any of our five languages on this browser; switching devices does not transfer it. Earlier-bank answers are kept separate and cannot be silently scored against new statements. Audio settings are stored separately."
      },
      {
        "q": "Is the complete result free?",
        "a": "The complete seven-score result, answer review and PNG card are free, with no account, payment or invitation required."
      },
      {
        "q": "Is this an official Undertale test?",
        "a": "This is an independent fan project, not an official Undertale or Deltarune test. Red / Determination is community shorthand; the game does not explicitly name Determination as the Red SOUL’s official trait."
      },
      {
        "q": "Is this Jaden's original Soul Virtues Extractor?",
        "a": "No. This is an independent version with 56 adapted public-domain IPIP statements and 10 independently written Determination statements. It does not reproduce Jaden's original 66-question bank, and its scores should not be compared directly with that project's results."
      },
      {
        "q": "Can I use this as a Deltarune Soul test?",
        "a": "Deltarune fans can use it for self-reflection, but the quiz uses this site's Undertale-inspired seven-theme framework. It is not a separate Deltarune assessment and does not establish an official Deltarune SOUL type or battle mode."
      }
    ],
    "whyPoints": [
      {
        "title": "Seven scores, one complete result",
        "desc": "The complete seven-score result, answer review and PNG card are free, with no account, payment or invitation required."
      },
      {
        "title": "Traceable question sources",
        "desc": "The current bank adapts 56 public-domain IPIP statements and adds 10 independently written Determination statements. We selected material from the larger item pool, not a fixed IPIP 56-question test. Our seven groupings and wording are our own design."
      },
      {
        "title": "Read your answers in context",
        "desc": "50 marks the neutral midpoint of this answer scale. A higher score means your answers fit more of this site’s statements for that theme. It is not a population percentile or a moral grade. All-neutral answers have no leading theme. Ties are shown as ties; scores within 3 points are shown together as a reading aid, not a statistical finding."
      },
      {
        "title": "Local progress without an account",
        "desc": "Answers are calculated and saved in this browser by stable question ID and bank version. The same progress can be resumed in any of our five languages on this browser; switching devices does not transfer it. Earlier-bank answers are kept separate and cannot be silently scored against new statements. Audio settings are stored separately."
      }
    ],
    "scoringCards": [
      {
        "title": "Five choices and reverse statements",
        "desc": "Choose one of five responses, from strongly disagree (1) to strongly agree (5). For a reverse statement, use 6 minus the response. Each statement belongs to one theme."
      },
      {
        "title": "An average for each theme",
        "desc": "Average the keyed responses within that theme, then calculate 100 × (average − 1) ÷ 4."
      },
      {
        "title": "A transparent 0–100 scale",
        "desc": "The seven scores are independent. They do not need to add up to 100, and different item counts do not increase a theme’s maximum."
      }
    ],
    "storageError": "This browser could not save progress. You can keep answering, but closing the page may lose new answers."
  },
  "ja": {
    "seoTitle": "Soul Virtues Extractor の仕組み：質問の出典と採点方法",
    "seoDescription": "66問の出典、7つの独立した得点、逆転項目、結果の限界、ブラウザ内の進行状況の保存方法を確認できます。",
    "heading": "質問の出典と採点方法",
    "intro": "Soul Virtues Extractor は、自分を振り返るための無料の独立したファンテストです。Undertale に着想を得た表現で、66の文から日常の7つのテーマを考えます。公式ゲームテストや臨床評価ではありません。",
    "sourceTitle": "質問の出典",
    "sourceBody": "現在の題庫は、パブリックドメインのIPIPの56項目を改編し、独自に作成したケツイの10項目を加えたものです。固定のIPIP56問テストではなく、大きな項目プールから選んでいます。7つの分類と表現はこのサイトの設計です。",
    "formulaTitle": "各得点の計算方法",
    "formulaSteps": [
      "まったくそう思わない（1）から強くそう思う（5）まで、5つの回答から選びます。",
      "逆転項目では6から回答値を引きます。各文は1つのテーマに属します。",
      "そのテーマの採点後の値を平均し、100 ×（平均値 − 1）÷ 4で計算します。",
      "7つの得点は独立しています。合計が100になる必要はなく、項目数が違っても最高得点は変わりません。"
    ],
    "readingTitle": "結果の読み方",
    "readingBody": "50はこの回答尺度の中立の中点です。高い得点は、そのテーマの文に合う回答が多かったことを示します。人口の中での順位や道徳の点数ではありません。すべて中立なら主なテーマはありません。同点は同点として示し、3点以内の得点は読み方の補助として併記します。統計的な結論ではありません。",
    "limitsTitle": "このテストの限界",
    "limitsBody": "結果は、独自に改編した質問への自己申告の回答です。出典がパブリックドメインでも、7つのテーマの組合せが検証済み心理尺度になるわけではありません。気分、経験、解釈で回答は変わります。低い得点は美徳がない証拠ではなく、高い得点も危険な行動や診断を正当化しません。",
    "storageTitle": "版とブラウザ内の進行状況",
    "storageBody": "回答はこのブラウザ内で計算され、固定の質問IDと題庫の版を使って保存されます。同じブラウザなら5言語のどれでも同じ進行状況を続けられます。端末を変えても転送されません。旧版の回答は新しい文の採点に使われず、音の設定は別に保存されます。",
    "versionNotice": "質問が新しい版になりました。旧版の回答は使えないため、新しく回答してください。音の設定は変わりません。",
    "ledgerTitle": "項目の出典一覧",
    "ledgerIntro": "一覧を開くと、現在の文、IPIP公式の項目番号と英語原文、または独自に作成した項目かを確認できます。改編文を完全な翻訳や変更のない原尺度とは説明しません。",
    "originalLabel": "公式の英語原文",
    "adaptedLabel": "現在の文",
    "directLabel": "通常採点",
    "reverseLabel": "逆転採点",
    "siteLabel": "このサイト独自の項目",
    "ledgerToggle": "66項目の一覧を開く",
    "editorialTitle": "運営と確認",
    "editorialBody": "この独立したサイトはTangjeiが運営しています。AIは草稿、翻訳、ソフトウェア作業を補助します。公開前に出典、各言語の意味と方向、採点の動作を合わせて確認します。訂正は運営者にご連絡ください。個人の回答や健康情報は送らないでください。",
    "updatedLabel": "題庫の版",
    "methodLink": "質問と採点方法",
    "definitionTitle": "このテストで見るテーマ",
    "exampleTitle": "日常の例",
    "questionTitle": "振り返るための問い",
    "versionTitle": "V2の解釈について",
    "closeReading": "近い2つの得点は、同じ状況の違う部分への反応を示すことがあります。両方の定義を読み、それぞれが判断のどの部分を見るか考えてください。3点という表示基準は心理学的に意味のある差を示しません。",
    "freeBody": "7つの得点、回答の確認、PNGカードはすべて無料です。アカウント、支払い、招待は不要です。",
    "officialBody": "UndertaleやDeltaruneの公式テストではなく、独立したファン作品です。赤／ケツイはコミュニティの略称で、ゲームはケツイを赤いタマシイの公式特質として明示していません。",
    "faqItems": [
      {
        "q": "Soul Virtues Extractorとは？",
        "a": "Soul Virtues Extractor は、自分を振り返るための無料の独立したファンテストです。Undertale に着想を得た表現で、66の文から日常の7つのテーマを考えます。公式ゲームテストや臨床評価ではありません。"
      },
      {
        "q": "66問はどこから来たの？",
        "a": "現在の題庫は、パブリックドメインのIPIPの56項目を改編し、独自に作成したケツイの10項目を加えたものです。固定のIPIP56問テストではなく、大きな項目プールから選んでいます。7つの分類と表現はこのサイトの設計です。"
      },
      {
        "q": "どう採点するの？",
        "a": "まったくそう思わない（1）から強くそう思う（5）まで、5つの回答から選びます。 逆転項目では6から回答値を引きます。各文は1つのテーマに属します。 そのテーマの採点後の値を平均し、100 ×（平均値 − 1）÷ 4で計算します。 7つの得点は独立しています。合計が100になる必要はなく、項目数が違っても最高得点は変わりません。"
      },
      {
        "q": "複数の特質が高得点や同点になる？",
        "a": "50はこの回答尺度の中立の中点です。高い得点は、そのテーマの文に合う回答が多かったことを示します。人口の中での順位や道徳の点数ではありません。すべて中立なら主なテーマはありません。同点は同点として示し、3点以内の得点は読み方の補助として併記します。統計的な結論ではありません。"
      },
      {
        "q": "このテストはどのくらい正確？",
        "a": "結果は、独自に改編した質問への自己申告の回答です。出典がパブリックドメインでも、7つのテーマの組合せが検証済み心理尺度になるわけではありません。気分、経験、解釈で回答は変わります。低い得点は美徳がない証拠ではなく、高い得点も危険な行動や診断を正当化しません。"
      },
      {
        "q": "言語を変えたり後で続けたりできる？",
        "a": "回答はこのブラウザ内で計算され、固定の質問IDと題庫の版を使って保存されます。同じブラウザなら5言語のどれでも同じ進行状況を続けられます。端末を変えても転送されません。旧版の回答は新しい文の採点に使われず、音の設定は別に保存されます。"
      },
      {
        "q": "結果はすべて無料？",
        "a": "7つの得点、回答の確認、PNGカードはすべて無料です。アカウント、支払い、招待は不要です。"
      },
      {
        "q": "Undertale公式のテスト？",
        "a": "UndertaleやDeltaruneの公式テストではなく、独立したファン作品です。赤／ケツイはコミュニティの略称で、ゲームはケツイを赤いタマシイの公式特質として明示していません。"
      }
    ],
    "whyPoints": [
      {
        "title": "7つの得点をまとめて読む",
        "desc": "7つの得点、回答の確認、PNGカードはすべて無料です。アカウント、支払い、招待は不要です。"
      },
      {
        "title": "質問の出典を確かめる",
        "desc": "現在の題庫は、パブリックドメインのIPIPの56項目を改編し、独自に作成したケツイの10項目を加えたものです。固定のIPIP56問テストではなく、大きな項目プールから選んでいます。7つの分類と表現はこのサイトの設計です。"
      },
      {
        "title": "回答を状況とともに読む",
        "desc": "50はこの回答尺度の中立の中点です。高い得点は、そのテーマの文に合う回答が多かったことを示します。人口の中での順位や道徳の点数ではありません。すべて中立なら主なテーマはありません。同点は同点として示し、3点以内の得点は読み方の補助として併記します。統計的な結論ではありません。"
      },
      {
        "title": "登録不要で進行状況を保存",
        "desc": "回答はこのブラウザ内で計算され、固定の質問IDと題庫の版を使って保存されます。同じブラウザなら5言語のどれでも同じ進行状況を続けられます。端末を変えても転送されません。旧版の回答は新しい文の採点に使われず、音の設定は別に保存されます。"
      }
    ],
    "scoringCards": [
      {
        "title": "5つの選択肢と逆転項目",
        "desc": "まったくそう思わない（1）から強くそう思う（5）まで、5つの回答から選びます。 逆転項目では6から回答値を引きます。各文は1つのテーマに属します。"
      },
      {
        "title": "テーマごとの平均値",
        "desc": "そのテーマの採点後の値を平均し、100 ×（平均値 − 1）÷ 4で計算します。"
      },
      {
        "title": "分かりやすい0〜100の尺度",
        "desc": "7つの得点は独立しています。合計が100になる必要はなく、項目数が違っても最高得点は変わりません。"
      }
    ],
    "storageError": "このブラウザでは進行状況を保存できませんでした。回答は続けられますが、ページを閉じると新しい回答が失われる場合があります。"
  },
  "es": {
    "seoTitle": "Cómo funciona Soul Virtues Extractor: preguntas y puntos",
    "seoDescription": "Consulta las fuentes de las 66 preguntas, los siete resultados independientes, la puntuación inversa, los límites y el progreso guardado en tu navegador.",
    "heading": "Preguntas, fuentes y puntuación",
    "intro": "Soul Virtues Extractor es un test de fans independiente, gratuito y pensado para reflexionar. Sus 66 afirmaciones exploran siete temas cotidianos con una presentación inspirada en Undertale. No es una prueba oficial ni una evaluación clínica.",
    "sourceTitle": "De dónde vienen las preguntas",
    "sourceBody": "El banco actual adapta 56 afirmaciones de dominio público de IPIP y añade 10 de Determinación escritas de forma independiente. Elegimos materiales de un conjunto mayor, no de un test fijo de 56 preguntas. Las siete agrupaciones y la redacción son decisiones de este sitio.",
    "formulaTitle": "Cómo se calcula cada resultado",
    "formulaSteps": [
      "Elige entre cinco respuestas: de totalmente en desacuerdo (1) a totalmente de acuerdo (5).",
      "En una afirmación inversa usamos 6 menos la respuesta. Cada afirmación pertenece a un solo tema.",
      "Calculamos la media de las respuestas corregidas del tema y aplicamos 100 × (media − 1) ÷ 4.",
      "Los siete resultados son independientes. No tienen que sumar 100 y un número distinto de preguntas no cambia el máximo."
    ],
    "readingTitle": "Cómo leer tu resultado",
    "readingBody": "50 es el punto medio neutral de esta escala de respuestas. Una puntuación mayor indica que tus respuestas encajan con más afirmaciones del tema. No es un percentil poblacional ni una nota moral. Si todo es neutral, no hay tema principal. Mostramos los empates y presentamos juntos los resultados separados por hasta 3 puntos como ayuda de lectura, no como hallazgo estadístico.",
    "limitsTitle": "Qué puede decir este test",
    "limitsBody": "Son respuestas personales a un test adaptado de forma independiente. Las fuentes de dominio público no convierten estos siete temas en un instrumento psicológico validado. El ánimo, la experiencia y la interpretación pueden cambiar las respuestas. Una puntuación baja no prueba que te falte una virtud; una alta no justifica riesgos ni permite diagnosticar.",
    "storageTitle": "Versiones y progreso local",
    "storageBody": "Las respuestas se calculan y guardan en este navegador con un identificador estable y la versión del banco. Puedes seguir el mismo progreso en cualquiera de nuestros cinco idiomas en este navegador, pero no se transfiere entre dispositivos. Las respuestas antiguas no se aplican a preguntas nuevas. El sonido se guarda por separado.",
    "versionNotice": "El test utiliza un banco de preguntas nuevo. Las respuestas de la versión anterior no sirven para él: empieza una nueva respuesta. Tus ajustes de sonido no cambian.",
    "ledgerTitle": "Registro de fuentes por pregunta",
    "ledgerIntro": "Abre el registro para ver la afirmación actual, su número oficial y fuente inglesa de IPIP, o su origen independiente. Las adaptaciones no se presentan como traducciones exactas ni como escalas originales sin cambios.",
    "originalLabel": "Fuente inglesa oficial",
    "adaptedLabel": "Afirmación actual",
    "directLabel": "Puntuación directa",
    "reverseLabel": "Puntuación inversa",
    "siteLabel": "Escrita de forma independiente para este sitio",
    "ledgerToggle": "Mostrar las 66 preguntas",
    "editorialTitle": "Responsable y revisión",
    "editorialBody": "Tangjei mantiene este sitio independiente. Las herramientas de IA ayudan con borradores, traducción y software. Antes de publicar se revisan juntos el registro de fuentes, el sentido en cada idioma y el cálculo real. Puedes enviar correcciones al responsable sin incluir respuestas privadas ni datos de salud.",
    "updatedLabel": "Banco de preguntas",
    "methodLink": "Preguntas y método de puntuación",
    "definitionTitle": "Qué explora este test",
    "exampleTitle": "Un ejemplo cotidiano",
    "questionTitle": "Una pregunta para reflexionar",
    "versionTitle": "Sobre esta lectura V2",
    "closeReading": "Dos resultados cercanos pueden describir respuestas a partes distintas de una situación. Lee ambas definiciones y observa qué parte de la decisión trata cada una. La regla de 3 puntos no demuestra una diferencia psicológicamente significativa.",
    "freeBody": "El resultado completo de siete temas, la revisión de respuestas y la tarjeta PNG son gratuitos, sin cuenta, pago ni invitaciones.",
    "officialBody": "Es un proyecto de fans independiente, no un test oficial de Undertale o Deltarune. Rojo / Determinación es una asociación comunitaria: el juego no nombra explícitamente la Determinación como rasgo oficial del Alma roja.",
    "faqItems": [
      {
        "q": "¿Qué es Soul Virtues Extractor?",
        "a": "Soul Virtues Extractor es un test de fans independiente, gratuito y pensado para reflexionar. Sus 66 afirmaciones exploran siete temas cotidianos con una presentación inspirada en Undertale. No es una prueba oficial ni una evaluación clínica."
      },
      {
        "q": "¿De dónde vienen las 66 preguntas?",
        "a": "El banco actual adapta 56 afirmaciones de dominio público de IPIP y añade 10 de Determinación escritas de forma independiente. Elegimos materiales de un conjunto mayor, no de un test fijo de 56 preguntas. Las siete agrupaciones y la redacción son decisiones de este sitio."
      },
      {
        "q": "¿Cómo se puntúa?",
        "a": "Elige entre cinco respuestas: de totalmente en desacuerdo (1) a totalmente de acuerdo (5). En una afirmación inversa usamos 6 menos la respuesta. Cada afirmación pertenece a un solo tema. Calculamos la media de las respuestas corregidas del tema y aplicamos 100 × (media − 1) ÷ 4. Los siete resultados son independientes. No tienen que sumar 100 y un número distinto de preguntas no cambia el máximo."
      },
      {
        "q": "¿Pueden varios rasgos ser altos o empatar?",
        "a": "50 es el punto medio neutral de esta escala de respuestas. Una puntuación mayor indica que tus respuestas encajan con más afirmaciones del tema. No es un percentil poblacional ni una nota moral. Si todo es neutral, no hay tema principal. Mostramos los empates y presentamos juntos los resultados separados por hasta 3 puntos como ayuda de lectura, no como hallazgo estadístico."
      },
      {
        "q": "¿Qué precisión tiene el test?",
        "a": "Son respuestas personales a un test adaptado de forma independiente. Las fuentes de dominio público no convierten estos siete temas en un instrumento psicológico validado. El ánimo, la experiencia y la interpretación pueden cambiar las respuestas. Una puntuación baja no prueba que te falte una virtud; una alta no justifica riesgos ni permite diagnosticar."
      },
      {
        "q": "¿Puedo cambiar de idioma o continuar después?",
        "a": "Las respuestas se calculan y guardan en este navegador con un identificador estable y la versión del banco. Puedes seguir el mismo progreso en cualquiera de nuestros cinco idiomas en este navegador, pero no se transfiere entre dispositivos. Las respuestas antiguas no se aplican a preguntas nuevas. El sonido se guarda por separado."
      },
      {
        "q": "¿Es gratuito el resultado completo?",
        "a": "El resultado completo de siete temas, la revisión de respuestas y la tarjeta PNG son gratuitos, sin cuenta, pago ni invitaciones."
      },
      {
        "q": "¿Es un test oficial de Undertale?",
        "a": "Es un proyecto de fans independiente, no un test oficial de Undertale o Deltarune. Rojo / Determinación es una asociación comunitaria: el juego no nombra explícitamente la Determinación como rasgo oficial del Alma roja."
      },
      {
        "q": "¿Es el Soul Virtues Extractor original de Jaden?",
        "a": "No. Esta es una versión independiente con 56 afirmaciones adaptadas del IPIP de dominio público y 10 de Determinación escritas de forma independiente. No reproduce las 66 preguntas originales de Jaden, y sus puntuaciones no deben compararse directamente con las de ese proyecto."
      },
      {
        "q": "¿Puedo usarlo como test de alma de Deltarune?",
        "a": "Los fans de Deltarune pueden usarlo para reflexionar, pero el test utiliza el marco de siete temas de este sitio, inspirado en Undertale. No es una evaluación independiente de Deltarune ni determina un tipo de Alma o modo de combate oficial de ese juego."
      }
    ],
    "whyPoints": [
      {
        "title": "Siete puntuaciones en un resultado completo",
        "desc": "El resultado completo de siete temas, la revisión de respuestas y la tarjeta PNG son gratuitos, sin cuenta, pago ni invitaciones."
      },
      {
        "title": "Fuentes de preguntas comprobables",
        "desc": "El banco actual adapta 56 afirmaciones de dominio público de IPIP y añade 10 de Determinación escritas de forma independiente. Elegimos materiales de un conjunto mayor, no de un test fijo de 56 preguntas. Las siete agrupaciones y la redacción son decisiones de este sitio."
      },
      {
        "title": "Lee tus respuestas en contexto",
        "desc": "50 es el punto medio neutral de esta escala de respuestas. Una puntuación mayor indica que tus respuestas encajan con más afirmaciones del tema. No es un percentil poblacional ni una nota moral. Si todo es neutral, no hay tema principal. Mostramos los empates y presentamos juntos los resultados separados por hasta 3 puntos como ayuda de lectura, no como hallazgo estadístico."
      },
      {
        "title": "Progreso local sin cuenta",
        "desc": "Las respuestas se calculan y guardan en este navegador con un identificador estable y la versión del banco. Puedes seguir el mismo progreso en cualquiera de nuestros cinco idiomas en este navegador, pero no se transfiere entre dispositivos. Las respuestas antiguas no se aplican a preguntas nuevas. El sonido se guarda por separado."
      }
    ],
    "scoringCards": [
      {
        "title": "Cinco opciones y preguntas inversas",
        "desc": "Elige entre cinco respuestas: de totalmente en desacuerdo (1) a totalmente de acuerdo (5). En una afirmación inversa usamos 6 menos la respuesta. Cada afirmación pertenece a un solo tema."
      },
      {
        "title": "Una media para cada tema",
        "desc": "Calculamos la media de las respuestas corregidas del tema y aplicamos 100 × (media − 1) ÷ 4."
      },
      {
        "title": "Una escala transparente de 0 a 100",
        "desc": "Los siete resultados son independientes. No tienen que sumar 100 y un número distinto de preguntas no cambia el máximo."
      }
    ],
    "storageError": "Este navegador no pudo guardar el progreso. Puedes seguir respondiendo, pero al cerrar la página podrías perder las respuestas nuevas."
  },
  "pt": {
    "seoTitle": "Como funciona Soul Virtues Extractor: perguntas e pontos",
    "seoDescription": "Veja as fontes das 66 perguntas, os sete resultados independentes, a pontuação inversa, os limites e como o progresso fica salvo no seu navegador.",
    "heading": "Perguntas, fontes e pontuação",
    "intro": "Soul Virtues Extractor é um teste de fãs independente, gratuito e voltado à reflexão. Suas 66 afirmações exploram sete temas cotidianos com uma apresentação inspirada em Undertale. Não é um teste oficial nem uma avaliação clínica.",
    "sourceTitle": "De onde vêm as perguntas",
    "sourceBody": "O banco atual adapta 56 afirmações de domínio público do IPIP e acrescenta 10 de Determinação escritas de forma independente. Selecionamos material de um conjunto maior, não de um teste fixo de 56 perguntas. Os sete grupos e a redação são decisões deste site.",
    "formulaTitle": "Como cada pontuação é calculada",
    "formulaSteps": [
      "Escolha entre cinco respostas: de discordo totalmente (1) a concordo totalmente (5).",
      "Para uma afirmação inversa, usamos 6 menos a resposta. Cada afirmação pertence a um único tema.",
      "Calculamos a média das respostas ajustadas do tema e aplicamos 100 × (média − 1) ÷ 4.",
      "Os sete resultados são independentes. Não precisam somar 100 e quantidades diferentes de perguntas não mudam o máximo."
    ],
    "readingTitle": "Como ler seu resultado",
    "readingBody": "50 é o ponto médio neutro desta escala de respostas. Uma pontuação maior indica que suas respostas combinam com mais afirmações do tema. Não é um percentil populacional nem uma nota moral. Respostas todas neutras não têm tema principal. Empates são apresentados como empates; resultados com até 3 pontos de diferença aparecem juntos como ajuda de leitura, não como conclusão estatística.",
    "limitsTitle": "O que este teste pode dizer",
    "limitsBody": "São respostas pessoais a um teste adaptado de forma independente. Fontes de domínio público não transformam os sete temas em um instrumento psicológico validado. Humor, experiência e interpretação podem afetar as respostas. Uma pontuação baixa não prova falta de uma virtude; uma alta não justifica riscos nem permite diagnosticar.",
    "storageTitle": "Versões e progresso local",
    "storageBody": "As respostas são calculadas e salvas neste navegador com um ID estável e a versão do banco. Você pode continuar o mesmo progresso em qualquer um dos cinco idiomas neste navegador, mas ele não é transferido entre dispositivos. Respostas antigas não são aplicadas a perguntas novas. O som é salvo separadamente.",
    "versionNotice": "O teste usa um novo banco de perguntas. As respostas da versão anterior não servem para ele: comece uma nova resposta. Seus ajustes de som não mudam.",
    "ledgerTitle": "Registro de fontes por pergunta",
    "ledgerIntro": "Abra o registro para ver a afirmação atual, seu número oficial e a fonte em inglês do IPIP, ou sua origem independente. As adaptações não são apresentadas como traduções exatas nem como escalas originais sem mudanças.",
    "originalLabel": "Fonte oficial em inglês",
    "adaptedLabel": "Afirmação atual",
    "directLabel": "Pontuação direta",
    "reverseLabel": "Pontuação inversa",
    "siteLabel": "Escrita de forma independente para este site",
    "ledgerToggle": "Mostrar as 66 perguntas",
    "editorialTitle": "Responsável e revisão",
    "editorialBody": "Tangjei mantém este site independente. Ferramentas de IA ajudam com rascunhos, tradução e software. Antes da publicação, o registro de fontes, o sentido em cada idioma e o cálculo real são verificados juntos. Envie correções ao responsável sem incluir respostas privadas ou dados de saúde.",
    "updatedLabel": "Banco de perguntas",
    "methodLink": "Perguntas e método de pontuação",
    "definitionTitle": "O que este teste explora",
    "exampleTitle": "Um exemplo cotidiano",
    "questionTitle": "Uma pergunta para refletir",
    "versionTitle": "Sobre esta leitura V2",
    "closeReading": "Dois resultados próximos podem descrever respostas a partes diferentes da mesma situação. Leia as duas definições e veja qual parte da decisão cada uma aborda. A regra de 3 pontos não demonstra uma diferença psicologicamente significativa.",
    "freeBody": "O resultado completo dos sete temas, a revisão de respostas e o cartão PNG são gratuitos, sem conta, pagamento ou convites.",
    "officialBody": "Este é um projeto de fãs independente, não um teste oficial de Undertale ou Deltarune. Vermelho / Determinação é uma associação da comunidade: o jogo não nomeia explicitamente a Determinação como traço oficial da Alma vermelha.",
    "faqItems": [
      {
        "q": "O que é Soul Virtues Extractor?",
        "a": "Soul Virtues Extractor é um teste de fãs independente, gratuito e voltado à reflexão. Suas 66 afirmações exploram sete temas cotidianos com uma apresentação inspirada em Undertale. Não é um teste oficial nem uma avaliação clínica."
      },
      {
        "q": "De onde vêm as 66 perguntas?",
        "a": "O banco atual adapta 56 afirmações de domínio público do IPIP e acrescenta 10 de Determinação escritas de forma independente. Selecionamos material de um conjunto maior, não de um teste fixo de 56 perguntas. Os sete grupos e a redação são decisões deste site."
      },
      {
        "q": "Como funciona a pontuação?",
        "a": "Escolha entre cinco respostas: de discordo totalmente (1) a concordo totalmente (5). Para uma afirmação inversa, usamos 6 menos a resposta. Cada afirmação pertence a um único tema. Calculamos a média das respostas ajustadas do tema e aplicamos 100 × (média − 1) ÷ 4. Os sete resultados são independentes. Não precisam somar 100 e quantidades diferentes de perguntas não mudam o máximo."
      },
      {
        "q": "Vários traços podem ser altos ou empatar?",
        "a": "50 é o ponto médio neutro desta escala de respostas. Uma pontuação maior indica que suas respostas combinam com mais afirmações do tema. Não é um percentil populacional nem uma nota moral. Respostas todas neutras não têm tema principal. Empates são apresentados como empates; resultados com até 3 pontos de diferença aparecem juntos como ajuda de leitura, não como conclusão estatística."
      },
      {
        "q": "Qual é a precisão do teste?",
        "a": "São respostas pessoais a um teste adaptado de forma independente. Fontes de domínio público não transformam os sete temas em um instrumento psicológico validado. Humor, experiência e interpretação podem afetar as respostas. Uma pontuação baixa não prova falta de uma virtude; uma alta não justifica riscos nem permite diagnosticar."
      },
      {
        "q": "Posso mudar de idioma ou continuar depois?",
        "a": "As respostas são calculadas e salvas neste navegador com um ID estável e a versão do banco. Você pode continuar o mesmo progresso em qualquer um dos cinco idiomas neste navegador, mas ele não é transferido entre dispositivos. Respostas antigas não são aplicadas a perguntas novas. O som é salvo separadamente."
      },
      {
        "q": "O resultado completo é gratuito?",
        "a": "O resultado completo dos sete temas, a revisão de respostas e o cartão PNG são gratuitos, sem conta, pagamento ou convites."
      },
      {
        "q": "É um teste oficial de Undertale?",
        "a": "Este é um projeto de fãs independente, não um teste oficial de Undertale ou Deltarune. Vermelho / Determinação é uma associação da comunidade: o jogo não nomeia explicitamente a Determinação como traço oficial da Alma vermelha."
      }
    ],
    "whyPoints": [
      {
        "title": "Sete pontuações em um resultado completo",
        "desc": "O resultado completo dos sete temas, a revisão de respostas e o cartão PNG são gratuitos, sem conta, pagamento ou convites."
      },
      {
        "title": "Fontes de perguntas verificáveis",
        "desc": "O banco atual adapta 56 afirmações de domínio público do IPIP e acrescenta 10 de Determinação escritas de forma independente. Selecionamos material de um conjunto maior, não de um teste fixo de 56 perguntas. Os sete grupos e a redação são decisões deste site."
      },
      {
        "title": "Leia suas respostas no contexto",
        "desc": "50 é o ponto médio neutro desta escala de respostas. Uma pontuação maior indica que suas respostas combinam com mais afirmações do tema. Não é um percentil populacional nem uma nota moral. Respostas todas neutras não têm tema principal. Empates são apresentados como empates; resultados com até 3 pontos de diferença aparecem juntos como ajuda de leitura, não como conclusão estatística."
      },
      {
        "title": "Progresso local sem conta",
        "desc": "As respostas são calculadas e salvas neste navegador com um ID estável e a versão do banco. Você pode continuar o mesmo progresso em qualquer um dos cinco idiomas neste navegador, mas ele não é transferido entre dispositivos. Respostas antigas não são aplicadas a perguntas novas. O som é salvo separadamente."
      }
    ],
    "scoringCards": [
      {
        "title": "Cinco opções e perguntas inversas",
        "desc": "Escolha entre cinco respostas: de discordo totalmente (1) a concordo totalmente (5). Para uma afirmação inversa, usamos 6 menos a resposta. Cada afirmação pertence a um único tema."
      },
      {
        "title": "Uma média para cada tema",
        "desc": "Calculamos a média das respostas ajustadas do tema e aplicamos 100 × (média − 1) ÷ 4."
      },
      {
        "title": "Uma escala transparente de 0 a 100",
        "desc": "Os sete resultados são independentes. Não precisam somar 100 e quantidades diferentes de perguntas não mudam o máximo."
      }
    ],
    "storageError": "Este navegador não conseguiu salvar o progresso. Você pode continuar respondendo, mas fechar a página pode apagar as novas respostas."
  },
  "ru": {
    "seoTitle": "Как работает Soul Virtues Extractor: вопросы и подсчёт",
    "seoDescription": "Источники 66 вопросов, семь независимых оценок, обратный подсчёт, ограничения результата и сохранение ответов в вашем браузере.",
    "heading": "Вопросы, источники и подсчёт",
    "intro": "Soul Virtues Extractor — бесплатный независимый фанатский тест для самоанализа. В 66 утверждениях рассматриваются семь повседневных тем в оформлении, вдохновлённом Undertale. Это не официальный игровой тест и не клиническая оценка.",
    "sourceTitle": "Откуда взяты вопросы",
    "sourceBody": "Текущий набор адаптирует 56 утверждений IPIP из общественного достояния и добавляет 10 независимо написанных утверждений о Решимости. Материалы выбраны из большого пула, а не из фиксированного теста IPIP на 56 вопросов. Семь групп и формулировки — решения этого сайта.",
    "formulaTitle": "Как вычисляется каждая оценка",
    "formulaSteps": [
      "Выберите один из пяти ответов: от совершенно не согласен (1) до полностью согласен (5).",
      "Для обратного утверждения используется 6 минус ответ. Каждое утверждение относится к одной теме.",
      "Среднее скорректированных ответов по теме переводится по формуле 100 × (среднее − 1) ÷ 4.",
      "Семь оценок независимы. Их сумма не обязана равняться 100, а разное число вопросов не меняет максимум."
    ],
    "readingTitle": "Как читать результат",
    "readingBody": "50 — нейтральная середина этой шкалы ответов. Более высокий балл означает, что ответы соответствуют большему числу утверждений сайта по теме. Это не процентиль населения и не моральная оценка. Полностью нейтральные ответы не имеют ведущей темы. Равные баллы показываются как равные; оценки с разницей до 3 пунктов показаны вместе для удобства чтения, а не как статистический вывод.",
    "limitsTitle": "Что может сказать этот тест",
    "limitsBody": "Это личные ответы на независимо адаптированный тест. Источники из общественного достояния не делают сочетание семи тем валидированным психологическим опросником. Ответы зависят от настроения, опыта и понимания текста. Низкий балл не доказывает отсутствие добродетели, а высокий не оправдывает риск и не позволяет поставить диагноз.",
    "storageTitle": "Версии и локальное сохранение",
    "storageBody": "Ответы вычисляются и сохраняются в этом браузере по стабильным ID вопросов и версии набора. Здесь можно продолжить те же ответы на любом из пяти языков, но между устройствами они не передаются. Старые ответы не применяются к новым утверждениям. Настройки звука сохраняются отдельно.",
    "versionNotice": "В тесте новый набор вопросов. Ответы от прежней версии для него не подходят: начните заново. Настройки звука не изменятся.",
    "ledgerTitle": "Источники каждого утверждения",
    "ledgerIntro": "Откройте список, чтобы проверить текущее утверждение, официальный номер и английский источник IPIP или независимое происхождение. Адаптации не заявляются как точные переводы или неизменённые исходные шкалы.",
    "originalLabel": "Официальный английский источник",
    "adaptedLabel": "Текущее утверждение",
    "directLabel": "Прямой подсчёт",
    "reverseLabel": "Обратный подсчёт",
    "siteLabel": "Независимо написано для этого сайта",
    "ledgerToggle": "Показать все 66 утверждений",
    "editorialTitle": "Издатель и проверка",
    "editorialBody": "Этот независимый сайт поддерживает Tangjei. ИИ помогает с черновиками, переводом и программированием. До публикации совместно проверяются источники, смысл на каждом языке и фактический подсчёт. Исправления можно направить владельцу без личных ответов или сведений о здоровье.",
    "updatedLabel": "Версия набора",
    "methodLink": "Вопросы и метод подсчёта",
    "definitionTitle": "На чём сосредоточен тест",
    "exampleTitle": "Повседневный пример",
    "questionTitle": "Вопрос для размышления",
    "versionTitle": "О толковании V2",
    "closeReading": "Две близкие оценки могут отражать реакции на разные части одной ситуации. Прочитайте оба определения и отметьте, к какой части решения относится каждое. Правило 3 пунктов не доказывает психологически значимой разницы.",
    "freeBody": "Полный результат по семи темам, просмотр ответов и PNG-карточка бесплатны. Учётная запись, оплата и приглашения не нужны.",
    "officialBody": "Это независимый фанатский проект, а не официальный тест Undertale или Deltarune. Красная душа / Решимость — обозначение сообщества: игра явно не называет Решимость официальной чертой Красной души.",
    "faqItems": [
      {
        "q": "Что такое Soul Virtues Extractor?",
        "a": "Soul Virtues Extractor — бесплатный независимый фанатский тест для самоанализа. В 66 утверждениях рассматриваются семь повседневных тем в оформлении, вдохновлённом Undertale. Это не официальный игровой тест и не клиническая оценка."
      },
      {
        "q": "Откуда взяты 66 вопросов?",
        "a": "Текущий набор адаптирует 56 утверждений IPIP из общественного достояния и добавляет 10 независимо написанных утверждений о Решимости. Материалы выбраны из большого пула, а не из фиксированного теста IPIP на 56 вопросов. Семь групп и формулировки — решения этого сайта."
      },
      {
        "q": "Как работает подсчёт?",
        "a": "Выберите один из пяти ответов: от совершенно не согласен (1) до полностью согласен (5). Для обратного утверждения используется 6 минус ответ. Каждое утверждение относится к одной теме. Среднее скорректированных ответов по теме переводится по формуле 100 × (среднее − 1) ÷ 4. Семь оценок независимы. Их сумма не обязана равняться 100, а разное число вопросов не меняет максимум."
      },
      {
        "q": "Могут ли несколько черт получить высокие или равные баллы?",
        "a": "50 — нейтральная середина этой шкалы ответов. Более высокий балл означает, что ответы соответствуют большему числу утверждений сайта по теме. Это не процентиль населения и не моральная оценка. Полностью нейтральные ответы не имеют ведущей темы. Равные баллы показываются как равные; оценки с разницей до 3 пунктов показаны вместе для удобства чтения, а не как статистический вывод."
      },
      {
        "q": "Насколько точен этот тест?",
        "a": "Это личные ответы на независимо адаптированный тест. Источники из общественного достояния не делают сочетание семи тем валидированным психологическим опросником. Ответы зависят от настроения, опыта и понимания текста. Низкий балл не доказывает отсутствие добродетели, а высокий не оправдывает риск и не позволяет поставить диагноз."
      },
      {
        "q": "Можно ли сменить язык или продолжить позже?",
        "a": "Ответы вычисляются и сохраняются в этом браузере по стабильным ID вопросов и версии набора. Здесь можно продолжить те же ответы на любом из пяти языков, но между устройствами они не передаются. Старые ответы не применяются к новым утверждениям. Настройки звука сохраняются отдельно."
      },
      {
        "q": "Полный результат бесплатный?",
        "a": "Полный результат по семи темам, просмотр ответов и PNG-карточка бесплатны. Учётная запись, оплата и приглашения не нужны."
      },
      {
        "q": "Это официальный тест Undertale?",
        "a": "Это независимый фанатский проект, а не официальный тест Undertale или Deltarune. Красная душа / Решимость — обозначение сообщества: игра явно не называет Решимость официальной чертой Красной души."
      }
    ],
    "whyPoints": [
      {
        "title": "Семь оценок в одном полном результате",
        "desc": "Полный результат по семи темам, просмотр ответов и PNG-карточка бесплатны. Учётная запись, оплата и приглашения не нужны."
      },
      {
        "title": "Проверяемые источники вопросов",
        "desc": "Текущий набор адаптирует 56 утверждений IPIP из общественного достояния и добавляет 10 независимо написанных утверждений о Решимости. Материалы выбраны из большого пула, а не из фиксированного теста IPIP на 56 вопросов. Семь групп и формулировки — решения этого сайта."
      },
      {
        "title": "Ответы с учётом ситуации",
        "desc": "50 — нейтральная середина этой шкалы ответов. Более высокий балл означает, что ответы соответствуют большему числу утверждений сайта по теме. Это не процентиль населения и не моральная оценка. Полностью нейтральные ответы не имеют ведущей темы. Равные баллы показываются как равные; оценки с разницей до 3 пунктов показаны вместе для удобства чтения, а не как статистический вывод."
      },
      {
        "title": "Локальный прогресс без регистрации",
        "desc": "Ответы вычисляются и сохраняются в этом браузере по стабильным ID вопросов и версии набора. Здесь можно продолжить те же ответы на любом из пяти языков, но между устройствами они не передаются. Старые ответы не применяются к новым утверждениям. Настройки звука сохраняются отдельно."
      }
    ],
    "scoringCards": [
      {
        "title": "Пять ответов и обратные утверждения",
        "desc": "Выберите один из пяти ответов: от совершенно не согласен (1) до полностью согласен (5). Для обратного утверждения используется 6 минус ответ. Каждое утверждение относится к одной теме."
      },
      {
        "title": "Среднее для каждой темы",
        "desc": "Среднее скорректированных ответов по теме переводится по формуле 100 × (среднее − 1) ÷ 4."
      },
      {
        "title": "Прозрачная шкала от 0 до 100",
        "desc": "Семь оценок независимы. Их сумма не обязана равняться 100, а разное число вопросов не меняет максимум."
      }
    ],
    "storageError": "Браузер не смог сохранить ответы. Можно продолжить, но после закрытия страницы новые ответы могут потеряться."
  }
};
