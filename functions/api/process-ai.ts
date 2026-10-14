// input: Internal authenticated queue work, never customer-supplied answers
// output: Cached interpretation or an explicit retry response
// pos: functions/api/process-ai.ts (更新规则：内部契约变化同步队列 Worker 与本目录 README)
import { guideLanguage,REPORT_ID,type PaymentEnv } from '../_shared/reports';
import { checkBalance,processAI } from '../_shared/ai';
import { DeliveryError,digest,errorResponse,json,requestJson } from '../_shared/waffo';
export async function onRequest(context:{request:Request;env:PaymentEnv}):Promise<Response>{
  if(context.request.method!=='POST')return json({error:'Method not allowed.'},405);
  try{
    const token=context.request.headers.get('Authorization')?.replace(/^Bearer /,'');
    if(!token || !context.env.AI_JOB_TOKEN || await digest(token)!==await digest(context.env.AI_JOB_TOKEN))throw new DeliveryError(401,'Internal authentication required.');
    const body=await requestJson(context.request);
    if(typeof body.reportId!=='string'||!REPORT_ID.test(body.reportId)||!['test','prod'].includes(String(body.mode)))throw new DeliveryError(400,'Invalid generation job.');
    let env=context.env;
    if(body.mode==='test'){
      if(body.reportId!==env.AI_TEST_REPORT_ID || !env.TEST_REPORTS_DB)throw new DeliveryError(403,'Unapproved test report.');
      env={...env,REPORTS_DB:env.TEST_REPORTS_DB};
    }
    if(body.action==='ready'){await checkBalance(env);return json({ready:true});}
    const finished=await processAI(env,body.reportId,guideLanguage(body.lang));
    return json({finished},finished?200:503);
  }catch(error){return errorResponse(error);}
}
