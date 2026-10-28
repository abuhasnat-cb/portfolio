# Plan

## Done

- [x] Scaffold Next.js App Router + TS strict + Tailwind v4 + static export
- [x] Content layer (`src/content/*`) from mockup SITE + seo.json
- [x] chanhdai-inspired UI (768px column, hatch, dots, Human/Agent, Show all)
- [x] Generators: index.md, llms.txt, sitemap, robots, JSON-LD
- [x] Hide Resume while `resumeUrl` empty; no phone; live project links only
- [x] Vitest + Playwright + Lighthouse CI + linkinator + GitHub Actions
- [x] Agent context docs, PR template, README, MIT + chanhdai attribution
- [x] Temporary GitHub Pages preview at `/portfolio` (env-driven base path, noindex)
- [x] Concept-b-v9 UI (About mono, compact earlier roles, stack mono, visibleTags, icon toggle, fluid type/mobile header)
- [x] Owner: **Environments → github-pages → Deployment branches** allow `develop`
- [x] QA polish: favicons, contrast tokens, production canonical, mobile header/experience date, Email me parity

## Next

- [ ] Owner: enable branch protection on `develop` / `main` (require CI)
- [x] Owner: **Settings → Pages → Source = GitHub Actions** (set; `configure-pages` enablement alone was denied by the integration)
- [ ] Owner: Cloudflare Pages project → build `pnpm build`, output `out`, Node 22
- [x] Set `profile.resumeUrl` to Google Drive share link
- [x] Static OG image (`public/og.png` + `design/og/` source); wire meta + JSON-LD
- [ ] Replace AO mark placeholder with final logo SVG
- [ ] Point custom domain `oveehasnat.com` at Cloudflare Pages
- [ ] After production is live: disable or remove GitHub Pages preview workflow
- [x] Docs: posts protocol + ADR 0012 (intake checklist, locked UI/IA, no schema/UI yet)
- [x] **Spike:** intercepting routes **unsupported** with static export; History-API soft modal + `app/posts/[slug]` standalone proven at `/` and `/portfolio` (e2e); ADR 0013
- [ ] **Feature (after spike merge):** Posts §04 final UI (latest 3 + View all); `/posts` list; History-API modal + standalone (not Next intercept); author block; Older card; Zod + `pnpm post:check` + CI; generators (BlogPosting/BreadcrumbList/FAQPage, sitemap lastmod, `/posts/feed.xml`, llms.txt, `/posts/<slug>.md`); remove `spike-*` sample posts

## Parking lot

- Optional project detail routes (currently single page only)
- Amplitude / analytics (not required for v1)
- First real post JSON via posts protocol (after feature ships)
