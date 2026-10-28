---
title: [SAMPLE] Notes on static export
slug: sample-static-notes
date: 2026-10-27
description: PLACEHOLDER sample about static Next.js export for portfolio previews. Not real advice copy. Remove this JSON when real posts are ready to publish.
tags: sample, placeholder, next.js, static-export
canonical: https://oveehasnat.com/posts/sample-static-notes
updated: 2026-10-27
author: Abu Hasnat Ovee
---

# [SAMPLE] Notes on static export

_2026-10-27_

PLACEHOLDER notes used to fill the Posts list during feature preview. The site stays a static export on GitHub Pages and later Cloudflare Pages. Delete this sample when real posts arrive.

## PLACEHOLDER  -  static export notes

This file is a **sample** for UI and SEO wiring. It is not finished writing.

Static export means every route is an HTML file at build time. Soft modals use the History API because Next intercepting routes are not supported with `output: 'export'`.

```bash
pnpm build
pnpm post:check src/content/posts/sample-static-notes.json
```

Remove `src/content/posts/sample-static-notes.json` after preview sign-off.

