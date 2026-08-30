// input: GSC final/all data, site crawl output, and index-coverage report parameters
// output: reports/gsc/day15-review.md plus ignored raw evidence files
// pos: Day 15 one-shot SEO gate（更新规则：文件变更需同步本注释与所属目录 README）

import fs from 'node:fs';
import path from 'node:path';
import { execFileSync, spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SITE = 'sc-domain:soulvirtues.org';
const ORIGIN = 'https://soulvirtues.org/';
const SITEMAP = 'https://soulvirtues.org/sitemap.xml';
const LABEL = 'com.tangjei.soulvirtues.day15-review';
const PLIST = path.join(process.env.HOME, 'Library', 'LaunchAgents', `${LABEL}.plist`);
const GSC = '/Users/tangjei/.local/bin/gsc';
const SEO = '/Users/tangjei/.local/bin/seo';
const ENV = { ...process.env, PATH: '/Users/tangjei/.local/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin', TZ: 'Asia/Shanghai' };

function ensureDir(dir) { fs.mkdirSync(dir, { recursive: true }); }

function localDate() {
  const parts = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Shanghai', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(new Date());
  return `${parts.find(p => p.type === 'year').value}-${parts.find(p => p.type === 'month').value}-${parts.find(p => p.type === 'day').value}`;
}

function shiftDate(iso, days) {
  const date = new Date(`${iso}T00:00:00Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

function run(command, args) {
  const result = spawnSync(command, args, { cwd: ROOT, env: ENV, encoding: 'utf8', maxBuffer: 20 * 1024 * 1024 });
  const output = `${result.stdout || ''}\n${result.stderr || ''}`;
  const failureClass = result.status === 0 ? 'none' : (/(429|quota|resource_exhausted|rate.?limit|daily.?limit|too many requests|limit.*exceeded)/i.test(output) ? 'quota' : 'other');
  return { ok: result.status === 0, code: result.status, stdout: result.stdout || '', stderr: result.stderr || '', failureClass };
}

function runJson(command, args) {
  const result = run(command, args);
  if (!result.ok) return { ...result, value: null };
  try { return { ...result, value: JSON.parse(result.stdout) }; }
  catch (error) { return { ...result, value: null, stderr: `${result.stderr}\nJSON parse error: ${error.message}` }; }
}

function findSavedReportId(value) {
  if (!value || typeof value !== 'object') return null;
  for (const key of ['crawlReportId', 'savedReportId', 'reportId']) {
    if (typeof value[key] === 'string' && value[key] !== 'site-crawl') return value[key];
  }
  for (const child of Object.values(value)) {
    const found = findSavedReportId(child);
    if (found) return found;
  }
  return null;
}

function consecutiveRuns(rows) {
  const dimensions = rows?.dimensions || [];
  const queryIndex = dimensions.indexOf('query');
  const dateIndex = dimensions.indexOf('date');
  if (queryIndex < 0 || dateIndex < 0) return [];
  const datesByQuery = new Map();
  for (const row of rows.rows || []) {
    const query = row.keys?.[queryIndex];
    const date = row.keys?.[dateIndex];
    if (query && date && Number(row.impressions) > 0) {
      if (!datesByQuery.has(query)) datesByQuery.set(query, new Set());
      datesByQuery.get(query).add(date);
    }
  }
  const matches = [];
  for (const [query, dateSet] of datesByQuery) {
    const dates = [...dateSet].sort();
    let runStart = dates[0];
    let previous = dates[0];
    for (const date of dates.slice(1).concat([null])) {
      if (date && shiftDate(previous, 1) === date) {
        previous = date;
        continue;
      }
      if (runStart && previous && (new Date(`${previous}T00:00:00Z`) - new Date(`${runStart}T00:00:00Z`)) / 86400000 + 1 >= 3) {
        matches.push({ query, startDate: runStart, endDate: previous, days: (new Date(`${previous}T00:00:00Z`) - new Date(`${runStart}T00:00:00Z`)) / 86400000 + 1 });
      }
      runStart = date;
      previous = date;
    }
  }
  return matches;
}

function mdJson(value) { return `\n\`\`\`json\n${JSON.stringify(value, null, 2)}\n\`\`\`\n`; }

function selfDestruct() {
  let bootoutError = '';
  try { execFileSync('/bin/launchctl', ['bootout', `gui/${execFileSync('/usr/bin/id', ['-u'], { encoding: 'utf8' }).trim()}`, PLIST], { stdio: 'ignore' }); }
  catch (error) {
    try { execFileSync('/bin/launchctl', ['bootout', `gui/${execFileSync('/usr/bin/id', ['-u'], { encoding: 'utf8' }).trim()}/${LABEL}`], { stdio: 'ignore' }); }
    catch (secondError) { bootoutError = secondError.message; }
  }
  try { fs.unlinkSync(PLIST); } catch (error) { if (error.code !== 'ENOENT') bootoutError += `; plist delete: ${error.message}`; }
  if (bootoutError) console.error(`Self-destruct warning: ${bootoutError}`);
}

const reportDir = path.join(ROOT, 'reports', 'gsc');
const rawDir = path.join(ROOT, 'seo-input', 'gsc-api');
ensureDir(reportDir);
ensureDir(rawDir);
const endDate = shiftDate(localDate(), -1);
const startDate = shiftDate(endDate, -6);
const stamp = `${startDate}_${endDate}`;
const allPath = path.join(rawDir, `${stamp}_date-query-page-all.json`);
const finalPath = path.join(rawDir, `${stamp}_date-query-page-final.json`);
const results = {};
let preserveForQuotaRetry = false;

try {
  results.gscAll = run(GSC, ['query', '--start', startDate, '--end', endDate, '--dimensions', 'date,query,page', '--data-state', 'all', '--row-limit', '25000', '--output', allPath]);
  results.gscFinal = run(GSC, ['query', '--start', startDate, '--end', endDate, '--dimensions', 'date,query,page', '--data-state', 'final', '--row-limit', '25000', '--output', finalPath]);

  results.crawl = runJson(SEO, ['reports', 'run', 'site-crawl', '--params', JSON.stringify({ site: SITE, url: ORIGIN, sitemapUrl: SITEMAP, health: false, maxPages: 1000, maxDepth: 10, concurrency: 2, fetchIntervalMs: 250, refresh: true, js: false, includePages: true, includeIssues: true, saveReport: true }), '--json']);
  const crawlReportId = findSavedReportId(results.crawl.value);
  const coverageParams = { site: SITE, sitemaps: [SITEMAP], days: 7, rowLimit: 25000, maxSitemapUrls: 250000, refresh: true, ...(crawlReportId ? { crawlReportId } : {}) };
  results.indexCoverage = runJson(SEO, ['reports', 'run', 'index-coverage', '--params', JSON.stringify(coverageParams), '--json']);
  preserveForQuotaRetry = [results.gscAll, results.gscFinal, results.crawl, results.indexCoverage].some(result => result.failureClass === 'quota');

  const finalData = results.gscFinal.ok && fs.existsSync(finalPath) ? JSON.parse(fs.readFileSync(finalPath, 'utf8')) : null;
  const matches = consecutiveRuns(finalData);
  const capped = Number(finalData?.rowCount) >= 25000;
  const gatePassed = Boolean(results.gscAll.ok && results.gscFinal.ok && finalData && !capped && matches.length);
  const report = [
    '# Day 15 首期索引与门禁审核',
    '',
    `生成时间：${new Date().toISOString()}`,
    `站点：${SITE}`,
    `GSC 定稿窗口：${startDate} 至 ${endDate}（最近 7 个完整日期的请求窗口）`,
    '',
    '## 门禁结论',
    '',
    `状态：**${gatePassed ? '通过' : '未通过'}**`,
    `代码冻结：**${gatePassed ? '否' : '是'}**`,
    '',
    gatePassed ? '检测到至少一个搜索词连续 3 天或以上有展示。该结果只证明 GSC 返回的保留行存在连续展示，不证明排名、收录或流量因果。' : '未检测到满足条件的连续展示搜索词，或 GSC 数据失败、缺失、达到行数上限。按要求保持代码绝对冻结。',
    '',
    '## 连续 3 天展示搜索词',
    '',
    matches.length ? '| 搜索词 | 起始日期 | 结束日期 | 连续天数 |\n|---|---|---|---:|\n' + matches.map(item => `| ${item.query} | ${item.startDate} | ${item.endDate} | ${item.days} |`).join('\n') : '未发现可验证的连续 3 天展示搜索词。',
    '',
    '## 检查项与证据',
    '',
    `- GSC all 查询：${results.gscAll.ok ? '完成' : '失败'}；原始文件：\`${allPath}\`` ,
    `- GSC final 查询：${results.gscFinal.ok ? '完成' : '失败'}；原始文件：\`${finalPath}\`` ,
    `- 额度状态：${preserveForQuotaRetry ? '**QUOTA_EXHAUSTED（额度耗尽，保留 plist 等待后续日期重试）**' : '未识别到额度耗尽错误'}`,
    `- final 返回行数：${finalData?.rowCount ?? '未提供（API未返回）'}；维度：${finalData?.dimensions?.join(',') || '未提供（API未返回）'}`,
    `- Sitemap 与重定向/死链 crawl：${results.crawl.ok ? '完成' : '失败'}；保存的 crawl 报告 ID：${findSavedReportId(results.crawl.value) || '未提供（未保存或命令失败）'}`,
    `- index-coverage：${results.indexCoverage.ok ? '完成' : '失败'}；该报告不把没有 Search Analytics 行直接判定为未收录。`,
    `- 行数上限：${capped ? '触发 25,000 行上限，结果不完整' : '未触发'}`,
    '',
    '## 失败与限制',
    '',
    '- crawl 的 HTTP 状态、重定向与链接问题属于现场观察，不能替代 Google URL Inspection 的收录结论。',
    '- GSC 缺少某个日期或搜索词行不等于该词没有展示；如果 API 失败、结果被截断或来源不完整，门禁保持未通过。',
    '',
    '## 原始运行结果',
    '',
    `GSC all 命令输出：${mdJson({ ok: results.gscAll.ok, code: results.gscAll.code, stderr: results.gscAll.stderr })}`,
    `GSC final 命令输出：${mdJson({ ok: results.gscFinal.ok, code: results.gscFinal.code, stderr: results.gscFinal.stderr })}`,
    `site-crawl 输出：${mdJson(results.crawl.value || { ok: results.crawl.ok, stderr: results.crawl.stderr })}`,
    `index-coverage 输出：${mdJson(results.indexCoverage.value || { ok: results.indexCoverage.ok, stderr: results.indexCoverage.stderr })}`,
  ];
  fs.writeFileSync(path.join(reportDir, 'day15-review.md'), report.join('\n'), 'utf8');
  console.log(`Day 15 report: ${path.join(reportDir, 'day15-review.md')}`);
  console.log(`Gate: ${gatePassed ? 'PASS' : 'FAIL/FROZEN'}`);
} catch (error) {
  fs.writeFileSync(path.join(reportDir, 'day15-review.md'), `# Day 15 首期索引与门禁审核\n\n状态：**未通过**\n\n代码冻结：**是**\n\n执行异常：${error.stack || error.message}\n`, 'utf8');
  console.error(error.stack || error.message);
  process.exitCode = 1;
} finally {
  if (preserveForQuotaRetry) console.log(`Quota exhausted: ${PLIST} retained for the configured retry dates.`);
  else selfDestruct();
}
