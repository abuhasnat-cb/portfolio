## Summary

<!-- What does this PR change and why? -->

## Docs checklist (required)

A change is not done until the docs are updated.

- [ ] Read `.ai-context/README.md` and the latest session note before starting
- [ ] Updated `.ai-context/plan.md` (tick completed work / add new items)
- [ ] Added or updated an ADR in `.ai-context/decisions/` for any new decision
- [ ] Added a `.ai-context/changelog.md` entry
- [ ] Added or updated a session note under `.ai-context/sessions/`
- [ ] Updated `.ai-context/project.md` / `architecture.md` / `conventions.md` if scope or conventions changed

## Verification

- [ ] `pnpm typecheck`
- [ ] `pnpm lint`
- [ ] `pnpm format:check`
- [ ] `pnpm test`
- [ ] `pnpm build`
- [ ] `pnpm test:e2e` (after build)
- [ ] CI green on this PR

## Privacy / content

- [ ] No phone number anywhere
- [ ] Project links are live URLs only (no repo/code links)
- [ ] Resume button hidden when `profile.resumeUrl` is empty
