# oveehasnat.com

Personal portfolio for **Abu Hasnat Ovee** — AI-native full-stack software engineer (Dhaka, BD).

Static Next.js App Router site (`output: 'export'`) built for Cloudflare Pages. Content lives in `src/content/` and also drives `/index.md`, `/llms.txt`, sitemap, robots, and JSON-LD.

## Quick start

```bash
pnpm install
pnpm dev          # generates static artifacts, then next dev
pnpm build        # static export → out/
pnpm start        # serve out/ locally
```

## Scripts

| Command             | Purpose                                                                |
| ------------------- | ---------------------------------------------------------------------- |
| `pnpm generate`     | Write `public/{index.md,llms.txt,sitemap.xml,robots.txt}` from content |
| `pnpm typecheck`    | `tsc --noEmit`                                                         |
| `pnpm lint`         | ESLint                                                                 |
| `pnpm format:check` | Prettier                                                               |
| `pnpm test`         | Vitest unit tests                                                      |
| `pnpm test:e2e`     | Playwright against `out/` (run `pnpm build` first)                     |
| `pnpm lhci`         | Lighthouse CI budgets                                                  |
| `pnpm links`        | Internal link check on `out/`                                          |
| `pnpm ci`           | Local approximation of the full pipeline                               |

## Content

Edit files under `src/content/`. Notable fields:

- `profile.resumeUrl` — Google Drive resume link; **leave empty to hide the Resume button**
- `seo.ogImage` — set when `/og.png` exists (TODO)

Hard rules: no phone numbers; project links are live URLs only; no project images.

## Design tokens

- Fonts: Geist Sans / Geist Mono (`geist` package → CSS variables → Tailwind theme)
- Accent: Cobalt `#3047c8` (light) / `#8fa2ff` (dark) in `src/app/globals.css`

Layout is inspired by [chanhdai.com](https://github.com/ncdai/chanhdai.com) (MIT); see `LICENSE`.

## Git workflow

Feature branch off `develop` → PR into `develop` → merge when CI is green → delete branch. Never push directly to `develop` or `main`.

Agents: read [`AGENTS.md`](AGENTS.md) and [`.ai-context/README.md`](.ai-context/README.md) first.

## Preview (GitHub Pages)

Temporary preview (until Cloudflare production is live):

- URL: https://abuhasnat-cb.github.io/portfolio/
- Deployed on every push to `develop` by `.github/workflows/pages.yml`
- Build uses `NEXT_PUBLIC_BASE_PATH=/portfolio` and `SITE_URL=https://abuhasnat-cb.github.io/portfolio`
- Marked **noindex** so it does not compete with `oveehasnat.com`

Owner must set **Settings → Pages → Source = GitHub Actions** once.

Local check:

```bash
pnpm build:pages
node scripts/prepare-pages-preview.mjs
pnpm test:e2e:pages
```

## Cloudflare Pages (production)

1. Connect this GitHub repo.
2. Build command: `pnpm build` (leave `NEXT_PUBLIC_BASE_PATH` / `SITE_URL` unset).
3. Output directory: `out`.
4. Node version: `22`.
5. Later: attach custom domain `oveehasnat.com`.

## License

MIT — see [`LICENSE`](LICENSE).
