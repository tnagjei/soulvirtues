// input: A raw RSA-signed Waffo production order/refund notification
// output: Deduplicated updates based on authoritative payment queries
// pos: functions/api/waffo-webhook.ts (更新规则：事件变化同步付款回归、Cloudflare 配置与本目录 README)

import { database, moneyMinor, refreshPayment, REPORT_ID, rowById, type PaymentEnv } from '../_shared/reports';
import { errorResponse, json, record, STORE_ID, testPayments, verifiedWebhook } from '../_shared/waffo';
import { enqueueAI } from '../_shared/ai';

export async function onRequest(context: { request: Request; env: PaymentEnv }): Promise<Response> {
  if (context.request.method !== 'POST') return json({ error: 'Method not allowed.' }, 405);
  try {
    const event = await verifiedWebhook(context.request, context.env);
    const data = record(event.data);
    const id = data.orderMerchantExternalId;
    if (event.mode !== (testPayments(context.env) ? 'test' : 'prod') || event.storeId !== STORE_ID || !['order.completed','refund.succeeded'].includes(String(event.eventType)) || typeof id !== 'string' || !REPORT_ID.test(id)) return json({ received: true, ignored: true });
    const row = await rowById(context.env, id);
    if (!row) return json({ received: true, ignored: true });
    const db = database(context.env);
    const eventId = event.id || event.eventId;
    if (typeof eventId !== 'string' || !eventId) return json({ error: 'Invalid payment event identity.' }, 400);
    const eventKey = `${event.eventType}:${eventId}`;
    const seen = await db.prepare('SELECT event_key FROM payment_events WHERE event_key=?').bind(eventKey).first();
    if (seen) return json({ received: true });
    const returned = moneyMinor(data.refundedAmount);
    const original = moneyMinor(data.originalChargedAmount);
    if (event.eventType === 'refund.succeeded' && data.refundStatus === 'succeeded' && data.currency === 'USD' && data.orderId === row.order_id && returned !== null && original !== null && original > 0 && returned >= original) {
      await db.prepare("UPDATE paid_reports SET status='refunded',updated_at=? WHERE id=?").bind(new Date().toISOString(), row.id).run();
    } else {
      await refreshPayment(context.env, row, true);
    }
    const updated=await rowById(context.env,id);
    if(updated?.status==='paid') await enqueueAI(context.env,updated,updated.purchase_lang);
    // Mark only after processing succeeded, so Waffo can retry failed delivery safely.
    await db.prepare('INSERT OR IGNORE INTO payment_events(event_key,report_id,received_at) VALUES(?,?,?)').bind(eventKey, id, new Date().toISOString()).run();
    return json({ received: true });
  } catch (error) { return errorResponse(error); }
}
