// input: Internal scheduler authentication; no customer-provided payment facts
// output: Bounded reconciliation counts without answers, emails or access tokens
// pos: functions/api (更新规则：同步report-jobs与回归检查)
import { reconcileReports } from '../_shared/reconcile';
import type { PaymentEnv } from '../_shared/reports';
import { DeliveryError, digest, errorResponse, json } from '../_shared/waffo';

export async function onRequest(context:{request:Request;env:PaymentEnv}) {
  if(context.request.method!=='POST') return json({error:'Method not allowed.'},405);
  try {
    const token=context.request.headers.get('Authorization')?.replace(/^Bearer /,'');
    if(!token || !context.env.AI_JOB_TOKEN || await digest(token)!==await digest(context.env.AI_JOB_TOKEN)) throw new DeliveryError(401,'Internal authentication required.');
    return json(await reconcileReports(context.env));
  } catch(error) { return errorResponse(error); }
}
