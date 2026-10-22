# Architecture

## Stack

| Layer         | Choice                                                          |
| ------------- | --------------------------------------------------------------- |
| Framework     | Next.js 15 App Router, TypeScript strict                        |
| Output        | `output: 'export'` → static `out/` for Cloudflare Pages         |
| Styling       | Tailwind CSS v4 + portfolio CSS tokens in `src/app/globals.css` |
| Fonts         | `geist` package → `--font-geist-sans` / `--font-geist-mono`     |
| Theming       | `next-themes` (`class` strategy, light/dark)                    |
| Motion        | CSS keyframes; respect `prefers-reduced-motion`                 |
| UI primitives | shadcn patterns only where needed (`cn`, small client controls) |

## Content pipeline

```
src/content/*.ts  →  content object
        │
        ├─ React page (Human + Agent views)
        ├─ JSON-LD (@graph)
        └─ scripts/generate-static.ts → public/{index.md,llms.txt,sitemap.xml,robots.txt}
                                          └─ copied into out/ on build
```

- `src/content/types.ts` — shared strict types.
- `src/content/index.ts` — exports `content`.
- Generators live in `src/lib/markdown.ts` and `src/lib/json-ld.ts`.
- `pnpm generate` / `prebuild` writes public artifacts from content.

## App structure

```
src/
  app/           # layout, page, globals.css, not-found
  components/
    portfolio/   # header, sections, agent view, shell
    theme-provider.tsx
    json-ld.tsx
  content/       # static data
  lib/           # markdown, json-ld, rich-text, utils
```

## Hosting

**Production (default):** Cloudflare Pages serves `out/` with build `pnpm build`, output `out`, Node 22. No Node server. Trailing slashes enabled. Env unset → site at domain root, `https://oveehasnat.com`.

**Temporary preview:** On push to `develop`, `.github/workflows/pages.yml` builds with `NEXT_PUBLIC_BASE_PATH=/portfolio` and `SITE_URL=https://abuhasnat-cb.github.io/portfolio`, then deploys via GitHub Pages (`configure-pages` / `upload-pages-artifact` / `deploy-pages`). Preview is noindex. See ADR 0008.

Site URL and base path are resolved in `src/lib/site-env.ts` and applied in `next.config.ts`, `src/content/index.ts`, generators, and layout metadata.

## Testing layers

1. **Vitest** — content schema, phone ban, markdown/JSON-LD generators, build artifact checks.
2. **Playwright** — against `serve out`: render, theme, Show all/less, Human/Agent, 390px overflow, no console errors.
3. **Lighthouse CI** — SEO / a11y / performance budgets on static dist.
4. **linkinator** — internal links under `out/`.

## Attribution

Layout utilities adapted from [chanhdai.com](https://github.com/ncdai/chanhdai.com) (MIT). See `LICENSE`.
