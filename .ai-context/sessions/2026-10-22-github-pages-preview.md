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

- ~~Flip Pages source to **GitHub Actions**~~ — done by owner.
- **Environments → github-pages → Deployment branches**: add `develop` (or allow all branches). Build+artifact already succeeds; deploy is rejected with _Branch "develop" is not allowed to deploy to github-pages_.
- After that, re-run the failed Pages workflow (or merge any `develop` push) and confirm https://abuhasnat-cb.github.io/portfolio/

## Status

Pages Source enabled. Build job green; Deploy job fails on environment branch policy (`main` only). Bot cannot edit environment policies or re-run/dispatch workflows (403).
