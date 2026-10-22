# Session — 2026-10-22 GitHub Pages preview

## Goal

Ship a temporary preview at https://abuhasnat-cb.github.io/portfolio/ without changing the default Cloudflare-ready root build.

## What we did

- Added `src/lib/site-env.ts` (`NEXT_PUBLIC_BASE_PATH`, `SITE_URL`, `withBasePath`, preview detection).
- Wired `next.config` `basePath`, content URL overrides, generators, layout robots, Agent view links.
- Added `.github/workflows/pages.yml` (build + deploy-pages on `develop`).
- Added base-path e2e (`playwright.pages.config.ts`) and CI job `Base-path Pages e2e`.
- Documented ADR 0008, plan, changelog.

## Follow-ups for the owner

- Flip Pages source to **GitHub Actions** if not already set (workflow now passes `enablement: true` to `configure-pages`, which may create the site automatically when the token allows).
- After first successful deploy, confirm https://abuhasnat-cb.github.io/portfolio/

## Status

First post-merge Pages run failed: Pages site not found. Follow-up: `enablement: true` on configure-pages.
