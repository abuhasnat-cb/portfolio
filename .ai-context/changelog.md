# Changelog

## 2026-10-22 — Pages redeploy after owner enablement

- Owner set **Settings → Pages → Source = GitHub Actions**. Docs/plan updated; merge to `develop` retriggers the preview deploy.

## 2026-10-22 — Pages workflow enablement

- Set `actions/configure-pages` `enablement: true` so the first deploy can create the Pages site when the API allows it.

## 2026-10-22 — GitHub Pages preview (/portfolio)

- Env-driven `NEXT_PUBLIC_BASE_PATH` and `SITE_URL` (defaults: root + `https://oveehasnat.com`).
- Preview deploy workflow on push to `develop` → https://abuhasnat-cb.github.io/portfolio/
- Preview is noindex (`robots` meta + `robots.txt` Disallow).
- Base-path Playwright e2e + ADR 0008.

## 2026-10-22 — CI pnpm setup fix

- Removed explicit `version: 10` from `pnpm/action-setup` so CI uses `packageManager` from `package.json` (avoids ERR_PNPM_BAD_PM_VERSION).

## 2026-10-22 — Initial portfolio setup

- Scaffolded Next.js 15 (App Router) with static export, TypeScript strict, Tailwind v4, geist fonts, next-themes.
- Added `src/content/` as the single source of truth and generators for `/index.md`, `/llms.txt`, sitemap, robots, JSON-LD.
- Implemented concept-b-v8 UI: 768px column, hatch/dots, Human/Agent toggle, Show all projects, Cobalt accent (~10%), Resume hidden while URL empty.
- Added Vitest, Playwright, Lighthouse CI, linkinator, and GitHub Actions CI on `develop`/`main`.
- Added agent context docs (`.ai-context/`), `AGENTS.md`, PR template, README, MIT license with chanhdai attribution.
