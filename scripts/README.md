# scripts
- 用途：数据、算法、SEO 产物与外部提交验证脚本目录
- 关键入口：scripts/verify_scoring.cjs, scripts/check_comparison_sample.mjs, scripts/submit_indexnow.mjs
- 边界/依赖：Node.js 原生运行环境
> 一旦本目录内容变化，请更新本文件

## Files
- verify_scoring.cjs：验证非线性计分算法与归一化正确性
- check_comparison_sample.mjs：验证6组共30个五语言对比页、SEO 标签、证据边界、站点地图与内链
- check_lang_prompt_mobile.mjs：验证语言提示窗的手机安全区域、触控尺寸、焦点状态与最大占屏高度
- check_quiz_answer_feedback.mjs：验证手机点击答案后先显示选中反馈，再进入下一题
- check_card_download_ios.mjs：验证移动端尤其是 iOS 下结果卡片下载兼容性（Web Share API、卡片预览弹窗与五语言提示）
- submit_indexnow.mjs：自动扫描站点全部路由并向 Bing/IndexNow 提交即时收录通知
- fetch_clarity_data.mjs：读取环境变量或 macOS 钥匙串中的 Clarity API 密钥，拉取最近 1-3 天的整体、页面、页面×设备与页面×来源数据
- audit_site_seo.mjs：验证 74 个可索引页面、独立 404、sitemap 路由一致性及综合 SEO 技术指标
- seo_day15_review.mjs：上线第 15 天拉取 GSC 定稿数据、运行 crawl 与 index-coverage，并执行连续 3 天展示门禁；额度耗尽时保留 7 天重试
- seo_day30_review.mjs：上线第 30 天运行 quick-wins 与 second-page，生成 Title、Meta、H2 人工复核建议；额度耗尽时保留 7 天重试
- seo_weekly_watch.mjs：上线第 60 天后每周运行 technical-watch 与 decaying-pages，生成周报
