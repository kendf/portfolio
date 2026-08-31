---
titre: "Agent conversationnel WhatsApp"
client: "HP Resort — Yamoussoukro"
role: "Conception, développement et dossier d'investissement"
periode: "Janvier — Mars 2026"
debut: "2026-01"
resume: "Assistant WhatsApp propulsé par IA pour un hôtel 4 étoiles : renseignements, demandes de réservation, rappels d'arrivée et enquêtes de satisfaction."
probleme: "La réception traitait manuellement chaque demande WhatsApp, aux mêmes horaires que l'accueil physique. Les messages du soir et du week-end restaient sans réponse jusqu'au lendemain."
resultat: "Trois flux automatisés en service — agent de renseignement, rappel d'arrivée, enquête de satisfaction — accompagnés d'un dossier technique et d'un dossier financier avec projection de rentabilité sur trois ans."
stack:
  - "WhatsApp Business API"
  - "Automatisation de flux"
  - "API de modèles de langage"
  - "Supabase"
  - "Ubuntu"
domaines: ["IA conversationnelle", "Automatisation", "Hôtellerie"]
statut: "production"
phare: true
---

## Le contexte

HP Resort reçoit l'essentiel de ses demandes entrantes par WhatsApp — c'est le
canal par défaut en Côte d'Ivoire. La réception y répondait à la main, ce qui
plafonnait mécaniquement la réactivité de l'hôtel aux horaires de son personnel
et faisait perdre les demandes formulées le soir, précisément le moment où l'on
prépare un voyage.

## Ce qui a été construit

Trois flux distincts, volontairement séparés plutôt que fondus dans un seul
assistant généraliste :

- **Agent de renseignement** — répond sur les chambres, tarifs, services et
  disponibilités, puis qualifie et transmet une demande de réservation à la
  réception. Il n'engage jamais l'hôtel sur une confirmation : c'est un humain
  qui valide.
- **Rappel d'arrivée** — message automatique avant la date d'arrivée, avec les
  informations pratiques et la possibilité de signaler un changement.
- **Enquête de satisfaction** — envoi après le départ, réponses collectées et
  agrégées pour la direction.

## Les décisions qui comptent

**Un agent qui sait s'arrêter.** La règle la plus importante du système n'est pas
ce qu'il répond, mais ce qu'il refuse de répondre. Prix négociés, litiges,
demandes hors périmètre : escalade immédiate vers un humain. Un assistant
d'hôtel qui invente une disponibilité coûte plus cher qu'un assistant qui dit
« je transmets ».

**Séparer les flux.** Trois automatisations indépendantes, versionnées à part.
Une panne de l'enquête de satisfaction n'empêche pas de renseigner un client.

**Documenter comme un projet d'entreprise.** Le projet a été livré avec un
dossier technique — architecture, sécurité, exploitation — et un dossier
financier : budget de réalisation, coûts récurrents d'infrastructure, coûts
variables d'API, maintenance annuelle, retour sur investissement à trois ans.
Une direction ne finance pas une démonstration, elle finance un plan qu'elle
peut présenter à son conseil.

## Ce que j'en retire

C'est le projet qui m'a le plus appris hors du code. Chiffrer un coût d'API
variable, défendre une hypothèse de volume, expliquer une architecture à des
interlocuteurs non techniques : ces compétences décident du sort d'un projet
bien avant la première ligne écrite.
