// input: Real question/scoring modules and field-guide derivations
// output: Checks for traceable evidence, neutral/reverse answers and legacy data boundaries
// pos: scripts/check_field_guide.cjs (更新规则：报告变化同步此检查与 scripts/README.md)
const assert = require('node:assert/strict');
const { buildSync } = require('esbuild');
function load(entry) {
  const result = buildSync({entryPoints:[entry],bundle:true,write:false,platform:'node',format:'cjs'});
  const module = {exports:{}};
  new Function('require','module','exports',result.outputFiles[0].text)(require,module,module.exports);
  return module.exports;
}
const {buildFieldGuide, sampleGuideInput, readFieldGuide} = load('src/data/fieldGuide.ts');
const {QUESTIONS} = load('src/data/questions.ts');
const {computeScores} = load('src/data/scoring.ts');
const {normalizeReportInput} = load('src/data/reportDelivery.ts');
const {encodeAnswers, ANSWER_STORAGE_KEY} = load('src/data/quizSession.ts');
const answers = sampleGuideInput();
const score = computeScores(answers, QUESTIONS);
const input = normalizeReportInput({pct:score.pct,lang:'en'});
for (const lang of ['en','es']) {
  const guide = buildFieldGuide(input, answers, lang);
  assert.equal(guide.kind,'close');
  assert.equal(guide.ranked[0].code,'PER');
  assert.equal(guide.ranked[1].code,'JUS');
  assert.equal(guide.traits.flatMap(t=>t.evidence).length,14);
  assert.equal(guide.traits.flatMap(t=>t.items).length,66);
  assert.equal(guide.copy.tasks.length,7);
  for (const trait of guide.traits) {
    assert.equal(trait.positive+trait.negative+trait.neutral,trait.total);
    assert.equal(trait.score,score.pct[trait.code]);
    assert.notEqual(trait.evidence[0].id,trait.evidence[1].id);
    for (const item of trait.evidence) {
      const q=QUESTIONS[item.number-1];
      assert.equal(q.id,item.id);
      assert.equal(item.keyed,q.reverse?5-answers[item.number-1]:answers[item.number-1]+1);
    }
  }
}
const neutral = buildFieldGuide(input,Array(66).fill(2),'en');
assert.equal(neutral.kind,'balanced');
assert(neutral.traits.every(t=>t.score===50&&t.neutral===t.total));
assert.notEqual(neutral.id,buildFieldGuide(input,answers,'en').id);
assert.equal(buildFieldGuide({...input,lang:'es'},answers,'es').id,buildFieldGuide(input,answers,'en').id);
assert.throws(()=>buildFieldGuide(input,[2],'en'),/Incomplete/);
assert.throws(()=>buildFieldGuide(input,Array(66).fill(9),'en'),/Incomplete/);
const storage=new Map([[ANSWER_STORAGE_KEY,encodeAnswers(answers,QUESTIONS)],['soul_virtues_last_result',JSON.stringify({pct:{},lang:'en'})]]);
assert.equal(readFieldGuide({getItem:k=>storage.get(k)||null},'en').ranked[0].code,'PER');
storage.set(ANSWER_STORAGE_KEY,encodeAnswers(Array(66).fill(null),QUESTIONS));
assert.equal(readFieldGuide({getItem:k=>storage.get(k)||null},'en'),null);
const legacy=buildFieldGuide(input,null,'en');
assert.equal(legacy.traits.flatMap(t=>t.evidence).length,0);
console.log('PASS: 66 answers, 14 source-matched receipts, reverse scoring, two languages, neutral/legacy boundaries and stable report IDs');
