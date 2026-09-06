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
  /Instagram|FBAN|wv/i.test(downloadSection),
  'Quiz.astro downloadResultCard must detect in-app WebViews (Instagram, Android wv, Facebook, etc.) for modal preview fallback',
);

// 6. Test actual User-Agent regex behavior with real-world samples
const webViewRegexMatch = downloadSection.match(/const isWebView = (\/.*?\/[a-z]*)\.test/);
assert(webViewRegexMatch, 'Could not extract isWebView regex from downloadResultCard');
const webViewRegex = eval(webViewRegexMatch[1]);

const iosRegexMatch = downloadSection.match(/const isIOS = (\/.*?\/[a-z]*)\.test/);
assert(iosRegexMatch, 'Could not extract isIOS regex from downloadResultCard');
const iosRegex = eval(iosRegexMatch[1]);

// Real reporter UA (Android 15 Instagram WebView)
const reporterUA = "Mozilla/5.0 (Linux; Android 15; 23100RN82L Build/AP3A.240905.015.A2; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/152.0.7977.69 Mobile Safari/537.36 Instagram 445.0.0.45.83 Android (35/15; 320dpi; 720x1600; Xiaomi/Redmi; 23100RN82L; gale; mt6768; es_US; 1055488607; IABMV/1)";
assert(webViewRegex.test(reporterUA), 'Reporter Instagram Android WebView UA must trigger isWebView');

// Facebook Android WebView
const fbUA = "Mozilla/5.0 (Linux; Android 14; SM-S908B Build/UP1A.231005.007; wv) AppleWebKit/537.36 [FBAN/EMA;FBAV/410.0.0.12.115;]";
assert(webViewRegex.test(fbUA), 'Facebook Android WebView UA must trigger isWebView');

// Standard Android System WebView
const standardAndroidWV = "Mozilla/5.0 (Linux; U; Android 13; zh-CN; MI 11 Build/TKQ1.220829.002; wv) AppleWebKit/537.36 Version/4.0 Chrome/116.0.0.0 Mobile Safari/537.36";
assert(webViewRegex.test(standardAndroidWV), 'Standard Android System WebView UA must trigger isWebView');

// iPhone Safari
const iphoneUA = "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1";
assert(iosRegex.test(iphoneUA), 'iPhone Safari UA must trigger isIOS');

// Desktop Chrome (must NOT trigger either fallback)
const desktopUA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36";
assert(!webViewRegex.test(desktopUA), 'Desktop Chrome UA must NOT trigger isWebView');
assert(!iosRegex.test(desktopUA), 'Desktop Chrome UA must NOT trigger isIOS');

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
