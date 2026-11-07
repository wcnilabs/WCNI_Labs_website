# Placeholders

Every personal or business fact the site needs lives in **one file: [`src/content/site.ts`](src/content/site.ts)**.
Until a value is filled in it is written like `[THIS]`, and the site shows it in a dashed orange box so nothing slips through. Once filled, it is plain text. Optional links (GitHub, the site's repo) are hidden until filled, so none of these appear as boxes on the page.

```bash
npm run placeholders   # lists every placeholder still left, with file:line
```

The command exits with code 1 while placeholders remain, so you can use it as a pre-launch check.

## What to fill in

Prices, contract terms, timelines, ownership and domain terms were taken off the site in v1.2 until they're decided, and so were WhatsApp, the legal name and the retention period on the privacy page. They're not placeholders any more; add them back to `site.ts` (and the copy) when they are.

| Placeholder | Field in `site.ts` | What to write | Example |
|---|---|---|---|
| `[GITHUB HANDLE]` / `[GITHUB URL]` | `social.github` | Studio GitHub account | `wcnilabs` / `https://github.com/wcnilabs` |
| `[GITHUB REPO URL]` | `repoUrl` | Public repo of this site (case study #1 links to it) | `https://github.com/wcnilabs/website` |
| `[SITE URL]` | `url` | Real domain once connected (canonical URLs, sitemap, social cards). Currently the Cloudflare default `https://wcnilabs.pages.dev` | `https://wcnilabs.com` |

## Also check (copy, not placeholders)

These are in [`src/content/i18n/en.ts`](src/content/i18n/en.ts). Worth a last read before launch:

- **Working with us**: two plans, one-time project and ongoing follow-up (monthly maintenance and support). No prices or terms on purpose.
- **FAQ**: three short answers that promise nothing specific ("Depends on what it needs. We'll tell you honestly after a first chat.").
- **What we build**: the five areas say what we *can* build. Remove any you don't want to be asked about yet.
- **Privacy page**: correct as long as there are no analytics and the form stays in email-app mode. Update it if either changes. It says the site is run by WCNI Labs (no legal name yet) and that messages are kept "only as long as we need them to reply to you or to run your project". Add the responsible person or company once that's settled.

## Optional switches in `site.ts`

- `contact.formEndpoint` — leave empty (form opens the visitor's email app). Set to `/api/contact` only after a Cloudflare Pages Function exists (see TODO.md).
- `cloudflareAnalyticsToken` — leave empty for no analytics. Cookieless Cloudflare Web Analytics loads only when set.
