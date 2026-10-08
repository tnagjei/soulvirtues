// input: Request to create Waffo checkout session via native Web Crypto
// output: JSON with checkoutUrl
// pos: functions/api/create-checkout.ts (更新规则：私钥只从环境变量读取；配置变更同步 functions/api/README.md)

interface Env {
  WAFFO_MERCHANT_ID?: string;
  WAFFO_PRIVATE_KEY?: string;
}

const DEFAULT_MERCHANT_ID = 'MER_4djROqSKCYGehkfWy7Crv4';
const DEFAULT_PRODUCT_ID = 'PROD_7UkiV95uYBhM2uWnMqcEFc';

function base64ToUint8Array(base64: string): Uint8Array {
  const clean = base64.replace(/-----BEGIN[^-]+-----/, '').replace(/-----END[^-]+-----/, '').replace(/\s+/g, '');
  const binaryString = atob(clean);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

export async function onRequest(context: { request: Request; env: Env }) {
  const merchantId = context.env?.WAFFO_MERCHANT_ID || DEFAULT_MERCHANT_ID;
  const rawKey = context.env?.WAFFO_PRIVATE_KEY;

  if (!rawKey) return Response.json({ error: 'Checkout is not configured. Please contact support.' }, { status: 503 });

  try {
    const binaryDer = base64ToUint8Array(rawKey);
    const key = await crypto.subtle.importKey(
      'pkcs8',
      binaryDer.buffer as ArrayBuffer,
      { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
      false,
      ['sign']
    );

    const path = '/v1/actions/checkout/create-session';
    const timestamp = Math.floor(Date.now() / 1000).toString();
    const bodyObj = {
      productId: DEFAULT_PRODUCT_ID,
      currency: 'USD',
      successUrl: 'https://soulvirtues.org/success/',
      darkMode: true,
    };
    const bodyStr = JSON.stringify(bodyObj);

    const bodyHashBuf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(bodyStr));
    const bodyHash = arrayBufferToBase64(bodyHashBuf);
    const canonical = `POST\n${path}\n${timestamp}\n${bodyHash}`;

    const sigBuf = await crypto.subtle.sign('RSASSA-PKCS1-v1_5', key, new TextEncoder().encode(canonical));
    const signature = arrayBufferToBase64(sigBuf);

    const res = await fetch('https://api.waffo.ai' + path, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Merchant-Id': merchantId,
        'X-Timestamp': timestamp,
        'X-Signature': signature,
        'X-Environment': 'test',
      },
      body: bodyStr,
    });

    const json = (await res.json()) as any;
    const checkoutUrl = json?.data?.checkoutUrl || json?.checkoutUrl;

    if (!checkoutUrl) {
      throw new Error(json?.errors?.[0]?.message || 'Failed to retrieve checkout URL');
    }

    return new Response(JSON.stringify({ checkoutUrl }), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store',
      },
    });
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: error?.message || 'Failed to create checkout' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
