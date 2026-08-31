// input: src/components/Quiz.astro and src/i18n locale dictionaries
// output: Fails unless vertical card export, native sharing, referral tagging, GA4 events, direct download, and copy-link fallback stay separated
// pos: scripts/check_card_download_ios.mjs（更新规则：分享卡尺寸、统计事件与移动端导出逻辑变化时同步本脚本与 scripts/README.md）

import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const quizSource = readFileSync(new URL('../src/components/Quiz.astro', import.meta.url), 'utf8');
const typesSource = readFileSync(new URL('../src/i18n/types.ts', import.meta.url), 'utf8');

// 1. Check i18n definitions
for (const key of [
  'shareResultBtn',
  'shareResultChannels',
  'shareHint',
  'shareCardMeta',
  'shareCardQuestion',
  'shareCardCta',
  'downloadCardBtn',
  'saveCardHint',
  'copyLinkBtn',
  'linkCopiedNotice',
]) {
  assert(typesSource.includes(`${key}: string;`), `types.ts must define ${key}`);
}

for (const lang of ['en', 'es', 'ja', 'pt', 'ru']) {
  const langSource = readFileSync(new URL(`../src/i18n/${lang}.ts`, import.meta.url), 'utf8');
  for (const key of [
    'shareResultBtn',
    'shareResultChannels',
    'shareHint',
    'shareCardMeta',
    'shareCardQuestion',
    'shareCardCta',
    'downloadCardBtn',
    'saveCardHint',
    'copyLinkBtn',
    'linkCopiedNotice',
  ]) {
    assert(langSource.includes(`${key}:`), `${lang}.ts must provide a ${key} translation`);
  }
  assert(
    langSource.includes('shareResultChannels: "X · INSTAGRAM · MESSAGES · MORE"'),
    `${lang}.ts must use the approved international share-channel label`,
  );
  assert(!/wechat/i.test(langSource), `${lang}.ts must not advertise WeChat`);
}

// 2. Check action controls and iOS modal in Quiz.astro
assert(quizSource.includes('id="btn-share-card"'), 'Quiz.astro must contain #btn-share-card');
assert(quizSource.includes('id="btn-download-card"'), 'Quiz.astro must contain #btn-download-card');
assert(quizSource.includes('id="btn-copy-link"'), 'Quiz.astro must contain #btn-copy-link');
assert(quizSource.includes('id="card-preview-modal"'), 'Quiz.astro must contain #card-preview-modal');
assert(quizSource.includes('id="card-preview-img"'), 'Quiz.astro must contain #card-preview-img');
assert(quizSource.includes('id="btn-close-card-modal"'), 'Quiz.astro must contain #btn-close-card-modal');

// 3. Check vertical card dimensions
assert(quizSource.includes('canvas.width = 1080'), 'Result card must be 1080px wide');
assert(quizSource.includes('canvas.height = 1350'), 'Result card must be 1350px tall');
assert(
  quizSource.includes('utm_source=share_sheet&utm_medium=share&utm_campaign=result_card'),
  'Shared URLs must identify native-share referral traffic',
);

// 4. Check minimal GA4 measurement points
assert(quizSource.includes('function trackEvent('), 'Quiz.astro must define a guarded GA4 event helper');
for (const eventName of [
  'share_open',
  'share',
  'result_card_download',
  'share_link_copy',
  'quiz_complete',
]) {
  assert(quizSource.includes(`trackEvent("${eventName}"`), `Quiz.astro must track ${eventName}`);
}

// 5. Check that sharing and downloading are separate paths
const downloadStart = quizSource.indexOf('async function downloadResultCard()');
const shareStart = quizSource.indexOf('async function shareResultCard()');
const copyStart = quizSource.indexOf('async function copyShareLink(');
assert(downloadStart !== -1, 'Quiz.astro must define downloadResultCard');
assert(shareStart > downloadStart, 'Quiz.astro must define shareResultCard after downloadResultCard');
assert(copyStart > shareStart, 'Quiz.astro must define copyShareLink after shareResultCard');

const downloadSection = quizSource.slice(downloadStart, shareStart);
const shareSection = quizSource.slice(shareStart, copyStart);
assert(!downloadSection.includes('navigator.share'), 'Direct download must not invoke navigator.share');
assert(shareSection.includes('navigator.share'), 'Share action must invoke navigator.share');
assert(shareSection.includes('navigator.canShare'), 'Share action must check navigator.canShare for files');
assert(/iPad|iPhone|iPod/.test(quizSource), 'Quiz.astro must detect iOS devices for modal preview fallback');
assert(
  quizSource.includes('document.getElementById("btn-share-card")?.addEventListener("click", shareResultCard)'),
  'Share button must call shareResultCard',
);
assert(
  quizSource.includes('document.getElementById("btn-download-card")?.addEventListener("click", downloadResultCard)'),
  'Download button must call downloadResultCard',
);
assert(
  quizSource.includes('document.getElementById("btn-copy-link")?.addEventListener("click", copyShareLink)'),
  'Copy-link button must call copyShareLink',
);

console.log('Share-card action separation and i18n checks passed.');
