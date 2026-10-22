# Session — OG image, resume, AI-native meta (2026-10-22)

## Goal

Ship static OG share card, wire resume Drive URL, dark faint contrast, and AI-native meta title/description without changing visible hero/about copy.

## Done

- Copied attached `og-dark.png` → `public/og.png`; kept `design/og/og.html` + `render.mjs` + README.
- `seo.ogImage`, layout OG/Twitter (1200×630, type, alt), JSON-LD Person/ProfilePage image.
- `profile.resumeUrl` set; Resume button already used new tab + noopener.
- Regenerated `public/index.md` / `llms.txt` via `pnpm generate`.
- Dark `--faint` → `#7c7c84`; unit + e2e meta/resume/base-path coverage.
- ADR 0011, changelog, plan updates.

## Full-stack leftovers (reported, not changed)

Visible / content strings that still say full-stack (or Full-stack):

- `profile.tagline`, `profile.role` casing (`AI-Native`), about body unchanged by request
- `experience.current.role` (`Software Engineer · Full-stack`)
- JSON-LD `knowsAbout`: `Full-stack development`
- `seo.keywords`: `full-stack engineer`
- README / `.ai-context/project.md` framing copy
- Generated markdown/llms that mirror the above content fields

## Follow-ups

- Optional copy pass to retire “full-stack” in visible hero/about if desired
- Final logo SVG for AO mark
