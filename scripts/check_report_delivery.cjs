// input: Report page source and real report delivery modules
// output: Regression checks for runnable scripts, real score mapping and bounded failure states
// pos: scripts/check_report_delivery.cjs (更新规则：交付协议变更需同步此回归与 scripts/README.md)

const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const { buildSync } = require('esbuild');
const source = fs.readFileSync('src/pages/success.astro', 'utf8');
for (const match of source.matchAll(/<script\s+is:inline\b[^>]*>([\s\S]*?)<\/script>/g)) {
  new vm.Script(match[1]);
}
// Astro scripts must be checked as browser code too; tsc alone skips inline JS.
const compiled = source.match(/<script>([\s\S]*?)<\/script>/);
assert(compiled, 'The report script must be compiled by Astro');
require('esbuild').transformSync(compiled[1], { loader: 'ts' });
function bundle(entry) {
  const result = buildSync({ entryPoints: [entry], bundle: true, write: false, platform: 'node', format: 'cjs' });
  const module = { exports: {} };
  new Function('require', 'module', 'exports', result.outputFiles[0].text)(require, module, module.exports);
  return module.exports;
}

async function run() {
  const delivery = bundle('src/data/reportDelivery.ts');
  const handler = bundle('functions/api/generate-report.ts');
  const input = delivery.normalizeReportInput({ pct: { DET: 90, BRV: 60, JUS: 70, KND: 30, PAT: 40, INT: 50, PER: 20 }, lang: 'es' });
  assert.equal(input.scores.red, 90);
  assert.equal(input.scores.green, 30);
  assert.equal(input.dominant, 'red');
  assert.equal(input.secondary, 'yellow');
  assert.equal(delivery.normalizeReportInput({ scores: { red: 80 } }), null);
  const neutral = delivery.normalizeReportInput({ scores: Object.fromEntries(Object.keys(input.scores).map(k => [k, 50])) });
  assert.equal(neutral.dominant, null);
  assert.equal(neutral.secondary, null);
  const response = await handler.onRequest({ request: new Request('https://example.com/api/generate-report', { method: 'POST', body: JSON.stringify(input) }), env: {} });
  const report = await response.json();
  assert.equal(report.source, 'synthesis');
  assert(delivery.isDossierReport(report));
  for (const color of Object.keys(input.scores)) {
    const profile = { scores: Object.fromEntries(Object.keys(input.scores).map(k => [k, k === color ? 90 : 50])), lang: 'es' };
    const r = await handler.onRequest({ request: new Request('https://example.com/api', { method: 'POST', body: JSON.stringify(profile) }), env: {} });
    assert(delivery.isDossierReport(await r.json()), 'Every profile must have a complete prepared guide');
  }
  const bad = await handler.onRequest({ request: new Request('https://example.com/api', { method: 'POST', body: JSON.stringify({ scores: { red: 90 } }) }), env: {} });
  assert.equal(bad.status, 400);
  assert(!delivery.isDossierReport({ ...report, actionPlan: {} }));
  const original = global.fetch;
  const originalTimer = global.setTimeout;
  try {
    const makeRequest = () => ({ request: new Request('https://example.com/api', { method: 'POST', body: JSON.stringify(input) }), env: { DEEPSEEK_API_KEY: 'test-only-not-a-real-key' } });
    for (const status of [402, 500]) {
      global.fetch = async () => new Response('', { status });
      const result = await handler.onRequest(makeRequest());
      assert.equal((await result.json()).source, 'synthesis');
    }
    global.fetch = async () => Response.json({ choices: [{ message: { content: '{"archetypeTitle":"partial"}' } }] });
    assert.equal((await (await handler.onRequest(makeRequest())).json()).source, 'synthesis');
    global.setTimeout = (callback, delay, ...args) => originalTimer(callback, delay === 7500 ? 5 : delay, ...args);
    global.fetch = async (_url, init) => ({ ok: true, json: () => new Promise((_resolve, reject) => init.signal.addEventListener('abort', () => reject(new Error('body timed out')))) });
    assert.equal((await (await handler.onRequest(makeRequest())).json()).source, 'synthesis');
    global.setTimeout = originalTimer;
    global.fetch = async () => Response.json(report);
    assert.equal((await delivery.fetchDossier('/api', input)).source, 'synthesis');
    global.fetch = async () => new Response('unavailable', { status: 500 });
    await assert.rejects(delivery.fetchDossier('/api', input), /unavailable/);
    global.fetch = async () => new Response('<html>404</html>');
    await assert.rejects(delivery.fetchDossier('/api', input));
    global.fetch = async () => Response.json({ ...report, combat: {} });
    await assert.rejects(delivery.fetchDossier('/api', input), /Incomplete/);
    global.fetch = async (_url, init) => new Promise((_resolve, reject) => init.signal.addEventListener('abort', () => reject(new Error('timed out'))));
    await assert.rejects(delivery.fetchDossier('/api', input, 5), /timed out/);
    global.fetch = async (_url, init) => ({ ok: true, json: () => new Promise((_resolve, reject) => init.signal.addEventListener('abort', () => reject(new Error('body timed out')))) });
    await assert.rejects(delivery.fetchDossier('/api', input, 5), /body timed out/);
  } finally { global.fetch = original; global.setTimeout = originalTimer; }
  console.log('PASS: report syntax, score mapping, neutral profile, complete schema, HTTP/JSON failures and full-body timeout');
}
run().catch(error => { console.error(error); process.exitCode = 1; });
