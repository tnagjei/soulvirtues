# Payment helpers
- 用途：Waffo 签名与私有报告权限。
- 关键入口：waffo.ts、reports.ts。
- 边界：仅 Pages Functions 使用；凭证只能来自 Cloudflare 环境。
> 更新本目录实现时同步本说明与付款回归。

## Files
- 支付环境由服务器 WAFFO_MODE 决定；正式站与独立测试域名严格匹配，不能用浏览器参数切换环境。
- waffo.ts：有界 API 请求、RSA 签名及回调验签。
- reports.ts：报告快照、D1 存储、访问凭证和订单核验。
- ai.ts：66题输入、显式同意、原生队列投递、余额预检、真实模型验证和按订单/语言缓存。
