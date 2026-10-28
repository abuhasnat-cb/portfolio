# Agent context protocol

This directory is the shared memory for humans and coding agents working on the portfolio.

## Before you start

1. Read [`project.md`](project.md) — goals, audience, scope, non-goals.
2. Read [`plan.md`](plan.md) — what is in flight and what is next.
3. Read the **latest** session note under [`sessions/`](sessions/).
4. Skim recent ADRs in [`decisions/`](decisions/) that touch your area.
5. If you will change structure or tooling, also read [`architecture.md`](architecture.md) and [`conventions.md`](conventions.md).
6. If the task is a **blog post**, read [`posts-protocol.md`](posts-protocol.md) and ADR 0012 before touching anything. That checklist is mandatory.

## During work

- Prefer editing `src/content/` over UI copy.
- When you make a **new choice** (stack, design, privacy, CI, hosting), add an ADR: `.ai-context/decisions/NNNN-short-title.md` (next free number).
- Keep [`plan.md`](plan.md) accurate: mark items done, add blockers or follow-ups.
- New or updated posts: follow [`posts-protocol.md`](posts-protocol.md) only (validate → `src/content/posts/<slug>.json` → PR into `develop`).

## Before you finish

A change is **not done** until:

1. [`changelog.md`](changelog.md) has an entry for this change.
2. A session note exists under `sessions/YYYY-MM-DD-topic.md`.
3. [`plan.md`](plan.md) checkboxes reflect reality.
4. The PR includes these doc updates (see `.github/PULL_REQUEST_TEMPLATE.md`).

## Git workflow reminder

Feature branch off `develop` → PR into `develop` → merge when CI is green → delete the branch. Never push to `develop` or `main` directly. See root [`AGENTS.md`](../AGENTS.md).
