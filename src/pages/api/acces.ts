import type { APIRoute } from 'astro';
import { ACCES_HASH, ACCES_SECRET } from 'astro:env/server';
import {
  COOKIE_ACCES,
  DUREE_SESSION_MS,
  consommerTentative,
  creerSession,
  libererTentatives,
  nettoyerRedirection,
  verifierMotDePasse,
} from '../../lib/acces';

export const prerender = false;

/** Identifie l'auteur des tentatives, derrière le proxy Vercel. */
function cle(request: Request, clientAddress: string): string {
  const transmis = request.headers.get('x-forwarded-for');
  return transmis?.split(',')[0]?.trim() || clientAddress || 'inconnu';
}

function retour(vers: string, erreur: string): Response {
  return new Response(null, {
    status: 303,
    headers: {
      Location: `/acces?vers=${encodeURIComponent(vers)}&erreur=${erreur}`,
      'Cache-Control': 'no-store',
    },
  });
}

export const POST: APIRoute = async ({ request, cookies, clientAddress }) => {
  const formulaire = await request.formData();
  const vers = nettoyerRedirection(formulaire.get('vers'));
  const motDePasse = formulaire.get('motdepasse');

  if (!ACCES_HASH || !ACCES_SECRET) {
    console.error('ACCES_HASH ou ACCES_SECRET manquant : accès refusé.');
    return retour(vers, 'config');
  }

  if (typeof motDePasse !== 'string' || motDePasse.length === 0) {
    return retour(vers, 'vide');
  }

  const restantes = consommerTentative(cle(request, clientAddress));
  if (restantes === null) return retour(vers, 'trop');

  if (!verifierMotDePasse(motDePasse, ACCES_HASH)) {
    return retour(vers, 'faux');
  }

  libererTentatives(cle(request, clientAddress));

  cookies.set(COOKIE_ACCES, creerSession(ACCES_SECRET), {
    path: '/',
    httpOnly: true,
    secure: import.meta.env.PROD,
    sameSite: 'lax',
    maxAge: DUREE_SESSION_MS / 1000,
  });

  return new Response(null, {
    status: 303,
    headers: { Location: vers, 'Cache-Control': 'no-store' },
  });
};

/** Déconnexion : /api/acces?sortie=1 */
export const GET: APIRoute = async ({ cookies }) => {
  cookies.delete(COOKIE_ACCES, { path: '/' });
  return new Response(null, {
    status: 303,
    headers: { Location: '/realisations', 'Cache-Control': 'no-store' },
  });
};
