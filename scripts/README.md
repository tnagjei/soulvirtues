# scripts
- 用途：数据与算法验证脚本目录
- 关键入口：scripts/verify_scoring.cjs, scripts/submit_indexnow.mjs
- 边界/依赖：Node.js 原生运行环境
> 一旦本目录内容变化，请更新本文件

## Files
- verify_scoring.cjs：验证非线性计分算法与归一化正确性
- submit_indexnow.mjs：自动扫描站点全部路由并向 Bing/IndexNow 提交即时收录通知
