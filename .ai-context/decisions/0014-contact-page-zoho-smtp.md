# 0014. Dedicated contact page and Zoho SMTP worker

## Status

Accepted

## Context

Hiring CTAs should land on a dedicated route with a validated form, not only `mailto:`. The site is a static Next export on Cloudflare Pages / GitHub Pages, so SMTP credentials cannot live in the client or static bundle.

## Decision

- Add `/contact/` with page-specific metadata (OG/Twitter/canonical via `buildPageMetadata`).
- Point **Hire me** header and section CTAs to `/contact/`; keep `mailto:` on the email copy only.
- Contact form POSTs to `getContactApiUrl()`:
  - Production Cloudflare Pages: same-origin `/api/contact` (`functions/api/contact.ts`).
  - GitHub Pages preview: `NEXT_PUBLIC_CONTACT_API_URL=https://oveehasnat.com/api/contact`.
- Implement shared handler in `contact-api/src/index.ts` (nodemailer + Zoho SMTP, Zod validation, CORS for `oveehasnat.com` and `abuhasnat-cb.github.io`).
- Optional CI deploy: `.github/workflows/deploy-contact-api.yml` when `ENABLE_CONTACT_API_DEPLOY=true`; SMTP secrets live in Cloudflare only.

## Consequences

- Email send stays disabled until Cloudflare Worker/Page Function secrets are configured.
- Document env var names in `contact-api/README.md` and PR notes.
