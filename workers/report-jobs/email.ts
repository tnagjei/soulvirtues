// input: Paid ready reports, native Email Sending and a private link-signing key
// output: One transactional ready email per order, with explicit uncertain/failed states
// pos: workers/report-jobs (更新规则：同步隐私说明、迁移与定向测试)
import { cachedAI } from '../../functions/_shared/ai';
import { database, rowById, type PaymentEnv, type ReportRow } from '../../functions/_shared/reports';
import { digest } from '../../functions/_shared/waffo';

export interface MailEnv extends PaymentEnv {
  EMAIL?: { send(message:{to:string;from:{email:string;name:string};replyTo:string;subject:string;text:string;html:string}):Promise<{messageId:string}> };
  MAIL_LINK_KEY?:string; REPORT_EMAIL_FROM?:string; REPORT_EMAIL_START_AT?:string;
  REPORT_EMAIL_ENABLED?:string; MAIL_TEST_RECIPIENT?:string;
}
interface MailRow { report_id:string; recipient:string; lang:'en'|'es'; original_access_hash:string; access_hash:string; status:string; attempts:number; }
const address=(s:string|null|undefined):s is string=>typeof s==='string' && s.length<=254 && /^[^\s<>@]+@[^\s<>@]+\.[^\s<>@]+$/.test(s);
const escape=(s:string)=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]!));
export async function emailToken(key:string,row:ReportRow,recipient:string,mode:'test'|'prod') {
  const hmac=await crypto.subtle.importKey('raw',new TextEncoder().encode(key),{name:'HMAC',hash:'SHA-256'},false,['sign']);
  const bytes=await crypto.subtle.sign('HMAC',hmac,new TextEncoder().encode(JSON.stringify(['report-ready-v1',mode,row.id,row.order_id,row.access_hash,recipient])));
  return Array.from(new Uint8Array(bytes),x=>x.toString(16).padStart(2,'0')).join('');
}
export function readyMessage(row:ReportRow,token:string,recipient:string,from:string,mode:'test'|'prod') {
  const es=row.purchase_lang==='es', origin=mode==='test'?'https://soulvirtues-paytest.pages.dev':'https://soulvirtues.org';
  const link=`${origin}/success/?report=${row.id}&lang=${row.purchase_lang}#access=${token}`;
  const title=es?'Tu informe de Seven Virtues está listo':'Your Seven Virtues report is ready';
  const intro=es?'Tu interpretación personal está lista. Abre tu informe y elige Guardar PDF para conservarlo.':'Your personal interpretation is ready. Open your report and choose Save PDF to keep a copy.';
  const expires=new Date(row.expires_at!).toISOString().slice(0,10);
  const note=es?`Acceso online hasta ${expires} (UTC). Este enlace es privado: cualquiera que lo tenga puede leer tu informe. Las notas permanecen en el navegador donde las escribes.`:`Online access until ${expires} (UTC). Keep this link private: anyone with it can read your report. Notes stay in the browser where you write them.`;
  const label=es?'Abrir mi informe':'Open my report';
  return {to:recipient,from:{email:from,name:'Soul Virtues'},replyTo:'tangjei414@gmail.com',subject:(mode==='test'?'[TEST] ':'')+title,
    text:`${title}\n\n${intro}\n\n${label}: ${link}\n\n${note}\n\nOrder: ${row.order_id}\nSupport: tangjei414@gmail.com`,
    html:`<h1>${title}</h1><p>${intro}</p><p><a href="${escape(link)}">${label}</a></p><p>${note}</p><p>Order: ${escape(row.order_id||'')}</p><p>Support: <a href="mailto:tangjei414@gmail.com">tangjei414@gmail.com</a></p>`};
}
export async function sendReadyEmails(env:MailEnv,mode:'test'|'prod',onlyId?:string,now=new Date()) {
  const result={sent:0,failed:0,uncertain:0,skipped:0};
  if(env.REPORT_EMAIL_ENABLED!=='1') return result;
  if(!env.EMAIL || !env.MAIL_LINK_KEY || env.MAIL_LINK_KEY.length<32 || !address(env.REPORT_EMAIL_FROM) || !Number.isFinite(Date.parse(env.REPORT_EMAIL_START_AT||''))) throw new Error('Report email configuration incomplete');
  const scoped={...env,REPORTS_DB:mode==='test'?env.TEST_REPORTS_DB:env.REPORTS_DB};
  const db=database(scoped), at=now.toISOString();
  // A crash after SMTP acceptance is ambiguous. Never automatically resend such a claim.
  const stale=await db.prepare("UPDATE report_emails SET status='uncertain',error='Send outcome unknown; inspect Email Service activity before resending.',updated_at=? WHERE status='sending' AND lease_at<?")
    .bind(at,new Date(+now-600000).toISOString()).run();result.uncertain+=stale.meta.changes;
  const candidates=await db.prepare(`SELECT p.* FROM paid_reports p LEFT JOIN report_emails e ON e.report_id=p.id
    WHERE p.status='paid' AND p.ai_consent=1 AND p.expires_at>? AND p.buyer_email IS NOT NULL
    AND ((p.purchase_lang='en' AND p.ai_en IS NOT NULL) OR (p.purchase_lang='es' AND p.ai_es IS NOT NULL))
    AND (?='test' OR p.paid_at>=?) AND (?='prod' OR p.id=?) AND (? IS NULL OR p.id=?)
    AND (e.report_id IS NULL OR (e.status IN ('pending','retry') AND (e.next_attempt_at IS NULL OR e.next_attempt_at<=?)))
    ORDER BY p.paid_at,p.id LIMIT 20`).bind(at,mode,env.REPORT_EMAIL_START_AT,mode,env.AI_TEST_REPORT_ID||'',onlyId||null,onlyId||null,at).all<ReportRow>();
  for(const row of candidates.results) {
    const recipient=mode==='test'?env.MAIL_TEST_RECIPIENT:row.buyer_email;
    if(!address(recipient) || !cachedAI(row,row.purchase_lang)) {result.skipped++;continue;}
    const token=await emailToken(env.MAIL_LINK_KEY,row,recipient,mode);
    // Email links augment the browser credential; recovery rotation invalidates both together.
    await db.prepare(`INSERT OR IGNORE INTO report_emails(report_id,recipient,purchase_email,lang,original_access_hash,access_hash,created_at,updated_at)
      VALUES(?,?,?,?,?,?,?,?)`).bind(row.id,recipient,row.buyer_email,row.purchase_lang,row.access_hash,await digest(token),at,at).run();
    const claim=await db.prepare(`UPDATE report_emails SET status='sending',attempts=attempts+1,lease_at=?,updated_at=?
      WHERE report_id=? AND status IN ('pending','retry') AND (next_attempt_at IS NULL OR next_attempt_at<=?)
      AND original_access_hash=? AND recipient=? AND EXISTS(SELECT 1 FROM paid_reports p WHERE p.id=report_id AND p.status='paid' AND p.expires_at>?)`)
      .bind(at,at,row.id,at,row.access_hash,recipient,at).run();
    if(!claim.meta.changes) continue;
    const claimed=await db.prepare('SELECT * FROM report_emails WHERE report_id=?').bind(row.id).first<MailRow>();
    const current=await rowById(scoped,row.id);
    if(!current || current.status!=='paid' || current.access_hash!==row.access_hash || current.buyer_email!==row.buyer_email || !current.expires_at || Date.parse(current.expires_at)<=+now) {
      await db.prepare("UPDATE report_emails SET status='failed',error='Order access changed before sending.',updated_at=? WHERE report_id=? AND lease_at=?").bind(at,row.id,at).run();result.failed++;continue;
    }
    try {
      const sent=await env.EMAIL.send(readyMessage(row,token,recipient,env.REPORT_EMAIL_FROM,mode));
      if(!sent?.messageId) throw new Error('Unknown email acceptance');
      await db.prepare("UPDATE report_emails SET status='sent',message_id=?,sent_at=?,lease_at=NULL,error=NULL,updated_at=? WHERE report_id=? AND status='sending' AND lease_at=?")
        .bind(sent.messageId,new Date().toISOString(),new Date().toISOString(),row.id,at).run();result.sent++;
    } catch(error) {
      const code=typeof error==='object' && error!==null && 'code' in error?String(error.code):'';
      // Only explicit pre-acceptance throttling is retried; unknown outcomes need activity-log review.
      const retry=['E_RATE_LIMIT_EXCEEDED','E_DAILY_LIMIT_EXCEEDED'].includes(code) && (claimed?.attempts||0)<6;
      const knownPermanent=/^E_(VALIDATION_ERROR|FIELD_MISSING|SENDER_NOT_VERIFIED|RECIPIENT_NOT_ALLOWED|RECIPIENT_SUPPRESSED|SENDER_DOMAIN_NOT_AVAILABLE|CONTENT_TOO_LARGE|HEADER_.*)$/.test(code);
      const status=retry?'retry':knownPermanent || code.includes('LIMIT_EXCEEDED')?'failed':'uncertain';
      await db.prepare('UPDATE report_emails SET status=?,next_attempt_at=?,lease_at=NULL,error=?,updated_at=? WHERE report_id=? AND status=\'sending\' AND lease_at=?')
        .bind(status,retry?new Date(+now+(code==='E_DAILY_LIMIT_EXCEEDED'?86400000:300000)).toISOString():null,code||'Email acceptance unknown; inspect provider activity.',at,row.id,at).run();
      if(status==='uncertain')result.uncertain++;else result.failed++;
    }
  }
  return result;
}
