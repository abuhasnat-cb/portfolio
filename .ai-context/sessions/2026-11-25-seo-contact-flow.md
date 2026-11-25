# Session — SEO + contact / hire flow

## Done

- `buildPageMetadata`; root layout `formatDetection`; `/contact/` OG/Twitter/canonical.
- Hire me CTAs → `/contact/`; form with Zod validation; Zoho SMTP worker + Pages Function.
- Pages build sets `NEXT_PUBLIC_CONTACT_API_URL`.

## Live verify (post-merge)

- `https://abuhasnat-cb.github.io/portfolio/contact/` — form UX, meta in view-source.
- Form submit → 503 until Cloudflare SMTP secrets; mailto fallback copy shown.