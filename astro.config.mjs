// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://cebien.cl',
  trailingSlash: 'ignore',
  integrations: [sitemap()],
  build: {
    // cPanel sirve /servicios/index.html en /servicios sin redirecciones raras
    format: 'directory',
    // CSS embebido en cada HTML: evita el parpadeo sin estilos (FOUC) al navegar
    inlineStylesheets: 'always',
  },
});
