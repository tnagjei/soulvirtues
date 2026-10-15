#!/usr/bin/env node
// input: src/components/Quiz.astro, src/i18n/*.ts
// output: Regression failures for the result-badge jump control (FB-31)
// pos: scripts/check_result_summary_jump.mjs (更新规则：改动结果徽章需同步本脚本与所属目录 README)

import { readFileSync } from 'node:fs';

// 与 src/i18n/index.ts 的 locales 保持一致；不 import TS 模块，node 无法解析无扩展名相对路径。
const locales = ['en', 'es', 'pt', 'ja', 'ru'];

const quiz = readFileSync('src/components/Quiz.astro', 'utf8');
const problems = [];

function check(label, condition, detail = '') {
  if (!condition) problems.push(`${label}${detail ? ` — ${detail}` : ''}`);
}

// 1. The badge must be a native button, not a dead <div> (the FB-31 root cause).
check('result-badge 是原生 <button>',
  /<button[^>]*id="result-badge"/.test(quiz));
check('result-badge 不再是 <div>',
  !/<div[^>]*id="result-badge"/.test(quiz));
check('result-badge type="button"',
  /<button[^>]*type="button"[^>]*id="result-badge"/.test(quiz) ||
  /<button[^>]*id="result-badge"[^>]*type="button"/.test(quiz));

// 2. Affordances a touch/keyboard user needs to believe it is tappable.
check('result-badge 有 cursor-pointer', /id="result-badge"[\s\S]{0,900}?cursor-pointer/.test(quiz));
check('result-badge 有 touch-manipulation', /id="result-badge"[\s\S]{0,900}?touch-manipulation/.test(quiz));
check('result-badge 有焦点环', /id="result-badge"[\s\S]{0,900}?focus-visible:ring/.test(quiz));
check('result-badge 有 aria-label', /id="result-badge"[\s\S]{0,900}?aria-label=\{t\.quizUI\.resultReading\.summaryJumpLabel\}/.test(quiz));
check('result-badge 有 aria-controls="result-summary"',
  /id="result-badge"[\s\S]{0,900}?aria-controls="result-summary"/.test(quiz));

// 3. A jump target must exist and be reachable.
check('存在 #result-summary 锚点目标', /id="result-summary"/.test(quiz));
check('#result-summary 有 scroll-mt（避免被粘性页眉遮挡）',
  /id="result-summary"[\s\S]{0,400}?scroll-mt-/.test(quiz));

// 4. The handler must not break native Enter/Space activation.
const handler = quiz.match(
  /getElementById\("result-badge"\)\?\.addEventListener\("click",\s*\(([^)]*)\)\s*=>\s*\{([\s\S]*?)\n    \}\);/);
check('result-badge 有 click handler', Boolean(handler));
if (handler) {
  check('handler 参数不叫 e（未调用 preventDefault）',
    handler[1].trim() === '' || handler[1].trim() === 'e' ? handler[1].trim() === '' : true,
    `实际参数: ${handler[1]}`);
  check('handler 未调用 preventDefault()', !/preventDefault/.test(handler[2]));
  check('handler 滚动到 #result-summary',
    /getElementById\("result-summary"\)/.test(handler[2]) &&
    /scrollIntoView/.test(handler[2]));
  check('handler 用 smooth 滚动', /behavior:\s*"smooth"/.test(handler[2]));
}

// 5. Five locales must carry the label, otherwise aria-label is undefined.
const missing = [];
for (const locale of locales) {
  const source = readFileSync(`src/i18n/${locale}.ts`, 'utf8');
  if (!/"summaryJumpLabel"\s*:/.test(source)) missing.push(locale);
}
check('五语种都有 summaryJumpLabel', missing.length === 0, `缺失: ${missing.join(', ')}`);
check('类型声明包含 summaryJumpLabel',
  /summaryJumpLabel:\s*string/.test(readFileSync('src/i18n/types.ts', 'utf8')));

if (problems.length) {
  console.error('Result badge jump checks FAILED:');
  for (const p of problems) console.error(`  - ${p}`);
  process.exit(1);
}
console.log('Result badge jump checks passed.');
