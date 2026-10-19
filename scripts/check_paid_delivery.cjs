// input: The changed payment handlers, native SQLite and ephemeral RSA fixtures
// output: Paid delivery, private recovery, retry and refund boundary checks without real money
// pos: scripts/check_paid_delivery.cjs (更新规则：支付协议变化同步本检查与 scripts/README.md)
const assert = require('node:assert/strict');
const fs = require('node:fs');
const { DatabaseSync } = require('node:sqlite');
const { generateKeyPairSync, sign, webcrypto } = require('node:crypto');
const { buildSync } = require('esbuild');
global.crypto = webcrypto;
function load(file) {
  const out = buildSync({ entryPoints: [file], bundle: true, write: false, platform: 'node', format: 'cjs' }).outputFiles[0].text;
  const m = { exports: {} }; new Function('require','module','exports',out)(require,m,m.exports); return m.exports;
}
const sql = new DatabaseSync(':memory:');
sql.exec(fs.readFileSync('migrations/0001_paid_reports.sql','utf8'));
sql.exec(fs.readFileSync('migrations/0002_ai_delivery.sql','utf8'));
sql.exec(fs.readFileSync('migrations/0003_delivery_maintenance.sql','utf8'));
let queued=[];
const db = { prepare(query) {
  const statement = sql.prepare(query); let values=[];
  return { bind(...v) { values=v; return this; }, async first() { return statement.get(...values) || null; }, async all() { return {results:statement.all(...values)}; }, async run() { return {meta:{changes:Number(statement.run(...values).changes)}}; } };
}};
const keys = generateKeyPairSync('rsa',{modulusLength:2048});
const env = { REPORTS_DB:db, DEEPSEEK_API_KEY:'fixture', AI_JOB_TOKEN:'fixture', REPORT_QUEUE:{async send(message){queued.push(message);}}, WAFFO_PRIVATE_KEY:keys.privateKey.export({type:'pkcs8',format:'pem'}), WAFFO_WEBHOOK_PUBLIC_KEY:keys.publicKey.export({type:'spki',format:'pem'}) };
const checkout = load('functions/api/create-checkout.ts');
const report = load('functions/api/report.ts');
const webhook = load('functions/api/waffo-webhook.ts');
const ai = load('functions/api/generate-report.ts');
const client = load('src/data/paidReport.ts');
const session = load('src/data/quizSession.ts');
const questions = load('src/data/questions.ts');
const guide = load('src/data/fieldGuide.ts');
const helpers = load('functions/_shared/waffo.ts');
const reports = load('functions/_shared/reports.ts');
let origin = helpers.APP_ORIGIN;
const id = 'd0536f4b-befb-4c62-a3a3-9d68f5519bda';
const token = 'a'.repeat(64);
const quiz = JSON.parse(session.encodeAnswers(guide.sampleGuideInput(), questions.QUESTIONS));
env.AI_TEST_REPORT_ID=id;
const body = {reportId:id,accessToken:token,quiz,lang:'en',consent:true,aiConsent:true};
let checkoutCalls=0, queryCalls=0, upstream={onetimeOrders:[],payments:[]}, holdQuery=null;
const realFetch=global.fetch;
global.fetch=async(url,init)=>{
  if(String(url).endsWith('/user/balance'))return Response.json({is_available:true,balance_infos:[{currency:'CNY',total_balance:'2.00'}]});
  if (String(url).includes('create-session')) {
    checkoutCalls++;
    const sent=JSON.parse(init.body);
    assert.equal(sent.orderMerchantExternalId,id);
    assert.equal(sent.metadata.reportId,id);
    assert.equal(sent.successUrl,origin+'/success/?report='+id);
    assert.deepEqual(sent.includePaymentMethods, env.WAFFO_MODE === 'test' ? ['wechat'] : undefined);
    assert(!('scores' in sent) && !('answers' in sent.metadata) && !('accessToken' in sent.metadata));
    assert(!('X-Environment' in init.headers));
    return Response.json({data:{sessionId:'cs_test_fixture_'+checkoutCalls,checkoutUrl:'https://checkout.waffo.ai/store/checkout/cs_test_fixture_'+checkoutCalls,expiresAt:new Date(Date.now()+helpers.CHECKOUT_SECONDS*1000).toISOString()}});
  }
  assert.equal(url,'https://api.waffo.ai/v1/graphql'); queryCalls++;
  assert.equal(JSON.parse(init.body).variables.ref,id);
  const snapshot=structuredClone(upstream);
  if(holdQuery){const pause=holdQuery;holdQuery=null;await pause();}
  return Response.json({data:snapshot});
};
const post=(path,data,access)=>new Request(origin+'/api/'+path,{method:'POST',headers:{'Content-Type':'application/json',...(access?{Authorization:'Bearer '+access}:{})},body:JSON.stringify(data)});
const get=(access=token)=>new Request(origin+'/api/report?report='+id+'&lang=en',{headers:access?{Authorization:'Bearer '+access}:{}});
const signed=(type,data,age=0)=>{
  const raw=JSON.stringify({id:type==='refund.succeeded'?'REF_fixture':'PAY_fixture',eventType:type,storeId:'STO_2U9mk624xX0VEC0DfgMtFw',mode:env.WAFFO_MODE,timestamp:new Date().toISOString(),data:{orderMerchantExternalId:id,...data}});
  const time=String(Date.now()-age);
  const signature=sign('RSA-SHA256',Buffer.from(time+'.'+raw),keys.privateKey).toString('base64');
  return new Request('https://soulvirtues.org/api/waffo-webhook',{method:'POST',headers:{'X-Waffo-Signature':'t='+time+',v1='+signature},body:raw});
};
async function run(mode) {
  env.WAFFO_MODE = mode;
  origin = helpers.paymentOrigin(env);
  sql.exec('DELETE FROM report_ai_jobs; DELETE FROM paid_reports; DELETE FROM payment_events; DELETE FROM checkout_limits;');
  queued=[]; checkoutCalls = 0; queryCalls = 0; upstream = {onetimeOrders:[],payments:[]};
  const other = {...env,WAFFO_MODE:mode === 'test' ? 'prod' : 'test'};
  assert.equal((await checkout.onRequest({request:post('create-checkout',body),env:other})).status,403,'Checkout origin must match server environment');
  assert.equal((await (await webhook.onRequest({request:signed('order.completed',{}),env:other})).json()).ignored,true,'Wrong-environment webhook must be ignored');
  assert.equal((await checkout.onRequest({request:post('create-checkout',{...body,consent:false}),env})).status,400);
  const incomplete={...quiz,answers:{}};
  assert.equal((await checkout.onRequest({request:post('create-checkout',{...body,quiz:incomplete}),env})).status,400);
  const first=await checkout.onRequest({request:post('create-checkout',body),env}); assert.equal(first.status,200);
  assert.equal(new URL((await first.json()).checkoutUrl).searchParams.get('test'),mode === 'test' ? 'true' : null);
  const saved=sql.prepare('SELECT * FROM paid_reports WHERE id=?').get(id);
  const snap=JSON.parse(saved.guide_en);
  assert.equal(snap.answers.length,66); assert.equal(snap.ranked[0].code,'PER');
  assert.equal(snap.traits.flatMap(t=>t.evidence).length,14);
  assert.equal(saved.status,'pending'); assert(!saved.guide_en.includes(token));
  assert.equal((await checkout.onRequest({request:post('create-checkout',body),env})).status,200);
  assert.equal(checkoutCalls,1,'Retry must reuse its existing checkout link');
  upstream={onetimeOrders:[{id:'ORD_failed',status:'pending',orderMerchantExternalId:id,currency:'USD',metadata:{application:'soulvirtues',reportId:id,productId:helpers.PRODUCT_ID},priceSnapshot:{total:'4.93',currency:'USD'},createdAt:new Date().toISOString()}],payments:[{id:'PAY_failed',orderId:'ORD_failed',status:'failed',orderMerchantExternalId:id,createdAt:new Date().toISOString()}]};
  assert.equal((await checkout.onRequest({request:post('create-checkout',body),env})).status,200);
  assert.equal(checkoutCalls,2,'A failed payment must replace its unusable checkout link');
  assert.equal((await checkout.onRequest({request:post('create-checkout',body),env})).status,200);
  assert.equal(checkoutCalls,2,'An older failed payment must not discard the replacement checkout');
  sql.prepare('UPDATE paid_reports SET checkout_expires_at=? WHERE id=?').run(new Date(Date.now()+helpers.CHECKOUT_SECONDS*1000-10000).toISOString(),id);
  upstream.payments[0].createdAt=new Date(Date.now()-1000).toISOString();
  const staleRow=sql.prepare('SELECT * FROM paid_reports WHERE id=?').get(id);
  let releaseQuery,queryReached;
  const blocked=new Promise(resolve=>{releaseQuery=resolve;});
  const reached=new Promise(resolve=>{queryReached=resolve;});
  holdQuery=()=>{queryReached();return blocked;};
  const staleRequest=reports.refreshPayment(env,staleRow,true);
  await reached;
  try {
    assert.equal((await checkout.onRequest({request:post('create-checkout',body),env})).status,200);
    assert.equal(checkoutCalls,3);
  } finally {releaseQuery();}
  await staleRequest;
  assert.equal(sql.prepare('SELECT session_id FROM paid_reports WHERE id=?').get(id).session_id,'cs_test_fixture_3','A delayed query about the old failure must not clear the newer checkout');
  const before=queryCalls;
  assert.equal((await report.onRequest({request:get(''),env})).status,401);
  assert.equal((await report.onRequest({request:get('b'.repeat(64)),env})).status,404);
  assert.equal(queryCalls,before,'Wrong credentials must not even query payment data');
  assert.equal((await report.onRequest({request:get(),env})).status,202);
  assert.equal((await ai.onRequest({request:post('generate-report',{reportId:id,lang:'en'}),env})).status,401);
  assert.equal((await ai.onRequest({request:post('generate-report',{reportId:id,lang:'en'},token),env})).status,402);
  upstream={onetimeOrders:[{id:'ORD_fixture',status:'completed',buyerEmail:'fixture@example.invalid',orderMerchantExternalId:id,currency:'USD',metadata:{application:'soulvirtues',reportId:id,productId:'PROD_7UkiV95uYBhM2uWnMqcEFc'},priceSnapshot:{total:'4.93',currency:'USD'},createdAt:new Date().toISOString()}],payments:[{id:'PAY_fixture',orderId:'ORD_fixture',status:'succeeded',refundStatus:'none',orderMerchantExternalId:id,createdAt:new Date().toISOString(),snapshotAmountDetails:{total:'4.93',currency:'USD'}}]};
  const notify=await webhook.onRequest({request:signed('order.completed',{},35*60000),env}); assert.equal(notify.status,200,'Valid delivery retry after 35 minutes must verify');
  const after=queryCalls;
  assert.equal((await webhook.onRequest({request:signed('order.completed',{}),env})).status,200);
  assert.equal(queryCalls,after,'Duplicate delivery must not process again');
  const delivered=await report.onRequest({request:get(),env}); assert.equal(delivered.status,200);
  const payload=await delivered.json(); assert.equal(payload.status,'paid'); assert.equal(payload.testMode,mode === 'test'); assert.equal(payload.order.number,'ORD_fixture'); assert.equal(payload.guide.id,snap.id);
  assert.equal((await checkout.onRequest({request:post('create-checkout',body),env})).status,200);
  assert.equal(checkoutCalls,3,'An already-paid customer must not be sent to pay again');
  const makeAI=()=>ai.onRequest({request:post('generate-report',{reportId:id,lang:'en',scores:{red:100}},token),env});
  const automatic=await makeAI(); assert.equal(automatic.status,202);
  assert.equal((await makeAI()).status,202);
  assert.equal(queued.length,1,'Payment callback triggers one generation; repeated reads never duplicate it');
  assert.equal(sql.prepare('SELECT ai_en FROM paid_reports WHERE id=?').get(id).ai_en,null,'Never cache prepared text as AI success');
  assert.equal(payload.aiState.status,'queued');
  const store=new Map(); const memory={getItem:k=>store.get(k)||null,setItem:(k,v)=>store.set(k,v)};
  const link=client.privateReportLink('https://soulvirtues.org',{id,token,fingerprint:'fixture'});
  const restored=client.resolveAccess(memory,new URL(link)); assert.equal(restored.token,token);
  assert(!new URL(link).search.includes(token),'Private token belongs in fragment, not query');
  assert.equal(client.validGuide(payload.guide),true);
  const refund=await webhook.onRequest({request:signed('refund.succeeded',{orderId:'ORD_fixture',currency:'USD',refundStatus:'succeeded',refundedAmount:'4.93',originalChargedAmount:'4.93'}),env}); assert.equal(refund.status,200);
  assert.equal((await report.onRequest({request:get(),env})).status,403);
  assert.equal((await makeAI()).status,403);
  assert.equal((await webhook.onRequest({request:signed('order.completed',{}),env})).status,200);
  assert.equal(sql.prepare('SELECT status FROM paid_reports WHERE id=?').get(id).status,'refunded','Late success cannot undo refund');
  const forged=await webhook.onRequest({request:new Request('https://soulvirtues.org/api/waffo-webhook',{method:'POST',body:'{}'}),env}); assert.equal(forged.status,401);
  const old=await webhook.onRequest({request:signed('refund.succeeded',{},46*60000),env}); assert.equal(old.status,401);
  console.log('PASS '+mode+': saved real answers, single checkout retry, unpaid/wrong-token denial, verified delivery, private cross-device link, cached AI, signed retries, deduplication and irreversible refund denial');
}
(async()=>{await run('prod'); await run('test');})().catch(e=>{console.error(e);process.exitCode=1}).finally(()=>{global.fetch=realFetch;sql.close()});
