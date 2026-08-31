import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

/**
 * Une réalisation = un fichier Markdown.
 *
 * Le frontmatter est PUBLIC (affiché sur /realisations sans authentification).
 * Le corps du document est PRIVÉ : il n'est rendu que sur la fiche détaillée,
 * protégée par le middleware.
 */
const realisations = defineCollection({
  loader: glob({ base: './src/content/realisations', pattern: '**/*.md' }),
  schema: z.object({
    titre: z.string(),
    client: z.string(),
    role: z.string(),
    periode: z.string(),
    debut: z.string(), // AAAA-MM, sert au tri chronologique
    resume: z.string(),
    probleme: z.string(),
    resultat: z.string(),
    stack: z.array(z.string()),
    domaines: z.array(z.string()),
    statut: z.enum(['production', 'livre', 'archive']),
    lien: z.url().optional(),
    lienTexte: z.string().optional(),
    phare: z.boolean().default(false),

    /**
     * Captures d'écran, privées comme le reste de la fiche. Chaque `fichier`
     * désigne un nom (sans extension) dans
     * `src/assets/realisations/<id de la fiche>/`. La légende sert aussi de
     * texte alternatif : elle est écrite, jamais déduite du nom de fichier.
     */
    captures: z
      .array(
        z.object({
          fichier: z.string(),
          legende: z.string(),
        }),
      )
      .default([]),
  }),
});

export const collections = { realisations };
