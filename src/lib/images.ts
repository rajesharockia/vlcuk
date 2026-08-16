import type { ImageMetadata } from 'astro';

/**
 * Resolves the image paths that Decap CMS writes into frontmatter.
 *
 * `public/admin/config.yml` sets:
 *
 *     media_folder:  "src/assets/images"
 *     public_folder: "/src/assets/images"
 *
 * so an uploaded file lands in frontmatter as `/src/assets/images/cover.jpg`.
 *
 * That path can't go straight into `<img src>` — nothing is served from
 * `/src/` at runtime — and it can't use Astro's `image()` schema helper
 * either, because that resolves paths relative to the Markdown file.
 *
 * Vite's `import.meta.glob` closes the gap. Given a root-absolute pattern it
 * keys the returned map by exactly the same root-absolute path Decap writes,
 * so a direct lookup works. Eager loading means the imports are resolved at
 * build time and the images still get Astro's full optimisation pipeline.
 */
const images = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/images/**/*.{jpeg,jpg,png,webp,avif,gif,tiff,svg}',
  { eager: true },
);

/**
 * Look up an image by its frontmatter path.
 *
 * Returns `undefined` — rather than throwing — when the field is empty or the
 * file is missing, so a half-finished entry degrades to a text-only card
 * instead of breaking the build. A missing file is warned about at build time,
 * since that usually means an upload didn't get committed.
 */
export function resolveImage(path?: string): ImageMetadata | undefined {
  if (!path) return undefined;

  // Tolerate a leading `./` or a missing leading slash from hand-written entries.
  const candidates = [
    path,
    path.startsWith('/') ? path.slice(1) : `/${path}`,
    path.replace(/^\.\//, '/'),
  ];

  for (const candidate of candidates) {
    const normalised = candidate.startsWith('/') ? candidate : `/${candidate}`;
    const match = images[normalised];
    if (match) return match.default;
  }

  console.warn(
    `[vishnupuram] Image not found: "${path}". ` +
      `Expected a file under src/assets/images/. The entry will render without it.`,
  );
  return undefined;
}
