# components
- 用途：前端视图与交互组件库，支持多语言适配与智能语言推荐
- 关键入口：Quiz.astro, LangDetector.astro
- 边界/依赖：依赖 src/data 与 src/i18n 中的多语言题目与算法数据
> 一旦本目录内容变化，请更新本文件

## Files
- Header.astro：全站顶部粘性导航栏，含 LOGO、平滑锚点跳转与测验直接唤醒、同页面5语言切换与移动端菜单
- Footer.astro：全站底部版权、外链、免责声明、5 语言切换与本地化灵魂导航、Cloudflare 邮箱改写保护、MakeThisBetter 反馈链接，以及 FrogDR、ToolRain、AIBlog.Tools、SaaSFame、ConfettiSaaS、DANG、ScrollLaunch、DevTool.io、Launchtory 友链
- Quiz.astro：66 题多语言交互式答题组件，含题目即时与服务端预渲染、安全音频调度保护、移动端答案反馈与选项文本触控推进、音频设置、1080×1350 Canvas 分享卡、GA4 分享与完成事件、独立下载、复制链接、iOS 保存弹窗、答案回顾、七灵魂图鉴，以及结果页下阶段功能需求投票（含一键投票与自定义输入）
- SoulCard.astro：七种灵魂特质单卡展示组件
- SoulDetailPage.astro：七大单特质响应式 SEO 落地页组件，含本地化灵魂术语、同人解释标签、专属装备、战斗机制与测验回流 CTA；面包屑「Rasgos de Alma」与底部入口均指向 /souls/ 汇总页
- SoulsHubPage.astro：七大灵魂汇总页组件（/souls/ 及四种语言子路由），含七色清单对比表、特质卡片、人类灵魂与战斗模式辨析、最强灵魂辨析、FAQ 与证据边界说明，输出 BreadcrumbList + CollectionPage + ItemList + FAQPage 结构化数据
- SoulComparisonPage.astro：6组双特质共用页面组件，分离游戏事实与站点解释并提供测试回流
- FAQ.astro：可折叠常见问题解答组件，包含非官方、准确性和红色灵魂设定边界
- LangDetector.astro：手机安全区域内的语言推荐提示组件，依据浏览器语言提示切换，提供 44px 触控按钮并支持 30 天免打扰
