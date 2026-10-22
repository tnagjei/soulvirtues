// input: Current V2 questions and the same scorer used by the free quiz
// output: One public synthetic worked example, a neutral reference and five-language explanations
// pos: src/data/scoringExample.ts（更新规则：题库或示例变化同步方法页、所属目录 README 与专项检查）

import { QUESTIONS } from './questions';
import { computeScores } from './scoring';

// Unlisted items deliberately use Neutral; these are invented responses, never browser answers.
const responses: Record<string, number> = { 'V2-BRV-01': 4, 'V2-BRV-03': 0 };
const answers = QUESTIONS.map(question => responses[question.id] ?? 2);
const result = computeScores(answers, QUESTIONS);
const itemCount = QUESTIONS.filter(question => question.trait === 'BRV').length;

export const SCORING_EXAMPLE = {
  answers,
  result,
  itemCount,
  totalKeyed: 3 * itemCount + result.raw.BRV,
  neutralCount: QUESTIONS.length - Object.keys(responses).length,
  changed: result.contributions.map(item => ({
    id: QUESTIONS[item.questionIndex].id,
    index: item.questionIndex,
    answer: item.answerIndex,
    keyed: item.points + 3,
    reverse: QUESTIONS[item.questionIndex].reverse,
  })),
};

export const NEUTRAL_EXAMPLE = computeScores(QUESTIONS.map(() => 2), QUESTIONS);

