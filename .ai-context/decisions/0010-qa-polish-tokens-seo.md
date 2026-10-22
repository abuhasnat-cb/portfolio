# 0010. QA polish: tokens, favicons, production canonical

## Status

Accepted

## Context

Post-v9 QA found squeezed mobile header controls, a missing favicon (console 404), muted grey below WCAG AA, inconsistent site naming, and preview builds rewriting the canonical to github.io.

## Decision

- **Type scale:** `--text-min: 13px` floors all UI type (tags, mono, dates, badges). Body stays 15px; drop any 15.5px leftovers.
- **Contrast:** light `--muted` / `--faint` = `#6b6b70` (≥4.5:1 on white); dark `--faint` = `#9a9aa3`. Covered by a unit contrast test + axe on home.
- **Favicons:** `favicon.ico`, `icon.png` (32), `icon.svg`, `apple-touch-icon.png` (180) from the AO mark in `public/`, wired via Metadata `icons` and `app/manifest.ts` (basePath-aware via `metadataBase` = deploy origin).
- **Site name:** `seo.siteName = "Abu Hasnat Ovee"` is the single brand string for title template, OG `siteName`, JSON-LD `WebSite.name`, and the web manifest.
- **Canonical / og:url:** always `https://oveehasnat.com/` (from `seo.canonical`), including on the noindex GitHub Pages preview. Deploy `SITE_URL` still drives asset/base links and markdown absolute URLs for that host.
- **Header / contact:** shared `header-control` height on Email me and header CTAs; below 420px contact/resume become icon-only with aria-label + title.

## Consequences

- Preview HTML advertises the production canonical while remaining `noindex`.
- Host-root `/favicon.ico` on `*.github.io` (outside `/portfolio`) cannot be served by a project Pages site; in-app icon links under the base path must 200.
