# styles
- 用途：全局样式表、像素字体定义与 Tailwind CSS 主题配置
- 关键入口：global.css
- 边界/依赖：依赖 @tailwindcss/vite
> 一旦本目录内容变化，请更新本文件

## Files
- global.css：Tailwind 导入、七灵魂色与像素字体主题变量（--font-mono 已覆盖为像素字体）、.pixel-box/.pixel-card/.pixel-card-sub 像素边框体系、打字机与像素滑杆样式、#bg-video 背景视频
- fonts.css：3 款内嵌 base64 像素字体（Determination Mono / Determination Sans / Skeleton Sans），由 global.css 引入
