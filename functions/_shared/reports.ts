// input: Versioned answers, private access tokens and Waffo order facts
// output: Private D1 report snapshots and verified payment state
// pos: functions/_shared/reports.ts (更新规则：存储/权限变化同步迁移、付款回归与本目录 README)

import { buildFieldGuide, type GuideLanguage } from '../../src/data/fieldGuide';
import { BANK_VERSION, decodeAnswers } from '../../src/data/quizSession';
import { QUESTIONS } from '../../src/data/questions';
import { computeScores } from '../../src/data/scoring';
import { normalizeReportInput } from '../../src/data/reportDelivery';
import { DeliveryError, digest, PRODUCT_ID, PRICE_MINOR, record, STORE_ID, waffo, type WaffoEnv } from './waffo';

// The subset of the native D1 binding used here; checked against a real SQLite database in payment regression.
export interface ReportStatement {
  bind(...values: unknown[]): ReportStatement;
  first<T>(): Promise<T | null>;
  all<T>(): Promise<{ results: T[] }>;
  run(): Promise<{ meta: { changes: number } }>;
}
export interface ReportDatabase { prepare(sql: string): ReportStatement; }
export interface PaymentEnv extends WaffoEnv { REPORTS_DB?: ReportDatabase; DEEPSEEK_API_KEY?: string; OPENAI_API_KEY?: string; }
export interface ReportRow {
  id: string; access_hash: string; input_hash: string; status: string; bank_version: string;
  guide_en: string; guide_es: string; checkout_url: string | null; session_id: string | null; checkout_expires_at: string | null;
  checkout_lease_at: string | null; created_at: string; updated_at: string; paid_at: string | null; expires_at: string | null;
  order_id: string | null; buyer_email: string | null; last_checked_at: string | null;
  ai_en: string | null; ai_es: string | null; ai_lease_en: string | null; ai_lease_es: string | null;
}
export const REPORT_ID = /^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i;
export const ACCESS_TOKEN = /^[a-f0-9]{64}$/;
export function database(env: PaymentEnv): ReportDatabase {
  if (!env.REPORTS_DB) throw new DeliveryError(503, 'Secure report storage is not configured. Please contact support.');
  return env.REPORTS_DB;
}
export function guideLanguage(value: unknown): GuideLanguage {
  if (value !== 'en' && value !== 'es') throw new DeliveryError(400, 'Choose English or Spanish for your report.');
  return value;
}
export async function rowById(env: PaymentEnv, id: string): Promise<ReportRow | null> {
  return database(env).prepare('SELECT * FROM paid_reports WHERE id = ?').bind(id).first<ReportRow>();
}
export async function ownedReport(request: Request, env: PaymentEnv, id: unknown): Promise<ReportRow> {
  const token = /^Bearer ([a-f0-9]{64})$/.exec(request.headers.get('Authorization') || '')?.[1];
  if (!token || typeof id !== 'string' || !REPORT_ID.test(id)) throw new DeliveryError(401, 'Open your private report link or the browser where you purchased.');
  const row = await database(env).prepare('SELECT * FROM paid_reports WHERE id = ? AND access_hash = ?').bind(id, await digest(token)).first<ReportRow>();
  if (!row) throw new DeliveryError(404, 'This private report link is not available. Contact support with your Waffo order number.');
  return row;
}
export async function checkoutDraft(body: Record<string, unknown>) {
  const id = body.reportId;
  const token = body.accessToken;
  if (typeof id !== 'string' || !REPORT_ID.test(id) || typeof token !== 'string' || !ACCESS_TOKEN.test(token)) throw new DeliveryError(400, 'Invalid report request.');
  if (body.consent !== true) throw new DeliveryError(400, 'Confirm the purchase and report-storage notice before continuing.');
  const lang = guideLanguage(body.lang);
  const quiz = record(body.quiz);
  const answers = decodeAnswers(JSON.stringify(quiz), QUESTIONS);
  if (quiz.version !== BANK_VERSION || !answers || answers.some(answer => answer === null)) throw new DeliveryError(400, 'Complete all 66 questions in the current quiz before purchasing.');
  const complete = answers as number[];
  const input = normalizeReportInput({ pct: computeScores(complete, QUESTIONS).pct, lang })!;
  const guides = { en: buildFieldGuide(input, complete, 'en'), es: buildFieldGuide(input, complete, 'es') };
  return { id, token, lang, accessHash: await digest(token), inputHash: await digest(JSON.stringify({ version: BANK_VERSION, answers: complete })), guides };
}
export function snapshot(row: ReportRow, lang: GuideLanguage): ReturnType<typeof buildFieldGuide> {
  return JSON.parse(lang === 'es' ? row.guide_es : row.guide_en);
}
export function requirePaid(row: ReportRow): void {
  if (row.status === 'refunded' || row.status === 'cancelled') throw new DeliveryError(403, 'This order no longer has online report access. Please contact support.');
  if (row.status !== 'paid') throw new DeliveryError(402, 'Payment has not been confirmed. Do not pay again; check the order first.');
  if (!row.expires_at || Date.parse(row.expires_at) <= Date.now()) throw new DeliveryError(410, 'The 30-day online report window has ended. Your saved PDF remains yours. Contact support for help.');
}
export function moneyMinor(value: unknown): number | null {
  if (typeof value !== 'number' && typeof value !== 'string') return null;
  const match = /^(\d+)(?:\.(\d+))?$/.exec(String(value));
  if (!match || (match[2] && /[1-9]/.test(match[2].slice(2)))) return null;
  const minor = Number(match[1]) * 100 + Number((match[2] || '').slice(0, 2).padEnd(2, '0'));
  return Number.isSafeInteger(minor) ? minor : null;
}

