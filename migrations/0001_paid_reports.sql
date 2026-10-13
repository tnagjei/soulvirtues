-- input: A dedicated Soul Virtues D1 database
-- output: Private report snapshots and deduplicated payment events
-- pos: migrations/0001_paid_reports.sql (更新规则：结构变更新增迁移并同步本目录 README)
CREATE TABLE IF NOT EXISTS paid_reports (
  id TEXT PRIMARY KEY,
  access_hash TEXT NOT NULL,
  input_hash TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'creating',
  bank_version TEXT NOT NULL,
  guide_en TEXT NOT NULL,
  guide_es TEXT NOT NULL,
  checkout_url TEXT,
  session_id TEXT,
  checkout_expires_at TEXT,
  checkout_lease_at TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  paid_at TEXT,
  expires_at TEXT,
  order_id TEXT UNIQUE,
  buyer_email TEXT,
  last_checked_at TEXT,
  ai_en TEXT,
  ai_es TEXT,
  ai_lease_en TEXT,
  ai_lease_es TEXT
);
CREATE INDEX IF NOT EXISTS paid_reports_expiry ON paid_reports(expires_at);
CREATE INDEX IF NOT EXISTS paid_reports_pending_age ON paid_reports(created_at) WHERE paid_at IS NULL;
CREATE TABLE IF NOT EXISTS payment_events (
  event_key TEXT PRIMARY KEY,
  report_id TEXT NOT NULL,
  received_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS checkout_limits (
  bucket TEXT PRIMARY KEY,
  hits INTEGER NOT NULL,
  created_at TEXT NOT NULL
);
