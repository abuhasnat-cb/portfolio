# 0013. Posts soft modal via History API (static export)

## Status

Accepted (spike finding; amends ADR 0012 intercepting-routes delivery)

## Context

ADR 0012 required a spike proving Next.js intercepting + parallel routes (`@modal`, `(.)posts/[slug]`) under `output: 'export'` at `/portfolio` and at `/`.

## Decision

**Native intercepting routes are not viable** with this stack:

- `next build` with `output: 'export'` **hard-fails** when an intercepting route folder is present:  
  `Intercepting routes are not supported with static export`  
  (documented unsupported feature; relies on rewrites that need a server).

**Spike substitute (works at both base paths):**

1. Standalone ranking page: `app/posts/[slug]/page.tsx` + `generateStaticParams` (hard load / refresh).
2. Soft-nav modal on home: client `history.pushState` to `/posts/<slug>/` (via `withBasePath`), keep home mounted, show overlay; Close / Back uses `history.back()`.
3. Playwright e2e covers modal open + URL, close, direct load, refresh — root and `/portfolio`.

Throwaway sample posts: `spike-alpha`, `spike-beta` (remove or replace when the real feature lands).

## Consequences

- Do **not** add `@modal/(.)posts/...` to this repo while `output: 'export'` remains.
- Full Posts feature should keep the History-API soft modal + standalone page pattern (or abandon modal UX). Update [posts-protocol.md](../posts-protocol.md) chrome checklist to match when implementing the feature.
- Parallel `@modal` slots alone are not required for this pattern.
