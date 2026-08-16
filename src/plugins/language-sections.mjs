/**
 * Marks each block of a bilingual Markdown body with the language it is
 * written in, at build time.
 *
 * The house style (see CONTRIBUTING.md and the sample entries) is to write both
 * languages in one file under headings:
 *
 *     ## English
 *     ...
 *
 *     ## தமிழ்
 *     ...
 *
 * Every top-level node from a language heading up to the next one gets
 * `lang` and `data-lang` attributes. That lets the site-wide toggle hide the
 * inactive language with a single CSS rule, and lets `:lang(ta)` pick the Tamil
 * face and its looser leading — no runtime JavaScript beyond flipping one
 * attribute on <html>.
 *
 * This is a Sätteri hast plugin (Astro 7's default Markdown processor), so it
 * is a visitor rather than a unified/rehype transformer. It only ever *sets
 * properties* — it never inserts, removes, or reparents nodes — which keeps it
 * clear of the dropped-patch hazards that come with structural mutation.
 *
 * Three deliberate safety properties:
 *
 *   - Content *before* the first language heading is left unmarked, so a
 *     standfirst or image at the top of a piece stays visible in both
 *     languages.
 *   - A body with no recognised language headings is left completely untouched,
 *     so authors who don't follow the convention lose nothing.
 *   - A body with only one language heading still works; the other language
 *     simply has nothing to show.
 */

const LANGUAGE_HEADINGS = [
  { lang: 'en', test: /^(in\s+)?english$/i },
  { lang: 'ta', test: /^(in\s+)?(tamil|தமிழ்|தமிழில்)$/i },
];

const HEADING_TAGS = ['h1', 'h2', 'h3'];

/** Returns 'en' | 'ta' if this node is a language heading, else null. */
function languageOf(node, ctx) {
  if (node?.type !== 'element' || !HEADING_TAGS.includes(node.tagName)) return null;
  const text = ctx.textContent(node).replace(/\s+/g, ' ').trim();
  if (!text) return null;
  return LANGUAGE_HEADINGS.find(({ test }) => test.test(text))?.lang ?? null;
}

/**
 * Passed to Astro as a factory so its `done` flag resets for each document.
 */
export default function languageSections() {
  // The whole document is handled in one pass, triggered by the first language
  // heading we happen to visit.
  let done = false;

  return {
    name: 'vishnupuram-language-sections',
    element: {
      filter: HEADING_TAGS,
      visit(node, ctx) {
        if (done) return;
        if (!languageOf(node, ctx)) return;

        const parent = ctx.parent(node);
        // Only handle the document's top level; a language heading nested in a
        // blockquote or list item is left alone.
        if (!parent || parent.type !== 'root') return;

        done = true;

        let current = null;

        for (const child of parent.children ?? []) {
          const heading = languageOf(child, ctx);

          if (heading) {
            current = heading;
            // The heading duplicates what the language toggle already says, so
            // it is hidden visually but kept for screen readers.
            ctx.setProperty(child, 'data-lang-heading', '');
          }

          // Nodes above the first language heading stay unmarked, and so stay
          // visible whichever language is selected.
          if (!current) continue;
          if (child.type !== 'element') continue;

          ctx.setProperty(child, 'lang', current);
          ctx.setProperty(child, 'data-lang', current);
        }
      },
    },
  };
}
