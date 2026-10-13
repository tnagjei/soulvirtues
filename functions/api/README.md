# api
- 用途：Waffo 生产结账、付款回调与已购报告交付接口。
- 关键入口：waffo-webhook.ts、report.ts、create-checkout.ts、generate-report.ts。
- 边界：使用 Cloudflare Secrets 与 D1；本地 Astro 静态预览不执行 Functions；结账与交付仅接受 soulvirtues.org 同源请求。
> 接口变化时更新此文件

## Files
- waffo-webhook.ts：接收 Waffo 付款通知，用公钥验签后写入订单状态，按事件 ID 去重，拒绝伪造与重放。
- report.ts：凭私有访问令牌返回订单真实状态与已购报告快照；已付款订单不依赖支付服务在线，报告未就绪时返回 202 等待，拒付或取消返回 403。
- create-checkout.ts：以签名私钥创建生产结账会话；私钥缺失返回 503；校验返回链接必须为 https 白名单域名且非测试模式链接，否则拒绝收款。
- generate-report.ts：校验私有报告凭证与已购权限，用服务器保存的分数请求 AI 并按订单/语言缓存；AI 不可用时返回明确标记的预编写指导。

## 付款校验边界
返回 /success/ 不构成付款证明。购买权限以 D1 中的订单状态为准，由 Waffo 签名查询或验签回调更新。客户端无法伪造订单；报告在线有效期为已付款后 30 天，退款后不可再交付。

## 密钥
Cloudflare 密钥：DEEPSEEK_API_KEY、WAFFO_PRIVATE_KEY。公钥 WAFFO_WEBHOOK_PUBLIC_KEY 可入库（仅用于验签）。测试私钥曾进入 Git 历史，需在 Waffo 撤销并换新；仅删除当前源码不能消除泄露。新私钥保存到 Cloudflare，不放入 Git 或聊天。
