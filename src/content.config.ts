import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const caseStudies = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/case-studies' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    category: z.string(),
    year: z.number(),
    coverImage: z.string(),
    coverAlt: z.string(),
    order: z.number().optional(),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    publishDate: z.date(),
    tags: z.array(z.string()).default([]),
    coverImage: z.string(),
    coverAlt: z.string(),
  }),
});

export const collections = { 'case-studies': caseStudies, blog };
