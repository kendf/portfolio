#!/usr/bin/env node
/**
 * Génère le favicon et l'image de partage à partir de la palette « Latérite ».
 * Usage :  npm run images
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import sharp from 'sharp';

const racine = join(dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = join(racine, 'public');

const GROUND = '#FBF8F4';
const INK = '#1A1512';
const INK2 = '#55493F';
const VERT = '#12463C';
const LATERITE = '#C2542A';

/* ------------------------------------------------------------------ */
/* Marque : un carré vert forêt entamé par un quart de disque latérite. */
/* Aucun texte, pour un rendu identique partout.                       */
/* ------------------------------------------------------------------ */

const marque = (taille) => `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="${taille}" height="${taille}">
  <rect width="64" height="64" rx="14" fill="${VERT}"/>
  <path d="M14 50 A36 36 0 0 1 50 14 L50 50 Z" fill="${LATERITE}"/>
  <circle cx="50" cy="14" r="4.5" fill="${GROUND}"/>
</svg>`;

const partage = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${GROUND}"/>
  <rect x="0" y="0" width="18" height="630" fill="${LATERITE}"/>

  <g transform="translate(96 84)">
    <rect width="72" height="72" rx="16" fill="${VERT}"/>
    <path d="M16 56 A40 40 0 0 1 56 16 L56 56 Z" fill="${LATERITE}"/>
    <circle cx="56" cy="16" r="5" fill="${GROUND}"/>
  </g>

  <text x="96" y="300" font-family="Georgia, 'Times New Roman', serif"
        font-size="86" font-weight="600" fill="${INK}">Ali Freddy Kouadio</text>

  <text x="96" y="366" font-family="'Segoe UI', Arial, sans-serif"
        font-size="36" fill="${INK2}">Développeur mobile &amp; web</text>

  <rect x="96" y="416" width="120" height="3" fill="${LATERITE}"/>

  <text x="96" y="486" font-family="'Segoe UI', Arial, sans-serif"
        font-size="27" fill="${VERT}">Flutter · Next.js · Angular · Astro · Supabase</text>

  <text x="96" y="536" font-family="'Segoe UI', Arial, sans-serif"
        font-size="25" fill="${INK2}">Yamoussoukro, Côte d’Ivoire</text>
</svg>`;

await mkdir(publicDir, { recursive: true });

await writeFile(join(publicDir, 'favicon.svg'), marque(64).trim());

await sharp(Buffer.from(marque(180)))
  .png()
  .toFile(join(publicDir, 'apple-touch-icon.png'));

await sharp(Buffer.from(marque(512)))
  .png()
  .toFile(join(publicDir, 'icone-512.png'));

await sharp(Buffer.from(partage))
  .png()
  .toFile(join(publicDir, 'og-image.png'));

console.log('Générés : favicon.svg, apple-touch-icon.png, icone-512.png, og-image.png');
