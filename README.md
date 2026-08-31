# Portfolio — Ali Freddy Kouadio

Site personnel construit avec [Astro 7](https://astro.build), en rendu hybride :
les pages publiques sont pré-générées, les fiches détaillées des réalisations
sont rendues à la demande derrière un mot de passe.

**Direction visuelle** — « Latérite » : vert forêt et terre de latérite sur fond
os. Thème clair unique, polices auto-hébergées (Fraunces, Public Sans,
JetBrains Mono).

---

## Démarrer

```bash
npm install
cp .env.example .env      # puis renseigner les deux secrets, voir plus bas
npm run dev
```

| Commande | Effet |
| --- | --- |
| `npm run dev` | serveur de développement |
| `npm run build` | `astro check` puis build de production |
| `npm run preview` | prévisualisation du build |
| `npm run check` | vérification TypeScript seule |
| `npm run images` | régénère favicon, icônes et image de partage |
| `npm run acces -- "mot de passe"` | génère les secrets de l'espace protégé |

---

## Structure

```
src/
  content/realisations/   une réalisation = un fichier Markdown
  content.config.ts       schéma du frontmatter (validé au build)
  data/profil.ts          identité, engagements, compétences, parcours, formation
  layouts/Base.astro      <head>, SEO, JSON-LD, en-tête, pied de page
  components/             Entete, PiedDePage, CarteRealisation, TitreSection
  lib/acces.ts            hachage scrypt, session signée, limitation de tentatives
  middleware.ts           garde d'accès sur /realisations/<slug>
  pages/
    index.astro                    accueil
    realisations/index.astro       index public
    realisations/[slug].astro      fiche détaillée (protégée, rendue à la demande)
    a-propos.astro  contact.astro  acces.astro  404.astro
    api/acces.ts                   authentification et déconnexion
    robots.txt.ts
  styles/global.css       jetons de couleur, typographie, utilitaires
scripts/
  generer-acces.mjs       secrets de l'espace protégé
  generer-images.mjs      favicon, icônes, image de partage
```

---

## Ajouter une réalisation

Créer `src/content/realisations/mon-projet.md`. Le **frontmatter est public**
(affiché sur `/realisations` sans authentification), le **corps du document est
privé** (visible uniquement sur la fiche détaillée).

```yaml
---
titre: "Nom du projet"
client: "Nom du client"
role: "Ce que j'y ai fait"
periode: "Mars — Juin 2026"
debut: "2026-03"          # AAAA-MM, sert au tri
resume: "Une phrase."
probleme: "Ce qui n'allait pas avant."
resultat: "Ce qui existe maintenant."
stack: ["Flutter", "Supabase"]
domaines: ["Mobile"]
statut: "production"      # production | livre | archive
lien: "https://exemple.com"   # facultatif
lienTexte: "exemple.com"      # facultatif
phare: true               # remonte en tête de l'index et sur l'accueil
---

## Le contexte
Le détail, protégé par mot de passe.
```

Le schéma est validé au build : une faute de frappe dans un champ fait échouer
`npm run build` plutôt que de passer en production.

---

## L'espace protégé

### Ce qui est protégé

Seules les fiches `/realisations/<slug>` le sont. L'index `/realisations` reste
public et montre, pour chaque projet, le client, le problème traité, le résultat
et la pile technique — un visiteur comprend la valeur avant de buter sur un
mot de passe.

### Comment ça marche

1. `src/middleware.ts` intercepte toute requête vers `/realisations/<slug>`.
2. Sans cookie de session valide, il redirige vers `/acces?vers=<chemin demandé>`.
   **Aucun octet de contenu privé n'est produit.**
3. `POST /api/acces` compare le mot de passe au condensat **scrypt** salé stocké
   dans `ACCES_HASH`, en temps constant.
4. En cas de succès, un cookie `HttpOnly · Secure · SameSite=Lax` est posé pour
   7 jours. Il ne contient qu'une date d'expiration signée en HMAC-SHA256 avec
   `ACCES_SECRET` : rien à voler, rien à falsifier.
5. Les pages protégées répondent en `Cache-Control: private, no-store` et
   `X-Robots-Tag: noindex, nofollow`, et sont exclues du sitemap et de
   `robots.txt`.

Cinq tentatives sont autorisées par quart d'heure et par adresse. La cible de
redirection est nettoyée : seul un chemin interne commençant par
`/realisations` est accepté.

Déconnexion : `GET /api/acces`, ou le lien « Fermer la session d'accès » en bas
de chaque fiche.

### Configurer les secrets

```bash
npm run acces -- "un mot de passe d'au moins 10 caractères"
```

La commande affiche `ACCES_HASH` et `ACCES_SECRET` à coller dans `.env` en local
**et** dans les variables d'environnement Vercel. Le mot de passe en clair n'est
stocké nulle part — notez-le.

Le séparateur du condensat est `:` et non `$` : les fichiers `.env` sont chargés
avec expansion de variables, et un `$` serait silencieusement remplacé par une
chaîne vide.

Si les deux variables sont absentes, l'accès est refusé (`fail closed`) et le
build reste possible.

---

## Déployer sur Vercel

1. Pousser le dépôt sur GitHub.
2. Importer le projet sur [vercel.com/new](https://vercel.com/new) — Astro et
   l'adapter sont détectés automatiquement.
3. **Ajouter `ACCES_HASH` et `ACCES_SECRET`** dans Settings → Environment
   Variables, pour Production *et* Preview. Sans elles, les fiches détaillées
   restent inaccessibles.
4. Mettre à jour `site` dans `astro.config.mjs` si le domaine change : cette
   valeur alimente l'URL canonique, le sitemap et les métadonnées de partage.

---

## Mettre à jour le contenu

| Quoi | Où |
| --- | --- |
| Réalisations | `src/content/realisations/*.md` |
| Identité, engagements, compétences, parcours, formation | `src/data/profil.ts` |
| Coordonnées | `src/data/profil.ts` — encodées en base64, jamais en clair dans le HTML |
| CV téléchargeable | `public/CV_Ali_Freddy_Kouadio.pdf` |
| Couleurs et typographie | `src/styles/global.css` |
