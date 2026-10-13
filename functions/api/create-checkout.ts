// input: Complete current-bank answers and a private checkout request identity
// output: Saved report snapshots and one Waffo checkout link for the same request
// pos: functions/api/create-checkout.ts (更新规则：交付变化同步 Quiz、付款回归与本目录 README)

import { BANK_VERSION } from '../../src/data/quizSession';
import { checkoutDraft, database, refreshPayment, rowById, type PaymentEnv } from '../_shared/reports';
import { APP_ORIGIN, DeliveryError, digest, errorResponse, json, PRODUCT_ID, requestJson, sameOrigin, waffo } from '../_shared/waffo';

export async function onRequest(context: { request: Request; env: PaymentEnv }): Promise<Response> {
  if (context.request.method !== 'POST') return json({ error: 'Method not allowed.' }, 405);
  try {
    sameOrigin(context.request);
    if (new URL(context.request.url).origin !== APP_ORIGIN) throw new DeliveryError(403, 'Use soulvirtues.org for checkout. The local page is a design preview.');
    const db = database(context.env);
    if (!context.env.WAFFO_PRIVATE_KEY) throw new DeliveryError(503, 'Checkout is not configured. Please contact support.');
    const draft = await checkoutDraft(await requestJson(context.request));
    const now = new Date().toISOString();
    const previous = await rowById(context.env, draft.id);
    if (!previous) {
      const ip = context.request.headers.get('CF-Connecting-IP');
      if (ip) {
        const bucket = await digest(`${ip}:${Math.floor(Date.now()/3600000)}:${context.env.WAFFO_PRIVATE_KEY}`);
        const usage = await db.prepare(`INSERT INTO checkout_limits(bucket,hits,created_at) VALUES(?,1,?)
          ON CONFLICT(bucket) DO UPDATE SET hits=hits+1 RETURNING hits`).bind(bucket, now).first<{ hits: number }>();
        if (usage && usage.hits > 20) throw new DeliveryError(429, 'Too many checkout requests. Please wait before trying again.');
      }
      // Expired private content is removed during API upkeep; no raw answers go into request logs.
      await db.prepare("DELETE FROM paid_reports WHERE expires_at<? OR (paid_at IS NULL AND created_at<?)")
        .bind(now, new Date(Date.now()-31*86400000).toISOString()).run();
      await db.prepare('DELETE FROM checkout_limits WHERE created_at<?').bind(new Date(Date.now()-86400000).toISOString()).run();
      await db.prepare('DELETE FROM payment_events WHERE received_at<?').bind(new Date(Date.now()-31*86400000).toISOString()).run();
    }
    const inserted = await db.prepare(`INSERT OR IGNORE INTO paid_reports
      (id,access_hash,input_hash,status,bank_version,guide_en,guide_es,created_at,updated_at,checkout_lease_at)
      VALUES (?,?,?,'creating',?,?,?,?,?,?)`)
      .bind(draft.id, draft.accessHash, draft.inputHash, BANK_VERSION, JSON.stringify(draft.guides.en), JSON.stringify(draft.guides.es), now, now, now).run();
    let row = (await rowById(context.env, draft.id))!;
    if (row.access_hash !== draft.accessHash || row.input_hash !== draft.inputHash) throw new DeliveryError(409, 'This checkout request does not match these answers. Start a new report request.');
    if (!inserted.meta.changes) {
      row = await refreshPayment(context.env, row, true);
      if (row.status === 'paid') return json({ reportId: row.id, alreadyPaid: true });
      if (row.status === 'refunded' || (row.status === 'cancelled' && row.paid_at)) throw new DeliveryError(403, 'This report order is closed. Contact support before making another payment.');
      if (row.status === 'cancelled') {
        await db.prepare("UPDATE paid_reports SET status='pending',checkout_url=NULL,session_id=NULL,checkout_expires_at=NULL,checkout_lease_at=NULL WHERE id=? AND paid_at IS NULL").bind(row.id).run();
        row = (await rowById(context.env, row.id))!;
      }
      if (row.checkout_url && Date.parse(row.checkout_expires_at || '') > Date.now()) return json({ reportId: row.id, checkoutUrl: row.checkout_url });
      if (row.status === 'creating' && Date.now() - Date.parse(row.checkout_lease_at || row.created_at) < 30000) return json({ status: 'creating', reportId: row.id }, 202);
      const locked = await db.prepare(`UPDATE paid_reports SET status='creating',checkout_lease_at=?,updated_at=?
        WHERE id=? AND status IN ('pending','creating') AND (checkout_lease_at IS NULL OR checkout_lease_at<?)`)
        .bind(now, now, row.id, new Date(Date.now() - 30000).toISOString()).run();
      if (!locked.meta.changes) return json({ status: 'creating', reportId: row.id }, 202);
    }
    try {
      const session = await waffo(context.env, '/v1/actions/checkout/create-session', {
        productId: PRODUCT_ID, currency: 'USD', darkMode: true,
        language: draft.lang === 'es' ? 'es-MX' : 'en', expiresInSeconds: 3600,
        orderMerchantExternalId: draft.id,
        metadata: { application: 'soulvirtues', productId: PRODUCT_ID, reportId: draft.id },
        successUrl: `${APP_ORIGIN}/success/?report=${draft.id}`,
      });
      if (typeof session.checkoutUrl !== 'string' || typeof session.sessionId !== 'string' || typeof session.expiresAt !== 'string' || !Number.isFinite(Date.parse(session.expiresAt))) throw new DeliveryError(502, 'The payment service returned an incomplete checkout link.');
      const url = new URL(session.checkoutUrl);
      if (url.protocol !== 'https:' || !['checkout.waffo.ai', 'pancake.waffo.ai'].includes(url.hostname) || url.searchParams.get('test') === 'true') throw new DeliveryError(503, 'The checkout link is not a valid production payment link. Please contact support.');
      await db.prepare(`UPDATE paid_reports SET status=CASE WHEN status='creating' THEN 'pending' ELSE status END,
        checkout_url=?,session_id=?,checkout_expires_at=?,checkout_lease_at=NULL,updated_at=?
        WHERE id=? AND status NOT IN ('refunded','cancelled')`)
        .bind(url.href, session.sessionId, session.expiresAt, new Date().toISOString(), draft.id).run();
      return json({ reportId: draft.id, checkoutUrl: url.href });
    } catch (error) {
      await db.prepare("UPDATE paid_reports SET status='pending',checkout_lease_at=NULL WHERE id=? AND status='creating'").bind(draft.id).run();
      throw error;
    }
  } catch (error) { return errorResponse(error); }
}
