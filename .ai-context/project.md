# Project

## Goals

Ship a fast, accessible, SEO/AEO-strong personal portfolio for **Abu Hasnat Ovee** that:

- Presents him as an AI-native full-stack software engineer (L2/L3).
- Is fully static (`next export` / `output: 'export'`) and hostable on Cloudflare Pages.
- Treats `src/content/` as the single source of truth for humans **and** agents (`/index.md`, `/llms.txt`, JSON-LD).

## Audience

1. **Recruiters and hiring managers** evaluating Software Engineer (L2/L3) candidates in Bangladesh or remote.
2. **AI agents / crawlers** that prefer structured markdown and schema.org over scraping HTML.

## In scope

- Single-page portfolio (Human view) matching the concept-b-v8 mockup (chanhdai-inspired).
- Fun Human/Agent toggle (Agent view = markdown of the same content).
- Static artifacts: `index.md`, `llms.txt`, `sitemap.xml`, `robots.txt`, JSON-LD.
- Light/dark theme (Cobalt accent), Geist fonts, reduced-motion support.
- CI: typecheck, lint, format, unit tests, static build, Playwright e2e, Lighthouse budgets, internal link check.
- Agent context docs under `.ai-context/`.
- **Planned:** blog Posts (§04 + `/posts` + intercepting modal) per ADR 0012 and [`.ai-context/posts-protocol.md`](posts-protocol.md) — spike first, then feature; not shipped yet.

## Non-goals / hard rules

- **No phone number** anywhere (content, HTML, markdown, JSON-LD, tests fixtures).
- **No repository or source-code links** on projects — live URLs only.
- **No project images** — text + tags only.
- **No chanhdai branding** — layout inspiration only; keep MIT attribution for adapted utilities.
- Resume Google Drive URL is configured in `profile.resumeUrl`; **hide the Resume button while empty**.
- Share card is the static `public/og.png` (1200×630); do not invent phone numbers.
- OG image is deferred (`seo.ogImage` stays `null` until later).

## Brand

- Name: Abu Hasnat Ovee (alternateName: Md. Abu Hasnat Ovee).
- Site: oveehasnat.com (Pages preview on `*.pages.dev` until DNS is wired).
- Accent: Cobalt `#3047c8` (light) / `#8fa2ff` (dark), ~10% of the UI.
- Column: 768px with hairline borders, hatch separators, dot-grid hero.
