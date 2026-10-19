# report-jobs
- 用途：消费已付款报告任务，有限重试与失败状态。
- 关键入口：index.ts，wrangler.jsonc。
- 边界：AI_JOB_TOKEN 保存为 Worker Secret；DeepSeek key 只在正式 Pages。
> 更新队列或接口时同步 README
## Files
- index.ts：调用受内部认证保护的 /api/process-ai；按服务器 nextAttemptAt 延后重投，成功或终止后确认；允许忙碌任务再次投递，实际模型调用次数由数据库限制。
- wrangler.jsonc：正式/测试/失败三队列消费者；不含密钥。

- 每5分钟调用正式/测试各自的reconcile-reports；测试只处理AI_TEST_REPORT_ID。email.ts只在报告ready后发领取链接，MAIL_LINK_KEY生成独立凭证，原链接不失效；REPORT_EMAIL_ENABLED=0时关闭发送。发送结果不明标uncertain，人工核查后才可重发。
