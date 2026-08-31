---
titre: "Portail SONAPIE 3"
client: "HP Resort — Yamoussoukro"
role: "Stage puis développeur — conception et développement"
periode: "Novembre 2025 — Avril 2026"
debut: "2025-11"
resume: "Hub applicatif multi-hôtels sur Android et Windows : gestion des ordres de travaux et élection de l'employé du mois, sur infrastructure auto-hébergée."
probleme: "Trois établissements du groupe géraient leurs demandes d'intervention sur papier et par téléphone. Aucune trace, aucun délai mesurable, aucune visibilité sur la charge des équipes techniques."
resultat: "Application en version 1.2.1 déployée sur Android et Windows, déclinée en trois marques via un système de flavors, adossée à un Supabase auto-hébergé sur serveur Ubuntu dédié."
stack:
  - "Flutter"
  - "Dart"
  - "Riverpod"
  - "GoRouter"
  - "Supabase self-hosted"
  - "Ubuntu"
  - "Docker"
  - "Nginx"
  - "Inno Setup"
domaines: ["Mobile", "Desktop", "Infrastructure"]
statut: "production"
phare: true
---

## Le contexte

Le groupe exploite plusieurs établissements — HP Resort, Hôtel Président, Hôtel
Carrefour. Chacun a ses équipes techniques, ses ordres de travaux, son personnel.
Le besoin initial portait sur les interventions de maintenance ; le projet s'est
élargi à un portail capable d'accueillir plusieurs modules.

## L'architecture

Application Flutter unique, déclinée par **flavors** : une base de code, trois
identités visuelles, trois configurations, trois installeurs. Ajouter un hôtel
consiste à ajouter un flavor, pas à dupliquer un projet.

Le backend est un **Supabase auto-hébergé** sur un serveur Ubuntu dédié, derrière
Docker et Nginx. Ce choix n'était pas idéologique : les données du personnel et
de l'exploitation restent sur une infrastructure que le groupe contrôle, et le
coût est prévisible.

Côté état, Riverpod avec génération de code ; côté navigation, GoRouter, ce qui
permet de partager la même arborescence entre le mobile et le poste fixe.

## Les décisions qui comptent

**Isolation par établissement.** Un utilisateur de l'Hôtel Président ne doit
jamais voir un ordre de travail de l'Hôtel Carrefour. La séparation est portée
par les règles d'accès de la base, pas par un filtre côté interface — un filtre
d'affichage n'est pas une frontière de sécurité.

**Windows autant qu'Android.** Les équipes techniques sont sur téléphone, mais
les responsables travaillent sur poste fixe. Livrer un vrai binaire Windows avec
un installeur Inno Setup, plutôt qu'un site à ouvrir dans un navigateur, a
beaucoup fait pour l'adoption.

**Le module de vote est volontairement simple.** Élection de l'employé du mois :
une voix par personne, une période, un résultat. La tentation d'y ajouter des
pondérations a été écartée — un vote que le personnel ne comprend pas est un vote
auquel il ne croit pas.

## Ce que j'en retire

Premier projet où j'ai administré le serveur autant que l'application : Docker,
Nginx, sauvegardes, mises à jour. Comprendre où tourne son code change la façon
de l'écrire.
