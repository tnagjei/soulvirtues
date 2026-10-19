// input: Existing private reports and authoritative Waffo queries
// output: Bounded payment reconciliation and recovery of undispatched AI jobs
// pos: functions/_shared (更新规则：同步API、cron与定向测试)
import { cachedAI, enqueueAI } from './ai';
import { database, refreshPayment, type PaymentEnv, type ReportRow } from './reports';
import { testPayments } from './waffo';

export async function reconcileReports(env: PaymentEnv, now = new Date()) {
  const db = database(env), at = now.toISOString();
  await db.prepare("INSERT OR IGNORE INTO delivery_maintenance(name,lease_until) VALUES('payments','')").run();
  const lease = await db.prepare("UPDATE delivery_maintenance SET lease_until=? WHERE name='payments' AND lease_until<?")
    .bind(new Date(+now + 240000).toISOString(), at).run();
  if (!lease.meta.changes) return { busy:true, checked:0, paid:0, errors:0 };
  const result = { busy:false, checked:0, paid:0, errors:0 };
  try {
    const rows = await db.prepare(`SELECT * FROM paid_reports
      WHERE status IN ('creating','pending','paid') AND created_at>=?
      AND (expires_at IS NULL OR expires_at>?) AND (reconcile_after IS NULL OR reconcile_after<=?)
      AND (?=0 OR id=?) ORDER BY COALESCE(reconcile_after,created_at),id LIMIT 20`)
      .bind(new Date(+now - 31*86400000).toISOString(), at, at, testPayments(env)?1:0, env.AI_TEST_REPORT_ID || '').all<ReportRow>();
    // Four parallel queries keep the bounded sweep below the scheduled execution deadline.
    for (let start=0; start<rows.results.length; start+=4) {
      await Promise.all(rows.results.slice(start,start+4).map(async stored => {
        let row=stored, error:string|null=null;
        try {
          row=await refreshPayment(env,stored,true);
          result.checked++;
          if(row.status==='paid') {
            result.paid++;
            if(row.ai_consent && !cachedAI(row,row.purchase_lang)) await enqueueAI(env,row,row.purchase_lang);
          }
        } catch { result.errors++; error='Payment reconciliation or AI dispatch failed; inspect provider and queue status.'; }
        const interval=error || +now-Date.parse(row.created_at)<3600000 ? 300000 : 3600000;
        await db.prepare('UPDATE paid_reports SET reconcile_after=?,reconcile_error=? WHERE id=?')
          .bind(new Date(+now+interval).toISOString(),error,row.id).run();
      }));
    }
    await db.prepare("UPDATE delivery_maintenance SET last_run_at=?,last_result=? WHERE name='payments'").bind(at,JSON.stringify(result)).run();
    return result;
  } finally { await db.prepare("UPDATE delivery_maintenance SET lease_until='' WHERE name='payments'").run(); }
}
