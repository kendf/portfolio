---
titre: "École Facile — application mobile"
client: "MapDevs"
role: "Développeur Flutter"
periode: "Juin — Août 2026"
debut: "2026-06"
resume: "Application de mise en relation entre parents d'élèves et répétiteurs certifiés, avec recherche par localité et messagerie intégrée."
probleme: "Trouver un répétiteur fiable passe par le bouche-à-oreille. Les parents n'ont aucun moyen de vérifier un profil, et les bons répétiteurs n'ont aucune vitrine."
resultat: "MVP de mise en relation vérifiée : profil de répétiteur documenté, certification par l'administration, recherche par matière et par ville, échange direct parent-répétiteur dans l'application."
stack:
  - "Flutter"
  - "Dart"
  - "Riverpod"
  - "GoRouter"
  - "Supabase"
domaines: ["Mobile", "Marketplace", "Éducation"]
statut: "production"
---

## Le contexte

Le marché du cours particulier en Côte d'Ivoire fonctionne à la recommandation.
Un parent qui déménage, ou qui n'a pas le bon réseau, se retrouve sans solution —
ou avec une solution qu'il ne peut pas évaluer.

## Le cadrage

La première version du produit visait large : contrats, abonnements, paiements,
reversements. Elle a été volontairement ramenée à un **MVP de mise en relation
vérifiée**, quatre parcours seulement :

1. un parent trouve un répétiteur fiable ;
2. un répétiteur remplit un profil clair et vérifiable ;
3. l'administration certifie le répétiteur ;
4. les deux échangent dans l'application.

Tout le transactionnel est repoussé en post-MVP. C'est la décision produit la
plus structurante du projet : sans confiance, il n'y a pas de transaction à
sécuriser.

## Les décisions qui comptent

**La certification est humaine.** Les profils sont vérifiés à la main par
l'administration. Aucun badge automatique, aucune note calculée : sur un service
qui met un adulte en contact avec un enfant, l'automatisation de la confiance est
un risque, pas une fonctionnalité.

**Supabase comme unique backend applicatif.** L'ancienne API maison a été sortie
du périmètre. Auth, Postgres, Storage, Realtime : une seule surface à sécuriser
et à comprendre, ce qui compte quand l'équipe est réduite.

**Les données sensibles ne sortent pas.** Téléphone, e-mail, quartier et
documents justificatifs ne sont jamais exposés côté public — seule une vue
filtrée alimente l'annuaire.

## Ce que j'en retire

Savoir réduire le périmètre. La version qui existe et fonctionne bat la version
complète qui n'est pas livrée.
