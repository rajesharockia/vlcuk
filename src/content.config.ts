import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * Astro content collections for Vishnupuram UK.
 *
 * Field names here MUST stay in lockstep with `public/admin/config.yml`,
 * which is the Decap CMS side of the same contract. If you add a field in one
 * place, add it in the other.
 *
 * Two deliberate differences from that file:
 *
 * 1. `body` is not a schema field. Decap declares `body` so editors get a
 *    Markdown editor, but it maps to the content *below* the frontmatter,
 *    which Astro exposes through `render(entry)` instead.
 *
 * 2. Image fields are typed as strings, not with Astro's `image()` helper.
 *    `image()` resolves paths relative to the Markdown file, but Decap's
 *    `public_folder: "/src/assets/images"` writes project-root-absolute paths
 *    like `/src/assets/images/cover.jpg`. Those are resolved at render time by
 *    `resolveImage()` in `src/lib/images.ts`, which still yields a fully
 *    optimised image. See that file for the details.
 */

/**
 * Decap writes `""` for a cleared image field, and the sample entries ship
 * with `image: ""`. Treat an empty or whitespace-only string as "not set" so
 * templates only need to check for `undefined`.
 */
const optionalString = z.preprocess(
  (value) => (typeof value === 'string' && value.trim() === '' ? undefined : value),
  z.string().optional(),
);

/**
 * Dates are written unquoted (`date: 2027-09-18`), which the YAML parser
 * hands us as a `Date`. `coerce` accepts both that and a quoted string.
 */
const date = z.coerce.date();

const discussions = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/discussions' }),
  schema: z.object({
    title_en: z.string(),
    title_ta: optionalString,
    date,
    summary_en: optionalString,
    summary_ta: optionalString,
    image: optionalString,
  }),
});

const events = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/events' }),
  schema: z.object({
    title_en: z.string(),
    title_ta: optionalString,
    date,
    end_date: z.coerce.date().optional(),
    status: z.enum(['upcoming', 'past']).default('upcoming'),
    venue_en: optionalString,
    venue_ta: optionalString,
    featured: z.boolean().default(false),
    image: optionalString,
    summary_en: optionalString,
    summary_ta: optionalString,
  }),
});

const reviews = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/reviews' }),
  schema: z.object({
    title_en: z.string(),
    title_ta: optionalString,
    book_title_en: optionalString,
    book_title_ta: optionalString,
    author: z.string(),
    translator: optionalString,
    date,
    cover_image: optionalString,
    reviewer: optionalString,
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title_en: z.string(),
    title_ta: optionalString,
    date,
    author: optionalString,
    summary_en: optionalString,
    summary_ta: optionalString,
    allow_responses: z.boolean().default(true),
  }),
});

export const collections = { discussions, events, reviews, blog };
