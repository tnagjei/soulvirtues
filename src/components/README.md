# components
- 用途：前端视图与交互组件库，支持多语言适配与智能语言推荐
- 关键入口：Quiz.astro, LangDetector.astro
- 边界/依赖：依赖 src/data 与 src/i18n 中的多语言题目与算法数据
> 一旦本目录内容变化，请更新本文件

## Files
- Header.astro：全站顶部粘性导航栏，含 LOGO、平滑锚点跳转与测验直接唤醒、同页面5语言切换与移动端菜单；桌面语言下拉支持 hover、点击/触屏点按与键盘（Enter/Space/方向键/Escape），配 aria-expanded 与 inert 保证收起时既不遮挡也不占 Tab 序
- Footer.astro：全站底部版权、外链、免责声明、5 语言切换与本地化灵魂及对比汇总页导航、Cloudflare 邮箱改写保护、MakeThisBetter 反馈链接，以及 FrogDR、ToolRain、AIBlog.Tools、SaaSFame、ConfettiSaaS、DANG、ScrollLaunch、DevTool.io、Launchtory 友链
- MethodPage.astro：五语言方法页、56条官方来源与10条自拟项、复用真实评分函数的公开合成示例、版本与局限说明
- Quiz.astro：免费七分数/依据/PNG/回顾先于可选购买，复用价格字典及五语言购买授权和状态文案；V2题号/版本进度共用、旧题提示和真实保存错误提醒；共享计分、中立与并列解释、同语义分享卡、起始屏触控与主按钮视觉引导强化、首页不加载Clarity并保留遮罩防御、最小化统计与独立建议入口；66 题多语言交互式答题组件，含题目即时与服务端预渲染、安全音频调度保护、移动端答案反馈与选项文本触控推进、音频设置、1080×1350 Canvas 分享卡、GA4 分享与完成事件、独立下载、复制链接、iOS 保存弹窗、答案回顾、七灵魂图鉴，以及结果页下阶段功能需求投票（含一键投票与自定义输入）；intro 打字机屏新增显式「继续」大按钮（#btn-intro-continue，五语种 introTapHint 文案），一键跳到起始屏，修 FB-30「触屏用户卡在介绍屏、开始按钮不可见」；结果徽章 #result-badge 由死链 <div> 改为原生 <button>，点击平滑滚动到首屏下方的资料摘要区 #result-summary（评分说明+答案证据+七美德 breakdown）并高亮 1.2 秒，修 FB-31「PROFILE SUMMARY 点不动」
- SoulCard.astro：七种灵魂特质单卡展示组件
- SoulDetailPage.astro：带核查来源、本特质题目/计分方向、五语言记录练习与独立反思示例的七大单特质响应式 SEO 落地页组件，含本地化灵魂术语、同人解释标签、专属装备、战斗机制与测验回流 CTA；面包屑与底部入口均指向对应语言的 /souls/
- SoulsHubPage.astro：七大灵魂汇总页组件（/souls/ 及四种语言子路由），含七色清单对比表、特质卡片、人类灵魂与战斗模式辨析、最强灵魂辨析、FAQ 与证据边界说明，输出 BreadcrumbList + CollectionPage + ItemList + FAQPage 结构化数据
- SoulComparisonPage.astro：带来源链接与两侧实用反思示例的6组双特质共用页面组件，含返回本地化对比汇总页、两侧特质详情和测试入口的链接，分离游戏事实与站点解释
- CompareHubPage.astro：6组对比汇总页组件（/compare/ 及四种语言子路由），含快速答案卡片、使用说明与测试回流 CTA，输出 BreadcrumbList + CollectionPage + ItemList 结构化数据
- FAQ.astro：可折叠常见问题解答组件，包含非官方、准确性和红色灵魂设定边界
- LangDetector.astro：手机安全区域内的语言推荐提示组件，依据浏览器语言提供“切换到对应语言子目录 / 留在当前页”的双选项提示，提供 44px 触控按钮并支持 30 天免打扰
- AdsterraNativeBanner.astro：Adsterra 原生横幅广告位（soulvirtues.org / 31858818），脚本懒加载到视口前 400px 再注入，8 秒无填充自动收起；首页挂在答题区之后，灵魂详情与对比页挂在核心解读之后、参考来源之前，汇总页和短页面由 Layout 挂在页脚前；法律/联系/付款成功页不展示
- AdsterraBanner468x60.astro：Adsterra 468×60 横幅（soulvirtues.org / 31860296），独立 iframe 隔离广告脚本，接近页脚时才加载；仅 640px 以上显示，法律/联系/付款成功页不展示
