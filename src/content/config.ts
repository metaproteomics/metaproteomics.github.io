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
  }),
});

const campiCollection = defineCollection({
  schema: z.object({
    draft: z.boolean().optional(),
    title: z.string(),
    subTitle: z.string(),
    summary: z.string(),
  }),
});

// 3. Export a single `collections` object to register your collection(s)
//    This key should match your collection directory name in "src/content"
export const collections = {
  'news': newsCollection,
  'symposia': symposiaCollection,
  'campi': campiCollection,
};
