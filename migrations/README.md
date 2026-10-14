# Report database
- 用途：本网站私有付费报告与付款事件记录。
- 关键入口：0001_paid_reports.sql。
- 边界：仅用于 soulvirtues-reports；不迁移或改动其他项目数据库。
> 修改结构时新增迁移并同步付款检查。

## Files
- 0001_paid_reports.sql：私有报告、付款状态及回调去重表。

- 0002_ai_delivery.sql：逐笔同意、购买语言与持久 AI 任务状态；旧订单默认不发送原始回答。
