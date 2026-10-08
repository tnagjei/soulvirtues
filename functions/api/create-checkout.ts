// input: Request to create Waffo checkout session
// output: JSON with checkoutUrl
// pos: functions/api/create-checkout.ts

import { WaffoPancake, Environment } from '@waffo/pancake-ts';

interface Env {
  WAFFO_MERCHANT_ID?: string;
  WAFFO_PRIVATE_KEY?: string;
}

const DEFAULT_MERCHANT_ID = 'MER_4djROqSKCYGehkfWy7Crv4';
const DEFAULT_PRODUCT_ID = 'PROD_7UkiV95uYBhM2uWnMqcEFc';

export async function onRequest(context: { request: Request; env: Env }) {
  const merchantId = context.env?.WAFFO_MERCHANT_ID || DEFAULT_MERCHANT_ID;
  const rawKey = context.env?.WAFFO_PRIVATE_KEY || 'MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDDwjmDXu1Lc75w6mPzDUkcpM048aOTgCf1/CJKcOm1zBgU6SQVDGPF4TarYktQZLPJiuX2Ogx2/zysQflwaxn/EWt8R4qCVuLslLI3aOTn4nGdhx7n1Wath6IMRK+1eoOaZUTt7WlWpoWMahem/5AeH4oqlRB83j9ayLLwyBJOQ5UR0DLVJ0CYRe6RBEz+/kfzOrYdrG8umq9MDYQPDvKpnNfYix6nqgwlE6T3Hn7w+yQWFaNvcF2/cmnN4JfxO7iPXgHhz5d6H8lbrh0cSCeKbNWZLOOAK7xQhsdg2anFwY3ikUxibvp47wjZyhPTHwlu+QzS4Ec8waD9/oXXnC/7AgMBAAECggEANjLzO4UvzAEqzBaJP8UA5hZW35o/gNottjRtxhCHFJeCX1/BZrZ8dVAKk97uHT8UbAux6b9erh+yy7qkdlSg6PcIvGsOVVH7GCd/REodfno6nLPJgcSa3ha8bgsiXuuhvkClmf5ueNg4B41kKQ9+9mgjF/EXlIrwHZGNwY6TSul8lZRzsiIDT1Bz8sl3gxEEjjePQndTj5bG2nKPK27y+pfpyLIo9T30KHWfUgHscgc88sxwR3NXjwXTvjA5B7BzS5zKYqokvNqAlxOcimUuavbYUakw93IdPfXdaeuiHDHwu9h8lCuAiLWs9oxdpDNeOG5TEvNQxi9TzzxAri7GoQKBgQD4+0EX+NwsBm7Q6T5G8XJ9NcBIBQUXLsCCJ+CgFFQCQzNvxd/AeM801NzpNLxFUTDD6fHoRhKKPfr33tPOjD59hfx2OTntKLvQ549xEqlxoviKfqLSvU5QjyphTqdIdPxZxk0nhWDm5fJGwE8vM7rp8n0P/M1JwgDEx1TAUX9mSwKBgQDJRuT62qHwySY0bFel6Ns25KRaoEkDcq1Y3+0nRwN6wVCVkIEo8hrGhK/JvwIgD2TO89ANVNq+S59yNzrZHNhkssgLWUl5LYXscGRuIQtK8etLj+a8XmzEtXOokVtPBOTLLIQibXR+p7zzI0RKS4syomoiF9Qni1C9Ts1TjHgPEQKBgQCoktTbui630BMvdvwnZEoz5DSvjlaH/6tvdDhtqdXHQmCNCNgZpLIF/yki7AWcmP//ZWHX9bmPx68oK8IUUnfs3M617MD/hVjEdEN2N0BqJAFLI7pyHKHtgUEcaPhx4mMJFW4fl/qn2oBSztnOB6RByWBLdso3ahbDJIKJQ6SSSQKBgEiQKX8SkS1op0BhCtxCbb2Fgoc1n/0BO+N9n1b4sBVyWiYBmb70QZjuPx3BofeC9TnzBj+4JsBSLSKVLL8XOiBbn+kPgICSW+TYxCw794FGZCiysWGZvSbRr+fGt59uSTnCS8TJpyT+Pg192mHaiE1x5kdyRccX37zQCxAi5SmxAoGAP0PKUBue+TE+ULwGlIFsmMORYeVK3BrGkg5k6BuowN48pYJNayJXMzeprWM2UGEnZjWHylKd4g6ZQwmAMgoZO15BN44hMkOzYNuxf+DG/5dNCN/aBhT00TuRer7wHfwIQTJLjEtkspNM9OMlEn1YZQClwKRCoaTQPD0U+4zg2cQ=';

  const privateKey = rawKey.includes('BEGIN PRIVATE KEY')
    ? rawKey
    : '-----BEGIN PRIVATE KEY-----\n' + rawKey + '\n-----END PRIVATE KEY-----';

  try {
    const client = new WaffoPancake({
      merchantId,
      privateKey,
      environment: Environment.Test,
    });

    const session = await client.checkout.createSession({
      productId: DEFAULT_PRODUCT_ID,
      currency: 'USD',
      successUrl: 'https://soulvirtues.org/success/',
      darkMode: true,
    });

    return new Response(JSON.stringify({ checkoutUrl: session.checkoutUrl }), {
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
