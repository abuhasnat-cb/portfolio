# Open Graph image

Static share card at [`public/og.png`](../../public/og.png) (1200×630). Source markup: [`og.html`](og.html).

## Re-render

From the repo root (requires Chromium / Playwright):

```bash
pnpm exec playwright install chromium   # once
node design/og/render.mjs
```

That opens `og.html` at a fixed 1200×630 viewport and overwrites `public/og.png`.
