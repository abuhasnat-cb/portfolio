/**
 * Site URL and base path — edit via env only.
 *
 * Defaults (Cloudflare / production):
 *   SITE_URL=https://oveehasnat.com
 *   NEXT_PUBLIC_BASE_PATH=   (empty → site at domain root)
 *
 * GitHub Pages preview:
 *   SITE_URL=https://abuhasnat-cb.github.io/portfolio
 *   NEXT_PUBLIC_BASE_PATH=/portfolio
 */

const PRODUCTION_ORIGIN = "https://oveehasnat.com";

/** Normalized base path: "" or "/portfolio" (no trailing slash). */
export function getBasePath(): string {
  const raw = process.env.NEXT_PUBLIC_BASE_PATH?.trim() ?? "";
  if (!raw || raw === "/") return "";
  const withSlash = raw.startsWith("/") ? raw : `/${raw}`;
  return withSlash.replace(/\/$/, "");
}

/** Absolute site origin including base path, no trailing slash. */
export function getSiteUrl(): string {
  const fromEnv = process.env.SITE_URL?.trim();
  if (fromEnv) return fromEnv.replace(/\/$/, "");
  const base = getBasePath();
  return base ? `${PRODUCTION_ORIGIN}${base}` : PRODUCTION_ORIGIN;
}

/** True for non-production previews (GitHub Pages, etc.). */
export function isPreviewDeploy(): boolean {
  const url = getSiteUrl();
  if (getBasePath() !== "") return true;
  try {
    const host = new URL(url).hostname;
    return host !== "oveehasnat.com" && host !== "www.oveehasnat.com";
  } catch {
    return true;
  }
}

/** Prefix a root-relative path with the base path (client + server safe). */
export function withBasePath(path: string): string {
  const base = getBasePath();
  if (!path.startsWith("/") || path.startsWith("//")) return path;
  if (!base) return path;
  if (path === "/") return `${base}/`;
  return `${base}${path}`;
}
