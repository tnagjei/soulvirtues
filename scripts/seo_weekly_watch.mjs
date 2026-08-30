// input: Current site crawl, technical-watch, and decaying-pages parameters
// output: reports/gsc/weekly/YYYY-MM-DD.md plus ignored structured evidence
// pos: Day 60 onward weekly SEO watch（更新规则：文件变更需同步本注释与所属目录 README）

import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SITE = 'sc-domain:soulvirtues.org';
const ORIGIN = 'https://soulvirtues.org/';
const SITEMAP = 'https://soulvirtues.org/sitemap.xml';
const LAUNCH_DATE = '2026-08-17';
const FIRST_ALLOWED_DATE = '2026-10-16';
const SEO = '/Users/tangjei/.local/bin/seo';
const ENV = { ...process.env, PATH: '/Users/tangjei/.local/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin', TZ: 'Asia/Shanghai' };

function localDate() {
  const parts = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Shanghai', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(new Date());
  return `${parts.find(p => p.type === 'year').value}-${parts.find(p => p.type === 'month').value}-${parts.find(p => p.type === 'day').value}`;
}

function runReport(id, params) {
  const result = spawnSync(SEO, ['reports', 'run', id, '--params', JSON.stringify(params), '--json'], { cwd: ROOT, env: ENV, encoding: 'utf8', maxBuffer: 20 * 1024 * 1024 });
  const output = `${result.stdout || ''}\n${result.stderr || ''}`;
  const failureClass = /(429|quota|resource_exhausted|rate.?limit|daily.?limit|too many requests|limit.*exceeded)/i.test(output) ? 'quota' : 'other';
  if (result.status !== 0) return { ok: false, code: result.status, stderr: result.stderr || '', value: null, failureClass };
  try { return { ok: true, code: 0, stderr: result.stderr || '', value: JSON.parse(result.stdout), failureClass: 'none' }; }
  catch (error) { return { ok: false, code: 1, stderr: `JSON parse error: ${error.message}`, value: null, failureClass: 'other' }; }
}

const reportDate = localDate();
const reportDir = path.join(ROOT, 'reports', 'gsc', 'weekly');
const evidenceDir = path.join(ROOT, 'seo-input', 'gsc-api');
fs.mkdirSync(reportDir, { recursive: true });
fs.mkdirSync(evidenceDir, { recursive: true });

if (reportDate < FIRST_ALLOWED_DATE) {
  console.log(`Weekly watch skipped: ${reportDate} is before ${FIRST_ALLOWED_DATE}; launchd remains registered.`);
  process.exit(0);
}

const results = {};
try {
  results.technicalWatch = runReport('technical-watch', { site: SITE, startUrl: ORIGIN, sitemaps: [SITEMAP], maxPages: 1000, maxDepth: 10, concurrency: 2, fetchIntervalMs: 250, refresh: true, js: false, inspectLimit: 25, maxUrls: 1000 });
  results.decayingPages = runReport('decaying-pages', { site: SITE, days: 7, limit: 100, comparison: 'previous-period', minDropPct: 20, minPreviousClicks: 1, minClickLoss: 1, includeBrand: false, refresh: true });
  fs.writeFileSync(path.join(evidenceDir, `weekly-${reportDate}-technical-watch.json`), JSON.stringify(results.technicalWatch.value || { ok: results.technicalWatch.ok, stderr: results.technicalWatch.stderr }, null, 2));
  fs.writeFileSync(path.join(evidenceDir, `weekly-${reportDate}-decaying-pages.json`), JSON.stringify(results.decayingPages.value || { ok: results.decayingPages.ok, stderr: results.decayingPages.stderr }, null, 2));
  const report = [
    `# SEO 每周常规巡检 ${reportDate}`,
    '',
    `生成时间：${new Date().toISOString()}`,
    `站点：${SITE}`,
    `上线日期：${LAUNCH_DATE}`,
    '',
    '## 执行结果',
    '',
    `- technical-watch：${results.technicalWatch.ok ? '完成' : '失败'}；负责全站 crawl、HTTP 状态、重定向、死链与技术变化证据。`,
    `- decaying-pages：${results.decayingPages.ok ? '完成' : '失败'}；筛选本周相对上周点击流失超过 20% 的页面。`,
    `- 额度状态：${results.technicalWatch.failureClass === 'quota' || results.decayingPages.failureClass === 'quota' ? '**QUOTA_EXHAUSTED（额度耗尽）**' : '未识别到额度耗尽错误'}`,
    `- technical-watch 摘要：${results.technicalWatch.value?.summary || results.technicalWatch.value?.headline || '未提供（API未返回）'}`,
    `- decaying-pages 摘要：${results.decayingPages.value?.summary || results.decayingPages.value?.headline || '未提供（API未返回）'}`,
    '',
    '## 读数边界',
    '',
    '- crawl 成功不等于每个 URL 都可抓取、已收录或没有问题；部分、截断或失败的来源必须保留。',
    '- 点击下降是关联信号，不证明原因来自旧内容；缺失行不能当作零点击。',
    '- 发现新增 404、死链或点击流失页面后，只生成调查入口，不自动修改网站代码。',
    '',
    '## 原始证据',
    '',
    `- technical-watch：\`${path.join(evidenceDir, `weekly-${reportDate}-technical-watch.json`)}\``,
    `- decaying-pages：\`${path.join(evidenceDir, `weekly-${reportDate}-decaying-pages.json`)}\``,
    `- technical-watch stderr：${results.technicalWatch.stderr || '无'}`,
    `- decaying-pages stderr：${results.decayingPages.stderr || '无'}`,
  ];
  fs.writeFileSync(path.join(reportDir, `${reportDate}.md`), report.join('\n'), 'utf8');
  console.log(`Weekly report: ${path.join(reportDir, `${reportDate}.md`)}`);
} catch (error) {
  fs.writeFileSync(path.join(reportDir, `${reportDate}.md`), `# SEO 每周常规巡检 ${reportDate}\n\n状态：**执行失败，证据不可用**\n\n${error.stack || error.message}\n`, 'utf8');
  console.error(error.stack || error.message);
  process.exitCode = 1;
}
