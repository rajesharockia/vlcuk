// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { satteri } from '@astrojs/markdown-satteri';

import languageSections from './src/plugins/language-sections.mjs';

// https://astro.build/config
export default defineConfig({
  // Used for sitemap and canonical URLs. Update if the domain changes.
  site: 'https://vishnupuram.uk',

  integrations: [sitemap()],

  markdown: {
    // Sätteri is Astro 7's default Markdown processor. It is named explicitly
    // here so the language plugin can be attached to it.
    processor: satteri({
      // Tags `## English` / `## தமிழ்` runs so the toggle can hide one.
      hastPlugins: [languageSections],
    }),
    shikiConfig: { theme: 'github-light', wrap: true },
  },

  /**
   * Fonts are self-hosted: Astro downloads them at build time, emits
   * preload hints, and generates fallback metrics to limit layout shift.
   * Nothing is fetched from Google at runtime.
   *
   * EB Garamond carries English body text; Noto Serif Tamil carries Tamil.
   * The Tamil face is loaded with the `tamil` subset so the full glyph set
   * (and its conjuncts) is present rather than falling back to a system font.
   */
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'EB Garamond',
      cssVariable: '--font-serif-en',
      // Only the weights the stylesheet actually uses: 400 body, 500 headings,
      // 600 eyebrows and buttons. Italic carries taglines and summaries.
      weights: [400, 500, 600],
      styles: ['normal', 'italic'],
      subsets: ['latin', 'latin-ext'],
      fallbacks: ['Georgia', 'Times New Roman', 'serif'],
    },
    {
      provider: fontProviders.google(),
      name: 'Noto Serif Tamil',
      cssVariable: '--font-serif-ta',
      // 400 body, 600 headings. No italic: Tamil has no true italic form, and
      // the stylesheet sets `font-style: normal` on Tamil quotations.
      weights: [400, 600],
      styles: ['normal'],
      subsets: ['tamil', 'latin'],
      fallbacks: ['Nirmala UI', 'Latha', 'serif'],
    },
  ],

  vite: {
    plugins: [tailwindcss(), adminDevIndex()],
  },
});

/**
 * Serves `public/admin/index.html` for `/admin` and `/admin/` during `astro dev`.
 *
 * Static hosts — Netlify, and Astro's own `preview` server — resolve a
 * directory request to its `index.html` automatically, so `/admin` works in
 * production. The dev server does not do that for files in `public/`, which
 * would otherwise leave the `/admin` URL documented in README.md and
 * CONTRIBUTING.md returning a 404 locally.
 *
 * Dev only (`apply: 'serve'`); it has no effect on the build output.
 *
 * @returns {import('vite').Plugin}
 */
function adminDevIndex() {
  return {
    name: 'vishnupuram-admin-dev-index',
    apply: 'serve',
    /** @param {import('vite').ViteDevServer} server */
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        const [path, query] = (req.url ?? '').split('?');
        if (path === '/admin' || path === '/admin/') {
          req.url = '/admin/index.html' + (query ? `?${query}` : '');
        }
        next();
      });
    },
  };
}
