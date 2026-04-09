// 1. Import utilities from `astro:content`
import { z, defineCollection } from 'astro:content';

// 2. Define your collection(s)
const newsCollection = defineCollection({
  schema: z.object({
    draft: z.boolean().optional(),
    title: z.string(),
    //snippet: z.string(),
    /*image: z.object({
      src: z.string(),
      alt: z.string(),
    }),*/
    publishDate: z.string().transform(str => new Date(str)),
    description: z.string().optional(),
    //author: z.string().default('Astroship'),
    //category: z.string(),
    //tags: z.array(z.string()),
  }),
});

const articleCollection = defineCollection({
  schema: z.object({
    draft: z.boolean().optional(),
    title: z.string(),
    //snippet: z.string(),
    /*image: z.object({
      src: z.string(),
      alt: z.string(),
    }),*/
    publishDate: z.string().transform(str => new Date(str)),
    //author: z.string().default('Astroship'),
    //category: z.string(),
    //tags: z.array(z.string()),
  }),
});

const symposiaCollection = defineCollection({
  schema: z.object({
    draft: z.boolean().optional(),
    title: z.string(),
    date: z.string(),
    sortDate: z.string(),
    location: z.string(),
    photo: z.string().optional(),
    caption: z.string().optional(),
    description: z.string().optional(),
  }),
});

const campiCollection = defineCollection({
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

// 3. Export a single `collections` object to register your collection(s)
//    This key should match your collection directory name in "src/content"
export const collections = {
  'news': newsCollection,
  'symposia': symposiaCollection,
  'campi': campiCollection,
  'articles': articleCollection
};
