import { defineMiddleware } from 'astro:middleware';
import { ACCES_SECRET } from 'astro:env/server';
import { COOKIE_ACCES, verifierSession } from './lib/acces';

/** Les fiches détaillées : /realisations/<slug>. L'index reste public. */
const CHEMIN_PROTEGE = /^\/realisations\/[^/]+\/?$/;

export const onRequest = defineMiddleware(async (context, next) => {
  const chemin = context.url.pathname;

  if (!CHEMIN_PROTEGE.test(chemin)) return next();

  const ouvert = verifierSession(
    context.cookies.get(COOKIE_ACCES)?.value,
    ACCES_SECRET,
  );

  if (!ouvert) {
    return context.redirect(`/acces?vers=${encodeURIComponent(chemin)}`, 302);
  }

  const reponse = await next();
  // Contenu privé : jamais mis en cache par un intermédiaire, jamais indexé.
  reponse.headers.set('Cache-Control', 'private, no-store');
  reponse.headers.set('X-Robots-Tag', 'noindex, nofollow');
  return reponse;
});
