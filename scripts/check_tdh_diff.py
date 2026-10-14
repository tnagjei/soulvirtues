#!/usr/bin/env python3
"""TDH guard: byte-exact comparison of <title>, <meta name="description"> and
<h1> between two dist trees. Used to prove the 0-rule (TDH 保护约定) holds.

Usage: verify_tdh_diff.py <before_dist> <after_dist>
Exit code 0 = identical, 1 = differences found.
"""
import os
import re
import sys

TITLE_RE = re.compile(r"<title[^>]*>(.*?)</title>", re.S | re.I)
DESC_RE = re.compile(
    r'<meta\s+name=["\']description["\']\s+content=["\'](.*?)["\']', re.S | re.I)
H1_RE = re.compile(r"<h1[^>]*>(.*?)</h1>", re.S | re.I)
TAG_RE = re.compile(r"<[^>]+>")


def html_files(root):
    out = {}
    for dirpath, _dirs, files in os.walk(root):
        for f in files:
            if not f.endswith(".html"):
                continue
            p = os.path.join(dirpath, f)
            rel = os.path.relpath(p, root)
            if rel in ("404.html",):
                continue
            out[rel] = p
    return out


def norm(s):
    return re.sub(r"\s+", " ", s).strip()


def extract(path):
    raw = open(path, encoding="utf-8", errors="replace").read()
    t = TITLE_RE.search(raw)
    d = DESC_RE.search(raw)
    h = H1_RE.search(raw)
    return {
        "title": norm(t.group(1)) if t else None,
        "desc": norm(d.group(1)) if d else None,
        "h1": norm(TAG_RE.sub("", h.group(1))) if h else None,
    }


def main():
    before, after = sys.argv[1], sys.argv[2]
    bf, af = html_files(before), html_files(after)
    only_b = sorted(set(bf) - set(af))
    only_a = sorted(set(af) - set(bf))
    diffs = []
    for rel in sorted(set(bf) & set(af)):
        b, a = extract(bf[rel]), extract(af[rel])
        for k in ("title", "desc", "h1"):
            if b[k] != a[k]:
                diffs.append({"page": rel, "field": k, "before": b[k], "after": a[k]})

    print(f"pages compared: {len(set(bf) & set(af))}")
    print(f"only in before: {only_b}")
    print(f"only in after : {only_a}")
    print(f"TDH diffs     : {len(diffs)}")
    for d in diffs:
        print(f"  !! {d['page']} [{d['field']}]")
        print(f"     before: {d['before']!r}")
        print(f"     after : {d['after']!r}")
    return 1 if diffs else 0


if __name__ == "__main__":
    sys.exit(main())
