// input: Durable paid-report IDs from the production/test queues
// output: Authenticated AI processing with retries independent of the browser
// pos: workers/report-jobs/index.ts (更新规则：队列协议变化同步 Pages process-ai 与本目录 README)
interface Message { body:{reportId:string;lang:'en'|'es';mode:'test'|'prod'}; ack():void; retry(options?:{delaySeconds:number}):void; }
export default {
  async queue(batch:{queue:string;messages:Message[]},env:{AI_JOB_TOKEN:string}) {
    for(const message of batch.messages){
      const body=message.body;
      if(!body || !/^[a-f0-9-]{36}$/.test(body.reportId) || !['en','es'].includes(body.lang) || !['test','prod'].includes(body.mode)){message.ack();continue;}
      try {
        const response=await fetch('https://soulvirtues.org/api/process-ai',{method:'POST',headers:{Authorization:'Bearer '+env.AI_JOB_TOKEN,'Content-Type':'application/json'},body:JSON.stringify({...body,exhausted:batch.queue.endsWith('-failed')}),signal:AbortSignal.timeout(130000)});
        if(response.ok)message.ack();else message.retry({delaySeconds:60});
      }catch{message.retry({delaySeconds:60});}
    }
  },
};
