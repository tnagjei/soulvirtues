// input: Locale and soul slugs for published trait/comparison guides
// output: Verified community reference links and independent reflection examples
// pos: src/data/contentEvidence.ts (更新规则：来源或解读变化需同步本注释与所属目录 README)

import type { Locale } from '../i18n';

export const CONTENT_READING_COPY = {
  en: { sourcesTitle: 'Sources and interpretation', sourcesNote: 'The linked Undertale Wiki pages are community-maintained transcriptions and references, not official endorsements. Game mechanics and item associations can be checked there. Everyday personality examples below are our fan commentary, not biographies of the fallen humans or validated psychological findings.', exampleTitle: 'A practical question to try', comparisonTitle: 'Read both traits through one decision' },
  es: { sourcesTitle: 'Fuentes e interpretación', sourcesNote: 'Las páginas enlazadas de Undertale Wiki son transcripciones y referencias mantenidas por la comunidad, no un aval oficial. Permiten comprobar las mecánicas y asociaciones de objetos. Los ejemplos cotidianos son nuestros comentarios de fans, no biografías de los humanos caídos ni conclusiones psicológicas validadas.', exampleTitle: 'Una pregunta práctica para probar', comparisonTitle: 'Lee ambos rasgos en una misma decisión' },
  ja: { sourcesTitle: '資料と解釈', sourcesNote: 'リンク先の Undertale Wiki はコミュニティが管理する記録と参考資料であり、公式の推薦を示すものではありません。ゲームの仕組みや装備との関係はそこで確認できます。日常の例はこのサイトのファン解釈で、落ちたニンゲンの経歴や検証済みの心理学的知見ではありません。', exampleTitle: '日常で考えてみる問い', comparisonTitle: '同じ判断を2つの特質から考える' },
  pt: { sourcesTitle: 'Fontes e interpretação', sourcesNote: 'As páginas da Undertale Wiki são transcrições e referências mantidas pela comunidade, não um endosso oficial. Nelas você pode verificar mecânicas e associações de itens. Os exemplos cotidianos são nossos comentários de fãs, não biografias dos humanos caídos nem conclusões psicológicas validadas.', exampleTitle: 'Uma pergunta prática para experimentar', comparisonTitle: 'Leia os dois traços em uma mesma decisão' },
  ru: { sourcesTitle: 'Источники и толкование', sourcesNote: 'Ссылки ведут на записи и справочные материалы Undertale Wiki, поддерживаемые сообществом, а не на официальное одобрение. Там можно проверить механику и связь предметов с душами. Бытовые примеры — наши фанатские комментарии, а не биографии упавших людей или подтверждённые психологические выводы.', exampleTitle: 'Практический вопрос для размышления', comparisonTitle: 'Посмотрите на одно решение через обе черты' },
} satisfies Record<Locale, { sourcesTitle: string; sourcesNote: string; exampleTitle: string; comparisonTitle: string }>;

