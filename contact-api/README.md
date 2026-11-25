# Contact API (Cloudflare Worker)

Server-side handler for the portfolio contact form. Sends mail via **Zoho SMTP**; credentials never ship to the browser or static export.

## Environment variables / secrets

| Name                 | Required                     | Description                        |
| -------------------- | ---------------------------- | ---------------------------------- |
| `ZOHO_SMTP_HOST`     | No (default `smtp.zoho.com`) | Zoho SMTP host                     |
| `ZOHO_SMTP_PORT`     | No (default `587`)           | SMTP port (`587` or `465`)         |
| `ZOHO_SMTP_USER`     | Yes                          | Zoho mailbox used to send          |
| `ZOHO_SMTP_PASSWORD` | Yes                          | Zoho app password                  |
| `CONTACT_TO_EMAIL`   | Yes                          | Inbox that receives submissions    |
| `ALLOWED_ORIGINS`    | No                           | Extra comma-separated CORS origins |

Set these in **Cloudflare** (Worker secrets) or GitHub Actions secrets when using `.github/workflows/deploy-contact-api.yml` (enable with repository variable `ENABLE_CONTACT_API_DEPLOY=true`).

## Routes

- **Worker:** `wrangler deploy` → `https://portfolio-contact-api.<account>.workers.dev/` (custom route recommended: `https://oveehasnat.com/api/contact`)
- **Cloudflare Pages Function:** `functions/api/contact.ts` (same handler when Pages is configured with Functions + static `out/`)

## GitHub Pages preview

The static export cannot host this API. The Pages build sets `NEXT_PUBLIC_CONTACT_API_URL=https://oveehasnat.com/api/contact` so the preview form POSTs to the production worker (CORS allows `https://abuhasnat-cb.github.io`).

## Local dev

```bash
cd contact-api
pnpm install
# wrangler secret put ZOHO_SMTP_USER ...
pnpm dev
```
