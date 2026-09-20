# gsc
- 用途：保存 Google Search Console 与 SEO CLI 生成的审核报告
- 关键入口：p0-brand-query-investigation-2026-09-20.md、day30-monthly-review-2026-09-20.md、gsc-page-indexing-execution-plan-2026-09-07.md、day15-review.md、day30-review.md、weekly/
- 边界/依赖：不保存 OAuth 凭据；原始数据位于被 Git 忽略的 seo-input/gsc-api/
> 一旦本目录内容变化，请更新本文件

## Files
- gsc-page-indexing-execution-plan-2026-09-07.md：网页索引异常证据、完整网址队列与条件化执行计划
- day15-review.md：上线第 15 天索引与连续展示门禁报告
- day30-review.md：上线第 30 天 quick-wins 与 second-page 建议报告（LaunchAgent 自动，2026-09-16）
- day30-monthly-review-2026-09-20.md：上线第 30 天 GSC 全量定稿数据月度复盘（2026-08-18~09-16，含多语言贡献占比、增长驱动力、$seo 诊断与反证核验）
- p0-brand-query-investigation-2026-09-20.md：P0 结案报告。用 GoAnyAPI 实时 SERP 定位英文「品牌词」异常根因，附竞争者地图与策略修正
- p1-spanish-growth-plan-2026-09-20.md：西语增长详细计划（4 个动作 + 执行顺序 + 30 天验收指标），含 `/es/souls/` 汇总页缺失这一结构性发现
- souls-path-404-investigation-2026-09-20.md：`/souls/` 404 成因调查。结论：从未被故意设置成 404，也从未创建过该页面；线上 404 仅因未部署
- weekly/：上线第 60 天后的每周巡检报告
- launchd/：LaunchAgent 标准输出与错误日志
