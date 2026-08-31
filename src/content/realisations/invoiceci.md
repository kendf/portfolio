---
titre: "InvoiceCI"
client: "MapDevs"
role: "Développeur produit — conception et développement"
periode: "Février — Juin 2026"
debut: "2026-02"
resume: "SaaS de facturation normalisée électronique qui met les PME ivoiriennes en conformité avec la DGI, du devis au QR code fiscal."
probleme: "Depuis l'entrée en vigueur de la facture normalisée électronique (FNE), toute entreprise ivoirienne assujettie doit faire certifier ses factures auprès de la DGI. Les PME n'ont ni ERP ni service comptable pour absorber cette contrainte."
resultat: "Produit en production sur invoiceci.com : création de facture, certification FNE avec numéro unique et QR code fiscal, PDF conforme, suivi des paiements et des abonnements."
stack:
  - "Next.js 16"
  - "TypeScript"
  - "PostgreSQL"
  - "Prisma"
  - "NextAuth v5"
  - "Tailwind CSS"
  - "Paystack"
  - "Resend"
domaines: ["Web", "SaaS", "Conformité fiscale"]
statut: "production"
lien: "https://invoiceci.com"
lienTexte: "invoiceci.com"
phare: true
---

## Le contexte

La facture normalisée électronique est obligatoire pour les entreprises
assujetties en Côte d'Ivoire. Concrètement, chaque facture doit être transmise à
la Direction Générale des Impôts, qui renvoie un numéro unique et les éléments du
QR code fiscal à imprimer sur le document. Les grandes structures branchent leur
ERP. Les PME, elles, facturent encore sous Word et Excel.

InvoiceCI est né de ce décalage : donner à une entreprise de trois personnes le
même niveau de conformité qu'un groupe, sans lui demander de changer ses
habitudes de travail.

## L'architecture

Application Next.js 16 en App Router, rendue majoritairement côté serveur, avec
PostgreSQL et Prisma pour la persistance. Le découpage suit trois couches :

- **Domaine** — le calcul de facture (lignes, remises, TVA, arrondis) est isolé
  et testable sans base de données. C'est le cœur du produit, celui qui n'a pas
  le droit de se tromper d'un franc.
- **Intégration** — la certification FNE, Paystack pour les abonnements, Resend
  pour les e-mails transactionnels, Cloudinary pour les logos clients. Chaque
  intégration est derrière une interface, ce qui permet de tester le reste du
  produit sans appeler un service externe.
- **Présentation** — Tailwind CSS et shadcn/ui sur Radix, PDF généré par
  `@react-pdf/renderer` pour garantir un rendu identique quel que soit le
  navigateur ou l'imprimante.

## Les décisions qui comptent

**Isolation multi-tenant au niveau du modèle.** Chaque entité porte
l'identifiant de l'entreprise, et toutes les requêtes passent par une couche
d'accès qui l'injecte. Un oubli ne peut pas devenir une fuite de données entre
deux clients.

**Réconciliation des paiements hors ligne.** En Côte d'Ivoire, une part
importante des règlements se fait en espèces ou par mobile money, hors du
système. Un script d'audit rapproche l'état déclaré des factures et l'état réel,
en lecture seule d'abord, puis avec `--apply`. Refuser de corriger silencieusement
une donnée financière est une règle, pas une préférence.

**Limitation des tentatives d'authentification, testée.** Un script dédié vérifie
que le garde tient sous rafale. Sur un produit qui héberge la comptabilité de ses
clients, l'authentification n'est pas un détail d'implémentation.

## Ce que j'en retire

Le plus dur n'a pas été technique mais réglementaire : traduire un texte fiscal
en règles de validation, et concevoir des messages d'erreur qu'un commerçant
comprend sans connaître le vocabulaire de la DGI.
