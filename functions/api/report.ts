// input: A report ID and its private bearer access token
// output: Verified order state and the purchased immutable guide snapshot
// pos: functions/api/report.ts (更新规则：协议变化同步 field-guide 脚本、付款回归与本目录 README)

import { guideLanguage, ownedReport, refreshPayment, requirePaid, snapshot, type PaymentEnv } from '../_shared/reports';
import { errorResponse, json } from '../_shared/waffo';

export async function onRequest(context: { request: Request; env: PaymentEnv }): Promise<Response> {
  if (context.request.method !== 'GET') return json({ error: 'Method not allowed.' }, 405);
  try {
    const url = new URL(context.request.url);
    const lang = guideLanguage(url.searchParams.get('lang') || 'en');
    const stored = await ownedReport(context.request, context.env, url.searchParams.get('report'));
    // A completed purchase is durable proof. Its delivered guide must not depend on a payment-provider outage.
    const row = stored.status === 'paid' ? stored : await refreshPayment(context.env, stored);
    const order = { number: row.order_id, paidAt: row.paid_at };
    if (row.status !== 'paid') return json({ status: row.status === 'refunded' || row.status === 'cancelled' ? row.status : 'pending', order }, ['refunded','cancelled'].includes(row.status) ? 403 : 202);
    requirePaid(row);
    const cached = lang === 'es' ? row.ai_es : row.ai_en;
    return json({ status: 'paid', guide: snapshot(row, lang), order, expiresAt: row.expires_at, ai: cached ? JSON.parse(cached) : null });
  } catch (error) { return errorResponse(error); }
}