export const SCORING_EXAMPLE_COPY = {
  en: {
    link: 'See a worked scoring example',
    title: 'From two answers to a seven-score result',
    notice: 'Synthetic example: invented answers for explanation, not a real person or population sample.',
    intro: 'Only the two statements below differ from Neutral. All other {count} statements receive Neutral (3), so you can check exactly what changes.',
    response: 'Example response', keyed: 'Value used in the average',
    calculation: 'Calculate the Bravery score',
    calculationBody: 'The two shown responses each contribute 5 after scoring. The other Bravery statements each contribute 3. Average all statements in this theme, then apply the same formula used by the quiz.',
    result: 'The complete example result',
    reading: 'Bravery is the only score that changes. This shows how the selected statements affect this answer scale; it does not establish how brave this person is compared with anyone else.',
    neutralTitle: 'What if every answer were Neutral?',
    neutralBody: 'All seven scores would be 50 / 100, with no leading theme. Equal scores above the midpoint are shown as tied; leading scores within 3 points are displayed together. That display rule is not a test of psychological significance.',
    practiceTitle: 'Use the result as a question',
    practiceBody: 'Recall one recent situation where the first statement fitted and one where it did not. Write down what was different. A score alone cannot explain the context or justify taking an unsafe risk.',
  },
  ja: {
    link: '具体的な採点例を見る',
    title: '2つの回答から7つの得点になるまで',
    notice: '説明用の架空の回答例です。実在の人の回答や集団のデータではありません。',
    intro: '下の2項目だけ「どちらでもない」以外で回答します。残りの{count}項目はすべて「どちらでもない」（3）として、変化を確認します。',
    response: '例の回答', keyed: '平均に使う値',
    calculation: 'ゆうきの得点を計算する',
    calculationBody: '表示した2項目は採点後にそれぞれ5、同じテーマの残りの項目はそれぞれ3です。このテーマの全項目を平均し、テストと同じ式を使います。',
    result: '例の7つの得点',
    reading: '変わるのは「ゆうき」だけです。選んだ回答がこの得点尺度にどう反映されるかを示す例で、他の人より勇敢かどうかは判断できません。',
    neutralTitle: 'すべて「どちらでもない」なら？',
    neutralBody: '7つとも50 / 100になり、先頭のテーマはありません。中点より高い同点は同点として、先頭の2得点が3点以内なら両方を表示します。この表示ルールは心理学的な有意差の検定ではありません。',
    practiceTitle: '結果を問いとして使う',
    practiceBody: '最初の文が当てはまった最近の場面と、当てはまらなかった場面を1つずつ思い出し、何が違ったかを書きましょう。得点だけでは状況を説明できず、危険を冒す根拠にもなりません。',
  },
  es: {
    link: 'Ver un ejemplo de puntuación',
    title: 'De dos respuestas a siete puntuaciones',
    notice: 'Ejemplo sintético: respuestas inventadas para explicar el cálculo, no datos de una persona real ni de una población.',
    intro: 'Solo las dos afirmaciones de abajo tienen una respuesta distinta de Neutral. Las otras {count} reciben Neutral (3), para que puedas comprobar qué cambia.',
    response: 'Respuesta del ejemplo', keyed: 'Valor usado en la media',
    calculation: 'Calcular la puntuación de Valentía',
    calculationBody: 'Las dos respuestas mostradas aportan 5 cada una después de puntuarlas. Las otras afirmaciones de Valentía aportan 3 cada una. Se calcula la media de todas las afirmaciones de este tema y se aplica la misma fórmula del test.',
    result: 'Las siete puntuaciones del ejemplo',
    reading: 'Solo cambia Valentía. El ejemplo muestra cómo influyen esas respuestas en esta escala; no demuestra cuán valiente es la persona frente a otras.',
    neutralTitle: '¿Y si todas las respuestas fueran Neutral?',
    neutralBody: 'Las siete puntuaciones serían 50 / 100, sin un tema principal. Las puntuaciones iguales por encima del punto medio se muestran empatadas; las dos primeras se muestran juntas si distan hasta 3 puntos. Esta regla visual no demuestra significación psicológica.',
    practiceTitle: 'Usar el resultado como una pregunta',
    practiceBody: 'Recuerda una situación reciente en la que encajaba la primera afirmación y otra en la que no. Anota qué cambió. Una puntuación por sí sola no explica el contexto ni justifica correr un riesgo inseguro.',
  },
  pt: {
    link: 'Ver um exemplo de pontuação',
    title: 'De duas respostas a sete pontuações',
    notice: 'Exemplo sintético: respostas inventadas para explicar o cálculo, não dados de uma pessoa real ou de uma população.',
    intro: 'Somente as duas afirmações abaixo têm uma resposta diferente de Neutro. As outras {count} recebem Neutro (3), para que você possa conferir o que muda.',
    response: 'Resposta do exemplo', keyed: 'Valor usado na média',
    calculation: 'Calcular a pontuação de Bravura',
    calculationBody: 'As duas respostas mostradas contribuem com 5 cada uma após a pontuação. As outras afirmações de Bravura contribuem com 3 cada uma. Calcula-se a média de todas as afirmações desse tema e aplica-se a mesma fórmula do teste.',
    result: 'As sete pontuações do exemplo',
    reading: 'Somente Bravura muda. O exemplo mostra como essas respostas afetam esta escala; não estabelece o quanto uma pessoa é corajosa em comparação com outras.',
    neutralTitle: 'E se todas as respostas fossem Neutro?',
    neutralBody: 'As sete pontuações seriam 50 / 100, sem tema principal. Pontuações iguais acima do ponto médio aparecem empatadas; as duas primeiras aparecem juntas quando diferem em até 3 pontos. Essa regra visual não é um teste de significância psicológica.',
    practiceTitle: 'Usar o resultado como uma pergunta',
    practiceBody: 'Lembre uma situação recente em que a primeira afirmação se aplicava e outra em que não. Anote o que mudou. Uma pontuação sozinha não explica o contexto nem justifica assumir um risco inseguro.',
  },
  ru: {
    link: 'Посмотреть пример расчёта',
    title: 'От двух ответов к семи баллам',
    notice: 'Условный пример: вымышленные ответы для объяснения расчёта, не данные реального человека или населения.',
    intro: 'Только два утверждения ниже получают ответ, отличный от нейтрального. Остальные {count} получают «Нейтрально» (3), чтобы можно было проверить изменения.',
    response: 'Ответ в примере', keyed: 'Значение для среднего',
    calculation: 'Рассчитать балл Храбрости',
    calculationBody: 'После подсчёта каждый из двух показанных ответов даёт 5. Остальные утверждения Храбрости дают по 3. Среднее по всем утверждениям этой темы переводится в балл по той же формуле, что и в тесте.',
    result: 'Все семь баллов примера',
    reading: 'Меняется только Храбрость. Это показывает влияние выбранных ответов на данную шкалу, но не определяет, насколько человек смелее других.',
    neutralTitle: 'Что, если все ответы нейтральные?',
    neutralBody: 'Все семь баллов будут равны 50 / 100, без ведущей темы. Равные баллы выше середины показываются как равные; два ведущих результата в пределах 3 баллов отображаются вместе. Это правило отображения не является проверкой психологической значимости.',
    practiceTitle: 'Использовать результат как вопрос',
    practiceBody: 'Вспомните одну недавнюю ситуацию, где первое утверждение подходило, и одну, где нет. Запишите различия. Один балл не объясняет контекст и не оправдывает небезопасный риск.',
  },
} as const;
