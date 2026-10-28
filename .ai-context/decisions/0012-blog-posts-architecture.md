# 0012. Blog posts architecture

## Status

Accepted (docs locked; implementation not started)

## Context

The portfolio is a single-page static export today. Ovee wants a Posts section and per-post URLs that still work on GitHub Pages (`/portfolio`) and later on Cloudflare Pages at the domain root. Agents will add posts as JSON; intake must be checklist-driven so fields, SEO, and privacy rules are not skipped. Intercepting routes + `output: 'export'` are unproven in this repo and must be spiked before the full feature.

## Decision

### Information architecture

- Landing section **04 Posts** sits between Projects (03) and Stack; Stack becomes **05**, Contact **06**.
- Landing shows the latest **3** posts as numbered rows (faint mono indices, Stack-aligned insets): title + date only, plus full-width **View all posts →** (Projects **Show all** styling). Accent remains Cobalt.
- `/posts` is a plain list (heading + same row pattern for all posts).
- Reading a post uses Next.js **parallel + intercepting routes** (`@modal`, `(.)posts/[slug]`): soft navigation opens a modal and sets `/posts/<slug>`; hard navigation / refresh renders the standalone page (canonical ranking URL).
- Modal: Open page + close, then title / date / body / author block / Older → card. Full page: Back to posts, then the same body + author + Older card.
- Author block: AO mark, name, `AI-native Software Engineer · Dhaka, BD`, LinkedIn + Email me only.

### Delivery order

1. **Spike branch** proving intercepting routes under static export at base path `/portfolio` and at `/`, with Playwright e2e for both. Full Posts UI waits on a green spike merge.
2. **Feature** implementing schema, intake script, UI, and generators.

### Content + intake

- Posts live as `src/content/posts/<slug>.json`.
- Required fields: `title` (≤60), `slug` (kebab-case, unique), `description` (140–160), `date` (ISO), `tags` (3–6), `summary` (2–3 sentences), `body` (markdown). Optional: `updated`, `cover` + `coverAlt`, `canonical` (default `https://oveehasnat.com/posts/<slug>`), `faq[]`, `draft`.
- Planned Zod schema + `pnpm post:check <file>`; agents validate in a loop, then PR into `develop`; CI runs the same check.
- Per-post generation: title/description, canonical, OG/Twitter, article times, BlogPosting (linked to existing Person), BreadcrumbList, optional FAQPage, sitemap `lastmod`, RSS `/posts/feed.xml`, `llms.txt` entry, `/posts/<slug>.md` for Human/Agent parity.
- Content rules: no phone; no repo links; never mention Medtouch AI, Vision Limo, Bigfish, Tavixa, HelloVacancy; real facts; plain wording; no em dashes; working links; fenced code declares a language.

Mandatory agent checklist: [`.ai-context/posts-protocol.md`](../posts-protocol.md).

## Consequences

- Section indices on the landing page will renumber when the feature ships; Agent markdown / `index.md` must follow.
- Static export + intercepting routes are a hard gate; if the spike fails, revisit modal approach before building intake UI.
- Post PRs stay content-only (`src/content/posts/*.json`) once the feature exists; schema/UI changes are separate.
- Privacy ADR 0007 extends to post bodies and metadata via the posts protocol.
