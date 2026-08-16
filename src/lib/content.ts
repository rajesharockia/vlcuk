import type { CollectionEntry } from 'astro:content';

/** Any entry in a collection that carries a `date` in its frontmatter. */
type Dated = { data: { date: Date } };

/** Newest first. Used by every list page. */
export function byNewest<T extends Dated>(entries: T[]): T[] {
  return [...entries].sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

/** Oldest first — the natural reading order for a run of upcoming events. */
export function bySoonest<T extends Dated>(entries: T[]): T[] {
  return [...entries].sort((a, b) => a.data.date.valueOf() - b.data.date.valueOf());
}

/**
 * A bilingual pair, reduced to what a template needs to render it.
 *
 * When only one language is filled in, `single` holds it along with the
 * language it's written in, so the caller can show that text in *both* toggle
 * states rather than leaving a gap. This is the graceful fallback promised in
 * CONTRIBUTING.md: "fill that one and leave the other blank".
 */
export type Pair =
  | { kind: 'both'; en: string; ta: string }
  | { kind: 'single'; lang: 'en' | 'ta'; text: string }
  | { kind: 'empty' };

export function pair(en?: string, ta?: string): Pair {
  const e = en?.trim();
  const t = ta?.trim();
  if (e && t) return { kind: 'both', en: e, ta: t };
  if (e) return { kind: 'single', lang: 'en', text: e };
  if (t) return { kind: 'single', lang: 'ta', text: t };
  return { kind: 'empty' };
}

/** Plain-text version of a pair, for `<title>` and meta tags. */
export function pairText(p: Pair, prefer: 'en' | 'ta' = 'en'): string {
  if (p.kind === 'both') return prefer === 'en' ? p.en : p.ta;
  if (p.kind === 'single') return p.text;
  return '';
}

const DATE_FORMATS: Record<'en' | 'ta', Intl.DateTimeFormat> = {
  en: new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
  ta: new Intl.DateTimeFormat('ta-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
};

export function formatDate(date: Date, lang: 'en' | 'ta' = 'en'): string {
  return DATE_FORMATS[lang].format(date);
}

/** `2027-09-18`, for `<time datetime>`. */
export function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

/**
 * Formats a date range, collapsing a same-day range to a single date and
 * eliding a repeated month ("18–19 September 2027").
 */
export function formatDateRange(start: Date, end: Date | undefined, lang: 'en' | 'ta' = 'en'): string {
  if (!end || start.valueOf() === end.valueOf()) return formatDate(start, lang);

  const sameMonth =
    start.getFullYear() === end.getFullYear() && start.getMonth() === end.getMonth();

  if (sameMonth && lang === 'en') {
    return `${start.getDate()}–${formatDate(end, lang)}`;
  }
  return `${formatDate(start, lang)} – ${formatDate(end, lang)}`;
}

/**
 * Editors use an em dash, a hyphen, or "n/a" to mean "this field doesn't
 * apply" — the sample review ships with `translator: "—"`. Treat those as
 * empty so the template omits the line rather than printing a stray dash.
 */
export function meaningful(value?: string): string | undefined {
  if (!value) return undefined;
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  if (/^[-–—]+$/.test(trimmed)) return undefined;
  if (/^(n\/?a|none|tbc|tbd)$/i.test(trimmed)) return undefined;
  return trimmed;
}

/** Split events into upcoming and past, each in a sensible reading order. */
export function partitionEvents(events: CollectionEntry<'events'>[]) {
  // `status` is the explicit editor-controlled field in the CMS, so it wins
  // over comparing `date` to today.
  const upcoming = bySoonest(events.filter((e) => e.data.status === 'upcoming'));
  const past = byNewest(events.filter((e) => e.data.status === 'past'));
  return { upcoming, past };
}
