# 0008. Temporary GitHub Pages preview

## Status

Accepted (temporary)

## Context

Production hosting remains Cloudflare Pages at `oveehasnat.com`. Until that project and DNS are ready, we need a shareable preview of the static export.

## Decision

- On every push to `develop`, a dedicated workflow builds with:
  - `NEXT_PUBLIC_BASE_PATH=/portfolio`
  - `SITE_URL=https://abuhasnat-cb.github.io/portfolio`
    and deploys to GitHub Pages via `configure-pages` → `upload-pages-artifact` → `deploy-pages`.
- Default / Cloudflare builds keep root base path and `https://oveehasnat.com` (env unset).
- Preview is **noindex**: robots meta `noindex, nofollow` and `robots.txt` `Disallow: /`, so it does not compete with the future production domain.
- Live preview URL: https://abuhasnat-cb.github.io/portfolio/

## Consequences

- The Pages workflow sets `configure-pages` `enablement: true`, but creating the site via the Actions token failed (*Resource not accessible by integration*).
- Owner set **Settings → Pages → Source = GitHub Actions** once; subsequent deploys use that site.
- Content URLs, JSON-LD, `index.md`, `llms.txt`, sitemap, and alternate links follow `SITE_URL`.
- Plain `<a href>` paths use `withBasePath()`; Next `Link` gets `basePath` automatically.
- When Cloudflare production is live, this preview can be disabled or removed; ADR can be superseded.
