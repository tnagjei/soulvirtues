# input: seo-input/gsc-api/day90-final-*/*.json（GSC 定稿导出 + seo CLI 报告 JSON）
# output: 第90天 P0-P3 策略逐项复核 JSON（stdout 或 --out 指定路径）
# pos: 第90天复盘专用计算器（同口径可复算；更新规则：口径变更需同步脚注与报告说明）

"""第 90 天 P0-P3 策略复核计算器。

口径与第 60 天复盘保持一致：
- 语言归属 / 剔除规则 / 曝光加权平均排名：同 scripts/check_gsc_bi_monthly_metrics.py。
- 窗口：W1=2026-08-18~09-16，W2=2026-09-17~10-16，W3=2026-10-17~10-19（3 天残窗）。
- 第 60 天基线硬编码自 reports/gsc/day60-bi-monthly-review-2026-10-19.md，仅作对照。
- HSTS 为线上 curl 实测结果（脚本无法执行网络请求），以常量记录并附复现命令。
"""

from __future__ import annotations

import argparse
import json
import re
from collections import defaultdict
from datetime import date
from pathlib import Path

HOST = "https://soulvirtues.org"
W1 = (date(2026, 8, 18), date(2026, 9, 16))
W2 = (date(2026, 9, 17), date(2026, 10, 16))
W3 = (date(2026, 10, 17), date(2026, 10, 19))
WINDOWS = (("w1", W1), ("w2", W2), ("w3", W3))

ES_SOUL_DETAILS = (
    "/es/souls/kindness/", "/es/souls/integrity/", "/es/souls/justice/",
    "/es/souls/perseverance/", "/es/souls/determination/", "/es/souls/patience/",
    "/es/souls/bravery/",
)
ES_COMPARE_DETAILS = (
    "/es/compare/integrity-vs-justice/", "/es/compare/justice-vs-kindness/",
    "/es/compare/bravery-vs-determination/", "/es/compare/bravery-vs-patience/",
    "/es/compare/determination-vs-perseverance/", "/es/compare/kindness-vs-patience/",
)
URL_QUERY_RE = re.compile(r"soulvirtues\.org|https?://|ссылка", re.I)

# 第 60 天基线（day60-bi-monthly-review-2026-10-19.md，同口径）
DAY60 = {
    "es_souls_detail": {"clicks": 67, "impressions": 10572, "ctr": 0.0063},
    "es_souls_with_summary": {"clicks": 139, "impressions": 20362, "ctr": 0.0068},
    "es_compare": {"clicks": 7, "impressions": 918},
    "undertale_soul_quiz": {"clicks": 63, "impressions": 1408, "ctr": 0.0447, "pos": 10.47},
    "variants_pos": {"undertale souls quiz": 11.35, "what undertale soul are you": 18.47,
                     "which undertale soul are you": 14.42},
    "soulvirtues_w2": {"clicks": 165, "impressions": 498, "ctr": 0.331, "pos": 1.74},
    "soulvirtues_w1": {"clicks": 323, "impressions": 760, "ctr": 0.425, "pos": 3.05},
    "sve_w2": {"clicks": 115, "impressions": 2541},
    "ru_60d_clicks": 372,
    "query_coverage_missing": {"urls": 9, "clicks": 373, "impressions": 3593},
    "title_too_wide_urls": 24,
    "hsts_missing_urls": 89,
}
# HSTS 线上实测（2026-10-22，curl -sI https://soulvirtues.org/ 与 /es/ 均返回该头）
HSTS_CURL = {
    "verified": True,
    "command": "curl -sI https://soulvirtues.org/ | grep -i strict-transport-security",
    "header": "strict-transport-security: max-age=31536000",
}


def load(d: Path, name: str) -> list:
    with open(d / f"{name}-final.json", encoding="utf-8") as f:
        return json.load(f)["rows"]


def strip(url: str) -> str:
    return url.replace(HOST, "") or "/"


