# input: seo-input/gsc-api/day60-final-*/*.json（GSC 100% 定稿导出，data-state=final）
# output: metrics 快照 JSON（stdout 或 --out 指定路径），供 reports/gsc 双月复盘逐字引用
# pos: 双月 GSC 指标计算器（同口径可复算；更新规则：口径变更需同步脚注与报告说明）

"""双月 GSC 指标计算器。

口径约定（与第 30 天复盘保持一致，便于同口径对比）：
- 语言归属：按 page 维度 URL 路径前缀判断（/es/ /pt/ /ja/ /ru/ 为对应语种，其余记 EN）。
- 剔除项：about / contact / privacy / terms 法律与静态页；含 `#` 锚点或 `?utm` 跟踪参数的 URL。
- 平均排名：一律曝光加权（sum(position*impressions)/sum(impressions)），不是算术平均。
- 窗口 1 固定 2026-08-18~2026-09-16，窗口 2 固定 2026-09-17~2026-10-16，各 30 天。
"""

from __future__ import annotations

import argparse
import json
import re
from collections import defaultdict
from datetime import date, timedelta
from pathlib import Path

HOST = "https://soulvirtues.org"
EXCLUDE_RE = re.compile(r"^/(?:[a-z]{2}/)?(?:about|contact|privacy|terms)(?:/|$)", re.I)
LEGAL_TOPS = ("/about", "/contact", "/privacy", "/terms")

W1 = (date(2026, 8, 18), date(2026, 9, 16))
W2 = (date(2026, 9, 17), date(2026, 10, 16))

LANGS = ("es", "pt", "ja", "ru")
LANG_LABEL = {"es": "西语 /es/", "pt": "葡语 /pt/", "ja": "日语 /ja/", "ru": "俄语 /ru/", "en": "英语 /"}

# 第 30 天基线（reports/gsc/day30-monthly-review-2026-09-20.md），同口径硬编码以便对照
DAY30_BASELINE = {
    "clicks": 16114,
    "impressions": 87706,
    "ctr": 0.1837274530818872,
    "position": 5.961256926550065,
    "lang": {
        "es": {"clicks": 11059, "share": 0.6866, "impressions": 37296, "pos": 5.19, "urls": 20},
        "en": {"clicks": 4932, "share": 0.3062, "impressions": 52683, "pos": 6.32, "urls": 24},
        "pt": {"clicks": 55, "share": 0.0034, "impressions": 1438, "pos": 7.09, "urls": 17},
        "ja": {"clicks": 48, "share": 0.0030, "impressions": 387, "pos": 7.34, "urls": 16},
        "ru": {"clicks": 14, "share": 0.0009, "impressions": 234, "pos": 10.60, "urls": 13},
    },
}

# 第 30 天重点观察词基线（平均排名 / 曝光）
DAY30_TRACKED = {
    "soul virtues extractor": {"pos": 4.65, "impr": 17162, "clicks": 1759},
    "undertale souls quiz": {"pos": 10.97, "impr": 126},
    "what undertale soul are you": {"pos": 10.72, "impr": 83},
    "which undertale soul are you": {"pos": 10.98, "impr": 82},
    "soulvirtues": {"clicks": 323, "impr": 760, "ctr": 0.425, "pos": 3.05},
}


def load(d: Path, name: str) -> dict:
    with open(d / f"{name}-final.json", encoding="utf-8") as f:
        return json.load(f)


def strip(url: str) -> str:
    return url.replace(HOST, "") or "/"


def lang_of(path: str) -> str:
    m = re.match(r"^/([a-z]{2})/", path)
    if m and m.group(1) in LANGS:
        return m.group(1)
    return "en"


def is_excluded(path: str) -> bool:
    if "#" in path or "utm" in path:
        return True
    if EXCLUDE_RE.match(path):
        return True
    return False


def wavg(rows, key="position") -> float:
    imp = sum(r["impressions"] for r in rows)
    if not imp:
        return 0.0
    return sum(r[key] * r["impressions"] for r in rows) / imp


def agg(rows):
    c = sum(r["clicks"] for r in rows)
    i = sum(r["impressions"] for r in rows)
    return {"clicks": c, "impressions": i, "ctr": (c / i if i else 0.0), "pos": wavg(rows), "rows": len(rows)}


