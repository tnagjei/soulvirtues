# launchd
- 用途：保存 3 个 LaunchAgent 的标准输出与错误日志
- 关键入口：day15-review.log、day30-review.log、weekly-watch.log
- 边界/依赖：LaunchAgent 注册后由 macOS 写入；日志不是 GSC 数据证明
> 一旦本目录内容变化，请更新本文件

## Files
- day15-review.log、day15-review.err：Day 15 任务日志
- day30-review.log、day30-review.err：Day 30 任务日志
- weekly-watch.log、weekly-watch.err：每周巡检日志
