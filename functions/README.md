# functions
- 用途：Cloudflare Pages 服务端接口，含付款回调与已购报告交付。
- 关键入口：api/waffo-webhook.ts、api/report.ts、_shared/waffo.ts。
- 边界：密钥来自 Cloudflare Secrets（公钥除外），本地数据不随源码发布；订单状态存于 D1。
> 内容变化时更新此文件

## Files
- api/：生产结账、付款回调、报告交付与生成接口。
- _shared/：Waffo 签名验签与报告权限核验的共享模块。
