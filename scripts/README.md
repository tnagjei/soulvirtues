# scripts
- 用途：数据、算法、SEO 产物与外部提交验证脚本目录
- 关键入口：scripts/verify_scoring.cjs, scripts/check_comparison_sample.mjs, scripts/submit_indexnow.mjs
- 边界/依赖：Node.js 原生运行环境
> 一旦本目录内容变化，请更新本文件

## Files
- verify_scoring.cjs：验证非线性计分算法与归一化正确性
- check_comparison_sample.mjs：验证6组共24个对比页、SEO 标签、证据边界、站点地图与内链
- check_lang_prompt_mobile.mjs：验证语言提示窗的手机安全区域、触控尺寸、焦点状态与最大占屏高度
- submit_indexnow.mjs：自动扫描站点全部路由并向 Bing/IndexNow 提交即时收录通知
- fetch_clarity_data.mjs：读取环境变量或 macOS 钥匙串中的 Clarity API 密钥，拉取最近 1-3 天的整体、页面、页面×设备与页面×来源数据
- audit_site_seo.mjs：全站 60 个页面综合 SEO 技术指标自动化审计（元标签、Canonical、Hreflang、H1-H6、内链死链、Schema.org、Alt 文本）
