// input: dist/ static build files, public/ static assets
// output: Comprehensive SEO audit for 74 indexable pages, the static 404, and sitemap parity
// pos: scripts/audit_site_seo.mjs (更新规则：脚本变更需同步本注释与 scripts/README.md)

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distDir = path.join(rootDir, 'dist');
const publicDir = path.join(rootDir, 'public');
const siteUrl = 'https://soulvirtues.org';
const expectedIndexablePageCount = 74;

function getFiles(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFiles(fullPath));
    } else if (file.endsWith('.html')) {
      results.push(fullPath);
    }
  }
  return results;
}

const notFoundPath = path.join(distDir, '404.html');
const htmlFiles = getFiles(distDir).filter(file => file !== notFoundPath && !path.basename(file).startsWith('naver'));
if (htmlFiles.length === 0) {
  console.error('Error: No HTML files found in dist/. Please run npm run build first.');
  process.exit(1);
}

const validRoutes = new Set(htmlFiles.map(f => {
  let rel = f.replace(distDir, '').replace(/index\.html$/, '');
  if (!rel.startsWith('/')) rel = '/' + rel;
  if (!rel.endsWith('/')) rel += '/';
  return rel;
}));

const publicFiles = [];
function getPublicFiles(dir) {
  if (!fs.existsSync(dir)) return;
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      getPublicFiles(fullPath);
    } else {
      publicFiles.push(fullPath.replace(publicDir, ''));
    }
  }
}
getPublicFiles(publicDir);
const validStaticAssets = new Set(publicFiles);

const pages = [];
const metaIssues = [];
const headingIssues = [];
const linkIssues = [];
const schemaIssues = [];
const imageIssues = [];

if (htmlFiles.length !== expectedIndexablePageCount) {
  metaIssues.push({
    page: '[build]',
    issue: `Expected ${expectedIndexablePageCount} indexable HTML pages, found ${htmlFiles.length}`,
  });
}

if (!fs.existsSync(notFoundPath)) {
  metaIssues.push({ page: '/404.html', issue: 'Missing static 404 page' });
} else {
  const notFoundContent = fs.readFileSync(notFoundPath, 'utf8');
  if (!/<meta\s+name=["']robots["']\s+content=["']noindex,\s*follow["']/i.test(notFoundContent)) {
    metaIssues.push({ page: '/404.html', issue: '404 page must use noindex,follow' });
  }
  if (!/<a\s+[^>]*href=["']\/["']/i.test(notFoundContent)) {
    linkIssues.push({ page: '/404.html', issue: '404 page must link to the homepage' });
  }
}

const sitemapPath = path.join(distDir, 'sitemap.xml');
if (!fs.existsSync(sitemapPath)) {
  metaIssues.push({ page: '/sitemap.xml', issue: 'Missing built sitemap.xml' });
} else {
  const sitemap = fs.readFileSync(sitemapPath, 'utf8');
  const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1].trim());
  const sitemapUrlSet = new Set(sitemapUrls);
  const expectedSitemapUrls = new Set([...validRoutes].map(route => `${siteUrl}${route}`));
  const missingSitemapUrls = [...expectedSitemapUrls].filter(url => !sitemapUrlSet.has(url));
  const extraSitemapUrls = [...sitemapUrlSet].filter(url => !expectedSitemapUrls.has(url));

  if (sitemapUrls.length !== sitemapUrlSet.size) {
    metaIssues.push({ page: '/sitemap.xml', issue: 'Duplicate <loc> entries found' });
  }
  if (sitemapUrls.length !== expectedIndexablePageCount) {
    metaIssues.push({
      page: '/sitemap.xml',
      issue: `Expected ${expectedIndexablePageCount} <loc> entries, found ${sitemapUrls.length}`,
    });
  }
  for (const url of missingSitemapUrls) {
    metaIssues.push({ page: '/sitemap.xml', issue: `Missing built route: ${url}` });
  }
  for (const url of extraSitemapUrls) {
    metaIssues.push({ page: '/sitemap.xml', issue: `Unknown sitemap route: ${url}` });
  }
}

