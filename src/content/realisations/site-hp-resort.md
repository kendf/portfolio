---
titre: "HP Resort — site officiel"
client: "HP Resort — Yamoussoukro"
role: "Développeur web"
periode: "Mai — Juillet 2026"
debut: "2026-05"
resume: "Site vitrine bilingue d'un hôtel 4 étoiles, avec demande de réservation pour les chambres, les salles de réunion et les événements."
probleme: "L'hôtel n'avait pas de vitrine en ligne à jour. Les demandes de réservation arrivaient par téléphone et WhatsApp, sans formulaire structuré ni trace exploitable."
resultat: "Site Angular 21 avec rendu serveur et prérendu, disponible en français et en anglais, avec un parcours de demande distinct pour chacun des trois types d'espaces."
stack:
  - "Angular 21"
  - "Angular SSR"
  - "TypeScript"
  - "Tailwind CSS 4"
  - "Express"
domaines: ["Web", "Hôtellerie", "Bilingue"]
statut: "production"
lien: "https://hp-resort.ci"
lienTexte: "hp-resort.ci"
---

## Le contexte

HP Resort est un établissement 4 étoiles à Yamoussoukro. Sa clientèle mêle
voyageurs d'affaires, séminaires d'entreprise et événements privés — trois
parcours de réservation qui n'ont ni les mêmes critères ni le même vocabulaire.

## L'architecture

Angular 21 avec SSR et prérendu des routes, servi par Express. Le découpage
sépare strictement les données métier du rendu :

- `core/` — modèles typés (chambres, salles de réunion, services, demandes de
  réservation), données réelles de l'hôtel, service de soumission ;
- `layout/` — en-tête et pied de page partagés ;
- `i18n/` — moteur de traduction français / anglais avec dictionnaires.

## Les décisions qui comptent

**Prérendu plutôt que rendu client.** Une vitrine d'hôtel est consultée depuis
des connexions inégales, souvent depuis l'étranger. Les pages arrivent
complètes ; Angular reprend la main ensuite.

**Trois parcours, pas un formulaire générique.** Réserver une chambre, une salle
de réunion ou un espace événementiel n'appelle pas les mêmes questions. Fusionner
les trois aurait produit un formulaire que personne ne remplit jusqu'au bout.

**Un pipeline d'images.** Un script de conversion WebP traite les visuels de
l'hôtel. La photographie est l'essentiel de l'argument commercial d'un hôtel :
elle doit être belle et légère à la fois.

**Bilingue dès la conception.** Le français et l'anglais ne sont pas une couche
ajoutée après coup — le moteur i18n et les dictionnaires existaient avant le
contenu.

## Ce que j'en retire

Mon projet Angular le plus abouti, et l'occasion de mesurer ce que le rendu
serveur change réellement sur des connexions lentes.
