// input: Actual shared scoring module and quiz privacy wiring
// output: Regression failures for neutral/incomplete/tied results or private analytics
// pos: scripts/verify_scoring.cjs (更新规则：评分或统计边界变化需同步本脚本与所属目录 README)

const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { build } = require('esbuild');

(async () => {
  const bundle = await build({ entryPoints: ['src/data/scoring.ts'], bundle: true, platform: 'node', format: 'esm', write: false });
  const scoring = await import('data:text/javascript;base64,' + Buffer.from(bundle.outputFiles[0].text).toString('base64'));
  const neutral = scoring.computeScores(Array(66).fill(2));
  assert.equal(neutral.kind, 'balanced');
  assert.equal(neutral.primarySoul, null);
  assert.deepEqual(Object.values(neutral.pct), Array(7).fill(50));
  assert.equal(scoring.computeScores([]).kind, 'incomplete');
  assert.equal(scoring.computeScores(Array(66).fill('4')).answeredCount, 0);
  assert.equal(scoring.computeScores(Array(66).fill(99)).answeredCount, 0);

  const sample = Array(66).fill(2);
  sample[0] = 0;
  const result = scoring.computeScores(sample);
  assert.equal(result.raw.INT, 3);
  assert.equal(result.primarySoul, 'INT');
  assert.equal(result.contributions[0].points, 3);
  assert.equal(scoring.normPct('INT', scoring.MAXP.INT), 100);
  assert.equal(scoring.normPct('INT', -scoring.MAXP.INT), 0);

  const scores = { DET: 80, BRV: 80, JUS: 50, KND: 50, PAT: 50, INT: 50, PER: 50 };
  assert.equal(scoring.classifyProfile(scores, 66, 66).kind, 'tied');
  assert.deepEqual(scoring.classifyProfile(scores, 66, 66).leaders, ['DET', 'BRV']);
  assert.equal(scoring.classifyProfile({ ...scores, BRV: 78 }, 66, 66).kind, 'close');
  assert.equal(scoring.classifyProfile({ ...scores, BRV: 76 }, 66, 66).kind, 'dominant');

  const quiz = readFileSync('src/components/Quiz.astro', 'utf8');
  assert.match(quiz, /computeScores as scoreAnswers/);
  assert.ok(!quiz.includes('const CHOICE_FACTORS'), 'The browser must not own a second scoring algorithm');
  assert.ok(!quiz.includes('dominant_trait'));
  assert.ok(!quiz.includes('custom_text'));
  assert.match(quiz, /data-clarity-mask="true"/);
  assert.match(quiz, /const dominant = getResultDisplay\(score\)/, 'Export cards must use the same profile interpretation');
  assert.match(quiz, /https:\/\/soulvirtues\.makethisbetter\.dev/, 'Private suggestions retain a real submission channel');
  console.log('Scoring, interpretation, card and privacy regressions passed.');
})().catch(error => { console.error(error); process.exitCode = 1; });
