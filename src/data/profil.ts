/**
 * Source unique de vérité pour tout ce qui n'est pas une réalisation.
 * Les réalisations vivent dans src/content/realisations/.
 */

export const identite = {
  nom: 'Ali Freddy Kouadio',
  initiales: 'AFK',
  titre: 'Développeur mobile & web',
  accroche: 'Flutter, Next.js, Angular — de la conception à la mise en production',
  ville: 'Yamoussoukro, Côte d’Ivoire',
  disponibilite: 'Disponible pour des missions, sur place ou à distance',
  github: 'https://github.com/kendf',
  githubTexte: 'github.com/kendf',
  linkedin: 'Kouadio Freddy Kenndy',
  cv: '/CV_Ali_Freddy_Kouadio.pdf',
  // Encodés en base64 : le HTML livré ne contient aucune adresse en clair,
  // ce qui suffit à écarter les moissonneurs automatiques.
  emailEncode: 'S2VuZnJlZDE3MDJAZ21haWwuY29t',
  telephoneEncode: 'KzIyNSAwNyAxMSA2MCAxMiA1Mg==',
} as const;

export const presentation = [
  'Je conçois et je maintiens des applications mobiles et web de bout en bout : ' +
    'cadrage du besoin, architecture, développement, mise en production, puis ' +
    'exploitation. Mes projets tournent aujourd’hui chez un groupe hôtelier, ' +
    'dans des PME ivoiriennes et entre les mains de parents d’élèves.',
  'Je travaille surtout en Flutter côté mobile et desktop, et en Next.js, ' +
    'Angular ou Astro côté web, avec PostgreSQL et Supabase pour les données. ' +
    'Quand il faut administrer le serveur qui héberge tout ça, je le fais aussi.',
];

export const engagements = [
  {
    titre: 'Des produits qui servent quelqu’un',
    texte:
      'Une facture conforme pour une PME qui risquait un redressement, un ' +
      'répétiteur vérifié pour un parent qui n’a pas le bon réseau, un ordre ' +
      'de travail tracé pour une équipe technique. Je choisis des projets dont ' +
      'je peux nommer le bénéficiaire.',
  },
  {
    titre: 'Les données restent à leur place',
    texte:
      'Cloisonnement porté par la base de données et non par un filtre ' +
      'd’affichage, vues publiques qui n’exposent ni téléphone ni ' +
      'document, hébergement auto-géré quand le client doit garder la main. ' +
      'La confidentialité se conçoit au début, pas après l’incident.',
  },
  {
    titre: 'Léger par principe',
    texte:
      'Mes utilisateurs sont sur des connexions inégales et des téléphones ' +
      'd’entrée de gamme. Rendu serveur, images converties, JavaScript ' +
      'seulement là où il sert : la performance est une question d’accès, ' +
      'pas de score.',
  },
  {
    titre: 'Documenté pour la suite',
    texte:
      'Chaque projet est livré avec sa documentation technique — et, quand le ' +
      'client en a besoin, son dossier financier. Le code que personne ne peut ' +
      'reprendre après moi est un code que je n’ai pas fini d’écrire.',
  },
];

export const competences = [
  {
    groupe: 'Mobile & desktop',
    items: [
      'Flutter',
      'Dart',
      'Riverpod',
      'GoRouter',
      'Flavors multi-marques',
      'Build Android',
      'Build Windows',
      'Inno Setup',
    ],
  },
  {
    groupe: 'Web',
    items: [
      'Next.js 16',
      'Angular 21 + SSR',
      'Astro 7',
      'TypeScript',
      'Tailwind CSS 4',
      'shadcn/ui + Radix',
      'HTML, CSS, JavaScript',
    ],
  },
  {
    groupe: 'Données & backend',
    items: [
      'PostgreSQL',
      'Prisma',
      'Supabase (Auth, Storage, Realtime)',
      'Row Level Security',
      'Supabase auto-hébergé',
      'Migrations SQL',
      'API REST',
    ],
  },
  {
    groupe: 'Sécurité & fiabilité',
    items: [
      'NextAuth v5',
      'Sessions signées',
      'Hachage de mots de passe',
      'Limitation de tentatives',
      'Isolation multi-tenant',
      'Tests unitaires',
    ],
  },
  {
    groupe: 'Intégrations',
    items: [
      'Paystack',
      'Resend',
      'Cloudinary',
      'WhatsApp Business API',
      'Génération de PDF',
      'Internationalisation FR/EN',
    ],
  },
  {
    groupe: 'Exploitation',
    items: ['Ubuntu', 'Docker', 'Nginx', 'Vercel', 'Déploiement continu', 'Git'],
  },
];

