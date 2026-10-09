# data
- 用途：测验题库、灵魂维度属性与多维度计分算法
- 关键入口：questions.ts, souls.ts, scoring.ts, soulDetails.ts, soulDetailsI18n.ts, soulDetailsLocalizedContent.ts, soulComparisonSample.ts, soulComparisons.ts, soulsHub.ts, compareHub.ts, indexnow.ts
- 边界/依赖：纯 TypeScript 原生实现，无外部依赖
> 一旦本目录内容变化，请更新本文件

## Files
- fieldGuide.ts：英文/西语个人手册；复用V2题库/计分/定义，输出真实回答依据、情境演练和七日练习；样例仅供开发预览
- reportDelivery.ts：统一真实分数到报告字段的映射、完整响应验证、按结果匹配缓存与覆盖响应正文的请求超时
- contentEvidence.ts：已核验的社区资料链接、事实/解释边界与五语言35条独立反思示例
- quizSession.ts：题库版本、稳定题号保存/恢复与答案值校验；不把旧数组或无效记录算入新题
- assessmentContent.ts：五语言V2定义、实际情境、反思问题、来源方法和FAQ；复用于结果、方法页与详情页；英西语FAQ说明Jaden原版和Deltarune访问边界
- questions.ts：V2 66题五语言文字、56条IPIP官方来源与10条自拟题、稳定题号及每题单一维度
- souls.ts：七种灵魂特质名称、颜色、十六进制色值、代表金句与深度说明
- scoring.ts：网页与验证共用的V2正反向平均分、有效答案校验、中立/缺失/并列/接近结果和本地回答贡献
- soulDetails.ts：七大灵魂特质英文原作证据边界、专属装备、战斗机制、SEO 描述与 deepDive 深读正文
- soulDetailsI18n.ts：日、西、葡、俄多语言灵魂特质设定、证据边界与标签
- soulDetailsLocalizedContent.ts：四种非英语语言的 28 组物品与性格分析完整正文，含各特质 deepDive 深读正文
- soulComparisonSample.ts：决心 vs 毅力样板页五语言对比文案、证据等级与复合特质解释
- soulComparisons.ts：6组已审核双特质组合与新增5组五语言对比文案
- soulsHub.ts：/souls/ 汇总页的五语言页面级文案（TDH、导语、小节正文、FAQ、证据边界说明与导航锚文本）
- compareHub.ts：/compare/ 汇总页的五语言页面级文案（TDH、导语、使用说明与 CTA）
- indexnow.ts：IndexNow 搜索引擎自动索引公钥与 API 端点配置
