// input: Durable paid-report IDs from the production/test queues
// output: Authenticated AI processing, scheduled reconciliation and ready-report emails
// pos: workers/report-jobs/index.ts (更新规则：队列协议变化同步 Pages process-ai 与本目录 README)
import { sendReadyEmails, type MailEnv } from './email';
interface Message { body:{reportId:string;lang:'en'|'es';mode:'test'|'prod'}; ack():void; retry(options?:{delaySeconds:number}):void; }
async function mail(env:MailEnv,mode:'test'|'prod',id?:string) {
  try { console.log('report_email_sweep',mode,JSON.stringify(await sendReadyEmails(env,mode,id))); }
  catch { console.error('report_email_sweep_failed',mode); }
}
export default {
  async scheduled(_controller:unknown,env:MailEnv) {
    for(const mode of ['prod','test'] as const) {
      try {
        const origin=mode==='prod'?'https://soulvirtues-dz6.pages.dev':'https://soulvirtues-paytest.pages.dev';
        const response=await fetch(origin+'/api/reconcile-reports',{method:'POST',headers:{Authorization:'Bearer '+env.AI_JOB_TOKEN},signal:AbortSignal.timeout(90000)});
        if(!response.ok)throw new Error('Reconciliation failed');
        console.log('report_reconciliation',mode,await response.text());
      } catch { console.error('report_reconciliation_failed',mode); }
      await mail(env,mode);
    }
  },
  async queue(batch:{queue:string;messages:Message[]},env:MailEnv) {
    for(const message of batch.messages){
      const body=message.body;
      if(!body || !/^[a-f0-9-]{36}$/.test(body.reportId) || !['en','es'].includes(body.lang) || !['test','prod'].includes(body.mode)){message.ack();continue;}
      try {
        const response=await fetch('https://soulvirtues-dz6.pages.dev/api/process-ai',{method:'POST',headers:{Authorization:'Bearer '+env.AI_JOB_TOKEN,'Content-Type':'application/json'},body:JSON.stringify(body),signal:AbortSignal.timeout(130000)});
        if(response.ok){await mail(env,body.mode,body.reportId);message.ack();}else {
          const data=await response.json().catch(()=>null) as {nextAttemptAt?:string}|null;
          const next=Date.parse(data?.nextAttemptAt||'');
          message.retry({delaySeconds:Number.isFinite(next)?Math.max(60,Math.min(43200,Math.ceil((next-Date.now())/1000))):60});
        }
      }catch{message.retry({delaySeconds:60});}
    }
  },
};
