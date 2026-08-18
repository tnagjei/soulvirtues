# layouts
- 用途：页面外层基础布局结构
- 关键入口：Layout.astro
- 边界/依赖：依赖 components/Header.astro, components/Footer.astro, styles/global.css, Google Analytics CDN, Clarity CDN, MakeThisBetter CDN
> 一旦本目录内容变化，请更新本文件

## Files
- Layout.astro：基础页面骨架，注入 Open Graph、Twitter Card、Canonical、JSON-LD、Google Analytics、Microsoft Clarity 与 MakeThisBetter 反馈小组件
