# workers
- 用途：付款报告的浏览器之外后台生成。
- 关键入口：report-jobs/index.ts。
- 边界：队列仅传报告ID、语言与环境，不传答案或支付资料。
> 更新本目录时同步 README
## Files
- report-jobs/：Cloudflare 原生 Queue consumer。
