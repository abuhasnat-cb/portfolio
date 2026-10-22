# Agent instructions

**Read [`.ai-context/README.md`](.ai-context/README.md) first** before changing anything in this repository.

That file is the protocol: what to read before work, what to update during work, and what to write before finishing. A change is not done until the docs are updated, and every PR must include those doc updates.

## Git workflow (permanent)

1. Create a feature branch off `develop` for every change.
2. Open a pull request **into `develop`**.
3. Merge only when all CI checks pass.
4. Delete the feature branch after merge.
5. **Never push directly to `develop` or `main`.**

## Quick pointers

| Topic                      | Where                         |
| -------------------------- | ----------------------------- |
| Goals, audience, non-goals | `.ai-context/project.md`      |
| System shape               | `.ai-context/architecture.md` |
| Code & SEO conventions     | `.ai-context/conventions.md`  |
| Current plan               | `.ai-context/plan.md`         |
| Decision records           | `.ai-context/decisions/`      |
| Changelog                  | `.ai-context/changelog.md`    |
| Session notes              | `.ai-context/sessions/`       |

Site copy lives in `src/content/`. Do not hardcode profile data in components.
