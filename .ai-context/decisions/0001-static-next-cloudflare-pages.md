# 0001. Static Next.js on Cloudflare Pages

## Status

Accepted

## Context

The portfolio must be cheap to host, globally fast, and free of server runtime complexity. The eventual domain is oveehasnat.com; early previews use `*.pages.dev`.

## Decision

Use Next.js App Router with `output: 'export'`, `images.unoptimized: true`, and `trailingSlash: true`. Deploy the `out/` directory to Cloudflare Pages.

## Consequences

- No Route Handlers or SSR — all dynamic data is baked at build time from `src/content/`.
- `pnpm generate` writes agent/SEO files into `public/` before build.
- Preview URLs work without a Node server; custom domain is a later DNS step.
