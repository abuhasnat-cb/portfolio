# Changelog

## 2026-10-28 — Posts mobile row + sheet modal polish

- Home/list rows: index stays inline with title on mobile; date under title (title-aligned); removed §04 `(n)` count; tighter sans semibold titles / faint dates.
- Modal: ≤640px full-viewport sheet (no padded card); desktop keeps centered panel.
- `/posts` index: breadcrumb + plain Posts heading (no blurb/count).
- e2e asserts mobile index/title/date geometry. Mockup HTML re-attach still needed for pixel HTML renders.

## 2026-10-28 — Posts UI mockup alignment

- Soft modal portals to `document.body` with fixed full-viewport backdrop + body scroll lock (fixes `.fx` transform containing-block trap).
- List rows Stack-aligned; `/posts` breadcrumb + chrome; author (LinkedIn ↗ + Email me); Older → card; Back to posts; date · read time / tags meta.
- e2e asserts modal overlay covers the viewport and mounts under `body`.

## 2026-10-28 — Full Posts feature

- Landing §04 Posts (latest 3 rows + View all); `/posts` list; History-API soft modal + standalone page (ADR 0013).
- Author block + Older card; Cobalt accent; light/dark; mobile; axe AA on post page.
- Zod schema + `pnpm post:check` (CI); posts as `src/content/posts/<slug>.json`.
- SEO/AEO: per-post meta/OG/Twitter/canonical, BlogPosting + BreadcrumbList (+FAQPage), sitemap lastmod, `/posts/feed.xml`, llms.txt, `/posts/<slug>.md`.
- Removed spike posts; added three `[SAMPLE]` placeholders for preview (delete later).
- Playwright `posts.spec.ts` at `/` and `/portfolio`.

## 2026-10-28 — Posts intercepting-routes spike (ADR 0013)

- Tried `@modal` + `(.)posts/[slug]`: `next build` hard-fails under `output: 'export'`.
- Spike substitute: History-API soft modal on home + static `app/posts/[slug]` standalone; `withBasePath` for `/portfolio`.
- Throwaway posts `spike-alpha` / `spike-beta`; minimal §04 teaser; Stack→05 / Contact→06.
- Playwright `posts-spike.spec.ts` on root and Pages base-path configs.
- Protocol + plan updated; full Posts feature still pending.

## 2026-10-28 — Blog posts protocol + ADR 0012

- Added mandatory [`.ai-context/posts-protocol.md`](posts-protocol.md): intake checklist, field rules, content rules, pre-PR self-check, example JSON (marked example-only).
- ADR 0012 locks Posts IA (landing §04, `/posts`, intercepting modal + standalone page), spike-before-feature gate, JSON intake + planned `pnpm post:check`, and generated SEO/AEO artifacts.
- `AGENTS.md` and `.ai-context/README.md` point at the protocol; plan lists spike then feature (no schema/script/UI in this change).

## 2026-10-22 — OG image, resume URL, AI-native meta

- Static `public/og.png` (1200×630) with source in `design/og/`; OG/Twitter + JSON-LD image wired (base-path aware).
- `profile.resumeUrl` → Google Drive; Resume CTA in header/contact/agent markdown/`index.md`/`llms.txt`.
- Meta title/description use **AI-native Software Engineer** (visible hero/about unchanged).
- Dark `--faint` `#7c7c84` (4.81:1 on `#09090b`). ADR 0011.

## 2026-10-22 — QA polish (tokens, favicon, canonical)

- Email me matches header primary control geometry.
- Type scale floor 13px; body 15px; muted/faint contrast ≥4.5:1 (light + dark).
- Mobile header icon-only below 420px; current experience date under role on small screens.
- AO favicon set (ico / 32png / svg / apple-touch); AO aria-label “Abu Hasnat Ovee, home”.
- `seo.siteName` SSOT; canonical + og:url always `https://oveehasnat.com/` (preview stays noindex).
- E2E: no console/404 on load, header 360/400, axe AA; unit contrast test. ADR 0010.

## 2026-10-22 — Concept-b-v9 UI polish

- About: tech terms and stats in Geist Mono (neutral); section `01` keeps accent.
- Experience: earlier work shows role title only (CodersBucket + Education unchanged).
- Stack: no pills — plain mono, comma-separated; label grid so names never wrap under the index.
- Projects: `visibleTags` on cards; full `tags` still feed JSON-LD / llms.txt / index.md; Simply Eloped live link.
- Human/Agent: icon-only toggle with tooltips / aria-labels; equal height with Get in touch / Resume.
- Smooth scroll with sticky-header offset; reduced-motion disables it; fluid type/spacing tokens; compact mobile header (40px targets).
- Playwright coverage for heights, tooltips, 360/390 overflow, toggle, reduced motion. ADR 0009.

## 2026-10-22 — Pages deploy blocked by environment branch policy

- After Pages Source = GitHub Actions, build succeeds but deploy fails: `github-pages` environment allows only `main`. Owner must allow `develop`.

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
