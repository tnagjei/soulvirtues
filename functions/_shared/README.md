# Payment helpers
- 用途：Waffo 签名与私有报告权限。
- 关键入口：waffo.ts、reports.ts。
- 边界：仅 Pages Functions 使用；凭证只能来自 Cloudflare 环境。
> 更新本目录实现时同步本说明与付款回归。

## Files
- waffo.ts：有界 API 请求、RSA 签名及回调验签。
- reports.ts：报告快照、D1 存储、访问凭证和订单核验。
