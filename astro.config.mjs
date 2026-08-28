// input: Astro build, local server, and five-locale routing settings
// output: Static site configuration for Cloudflare Pages
// pos: astro.config.mjs (更新规则：语言或构建配置变化需同步本注释与根目录 README.md)

import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://soulvirtues.org',
  server: {
    port: 4328,
    host: true,
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ja', 'es', 'pt', 'ru'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