export const experiences = [
  {
    role: 'Développeur Flutter',
    org: 'MapDevs',
    lieu: 'Yamoussoukro',
    periode: 'Juin — Août 2026',
    points: [
      'Développement d’École Facile, application de mise en relation entre parents et répétiteurs certifiés, sur mobile et sur le web',
      'Conception de la recherche de répétiteurs par matière et par localité',
      'Mise en place du suivi de la progression scolaire en temps réel',
    ],
  },
  {
    role: 'Développeur web',
    org: 'HP Resort',
    lieu: 'Yamoussoukro',
    periode: 'Mai — Juillet 2026',
    points: [
      'Création du site officiel de l’hôtel en Angular 21 avec rendu serveur, en français et en anglais',
      'Intégration d’un parcours de demande de réservation pour les chambres, les salles de réunion et les événements',
    ],
  },
  {
    role: 'Développeur produit',
    org: 'MapDevs',
    lieu: 'Yamoussoukro',
    periode: 'Février — Juin 2026',
    points: [
      'Conception et développement d’InvoiceCI, SaaS de facturation normalisée électronique conforme à la réglementation de la DGI',
      'Certification FNE, QR code fiscal, génération de PDF et suivi des abonnements',
      'Isolation multi-tenant et limitation des tentatives d’authentification',
    ],
  },
  {
    role: 'Concepteur — agent conversationnel WhatsApp',
    org: 'HP Resort',
    lieu: 'Yamoussoukro',
    periode: 'Janvier — Mars 2026',
    points: [
      'Conception d’un assistant WhatsApp propulsé par IA pour la réception de l’hôtel',
      'Trois flux automatisés : renseignement, rappel d’arrivée, enquête de satisfaction',
      'Rédaction du dossier technique et du dossier financier avec projection de rentabilité sur trois ans',
    ],
  },
  {
    role: 'Stage puis développeur — Portail SONAPIE 3',
    org: 'HP Resort',
    lieu: 'Yamoussoukro',
    periode: 'Novembre 2025 — Avril 2026',
    points: [
      'Développement d’un hub multi-applications : ordres de travaux et élection de l’employé du mois',
      'Déclinaison en trois marques hôtelières par un système de flavors, sur Android et Windows',
      'Administration d’un Supabase auto-hébergé sur serveur Ubuntu dédié, derrière Docker et Nginx',
      'Mise en place de tests unitaires sur la logique métier',
    ],
  },
  {
    role: 'Intervenant',
    org: 'DevFest — GDG Yamoussoukro',
    lieu: 'Yamoussoukro',
    periode: 'Décembre 2024',
    points: [
      'Développement en direct d’une application mobile de conversion de devises devant le public du DevFest',
    ],
  },
];

export const formations = [
  {
    titre: 'Certificat Dart Avancé',
    org: 'NextFlutter',
    periode: 'Juillet — Août 2026',
  },
  {
    titre: 'Licence en informatique',
    org: 'Institut International Polytechnique des Élites, Yamoussoukro',
    periode: 'Octobre 2024 — Septembre 2025',
  },
  {
    titre: 'BTS',
    org: 'Institut International Polytechnique des Élites, Abidjan',
    periode: 'Octobre 2022 — Juillet 2024 · en cours de validation',
  },
];

export const formationsAnterieures = 'Baccalauréat (2022) · BEPC (2018) · CEPE (2014)';