def day_range(rows, lo, hi):
    return [r for r in rows if lo.isoformat() <= r["keys"][0] <= hi.isoformat()]


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--data", required=True, help="day60 数据目录")
    ap.add_argument("--out", help="快照输出路径")
    args = ap.parse_args()

    d = Path(args.data)
    prop = load(d, "property")["rows"][0]
    dset = load(d, "date")
    pages = load(d, "page")
    queries = load(d, "query")
    qp = load(d, "query-page")
    countries = load(d, "country")
    dq = load(d, "date-query")

    out: dict = {}
    out["window"] = {"start": W1[0].isoformat(), "end": W2[1].isoformat(), "days": 60}
    out["property"] = {
        "clicks": prop["clicks"],
        "impressions": prop["impressions"],
        "ctr": prop["ctr"],
        "position": prop["position"],
    }

    # ---------- 交叉校验 ----------
    checks = {}
    for name, ds in (("date", dset), ("country", countries), ("page", pages), ("query", queries), ("query,page", qp)):
        a = agg(ds["rows"])
        checks[name] = {
            "rows": ds["rowCount"],
            "clicks": a["clicks"],
            "impressions": a["impressions"],
            "click_delta_vs_property": a["clicks"] - prop["clicks"],
        }
    out["cross_check"] = checks
    out["query_coverage"] = {"clicks": sum(r["clicks"] for r in queries["rows"]) / prop["clicks"],
                             "impressions": sum(r["impressions"] for r in queries["rows"]) / prop["impressions"]}

    # ---------- 两个 30 天窗口 ----------
    w1 = day_range(dset["rows"], *W1)
    w2 = day_range(dset["rows"], *W2)
    out["window_split"] = {"w1": agg(w1) | {"rows": len(w1)}, "w2": agg(w2) | {"rows": len(w2)}}
    out["window_split"]["w1"].pop("rows", None)
    out["window_split"]["w2"].pop("rows", None)

    # ---------- 周趋势 ----------
    weeks = []
    cur = W1[0]
    while cur <= W2[1]:
        end = min(cur + timedelta(days=6), W2[1])
        rows = day_range(dset["rows"], cur, end)
        a = agg(rows)
        weeks.append({"start": cur.isoformat(), "end": end.isoformat(), **{k: a[k] for k in ("clicks", "impressions", "ctr", "pos")}})
        cur = end + timedelta(days=1)
    out["weekly"] = weeks

    # ---------- 语言拆分（page 维度，剔除法律页/锚点/utm） ----------
    dp = load(d, "date-page")
    content_pages = [r for r in pages["rows"] if not is_excluded(strip(r["keys"][0]))]
    lang_now = defaultdict(list)
    for r in content_pages:
        lang_now[lang_of(strip(r["keys"][0]))].append(r)

    tot_c = sum(r["clicks"] for r in content_pages)
    tot_i = sum(r["impressions"] for r in content_pages)
    lang_out = {}
    for lk in ("es", "en", "pt", "ja", "ru"):
        rows = lang_now.get(lk, [])
        a = agg(rows)
        lang_out[lk] = {
            "label": LANG_LABEL[lk],
            "clicks": a["clicks"],
            "click_share": a["clicks"] / tot_c if tot_c else 0,
            "impressions": a["impressions"],
            "impression_share": a["impressions"] / tot_i if tot_i else 0,
            "ctr": a["ctr"],
            "pos": a["pos"],
            "urls": len(rows),
            "efficiency": (a["clicks"] / tot_c) / (a["impressions"] / tot_i) if tot_i and a["impressions"] else 0,
        }
    out["language_60d"] = {"total": {"clicks": tot_c, "impressions": tot_i}, "by_lang": lang_out}

    # 分窗口语言对比（date,page 维度）
    lang_win = {}
    for label, (lo, hi) in (("w1", W1), ("w2", W2)):
        rows = [r for r in dp["rows"] if lo.isoformat() <= r["keys"][0] <= hi.isoformat()]
        rows = [r for r in rows if not is_excluded(strip(r["keys"][1]))]
        bucket = defaultdict(list)
        for r in rows:
            bucket[lang_of(strip(r["keys"][1]))].append(r)
        tc = sum(r["clicks"] for r in rows)
        lang_win[label] = {
            lk: {"clicks": sum(r["clicks"] for r in bucket[lk]), "impressions": sum(r["impressions"] for r in bucket[lk]),
                 "share": (sum(r["clicks"] for r in bucket[lk]) / tc if tc else 0)}
            for lk in ("es", "en", "pt", "ja", "ru")
        }
        lang_win[label]["_total_clicks"] = tc
    out["language_windows"] = lang_win

    # ---------- 关键词 ----------
    qrows = queries["rows"]
    QMAX = 5000

    def find_query(term: str):
        return next((r for r in qrows if r["keys"][0].strip().lower() == term), None)

    tracked = {}
    for term in ("soul virtues extractor", "soulvirtues", "undertale souls quiz", "what undertale soul are you",
                 "which undertale soul are you", "test de alma de undertale", "que alma de undertale eres",
                 "test alma undertale", "undertale test", "soul virtudes extractor", "integridad undertale"):
        r = find_query(term)
        tracked[term] = ({"clicks": r["clicks"], "impressions": r["impressions"], "ctr": r["ctr"],
                          "pos": r["position"]} if r else {"clicks": 0, "impressions": 0, "ctr": 0.0, "pos": None})
    out["tracked_queries"] = tracked

    # 重点词分窗口对比（含曝光加权排名，避免 60 天合并掩盖拐点）
    dq_by_q = defaultdict(lambda: {"w1": [], "w2": []})
    for r in dq["rows"]:
        day, q = r["keys"]
        if W1[0].isoformat() <= day <= W1[1].isoformat():
            dq_by_q[q]["w1"].append(r)
        elif W2[0].isoformat() <= day <= W2[1].isoformat():
            dq_by_q[q]["w2"].append(r)

    def side(rows):
        if not rows:
            return {"clicks": 0, "impressions": 0, "ctr": 0.0, "pos": None}
        return agg(rows)

    tracked_win = {}
    for term in tracked:
        tracked_win[term] = {"w1": side(dq_by_q[term]["w1"]), "w2": side(dq_by_q[term]["w2"])}
    out["tracked_queries_windows"] = tracked_win

    # 品牌词簇 / 非品牌词簇
    brand_re = re.compile(r"soul\s*virtues|soulvirtues|soul\s*virtud|alma\s+de\s+undertale\s+test", re.I)
    brand = [r for r in qrows if brand_re.search(r["keys"][0])]
    nonbrand = [r for r in qrows if not brand_re.search(r["keys"][0])]
    out["clusters"] = {"brand": agg(brand) | {"rows": len(brand)}, "nonbrand": agg(nonbrand) | {"rows": len(nonbrand)}}
    for k in ("brand", "nonbrand"):
        out["clusters"][k].pop("rows", None)
        out["clusters"][k]["count"] = len(brand) if k == "brand" else len(nonbrand)

    out["top_queries"] = [
        {"query": r["keys"][0], "clicks": r["clicks"], "impressions": r["impressions"],
         "ctr": r["ctr"], "pos": r["position"]}
        for r in sorted(qrows, key=lambda x: -x["clicks"])[:25]
    ]

    # ---------- 国家 ----------
    out["top_countries"] = [
        {"country": r["keys"][0], "clicks": r["clicks"], "impressions": r["impressions"], "ctr": r["ctr"], "pos": r["position"]}
        for r in sorted(countries["rows"], key=lambda x: -x["clicks"])[:15]
    ]

    # ---------- 无尾斜杠 URL ----------
    no_slash = [r for r in pages["rows"]
                if r["keys"][0].startswith(HOST) and not r["keys"][0].endswith("/")
                and "?" not in r["keys"][0] and "#" not in r["keys"][0]]
    out["no_trailing_slash"] = {
        "urls": len(no_slash),
        "clicks": sum(r["clicks"] for r in no_slash),
        "impressions": sum(r["impressions"] for r in no_slash),
        "detail": [{"url": strip(r["keys"][0]), "clicks": r["clicks"], "impressions": r["impressions"], "pos": r["position"]}
                   for r in sorted(no_slash, key=lambda x: -x["impressions"])],
    }
    # 分窗口：确认残留曝光是否已归零
    ns_paths = {strip(r["keys"][0]) for r in no_slash}
    ns_win = {"w1": {"clicks": 0, "impressions": 0}, "w2": {"clicks": 0, "impressions": 0}}
    for r in dp["rows"]:
        path = strip(r["keys"][1])
        if path not in ns_paths:
            continue
        bucket = "w1" if r["keys"][0] <= W1[1].isoformat() else "w2"
        ns_win[bucket]["clicks"] += r["clicks"]
        ns_win[bucket]["impressions"] += r["impressions"]
    out["no_trailing_slash"]["by_window"] = ns_win

    # ---------- /es/ 子页明细 ----------
    es_pages = [r for r in pages["rows"] if strip(r["keys"][0]).startswith("/es/")]
    out["es_subpages"] = {
        "souls": [{"url": strip(r["keys"][0]), "clicks": r["clicks"], "impressions": r["impressions"],
                   "ctr": r["ctr"], "pos": r["position"]}
                  for r in sorted(es_pages, key=lambda x: -x["clicks"]) if "/es/souls/" in r["keys"][0]],
        "compare": [{"url": strip(r["keys"][0]), "clicks": r["clicks"], "impressions": r["impressions"],
                     "ctr": r["ctr"], "pos": r["position"]}
                    for r in sorted(es_pages, key=lambda x: -x["clicks"]) if "/es/compare/" in r["keys"][0]],
    }

    # ---------- 多 URL 覆盖同一查询（蚕食候选） ----------
    by_q = defaultdict(list)
    for r in qp["rows"]:
        q, p = r["keys"]
        if is_excluded(strip(p)):
            continue
        by_q[q].append(r)
    cannibal = []
    for q, rows in by_q.items():
        if len(rows) < 2:
            continue
        rows = sorted(rows, key=lambda x: -x["impressions"])
        c = sum(r["clicks"] for r in rows)
        i = sum(r["impressions"] for r in rows)
        cannibal.append({
            "query": q, "urls": len(rows), "clicks": c, "impressions": i,
            "pages": [{"url": strip(r["keys"][1]), "clicks": r["clicks"], "impressions": r["impressions"],
                       "pos": round(r["position"], 2)} for r in rows],
        })
    cannibal.sort(key=lambda x: (-x["urls"], -x["impressions"]))
    # 只保留「每个 URL 都有 ≥50 曝光」的簇，过滤掉附带的零点击顺带展示
    meaningful = [c for c in cannibal if sum(1 for p in c["pages"] if p["impressions"] >= 50) >= 2]
    out["cannibal"] = {"count": len(cannibal), "items": cannibal[:20], "meaningful": meaningful[:20],
                       "meaningful_count": len(meaningful)}
    out["cannibal_summary"] = {
        "queries_multi_url": len(cannibal),
        "by_url_count": {str(n): sum(1 for c in cannibal if c["urls"] == n) for n in sorted({c["urls"] for c in cannibal})},
        "normalized_top": cannibal[:12],
    }

    # ---------- 每日尖峰（date 维度） ----------
    daily = sorted(dset["rows"], key=lambda r: r["keys"][0])
    med = sorted(r["clicks"] for r in daily)[len(daily) // 2]
    out["daily"] = {"rows": len(daily), "median_clicks": med,
                    "peaks": [{"date": r["keys"][0], "clicks": r["clicks"], "impressions": r["impressions"],
                               "pos": round(r["position"], 2)} for r in daily if r["clicks"] > 1.6 * med],
                    "lows": [{"date": r["keys"][0], "clicks": r["clicks"], "impressions": r["impressions"]}
                             for r in daily if r["clicks"] < 0.5 * med]}

    # 尖峰日的查询构成
    peak_days = [p["date"] for p in sorted(out["daily"]["peaks"], key=lambda x: -x["clicks"])[:3]]
    out["peak_composition"] = {}
    for day in peak_days:
        rows = [r for r in dq["rows"] if r["keys"][0] == day]
        rows.sort(key=lambda x: -x["clicks"])
        out["peak_composition"][day] = [{"query": r["keys"][1], "clicks": r["clicks"], "impressions": r["impressions"],
                                         "pos": round(r["position"], 2)} for r in rows[:8]]

    out["baseline_day30"] = DAY30_BASELINE
    out["baseline_day30_tracked"] = DAY30_TRACKED

    text = json.dumps(out, ensure_ascii=False, indent=2)
    if args.out:
        Path(args.out).write_text(text, encoding="utf-8")
        print(f"written: {args.out}")
    else:
        print(text)


if __name__ == "__main__":
    main()
