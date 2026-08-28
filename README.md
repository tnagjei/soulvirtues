# Soul Virtues Extractor (soulvirtues.org)

- 用途：围绕“Soul Virtues Extractor”核心词及 Undertale/Deltarune 灵魂测验搜索需求构建的高性能 5 语种多语言静态工具站
- 关键入口：src/pages/index.astro, src/pages/ja/index.astro, src/pages/es/index.astro, src/pages/pt/index.astro, src/pages/ru/index.astro, src/components/Quiz.astro, src/i18n/index.ts
- 边界/依赖：Node.js, Astro 5, Tailwind CSS 4, Cloudflare Pages 部署

## 项目简介
本项目基于 66 题李克特量表测评体系，计算用户在七种灵魂美德（Determination 决心、Bravery 勇气、Justice 正义、Kindness 善良、Patience 耐心、Integrity 正直、Perseverance 毅力）上的连续百分比分布，支持英语、日语、西班牙语、葡萄牙语、俄语 5 种语言版本，并提供纯前端 Canvas 高清分享海报生成功能。

## 多语言支持
- 英文（默认）：`/ (https://soulvirtues.org/)`
- 日文（Undertale 官方术语对齐）：`/ja/ (https://soulvirtues.org/ja/)`
- 西文（Undertale 西语术语对齐）：`/es/ (https://soulvirtues.org/es/)`
- 葡文（Undertale 巴西社区术语对齐）：`/pt/ (https://soulvirtues.org/pt/)`
- 俄文（Undertale 俄语社区术语对齐）：`/ru/ (https://soulvirtues.org/ru/)`
- 对比页：6组已审核双特质组合，共30个五语言页面。
- SEO 关联：5 个语种版本具备自动 `hreflang` 互相指向与 `x-default`，共 74 个可索引页面，另有独立 404 页面。

## 运行与构建命令
- 本地开发：`npm run dev`
- 生产构建：`npm run build`
- 本地预览：`npm run preview`

## 部署说明 (Cloudflare Pages)
- 构建命令 (Build Command)：`npm run build`
- 构建输出目录 (Build output directory)：`dist`
- 生产域名：`https://soulvirtues.org`
