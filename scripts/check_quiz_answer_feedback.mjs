// input: src/components/Quiz.astro mobile answer selection flow
// output: Fails unless a tapped answer is rendered before the quiz advances
// pos: scripts/check_quiz_answer_feedback.mjs（更新规则：答题推进逻辑变化时同步本脚本与 scripts/README.md）

import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const source = readFileSync(new URL('../src/components/Quiz.astro', import.meta.url), 'utf8');
const match = source.match(/function selectAndAdvance\(optIdx\) \{([\s\S]*?)\n\s*function setSelection/);

assert(match, 'Missing selectAndAdvance function');

const flow = match[1];
const renderIndex = flow.indexOf('buildScalePoints(QUESTIONS[currentIndex])');
const delayIndex = flow.indexOf('setTimeout');
const confirmIndex = flow.indexOf('confirmAndAdvance()');

assert(renderIndex >= 0, 'Tapped answer must render its selected state');
assert(delayIndex > renderIndex, 'Advance delay must start after selected state renders');
assert(confirmIndex > delayIndex, 'Quiz must not advance before the feedback delay');
assert(/},\s*300\);/.test(flow), 'Selected state must remain visible for 300ms');

console.log('Quiz answer feedback checks passed.');
