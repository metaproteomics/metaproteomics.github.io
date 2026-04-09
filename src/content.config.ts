import { z, defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

const newsCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/news' }),
  schema: z.object({
    draft: z.boolean().optional(),
    title: z.string(),
    publishDate: z.string().transform(str => new Date(str)),
    description: z.string().optional(),
  }),
});

const articleCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/articles' }),
  schema: z.object({
    draft: z.boolean().optional(),
    title: z.string(),
    publishDate: z.string().transform(str => new Date(str)),
  }),
});

const symposiaCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/symposia' }),
  schema: z.object({
    draft: z.boolean().optional(),
    title: z.string(),
    date: z.string(),
    sortDate: z.string(),
    location: z.string(),
    photo: z.string().optional(),
    caption: z.string().optional(),
    description: z.string().optional(),
    website: z.string().optional(),
  }),
});

const campiCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/campi' }),
  schema: z.object({
    draft: z.boolean().optional(),
    title: z.string(),
    subTitle: z.string(),
    summary: z.string(),
    status: z.string().optional(),
    biorxiv: z.string().optional(),
    doi: z.string().optional(),
    publication: z.string().optional(),
    organizers: z.array(z.string()).optional(),
    authors: z.array(z.string()).optional(),
    citation: z.string().optional(),
    citationUrl: z.string().optional(),
    openAccess: z.boolean().optional(),
    callStatus: z.enum(["open", "closed", "none"]).optional().default("none"),
    contact: z.string().optional(),
  }),
});

export const collections = {
  'news': newsCollection,
  'symposia': symposiaCollection,
  'campi': campiCollection,
  'articles': articleCollection,
};
