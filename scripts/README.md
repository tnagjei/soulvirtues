# scripts
- 用途：数据、算法、SEO 产物与外部提交验证脚本目录
- 关键入口：scripts/verify_scoring.cjs, scripts/check_comparison_sample.mjs, scripts/submit_indexnow.mjs
- 边界/依赖：Node.js 原生运行环境
> 一旦本目录内容变化，请更新本文件

## Files
- verify_scoring.cjs：验证非线性计分算法与归一化正确性
- check_comparison_sample.mjs：验证6组共24个对比页、SEO 标签、证据边界、站点地图与内链
- submit_indexnow.mjs：自动扫描站点全部路由并向 Bing/IndexNow 提交即时收录通知
