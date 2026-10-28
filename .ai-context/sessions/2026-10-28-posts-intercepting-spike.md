# Session — Posts intercepting-routes spike (2026-10-28)

## Goal

Prove `@modal` + `(.)posts/[slug]` under static export at `/` and `/portfolio`, with e2e. Docs + minimal UI only.

## Finding

**Does not work.** `next build` with `output: 'export'` errors:

`Intercepting routes are not supported with static export`

No basePath-specific issue — failure is framework-level before export.

## What works (shipped on this branch)

- Standalone `app/posts/[slug]` + `generateStaticParams` (direct load / refresh).
- Home soft modal via `history.pushState` / `back` and `withBasePath` (URL `/posts/<slug>/` or `/portfolio/posts/<slug>/`).
- Throwaway `spike-alpha` / `spike-beta`; minimal §04 teaser; Stack 05 / Contact 06.
- e2e `posts-spike.spec.ts` green on root and Pages configs.
- ADR 0013; protocol / plan / changelog updated.

## Follow-ups

- Merge spike, then full Posts feature on History-API pattern (not Next intercept).
- Remove spike sample posts when real content lands.
- Do not merge this PR from the agent (owner/reviewer merges).
