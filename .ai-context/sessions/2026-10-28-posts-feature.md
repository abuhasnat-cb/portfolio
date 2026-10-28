# Session — Full Posts feature (2026-10-28)

## Goal

Ship the Posts feature per posts-protocol + ADR 0012/0013 (History-API soft modal, static standalone pages). No merge from the agent. Provide a pre-merge preview path.

## Done

- Zod schema + `pnpm post:check` (CI quality job)
- `src/content/posts/<slug>.json` loader; removed spike posts
- Three **[SAMPLE]** placeholder posts for preview (owner should delete later)
- Landing §04 (latest 3 + View all `.pmore`); Stack 05 / Contact 06
- `/posts` list; modal (Open page, Close, body, author, Older); standalone (Back to posts, same chrome)
- Generators: per-post meta/OG/Twitter/canonical, BlogPosting + BreadcrumbList + FAQPage, sitemap lastmod, `/posts/feed.xml`, llms.txt, `/posts/<slug>.md`
- e2e `posts.spec.ts` at `/` and `/portfolio`
- Docs: changelog, plan, this session note

## Sample posts to remove later

- `src/content/posts/sample-posts-preview.json`
- `src/content/posts/sample-static-notes.json`
- `src/content/posts/sample-agent-surfaces.json`

## Preview note

GitHub Pages workflow deploys only on **push to `develop`** (plus `workflow_dispatch`). Auto Pages URL after merge: `https://abuhasnat-cb.github.io/portfolio/`. Pre-merge live preview requires manually dispatching that workflow on this feature branch (temporarily replaces the develop preview until develop is redeployed).

## Follow-ups (mockup UI pass)

- Soft modal now uses `createPortal(..., document.body)` + `overflow: hidden` on `body` so the overlay is full-viewport (not trapped by `.fx` transform).
- Restyled list / modal / standalone / author / Older to locked mockups (Open page + Close; LinkedIn + Email me only; Back to posts; View all `.pmore`).
- e2e: portal parent is `body`, overlay `position:fixed` inset covering `innerWidth`×`innerHeight`, body scroll locked.
- Artifacts: `/opt/cursor/artifacts/posts-mockup-compare/` (1440 light/dark + 390 + side-by-side compares).

## Follow-ups (locked HTML mockup pass — in progress)

- User clarified stale PNGs; **source of truth is mockup HTML** (`home.html` / `list.html` / `modal.html` / `post.html` + `site.css`). Those files were **not present** on the Cloud Agent VM at `uploads/` (re-attach requested).
- Mobile home Posts fixes applied from explicit feedback + comparison shots: index inline with title; date under title (title-aligned); removed `(n)` from §04 heading; tighter type; kept `.pmore` View all; modal is a full-viewport sheet on ≤640px.
- `/posts` index: dropped intro blurb + count superscript to match list mockup comparisons.
- Still blocked on pixel-perfect HTML Playwright renders until the five mockup files are re-attached.

## Follow-ups

- Owner review + merge (agent does not merge)
- Delete sample posts; add real post JSON via protocol
- Cloudflare Pages production cutover
