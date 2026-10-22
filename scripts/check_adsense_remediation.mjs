// input: Built pages, current source data and the synthetic scoring example
// output: Focused checks for free-result order, localized checkout, worked scores, hub boundaries and trait question ledgers
// pos: scripts/check_adsense_remediation.mjs（更新规则：本次整改契约变化同步本检查与所属目录 README）

import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { build } from 'esbuild';

const bundle = await build({
  stdin: { contents: "export * from './src/data/scoringExample'; export * from './src/i18n'; export * from './src/data/soulDetailsI18n';", resolveDir: process.cwd() },
  bundle: true, platform: 'node', format: 'esm', write: false,
});
const data = await import('data:text/javascript;base64,' + Buffer.from(bundle.outputFiles[0].text).toString('base64'));
const example = data.SCORING_EXAMPLE;
assert.equal(example.answers.length, 66);
assert.equal(example.result.answeredCount, 66);
assert.deepEqual(example.changed.map(item => item.id), ['V2-BRV-01', 'V2-BRV-03']);
assert.deepEqual(example.changed.map(item => [item.answer + 1, item.keyed, item.reverse]), [[5, 5, false], [1, 5, true]]);
assert.equal(example.itemCount, 9);
assert.equal(example.totalKeyed, 31);
assert.ok(Math.abs(example.result.pct.BRV - 100 * ((31 / 9) - 1) / 4) < 1e-10);
assert.deepEqual(Object.entries(example.result.pct).filter(([code]) => code !== 'BRV').map(([, score]) => score), Array(6).fill(50));
assert.equal(data.NEUTRAL_EXAMPLE.kind, 'balanced');
assert.equal(data.NEUTRAL_EXAMPLE.primarySoul, null);
assert.deepEqual(Object.values(data.NEUTRAL_EXAMPLE.pct), Array(7).fill(50));

const read = path => readFileSync(path, 'utf8');
for (const lang of data.locales) {
  const prefix = lang === 'en' ? '' : lang + '/';
  const home = read(`dist/${prefix}index.html`);
  const method = read(`dist/${prefix}method/index.html`);
  const order = ['result-summary', 'virtue-bars', 'btn-download-card', 'btn-review-answers', 'premium-unlock-card', 'checkout-consent', 'btn-checkout-waffo'];
  const positions = order.map(id => home.indexOf(`id="${id}"`));
  assert.ok(positions.every((position, index) => position >= 0 && (index === 0 || position > positions[index - 1])), `${lang}: free results must precede purchase`);
  assert.doesNotMatch(home, /FULL PERSONAL WORKBOOK LOCKED|blur-\[3px\]|id="preview-clear-text"/);
  assert.match(home, new RegExp(`href="/${prefix}method/#worked-example"`));
  assert.match(method, /id="worked-example"/);
  assert.equal((method.match(/data-example-item=/g) || []).length, 2);
  assert.equal((method.match(/data-example-score=/g) || []).length, 7);
  const checkout = data.getTranslations(lang).quizUI.checkout;
  assert.ok(Object.values(checkout).every(value => typeof value === 'string' && value.length > 0));
  assert.match(checkout.consent, /66/);
  assert.match(checkout.consent, /30/);
  assert.match(checkout.consent, /DeepSeek/);
  assert.match(checkout.submit, /4\.93/);
  const questions = data.getTranslations(lang).questions;
  for (const item of example.changed) assert.ok(method.includes(questions[item.index].id));
  for (const [slug, detail] of Object.entries(data.getLocalizedSoulDetails(lang))) {
    const html = read(`dist/${prefix}souls/${slug}/index.html`);
    assert.ok(html.indexOf('id="reflection-worksheet"') > html.indexOf('id="assessment-definition"'));
    assert.ok(html.indexOf('id="trait-questions"') > html.indexOf('id="assessment-definition"'));
    assert.ok(html.indexOf('id="reflection-worksheet"') > html.indexOf('id="trait-questions"'));
    assert.equal(detail.deepDive.length, 2);
    assert.ok(detail.deepDive.every(paragraph => paragraph.trim().length > 40));
    assert.doesNotMatch(html, /Immunity to despair|Capacity to reshape reality|therefore decides best/);
  }
  const hub = read(`dist/${prefix}souls/index.html`);
  assert.doesNotMatch(hub, /actually dominant in you|只有.*和玩家|only the fallen human|最も希少|solo el humano caído|apenas o humano caído|только.*игрок/);
  const faqs = [...hub.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)]
    .flatMap(match => JSON.parse(match[1])['@graph'] || [])
    .filter(item => item['@type'] === 'FAQPage');
  assert.equal(faqs.length, 1, `${lang}: hub FAQ schema`);
  assert.equal(faqs[0].mainEntity.length, 4, `${lang}: hub FAQ items`);
}

const privacy = read('dist/privacy/index.html');
assert.match(read('dist/ja/compare/determination-vs-perseverance/index.html'), /ケツイ vs こんき/);
assert.match(read('dist/ja/souls/index.html'), /本サイトの表記/);
assert.doesNotMatch(privacy, /report text generation on non-identifying scores|consists of non-identifying numeric scores/);
assert.doesNotMatch(read('dist/success/index.html'), /adsbygoogle|clarity\.ms|googletagmanager/);
assert.doesNotMatch(read('dist/404.html'), /adsbygoogle|clarity\.ms|googletagmanager/);
assert.doesNotMatch(read('public/robots.txt'), /llms-full\.txt/);
assert.doesNotMatch(read('public/llms.txt'), /llms-full\.txt/);
console.log('PASS: reproducible scores, five-language free-result order/checkout, 35 reviewed reflection pages and privacy boundaries.');
