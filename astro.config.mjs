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
    locales: ['en', 'ja', 'es', 'pt'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});

