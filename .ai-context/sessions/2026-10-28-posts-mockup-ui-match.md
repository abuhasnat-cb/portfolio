# Session — Posts UI match locked mockups (2026-10-28)

## Goal

Pixel-align Posts surfaces to locked HTML mockups (Drive archive `portfolio-posts-mockups-locked.tar.gz`), commit mockups to `.ai-context/mockups/posts/`, produce Playwright compare PNGs, PR into `develop` (no merge).

## Done

- Downloaded mockup tar from Google Drive (`1ivF5_W3Eef9VAyDGr5oEVYDmC2cthx0W`); no phone numbers in archive.
- Committed `home.html`, `list.html`, `modal.html`, `post.html`, `site.css`, `live.html` under `.ai-context/mockups/posts/` (prettier ignore).
- Restyled implementation to mockup class system: `.plist` / `.prow` / `.pnum` / `.ptitle` / `.pmeta`, `#posts .viewall`, modal `.overlay` pattern (portal on `body`), `.article` + `.prose`, `.author`, `.navpn`, `.posts-crumb`.
- Title + date only in list and article header (no read time / tags / description in UI).
- Compare script: `pnpm exec node scripts/posts-mockup-compare.mjs` → `/opt/cursor/artifacts/posts-mockup-compare/*-{390-light,390-dark,1440-light}-compare.png`.
- Local CI: unit + build + e2e + links green (Playwright browsers installed in agent env).

## Remaining visual / content deltas (honest)

- Mockups use **example post copy** (5 rows on `/posts`); site still shows **3 `[SAMPLE]`** posts with different titles, dates, and body text.
- Standalone page keeps **Markdown version** link (SEO parity; not in mockup HTML).
- `live.html` is a reference full-home export without §04 Posts (pre-feature snapshot); not used for row/modal compares.
- Sub-pixel/font rendering may differ slightly from mockup HTML that loads production CSS from GitHub Pages.

## Follow-ups

- Owner visual review of compare PNGs; merge PR when satisfied.
- Replace `[SAMPLE]` posts with real JSON via posts protocol.
- Optional: add compare script to CI or release checklist (manual for now).
