# Changelog

## 2026-10-22 — CI pnpm setup fix

- Removed explicit `version: 10` from `pnpm/action-setup` so CI uses `packageManager` from `package.json` (avoids ERR_PNPM_BAD_PM_VERSION).

## 2026-10-22 — Initial portfolio setup

- Scaffolded Next.js 15 (App Router) with static export, TypeScript strict, Tailwind v4, geist fonts, next-themes.
- Added `src/content/` as the single source of truth and generators for `/index.md`, `/llms.txt`, sitemap, robots, JSON-LD.
- Implemented concept-b-v8 UI: 768px column, hatch/dots, Human/Agent toggle, Show all projects, Cobalt accent (~10%), Resume hidden while URL empty.
- Added Vitest, Playwright, Lighthouse CI, linkinator, and GitHub Actions CI on `develop`/`main`.
- Added agent context docs (`.ai-context/`), `AGENTS.md`, PR template, README, MIT license with chanhdai attribution.
