// input: None (approved determination-versus-perseverance comparison copy in four locales)
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
      seoDescription: 'Compare Determination and Perseverance in Undertale: desired outcomes vs steady routines, game evidence, real-life examples, and a dual-trait profile.',
      eyebrow: 'SOUL TRAIT COMPARISON',
      heading: 'Determination vs Perseverance',
      intro: 'Both traits can look like “never giving up,” but they keep a person moving for different reasons. Determination rejects an unwanted ending. Perseverance continues through method, repetition, and discipline.',
      quickAnswerLabel: 'QUICK ANSWER',
      quickAnswer: 'Determination rejects the ending; Perseverance keeps the routine.',
      matrixTitle: 'The Core Difference',
      leftLabel: 'Determination',
      rightLabel: 'Perseverance',
      gameEvidenceLabel: 'Game evidence',
      interpretationLabel: 'Interpretation',
      rows: [
        {
          label: 'Primary drive',
          left: 'A strong refusal to accept the current outcome.',
          right: 'A commitment to keep following a process.',
          evidence: 'interpretation',
        },
        {
          label: 'After failure',
          left: 'Returns because the ending still feels unacceptable.',
          right: 'Returns because the work is part of an established routine.',
          evidence: 'interpretation',
        },
        {
          label: 'When motivation fades',
          left: 'The desired result can reignite another attempt.',
          right: 'Habits, notes, and repetition carry the work forward.',
          evidence: 'interpretation',
        },
        {
          label: 'Undertale evidence',
          left: 'Determination is directly tied to human persistence, SAVE, and the ability to continue after death.',
          right: 'Perseverance is named by the Snowdin Ball Game, whose purple result emphasizes continuing and taking notes.',
          evidence: 'game',
        },
        {
          label: 'Best expression',
          left: 'Recovering after a major setback and trying again.',
          right: 'Making steady progress through a difficult long-term task.',
          evidence: 'interpretation',
        },
        {
          label: 'Possible blind spot',
          left: 'Refusing to accept when a goal should change.',
          right: 'Following a routine after it has stopped producing value.',
          evidence: 'interpretation',
        },
      ],
      differenceTitle: 'Why These Traits Are Easy to Confuse',
      differenceParagraphs: [
        'From the outside, both people may keep working after everyone else stops. The difference is not how long they continue; it is what keeps them continuing. A determined person is pulled by the ending they still want. A persevering person is supported by a repeatable way of working.',
        'Imagine failing an exam. Determination says, “I do not accept this result; I will pass.” Perseverance says, “I will study two hours each day, record every mistake, and take the exam again.” One response protects the goal. The other protects the process.',
        'Neither trait is automatically better. Determination without review can become fixation. Perseverance without review can become empty repetition. Healthy persistence checks both the destination and the method.',
      ],
      scenariosTitle: 'Same Challenge, Different Response',
      scenarios: [
        {
          title: 'A project fails at launch',
          left: 'Reframes the failure as another attempt and returns to the desired outcome.',
          right: 'Reviews the failure, updates the checklist, and resumes a regular work cycle.',
        },
        {
          title: 'Progress becomes invisible',
          left: 'Keeps going because abandoning the ending feels impossible.',
          right: 'Keeps going because the next scheduled step is already clear.',
        },
        {
          title: 'The plan stops working',
          left: 'May change tactics quickly while protecting the same goal.',
          right: 'May study the pattern carefully before adjusting the routine.',
        },
      ],
      hybridTitle: 'If Both Scores Are High',
      hybridIntro: 'A high Determination and Perseverance combination suggests someone who can protect a difficult goal and support it with repeated action. This is a trait interpretation, not a medical or psychological diagnosis.',
      strengthsTitle: 'Likely strengths',
      strengths: [
        'Turns strong intentions into consistent work.',
        'Recovers from setbacks without losing the larger goal.',
        'Can combine emotional commitment with practical systems.',
      ],
      risksTitle: 'Possible risks',
      risks: [
        'Overworking because both the goal and routine are hard to release.',
        'Continuing after evidence suggests a different direction.',
        'Treating rest as failure instead of part of sustainable progress.',
      ],
      evidenceTitle: 'Canon and Community Interpretation',
      evidenceBody: 'The game does not explicitly name the red SOUL trait Determination. Determination itself is canonically established as a power or substance produced by human SOULs, while Perseverance is one of the six traits named by the Snowdin Ball Game. This page uses the common community label “Red SOUL / Determination” for search clarity, but it does not present that label as confirmed canon.',
      testTitle: 'Which Pattern Drives You?',
      testBody: 'Take the 66-question Soul Virtues test to compare your Determination and Perseverance scores, then return here to interpret the difference.',
      testButton: 'TAKE THE SOUL VIRTUES TEST',
      exploreLabel: 'Read the complete trait guide',
      breadcrumbCompare: 'Comparisons',
    },
    ja: {
      seoTitle: 'Undertale ケツイとふくつの違い',
      seoDescription: 'Undertaleのケツイとふくつを比較。望む結末を諦めない力と、習慣や方法を続ける力の違い、ゲーム内根拠、複合タイプを解説。',
      eyebrow: 'ソウル特質比較',
      heading: 'ケツイ vs ふくつ',
      intro: 'どちらも「諦めない」と見えますが、前へ進む理由が違います。ケツイは望まない結末を拒み、ふくつは方法・反復・規律によって歩みを続けます。',
      quickAnswerLabel: 'ひとことで言うと',
      quickAnswer: 'ケツイは結末を諦めず、ふくつは習慣を止めません。',
      matrixTitle: '本質的な違い',
      leftLabel: 'ケツイ',
      rightLabel: 'ふくつ',
      gameEvidenceLabel: 'ゲーム内根拠',
      interpretationLabel: 'サイト独自の解釈',
      rows: [
        { label: '原動力', left: '今の結果を受け入れたくない強い意志。', right: '決めた手順を続けるという約束。', evidence: 'interpretation' },
        { label: '失敗した後', left: '望む結末ではないから、もう一度戻る。', right: '作業が習慣になっているから、もう一度戻る。', evidence: 'interpretation' },
        { label: 'やる気が消えた時', left: '欲しい結果が再挑戦の火をつける。', right: '習慣、記録、反復が作業を前に進める。', evidence: 'interpretation' },
        { label: 'Undertaleでの根拠', left: 'ケツイは人間の持続、SAVE、死後も続ける力と直接結びつく。', right: 'ふくつはスノーフルのボールゲームで明示され、紫の結果は継続と記録を強調する。', evidence: 'game' },
        { label: '強みが出る場面', left: '大きな失敗から立ち直り、再挑戦する時。', right: '難しい長期課題を少しずつ進める時。', evidence: 'interpretation' },
        { label: '注意点', left: '変えるべき目標まで手放せなくなる。', right: '価値を失った習慣まで続けてしまう。', evidence: 'interpretation' },
      ],
      differenceTitle: 'なぜ混同しやすいのか',
      differenceParagraphs: [
        '外から見ると、どちらも他の人が止めた後まで努力を続けます。違いは継続時間ではなく、継続を支えるものです。ケツイはまだ望んでいる結末に引かれ、ふくつは繰り返せる方法に支えられます。',
        '試験に落ちた場面なら、ケツイは「この結果は受け入れない。必ず合格する」と考えます。ふくつは「毎日2時間勉強し、間違いを記録して、もう一度受ける」と考えます。',
        'どちらが常に優れているわけではありません。見直しのないケツイは執着に、見直しのないふくつは意味のない反復になり得ます。',
      ],
      scenariosTitle: '同じ問題への違う反応',
      scenarios: [
        { title: '公開した企画が失敗した', left: '失敗を次の挑戦として捉え、望む結果へ戻る。', right: '失敗を分析し、チェックリストを直して作業周期を再開する。' },
        { title: '進歩が見えない', left: '結末を諦めることができないため続ける。', right: '次にすることが決まっているため続ける。' },
        { title: '計画が機能しない', left: '目標を守りながら、手段を素早く変える。', right: '傾向を記録してから、習慣を調整する。' },
      ],
      hybridTitle: '両方のスコアが高い場合',
      hybridIntro: '難しい目標を守る力と、反復行動で支える力を併せ持つ傾向があります。これは特質の解釈であり、医学的・心理学的診断ではありません。',
      strengthsTitle: '考えられる強み',
      strengths: ['強い意志を継続的な行動に変えられる。', '失敗しても大きな目標を失わない。', '感情的な覚悟と実用的な仕組みを組み合わせられる。'],
      risksTitle: '考えられるリスク',
      risks: ['目標も習慣も手放せず、働きすぎる。', '方向転換すべき証拠があっても続ける。', '休息を持続の一部ではなく失敗と捉える。'],
      evidenceTitle: '公式設定とコミュニティ解釈',
      evidenceBody: 'ゲームは赤いソウルの特質を「ケツイ」と明言していません。ケツイは人間のソウルが生み出す力・物質として公式に描かれ、ふくつはスノーフルのボールゲームで示される6特質の一つです。このページは検索上分かりやすい一般的な「赤いソウル／ケツイ」という呼び方を使いますが、公式確定設定としては扱いません。',
      testTitle: 'あなたを動かすのはどちら？',
      testBody: '66問のソウル特質テストでケツイとふくつの割合を比べ、その違いをこのページで確認できます。',
      testButton: '66問のソウル特質テストを受ける',
      exploreLabel: '特質の完全ガイドを見る',
      breadcrumbCompare: '比較',
    },
    es: {
      seoTitle: 'Determinación vs Perseverancia en Undertale',
      seoDescription: 'Compara Determinación y Perseverancia en Undertale: resultado deseado frente a rutina constante, evidencia del juego, ejemplos y perfil combinado.',
      eyebrow: 'COMPARACIÓN DE RASGOS DEL ALMA',
      heading: 'Determinación vs Perseverancia',
      intro: 'Ambos rasgos pueden parecer “no rendirse”, pero mantienen a una persona en movimiento por motivos distintos. La Determinación rechaza un final no deseado. La Perseverancia continúa mediante método, repetición y disciplina.',
      quickAnswerLabel: 'RESPUESTA RÁPIDA',
      quickAnswer: 'La Determinación rechaza el final; la Perseverancia mantiene la rutina.',
      matrixTitle: 'La Diferencia Central',
      leftLabel: 'Determinación',
      rightLabel: 'Perseverancia',
      gameEvidenceLabel: 'Evidencia del juego',
      interpretationLabel: 'Interpretación',
      rows: [
        { label: 'Impulso principal', left: 'Negarse a aceptar el resultado actual.', right: 'Comprometerse a seguir un proceso.', evidence: 'interpretation' },
        { label: 'Después del fracaso', left: 'Regresa porque el final sigue siendo inaceptable.', right: 'Regresa porque el trabajo forma parte de una rutina.', evidence: 'interpretation' },
        { label: 'Cuando desaparece la motivación', left: 'El resultado deseado enciende otro intento.', right: 'Los hábitos, las notas y la repetición sostienen el trabajo.', evidence: 'interpretation' },
        { label: 'Evidencia en Undertale', left: 'La Determinación se vincula directamente con la persistencia humana, SAVE y continuar después de la muerte.', right: 'La Perseverancia aparece en el Juego de Pelota de Snowdin; el resultado morado destaca continuar y tomar notas.', evidence: 'game' },
        { label: 'Mejor expresión', left: 'Recuperarse de un gran revés y volver a intentarlo.', right: 'Avanzar de forma constante en una tarea difícil y larga.', evidence: 'interpretation' },
        { label: 'Punto ciego', left: 'No aceptar que una meta debe cambiar.', right: 'Mantener una rutina que ya no aporta valor.', evidence: 'interpretation' },
      ],
      differenceTitle: 'Por Qué Se Confunden',
      differenceParagraphs: [
        'Desde fuera, ambas personas siguen trabajando cuando los demás se detienen. La diferencia no es cuánto continúan, sino qué sostiene esa continuidad. La persona determinada es atraída por el final que todavía desea; la perseverante se apoya en una forma repetible de trabajar.',
        'Tras suspender un examen, la Determinación dice: “No acepto este resultado; aprobaré”. La Perseverancia dice: “Estudiaré dos horas al día, registraré cada error y volveré a presentarme”. Una protege la meta; la otra protege el proceso.',
        'Ningún rasgo es siempre mejor. La Determinación sin revisión puede volverse obsesión. La Perseverancia sin revisión puede convertirse en repetición vacía.',
      ],
      scenariosTitle: 'Mismo Reto, Respuesta Distinta',
      scenarios: [
        { title: 'Un proyecto fracasa al lanzarse', left: 'Convierte el fracaso en otro intento y vuelve al resultado deseado.', right: 'Analiza el fallo, actualiza la lista y reanuda el ciclo de trabajo.' },
        { title: 'El progreso deja de verse', left: 'Continúa porque abandonar el final parece imposible.', right: 'Continúa porque el siguiente paso programado está claro.' },
        { title: 'El plan deja de funcionar', left: 'Cambia de táctica rápidamente sin abandonar la meta.', right: 'Estudia el patrón antes de ajustar la rutina.' },
      ],
      hybridTitle: 'Si Ambas Puntuaciones Son Altas',
      hybridIntro: 'La combinación sugiere capacidad para proteger una meta difícil y sostenerla con acciones repetidas. Es una interpretación de rasgos, no un diagnóstico médico ni psicológico.',
      strengthsTitle: 'Fortalezas probables',
      strengths: ['Convierte intenciones fuertes en trabajo constante.', 'Se recupera sin perder la meta general.', 'Combina compromiso emocional con sistemas prácticos.'],
      risksTitle: 'Riesgos posibles',
      risks: ['Trabajar en exceso porque cuesta soltar la meta y la rutina.', 'Continuar aunque la evidencia aconseje otra dirección.', 'Tratar el descanso como fracaso.'],
      evidenceTitle: 'Canon e Interpretación de la Comunidad',
      evidenceBody: 'El juego no nombra explícitamente Determinación al rasgo del Alma Roja. La Determinación sí está establecida como poder o sustancia producida por las almas humanas, mientras que Perseverancia es uno de los seis rasgos nombrados por el Juego de Pelota de Snowdin. Esta página usa la etiqueta comunitaria “Alma Roja / Determinación” para facilitar la búsqueda, sin presentarla como canon confirmado.',
      testTitle: '¿Qué Patrón Te Impulsa?',
      testBody: 'Realiza el test de 66 preguntas para comparar tus puntuaciones de Determinación y Perseverancia.',
      testButton: 'HACER EL TEST DE VIRTUDES DEL ALMA',
      exploreLabel: 'Leer la guía completa del rasgo',
      breadcrumbCompare: 'Comparaciones',
    },
    pt: {
      seoTitle: 'Determinação vs Perseverança em Undertale',
      seoDescription: 'Compare Determinação e Perseverança em Undertale: resultado desejado versus rotina constante, evidências do jogo, exemplos e perfil combinado.',
      eyebrow: 'COMPARAÇÃO DE TRAÇOS DA ALMA',
      heading: 'Determinação vs Perseverança',
      intro: 'Os dois traços podem parecer “nunca desistir”, mas mantêm uma pessoa em movimento por motivos diferentes. A Determinação rejeita um final indesejado. A Perseverança continua por método, repetição e disciplina.',
      quickAnswerLabel: 'RESPOSTA RÁPIDA',
      quickAnswer: 'A Determinação rejeita o final; a Perseverança mantém a rotina.',
      matrixTitle: 'A Diferença Central',
      leftLabel: 'Determinação',
      rightLabel: 'Perseverança',
      gameEvidenceLabel: 'Evidência do jogo',
      interpretationLabel: 'Interpretação',
      rows: [
        { label: 'Impulso principal', left: 'Recusar o resultado atual.', right: 'Comprometer-se a seguir um processo.', evidence: 'interpretation' },
        { label: 'Depois do fracasso', left: 'Volta porque o final ainda é inaceitável.', right: 'Volta porque o trabalho faz parte de uma rotina.', evidence: 'interpretation' },
        { label: 'Quando a motivação some', left: 'O resultado desejado acende outra tentativa.', right: 'Hábitos, anotações e repetição sustentam o trabalho.', evidence: 'interpretation' },
        { label: 'Evidência em Undertale', left: 'A Determinação se liga diretamente à persistência humana, SAVE e continuar após a morte.', right: 'A Perseverança aparece no Jogo da Bola de Snowdin; o resultado roxo destaca continuar e fazer anotações.', evidence: 'game' },
        { label: 'Melhor expressão', left: 'Recuperar-se de um grande revés e tentar novamente.', right: 'Avançar constantemente em uma tarefa difícil e longa.', evidence: 'interpretation' },
        { label: 'Ponto cego', left: 'Não aceitar quando uma meta precisa mudar.', right: 'Manter uma rotina que deixou de gerar valor.', evidence: 'interpretation' },
      ],
      differenceTitle: 'Por Que Esses Traços se Confundem',
      differenceParagraphs: [
        'Por fora, as duas pessoas continuam quando todos param. A diferença não é por quanto tempo seguem, mas o que sustenta a continuidade. A pessoa determinada é puxada pelo final que ainda deseja; a perseverante é apoiada por uma forma repetível de trabalhar.',
        'Depois de reprovar em uma prova, a Determinação diz: “Não aceito este resultado; vou passar”. A Perseverança diz: “Vou estudar duas horas por dia, registrar cada erro e tentar novamente”. Uma protege a meta; a outra protege o processo.',
        'Nenhum traço é sempre melhor. Determinação sem revisão pode virar fixação. Perseverança sem revisão pode virar repetição vazia.',
      ],
      scenariosTitle: 'Mesmo Desafio, Resposta Diferente',
      scenarios: [
        { title: 'Um projeto falha no lançamento', left: 'Transforma a falha em outra tentativa e volta ao resultado desejado.', right: 'Analisa a falha, atualiza a lista e retoma o ciclo de trabalho.' },
        { title: 'O progresso fica invisível', left: 'Continua porque abandonar o final parece impossível.', right: 'Continua porque o próximo passo programado está claro.' },
        { title: 'O plano para de funcionar', left: 'Muda de tática rapidamente sem abandonar a meta.', right: 'Estuda o padrão antes de ajustar a rotina.' },
      ],
      hybridTitle: 'Se as Duas Pontuações Forem Altas',
      hybridIntro: 'A combinação sugere capacidade de proteger uma meta difícil e sustentá-la com ações repetidas. É uma interpretação de traços, não um diagnóstico médico ou psicológico.',
      strengthsTitle: 'Pontos fortes prováveis',
      strengths: ['Transforma intenções fortes em trabalho consistente.', 'Recupera-se sem perder a meta maior.', 'Combina compromisso emocional com sistemas práticos.'],
      risksTitle: 'Riscos possíveis',
      risks: ['Trabalhar demais porque é difícil soltar a meta e a rotina.', 'Continuar mesmo quando as evidências indicam outra direção.', 'Tratar descanso como fracasso.'],
      evidenceTitle: 'Cânone e Interpretação da Comunidade',
      evidenceBody: 'O jogo não nomeia explicitamente Determinação como o traço da Alma Vermelha. A Determinação é estabelecida como poder ou substância produzida pelas almas humanas, enquanto Perseverança é um dos seis traços citados no Jogo da Bola de Snowdin. Esta página usa o rótulo comunitário “Alma Vermelha / Determinação” para facilitar a busca, sem apresentá-lo como cânone confirmado.',
      testTitle: 'Qual Padrão Move Você?',
      testBody: 'Faça o teste de 66 perguntas para comparar suas pontuações de Determinação e Perseverança.',
      testButton: 'FAZER O TESTE DE VIRTUDES DA ALMA',
      exploreLabel: 'Ler o guia completo do traço',
      breadcrumbCompare: 'Comparações',
    },
    ru: {
      seoTitle: 'Решимость против Настойчивости в Undertale - Сравнение душ',
      seoDescription: 'Сравнение Решимости и Настойчивости в Undertale: отказ от поражения против дисциплины и привычки, игровые факты и комбинированный профиль.',
      eyebrow: 'СРАВНЕНИЕ ЧЕРТ ДУШИ',
      heading: 'Решимость против Настойчивости',
      intro: 'Обе черты ассоциируются с понятием «никогда не сдаваться», но движут человеком по разным причинам. Решимость отвергает неприемлемый финал. Настойчивость продолжает движение благодаря методу, повторению и дисциплине.',
      quickAnswerLabel: 'КРАТКИЙ ОТВЕТ',
      quickAnswer: 'Решимость отвергает поражение; Настойчивость держит ритм.',
      matrixTitle: 'Ключевое различие',
      leftLabel: 'Решимость',
      rightLabel: 'Настойчивость',
      gameEvidenceLabel: 'Игровые факты',
      interpretationLabel: 'Интерпретация',
      rows: [
        { label: 'Главный импульс', left: 'Отказ смириться с текущим исходом.', right: 'Следование выбранному процессу.', evidence: 'interpretation' },
        { label: 'После неудачи', left: 'Возвращается, потому что поражение недопустимо.', right: 'Возвращается, потому что работа — часть заведённого порядка.', evidence: 'interpretation' },
        { label: 'Когда угасает мотивация', left: 'Желаемый финал вновь разжигает попытку.', right: 'Привычки, конспекты и повторение поддерживают работу.', evidence: 'interpretation' },
        { label: 'Факты в Undertale', left: 'Решимость связана со способностью сохраняться (SAVE) и жить после смерти.', right: 'Настойчивость описана в гольфе Сноудина: фиолетовый результат подчёркивает упорство и конспекты.', evidence: 'game' },
        { label: 'Сильнейшее проявление', left: 'Подняться после сокрушительного удара и пробовать снова.', right: 'Неуклонный прогресс в долгой и сложной задаче.', evidence: 'interpretation' },
        { label: 'Слепая зона', left: 'Неспособность вовремя скорректировать цель.', right: 'Следование рутине, которая перестала приносить пользу.', evidence: 'interpretation' },
      ],
      differenceTitle: 'Почему эти черты легко спутать',
      differenceParagraphs: [
        'Со стороны оба человека продолжают путь, когда остальные опустили руки. Разница кроется в источнике этой стойкости. Человеком Решимости движет цель, которую он не готов отпустить; человеком Настойчивости — налаженная система действий.',
        'После провала на экзамене Решимость скажет: «Я не приму этот провал, я всё равно сдам». Настойчивость скажет: «Я буду заниматься по 2 часа в день, разберу ошибки и пересдам». Одна защищает цель, другая защищает процесс.',
        'Ни одна из черт не лучше другой. Решимость без гибкости рискует стать слепым упрямством. Настойчивость без рефлексии — бессмысленным повторением.',
      ],
      scenariosTitle: 'Одно испытание — две разные реакции',
      scenarios: [
        { title: 'Проект провалился на старте', left: 'Превращает провал в новую попытку и снова рвётся к цели.', right: 'Анализирует ошибки, обновляет план и возобновляет рабочий цикл.' },
        { title: 'Прогресс долго не виден', left: 'Продолжает, потому что бросить цель кажется немыслимым.', right: 'Продолжает, потому что понятен следующий шаг в расписании.' },
        { title: 'План перестал работать', left: 'Быстро меняет тактику, не отказываясь от конечной цели.', right: 'Изучает систему, прежде чем аккуратно подправить рутину.' },
      ],
      hybridTitle: 'Если обе шкалы высоки',
      hybridIntro: 'Такая комбинация говорит о способности ставить амбициозные цели и методично добиваться их ежедневным трудом.',
      strengthsTitle: 'Вероятные сильные стороны',
      strengths: ['Превращает сильные намерения в системную работу.', 'Умеет восстанавливаться после сбоев без потери глобальной цели.', 'Сочетает эмоциональную вовлечённость с практической дисциплиной.'],
      risksTitle: 'Возможные риски',
      risks: ['Переутомление из-за сложности отпустить цель или прервать рутину.', 'Продолжение движения даже тогда, когда обстоятельства требуют смены направления.', 'Восприятие отдыха как слабости или поражения.'],
      evidenceTitle: 'Канон и фанатская интерпретация',
      evidenceBody: 'В оригинальной игре Undertale черта Красной Души прямо не названа Решимостью. Решимость описана как субстанция и сила человеческих душ. Название «Красная Душа / Решимость» используется как общепринятый ориентир сообщества.',
      testTitle: 'Какая черта движет вами?',
      testBody: 'Пройдите тест из 66 вопросов, чтобы сравнить ваш уровень Решимости и Настойчивости.',
      testButton: 'ПРОЙТИ ТЕСТ ДОБРОДЕТЕЛЕЙ ДУШИ',
      exploreLabel: 'Читать полный гид по черте души',
      breadcrumbCompare: 'Сравнения',
    },
  },
};
