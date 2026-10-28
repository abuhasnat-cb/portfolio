# Session — Blog posts protocol + ADR 0012 (2026-10-28)

## Goal

Docs-only: lock a mandatory agent protocol and ADR for blog posts so future post PRs share one checklist. No schema, `post:check` script, or UI.

## Done

- Added `.ai-context/posts-protocol.md` (intake steps, locked UI/IA, fields, generated artifacts, content rules, pre-PR self-check, example JSON marked example-only).
- Added ADR 0012 (Posts architecture, spike-before-feature, intake + generators).
- Pointed `AGENTS.md` and `.ai-context/README.md` at the protocol; noted plan in `architecture.md` / `conventions.md`.
- Plan: spike (intercepting routes @ `/portfolio` and `/` + e2e) then full feature; docs item checked done.
- Changelog entry for 2026-10-28.

## Not done (intentional)

- Zod schema, `pnpm post:check`, CI hook
- Landing §04 / `/posts` / modal / standalone page
- RSS, per-post markdown, BlogPosting JSON-LD, etc.

## Follow-ups

1. Spike branch for intercepting + parallel routes on static export (both base paths).
2. Feature PR after spike is green.
3. First real post via the protocol.
