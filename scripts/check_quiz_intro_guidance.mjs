// input: src/components/Quiz.astro intro-screen markup and script bindings
// output: Fails when the typing intro lacks an explicit continue affordance or keyboard parity (regression guard for soulvirtues/FB-30)
// pos: scripts/check_quiz_intro_guidance.mjs（更新规则：intro 引导规范变化时同步本脚本与 scripts/README.md）

import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const source = readFileSync(new URL('../src/components/Quiz.astro', import.meta.url), 'utf8');

// --- Intro screen must expose an explicit, touch-sized continue control ---
const introMatch = source.match(/<div id="quiz-intro"[\s\S]*?<\/div>\s*<!-- 1\. Start Screen/);
assert(introMatch, 'Cannot locate the #quiz-intro screen block');
const introBlock = introMatch[0];

assert(
  introBlock.includes('id="btn-intro-continue"'),
  'Intro must provide an explicit continue button; a corner hint alone left touch users stuck (FB-30)',
);
assert(introBlock.includes('min-h-11'), 'Continue button must be at least 44px tall for touch');
assert(introBlock.includes('touch-manipulation'), 'Continue button must remove mobile tap delay');
assert(introBlock.includes('focus-visible:ring-2'), 'Continue button must show a keyboard focus ring');

// The new copy must exist in every locale, otherwise the button renders empty.
for (const locale of ['en', 'es', 'ja', 'pt', 'ru']) {
  const dict = readFileSync(new URL(`../src/i18n/${locale}.ts`, import.meta.url), 'utf8');
  assert(
    /introTapHint:\s*"[^"]+"/.test(dict),
    `${locale} is missing the introTapHint copy used by the continue button`,
  );
}

// --- Script: continue must jump to the start screen, not just advance a scene ---
const handlerIdx = source.indexOf('("btn-intro-continue")?.addEventListener("click"');
assert(handlerIdx !== -1, 'Missing click handler for #btn-intro-continue');
const handler = source.slice(handlerIdx, handlerIdx + 700);
assert(handler.includes('showScreen("start")'), 'Continue must jump directly to the start screen');
assert(handler.includes('stopPropagation'), 'Continue must not double-fire the intro-area click handler');

// Keyboard parity: Enter/Space/Z on the intro screen already advances it.
assert(
  source.includes('e.key === "Enter" || e.key.toLowerCase() === "z" || e.key === " "'),
  'Keyboard users must be able to advance the intro with Enter/Z/Space',
);

console.log('Quiz intro guidance checks passed.');