def wavg(rows) -> float:
    imp = sum(r["impressions"] for r in rows)
    if not imp:
        return 0.0
    return sum(r["position"] * r["impressions"] for r in rows) / imp


def agg(rows) -> dict:
    c = sum(r["clicks"] for r in rows)
    i = sum(r["impressions"] for r in rows)
    return {"clicks": c, "impressions": i,
            "ctr": (c / i if i else 0.0), "pos": (wavg(rows) if rows else None), "rows": len(rows)}


def window_of(day: str):
    for label, (lo, hi) in WINDOWS:
        if lo.isoformat() <= day <= hi.isoformat():
            return label
    return None


def page_agg(pages: list, paths, prefix_match=False) -> dict:
    """按 URL 路径集合聚合 page 维度行。prefix_match=True 时按前缀匹配（用于 /ru/ 全站）。"""
    sel = []
    for r in pages:
        p = strip(r["keys"][0])
        if prefix_match:
            if any(p.startswith(x) for x in paths):
                sel.append(r)
        elif p in paths:
            sel.append(r)
    return agg(sel)


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--data", required=True, help="day90 数据目录")
    ap.add_argument("--seo-report", help="seo report JSON 路径（技术项明细来源）")
    ap.add_argument("--out", help="输出路径")
    args = ap.parse_args()

    d = Path(args.data)
    pages = load(d, "page")
    queries = load(d, "query")
    qp = load(d, "query-page")
    dp = load(d, "date-page")
    dq = load(d, "date-query")

    out: dict = {"windows": {lbl: {"start": lo.isoformat(), "end": hi.isoformat(),
                                   "days": (hi - lo).days + 1} for lbl, (lo, hi) in WINDOWS},
                 "baseline_day60": DAY60}

    # ---------- (a) P0 西语美德页 ----------
    detail = page_agg(pages, set(ES_SOUL_DETAILS))
    detail_pages = [{"url": strip(r["keys"][0]), **{k: r[k] for k in ("clicks", "impressions", "ctr", "position")}}
                    for r in sorted(pages, key=lambda x: -x["impressions"])
                    if strip(r["keys"][0]) in set(ES_SOUL_DETAILS)]
    with_summary = page_agg(pages, set(ES_SOUL_DETAILS) | {"/es/souls/"})
    # 分窗口（date,page）
    w_detail = {lbl: {"clicks": 0, "impressions": 0} for lbl, _ in WINDOWS}
    for r in dp:
        lbl = window_of(r["keys"][0])
        if lbl and strip(r["keys"][1]) in set(ES_SOUL_DETAILS):
            w_detail[lbl]["clicks"] += r["clicks"]
            w_detail[lbl]["impressions"] += r["impressions"]
    out["p0_es_souls"] = {
        "detail_63d": detail,
        "detail_pages": detail_pages,
        "with_summary_63d": with_summary,
        "by_window": w_detail,
        "acceptance_ctr_1_5pct": detail["ctr"] >= 0.015,
        "acceptance_clicks_160": detail["clicks"] >= 160,
        "baseline_day60": DAY60["es_souls_detail"],
        "baseline_day60_with_summary": DAY60["es_souls_with_summary"],
    }

    # ---------- (b) P1 英语单数词 ----------
    def qstat(term: str) -> dict:
        r = next((x for x in queries if x["keys"][0].strip().lower() == term), None)
        if not r:
            return {"clicks": 0, "impressions": 0, "ctr": 0.0, "pos": None}
        return {"clicks": r["clicks"], "impressions": r["impressions"], "ctr": r["ctr"], "pos": r["position"]}

    def qwindows(term: str) -> dict:
        buckets = {lbl: [] for lbl, _ in WINDOWS}
        for r in dq:
            if r["keys"][1].strip().lower() != term:
                continue
            lbl = window_of(r["keys"][0])
            if lbl:
                buckets[lbl].append(r)
        return {lbl: agg(rows) for lbl, rows in buckets.items()}

    p1_terms = ("undertale soul quiz", "undertale souls quiz",
                "what undertale soul are you", "which undertale soul are you")
    out["p1_english"] = {
        "queries": {t: {"full": qstat(t), "windows": qwindows(t)} for t in p1_terms},
        "baseline_day60": DAY60["undertale_soul_quiz"],
        "baseline_day60_variants_pos": DAY60["variants_pos"],
    }

    # ---------- (c) P2 西语对比页 ----------
    compare6 = page_agg(pages, set(ES_COMPARE_DETAILS))
    compare_all = page_agg(pages, set(ES_COMPARE_DETAILS) | {"/es/compare/"})
    w_cmp = {lbl: {"clicks": 0, "impressions": 0} for lbl, _ in WINDOWS}
    for r in dp:
        lbl = window_of(r["keys"][0])
        p = strip(r["keys"][1])
        if lbl and (p in set(ES_COMPARE_DETAILS) or p == "/es/compare/"):
            w_cmp[lbl]["clicks"] += r["clicks"]
            w_cmp[lbl]["impressions"] += r["impressions"]
    out["p2_es_compare"] = {
        "detail6_63d": compare6,
        "with_summary_63d": compare_all,
        "by_window": w_cmp,
        "stop_loss_threshold": 1500,
        "stop_loss_triggered": compare6["impressions"] < 1500,
        "baseline_day60": DAY60["es_compare"],
    }

    # ---------- (d) P3 技术项 ----------
    tech = {"hsts": HSTS_CURL, "baseline_day60": {"title_too_wide_urls": DAY60["title_too_wide_urls"],
                                                  "hsts_missing_urls": DAY60["hsts_missing_urls"],
                                                  "query_coverage_missing": DAY60["query_coverage_missing"]}}
    if args.seo_report:
        with open(args.seo_report, encoding="utf-8") as f:
            seo = json.load(f)
        acts = seo.get("actions", [])
        for a in acts:
            rid = a.get("id") or ""
            if rid == "crawl:title_too_wide":
                tech["title_too_wide"] = {"urls": a.get("affectedCount"), "sampleUrls": a.get("sampleUrls"),
                                          "evidence": a.get("evidence")}
            elif rid == "crawl:query_coverage_missing":
                tech["query_coverage_missing"] = {"urls": a.get("affectedCount"),
                                                  "sampleUrls": a.get("sampleUrls"),
                                                  "evidence": a.get("evidence")}
            elif rid == "crawl:hsts_missing":
                tech["hsts"]["still_flagged"] = True
        tech["hsts"].setdefault("still_flagged", False)
        tech["seo_report_generatedAt"] = seo.get("generatedAt")
    # query_coverage_missing 的 10 个 URL 在本窗口的点击/曝光（page 维度）
    if args.seo_report and "query_coverage_missing" in tech:
        qc_paths = {strip(u) for u in tech["query_coverage_missing"].get("sampleUrls", [])}
        # sampleUrls 只给前 10 条，本项恰好 10 个 URL
        qc = page_agg(pages, qc_paths)
        tech["query_coverage_missing"]["gsc_63d"] = qc
    out["p3_technical"] = tech

    # ---------- (e) 俄语点击性质 ----------
    ru_rows = [r for r in pages if strip(r["keys"][0]).startswith("/ru/")]
    ru_full = agg(ru_rows)
    ru_win = {lbl: {"clicks": 0, "impressions": 0} for lbl, _ in WINDOWS}
    for r in dp:
        lbl = window_of(r["keys"][0])
        if lbl and strip(r["keys"][1]).startswith("/ru/"):
            ru_win[lbl]["clicks"] += r["clicks"]
            ru_win[lbl]["impressions"] += r["impressions"]
    # /ru/ 页面的可见查询构成（query,page 维度）
    ru_qp = [r for r in qp if strip(r["keys"][1]).startswith("/ru/")]
    nav = [r for r in ru_qp if URL_QUERY_RE.search(r["keys"][0])]
    top_ru_queries = sorted(ru_qp, key=lambda x: -x["clicks"])[:10]
    out["ru_review"] = {
        "full_63d": ru_full,
        "by_window": ru_win,
        "visible_query_rows": len(ru_qp),
        "navigation_clicks": sum(r["clicks"] for r in nav),
        "navigation_click_share": (sum(r["clicks"] for r in nav) / sum(r["clicks"] for r in ru_qp)) if ru_qp else 0,
        "top_queries": [{"query": r["keys"][0], "url": strip(r["keys"][1]), "clicks": r["clicks"],
                         "impressions": r["impressions"], "pos": r["position"]} for r in top_ru_queries],
        "baseline_day60_ru_clicks": DAY60["ru_60d_clicks"],
    }

    # ---------- (f) 品牌词与品类词 ----------
    out["brand_and_category"] = {
        "soulvirtues": {"full": qstat("soulvirtues"), "windows": qwindows("soulvirtues")},
        "soul_virtues_extractor": {"full": qstat("soul virtues extractor"),
                                   "windows": qwindows("soul virtues extractor")},
        "baseline_day60": {"soulvirtues_w2": DAY60["soulvirtues_w2"], "soulvirtues_w1": DAY60["soulvirtues_w1"],
                           "sve_w2": DAY60["sve_w2"]},
    }

    # ---------- (g) 无尾斜杠 URL ----------
    no_slash = [r for r in pages
                if r["keys"][0].startswith(HOST) and not r["keys"][0].endswith("/")
                and "?" not in r["keys"][0] and "#" not in r["keys"][0]]
    ns_paths = {strip(r["keys"][0]) for r in no_slash}
    ns_win = {lbl: {"clicks": 0, "impressions": 0} for lbl, _ in WINDOWS}
    for r in dp:
        lbl = window_of(r["keys"][0])
        if lbl and strip(r["keys"][1]) in ns_paths:
            ns_win[lbl]["clicks"] += r["clicks"]
            ns_win[lbl]["impressions"] += r["impressions"]
    out["no_trailing_slash"] = {
        "urls": len(no_slash),
        "clicks": sum(r["clicks"] for r in no_slash),
        "impressions": sum(r["impressions"] for r in no_slash),
        "by_window": ns_win,
    }

    # ---------- 附：品牌词簇分窗口（宽正则，与 metrics 脚本同口径） ----------
    brand_re = re.compile(r"soul\s*virtues|soulvirtues|soul\s*virtud|alma\s+de\s+undertale\s+test", re.I)
    bw = {lbl: {"brand": [0, 0], "nonbrand": [0, 0]} for lbl, _ in WINDOWS}
    for r in dq:
        lbl = window_of(r["keys"][0])
        if not lbl:
            continue
        key = "brand" if brand_re.search(r["keys"][1]) else "nonbrand"
        bw[lbl][key][0] += r["clicks"]
        bw[lbl][key][1] += r["impressions"]
    out["brand_cluster_by_window"] = bw

    # ---------- 附：最后 14 天日线（脉冲后走势） ----------
    daily = defaultdict(lambda: [0, 0])
    for r in dp:
        daily[r["keys"][0]][0] += r["clicks"]
        daily[r["keys"][0]][1] += r["impressions"]
    last14 = sorted(daily.items())[-14:]
    out["daily_last14"] = [{"date": k, "clicks": v[0], "impressions": v[1]} for k, v in last14]

    text = json.dumps(out, ensure_ascii=False, indent=2)
    if args.out:
        Path(args.out).write_text(text, encoding="utf-8")
        print(f"written: {args.out}")
    else:
        print(text)


if __name__ == "__main__":
    main()
