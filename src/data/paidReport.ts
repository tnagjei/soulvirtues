// input: Private report credentials and bounded payment API responses
// output: Safe checkout retries and authenticated report access
// pos: src/data/paidReport.ts (更新规则：协议变化同步报告脚本、付款接口与本目录 README)

import type { buildFieldGuide, GuideLanguage } from './fieldGuide';
import { isDossierReport, type DossierReport } from './reportDelivery';
export type FieldGuide = ReturnType<typeof buildFieldGuide>;
export interface ReportAccess { id: string; token: string; fingerprint: string; }
export const PAID_ACCESS_KEY = 'soulvirtues_paid_access_v1';
const ID = /^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i;
const TOKEN = /^[a-f0-9]{64}$/;
export function accessIndex(storage: Pick<Storage, 'getItem'>): Record<string, ReportAccess> {
  let raw;
  try { raw = JSON.parse(storage.getItem(PAID_ACCESS_KEY) || '{}'); } catch { return {}; }
  const valid: Record<string, ReportAccess> = {};
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return valid;
  for (const [id, value] of Object.entries(raw)) {
    const item = value as ReportAccess;
    if (ID.test(id) && item?.id === id && TOKEN.test(item.token) && typeof item.fingerprint === 'string') valid[id] = item;
  }
  return valid;
}
export function rememberAccess(storage: Pick<Storage, 'getItem' | 'setItem'>, access: ReportAccess): void {
  const index = accessIndex(storage);
  index[access.id] = access;
  storage.setItem(PAID_ACCESS_KEY, JSON.stringify(index));
  storage.setItem('soulvirtues_last_paid_report', access.id);
}
export async function checkoutAccess(storage: Pick<Storage, 'getItem' | 'setItem'>, quiz: unknown): Promise<ReportAccess> {
  const fingerprint = JSON.stringify(quiz);
  const existing = Object.values(accessIndex(storage)).find(item => item.fingerprint === fingerprint);
  if (existing) return existing;
  const access = { id: crypto.randomUUID(), token: Array.from(crypto.getRandomValues(new Uint8Array(32)), byte => byte.toString(16).padStart(2, '0')).join(''), fingerprint };
  rememberAccess(storage, access);
  return access;
}
export function resolveAccess(storage: Pick<Storage, 'getItem' | 'setItem'>, url: URL): ReportAccess | null {
  const id = url.searchParams.get('report') || storage.getItem('soulvirtues_last_paid_report');
  if (!id || !ID.test(id)) return null;
  const fragment = new URLSearchParams(url.hash.slice(1)).get('access');
  if (fragment && TOKEN.test(fragment)) {
    const access = { id, token: fragment, fingerprint: accessIndex(storage)[id]?.fingerprint || '' };
    try { rememberAccess(storage, access); } catch { /* The fragment still grants access in this page; offer PDF and private-link saving. */ }
    return access;
  }
  return accessIndex(storage)[id] || null;
}
export function privateReportLink(origin: string, access: ReportAccess): string {
  if (!ID.test(access.id) || !TOKEN.test(access.token)) throw new Error('Invalid report access.');
  return `${origin}/success/?report=${access.id}#access=${access.token}`;
}
export class ReportApiError extends Error {
  constructor(public status: number, message: string) { super(message); }
}
export async function reportApi(path: string, access: ReportAccess | null, body?: unknown, timeout = 16000): Promise<{ status: number; data: Record<string, unknown> }> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  try {
    const headers: Record<string, string> = {};
    if (access) headers.Authorization = 'Bearer ' + access.token;
    if (body !== undefined) headers['Content-Type'] = 'application/json';
    const response = await fetch(path, { method: body === undefined ? 'GET' : 'POST', headers, signal: controller.signal, body: body === undefined ? undefined : JSON.stringify(body) });
    const data = await response.json();
    if (!data || typeof data !== 'object' || Array.isArray(data)) throw new Error('Incomplete service response.');
    if (!response.ok) throw new ReportApiError(response.status, typeof data.error === 'string' ? data.error : String(data.status || 'Report service unavailable.'));
    return { status: response.status, data };
  } finally { clearTimeout(timer); }
}
export function validGuide(value: unknown): value is FieldGuide {
  if (!value || typeof value !== 'object') return false;
  const guide = value as FieldGuide;
  return typeof guide.id === 'string' && typeof guide.title === 'string' && typeof guide.summary === 'string' &&
    Array.isArray(guide.traits) && guide.traits.length === 7 && Array.isArray(guide.ranked) && guide.ranked.length === 7 &&
    guide.traits.every(t => typeof t.score === 'number' && t.score >= 0 && t.score <= 100 && Array.isArray(t.evidence)) &&
    Array.isArray(guide.answers) && guide.answers.length === 66 && !!guide.copy && Array.isArray(guide.copy.tasks) && guide.copy.tasks.length === 7;
}
export interface PaidReport { guide: FieldGuide; order: { number: string | null; paidAt: string | null }; expiresAt: string | null; ai: DossierReport | null; }
export async function paidReport(access: ReportAccess, lang: GuideLanguage, timeout = 16000): Promise<PaidReport | null> {
  const result = await reportApi(`/api/report?report=${encodeURIComponent(access.id)}&lang=${lang}`, access, undefined, timeout);
  if (result.status === 202) return null;
  if (result.data.status !== 'paid' || !validGuide(result.data.guide)) throw new Error('The report response is incomplete. Please check again.');
  const rawOrder = result.data.order;
  if (!rawOrder || typeof rawOrder !== 'object' || Array.isArray(rawOrder)) throw new Error('The order response is incomplete.');
  const order = rawOrder as Record<string, unknown>;
  return {
    guide: result.data.guide,
    order: { number: typeof order.number === 'string' ? order.number : null, paidAt: typeof order.paidAt === 'string' ? order.paidAt : null },
    expiresAt: typeof result.data.expiresAt === 'string' ? result.data.expiresAt : null,
    ai: isDossierReport(result.data.ai) ? result.data.ai : null,
  };
}
