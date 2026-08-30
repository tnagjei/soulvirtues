// input: Search Console data used by quick-wins and second-page reports
// output: reports/gsc/day30-review.md plus ignored structured report evidence
// pos: Day 30 one-shot SEO opportunity review（更新规则：文件变更需同步本注释与所属目录 README）

import fs from 'node:fs';
import path from 'node:path';
import { execFileSync, spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SITE = 'sc-domain:soulvirtues.org';
const LABEL = 'com.tangjei.soulvirtues.day30-review';
const PLIST = path.join(process.env.HOME, 'Library', 'LaunchAgents', `${LABEL}.plist`);
const SEO = '/Users/tangjei/.local/bin/seo';
const ENV = { ...process.env, PATH: '/Users/tangjei/.local/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin', TZ: 'Asia/Shanghai' };

function runReport(id, params) {
  const result = spawnSync(SEO, ['reports', 'run', id, '--params', JSON.stringify(params), '--json'], { cwd: ROOT, env: ENV, encoding: 'utf8', maxBuffer: 20 * 1024 * 1024 });
  const output = `${result.stdout || ''}\n${result.stderr || ''}`;
  const failureClass = /(429|quota|resource_exhausted|rate.?limit|daily.?limit|too many requests|limit.*exceeded)/i.test(output) ? 'quota' : 'other';
  if (result.status !== 0) return { ok: false, code: result.status, stderr: result.stderr || '', value: null, failureClass };
  try { return { ok: true, code: 0, stderr: result.stderr || '', value: JSON.parse(result.stdout), failureClass: 'none' }; }
  catch (error) { return { ok: false, code: 1, stderr: `JSON parse error: ${error.message}`, value: null, failureClass: 'other' }; }
}

function positionOf(item) {
  for (const key of ['position', 'averagePosition', 'avgPosition']) {
    const value = Number(item?.[key]);
    if (Number.isFinite(value)) return value;
  }
  for (const parent of ['metrics', 'performance']) {
    const value = Number(item?.[parent]?.position ?? item?.[parent]?.averagePosition);
    if (Number.isFinite(value)) return value;
  }
  return null;
}

function selfDestruct() {
  const uid = execFileSync('/usr/bin/id', ['-u'], { encoding: 'utf8' }).trim();
  try { execFileSync('/bin/launchctl', ['bootout', `gui/${uid}`, PLIST], { stdio: 'ignore' }); }
  catch { try { execFileSync('/bin/launchctl', ['bootout', `gui/${uid}/${LABEL}`], { stdio: 'ignore' }); } catch (error) { console.error(`Self-destruct warning: ${error.message}`); } }
  try { fs.unlinkSync(PLIST); } catch (error) { if (error.code !== 'ENOENT') console.error(`plist delete warning: ${error.message}`); }
}

const reportDir = path.join(ROOT, 'reports', 'gsc');
const evidenceDir = path.join(ROOT, 'seo-input', 'gsc-api');
fs.mkdirSync(reportDir, { recursive: true });
fs.mkdirSync(evidenceDir, { recursive: true });
const results = {};
let preserveForQuotaRetry = false;

try {
  results.quickWins = runReport('quick-wins', { site: SITE, days: 7, limit: 100, minImpressions: 0, includeBrand: false, verifyContent: false, refresh: true });
  results.secondPage = runReport('second-page', { site: SITE, range: 7, limit: 100, minImpressions: 0, includeBrand: false, verifyContent: false, refresh: true });
  preserveForQuotaRetry = results.quickWins.failureClass === 'quota' || results.secondPage.failureClass === 'quota';
  fs.writeFileSync(path.join(evidenceDir, 'day30-quick-wins.json'), JSON.stringify(results.quickWins.value || { ok: results.quickWins.ok, stderr: results.quickWins.stderr }, null, 2));
  fs.writeFileSync(path.join(evidenceDir, 'day30-second-page.json'), JSON.stringify(results.secondPage.value || { ok: results.secondPage.ok, stderr: results.secondPage.stderr }, null, 2));

  const quickItems = results.quickWins.value?.output?.items || results.quickWins.value?.findings?.items || [];
  const secondItems = results.secondPage.value?.output?.items || results.secondPage.value?.findings?.items || [];
  const quickCandidates = Array.isArray(quickItems) ? quickItems.filter(item => positionOf(item) >= 4 && positionOf(item) <= 10) : [];
  const secondCandidates = Array.isArray(secondItems) ? secondItems.filter(item => positionOf(item) >= 11 && positionOf(item) <= 20) : [];
  const quickRows = quickCandidates.map(item => `| ${item.query || item.key || '未提供'} | ${item.page || item.url || '未提供'} | ${positionOf(item)} | ${item.ctr ?? '未提供'} | ${item.impressions ?? '未提供'} | Title：保留搜索意图，把核心词放在标题前部；Meta：说明测试工具的直接价值并保持与页面实际内容一致。 |`).join('\n');
  const secondRows = secondCandidates.map(item => `| ${item.query || item.key || '未提供'} | ${item.page || item.url || '未提供'} | ${positionOf(item)} | ${item.impressions ?? '未提供'} | H2：围绕该搜索词增加一个独立解释段，先确认意图与现有页面主题一致，再扩充示例、步骤或 FAQ。 |`).join('\n');
  const report = [
    '# Day 30 满月收益与潜力词挖掘',
    '',
    `生成时间：${new Date().toISOString()}`,
    `站点：${SITE}`,
    '',
    '## 说明',
    '',
    '本报告保留 SEO CLI 原始结果。quick-wins 的 CTR 与优先级是启发式信号，不是预期点击增量；平均排名也不是固定排名。Title、Meta、H2 建议必须先人工核对搜索意图、线上页面与现有文案，再决定是否改动。',
    '',
    '## Quick-wins：排名 4 至 10 的低 CTR 页面',
    '',
    '| 搜索词 | 页面 | 平均排名 | CTR | 展示 | Title 与 Meta 建议 |',
    '|---|---|---:|---:|---:|---|',
    quickRows || `没有返回可验证的 4 至 10 名项目（原始候选 ${Array.isArray(quickItems) ? quickItems.length : 0} 条）；不能据此证明不存在低 CTR 页面。`,
    '',
    '🚨 报告本身可能使用更宽的 Page-one 启发式筛选。表中排名不在 4 至 10 的项目不得当作本任务目标，必须剔除或人工复核。',
    '',
    '## Second-page：排名 11 至 20 的潜力词',
    '',
    '| 搜索词 | 页面 | 平均排名 | 展示 | H2 扩充建议 |',
    '|---|---|---:|---:|---|',
    secondRows || `没有返回可验证的 11 至 20 名项目（原始候选 ${Array.isArray(secondItems) ? secondItems.length : 0} 条）；不能据此证明不存在第二页潜力词。`,
    '',
    '## 运行状态与证据',
    '',
    `- quick-wins：${results.quickWins.ok ? '完成' : '失败'}；原始 JSON：\`${path.join(evidenceDir, 'day30-quick-wins.json')}\``,
    `- second-page：${results.secondPage.ok ? '完成' : '失败'}；原始 JSON：\`${path.join(evidenceDir, 'day30-second-page.json')}\``,
    `- 额度状态：${preserveForQuotaRetry ? '**QUOTA_EXHAUSTED（额度耗尽，保留 plist 等待后续日期重试）**' : '未识别到额度耗尽错误'}`,
    `- quick-wins stderr：${results.quickWins.stderr || '无'}`,
    `- second-page stderr：${results.secondPage.stderr || '无'}`,
    '',
    '## 不可直接推出的结论',
    '',
    '- 低 CTR 不等于 Title 或 Meta 一定有问题，也不能保证修改后点击增加。',
    '- 第二页词不等于一定应该新增内容；先确认搜索意图没有被现有页面覆盖或发生关键词蚕食。',
  ];
  fs.writeFileSync(path.join(reportDir, 'day30-review.md'), report.join('\n'), 'utf8');
  console.log(`Day 30 report: ${path.join(reportDir, 'day30-review.md')}`);
} catch (error) {
  fs.writeFileSync(path.join(reportDir, 'day30-review.md'), `# Day 30 满月收益与潜力词挖掘\n\n状态：**执行失败，未提出可验证建议**\n\n${error.stack || error.message}\n`, 'utf8');
  console.error(error.stack || error.message);
  process.exitCode = 1;
} finally {
  if (preserveForQuotaRetry) console.log(`Quota exhausted: ${PLIST} retained for the configured retry dates.`);
  else selfDestruct();
}
