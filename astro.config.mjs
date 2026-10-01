import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://mahmoud-fawzy.com',
  output: 'static',
  trailingSlash: 'always',
  integrations: [sitemap({ filter: (page) => !page.endsWith('/404/') })],
  build: { format: 'directory' },
  server: { host: '127.0.0.1', port: 5173 },
  vite: { server: { watch: { usePolling: true, interval: 500 } } },
});
