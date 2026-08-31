---
titre: "École Facile — site et annuaire"
client: "MapDevs"
role: "Développeur web"
periode: "Juillet — Août 2026"
debut: "2026-07"
resume: "Site public et annuaire de répétiteurs en rendu hybride, partageant le compte utilisateur et la base de données de l'application mobile."
probleme: "L'application mobile n'était visible que par ceux qui la connaissaient déjà. Il fallait une porte d'entrée référencée, consultable sans installation, et un espace connecté accessible depuis un ordinateur."
resultat: "Site en rendu hybride : contenu et pages légales pré-générés, annuaire et espace connecté rendus à la demande. Un compte créé sur le site est le même que dans l'application."
stack:
  - "Astro 7"
  - "TypeScript"
  - "Tailwind CSS 4"
  - "Supabase SSR"
  - "Vercel"
domaines: ["Web", "Référencement", "Éducation"]
statut: "production"
lien: "https://www.ecolefacil.com"
lienTexte: "ecolefacil.com"
captures:
  - fichier: "01-accueil"
    legende: "Accueil : la recherche par matière et par commune est le premier élément de la page, avant tout discours."
  - fichier: "02-annuaire"
    legende: "Annuaire des profs certifiés, filtrable par matière, niveau, ville et tarif horaire maximum."
  - fichier: "03-page-prof"
    legende: "Page d'acquisition côté répétiteur : elle nomme le problème du prof avant de parler de la plateforme."
  - fichier: "05-inscription-prof"
    legende: "Création d'une fiche de prof — le choix parent / répétiteur ouvre le formulaire, sans page intermédiaire."
  - fichier: "06-inscription-parent"
    legende: "Même formulaire côté parent : un seul parcours d'inscription à maintenir pour les deux rôles."
  - fichier: "04-connexion"
    legende: "Connexion partagée avec l'application mobile : un compte créé ici est le même que dans l'app."
---

## Le contexte

Une application mobile ne se découvre pas sur un moteur de recherche. Le site
devait remplir deux rôles rarement compatibles : être parfaitement indexable pour
les recherches du type « répétiteur maths Yamoussoukro », et servir un espace
connecté strictement privé.

## L'architecture

Rendu **hybride** assumé route par route :

| Route | Rendu | Pourquoi |
| --- | --- | --- |
| Accueil, contenu, pages légales | pré-généré | rapidité et indexation |
| Annuaire, fiche répétiteur | serveur | données fraîches, filtres |
| Inscription, connexion | serveur | authentification |
| Espace connecté | serveur | strictement privé |

L'espace connecté est en `noindex`, exclu du sitemap et de `robots.txt`, et servi
en `Cache-Control: private, no-store`. Il n'embarque aucun JavaScript, à
l'exception de la page de conversation.

## Les décisions qui comptent

**Une vue publique, pas une table publique.** L'annuaire lit `tutor_directory`,
une vue qui n'expose ni téléphone, ni e-mail, ni quartier, ni documents. La
protection est dans la base, pas dans le code de la page — c'est la seule manière
de garantir qu'un nouvel écran ne fuite pas par inadvertance.

**Zéro JavaScript par défaut.** Sur une connexion mobile ivoirienne, chaque
kilo-octet compte. Astro permet de n'envoyer du script que là où il y a une vraie
interaction.

**Un seul compte.** Le site partage le projet Supabase de l'application mobile.
Un parent qui s'inscrit sur le site retrouve son compte dans l'application, sans
double saisie ni synchronisation à maintenir.

## Ce que j'en retire

Le socle technique de ce portfolio vient directement de ce projet : même moteur,
même approche du rendu hybride, même garde d'accès pour les pages privées.
