// input: Private paid-report access and explicit consent for old orders
// output: A durable AI job, never a prepared text presented as AI
// pos: functions/api/generate-report.ts (更新规则：协议变化同步阅读页、回归与本目录 README)
import { database, guideLanguage, ownedReport, requirePaid, rowById, type PaymentEnv } from '../_shared/reports';
import { aiState, enqueueAI } from '../_shared/ai';
import { DeliveryError,errorResponse,json,requestJson,sameOrigin } from '../_shared/waffo';
export async function onRequest(context:{request:Request;env:PaymentEnv}):Promise<Response>{
  if(context.request.method!=='POST') return json({error:'Method not allowed.'},405);
  try {
    sameOrigin(context.request);
    const body=await requestJson(context.request), lang=guideLanguage(body.lang);
    let row=await ownedReport(context.request,context.env,body.reportId);requirePaid(row);
    if(!row.ai_consent){
      if(body.consent!==true) throw new DeliveryError(400,'Confirm that DeepSeek may interpret your 66 saved quiz answers.');
      await database(context.env).prepare('UPDATE paid_reports SET ai_consent=1 WHERE id=?').bind(row.id).run();
      row=(await rowById(context.env,row.id))!;
    }
    await enqueueAI(context.env,row,lang);
    return json({aiState:await aiState(context.env,row,lang)},202);
  }catch(error){return errorResponse(error);}
}
