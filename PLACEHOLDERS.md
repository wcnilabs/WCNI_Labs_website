# Placeholders

Every personal or business fact the site needs lives in **one file: [`src/content/site.ts`](src/content/site.ts)**.
Until a value is filled in it is written like `[THIS]`, and the site shows it in a dashed orange box so nothing slips through. Once filled, it is plain text. Optional links are hidden until filled, so none of these appear as boxes on the page.

```bash
npm run placeholders   # lists every placeholder still left, with file:line
```

The command exits with code 1 while placeholders remain, so you can use it as a pre-launch check.

## What to fill in

Prices, contract terms, timelines, ownership and domain terms were taken off the site in v1.2 until they're decided, and so were WhatsApp, the legal name and the retention period on the privacy page. They're not placeholders any more; add them back to `site.ts` (and the copy) when they are.

| Placeholder | Field in `site.ts` | What to write | Example |
|---|---|---|---|
| `[WEB3FORMS ACCESS KEY]` | `contact.web3formsKey` | Access key from [web3forms.com](https://web3forms.com), created with the inbox that should receive the messages. Public by design. Until it's set, the form opens the visitor's email app instead. | `a1b2c3d4-…` |

`url` is not a placeholder: it's the free Vercel address `https://wcnilabs.vercel.app` for now. `npm run placeholders` prints a note about it; change it when a domain is connected (README → Deploy).

## Also check (copy, not placeholders)

These are in [`src/content/i18n/en.ts`](src/content/i18n/en.ts). Worth a last read before launch:

- **Working with us**: two plans, one-time project and ongoing follow-up (monthly maintenance and support). No prices or terms on purpose.
- **FAQ**: three short answers that promise nothing specific ("Depends on what it needs. We'll tell you honestly after a first chat.").
- **What we build**: the five areas say what we *can* build. Remove any you don't want to be asked about yet.
- **Privacy page**: covers Vercel hosting, Vercel Web Analytics (cookieless) and the form; the form paragraph switches by itself between Web3Forms and email-app mode depending on `contact.web3formsKey`. The contact for data questions is the site email. Update it if hosting, analytics or the form service change.

## Optional switches in `site.ts`

- `vercelAnalytics` — `true` adds cookieless Vercel Web Analytics to builds made on Vercel (it also has to be enabled in the Vercel dashboard). `false` removes it; update the privacy page if you do.
