// input: Paid immutable 66-answer snapshots, consent and a durable generation job
// output: Validated DeepSeek interpretation cached once per order and language
// pos: functions/_shared/ai.ts (更新规则：协议变化同步阅读页、队列、迁移与本目录 README)
import { readPersonalAIReport, isPersonalAIReport,reportText,reportWordCount, type AIJobState, type PersonalAIReport } from '../../src/data/aiReport';
import { database, rowById, snapshot, requirePaid, type ReportRow, type PaymentEnv } from './reports';
import { DeliveryError, record, testPayments } from './waffo';
import type { GuideLanguage } from '../../src/data/fieldGuide';

const MODEL = 'deepseek-flash';
const ATTEMPTS = 6;
const SERVICE_RETRY_SECONDS = [60,300,900,3600,14400];
const LEASE_MS = 150000;
class AIServiceError extends DeliveryError {
  constructor(readonly retryable: boolean, message: string) { super(503,message); }
}
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
  if (!env.DEEPSEEK_API_KEY) throw new AIServiceError(false,'The AI service is not configured.');
  const controller=new AbortController(), timer=setTimeout(()=>controller.abort(),timeout);
  try {
    const response=await fetch('https://api.deepseek.com'+path,{method:body===undefined?'GET':'POST',headers:{Authorization:'Bearer '+env.DEEPSEEK_API_KEY,'Content-Type':'application/json'},body:body===undefined?undefined:JSON.stringify(body),signal:controller.signal});
    if (!response.ok) throw new AIServiceError([408,429].includes(response.status)||response.status>=500,response.status===402?'AI balance is insufficient. Please contact support.':`The AI service could not complete this report (HTTP ${response.status}).`);
    return record(await response.json());
  } catch(error) {
    if(error instanceof DeliveryError) throw error;
    throw new AIServiceError(true,controller.signal.aborted?'The AI request timed out.':'The AI service response was interrupted.');
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
    {role:'system',content:`Write a useful paid self-reflection guide in ${lang==='es'?'Spanish':'English'}. Return ONLY JSON matching the example. Write 2300–2700 words in total. Each of the seven trait interpretations needs 200–240 words; add substantial reflection and experiment text, a 200-word overview, three grounded rehearsal scenarios, and seven distinct practical days. Use all 66 supplied statements and actual responses. There are exactly66 answers, including all10 Determination statements. Do not state or estimate counts of answers or groups of traits in prose: the page supplies those facts. Name the relevant traits without a numerical group size. Never self-correct or use rhetorical questions in the interpretation; use questions only in reflection fields. Keep quoted response labels faithful to the actual statement rather than attaching them to an opposite paraphrase. Each answer includes evidenceDirection, already calculated by the scoring code. Trust it: neutral means no directional evidence, not proof of a balanced or average personality. Do not describe scoring mechanics or label any item reverse-keyed, reverse-scored, forward-keyed or direct-scored; the fixed page supplies the correct mechanics. For each trait cite both provided evidenceIds in your interpretation (the original strongest/least supporting receipts), using their actual responses and supplied evidenceDirection. Refer to other answered items where they clarify a tension. Do not recalculate or invent scores, diagnosis, hidden trauma, personality certainty, population comparisons or rarity, moral superiority, certified results or RPG combat abilities. Never compare this person with an average person, other people, the general population or a norm: no population data exists. Do not call any profile rare or unusual. Describe hypotheses with specific evidence and alternative explanations; low scores are not bad character. Scenarios are possibilities, never claimed facts about the user. Tasks must be realistic, low-risk and observable. Plan titles must name an action without a Day/Day number or Día prefix; the page numbers the days. Avoid generic praise, repeated advice and padding. No identifying or payment data is supplied. JSON structure example: ${JSON.stringify(example)}`},
    {role:'user',content:JSON.stringify({language:lang,answeredItemCount:66,scale:'0–100 quiz answer scale, 50 neutral; not a percentile',traits:guide.traits.map(t=>({code:t.code,name:t.name,definition:t.focus,score:t.score,evidenceIds:t.evidence.map(i=>i.id),answers:t.items.map(({id,number,question,answer,keyed})=>({id,number,question,answer,evidenceDirection:keyed===3?'neutral: no directional evidence':keyed>3?'supports this trait':'does not support this trait'}))}))})}
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
  // 仅约束新生成正文，不能让新规则撤销已交付订单的缓存访问。
  const prose=reportText(report);
  const scoringClaim=/\b(?:reverse|forward|direct)[ -](?:keyed|scored|scoring)\b|(?:puntuaci[oó]n|[ií]tem|reactivo)\s+invers[oa]/i;
  const populationComparison=/\b(?:more|less)\b[^.!?\n]{0,100}\bthan\s+(?:(?:the|an?)\s+)?(?:average(?:\s+person)?|(?:most|other)\s+people|others)\b|\b(?:m[aá]s|menos)\b[^.!?\n]{0,100}\bque\s+(?:otras\s+personas|la mayor[ií]a de las personas|(?:la\s+)?persona promedio)/i;
  const populationRarity=/\b(?:rare|unusual)\s+(?:profile|pattern|combination)\b|\b(?:profile|pattern|combination)\s+(?:is|seems|appears)(?:\s+(?:an?|very|quite|rather))*\s+(?:rare|unusual)\b|(?:perfil|patr[oó]n|combinaci[oó]n)\s+(?:es|parece)(?:\s+(?:muy|un[ao]?))*\s+(?:inusual|rar[oa])/i;
  // shortcut: 只拦已复现的错误说法；新语言或新反例需补规则与回归。
  if(scoringClaim.test(prose)||populationComparison.test(prose)||populationRarity.test(prose)) throw new DeliveryError(502,'The AI report included an unsupported scoring or population claim and will be retried.');
  // shortcut: 仅检查已复现的英西语显式列举句式；不等同于完整语义核验。
  const counts: Record<string,number>={one:1,two:2,three:3,four:4,five:5,six:6,seven:7,uno:1,dos:2,tres:3,cuatro:4,cinco:5,seis:6,siete:7};
  for(const match of report.summary.interpretation.matchAll(/\b(?:in|en)\s+(\d+|one|two|three|four|five|six|seven|uno|dos|tres|cuatro|cinco|seis|siete)\s+(?:of (?:them|these traits)|de (?:ellos|estos rasgos))\s*[–—-]([^–—]+)[–—-]/gi)) {
    const named=guide.traits.filter(t=>match[2].toLocaleLowerCase().includes(t.name.toLocaleLowerCase())).length;
    if(named && (counts[match[1].toLowerCase()] ?? Number(match[1]))!==named) throw new DeliveryError(502,'The AI report included an inconsistent trait count and will be retried.');
  }
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
  const job=await db.prepare('SELECT attempts,status,lease_at,next_attempt_at FROM report_ai_jobs WHERE report_id=? AND lang=?').bind(id,lang).first<{attempts:number;status:string;lease_at:string|null;next_attempt_at:string|null}>();
  if(job?.status==='failed') return true;
  if(job?.next_attempt_at && Date.parse(job.next_attempt_at)>Date.now()) return false;
  if(job?.lease_at && job.lease_at>=stale) return false;
  if(job && job.attempts>=ATTEMPTS) {
    const ended=await db.prepare("UPDATE report_ai_jobs SET status='failed',error='AI generation could not finish. Contact support with your order number; do not pay again.',lease_at=NULL,updated_at=? WHERE report_id=? AND lang=? AND status!='ready' AND (lease_at IS NULL OR lease_at<?)").bind(now,id,lang,stale).run();
    return Boolean(ended.meta.changes) || Boolean(cachedAI((await rowById(env,id))!,lang));
  }
  const locked=await db.prepare("UPDATE report_ai_jobs SET status='generating',attempts=attempts+1,lease_at=?,error=NULL,next_attempt_at=NULL,updated_at=? WHERE report_id=? AND lang=? AND attempts<? AND status IN ('queued','retrying','generating') AND (lease_at IS NULL OR lease_at<?) AND (next_attempt_at IS NULL OR next_attempt_at<=?)").bind(now,now,id,lang,ATTEMPTS,stale,now).run();
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
    const attempts=last?.attempts||1;
    const limit=error instanceof AIServiceError?(error.retryable?ATTEMPTS:1):3;
    const final=attempts>=limit || error instanceof DeliveryError && [402,403,410].includes(error.status);
    const delay=error instanceof AIServiceError?SERVICE_RETRY_SECONDS[attempts-1]:60;
    const detail=(error instanceof DeliveryError?error.message:'AI generation was interrupted.').replace(/ and will be retried\.$/,'.');
    await db.prepare('UPDATE report_ai_jobs SET status=?,lease_at=NULL,error=?,next_attempt_at=?,updated_at=? WHERE report_id=? AND lang=? AND lease_at=?')
      .bind(final?'failed':'retrying',final?detail+' Contact support with your order number; do not pay again.':detail,final?null:new Date(Date.now()+delay*1000).toISOString(),new Date().toISOString(),id,lang,now).run();
    return final;
  }
}
