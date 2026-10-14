// input: Cloudflare secret bindings and bounded Waffo requests
// output: Signed API results and verified raw webhook bodies
// pos: functions/_shared/waffo.ts (更新规则：协议变更同步付款检查和本目录 README)

export const MERCHANT_ID = 'MER_4djROqSKCYGehkfWy7Crv4';
export const STORE_ID = 'STO_2U9mk624xX0VEC0DfgMtFw';
export const PRODUCT_ID = 'PROD_7UkiV95uYBhM2uWnMqcEFc';
export const PRICE_MINOR = 493;
export const APP_ORIGIN = 'https://soulvirtues.org';
export function testPayments(env: WaffoEnv): boolean { return env.WAFFO_MODE === 'test'; }
export interface WaffoEnv { WAFFO_MODE?: string; WAFFO_PRIVATE_KEY?: string; WAFFO_WEBHOOK_PUBLIC_KEY?: string; }

export class DeliveryError extends Error {
  constructor(public status: number, message: string) { super(message); }
}
export function errorResponse(error: unknown): Response {
  const known = error instanceof DeliveryError;
  if (!known) console.error('report_delivery_error', error instanceof Error ? error.name : 'unknown');
  return json({ error: known ? error.message : 'Report service is temporarily unavailable. Please try again or contact support.' }, known ? error.status : 503);
}
export function json(value: unknown, status = 200): Response {
  return Response.json(value, { status, headers: { 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex', 'X-Content-Type-Options': 'nosniff' } });
}
export function record(value: unknown): Record<string, unknown> {
  return value && typeof value === 'object' && !Array.isArray(value) ? value as Record<string, unknown> : {};
}
export async function boundedText(body: ReadableStream<Uint8Array> | null, limit: number): Promise<string> {
  if (!body) return '';
  const reader = body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    for (;;) {
      const item = await reader.read();
      if (item.done) break;
      size += item.value.byteLength;
      if (size > limit) { await reader.cancel(); throw new DeliveryError(413, 'Request is too large.'); }
      chunks.push(item.value);
    }
  } finally { reader.releaseLock(); }
  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
  return new TextDecoder().decode(bytes);
}
export async function requestJson(request: Request): Promise<Record<string, unknown>> {
  try { return record(JSON.parse(await boundedText(request.body, 8192))); }
  catch (error) { if (error instanceof DeliveryError) throw error; throw new DeliveryError(400, 'Invalid request.'); }
}
export function sameOrigin(request: Request): void {
  const origin = request.headers.get('Origin');
  if (origin && origin !== new URL(request.url).origin) throw new DeliveryError(403, 'Open checkout on the website where you completed the quiz.');
}
const base64 = (bytes: Uint8Array) => btoa(Array.from(bytes, byte => String.fromCharCode(byte)).join(''));
const fromBase64 = (text: string) => Uint8Array.from(atob(text.replace(/-----[^-]+-----/g, '').replace(/\s+/g, '')), char => char.charCodeAt(0));
function der(tag: number, payload: Uint8Array): Uint8Array {
  const bytes: number[] = [];
  for (let length = payload.length; length > 0; length >>>= 8) bytes.unshift(length & 255);
  return Uint8Array.from([tag, ...(payload.length < 128 ? [payload.length] : [128 + bytes.length, ...bytes]), ...payload]);
}
const rsaAlgorithm = [48,13,6,9,42,134,72,134,247,13,1,1,1,5,0];
function privateDer(pem: string): Uint8Array {
  const bytes = fromBase64(pem);
  // Web Crypto imports PKCS8; Waffo downloads may use the equivalent PKCS1 PEM envelope.
  return pem.includes('BEGIN RSA PRIVATE KEY') ? der(48, Uint8Array.from([2,1,0,...rsaAlgorithm,...der(4,bytes)])) : bytes;
}
export async function digest(text: string): Promise<string> {
  return Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text))), byte => byte.toString(16).padStart(2, '0')).join('');
}

export async function waffo(env: WaffoEnv, path: string, body: unknown): Promise<Record<string, unknown>> {
  if (!env.WAFFO_PRIVATE_KEY) throw new DeliveryError(503, 'Checkout is not configured. Please contact support.');
  const bodyText = JSON.stringify(body);
  const timestamp = Math.floor(Date.now() / 1000).toString();
  let key: CryptoKey;
  try {
    const bytes = privateDer(env.WAFFO_PRIVATE_KEY);
    key = await crypto.subtle.importKey('pkcs8', bytes.buffer as ArrayBuffer, { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' }, false, ['sign']);
  } catch { throw new DeliveryError(503, 'The payment key needs to be configured correctly. Please contact support.'); }
  const hash = base64(new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(bodyText))));
  const signature = base64(new Uint8Array(await crypto.subtle.sign('RSASSA-PKCS1-v1_5', key, new TextEncoder().encode(`POST\n${path}\n${timestamp}\n${hash}`))));
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);
  try {
    // Signed keys determine their own environment; a test header cannot turn a production key into a test key.
    const response = await fetch('https://api.waffo.ai' + path, {
      method: 'POST', signal: controller.signal,
      headers: { 'Content-Type': 'application/json', 'X-Merchant-Id': MERCHANT_ID, 'X-Timestamp': timestamp, 'X-Signature': signature }, body: bodyText,
    });
    const payload = record(JSON.parse(await boundedText(response.body, 262144)));
    if (!response.ok || (Array.isArray(payload.errors) && payload.errors.length)) {
      console.error('waffo_request_failed', response.status);
      throw new DeliveryError(502, 'The payment service could not confirm this request. Please retry; do not pay twice.');
    }
    return record(payload.data);
  } catch (error) {
    if (error instanceof DeliveryError) throw error;
    throw new DeliveryError(502, 'The payment service is temporarily unavailable. Please retry; do not pay twice.');
  } finally { clearTimeout(timer); }
}

export async function verifiedWebhook(request: Request, env: WaffoEnv): Promise<Record<string, unknown>> {
  if (!env.WAFFO_WEBHOOK_PUBLIC_KEY) throw new DeliveryError(503, 'Webhook verification is not configured.');
  const header = request.headers.get('X-Waffo-Signature') || '';
  const timestamp = /(?:^|,)\s*t=(\d+)(?:,|$)/.exec(header)?.[1];
  const signature = /(?:^|,)\s*v1=([^,]+)(?:,|$)/.exec(header)?.[1];
  // Waffo retries retain the original millisecond timestamp for up to 31+ minutes.
  const age = timestamp ? Date.now() - Number(timestamp) : Infinity;
  if (!timestamp || !signature || age < -60000 || age > 45 * 60000) throw new DeliveryError(401, 'Invalid webhook signature.');
  const raw = await boundedText(request.body, 65536);
  try {
    const bytes = fromBase64(env.WAFFO_WEBHOOK_PUBLIC_KEY);
    const key = await crypto.subtle.importKey('spki', bytes.buffer as ArrayBuffer, { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' }, false, ['verify']);
    const verified = await crypto.subtle.verify('RSASSA-PKCS1-v1_5', key, fromBase64(signature), new TextEncoder().encode(`${timestamp}.${raw}`));
    if (!verified) throw new Error('signature');
    return record(JSON.parse(raw));
  } catch { throw new DeliveryError(401, 'Invalid webhook signature.'); }
}
