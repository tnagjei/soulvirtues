# api
- 用途：Waffo 测试结账和报告生成接口。
- 关键入口：create-checkout.ts、generate-report.ts。
- 边界：使用 Cloudflare Secrets；本地 Astro 静态预览不执行 Functions。
> 接口变化时更新此文件

## Files
- create-checkout.ts：测试环境创建结账会话；必须配置 WAFFO_PRIVATE_KEY；私钥缺失返回503，不使用源码中的默认密钥。
- generate-report.ts：校验完整七项分数，调用 AI 并验证报告结构；AI 不可用时返回明确标记的预编写指导。

## 待完成的付款验证
当前接口尚未用 Waffo 签名通知关联已付款订单与报告生成权限。返回 /success/ 不能作为付款证明。测试环境结账不表示真实收款已启用；生产收费前需要补齐订单核验与交付权限。

## 密钥
Cloudflare 密钥：DEEPSEEK_API_KEY、WAFFO_PRIVATE_KEY。测试私钥曾进入Git历史，需在Waffo撤销并换新；仅删除当前源码不能消除泄露。新私钥保存到Cloudflare，不放入Git或聊天。
