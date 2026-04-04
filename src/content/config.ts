import { defineCollection, z } from 'astro:content';

const services = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    price: z.number(),
    priceMax: z.number().optional(),
    duration: z.string().optional(),
    category: z.enum(['manicure', 'pedicure', 'additional']),
    includes: z.string().optional(),
    description: z.string().optional(),
    signature: z.boolean().default(false),
    sortOrder: z.number(),
  }),
});

const site = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
  }),
});

export const collections = { services, site };
