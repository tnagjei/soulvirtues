#!/usr/bin/env python3
"""Update <lastmod> for a fixed set of URLs in the hand-maintained sitemap.

public/sitemap.xml has no generator (project convention), so lastmod is edited
by hand. This script exists so the edit is reproducible and auditable instead
of a blind sed: it prints every before/after pair it touches and refuses to
touch anything outside the target list.

Usage: update_sitemap_lastmod.py <url1> <url2> ...   (dates default to today)
"""
import re
import sys
from datetime import date

SITEMAP = "public/sitemap.xml"
TODAY = date.today().isoformat()

targets = [u.rstrip("/") + "/" for u in sys.argv[1:]] or None


def main():
    raw = open(SITEMAP, encoding="utf-8").read()
    blocks = re.findall(r"<url>.*?</url>", raw, re.S)
    touched, missing = [], []

    for block in blocks:
        loc = re.search(r"<loc>([^<]+)</loc>", block)
        if not loc:
            continue
        url = loc.group(1)
        if targets is not None and url not in targets:
            continue
        old = re.search(r"<lastmod>([^<]*)</lastmod>", block)
        if not old:
            missing.append(url)
            continue
        if old.group(1) == TODAY:
            continue
        new_block = block.replace(f"<lastmod>{old.group(1)}</lastmod>",
                                  f"<lastmod>{TODAY}</lastmod>", 1)
        raw = raw.replace(block, new_block, 1)
        touched.append((url, old.group(1), TODAY))

    open(SITEMAP, "w", encoding="utf-8").write(raw)

    print(f"date used: {TODAY}")
    print(f"entries touched: {len(touched)}")
    for url, o, n in touched:
        print(f"  {url}: {o} -> {n}")
    if missing:
        print(f"WARNING: no <lastmod> in: {missing}")
    if targets:
        all_urls = {re.search(r"<loc>([^<]+)</loc>", b).group(1)
                    for b in blocks if re.search(r"<loc>([^<]+)</loc>", b)}
        not_found = [t for t in targets if t not in all_urls]
        if not_found:
            print(f"WARNING: target URLs absent from sitemap: {not_found}")
    # final distribution for cross-check
    dist = re.findall(r"<lastmod>([^<]*)</lastmod>", raw)
    from collections import Counter
    print("lastmod distribution now:", dict(Counter(dist)))


if __name__ == "__main__":
    main()
