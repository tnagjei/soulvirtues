# i18n
- 用途：管理全站多语言字典与国际化路由辅助函数
- 关键入口：src/i18n/index.ts
- 边界/依赖：依赖 src/data/souls.ts 与 src/data/questions.ts
> 一旦本目录内容变化，请更新本文件

## Files
- types.ts：多语言字典结构与移动端答题提示接口定义
- en.ts：英文全量字典实现
- ja.ts：对齐 Undertale 官方译名的日文全量字典实现
- es.ts：对齐 Undertale 西语官方/社区译名的西文全量字典实现
- pt.ts：对齐 Undertale 巴西葡语社区译名的葡文全量字典实现
- ru.ts：对齐 Undertale 俄语社区译名的俄文全量字典实现
- index.ts：4语种列表、字典检索与路径转换辅助入口
- README.md：目录说明文档