export const SOUL_REFLECTION_PROMPTS = {
  en: {
    determination: 'A project has stalled. Write the outcome you still want, then name one piece of evidence that would make you revise that goal. Trying a new route is different from refusing every possible ending.',
    bravery: 'You want to raise a concern in a group. Choose one small, safe first action, such as asking for a private conversation. Acting while afraid does not require ignoring a real danger.',
    justice: 'A team rule feels unfair. Write the same standard for yourself and for the other person, then check the facts before proposing a consequence. Consistency is different from winning the argument.',
    kindness: 'A friend is struggling. Ask whether they want listening, practical help, or space before taking over. Care is useful when it answers the person’s need rather than your wish to rescue them.',
    patience: 'You are waiting for an answer. Choose a reasonable time to follow up and decide what you can do meanwhile. Waiting deliberately is different from accepting an indefinite delay.',
    integrity: 'A group wants you to say something you do not believe. Write one honest sentence you can say respectfully, and one fact that could change your view. Honesty can coexist with listening.',
    perseverance: 'You keep making the same mistake while learning. Plan the next short practice session and record one change to try. Repetition helps when feedback changes the method, not merely the number of attempts.',
  },
  es: {
    determination: 'Un proyecto se ha estancado. Escribe el resultado que aún quieres y una prueba que te haría revisar ese objetivo. Probar otra vía no es lo mismo que rechazar cualquier desenlace.',
    bravery: 'Quieres plantear una preocupación en un grupo. Elige un primer paso pequeño y seguro, como pedir una conversación privada. Actuar con miedo no exige ignorar un peligro real.',
    justice: 'Una norma del equipo parece injusta. Escribe el mismo criterio para ti y para la otra persona, y comprueba los hechos antes de proponer consecuencias. Ser coherente no es lo mismo que ganar la discusión.',
    kindness: 'Un amigo lo está pasando mal. Pregunta si necesita que lo escuches, ayuda práctica o espacio antes de intervenir. El cuidado sirve cuando responde a su necesidad, no a tu deseo de rescatarlo.',
    patience: 'Esperas una respuesta. Elige un plazo razonable para volver a preguntar y decide qué puedes hacer mientras tanto. Esperar deliberadamente no es aceptar una demora indefinida.',
    integrity: 'Un grupo quiere que digas algo que no crees. Escribe una frase honesta y respetuosa, y un hecho que podría cambiar tu opinión. La honestidad puede convivir con escuchar.',
    perseverance: 'Repites el mismo error al aprender. Planifica una sesión breve y anota un cambio que probarás. Repetir ayuda cuando la información cambia el método, no solo el número de intentos.',
  },
  ja: {
    determination: '計画が進まなくなりました。まだ望んでいる結果と、その目標を見直すきっかけになる証拠を1つ書きましょう。別の方法を試すことと、あらゆる結末を拒むことは違います。',
    bravery: 'グループで心配事を伝えたいとします。個別に話す時間を頼むなど、小さく安全な一歩を選びましょう。怖くても行動することは、本当の危険を無視することではありません。',
    justice: 'チームのルールが不公平に感じられます。自分と相手に同じ基準を書き、対応を提案する前に事実を確かめましょう。一貫した基準を守ることと、議論に勝つことは違います。',
    kindness: '友人が困っています。代わりに行動する前に、話を聞いてほしいのか、具体的な手助けか、そっとしてほしいのかを尋ねましょう。助けたい気持ちより、相手の必要に合わせることが大切です。',
    patience: '返事を待っています。いつ再度連絡するか、待つ間に何ができるかを決めましょう。意図的に待つことと、終わりのない遅れを受け入れることは違います。',
    integrity: '信じていないことを言うようにグループから求められました。敬意を保った正直な一文と、自分の考えを変えうる事実を1つ書きましょう。正直さと人の話を聞くことは両立できます。',
    perseverance: '学ぶときに同じ間違いを繰り返しています。次の短い練習と、試す変更を1つ記録しましょう。回数だけでなく、得た情報で方法を変えることが継続の役に立ちます。',
  },
  pt: {
    determination: 'Um projeto parou de avançar. Escreva o resultado que ainda deseja e uma evidência que faria você rever essa meta. Tentar outro caminho é diferente de recusar qualquer desfecho.',
    bravery: 'Você quer falar sobre um problema no grupo. Escolha uma primeira ação pequena e segura, como pedir uma conversa particular. Agir com medo não exige ignorar um perigo real.',
    justice: 'Uma regra da equipe parece injusta. Escreva o mesmo critério para você e para a outra pessoa e verifique os fatos antes de propor consequências. Coerência é diferente de ganhar a discussão.',
    kindness: 'Um amigo está passando por dificuldades. Pergunte se ele quer ser ouvido, ajuda prática ou espaço antes de assumir o controle. Cuidar é atender à necessidade dele, não ao seu desejo de resgatá-lo.',
    patience: 'Você espera uma resposta. Defina um prazo razoável para perguntar de novo e o que pode fazer enquanto isso. Esperar deliberadamente é diferente de aceitar um atraso sem fim.',
    integrity: 'Um grupo quer que você diga algo em que não acredita. Escreva uma frase honesta e respeitosa e um fato que poderia mudar sua opinião. Honestidade pode coexistir com escuta.',
    perseverance: 'Você repete o mesmo erro ao aprender. Planeje a próxima sessão curta e registre uma mudança para testar. A repetição ajuda quando o retorno muda o método, não só o número de tentativas.',
  },
  ru: {
    determination: 'Проект остановился. Запишите желаемый результат и один факт, который заставил бы пересмотреть цель. Поиск другого пути отличается от отказа принять любой исход.',
    bravery: 'Вы хотите высказать сомнение в группе. Выберите небольшой безопасный первый шаг, например попросите о личном разговоре. Действовать несмотря на страх не значит игнорировать реальную опасность.',
    justice: 'Правило команды кажется несправедливым. Запишите одинаковый критерий для себя и другого человека и проверьте факты до предложения последствий. Последовательность отличается от победы в споре.',
    kindness: 'Другу тяжело. Спросите, нужны ли ему внимание, практическая помощь или время наедине, прежде чем брать всё на себя. Забота отвечает его потребности, а не вашему желанию спасти его.',
    patience: 'Вы ждёте ответа. Назначьте разумный срок для повторного вопроса и решите, что делать в ожидании. Осознанное ожидание отличается от согласия на бесконечную задержку.',
    integrity: 'Группа хочет, чтобы вы сказали то, во что не верите. Запишите честную уважительную фразу и факт, который мог бы изменить ваше мнение. Честность совместима с умением слушать.',
    perseverance: 'Во время обучения вы повторяете одну ошибку. Запланируйте короткую практику и запишите одно изменение для проверки. Повторение полезно, когда обратная связь меняет метод, а не только число попыток.',
  },
} satisfies Record<Locale, Record<string, string>>;

export function getContentReferences(slugs: string[]) {
  const references = [
    { title: 'Undertale Wiki — Eight humans: SOUL traits, items and modes', url: 'https://undertale.wiki/w/Eight_humans' },
    { title: 'Undertale Wiki — SOUL: game context', url: 'https://undertale.wiki/w/SOUL' },
  ];
  if (slugs.includes('determination')) references.push({
    title: 'Undertale Wiki — Determination: persistence and SAVE',
    url: 'https://undertale.wiki/w/Determination',
  });
  return references;
}
