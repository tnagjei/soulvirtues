// input: src/components/LangDetector.astro mobile prompt markup and utility classes
// output: Fails when the prompt lacks mobile safe-area, size, focus, or overflow protections
// pos: scripts/check_lang_prompt_mobile.mjs（更新规则：弹窗移动端交互规范变化时同步本脚本与 scripts/README.md）

import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const source = readFileSync(new URL('../src/components/LangDetector.astro', import.meta.url), 'utf8');

function classesFor(id) {
  const match = source.match(new RegExp(`id="${id}"[\\s\\S]*?class="([^"]+)"`));
  assert(match, `Missing class attribute for #${id}`);
  return match[1];
}

const promptClasses = classesFor('pixel-lang-prompt');
assert(promptClasses.includes('left-4 right-4'), 'Prompt must keep 16px mobile side margins');
assert(promptClasses.includes('mx-auto'), 'Prompt must remain centered on wider phones');
assert(
  promptClasses.includes('bottom-[calc(1rem+env(safe-area-inset-bottom))]'),
  'Prompt must clear the iPhone bottom safe area',
);
assert(promptClasses.includes('max-h-[30dvh]'), 'Prompt must stay within 30% of the visible viewport height');
assert(promptClasses.includes('overflow-y-auto'), 'Prompt must scroll instead of overflowing on short screens');
assert(promptClasses.includes('overscroll-contain'), 'Prompt scrolling must not move the page behind it');

for (const id of ['btn-dismiss-lang', 'btn-stay-lang', 'link-switch-lang']) {
  const classes = classesFor(id);
  assert(classes.includes('min-h-11'), `#${id} must be at least 44px tall`);
  assert(classes.includes('touch-manipulation'), `#${id} must remove mobile tap delay`);
  assert(classes.includes('focus-visible:ring-2'), `#${id} must show a keyboard focus ring`);
}

assert(classesFor('btn-dismiss-lang').includes('min-w-11'), 'Close button must be at least 44px wide');
assert(source.includes('aria-live="polite"'), 'Language suggestion must be announced without interrupting users');
assert(!source.includes('transition-all'), 'Prompt must transition only explicit properties');

console.log('Language prompt mobile checks passed.');
