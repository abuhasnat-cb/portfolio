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

Cloudflare Pages serves the `out/` directory (build command: `pnpm build`, output directory: `out`). No Node server. Trailing slashes enabled for Pages-friendly paths.

## Testing layers

1. **Vitest** — content schema, phone ban, markdown/JSON-LD generators, build artifact checks.
2. **Playwright** — against `serve out`: render, theme, Show all/less, Human/Agent, 390px overflow, no console errors.
3. **Lighthouse CI** — SEO / a11y / performance budgets on static dist.
4. **linkinator** — internal links under `out/`.

## Attribution

Layout utilities adapted from [chanhdai.com](https://github.com/ncdai/chanhdai.com) (MIT). See `LICENSE`.
