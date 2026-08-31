// @ts-check
import { defineConfig, envField } from 'astro/config';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://ali-freddy-kouadio.vercel.app',
  output: 'static',
  adapter: vercel(),

  // Secrets serveur. Optionnels au build pour que `npm run build` fonctionne
  // sans .env ; en leur absence l'accès est simplement refusé (fail closed).
  env: {
    schema: {
      ACCES_HASH: envField.string({ context: 'server', access: 'secret', optional: true }),
      ACCES_SECRET: envField.string({ context: 'server', access: 'secret', optional: true }),
    },
  },

  integrations: [
    sitemap({
      // /acces est une page d'authentification ; les fiches détaillées sont
      // rendues à la demande derrière le middleware et n'entrent donc jamais
      // dans le sitemap.
      filter: (page) => !page.includes('/acces'),
    }),
  ],

  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
});
