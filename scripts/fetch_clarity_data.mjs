// input: CLARITY_API_TOKEN（环境变量）与可选 CLARITY_NUM_DAYS（1-3）
// output: 最近 1-3 天的 Clarity 原始 JSON，写入被 Git 忽略的 seo-input/clarity-api/
// pos: scripts/fetch_clarity_data.mjs（更新规则：文件变更需同步本注释与 scripts/README.md）

import { mkdir, writeFile } from 'node:fs/promises';
import { execFile } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const execFileAsync = promisify(execFile);
const numOfDays = Number(process.env.CLARITY_NUM_DAYS || 3);
const endpoint = 'https://www.clarity.ms/export-data/api/v1/project-live-insights';

async function readToken() {
  const environmentToken = process.env.CLARITY_API_TOKEN?.trim();
  if (environmentToken) return environmentToken;
  if (process.platform !== 'darwin') return '';

  try {
    const { stdout } = await execFileAsync('/usr/bin/security', [
      'find-generic-password',
      '-s',
      'soulvirtues-clarity-api-token',
      '-w',
    ]);
    return String(stdout).trim();
  } catch {
    return '';
  }
}

const token = await readToken();

if (!token) {
  console.error('Clarity token is not configured; Clarity data was not requested.');
  process.exit(2);
}

if (![1, 2, 3].includes(numOfDays)) {
  console.error('CLARITY_NUM_DAYS must be 1, 2, or 3.');
  process.exit(2);
}

const requests = [
  ['overall', []],
  ['url', ['URL']],
  ['url-device', ['URL', 'Device']],
  ['url-source', ['URL', 'Source']],
];

const date = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'Asia/Shanghai',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
}).format(new Date());
const outputDir = path.join(root, 'seo-input', 'clarity-api');
await mkdir(outputDir, { recursive: true });

for (const [label, dimensions] of requests) {
  const params = new URLSearchParams({ numOfDays: String(numOfDays) });
  dimensions.forEach((dimension, index) => {
    params.set('dimension' + (index + 1), dimension);
  });

  const response = await fetch(endpoint + '?' + params, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  });

  if (!response.ok) {
    console.error('Clarity ' + label + ' request failed: HTTP ' + response.status + '.');
    process.exit(1);
  }

  const outputPath = path.join(outputDir, 'clarity-' + label + '-' + date + '.json');
  await writeFile(
    outputPath,
    JSON.stringify({
      provider: 'Microsoft Clarity Data Export API',
      fetchedAt: new Date().toISOString(),
      numOfDays,
      dimensions,
      data: await response.json(),
    }, null, 2) + '\n',
  );
  console.log(outputPath);
}
