# report-jobs
- 用途：消费已付款报告任务，有限重试与失败状态。
- 关键入口：index.ts，wrangler.jsonc。
- 边界：AI_JOB_TOKEN 保存为 Worker Secret；DeepSeek key 只在正式 Pages。
> 更新队列或接口时同步 README
## Files
- index.ts：调用受内部认证保护的 /api/process-ai；失败重试，成功确认；死信任务记录最终失败。
- wrangler.jsonc：正式/测试/失败三队列消费者；不含密钥。