for (const filePath of htmlFiles) {
  const content = fs.readFileSync(filePath, 'utf8');
  let relPath = filePath.replace(distDir, '').replace(/index\.html$/, '');
  if (!relPath.startsWith('/')) relPath = '/' + relPath;
  if (!relPath.endsWith('/')) relPath += '/';
  const pageUrl = siteUrl + relPath;

  const titleMatch = content.match(/<title>([^<]*)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : '';

  const descMatch = content.match(/<meta\s+name=["']description["']\s+content=["'](.*?)["']/i);
  const description = descMatch ? descMatch[1].trim() : '';

  const canonicalMatch = content.match(/<link\s+rel=["']canonical["']\s+href=["'](.*?)["']/i);
  const canonical = canonicalMatch ? canonicalMatch[1].trim() : '';

  const hreflangMatches = [...content.matchAll(/<link\s+rel=["']alternate["']\s+hreflang=["'](.*?)["']\s+href=["'](.*?)["']/gi)];
  const hreflangs = hreflangMatches.map(m => ({ lang: m[1], href: m[2] }));

  const headings = [];
  const headingRegex = /<h([1-6])[^>]*>([\s\S]*?)<\/h[1-6]>/gi;
  let hMatch;
  while ((hMatch = headingRegex.exec(content)) !== null) {
    const text = hMatch[2].replace(/<[^>]+>/g, '').trim();
    headings.push({ level: parseInt(hMatch[1], 10), text });
  }

  const jsonLdMatches = [...content.matchAll(/<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/gi)];
  const jsonLdBlocks = [];
  jsonLdMatches.forEach(m => {
    try {
      jsonLdBlocks.push(JSON.parse(m[1]));
    } catch (e) {
      schemaIssues.push({ page: relPath, issue: 'JSON-LD Parse Error: ' + e.message });
    }
  });

  const linkRegex = /<a\s+[^>]*href=["'](.*?)["']/gi;
  let lMatch;
  const links = [];
  while ((lMatch = linkRegex.exec(content)) !== null) {
    links.push(lMatch[1].trim());
  }

  const imgRegex = /<img\s+([^>]*?)>/gi;
  let imgMatch;
  const images = [];
  while ((imgMatch = imgRegex.exec(content)) !== null) {
    const tagContent = imgMatch[1];
    const srcMatch = tagContent.match(/src=["'](.*?)["']/i);
    const altMatch = tagContent.match(/alt=["'](.*?)["']/i);
    const ariaHiddenMatch = tagContent.match(/aria-hidden=["']true["']/i);
    images.push({
      src: srcMatch ? srcMatch[1] : '',
      alt: altMatch ? altMatch[1] : null,
      ariaHidden: Boolean(ariaHiddenMatch),
    });
  }

  // Audits
  if (!title) metaIssues.push({ page: relPath, issue: 'Missing <title>' });
  if (!description) metaIssues.push({ page: relPath, issue: 'Missing <meta description>' });
  if (canonical !== pageUrl) {
    metaIssues.push({ page: relPath, issue: `Canonical mismatch: expected ${pageUrl}, got ${canonical}` });
  }
  for (const h of hreflangs) {
    const targetRel = h.href.replace(siteUrl, '');
    if (!validRoutes.has(targetRel)) {
      metaIssues.push({ page: relPath, issue: `Broken hreflang target: ${h.href} (${h.lang})` });
    }
  }

  const h1s = headings.filter(h => h.level === 1);
  if (h1s.length === 0) headingIssues.push({ page: relPath, issue: 'Missing <h1>' });
  if (h1s.length > 1) headingIssues.push({ page: relPath, issue: `Multiple <h1> found (${h1s.length})` });
  for (const h of headings) {
    if (h.text.startsWith('#')) {
      headingIssues.push({ page: relPath, issue: `Heading contains raw markdown #: "${h.text}" (h${h.level})` });
    }
  }

  for (let link of links) {
    if (!link || link === '#' || link.startsWith('javascript:')) {
      linkIssues.push({ page: relPath, issue: `Placeholder link: href="${link}"` });
      continue;
    }
    let target = link.replace(siteUrl, '');
    if (target.startsWith('/') && !target.startsWith('//') && !target.startsWith('/cdn-cgi/')) {
      const [pathOnly] = target.split('#');
      if (pathOnly) {
        if (!pathOnly.endsWith('/') && !pathOnly.includes('.')) {
          linkIssues.push({ page: relPath, issue: `Missing trailing slash on link: "${link}"` });
        }
        if (!validRoutes.has(pathOnly) && !validStaticAssets.has(pathOnly)) {
          linkIssues.push({ page: relPath, issue: `Broken internal link: "${link}"` });
        }
      }
    }
  }

  if (jsonLdBlocks.length === 0) {
    schemaIssues.push({ page: relPath, issue: 'Missing JSON-LD structured data' });
  }

  for (const img of images) {
    if (img.alt === null) {
      imageIssues.push({ page: relPath, issue: `Image missing alt attribute: ${img.src}` });
    } else if (img.alt === '' && !img.ariaHidden) {
      imageIssues.push({ page: relPath, issue: `Image has empty alt attribute: ${img.src}` });
    }
  }

  pages.push({ relPath, title, description, canonical });
}

console.log('================== SEO AUDIT REPORT ==================');
console.log(`Total HTML Pages Checked: ${pages.length}`);
console.log(`Meta / Canonical / Hreflang Issues: ${metaIssues.length}`);
console.log(`Heading H1-H6 Issues: ${headingIssues.length}`);
console.log(`Internal Link & Route Issues: ${linkIssues.length}`);
console.log(`Schema.org Structured Data Issues: ${schemaIssues.length}`);
console.log(`Image Alt Attribute Issues: ${imageIssues.length}`);

const allIssuesCount = metaIssues.length + headingIssues.length + linkIssues.length + schemaIssues.length + imageIssues.length;

if (allIssuesCount > 0) {
  console.log('\nDetailed Issues Found:');
  if (metaIssues.length) console.log('Meta Issues:', metaIssues);
  if (headingIssues.length) console.log('Heading Issues:', headingIssues);
  if (linkIssues.length) console.log('Link Issues:', linkIssues);
  if (schemaIssues.length) console.log('Schema Issues:', schemaIssues);
  if (imageIssues.length) console.log('Image Issues:', imageIssues);
  process.exit(1);
} else {
  console.log(`\n✓ All ${pages.length} indexable pages, the static 404, and sitemap parity passed with zero errors.`);
}
