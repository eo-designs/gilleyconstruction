/**
 * Media URL resolver.
 *
 * In local dev (no R2 base URL set, OR NEXT_PUBLIC_USE_R2 !== "true"):
 *   returns local public path: /assets/gallery/<sub>/<file>
 *
 * In production with R2 enabled:
 *   returns CDN URL: <NEXT_PUBLIC_R2_PUBLIC_BASE_URL>/<sub>/<file>
 *
 * The "key" used in R2 mirrors the public/assets/gallery layout exactly,
 * so files in `public/assets/gallery/local/foo.jpg` upload to
 * `<bucket>/local/foo.jpg`.
 */

const ASSET_PREFIX = "/assets/gallery";

function shouldUseR2(): boolean {
  // Force off when explicitly disabled
  if (process.env.NEXT_PUBLIC_USE_R2 === "false") return false;

  // Force on when explicitly enabled (useful for prod previews / overrides)
  if (process.env.NEXT_PUBLIC_USE_R2 === "true") return true;

  // Default: use R2 only on Vercel production deployments
  return process.env.VERCEL_ENV === "production";
}

function getR2BaseUrl(): string | undefined {
  const url = process.env.NEXT_PUBLIC_R2_PUBLIC_BASE_URL?.trim();
  if (!url) return undefined;
  return url.replace(/\/+$/, "");
}

/**
 * Resolve a media path. Accepts either:
 *   - a sub-path under public/assets/gallery (e.g. "local/commercial_1.jpeg")
 *   - a full local URL (e.g. "/assets/gallery/local/commercial_1.jpeg")
 */
export function mediaUrl(pathOrKey: string): string {
  // Normalize: strip leading slashes and any "/assets/gallery/" prefix
  let key = pathOrKey.trim().replace(/^\/+/, "");
  if (key.startsWith("assets/gallery/")) {
    key = key.slice("assets/gallery/".length);
  }

  if (shouldUseR2()) {
    const base = getR2BaseUrl();
    if (base) return `${base}/${key}`;
  }

  return `${ASSET_PREFIX}/${key}`;
}

/** Convenience helpers that mirror the original projects.ts shape. */
export const localMedia = (file: string) => mediaUrl(`local/${file}`);
export const liveMedia = (file: string) => mediaUrl(`live/${file}`);
