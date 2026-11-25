# 0015. Revert dedicated contact page and form

## Status

Accepted

## Context

ADR 0014 shipped `/contact/`, Hire me CTAs, and a Zoho SMTP worker. After merge, the owner preferred the original on-page **Contact** section and `mailto:` / `#contact` navigation only.

## Decision

- Remove `/contact/`, contact form UI, `contact-api/`, and Pages `functions/api/contact.ts`.
- Restore header and posts chrome: **Get in touch** → `#contact` (with agent-mode scroll handler).
- Keep home **Contact** section as before: pitch, email copy, **Email me** `mailto:`.
- Retain minor root layout SEO from the same release (`formatDetection`); remove unused `buildPageMetadata` (no remaining consumers).

## Consequences

- No server-side contact endpoint in this repo until a future ADR.
- GitHub Pages preview no longer needs `NEXT_PUBLIC_CONTACT_API_URL`.
