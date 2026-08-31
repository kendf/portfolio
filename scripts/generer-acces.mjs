#!/usr/bin/env node
/**
 * Génère les deux secrets de l'espace Réalisations.
 * Usage :  node scripts/generer-acces.mjs "mon mot de passe"
 */
import { randomBytes, scryptSync } from 'node:crypto';

const motDePasse = process.argv[2];

if (!motDePasse) {
  console.error('Usage : node scripts/generer-acces.mjs "mon mot de passe"');
  process.exit(1);
}

if (motDePasse.length < 10) {
  console.error('Mot de passe trop court : 10 caractères minimum.');
  process.exit(1);
}

const sel = randomBytes(16).toString('hex');
const empreinte = scryptSync(motDePasse.normalize('NFKC'), sel, 32, {
  N: 16384,
  r: 8,
  p: 1,
}).toString('hex');

console.log('\nÀ copier dans .env (local) et dans les variables Vercel :\n');
console.log(`ACCES_HASH="scrypt:${sel}:${empreinte}"`);
console.log(`ACCES_SECRET="${randomBytes(32).toString('hex')}"`);
console.log('\nLe mot de passe en clair n\'est stocké nulle part. Note-le.\n');
