import { defineCollection, z } from 'astro:content';

const relatedSchema = z.object({
  title: z.string(),
  href: z.string()
});

const faqSchema = z.object({
  question: z.string(),
  answer: z.string()
});

const sourceSchema = z.object({
  title: z.string(),
  url: z.string().url(),
  type: z.literal('official')
});

const guideSchema = z.object({
  title: z.string(),
  seoTitle: z.string().max(65).optional(),
  thumbnailSuggestion: z.string().optional(),
  description: z.string(),
  pubDate: z.coerce.date(),
  updatedDate: z.coerce.date(),
  lastReviewed: z.coerce.date(),
  author: z.string().default('Korea Tax Guide Editorial Team'),
  category: z.string(),
  difficulty: z.enum(['Beginner', 'Intermediate']),
  tags: z.array(z.string()),
  quickAnswer: z.string(),
  audience: z.array(z.string()),
  keyPoints: z.array(z.string()),
  documents: z.array(z.string()),
  mistakes: z.array(z.string()),
  related: z.array(relatedSchema),
  faqs: z.array(faqSchema),
  sources: z.array(sourceSchema).min(1)
});

const procedureSchema = z.object({
  title: z.string(),
  description: z.string(),
  pubDate: z.coerce.date(),
  updatedDate: z.coerce.date(),
  lastReviewed: z.coerce.date(),
  author: z.string().default('Korea Tax Guide Editorial Team'),
  category: z.string(),
  tags: z.array(z.string()),
  quickAnswer: z.string(),
  beforeYouStart: z.array(z.string()),
  whatYouNeed: z.array(z.string()),
  steps: z.array(z.object({
    title: z.string(),
    text: z.string()
  })),
  stuck: z.array(z.string()),
  mistakes: z.array(z.string()),
  faqs: z.array(faqSchema),
  related: z.array(relatedSchema),
  sources: z.array(sourceSchema).min(1)
});

export const collections = {
  guides: defineCollection({ type: 'content', schema: guideSchema }),
  procedures: defineCollection({ type: 'content', schema: procedureSchema })
};
