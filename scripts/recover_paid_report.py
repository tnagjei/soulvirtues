# input: An order number and the purchasing email verified by the support operator
# output: A replacement private link in a new local file; no email is sent
# pos: scripts/recover_paid_report.py (更新规则：恢复逻辑变化同步 README 与自检)
"""Run only after checking the support request comes from the purchasing email."""
import argparse
import datetime as dt
import hashlib
import json
import os
from pathlib import Path
import re
import secrets
import sqlite3
import tomllib
import urllib.request

SELECT = "SELECT id,buyer_email,status,expires_at FROM paid_reports WHERE order_id=?"
UPDATE = "UPDATE paid_reports SET access_hash=?,updated_at=? WHERE id=? AND order_id=? AND buyer_email=? AND status='paid' AND expires_at>?"


def eligible(row, email, now):
    if not row or row['status'] != 'paid' or row['buyer_email'].casefold() != email.casefold() or row['expires_at'] <= now:
        raise ValueError('Order, purchasing email or active paid access could not be verified.')


def self_test():
    db = sqlite3.connect(':memory:')
    db.row_factory = sqlite3.Row
    db.execute('CREATE TABLE paid_reports(id,order_id,buyer_email,status,expires_at,access_hash,updated_at)')
    db.execute("INSERT INTO paid_reports VALUES('fixture','ORD_fixture','buyer@example.invalid','paid','2999-01-01','old','')")
    row = dict(db.execute(SELECT, ['ORD_fixture']).fetchone())
    eligible(row, 'buyer@example.invalid', '2026-01-01')
    for candidate, email in [(row, 'wrong@example.invalid'), ({**row, 'status': 'pending'}, row['buyer_email']), ({**row, 'expires_at': '2000-01-01'}, row['buyer_email'])]:
        try:
            eligible(candidate, email, '2026-01-01')
        except ValueError:
            pass
        else:
            raise AssertionError('Unverified or expired access accepted')
    assert db.execute(UPDATE, ['new', '2026-01-01', row['id'], 'ORD_fixture', row['buyer_email'], '2026-01-01']).rowcount == 1
    db.execute("UPDATE paid_reports SET status='refunded'")
    assert db.execute(UPDATE, ['again', '2026-01-01', row['id'], 'ORD_fixture', row['buyer_email'], '2026-01-01']).rowcount == 0
    print('Paid-report recovery self-check passed; no cloud requests or email.')


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--order')
    parser.add_argument('--verified-buyer')
    parser.add_argument('--output', type=Path)
    parser.add_argument('--self-test', action='store_true')
    args = parser.parse_args()
    if args.self_test:
        self_test()
        return
    if not args.order or not re.fullmatch(r'ORD_[A-Za-z0-9]+', args.order) or not args.verified_buyer or not args.output:
        parser.error('Provide --order, --verified-buyer and a new private --output path.')
    config = Path(__file__).resolve().parents[1] / 'wrangler.jsonc'
    cfg = json.loads('\n'.join(line for line in config.read_text().splitlines() if not line.lstrip().startswith('//')))
    database_id = next(item['database_id'] for item in cfg['d1_databases'] if item['binding'] == 'REPORTS_DB')
    auth = tomllib.loads((Path.home() / 'Library/Preferences/.wrangler/config/default.toml').read_text())['oauth_token']
    endpoint = f'https://api.cloudflare.com/client/v4/accounts/082320a811af438151c6f4743495c203/d1/database/{database_id}/query'

    def query(sql, params):
        request = urllib.request.Request(endpoint, method='POST', headers={'Authorization': 'Bearer ' + auth, 'Content-Type': 'application/json'}, data=json.dumps({'sql': sql, 'params': params}).encode())
        result = json.load(urllib.request.urlopen(request, timeout=15))
        if not result.get('success') or not result['result'][0].get('success'):
            raise RuntimeError('Database request failed; no report was sent.')
        return result['result'][0]

    now = dt.datetime.now(dt.timezone.utc).isoformat(timespec='milliseconds').replace('+00:00', 'Z')
    rows = query(SELECT, [args.order])['results']
    row = rows[0] if rows else None
    eligible(row, args.verified_buyer, now)
    token = secrets.token_hex(32)
    payload = {'order': args.order, 'sendOnlyTo': row['buyer_email'], 'privateLink': f'https://soulvirtues.org/success/?report={row["id"]}#access={token}'}
    with os.fdopen(os.open(args.output, os.O_WRONLY | os.O_CREAT | os.O_EXCL, 0o600), 'w') as output:
        output.write(json.dumps(payload, indent=2) + '\n')
    try:
        changed = query(UPDATE, [hashlib.sha256(token.encode()).hexdigest(), now, row['id'], args.order, row['buyer_email'], now])['meta']['changes']
        if changed != 1:
            raise RuntimeError('Order changed while recovering; access was not granted.')
    except Exception:
        args.output.unlink()
        raise
    print('Replacement link saved privately. Old links are revoked. Send only to the verified purchasing email; no email was sent automatically.')


if __name__ == '__main__':
    main()
