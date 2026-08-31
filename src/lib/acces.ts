/**
 * Garde d'accès de l'espace Réalisations.
 *
 * Le mot de passe n'est jamais stocké : seul un condensat scrypt salé vit dans
 * les variables d'environnement. Une fois vérifié, on pose un cookie de session
 * signé en HMAC-SHA256 — il ne contient qu'une date d'expiration, donc rien à
 * voler et rien à falsifier sans le secret.
 */
import {
  createHmac,
  randomBytes,
  scryptSync,
  timingSafeEqual,
} from 'node:crypto';

export const COOKIE_ACCES = 'afk_acces';
export const DUREE_SESSION_MS = 7 * 24 * 60 * 60 * 1000; // 7 jours

const SCRYPT_KEYLEN = 32;
const SCRYPT_OPTIONS = { N: 16384, r: 8, p: 1 } as const;

/* ------------------------------------------------------------------ */
/* Mot de passe                                                        */
/* ------------------------------------------------------------------ */

/**
 * Produit la valeur à coller dans `ACCES_HASH` : `scrypt:<sel>:<empreinte>`.
 *
 * Le séparateur est volontairement `:` et non `$` : les fichiers .env sont
 * chargés avec expansion de variables, et un `$` dans la valeur serait
 * silencieusement remplacé par une chaîne vide.
 */
export function hacherMotDePasse(motDePasse: string): string {
  const sel = randomBytes(16).toString('hex');
  const empreinte = scryptSync(
    motDePasse.normalize('NFKC'),
    sel,
    SCRYPT_KEYLEN,
    SCRYPT_OPTIONS,
  ).toString('hex');
  return `scrypt:${sel}:${empreinte}`;
}

/** Compare en temps constant un mot de passe saisi au condensat stocké. */
export function verifierMotDePasse(motDePasse: string, stocke: string | undefined): boolean {
  if (!stocke) return false;

  const [algo, sel, empreinte] = stocke.split(':');
  if (algo !== 'scrypt' || !sel || !empreinte) return false;

  let attendu: Buffer;
  try {
    attendu = Buffer.from(empreinte, 'hex');
  } catch {
    return false;
  }
  if (attendu.length !== SCRYPT_KEYLEN) return false;

  const candidat = scryptSync(
    motDePasse.normalize('NFKC'),
    sel,
    SCRYPT_KEYLEN,
    SCRYPT_OPTIONS,
  );
  return timingSafeEqual(candidat, attendu);
}

/* ------------------------------------------------------------------ */
/* Session                                                             */
/* ------------------------------------------------------------------ */

function signer(charge: string, secret: string): string {
  return createHmac('sha256', secret).update(charge).digest('base64url');
}

/** Jeton `<expiration>.<signature>` à poser dans le cookie. */
export function creerSession(secret: string, maintenant = Date.now()): string {
  const expiration = String(maintenant + DUREE_SESSION_MS);
  return `${expiration}.${signer(expiration, secret)}`;
}

/** Vrai si le jeton est authentique et non expiré. */
export function verifierSession(
  jeton: string | undefined,
  secret: string | undefined,
  maintenant = Date.now(),
): boolean {
  if (!jeton || !secret) return false;

  const separateur = jeton.lastIndexOf('.');
  if (separateur <= 0) return false;

  const charge = jeton.slice(0, separateur);
  const signature = jeton.slice(separateur + 1);

  const attendue = Buffer.from(signer(charge, secret));
  const fournie = Buffer.from(signature);
  if (attendue.length !== fournie.length) return false;
  if (!timingSafeEqual(attendue, fournie)) return false;

  const expiration = Number(charge);
  return Number.isFinite(expiration) && expiration > maintenant;
}

/* ------------------------------------------------------------------ */
/* Limitation des tentatives                                           */
/* ------------------------------------------------------------------ */

const MAX_TENTATIVES = 5;
const FENETRE_MS = 15 * 60 * 1000;

type Compteur = { essais: number; reinitAt: number };
const compteurs = new Map<string, Compteur>();

/**
 * Compte une tentative. Renvoie le nombre d'essais restants, ou `null` si le
 * quota est épuisé. En mémoire du processus : suffisant pour freiner une
 * attaque automatisée, sans dépendance externe.
 */
export function consommerTentative(cle: string, maintenant = Date.now()): number | null {
  const courant = compteurs.get(cle);

  if (!courant || courant.reinitAt <= maintenant) {
    compteurs.set(cle, { essais: 1, reinitAt: maintenant + FENETRE_MS });
    return MAX_TENTATIVES - 1;
  }

  if (courant.essais >= MAX_TENTATIVES) return null;

  courant.essais += 1;
  return MAX_TENTATIVES - courant.essais;
}

/** Remet le compteur à zéro après une authentification réussie. */
export function libererTentatives(cle: string): void {
  compteurs.delete(cle);
}

/** Nettoie une cible de redirection pour n'accepter qu'un chemin interne. */
export function nettoyerRedirection(valeur: unknown): string {
  if (typeof valeur !== 'string') return '/realisations';
  if (!valeur.startsWith('/') || valeur.startsWith('//')) return '/realisations';
  if (!valeur.startsWith('/realisations')) return '/realisations';
  return valeur;
}
