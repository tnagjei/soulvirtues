# data
- 用途：测验题库、灵魂维度属性与多维度计分算法
- 关键入口：questions.ts, souls.ts, scoring.ts, soulDetails.ts, soulDetailsI18n.ts, soulComparisonSample.ts, soulComparisons.ts, indexnow.ts
- 边界/依赖：纯 TypeScript 原生实现，无外部依赖
> 一旦本目录内容变化，请更新本文件

## Files
- questions.ts：66 道完整李克特量表题目与各维度原始权重
- souls.ts：七种灵魂特质名称、颜色、十六进制色值、代表金句与深度说明
- scoring.ts：非线性幂律计分算法、最大理论值归一化与百分比计算
- soulDetails.ts：七大灵魂特质英文深度设定、专属装备、战斗机制与 SEO 描述
- soulDetailsI18n.ts：日、西、葡多语言专属本地化灵魂特质设定与标签
- soulComparisonSample.ts：决心 vs 毅力样板页四语言对比文案、证据等级与复合特质解释
- soulComparisons.ts：6组已审核双特质组合与新增5组四语言对比文案
- indexnow.ts：IndexNow 搜索引擎自动索引公钥与 API 端点配置
