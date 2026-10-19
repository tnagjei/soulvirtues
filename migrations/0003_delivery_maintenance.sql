-- input: Existing paid reports and AI jobs
-- output: Scheduled reconciliation and deduplicated report-email delivery
-- pos: migrations (更新规则：字段变化同步后台处理与定向测试)
ALTER TABLE paid_reports ADD COLUMN reconcile_after TEXT;
ALTER TABLE paid_reports ADD COLUMN reconcile_error TEXT;
CREATE INDEX paid_reports_reconcile ON paid_reports(reconcile_after,created_at);
CREATE TABLE delivery_maintenance (
  name TEXT PRIMARY KEY,
  lease_until TEXT NOT NULL,
  last_run_at TEXT,
  last_result TEXT
);
CREATE TABLE report_emails (
  report_id TEXT PRIMARY KEY REFERENCES paid_reports(id) ON DELETE CASCADE,
  recipient TEXT NOT NULL,
  purchase_email TEXT NOT NULL,
  lang TEXT NOT NULL,
  original_access_hash TEXT NOT NULL,
  access_hash TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  attempts INTEGER NOT NULL DEFAULT 0,
  next_attempt_at TEXT,
  lease_at TEXT,
  message_id TEXT,
  sent_at TEXT,
  error TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
