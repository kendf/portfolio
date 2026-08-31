---
titre: "FAEW-CI Doc Manager"
client: "FAEW-CI SARL"
role: "Développeur Flutter"
periode: "2026"
debut: "2026-03"
resume: "Application de gestion documentaire administrative : clients, terrains et pièces justificatives, avec des droits différenciés selon le rôle."
probleme: "Les dossiers clients et fonciers étaient répartis entre classeurs papier et fichiers dispersés. Retrouver une pièce prenait un temps déraisonnable, et repérer un dossier incomplet relevait de la mémoire de chacun."
resultat: "Application en version 1.0.3 : gestion complète des clients, des terrains et des documents, consultation des PDF dans l'application, et vue dédiée aux dossiers incomplets."
stack:
  - "Flutter"
  - "Dart"
  - "Riverpod"
  - "GoRouter"
  - "Supabase"
domaines: ["Mobile", "Gestion documentaire"]
statut: "livre"
---

## Le contexte

FAEW-CI gère des dossiers clients et des dossiers fonciers, chacun composé de
pièces justificatives obligatoires. Le problème n'était pas le stockage mais la
**complétude** : savoir, à tout moment, quel dossier peut être traité et lequel
attend encore une pièce.

## L'architecture

Découpage en quatre couches, qui reste ma structure Flutter de référence :

- `core/` — constantes, utilitaires, services transverses ;
- `data/` — source de données Supabase, modèles, dépôts ;
- `domain/` — fournisseurs Riverpod ;
- `presentation/` — écrans.

## Les décisions qui comptent

**La vue « dossiers incomplets » est la fonctionnalité principale.** Ce n'est pas
un filtre parmi d'autres, c'est la raison d'être de l'application : elle répond à
la seule question que se pose une secrétaire en arrivant le matin.

**Deux rôles, deux interfaces.** Administrateur et secrétaire ne voient pas les
mêmes actions. Restreindre l'interface plutôt qu'afficher des boutons qui
échouent évite une catégorie entière de frustration.

**Lecture des PDF dans l'application.** Sortir vers une application externe pour
consulter une pièce cassait le flux de travail. Le lecteur est intégré.

## Ce que j'en retire

Un logiciel de gestion documentaire ne se juge pas au nombre de ses
fonctionnalités, mais au temps qu'il fait gagner à la personne qui l'ouvre
quarante fois par jour.
