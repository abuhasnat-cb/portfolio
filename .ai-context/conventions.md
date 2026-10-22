# Conventions

## Code

- TypeScript **strict**; no `any` without a comment.
- Prefer Server Components; mark `"use client"` only for interactivity (theme, mode, expand, clock, copy).
- Content strings may use inline markup: `==stat==` (emphasized number), `**bold**`. About numbers stay **neutral** (no Cobalt).
- Fonts and accent: change only CSS variables / `@theme` tokens in `globals.css` (and geist imports in `layout.tsx`).
- Use `cn()` from `src/lib/utils.ts` for class merging.
- Do not invent phone numbers, repo links, or project images.

## Git

- Branch from `develop`: `cursor/<descriptive-name>`.
- PR into `develop`; never force-push shared branches; delete branch after merge.
- Every PR updates `.ai-context/` per the protocol.

## Content edits

1. Edit the right file under `src/content/`.
2. Run `pnpm generate` (or rely on `prebuild`).
3. Confirm Human view, Agent view, `/index.md`, and `/llms.txt` still agree.

## SEO / AEO checklist

Use this on every meaningful content or head change:

- [ ] Unique title + description (layout metadata)
- [ ] Canonical URL
- [ ] Open Graph + Twitter tags (`/og.png`, 1200×630; source in `design/og/`)
- [ ] `<link rel="alternate" type="text/markdown" href="/index.md">`
- [ ] JSON-LD `@graph`: Person (with `alternateName`), WebSite, ProfilePage, ItemList of projects, Organizations
- [ ] Semantic headings (`h1` once; section `h2`s)
- [ ] `public/llms.txt` + `public/index.md` regenerated
- [ ] `sitemap.xml` + `robots.txt` present
- [ ] No phone numbers; project links live-only

## Accessibility

- Prefer roles already used in the mockup (`radiogroup` for mode, `aria-expanded` on Show all).
- Visible focus rings via `:focus-visible`.
- Honor `prefers-reduced-motion` for fades and entrance animation.
- Mobile 390px: no horizontal overflow.

## Commits

Imperative mood, scoped when helpful (`content:`, `ci:`, `docs:`). Docs updates ship in the same PR as the code.
