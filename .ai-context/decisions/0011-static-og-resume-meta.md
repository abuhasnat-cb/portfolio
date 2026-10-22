# 0011. Static OG image, resume URL, and AI-native meta

## Status

Accepted

## Context

Share previews needed a fixed 1200×630 card (not Next.js `ImageResponse`). The Resume CTA was still gated on an empty `resumeUrl`. Meta title/description still said “full-stack” while the owner headline is **AI-native Software Engineer**. Dark `--faint` needed a documented 4.81:1 target on `#09090b`.

## Decision

- **OG asset:** ship `public/og.png` (1200×630). Keep editable source at `design/og/og.html` plus `design/og/render.mjs` / README to re-screenshot with Playwright.
- **Meta:** `seo.ogImage = "/og.png"`; Next resolves against deploy `metadataBase` so production and GitHub Pages (`/portfolio`) both get absolute `og:image` / `twitter:image`. Include width, height, type `image/png`, and alt `Abu Hasnat Ovee, AI-native Software Engineer`. JSON-LD `Person` / `ProfilePage` use the production-canonical image URL.
- **Resume:** set `profile.resumeUrl` to the Google Drive share link; header + contact + generated markdown / llms.txt expose it (`target=_blank`, `rel=noopener`).
- **Meta role:** `seo.title` / `seo.description` (and thus OG/Twitter descriptions) use **AI-native Software Engineer**. Visible hero/about/tagline copy is unchanged in this change.
- **Contrast:** dark `--faint` = `#7c7c84` (≈4.81:1 on `#09090b`); light stays `#6b6b70`.

## Consequences

- Re-rendering the OG card is a manual `node design/og/render.mjs` step after HTML edits.
- Keywords and experience/role strings may still mention “full-stack”; that is intentional until a separate copy pass.
