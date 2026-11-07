# TODO

## Before launch

- [ ] Fill every placeholder in `src/content/site.ts` — `npm run placeholders` must print "No placeholders left". See [PLACEHOLDERS.md](PLACEHOLDERS.md).
- [ ] Re-read the v1.2 positioning copy (see CHANGELOG 1.2.0): the five *What we build* areas and the five *How we work* steps. They describe what we can build, not past work; keep only areas we're ready to be asked about.
- [ ] Create the GitHub repo, push, and set `repoUrl` + `social.github`.
- [ ] Deploy to Cloudflare Pages (steps in README) and connect the domain; set `url` in `site.ts`.
- [ ] Run Lighthouse on mobile against the deployed URL (Chrome DevTools → Lighthouse, or PageSpeed Insights). Target: 95+ in all four categories. **Not measured yet** — no Chrome was available on the build machine.
- [ ] Test on a real phone: the "Email us" button, the email link, the form opening the email app, and the scroll animations.
- [ ] Turn on "Reduce motion" (phone accessibility settings) and check the page is completely still. Only checked in code so far; the build browser can't emulate it.
- [ ] Share a link in a chat app or Instagram DM to check the social preview image.

## Decisions to make

- [ ] **Contact form endpoint.** Today the form opens the visitor's email app. To send directly from the site, add a Cloudflare Pages Function at `functions/api/contact.ts` and set `contact.formEndpoint = "/api/contact"`. Sending email needs either Cloudflare Email Routing (free, needs the domain on Cloudflare) or a third-party email API. Update the privacy page when this changes.
- [ ] **Analytics.** None today. If wanted: Cloudflare Web Analytics (cookieless) — paste the token in `cloudflareAnalyticsToken` and add a line to the privacy page.
- [ ] **Privacy page: who is responsible.** It says "run by WCNI Labs" with no legal name, and keeps messages "only as long as we need them". Name the responsible person or company (and a retention period, if you want one) once that's settled.
- [ ] **Prices and terms.** Removed from the site in v1.2 until decided (prices, contract/cancelling, timelines, ownership, domain). When they are: add the facts to `site.ts`, mention them in *Working with us* or the FAQ, and say whether prices include VAT.

## If Lighthouse performance is under 95 on mobile

The Next.js + React runtime is ~170 KB gzipped. Options, cheapest first:

1. Make sure Cloudflare serves Brotli (default) and the `_headers` caching is active.
2. Replace the phone menu with a no-JS `<details>` version (the FAQ already is one) — removes a client component, though not the framework runtime.
3. Move to a React + Vite static build with partial hydration, or to Astro (the other option we considered). The components and CSS port almost 1:1 because they're plain React + CSS Modules.

## Later

- [ ] Portuguese version `/pt/` — steps in ARCHITECTURE.md.
- [ ] `/work/[slug]` page for case study #1 ("How we built our own site"), using the DEVLOG as the write-up.
- [ ] Real client case studies as they happen (add to `work.cases` in `en.ts` with `kind: "client"`, only with the client's permission). Demos and experiments go in the same list with `kind: "demo"`.
- [ ] Take devlog screenshots for milestone 7 (hero before/after, *What we build*, *Starting point* card).
- [ ] `/log/[slug]` for build-in-public posts.
- [ ] `/products` once the first product exists (nav entry is ready to add).
- [ ] Extract `src/styles`, `src/components` and `src/content` into a starter repo for client sites (possibly open source).
