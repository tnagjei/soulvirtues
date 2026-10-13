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
const db = { prepare(query) {
  const statement = sql.prepare(query); let values=[];
  return { bind(...v) { values=v; return this; }, async first() { return statement.get(...values) || null; }, async all() { return {results:statement.all(...values)}; }, async run() { return {meta:{changes:Number(statement.run(...values).changes)}}; } };
}};
const keys = generateKeyPairSync('rsa',{modulusLength:2048});
const env = { REPORTS_DB:db, WAFFO_PRIVATE_KEY:keys.privateKey.export({type:'pkcs8',format:'pem'}), WAFFO_WEBHOOK_PUBLIC_KEY:keys.publicKey.export({type:'spki',format:'pem'}) };
const checkout = load('functions/api/create-checkout.ts');
const report = load('functions/api/report.ts');
const webhook = load('functions/api/waffo-webhook.ts');
const ai = load('functions/api/generate-report.ts');
const client = load('src/data/paidReport.ts');
const session = load('src/data/quizSession.ts');
const questions = load('src/data/questions.ts');
const guide = load('src/data/fieldGuide.ts');
const id = 'd0536f4b-befb-4c62-a3a3-9d68f5519bda';
const token = 'a'.repeat(64);
const quiz = JSON.parse(session.encodeAnswers(guide.sampleGuideInput(), questions.QUESTIONS));
const body = {reportId:id,accessToken:token,quiz,lang:'en',consent:true};
let checkoutCalls=0, queryCalls=0, upstream={onetimeOrders:[],payments:[]};
const realFetch=global.fetch;
global.fetch=async(url,init)=>{
  if (String(url).includes('create-session')) {
    checkoutCalls++;
    const sent=JSON.parse(init.body);
    assert.equal(sent.orderMerchantExternalId,id);
    assert.equal(sent.metadata.reportId,id);
    assert.equal(sent.successUrl,'https://soulvirtues.org/success/?report='+id);
    assert(!('scores' in sent) && !('answers' in sent.metadata) && !('accessToken' in sent.metadata));
    assert(!('X-Environment' in init.headers));
    return Response.json({data:{sessionId:'cs_test_fixture',checkoutUrl:'https://checkout.waffo.ai/store/checkout/cs_test_fixture',expiresAt:new Date(Date.now()+3600000).toISOString()}});
  }
  assert.equal(url,'https://api.waffo.ai/v1/graphql'); queryCalls++;
  assert.equal(JSON.parse(init.body).variables.ref,id);
  return Response.json({data:upstream});
};
const post=(path,data,access)=>new Request('https://soulvirtues.org/api/'+path,{method:'POST',headers:{'Content-Type':'application/json',...(access?{Authorization:'Bearer '+access}:{})},body:JSON.stringify(data)});
const get=(access=token)=>new Request('https://soulvirtues.org/api/report?report='+id+'&lang=en',{headers:access?{Authorization:'Bearer '+access}:{}});
const signed=(type,data,age=0)=>{
  const raw=JSON.stringify({id:type==='refund.succeeded'?'REF_fixture':'PAY_fixture',eventType:type,storeId:'STO_2U9mk624xX0VEC0DfgMtFw',mode:'prod',timestamp:new Date().toISOString(),data:{orderMerchantExternalId:id,...data}});
  const time=String(Date.now()-age);
  const signature=sign('RSA-SHA256',Buffer.from(time+'.'+raw),keys.privateKey).toString('base64');
  return new Request('https://soulvirtues.org/api/waffo-webhook',{method:'POST',headers:{'X-Waffo-Signature':'t='+time+',v1='+signature},body:raw});
};
async function run() {
  assert.equal((await checkout.onRequest({request:post('create-checkout',{...body,consent:false}),env})).status,400);
  const incomplete={...quiz,answers:{}};
  assert.equal((await checkout.onRequest({request:post('create-checkout',{...body,quiz:incomplete}),env})).status,400);
  const first=await checkout.onRequest({request:post('create-checkout',body),env}); assert.equal(first.status,200);
  const saved=sql.prepare('SELECT * FROM paid_reports WHERE id=?').get(id);
  const snap=JSON.parse(saved.guide_en);
  assert.equal(snap.answers.length,66); assert.equal(snap.ranked[0].code,'PER');
  assert.equal(snap.traits.flatMap(t=>t.evidence).length,14);
  assert.equal(saved.status,'pending'); assert(!saved.guide_en.includes(token));
  assert.equal((await checkout.onRequest({request:post('create-checkout',body),env})).status,200);
  assert.equal(checkoutCalls,1,'Retry must reuse its existing checkout link');
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
  const payload=await delivered.json(); assert.equal(payload.status,'paid'); assert.equal(payload.order.number,'ORD_fixture'); assert.equal(payload.guide.id,snap.id);
  assert.equal((await checkout.onRequest({request:post('create-checkout',body),env})).status,200);
  assert.equal(checkoutCalls,1,'An already-paid customer must not be sent to pay again');
  const makeAI=()=>ai.onRequest({request:post('generate-report',{reportId:id,lang:'en',scores:{red:100}},token),env});
  const optional=await makeAI(); assert.equal(optional.status,200); assert.equal((await optional.json()).source,'synthesis');
  assert.equal((await makeAI()).status,200);
  assert(sql.prepare('SELECT ai_en FROM paid_reports WHERE id=?').get(id).ai_en,'Optional interpretation must be cached');
  const store=new Map(); const memory={getItem:k=>store.get(k)||null,setItem:(k,v)=>store.set(k,v)};
  const link=client.privateReportLink('https://soulvirtues.org',{id,token,fingerprint:'fixture'});
  const restored=client.resolveAccess(memory,new URL(link)); assert.equal(restored.token,token);
  assert(!new URL(link).search.includes(token),'Private token belongs in fragment, not query');
  assert.equal(client.validGuide(payload.guide),true);
  const refund=await webhook.onRequest({request:signed('refund.succeeded',{orderId:'ORD_fixture',refundStatus:'succeeded',refundedAmount:'4.93',originalChargedAmount:'4.93'}),env}); assert.equal(refund.status,200);
  assert.equal((await report.onRequest({request:get(),env})).status,403);
  assert.equal((await makeAI()).status,403);
  assert.equal((await webhook.onRequest({request:signed('order.completed',{}),env})).status,200);
  assert.equal(sql.prepare('SELECT status FROM paid_reports WHERE id=?').get(id).status,'refunded','Late success cannot undo refund');
  const forged=await webhook.onRequest({request:new Request('https://soulvirtues.org/api/waffo-webhook',{method:'POST',body:'{}'}),env}); assert.equal(forged.status,401);
  const old=await webhook.onRequest({request:signed('refund.succeeded',{},46*60000),env}); assert.equal(old.status,401);
  console.log('PASS: saved real answers, single checkout retry, unpaid/wrong-token denial, verified delivery, private cross-device link, cached AI, signed retries, deduplication and irreversible refund denial');
}
run().catch(e=>{console.error(e);process.exitCode=1}).finally(()=>{global.fetch=realFetch;sql.close()});
