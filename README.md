# Soul Virtues Extractor (soulvirtues.org)

- 用途：围绕“Soul Virtues Extractor”核心词及 Undertale/Deltarune 灵魂测验搜索需求构建的高性能静态工具站
- 关键入口：src/pages/index.astro, src/components/Quiz.astro
- 边界/依赖：Node.js, Astro 5, Tailwind CSS 4, Cloudflare Pages 部署

## 项目简介
本项目基于 66 题李克特量表测评体系，计算用户在七种灵魂美德（Determination 决心、Bravery 勇气、Justice 正义、Kindness 善良、Patience 耐心、Integrity 正直、Perseverance 毅力）上的连续百分比分布，并提供纯前端 Canvas 高清分享海报生成功能。

## 运行与构建命令
- 本地开发：`npm run dev`
- 生产构建：`npm run build`
- 本地预览：`npm run preview`

## 部署说明 (Cloudflare Pages)
- 构建命令 (Build Command)：`npm run build`
- 构建输出目录 (Build output directory)：`dist`
- 生产域名：`https://soulvirtues.org`

