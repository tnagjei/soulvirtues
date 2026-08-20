# layouts
- 用途：页面外层基础布局结构与 SEO 注入
- 关键入口：Layout.astro
- 边界/依赖：依赖 components/Header.astro, components/Footer.astro, styles/global.css, Google Analytics, Clarity, MakeThisBetter
> 一旦本目录内容变化，请更新本文件

## Files
- Layout.astro：基础页面骨架，注入 hreflang 多语言关联标签、Yandex 验证标签、Open Graph、Canonical、JSON-LD 与延迟加载广告脚本
