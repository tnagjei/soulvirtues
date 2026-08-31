// input: src/components/Quiz.astro and src/i18n locale dictionaries
// output: Fails unless iOS card download compatibility (Web Share + Modal preview + i18n hints) is implemented
// pos: scripts/check_card_download_ios.mjs（更新规则：卡片导出与移动端分享逻辑变化时同步本脚本与 scripts/README.md）

import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const quizSource = readFileSync(new URL('../src/components/Quiz.astro', import.meta.url), 'utf8');
const typesSource = readFileSync(new URL('../src/i18n/types.ts', import.meta.url), 'utf8');

// 1. Check i18n definition
assert(typesSource.includes('saveCardHint: string;'), 'types.ts must define saveCardHint');

for (const lang of ['en', 'es', 'ja', 'pt', 'ru']) {
  const langSource = readFileSync(new URL(`../src/i18n/${lang}.ts`, import.meta.url), 'utf8');
  assert(langSource.includes('saveCardHint:'), `${lang}.ts must provide a saveCardHint translation`);
}

// 2. Check modal element in Quiz.astro
assert(quizSource.includes('id="card-preview-modal"'), 'Quiz.astro must contain #card-preview-modal');
assert(quizSource.includes('id="card-preview-img"'), 'Quiz.astro must contain #card-preview-img');
assert(quizSource.includes('id="btn-close-card-modal"'), 'Quiz.astro must contain #btn-close-card-modal');

// 3. Check Web Share and iOS fallback logic in Quiz.astro
assert(quizSource.includes('navigator.share'), 'Quiz.astro must support navigator.share');
assert(quizSource.includes('navigator.canShare'), 'Quiz.astro must check navigator.canShare');
assert(/iPad|iPhone|iPod/.test(quizSource), 'Quiz.astro must detect iOS devices for modal preview fallback');

console.log('Card download iOS compatibility checks passed.');
