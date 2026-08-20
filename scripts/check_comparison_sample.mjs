// input: Built Astro output in dist/ for the six approved comparison pairs
// output: Exit 0 only when all localized routes, SEO tags, evidence boundary, and internal links are present
// pos: scripts/check_comparison_sample.mjs (更新规则：对比页验收变化需同步本注释与 scripts/README.md)

import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const pairs = [
  { slug: 'bravery-vs-determination', left: 'bravery', right: 'determination' },
  { slug: 'determination-vs-perseverance', left: 'determination', right: 'perseverance' },
  { slug: 'integrity-vs-justice', left: 'integrity', right: 'justice' },
  { slug: 'kindness-vs-patience', left: 'kindness', right: 'patience' },
  { slug: 'bravery-vs-patience', left: 'bravery', right: 'patience' },
  { slug: 'justice-vs-kindness', left: 'justice', right: 'kindness' },
];
const locales = [
  { lang: 'en', prefix: '' },
  { lang: 'ja', prefix: '/ja' },
  { lang: 'es', prefix: '/es' },
  { lang: 'pt', prefix: '/pt' },
];
const languagePrefixes = ['', '/ja', '/es', '/pt'];

async function load(path) {
  return readFile(new URL(`../${path}`, import.meta.url), 'utf8');
}

for (const pair of pairs) {
  for (const locale of locales) {
    const pathPrefix = locale.prefix ? `${locale.prefix.slice(1)}/` : '';
    const html = await load(`dist/${pathPrefix}compare/${pair.slug}/index.html`);

    assert.match(html, new RegExp(`<html lang="${locale.lang}"`));
    assert.match(html, new RegExp(`<link rel="canonical" href="https://soulvirtues.org${locale.prefix}/compare/${pair.slug}"`));
    if (locale.lang === 'en') {
      const title = html.match(/<title>(.*?)<\/title>/)?.[1] || '';
      const description = html.match(/<meta name="description" content="([^"]+)"/)?.[1] || '';
      assert.ok(title.length >= 50 && title.length <= 60, `${pair.slug} title length: ${title.length}`);
      assert.ok(description.length >= 140 && description.length <= 160, `${pair.slug} description length: ${description.length}`);
    }
    for (const prefix of languagePrefixes) {
      assert.match(html, new RegExp(`hreflang="${prefix ? prefix.slice(1) : 'en'}" href="https://soulvirtues.org${prefix}/compare/${pair.slug}"`));
      assert.match(html, new RegExp(`href="${prefix}/compare/${pair.slug}"`));
    }
    assert.match(html, /"@type":"BreadcrumbList"/);
    assert.match(html, /"@type":"Article"/);
    assert.match(html, new RegExp(`href="${locale.prefix}/souls/${pair.left}"`));
    assert.match(html, new RegExp(`href="${locale.prefix}/souls/${pair.right}"`));
    assert.match(html, new RegExp(`href="${locale.prefix}/#test"`));
  }
}

const english = await load('dist/compare/determination-vs-perseverance/index.html');
assert.match(english, /The game does not explicitly name the red SOUL trait Determination/);
assert.match(english, /Determination rejects the ending; Perseverance keeps the routine/);

for (const pair of pairs) {
  for (const trait of [pair.left, pair.right]) {
    const html = await load(`dist/souls/${trait}/index.html`);
    assert.match(html, new RegExp(`href="/compare/${pair.slug}"`));
  }
}

const home = await load('dist/index.html');
assert.match(home, /id="btn-compare-top-souls"/);
for (const pair of pairs) {
  assert.match(home, new RegExp(pair.slug));
}

const sitemap = await load('public/sitemap.xml');
for (const pair of pairs) {
  for (const locale of locales) {
    assert.match(sitemap, new RegExp(`<loc>https://soulvirtues.org${locale.prefix}/compare/${pair.slug}</loc>`));
  }
}
assert.equal((sitemap.match(/<loc>https:\/\/soulvirtues\.org\/(?:ja\/|es\/|pt\/)?compare\//g) || []).length, 24);

console.log('PASS: 24 comparison routes, SEO tags, evidence boundary, and internal links verified.');
