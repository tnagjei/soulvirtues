// input: src/components/Header.astro desktop language dropdown markup and script
// output: Fails when the dropdown cannot be opened by click/tap or keyboard (regression guard for soulvirtues/FB-29)
// pos: scripts/check_lang_switcher.mjs（更新规则：Header 语言切换器交互规范变化时同步本脚本与 scripts/README.md）

import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const source = readFileSync(new URL('../src/components/Header.astro', import.meta.url), 'utf8');

// --- Markup: the dropdown must expose a toggle, a list, and an open-state hook ---
const toggleMatch = source.match(/id="lang-menu-desktop-toggle"[\s\S]*?>/);
assert(toggleMatch, 'Missing #lang-menu-desktop-toggle button');
const toggleTag = toggleMatch[0];

assert(toggleTag.includes('aria-haspopup="true"'), 'Language toggle must announce it opens a popup');
assert(toggleTag.includes('aria-expanded="false"'), 'Language toggle must start collapsed with aria-expanded');
assert(toggleTag.includes('aria-controls="lang-menu-desktop-list"'), 'Language toggle must point at the dropdown via aria-controls');
assert(toggleTag.includes('min-h-11'), 'Language toggle must be at least 44px tall for touch');
assert(toggleTag.includes('touch-manipulation'), 'Language toggle must remove mobile tap delay');
assert(toggleTag.includes('focus-visible:ring-2'), 'Language toggle must show a keyboard focus ring');

const listMatch = source.match(/id="lang-menu-desktop-list"[\s\S]*?>/);
assert(listMatch, 'Missing #lang-menu-desktop-list dropdown');
const listTag = listMatch[0];

// data-[open='true']:block is what makes the menu open without hover (touch devices).
// It must match the VALUE: a bare data-[open]:block compiles to [data-open], which also
// matches data-open="false" and leaves the closed menu as display:block over the page.
assert(listTag.includes("data-[open='true']:block"), 'Dropdown open-state variant must match the value data-open="true"');
assert(!/data-\[open\]:/.test(listTag), 'Bare data-[open]: variant compiles to an attribute-presence selector and keeps the closed menu clickable');
assert(listTag.includes('data-open="false"'), 'Dropdown must start with data-open="false"');
assert(listTag.includes('group-hover:block'), 'Dropdown must keep hover opening for desktop mice');
assert(listTag.includes('focus-within:block'), 'Dropdown must keep focus-within opening for keyboard users');

// --- Script: click/tap, keyboard navigation and dismissal must all be wired ---
function handlerFor(marker, label) {
  const idx = source.indexOf(marker);
  assert(idx !== -1, `Missing ${label}`);
  return source.slice(idx, idx + 2400);
}

const clickScope = handlerFor("toggle.addEventListener('click'", 'click handler on the language toggle');
assert(clickScope.includes('setOpen('), 'Click handler must toggle the dropdown open state');
assert(clickScope.includes("getAttribute('aria-expanded')"), 'Click handler must read the current aria-expanded state');
// preventDefault() in this handler cancels the native keyboard activation path:
// Enter/Space on a <button> fires click, and cancelling breaks it for keyboard users.
const clickBody = clickScope.slice(0, clickScope.indexOf('});'));
assert(!clickBody.includes('preventDefault'), 'Click handler must not call preventDefault; it would suppress Enter/Space activation');

const toggleKeyScope = handlerFor("toggle.addEventListener('keydown'", 'keydown handler on the language toggle');
assert(toggleKeyScope.includes("e.key === 'ArrowDown'"), 'ArrowDown must open the dropdown and move into it');
assert(toggleKeyScope.includes("e.key === 'Escape'"), 'Escape on the toggle must close the dropdown');
// Enter/Space must be handled explicitly: relying on native <button> activation is
// inconsistent for synthetic key events, and a keyboard user must always be able
// to open this menu. Guard against a regression that drops the branch again.
assert(/e\.key === 'Enter'/.test(toggleKeyScope), 'keydown must handle Enter so keyboard users can open the menu');
assert(/e\.key === ' '/.test(toggleKeyScope), 'keydown must handle Space so keyboard users can open the menu');

const listKeyScope = handlerFor("list.addEventListener('keydown'", 'keydown handler inside the dropdown');
assert(listKeyScope.includes("e.key === 'ArrowDown'"), 'ArrowDown must move between language options');
assert(listKeyScope.includes("e.key === 'ArrowUp'"), 'ArrowUp must move between language options');
assert(listKeyScope.includes('close(true)'), 'Escape inside the dropdown must close it and return focus to the toggle');

assert(source.includes("wrap.addEventListener('mouseleave'"), 'Dropdown must collapse when the pointer leaves the control');
assert(source.includes('dataset.langDismissBound'), 'Outside-click dismissal must be bound exactly once');
assert(source.includes('if (!control.contains(e.target))'), 'Dropdown must close when clicking outside it');

// --- Keyboard order: closed options must not be focusable ahead of the toggle ---
assert(source.includes("list.setAttribute('inert', '')"), 'Closed dropdown must be inert so hidden options stay out of the tab order');
assert(source.includes("list.removeAttribute('inert')"), 'Opening must remove inert so the options become reachable');
assert(source.includes('function closeState('), 'Outside click and Escape must share one close path so state cannot drift');
assert(!source.includes("open.dataset.open = 'false'"), 'No ad-hoc dataset writes may bypass closeState');

// --- Options: all five languages must remain reachable ---
// Scope to the desktop dropdown only; the mobile panel below has its own 5 links.
const desktopBlock = source.slice(
  source.indexOf('id="lang-menu-desktop-list"'),
  source.indexOf('<!-- Take Quiz CTA Button -->'),
);
for (const [label, href] of [
  ['English', 'englishPath'],
  ['Japanese', 'japanesePath'],
  ['Spanish', 'spanishPath'],
  ['Portuguese', 'portuguesePath'],
  ['Russian', 'russianPath'],
]) {
  assert(desktopBlock.includes(href), `${label} option must still link to ${href}`);
}
const optionCount = (desktopBlock.match(/href=\{[a-z]+Path\}/g) || []).length;
assert.equal(optionCount, 5, 'Desktop dropdown must expose exactly 5 language options, one per locale');

console.log('Desktop language switcher checks passed.');