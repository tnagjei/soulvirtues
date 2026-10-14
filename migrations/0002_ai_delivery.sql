-- input: Existing paid report snapshots
-- output: Explicit answer-processing consent and durable per-language generation jobs
-- pos: migrations/0002_ai_delivery.sql (更新规则：结构变化同步报告接口与本目录 README)
ALTER TABLE paid_reports ADD COLUMN ai_consent INTEGER NOT NULL DEFAULT 0;
ALTER TABLE paid_reports ADD COLUMN purchase_lang TEXT NOT NULL DEFAULT 'en';
CREATE TABLE report_ai_jobs (
  report_id TEXT NOT NULL REFERENCES paid_reports(id) ON DELETE CASCADE,
  lang TEXT NOT NULL CHECK(lang IN ('en','es')),
  status TEXT NOT NULL DEFAULT 'queued',
  attempts INTEGER NOT NULL DEFAULT 0,
  lease_at TEXT,
  queued_at TEXT,
  next_attempt_at TEXT,
  error TEXT,
  updated_at TEXT NOT NULL,
  PRIMARY KEY(report_id,lang)
);