const ORDER_QUERY = `query($storeId:String!, $ref:String!) {
  onetimeOrders(storeId:$storeId, filter:{orderMerchantExternalId:{eq:$ref}}) {
    id status buyerEmail currency orderMerchantExternalId metadata createdAt
    priceSnapshot { total subtotal currency }
  }
  payments(filter:{orderMerchantExternalId:{eq:$ref}}) {
    id orderId status refundStatus orderMerchantExternalId createdAt
    snapshotAmountDetails { total currency }
  }
}`;
export function orderFacts(payload: Record<string, unknown>, id: string) {
  const orders = Array.isArray(payload.onetimeOrders) ? payload.onetimeOrders.map(record).sort((a,b) => String(b.createdAt || '').localeCompare(String(a.createdAt || ''))) : [];
  const payments = Array.isArray(payload.payments) ? payload.payments.map(record) : [];
  for (const order of orders) {
    if (typeof order.id !== 'string' || !/^ORD_[A-Za-z0-9]+$/.test(order.id)) continue;
    let meta = record(order.metadata);
    if (typeof order.metadata === 'string') { try { meta = record(JSON.parse(order.metadata)); } catch { continue; } }
    const price = record(order.priceSnapshot);
    if (order.orderMerchantExternalId !== id || meta.reportId !== id || meta.application !== 'soulvirtues' || meta.productId !== PRODUCT_ID || order.currency !== 'USD' || moneyMinor(price.total) === null || moneyMinor(price.total)! < PRICE_MINOR) continue;
    const successful = payments.find(payment => payment.orderId === order.id && payment.orderMerchantExternalId === id && payment.status === 'succeeded' && record(payment.snapshotAmountDetails).currency === 'USD' && (moneyMinor(record(payment.snapshotAmountDetails).total) ?? 0) >= PRICE_MINOR);
    const refunded = successful && ['full', 'refunded', 'fully_refunded', 'fullyRefunded'].includes(String(successful.refundStatus));
    const paidDate = successful && typeof successful.createdAt === 'string' && Number.isFinite(Date.parse(successful.createdAt)) ? new Date(successful.createdAt).toISOString() : null;
    return { status: refunded ? 'refunded' : order.status === 'completed' && successful ? 'paid' : order.status === 'canceled' || order.status === 'cancelled' ? 'cancelled' : 'pending', orderId: order.id, email: typeof order.buyerEmail === 'string' ? order.buyerEmail : null, paidAt: paidDate };
  }
  return { status: 'pending', orderId: null, email: null, paidAt: null };
}
export async function refreshPayment(env: PaymentEnv, row: ReportRow, force = false): Promise<ReportRow> {
  if (row.status === 'refunded' || row.status === 'cancelled') return row;
  if (!force && row.last_checked_at && Date.now() - Date.parse(row.last_checked_at) < (row.status === 'paid' ? 60000 : 4000)) return row;
  const payload = await waffo(env, '/v1/graphql', { query: ORDER_QUERY, variables: { storeId: STORE_ID, ref: row.id } });
  const facts = orderFacts(payload, row.id);
  const now = new Date().toISOString();
  const paidAt = row.paid_at || facts.paidAt || (facts.status === 'paid' ? now : null);
  const expiresAt = row.expires_at || (paidAt ? new Date(Date.parse(paidAt) + 30 * 86400000).toISOString() : null);
  // Once access is revoked, a delayed success query or replay must not enable it again.
  await database(env).prepare(`UPDATE paid_reports SET
    status = CASE WHEN ? = 'pending' AND status IN ('paid','creating') THEN status ELSE ? END,
    order_id = COALESCE(?,order_id), buyer_email = COALESCE(?,buyer_email),
    paid_at = COALESCE(paid_at,?), expires_at = COALESCE(expires_at,?), last_checked_at = ?, updated_at = ?
    WHERE id = ? AND status NOT IN ('refunded','cancelled')`)
    .bind(facts.status, facts.status, facts.orderId, facts.email, paidAt, expiresAt, now, now, row.id).run();
  return (await rowById(env, row.id))!;
}
