# TODO

## Before launch

- [ ] Re-read the v1.2 positioning copy (see CHANGELOG 1.2.0): the five *What we build* areas and the five *How we work* steps. They describe what we can build, not past work; keep only areas we're ready to be asked about.
- [ ] Deploy to Vercel as project `wcnilabs` (steps in README) and enable Web Analytics. If the address isn't `wcnilabs.vercel.app`, set `url` in `site.ts`.
- [ ] Send a test message through the form and check it arrives (and that "reply" goes to the visitor's email).
- [ ] Run Lighthouse on mobile against the deployed URL (Chrome DevTools → Lighthouse, or PageSpeed Insights). Target: 95+ in all four categories. **Not measured yet.**
- [ ] Test on a real phone: the "Email us" button, the email link, the form, the menu, the FAQ, and the scroll animations.
- [ ] Turn on "Reduce motion" (phone accessibility settings) and check the page is completely still.
- [ ] Share a link in a chat app or Instagram DM to check the social preview image.

## Decisions to make

- [ ] **Hosting plan.** Vercel's free Hobby plan is non-commercial only; a studio site counts as commercial. Move to Pro, or to a host whose free plan allows commercial use.
- [ ] **Custom domain.** Not bought yet. When it is: add it in Vercel, redirect `wcnilabs.vercel.app` to it, set `url` in `site.ts`.

Decided (2026-11-09): contact form through Web3Forms; cookieless Vercel Web Analytics; the privacy page names the site email as the contact for data questions, no legal name for now; no prices or terms on the site.

## If Lighthouse performance is under 95 on mobile

The Next.js + React runtime is ~170 KB gzipped. Options, cheapest first:

1. Check in the browser's network tab that Vercel serves the JS with Brotli and the long `Cache-Control` from `vercel.json`.
2. Replace the phone menu with a no-JS `<details>` version (the FAQ already is one) — removes a client component, though not the framework runtime.
3. Move to a React + Vite static build with partial hydration, or to Astro (the other option we considered). The components and CSS port almost 1:1 because they're plain React + CSS Modules.

## Later

- [ ] Google Search Console (next version): verify the site and submit `sitemap.xml`. Verification by meta tag goes in `src/lib/metadata.ts` (`verification.google`), or by DNS once there's a domain.
- [ ] Portuguese version `/pt/` — steps in ARCHITECTURE.md.
- [ ] `/work/[slug]` page for case study #1 ("How we built our own site"), using the DEVLOG as the write-up.
- [ ] Real client case studies as they happen (add to `work.cases` in `en.ts` with `kind: "client"`, only with the client's permission). Demos and experiments go in the same list with `kind: "demo"`.
- [ ] Take devlog screenshots for milestone 7 (hero before/after, *What we build*, *Starting point* card).
- [ ] `/log/[slug]` for build-in-public posts.
- [ ] `/products` once the first product exists (nav entry is ready to add).
- [ ] Extract `src/styles`, `src/components` and `src/content` into a starter repo for client sites (possibly open source).
