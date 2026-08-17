/**
 * Extracts a YouTube video ID from any of its common URL shapes
 * (watch?v=, youtu.be/, /embed/, /shorts/), or returns undefined for
 * anything else (Vimeo, a link we don't recognise).
 */
export function youtubeId(url: string): string | undefined {
  try {
    const u = new URL(url);
    if (u.hostname === 'youtu.be') return u.pathname.slice(1) || undefined;

    if (u.hostname.endsWith('youtube.com')) {
      if (u.pathname === '/watch') return u.searchParams.get('v') ?? undefined;
      const match = u.pathname.match(/^\/(embed|shorts)\/([^/]+)/);
      if (match) return match[2];
    }
  } catch {
    // Not a parseable URL — let the caller fall back to a generic thumbnail.
  }
  return undefined;
}

/**
 * A thumbnail for a video entry that has no explicit `thumbnail` image.
 * YouTube serves a predictable static thumbnail per video ID with no API
 * key required; anything else (Vimeo, an unrecognised host) gets `undefined`
 * and the caller renders a generic placeholder instead.
 */
export function autoThumbnail(videoUrl?: string): string | undefined {
  if (!videoUrl) return undefined;
  const id = youtubeId(videoUrl);
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : undefined;
}
