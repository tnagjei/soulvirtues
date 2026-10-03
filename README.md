# Soul Virtues Extractor (soulvirtues.org)

- 用途：围绕“Soul Virtues Extractor”核心词及 Undertale/Deltarune 灵魂测验搜索需求构建的高性能 5 语种多语言静态工具站
- 关键入口：src/pages/index.astro, src/pages/ja/index.astro, src/pages/es/index.astro, src/pages/pt/index.astro, src/pages/ru/index.astro, src/pages/es/souls/index.astro, src/components/Quiz.astro, src/components/SoulsHubPage.astro, src/data/soulsHub.ts, src/i18n/index.ts
- 边界/依赖：Node.js, Astro 5, Tailwind CSS 4, Cloudflare Pages 部署

## 项目简介
本项目采用可追溯的 V2 66 题五档自我反思题库（56 题 IPIP 公共领域素材改编＋10 题自行拟定），计算用户在七种灵魂美德（Determination 决心、Bravery 勇气、Justice 正义、Kindness 善良、Patience 耐心、Integrity 正直、Perseverance 毅力）上的独立 0–100 回答刻度（不是人群百分位或已验证心理量表），支持英语、日语、西班牙语、葡萄牙语、俄语 5 种语言版本，并提供纯前端 Canvas 高清分享海报生成功能。

## 评分与结果解释
- 网页与验证共用 src/data/scoring.ts；每题仅对应一维；反向题按6减回答值计分；各维度平均值按100×（均值−1）÷4呈现，去除旧权重与0.6幂曲线。
- 题库版本：2.0-2026-10-02；保存格式以稳定题号和版本校验，五语言共用同浏览器进度，旧题答案不自动迁入。
- 结果区分无明显偏向、缺失、并列与接近；次项需高于中点且无并列才单独显示，百分比不是人群百分位；回答贡献只在浏览器显示。
- Analytics不发送题目、答案、分数、特质结果或建议正文；五个测验首页不加载Clarity，自定义建议走独立反馈入口。
- 单特质和比较页使用可查证社区来源及明确标注的站点反思示例。
- 回归检查：node scripts/verify_scoring.cjs。

## 多语言支持
- 英文（默认）：`/ (https://soulvirtues.org/)`
- 日文（Undertale 官方术语对齐）：`/ja/ (https://soulvirtues.org/ja/)`
- 西文（Undertale 西语术语对齐）：`/es/ (https://soulvirtues.org/es/)`
- 葡文（Undertale 巴西社区术语对齐）：`/pt/ (https://soulvirtues.org/pt/)`
- 俄文（Undertale 俄语社区术语对齐）：`/ru/ (https://soulvirtues.org/ru/)`
- 对比页：6组已审核双特质组合，共30个五语言页面。
- 对比汇总页：/compare/、/ja/compare/、/es/compare/、/pt/compare/、/ru/compare/，共5个页面，列出全部6组对比并附使用说明。
- 七灵魂汇总页：`/souls/`、`/ja/souls/`、`/es/souls/`、`/pt/souls/`、`/ru/souls/`，共5个五语言页面，含七色清单对比表与证据边界说明。
- SEO 关联：5 个语种版本具备自动 `hreflang` 互相指向与 `x-default`，共 89 个可索引页面，另有独立 404 页面。

- 方法页：`/method/` 与四个语言版本；逐题列出官方编号、原文、本站改编与方向，说明公开来源、计算和局限。

## 运行与构建命令
- 本地开发：`npm run dev`
- 生产构建：`npm run build`
- 本地预览：`npm run preview`
- V2回归：`node scripts/verify_scoring.cjs`
- 路由/站点地图核验：`npm run audit:seo`
- 比较与题目渲染核验：`node scripts/check_comparison_sample.mjs`、`node scripts/check_quiz_question_loading.mjs`
- SEO Day 15 门禁：`node scripts/seo_day15_review.mjs`（由 LaunchAgent 于 2026-09-01 09:00 运行；额度耗尽时保留 7 天重试窗口）
- SEO Day 30 机会报告：`node scripts/seo_day30_review.mjs`（由 LaunchAgent 于 2026-09-16 09:00 运行；额度耗尽时保留 7 天重试窗口）
- SEO 每周巡检：`node scripts/seo_weekly_watch.mjs`（上线第 60 天后每周一 09:00 运行）

## 部署说明 (Cloudflare Pages)
- 构建命令 (Build Command)：`npm run build`
- 构建输出目录 (Build output directory)：`dist`
- 生产域名：`https://soulvirtues.org`
