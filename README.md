# Portfolio — Ali Freddy Kouadio

Site portfolio statique construit avec [Astro](https://astro.build).

## Lancer en local

```bash
npm install
npm run dev
```

Ouvre http://localhost:4321

## Build de production

```bash
npm run build
npm run preview
```

## Déployer sur Vercel

### Option 1 — via l'interface Vercel (recommandé)
1. Pousse ce dossier sur un dépôt GitHub (public ou privé).
2. Va sur https://vercel.com/new et importe le dépôt.
3. Vercel détecte Astro automatiquement (build command: `astro build`, output: `dist`). Clique sur **Deploy**.

### Option 2 — via la CLI Vercel
```bash
npm install -g vercel
vercel login
vercel
```
Suis les instructions ; `vercel --prod` pour la mise en production.

## Modifier le contenu
Tout le contenu (expériences, projets, compétences, formation) est dans
`src/pages/index.astro`, dans les tableaux JavaScript en haut du fichier.
Le CV téléchargeable se trouve dans `public/CV_Ali_Freddy_Kouadio.pdf`
(remplace ce fichier si tu mets ton CV à jour).
