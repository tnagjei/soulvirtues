# report-jobs
- 用途：消费已付款报告任务，有限重试与失败状态。
- 关键入口：index.ts，wrangler.jsonc。
- 边界：AI_JOB_TOKEN 保存为 Worker Secret；DeepSeek key 只在正式 Pages。
> 更新队列或接口时同步 README
## Files
- index.ts：调用受内部认证保护的 /api/process-ai；按服务器 nextAttemptAt 延后重投，成功或终止后确认；允许忙碌任务再次投递，实际模型调用次数由数据库限制。
- wrangler.jsonc：正式/测试/失败三队列消费者；不含密钥。
