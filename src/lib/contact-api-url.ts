const PRODUCTION_CONTACT_API = "https://oveehasnat.com/api/contact";

/**
 * Client-safe contact form POST target (NEXT_PUBLIC_* only).
 * GitHub Pages cannot run API routes; preview builds must set
 * NEXT_PUBLIC_CONTACT_API_URL to the deployed Cloudflare worker.
 */
export function getContactApiUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_CONTACT_API_URL?.trim();
  if (fromEnv) return fromEnv.replace(/\/$/, "");

  const basePath = process.env.NEXT_PUBLIC_BASE_PATH?.trim() ?? "";
  const hasBasePath = Boolean(basePath && basePath !== "/");
  if (hasBasePath) {
    return PRODUCTION_CONTACT_API;
  }

  return "/api/contact";
}
