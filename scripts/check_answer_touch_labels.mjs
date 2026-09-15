// input: src/components/Quiz.astro answer label elements and touch interaction bindings
// output: Fails unless extreme labels and selected label text are touch-interactive and advance the quiz
// pos: scripts/check_answer_touch_labels.mjs (更新规则：答题选项触控推进逻辑变化时同步本脚本与 scripts/README.md)

import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const source = readFileSync(new URL('../src/components/Quiz.astro', import.meta.url), 'utf8');

// 1. Check template elements are buttons with touch-manipulation and active:scale-95
assert(/<button[^>]*id="label-extreme-left"[^>]*>/.test(source), 'label-extreme-left must be a button');
assert(/<button[^>]*id="label-extreme-right"[^>]*>/.test(source), 'label-extreme-right must be a button');
assert(/<button[^>]*id="selected-label-text"[^>]*>/.test(source), 'selected-label-text must be a button');

const leftBtnMatch = source.match(/<button[^>]*id="label-extreme-left"[^>]*class="([^"]*)"/);
assert(leftBtnMatch && leftBtnMatch[1].includes('touch-manipulation'), 'label-extreme-left must include touch-manipulation');
assert(leftBtnMatch && leftBtnMatch[1].includes('active:scale-95'), 'label-extreme-left must include active:scale-95');

const rightBtnMatch = source.match(/<button[^>]*id="label-extreme-right"[^>]*class="([^"]*)"/);
assert(rightBtnMatch && rightBtnMatch[1].includes('touch-manipulation'), 'label-extreme-right must include touch-manipulation');

const selectedBtnMatch = source.match(/<button[^>]*id="selected-label-text"[^>]*class="([^"]*)"/);
assert(selectedBtnMatch && selectedBtnMatch[1].includes('touch-manipulation'), 'selected-label-text must include touch-manipulation');

// 2. Check scale buttons include touch-manipulation
assert(source.includes('touch-manipulation') && source.indexOf('btn.className =') > 0, 'scale buttons must include touch-manipulation');

// 3. Check event listeners bind to selectAndAdvance
assert(source.includes('document.getElementById("label-extreme-left")?.addEventListener("click"'), 'label-extreme-left must have click listener');
assert(/document\.getElementById\("label-extreme-left"\)\?\.addEventListener\("click",\s*\(\)\s*=>\s*\{\s*selectAndAdvance\(0\);?\s*\}\);/.test(source), 'label-extreme-left must advance with index 0');

assert(source.includes('document.getElementById("label-extreme-right")?.addEventListener("click"'), 'label-extreme-right must have click listener');
assert(/document\.getElementById\("label-extreme-right"\)\?\.addEventListener\("click",\s*\(\)\s*=>\s*\{\s*selectAndAdvance\(4\);?\s*\}\);/.test(source), 'label-extreme-right must advance with index 4');

assert(source.includes('document.getElementById("selected-label-text")?.addEventListener("click"'), 'selected-label-text must have click listener');
assert(/document\.getElementById\("selected-label-text"\)\?\.addEventListener\("click",\s*\(\)\s*=>\s*\{\s*selectAndAdvance\(currentSelection\);?\s*\}\);/.test(source), 'selected-label-text must advance with currentSelection');

console.log('Answer touch labels checks passed.');
