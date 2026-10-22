# Plan

## Done

- [x] Scaffold Next.js App Router + TS strict + Tailwind v4 + static export
- [x] Content layer (`src/content/*`) from mockup SITE + seo.json
- [x] chanhdai-inspired UI (768px column, hatch, dots, Human/Agent, Show all)
- [x] Generators: index.md, llms.txt, sitemap, robots, JSON-LD
- [x] Hide Resume while `resumeUrl` empty; no phone; live project links only
- [x] Vitest + Playwright + Lighthouse CI + linkinator + GitHub Actions
- [x] Agent context docs, PR template, README, MIT + chanhdai attribution

## Next

- [ ] Owner: enable branch protection on `develop` / `main` (require CI)
- [ ] Owner: Cloudflare Pages project → build `pnpm build`, output `out`
- [ ] Owner: set `profile.resumeUrl` to Google Drive share link when ready
- [ ] Generate and host OG image; set `seo.ogImage`
- [ ] Replace AO mark placeholder with final logo SVG
- [ ] Point custom domain `oveehasnat.com` at Pages

## Parking lot

- Optional project detail routes (currently single page only)
- Amplitude / analytics (not required for v1)
