// input: Changed automatic AI handlers, real SQLite and synthetic quiz answers
// output: Focused consent, input, cache, retry, balance and refund checks without external calls
// pos: scripts/check_report_delivery.cjs (更新规则：自动交付变化同步此回归与 scripts/README.md)
const assert=require('node:assert/strict'), fs=require('node:fs');
const {DatabaseSync}=require('node:sqlite'), {webcrypto}=require('node:crypto'), {buildSync}=require('esbuild');
global.crypto=webcrypto;
function load(file){const m={exports:{}};new Function('require','module','exports',buildSync({entryPoints:[file],bundle:true,write:false,platform:'node',format:'cjs'}).outputFiles[0].text)(require,m,m.exports);return m.exports;}
const ai=load('functions/_shared/ai.ts'), schema=load('src/data/aiReport.ts'), guides=load('src/data/fieldGuide.ts'), scores=load('src/data/scoring.ts'), inputs=load('src/data/reportDelivery.ts'), questions=load('src/data/questions.ts'), processor=load('functions/api/process-ai.ts');
const sql=new DatabaseSync(':memory:');for(const f of ['0001_paid_reports.sql','0002_ai_delivery.sql'])sql.exec(fs.readFileSync('migrations/'+f,'utf8'));
let beforeClaim=null;
const db={prepare(q){const statement=sql.prepare(q);let v=[];return {bind(...a){v=a;return this;},async first(){return statement.get(...v)||null;},async run(){if(beforeClaim && q.startsWith("UPDATE report_ai_jobs SET status='generating'")){const hook=beforeClaim;beforeClaim=null;hook();}return {meta:{changes:Number(statement.run(...v).changes)}};}};}};
const id='453114fb-1106-45bd-ae4d-25149851f858', answers=guides.sampleGuideInput();
const guide=guides.buildFieldGuide(inputs.normalizeReportInput({pct:scores.computeScores(answers,questions.QUESTIONS).pct}),answers,'en');
const fixture={summary:{title:'A useful profile',interpretation:'The actual answer pattern suggests a question for reflection. '.repeat(23),tension:'Check your actual experience.',nextStep:'Try one concrete example.'},traits:guide.traits.map(t=>({code:t.code,evidenceIds:t.evidence.map(i=>i.id),interpretation:('Consider your response in context and compare it with an everyday example. ').repeat(19),reflection:'What changed between two situations? '.repeat(8),experiment:'Choose a small task and observe the outcome. '.repeat(8)})),scenarios:Array.from({length:3},()=>({title:'A possible situation',context:'Compare a concrete situation with your answer. '.repeat(9),action:'Choose a safe small step. '.repeat(9),observe:'Record what changed. '.repeat(8)})),plan:Array.from({length:7},()=>({title:'One small step',task:'Write a concrete example and test one adjustment. '.repeat(7),observe:'Record the result without judging yourself. '.repeat(5)}))};
const now=new Date().toISOString();
sql.prepare("INSERT INTO paid_reports(id,access_hash,input_hash,status,bank_version,guide_en,guide_es,created_at,updated_at,expires_at,ai_consent) VALUES(?,?,?,'paid',?,?,?,?,?,?,1)").run(id,'hash','hash','fixture',JSON.stringify(guide),JSON.stringify(guide),now,now,new Date(Date.now()+86400000).toISOString());
let sent=0, calls=0;const env={REPORTS_DB:db,AI_JOB_TOKEN:'fixture-internal',DEEPSEEK_API_KEY:'fixture',REPORT_QUEUE:{async send(){sent++;}}};
const row=()=>sql.prepare('SELECT * FROM paid_reports WHERE id=?').get(id);
const original=global.fetch;
const request=(auth='fixture-internal',extra={})=>new Request('https://soulvirtues.org/api/process-ai',{method:'POST',headers:{Authorization:'Bearer '+auth,'Content-Type':'application/json'},body:JSON.stringify({reportId:id,lang:'en',mode:'prod',...extra})});
(async()=>{
  assert.equal((await processor.onRequest({request:request('wrong'),env})).status,401);
  assert.equal((await processor.onRequest({request:request('fixture-internal',{mode:'test'}),env})).status,403);
  sql.prepare('UPDATE paid_reports SET ai_consent=0 WHERE id=?').run(id);await ai.enqueueAI(env,row(),'en');assert.equal(sent,0);
  sql.prepare("UPDATE paid_reports SET ai_consent=1,status='pending' WHERE id=?").run(id);await assert.rejects(ai.enqueueAI(env,row(),'en'));
  sql.prepare("UPDATE paid_reports SET status='paid' WHERE id=?").run(id);
  await ai.enqueueAI(env,row(),'en');await ai.enqueueAI(env,row(),'en');assert.equal(sent,1);
  sql.prepare("UPDATE report_ai_jobs SET status='generating',attempts=1,lease_at=?").run(new Date().toISOString());
  assert.equal(await ai.processAI(env,id,'en'),false,'A busy message cannot be marked failed or acknowledged');
  assert.equal((await ai.aiState(env,row(),'en')).status,'generating');
  sql.exec("UPDATE report_ai_jobs SET status='queued',attempts=0,lease_at=NULL");
  global.fetch=async(url,init)=>{
    calls++;
    const body=JSON.parse(init.body), payload=JSON.parse(body.messages[1].content), items=payload.traits.flatMap(t=>t.answers);
    assert.equal(items.length,66);assert.equal(new Set(items.map(i=>i.id)).size,66);
    assert.deepEqual(items.map(i=>i.id).sort(),questions.QUESTIONS.map(q=>q.id).sort());
    for(const item of items) {
      const saved=guide.traits.flatMap(t=>t.items).find(i=>i.id===item.id);
      assert.equal(item.evidenceDirection,saved.keyed===3?'neutral: no directional evidence':saved.keyed>3?'supports this trait':'does not support this trait');
      assert(!('reverse' in item)&&!('keyed' in item),'The model interprets trusted direction instead of inventing scoring mechanics');
    }
    assert(!init.body.includes('access_hash')&&!init.body.includes('buyer_email')&&!init.body.includes('order_id'));
    assert.equal(body.thinking.type,'disabled');assert.equal(body.model,'deepseek-flash');
    return Response.json({model:'deepseek-flash',choices:[{finish_reason:'stop',message:{content:JSON.stringify(fixture)}}]});
  };
  assert.equal(await ai.processAI(env,id,'en'),true);assert.equal(calls,1);assert(schema.readPersonalAIReport(row().ai_en,guide));
  await ai.processAI(env,id,'en');await ai.enqueueAI(env,row(),'en');assert.equal(calls,1);assert.equal(sent,1);
  const completed=row().ai_en;
  sql.prepare('UPDATE paid_reports SET ai_en=NULL WHERE id=?').run(id);sql.exec("UPDATE report_ai_jobs SET status='queued',attempts=1,lease_at=NULL");
  beforeClaim=()=>{sql.prepare('UPDATE paid_reports SET ai_en=? WHERE id=?').run(completed,id);sql.exec("UPDATE report_ai_jobs SET status='ready',lease_at=NULL");};
  assert.equal(await ai.processAI(env,id,'en'),true);assert.equal(calls,1,'Concurrent completion cannot cause another provider request');
  const incorrectCount=JSON.parse(completed);incorrectCount.summary.interpretation='This guide integrates your responses to 56 statements.';assert(!schema.isPersonalAIReport(incorrectCount,guide));
  const invalid=JSON.parse(row().ai_en);invalid.traits[0].evidenceIds[0]='V2-BRV-01';assert(!schema.isPersonalAIReport(invalid,guide));
  // 新生成的报告不能编造计分标签或人群比较；已有缓存仍能读取。
  for(const claim of ['This reverse-keyed item suggests a flexible style.', 'You are more flexible than the average person.', 'You are more flexible than most people.', 'Tu perfil es más flexible que otras personas.', 'That combination is unusual but coherent.', 'Tu perfil es más flexible que la mayoría de las personas.']) {
    const bad=structuredClone(fixture);bad.traits[0].interpretation+=' '+claim;
    global.fetch=async()=>Response.json({choices:[{finish_reason:'stop',message:{content:JSON.stringify(bad)}}]});
    await assert.rejects(ai.generateAI(env,row(),'en'),/unsupported scoring or population claim/);
    assert(schema.readPersonalAIReport(JSON.stringify({...bad,schemaVersion:1,source:'ai',language:'en',model:'deepseek-flash',generatedAt:now}),guide),'New generation rules must not revoke existing paid reports');
  }
  for(const nextStep of ['Practise listening to other people on an unusual day.', 'Elige una situación inusual de esta semana y anota tu respuesta.', 'Este informe no permite estimar la rareza de tu perfil.']) {
    const ordinary=structuredClone(fixture);ordinary.summary.nextStep=nextStep;
    global.fetch=async()=>Response.json({choices:[{finish_reason:'stop',message:{content:JSON.stringify(ordinary)}}]});
    assert.equal((await ai.generateAI(env,row(),'en')).summary.nextStep,nextStep,'Ordinary situations and accurate limitations must not consume generation retries');
  }
  sql.prepare('UPDATE paid_reports SET ai_en=NULL WHERE id=?').run(id);sql.exec('DELETE FROM report_ai_jobs');
  global.fetch=async()=>Response.json({is_available:false,balance_infos:[]});await assert.rejects(ai.checkBalance(env));
  global.fetch=async()=>new Response('',{status:500});
  for(let n=1;n<=3;n++){assert.equal(await ai.processAI(env,id,'en'),n===3);assert.equal(row().ai_en,null);assert.equal(sql.prepare('SELECT attempts FROM report_ai_jobs').get().attempts,n);}
  assert.equal((await ai.aiState(env,row(),'en')).status,'failed');
  sql.exec('DELETE FROM report_ai_jobs');
  global.fetch=async()=>{sql.prepare("UPDATE paid_reports SET status='refunded' WHERE id=?").run(id);return Response.json({choices:[{finish_reason:'stop',message:{content:JSON.stringify(fixture)}}]});};
  await ai.processAI(env,id,'en');assert.equal(row().ai_en,null,'Refund during model call must prevent delivery');
  console.log('PASS: all66 input, consent, paid/internal boundaries, one cached AI per order, balance, finite retries, accurate receipts and refund cancellation');
})().catch(e=>{console.error(e);process.exitCode=1;}).finally(()=>{global.fetch=original;sql.close();});
