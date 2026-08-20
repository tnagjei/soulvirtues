# components
- 用途：前端视图与交互组件库，支持多语言适配与智能语言推荐
- 关键入口：Quiz.astro, LangDetector.astro
- 边界/依赖：依赖 src/data 与 src/i18n 中的多语言题目与算法数据
> 一旦本目录内容变化，请更新本文件

## Files
- Header.astro：全站顶部粘性导航栏，含 LOGO、导航锚点、同页面4语言切换与移动端菜单
- Footer.astro：全站底部版权、外链、免责声明、4 语言切换链接与 MakeThisBetter 反馈链接
- Quiz.astro：66 题多语言交互式答题组件，含打字机对话框、音频设置、结果展示、答案回顾、七灵魂图鉴与 Canvas 海报生成
- SoulCard.astro：七种灵魂特质单卡展示组件
- SoulDetailPage.astro：七大单特质响应式 SEO 落地页组件，含面包屑、专属装备、战斗机制与测验回流 CTA
- SoulComparisonPage.astro：6组双特质共用页面组件，分离游戏事实与站点解释并提供测试回流
- FAQ.astro：可折叠常见问题解答组件
- LangDetector.astro：右下角悬浮智能语言推荐提示组件，依据浏览器语言无侵入式提示切换并支持 30 天免打扰
