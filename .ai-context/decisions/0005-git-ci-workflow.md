# 0005. Git and CI workflow

## Status

Accepted

## Context

Need a safe default for humans and agents collaborating on a public portfolio repo.

## Decision

- All work lands on feature branches off `develop`, via PRs into `develop`.
- Never push directly to `develop` or `main`.
- Merge only when CI is green; delete the feature branch after merge.
- CI runs typecheck, ESLint, Prettier, Vitest, `next build`, Playwright, Lighthouse CI, and internal link checks on PRs/pushes to `develop` and `main`.

## Consequences

- Agents must open PRs (not push to protected branches).
- Owner should enforce branch protection that requires the CI status checks.
