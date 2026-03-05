# CRM and Email Integration Setup

This project now includes Cloudflare Pages Functions for:

- `/api/contact-submit`
  - sends VVS intake email
  - sends customer acknowledgement email
  - syncs HubSpot contact
  - creates a HubSpot ticket
- `/api/email-send`
  - sends Sunrise outbound emails through Resend
- `/api/zoho-ops`
  - powers Sunrise ODP (Operational Dashboard Panel)
  - syncs Zoho modules, records, and two-way record updates/deletes

## Required environment variables

Set these in Cloudflare Pages:

- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `VVS_INTERNAL_ALERT_EMAIL`
- `HUBSPOT_ACCESS_TOKEN`
- `HUBSPOT_TICKET_PIPELINE`
- `HUBSPOT_TICKET_STAGE`
- `ZOHO_CLIENT_ID`
- `ZOHO_CLIENT_SECRET`
- `ZOHO_REFRESH_TOKEN`
- `ZOHO_ACCOUNTS_DOMAIN` (optional, default `https://accounts.zoho.com`)
- `ZOHO_CRM_API_DOMAIN` (optional, default `https://www.zohoapis.com`)

For local Cloudflare dev, copy:

```bash
cp /Users/bigbossfamily/Documents/New project/.dev.vars.example /Users/bigbossfamily/Documents/New project/.dev.vars
```

Then fill in the real values.

## Cloudflare Pages setup

1. Open Cloudflare Dashboard.
2. Go to `Workers & Pages`.
3. Create or open the Git-connected Pages project for `/Users/bigbossfamily/Documents/New project`.
4. In that Pages project open `Settings`.
5. Open `Variables and Secrets`.
6. Add the variables above.
7. Redeploy the project.

## Local development

The current plain local HTTP preview does not execute Cloudflare Functions.

To test the API routes locally, run Cloudflare Pages dev:

```bash
npx wrangler pages dev /Users/bigbossfamily/Documents/New project
```

That will serve:

- the static site
- `/api/contact-submit`
- `/api/email-send`

## Provider notes

### Resend

- The sending domain must be verified in Resend before production sending works.
- `RESEND_FROM_EMAIL` must use a verified sender.

### HubSpot

- The private app token must include CRM object scopes for contacts and tickets.
- `HUBSPOT_TICKET_PIPELINE` and `HUBSPOT_TICKET_STAGE` must match your HubSpot pipeline configuration.

## Production behavior

- Contact submissions continue to write into the existing local Sunrise/SOC browser state.
- On Cloudflare Pages, the same submission will also send real email and sync CRM through the backend.
- Sunrise compose/send will keep local inbox behavior and also send real email through `/api/email-send`.
