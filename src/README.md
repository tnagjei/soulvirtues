# src
- 用途：Soul Virtues Extractor 核心源代码目录，包含页面、组件、国际化、数据与样式
- 关键入口：src/pages/index.astro, src/pages/ja/index.astro, src/components/Quiz.astro
- 边界/依赖：依赖 Astro, Tailwind CSS, TypeScript
> 一旦本目录内容变化，请更新本文件

## Files
- components/：UI 交互与展示组件目录（Header, Footer, Quiz, SoulCard, FAQ, SoulDetailPage, SoulsHubPage, SoulComparisonPage, LangDetector）
- data/：66 道英文基底题库、七维美德算法数据源、七灵魂详情与 /souls/ 汇总页多语言文案
- i18n/：多语言字典体系（en, ja, es, pt, ru）、类型定义与路由辅助
- layouts/：页面外层 HTML 与 SEO Shell 骨架（含 hreflang 支持）
- pages/：静态路由页面（en 根路由 + ja/es/pt/ru 四语言子路由，含 /souls/ 与 /souls/[trait]/）
- styles/：全局 Tailwind CSS 与像素字体样式定义

