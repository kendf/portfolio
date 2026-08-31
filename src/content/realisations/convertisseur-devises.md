---
titre: "Convertisseur de devises"
client: "DevFest — GDG Yamoussoukro"
role: "Intervenant"
periode: "Décembre 2024"
debut: "2024-12"
resume: "Application mobile de conversion de devises développée en direct devant le public du DevFest de Yamoussoukro."
probleme: "Montrer à une salle de développeurs débutants qu'une application Flutter fonctionnelle se construit en une session, sans coupure ni projet préparé à l'avance."
resultat: "Application complète écrite en direct : saisie, sélection des devises, conversion, gestion des états de chargement et d'erreur."
stack:
  - "Flutter"
  - "Dart"
  - "API REST"
domaines: ["Mobile", "Communauté"]
statut: "archive"
---

## Le contexte

Le DevFest est la rencontre annuelle des Google Developer Groups. À Yamoussoukro,
le public est majoritairement composé d'étudiants et de développeurs débutants.

## Le format

Une session de programmation en direct, du projet vide à l'application qui
fonctionne, sans filet. Le sujet — un convertisseur de devises — a été choisi
parce qu'il concentre en peu d'écrans tout ce qu'un débutant doit affronter : un
appel réseau, un état de chargement, une erreur possible, et une mise en forme de
nombres.

## Les décisions qui comptent

**Coder les erreurs devant le public.** L'état de chargement et l'état d'échec
ont été écrits en séance, pas escamotés. C'est précisément ce qu'on saute dans
les tutoriels, et précisément ce qui bloque les débutants sur leur premier vrai
projet.

**Ne rien préparer d'invisible.** Aucun fichier caché, aucun copier-coller. Une
démonstration n'a de valeur pédagogique que si elle est reproductible par la
salle.

## Ce que j'en retire

Expliquer à voix haute pendant qu'on écrit oblige à justifier chaque décision.
C'est le meilleur exercice de clarté technique que je connaisse — et l'origine de
mon habitude de documenter mes projets.
