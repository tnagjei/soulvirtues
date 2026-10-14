// input: Paid immutable 66-answer snapshots, consent and a durable generation job
// output: Validated DeepSeek interpretation cached once per order and language
// pos: functions/_shared/ai.ts (更新规则：协议变化同步阅读页、队列、迁移与本目录 README)
import { readPersonalAIReport, isPersonalAIReport,reportWordCount, type AIJobState, type PersonalAIReport } from '../../src/data/aiReport';
import { database, rowById, snapshot, requirePaid, type ReportRow, type PaymentEnv } from './reports';
import { DeliveryError, record, testPayments } from './waffo';
import type { GuideLanguage } from '../../src/data/fieldGuide';

const MODEL = 'deepseek-flash';
const ATTEMPTS = 3;
const LEASE_MS = 150000;
export const PROCESS_URL = 'https://soulvirtues-dz6.pages.dev/api/process-ai';
export function cachedAI(row: ReportRow, lang: GuideLanguage) {
  return readPersonalAIReport(lang === 'es' ? row.ai_es : row.ai_en, snapshot(row,lang));
}
export async function aiState(env: PaymentEnv, row: ReportRow, lang: GuideLanguage): Promise<AIJobState> {
  if (cachedAI(row,lang)) return { status:'ready', attempts:0, nextAttemptAt:null, error:null };
  if (!row.ai_consent) return { status:'awaiting-consent', attempts:0, nextAttemptAt:null, error:null };
  const state=await database(env).prepare('SELECT status,attempts,next_attempt_at AS nextAttemptAt,error FROM report_ai_jobs WHERE report_id=? AND lang=?')
    .bind(row.id,lang).first<AIJobState>() || { status:'queued',attempts:0,nextAttemptAt:null,error:null };
  return state.status==='ready'?{...state,status:'failed',error:'The saved AI report could not be validated. Please contact support; do not pay again.'}:state;
}
function configured(env: PaymentEnv) {
  if (!env.AI_JOB_TOKEN || !env.REPORT_QUEUE) throw new DeliveryError(503,'AI delivery is not configured. Please contact support before purchasing.');
}
export async function enqueueAI(env: PaymentEnv, row: ReportRow, lang: GuideLanguage) {
  requirePaid(row);
  if (!row.ai_consent || cachedAI(row,lang)) return;
  configured(env);
  if (testPayments(env) && row.id !== env.AI_TEST_REPORT_ID) throw new DeliveryError(403,'AI generation in this test environment is restricted to the approved demonstration order.');
  const db=database(env), now=new Date().toISOString();
  await db.prepare('INSERT OR IGNORE INTO report_ai_jobs(report_id,lang,updated_at) VALUES(?,?,?)').bind(row.id,lang,now).run();
  const job=await db.prepare('SELECT * FROM report_ai_jobs WHERE report_id=? AND lang=?').bind(row.id,lang).first<{status:string;attempts:number;lease_at:string|null;queued_at:string|null;next_attempt_at:string|null}>();
  if (!job || job.status==='failed' || job.status==='ready' || (job.lease_at && Date.now()-Date.parse(job.lease_at)<LEASE_MS) || (job.queued_at && Date.now()-Date.parse(job.queued_at)<180000) || (job.next_attempt_at && Date.parse(job.next_attempt_at)>Date.now())) return;
  // Publish before marking dispatched: a crash may duplicate a message, but cannot silently lose the job.
  await env.REPORT_QUEUE!.send({reportId:row.id,lang,mode:testPayments(env)?'test':'prod'});
  await db.prepare('UPDATE report_ai_jobs SET queued_at=?,updated_at=? WHERE report_id=? AND lang=?').bind(now,now,row.id,lang).run();
}
async function providerJSON(env: PaymentEnv, path: string, body?: unknown, timeout=8000) {
  if (!env.DEEPSEEK_API_KEY) throw new DeliveryError(503,'The AI service is not configured.');
  const controller=new AbortController(), timer=setTimeout(()=>controller.abort(),timeout);
  try {
    const response=await fetch('https://api.deepseek.com'+path,{method:body===undefined?'GET':'POST',headers:{Authorization:'Bearer '+env.DEEPSEEK_API_KEY,'Content-Type':'application/json'},body:body===undefined?undefined:JSON.stringify(body),signal:controller.signal});
    if (!response.ok) throw new DeliveryError(response.status===402?503:502,response.status===402?'AI balance is insufficient. Please contact support.':'The AI service could not complete this report.');
    return record(await response.json());
  } finally {clearTimeout(timer);}
}
export async function checkBalance(env: PaymentEnv) {
  const value=await providerJSON(env,'/user/balance');
  const enough=Array.isArray(value.balance_infos) && value.balance_infos.some(item=>{const b=record(item);return Number(b.total_balance)>=(b.currency==='CNY'?0.3:b.currency==='USD'?0.04:Infinity);});
  if (value.is_available!==true || !enough) throw new DeliveryError(503,'AI report generation is temporarily unavailable. Please try later; no payment has been started.');
}
export async function aiReady(env: PaymentEnv, id: string) {
  configured(env);
  if (testPayments(env) && id!==env.AI_TEST_REPORT_ID) throw new DeliveryError(503,'This test accepts only the approved report demonstration.');
  if (env.AI_PROCESS_URL) {
    if(env.AI_PROCESS_URL!==PROCESS_URL) throw new DeliveryError(503,'Invalid AI service configuration.');
    const response=await fetch(PROCESS_URL,{method:'POST',headers:{Authorization:'Bearer '+env.AI_JOB_TOKEN,'Content-Type':'application/json'},body:JSON.stringify({action:'ready',mode:'test',reportId:id}),signal:AbortSignal.timeout(10000)});
    if(!response.ok) throw new DeliveryError(503,'AI report generation is unavailable. Please try later; no payment has been started.');
  } else await checkBalance(env);
}
export function modelRequest(guide: ReturnType<typeof snapshot>, lang: GuideLanguage) {
  const example={summary:{title:'A practical title',interpretation:'Personal overview',tension:'Answer-supported tension to explore',nextStep:'A specific next step'},traits:guide.traits.map(t=>({code:t.code,evidenceIds:t.evidence.map(i=>i.id),interpretation:'A detailed interpretation with evidence, limits and an alternative explanation',reflection:'A concrete question',experiment:'An action and how to evaluate it'})),scenarios:Array.from({length:3},()=>({title:'Scenario',context:'A possible everyday situation, not a known fact',action:'A small action',observe:'Observable outcome'})),plan:Array.from({length:7},()=>({title:'Practice day',task:'A specific 5–10 minute task',observe:'A concrete output'}))};
  return {model:MODEL,thinking:{type:'disabled'},response_format:{type:'json_object'},max_tokens:7600,messages:[
    {role:'system',content:`Write a useful paid self-reflection guide in ${lang==='es'?'Spanish':'English'}. Return ONLY JSON matching the example. Write 2300–2700 words in total. Each of the seven trait interpretations needs 200–240 words; add substantial reflection and experiment text, a 200-word overview, three grounded rehearsal scenarios, and seven distinct practical days. Use all 66 supplied statements and actual responses, including mixed directions. There are exactly66 answers, including all10 Determination statements. Do not state or estimate the total number in prose: the page supplies that fact. Never self-correct or use rhetorical questions in the interpretation; use questions only in reflection fields. Keep quoted response labels faithful to the actual statement rather than attaching them to an opposite paraphrase. For each trait cite both provided evidenceIds in your interpretation (the original strongest/least supporting receipts), using the actual response and reverse direction accurately. Refer to other answered items where they clarify a tension. Do not recalculate or invent scores, diagnosis, hidden trauma, personality certainty, population rarity, moral superiority, certified results or RPG combat abilities. Describe hypotheses with specific evidence and alternative explanations; low scores are not bad character and disagreement on reverse-scored items must be interpreted correctly. Scenarios are possibilities, never claimed facts about the user. Tasks must be realistic, low-risk and observable. Avoid generic praise, repeated advice and padding. No identifying or payment data is supplied. JSON structure example: ${JSON.stringify(example)}`},
    {role:'user',content:JSON.stringify({language:lang,answeredItemCount:66,scale:'0–100 quiz answer scale, 50 neutral; not a percentile',traits:guide.traits.map(t=>({code:t.code,name:t.name,definition:t.focus,score:t.score,evidenceIds:t.evidence.map(i=>i.id),answers:t.items}))})}
  ]};
}
export async function generateAI(env: PaymentEnv, row: ReportRow, lang: GuideLanguage): Promise<PersonalAIReport> {
  const guide=snapshot(row,lang);
  const value=await providerJSON(env,'/chat/completions',modelRequest(guide,lang),110000);
  const choice=record(Array.isArray(value.choices)?value.choices[0]:null);
  if(choice.finish_reason!=='stop') throw new DeliveryError(502,`The AI response was incomplete (${String(choice.finish_reason)}, ${Number(record(value.usage).completion_tokens)||0} output tokens) and will be retried.`);
  const message=record(choice.message);
  let content;try{content=JSON.parse(typeof message.content==='string'?message.content:'');}catch{throw new DeliveryError(502,'The AI report could not be read and will be retried.');}
  const report={...record(content),schemaVersion:1,source:'ai',language:lang,model:typeof value.model==='string'?value.model:MODEL,generatedAt:new Date().toISOString()};
  if(!isPersonalAIReport(report,guide)) throw new DeliveryError(502,'The AI report did not match your saved answers and will be retried.');
  const words=reportWordCount(report);
  if(words<2000) throw new DeliveryError(502,'The AI report was too short and will be retried.');
  return report;
}
export async function processAI(env: PaymentEnv, id: string, lang: GuideLanguage): Promise<boolean> {
  let row=await rowById(env,id);
  if(!row) return true;
  if(row.status!=='paid' || !row.ai_consent || !row.expires_at || Date.parse(row.expires_at)<=Date.now()) return true;
  if(cachedAI(row,lang)) return true;
  const db=database(env), now=new Date().toISOString(), stale=new Date(Date.now()-LEASE_MS).toISOString();
  await db.prepare('INSERT OR IGNORE INTO report_ai_jobs(report_id,lang,updated_at) VALUES(?,?,?)').bind(id,lang,now).run();
  const job=await db.prepare('SELECT attempts,status,lease_at FROM report_ai_jobs WHERE report_id=? AND lang=?').bind(id,lang).first<{attempts:number;status:string;lease_at:string|null}>();
  if(job?.status==='failed') return true;
  if(job?.lease_at && job.lease_at>=stale) return false;
  if(job && job.attempts>=ATTEMPTS) {
    const ended=await db.prepare("UPDATE report_ai_jobs SET status='failed',error='AI generation could not finish. Contact support with your order number; do not pay again.',lease_at=NULL,updated_at=? WHERE report_id=? AND lang=? AND status!='ready' AND (lease_at IS NULL OR lease_at<?)").bind(now,id,lang,stale).run();
    return Boolean(ended.meta.changes) || Boolean(cachedAI((await rowById(env,id))!,lang));
  }
  const locked=await db.prepare("UPDATE report_ai_jobs SET status='generating',attempts=attempts+1,lease_at=?,error=NULL,next_attempt_at=NULL,updated_at=? WHERE report_id=? AND lang=? AND attempts<? AND status IN ('queued','retrying','generating') AND (lease_at IS NULL OR lease_at<?)").bind(now,now,id,lang,ATTEMPTS,stale).run();
  if(!locked.meta.changes) return Boolean(cachedAI((await rowById(env,id))!,lang));
  try {
    const report=await generateAI(env,row,lang);
    // Check the order again after the network wait: a refund must prevent delivery.
    row=(await rowById(env,id))!;requirePaid(row);
    const column=lang==='es'?'ai_es':'ai_en';
    const saved=await db.prepare(`UPDATE paid_reports SET ${column}=?,updated_at=? WHERE id=? AND status='paid' AND EXISTS(SELECT 1 FROM report_ai_jobs WHERE report_id=? AND lang=? AND lease_at=?)`).bind(JSON.stringify(report),new Date().toISOString(),id,id,lang,now).run();
    if(!saved.meta.changes) throw new DeliveryError(403,'Report access changed before delivery. Please contact support.');
    await db.prepare("UPDATE report_ai_jobs SET status='ready',lease_at=NULL,error=NULL,next_attempt_at=NULL,updated_at=? WHERE report_id=? AND lang=? AND lease_at=?").bind(new Date().toISOString(),id,lang,now).run();
    return true;
  } catch(error) {
    const last=await db.prepare('SELECT attempts FROM report_ai_jobs WHERE report_id=? AND lang=?').bind(id,lang).first<{attempts:number}>();
    const final=(last?.attempts||0)>=ATTEMPTS || error instanceof DeliveryError && [402,403,410].includes(error.status);
    await db.prepare('UPDATE report_ai_jobs SET status=?,lease_at=NULL,error=?,next_attempt_at=?,updated_at=? WHERE report_id=? AND lang=? AND lease_at=?')
      .bind(final?'failed':'retrying',error instanceof DeliveryError?error.message:'AI generation was interrupted and will be retried.',final?null:new Date(Date.now()+60000).toISOString(),new Date().toISOString(),id,lang,now).run();
    return final;
  }
}
