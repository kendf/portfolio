import type { APIRoute } from 'astro';

/**
 * Les fiches détaillées et la page d'accès sont privées : elles sont exclues
 * de l'exploration, en plus de leur en-tête `X-Robots-Tag: noindex`.
 */
export const GET: APIRoute = ({ site }) => {
  const corps = [
    'User-agent: *',
    'Allow: /$',
    'Allow: /realisations$',
    'Disallow: /acces',
    'Disallow: /api/',
    'Disallow: /realisations/',
    '',
    `Sitemap: ${new URL('sitemap-index.xml', site).href}`,
    '',
  ].join('\n');

  return new Response(corps, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
