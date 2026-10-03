// input: Live V2 question bank, all locales, scoring, storage and quiz privacy wiring
// output: Regression failures for scoring direction, source coverage, session migration or privacy
// pos: scripts/verify_scoring.cjs (更新规则：题库/评分/存储变化需同步本脚本与所属目录 README)

const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { build } = require('esbuild');

(async () => {
  const bundle = await build({
    stdin: { contents: "import * as bank from './src/data/questions'; import * as scoring from './src/data/scoring'; import * as i18n from './src/i18n'; import * as session from './src/data/quizSession'; export {bank,scoring,i18n,session};", resolveDir: process.cwd() },
    bundle: true, platform: 'node', format: 'esm', write: false,
  });
  const { bank, scoring, i18n, session } = await import('data:text/javascript;base64,' + Buffer.from(bundle.outputFiles[0].text).toString('base64'));
  const { QUESTIONS, QUESTION_BANK } = bank;
  const encodeAnswers = answers => session.encodeAnswers(answers, QUESTIONS);
  const decodeAnswers = (serialized, questions = QUESTIONS) => session.decodeAnswers(serialized, questions);
  const computeScores = (answers, questions = QUESTIONS) => scoring.computeScores(answers, questions);
  assert.equal(QUESTIONS.length, 66);
  assert.equal(new Set(QUESTIONS.map(q => q.id)).size, 66);
  const sources = QUESTION_BANK.filter(q => q.sourceId);
  assert.equal(sources.length, 56);
  assert.equal(new Set(sources.map(q => q.sourceId)).size, 56);
  assert.equal(QUESTION_BANK.filter(q => !q.sourceId).length, 10);
  assert.ok(sources.every(q => q.sourceOriginalEN && q.sourceAliases));
  assert.ok(QUESTION_BANK.filter(q => !q.sourceId).every(q => q.trait === 'DET'));
  for (const locale of i18n.locales) {
    const localized = i18n.getTranslations(locale).questions;
    assert.deepEqual(localized.map(q => q.id), QUESTIONS.map(q => q.id));
    localized.forEach((q, index) => {
      assert.equal(q.q, QUESTION_BANK[index].text[locale], locale + ': stale question ' + q.id);
      assert.equal(q.reverse, QUESTIONS[index].reverse);
      assert.equal(q.trait, QUESTIONS[index].trait);
      assert.equal(q.labels.length, 5);
    });
  }

  const neutralAnswers = Array(66).fill(2);
  const neutral = computeScores(neutralAnswers);
  assert.equal(neutral.kind, 'balanced');
  assert.equal(neutral.primarySoul, null);
  assert.deepEqual(Object.values(neutral.pct), Array(7).fill(50));
  assert.equal(computeScores([]).kind, 'incomplete');
  for (const invalid of ['4', 99, -1, 1.5, NaN, undefined]) {
    assert.equal(computeScores(Array(66).fill(invalid)).answeredCount, 0);
  }
  const best = QUESTIONS.map(q => q.reverse ? 0 : 4);
  const worst = QUESTIONS.map(q => q.reverse ? 4 : 0);
  assert.deepEqual(Object.values(computeScores(best).pct), Array(7).fill(100));
  assert.deepEqual(Object.values(computeScores(worst).pct), Array(7).fill(0));
  const sample = [...neutralAnswers]; sample[0] = 4;
  const result = computeScores(sample);
  assert.ok(Math.abs(result.pct.BRV - (50 + 50 / 9)) < 1e-10);
  assert.equal(result.primarySoul, 'BRV');
  assert.equal(result.secondarySoul, null, 'Neutral ties must not be named as a secondary trait');
  assert.deepEqual(result.contributions, [{ questionIndex: 0, answerIndex: 4, trait: 'BRV', points: 2 }]);
  const reverseIndex = QUESTIONS.findIndex(q => q.trait === 'BRV' && q.reverse);
  const reverseSample = [...neutralAnswers]; reverseSample[reverseIndex] = 0;
  assert.equal(computeScores(reverseSample).pct.BRV, result.pct.BRV);
  const custom = [{ ...QUESTIONS[0], id: 'a' }, { ...QUESTIONS[0], id: 'b' }, { ...QUESTIONS[0], id: 'c', trait: 'INT', reverse: true }];
  const customScore = computeScores([4, 4, 0], custom);
  assert.equal(customScore.pct.BRV, 100);
  assert.equal(customScore.pct.INT, 100);

  const scores = { DET: 80, BRV: 80, JUS: 50, KND: 50, PAT: 50, INT: 50, PER: 50 };
  assert.equal(scoring.classifyProfile(scores, 66, 66).kind, 'tied');
  assert.deepEqual(scoring.classifyProfile(scores, 66, 66).leaders, ['DET', 'BRV']);
  assert.equal(scoring.classifyProfile({ ...scores, BRV: 78 }, 66, 66).kind, 'close');
  assert.equal(scoring.classifyProfile({ ...scores, BRV: 76 }, 66, 66).kind, 'dominant');
  const secondaryAnswers = QUESTIONS.map(q => q.trait === 'BRV' ? (q.reverse ? 0 : 4) : q.trait === 'DET' ? (q.reverse ? 1 : 3) : 2);
  assert.equal(computeScores(secondaryAnswers).secondarySoul, 'DET');
  const tiedSecondary = QUESTIONS.map(q => q.trait === 'BRV' ? (q.reverse ? 0 : 4) : ['DET', 'KND'].includes(q.trait) ? (q.reverse ? 1 : 3) : 2);
  assert.equal(computeScores(tiedSecondary).secondarySoul, null);


  const partiallyAnswered = [...neutralAnswers]; partiallyAnswered[3] = null;
  assert.deepEqual(decodeAnswers(encodeAnswers(partiallyAnswered)), partiallyAnswered);
  assert.deepEqual(decodeAnswers(encodeAnswers(best), [...QUESTIONS].reverse()), [...best].reverse());
  assert.equal(decodeAnswers(JSON.stringify(best)), null, 'Legacy arrays must not become V2 answers');
  const saved = JSON.parse(encodeAnswers(best));
  assert.equal(decodeAnswers(JSON.stringify({ ...saved, version: 'old' })), null);
  assert.equal(decodeAnswers('broken json'), null);
  assert.equal(decodeAnswers(JSON.stringify({ ...saved, answers: { ...saved.answers, extra: 2 } })), null);
  saved.answers[QUESTIONS[0].id] = '4';
  assert.equal(decodeAnswers(JSON.stringify(saved)), null);
  assert.throws(() => encodeAnswers([4]), /Invalid quiz answers/);

  const quiz = readFileSync('src/components/Quiz.astro', 'utf8');
  assert.match(quiz, /computeScores as scoreAnswers/);
  assert.ok(!quiz.includes('const CHOICE_FACTORS'));
  assert.ok(!quiz.includes('dominant_trait') && !quiz.includes('custom_text'));
  assert.match(quiz, /data-clarity-mask="true"/);
  assert.match(quiz, /const dominant = getResultDisplay\(score\)/);
  assert.match(quiz, /https:\/\/soulvirtues\.makethisbetter\.dev/);
  console.log('V2 bank, all locales, direct/reverse scoring, boundaries, versioned sessions, cards and privacy passed.');
})().catch(error => { console.error(error); process.exitCode = 1; });
