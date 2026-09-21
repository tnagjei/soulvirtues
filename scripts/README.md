# scripts
- 用途：数据、算法、SEO 产物与外部提交验证脚本目录
- 关键入口：scripts/verify_scoring.cjs, scripts/check_comparison_sample.mjs, scripts/submit_indexnow.mjs
- 边界/依赖：Node.js 原生运行环境
> 一旦本目录内容变化，请更新本文件

## Files
- verify_scoring.cjs：验证非线性计分算法与归一化正确性
- check_comparison_sample.mjs：验证6组对比页与5个汇总页共35个五语言路由、SEO 标签、证据边界、站点地图与内链
- check_lang_prompt_mobile.mjs：验证语言提示窗的手机安全区域、触控尺寸、焦点状态与最大占屏高度
- check_quiz_answer_feedback.mjs：验证手机点击答案后先显示选中反馈，再进入下一题
- check_answer_touch_labels.mjs：验证极值与当前选项文本标签具备移动端触控交互并在点击时触发答题推进
- check_card_download_ios.mjs：验证 1080×1350 分享卡、系统分享来源标记、GA4 事件、独立下载、复制链接、iOS 保存弹窗与五语言文案
- check_bgm_audio_control.mjs：验证背景音乐静音/取消静音与音量控制在各端的准确调用
- check_start_test_navigation.mjs：验证顶部导航 Start Test 与所有测验锚点点击时平滑滚动并直接激活答题界面
- check_quiz_question_loading.mjs：验证多语言测验题目文本即时完整加载、无隐藏防断行阻塞、且5语言66题完整无缺失
- submit_indexnow.mjs：自动扫描站点全部路由并向 Bing/IndexNow 提交即时收录通知
- fetch_clarity_data.mjs：读取环境变量或 macOS 钥匙串中的 Clarity API 密钥，拉取最近 1-3 天的整体、页面、页面×设备与页面×来源数据
- audit_site_seo.mjs：验证 84 个可索引页面、独立 404、sitemap 路由一致性及综合 SEO 技术指标
- seo_day15_review.mjs：上线第 15 天拉取 GSC 定稿数据、运行 crawl 与 index-coverage，并执行连续 3 天展示门禁；额度耗尽时保留 7 天重试
- seo_day30_review.mjs：上线第 30 天运行 quick-wins 与 second-page，生成 Title、Meta、H2 人工复核建议；额度耗尽时保留 7 天重试
- seo_weekly_watch.mjs：上线第 60 天后每周运行 technical-watch 与 decaying-pages，生成周报
