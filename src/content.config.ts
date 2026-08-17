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

/**
 * Same empty-string-to-undefined treatment as `optionalString`, but for a
 * field that must be a real URL when present. Lets a `videos` entry exist
 * with its host link still pending — the card renders a "coming soon" state
 * rather than either rejecting the entry or linking out to a fake URL.
 */
const optionalUrl = z.preprocess(
  (value) => (typeof value === 'string' && value.trim() === '' ? undefined : value),
  z.url().optional(),
);

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

/**
 * Videos are link-outs to an external host (YouTube, Vimeo), not pages of
 * our own — there is no `body` field and no detail page for this collection,
 * just cards on the home page that open `video_url` in a new tab.
 *
 * `video_url` is optional on purpose: an entry can exist — title, date,
 * description filled in — before the video itself has anywhere to live yet.
 * The card shows a "coming soon" state until an editor adds the real link.
 */
const videos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/videos' }),
  schema: z.object({
    title_en: z.string(),
    title_ta: optionalString,
    date,
    video_url: optionalUrl,
    thumbnail: optionalString,
    description_en: optionalString,
    description_ta: optionalString,
  }),
});

export const collections = { discussions, events, reviews, blog, videos };
