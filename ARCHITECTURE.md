# Architecture

How the site is put together, and why.

## Stack

| Choice | Why |
|---|---|
| **Next.js 16 (App Router), static export** | We wanted React. Next prerenders every page to plain HTML at build time (`output: "export"`), so search engines and slow phones get real HTML, and it gives us sitemap, robots, metadata and the social image without extra tools. No server is needed in production. |
| **React 19, server components by default** | Only four components run in the browser: the phone menu, the contact form, the scroll reveal and the How we work timeline. Everything else is HTML. |
| **Plain CSS + CSS Modules** | Our own CSS, no UI kit, no Tailwind. Global tokens in one file; each component owns a small `.module.css` next to it. |
| **IBM Plex Mono, self-hosted** | The only typeface, as in the posts. Two weights shipped (400, 600), preloaded, `font-display: swap` with a metric-matched fallback so text doesn't jump when the font arrives. |
| **Vercel** | Deploys from Git, serves `out/` as-is, preview URL per pull request, built-in cookieless analytics. Headers in `vercel.json`. |

> We also considered Astro and chose React/Next instead, so the trade-off is JavaScript: the Next.js + React runtime is about 170 KB gzipped on the home page, where Astro would ship close to zero. The page still renders fully without JavaScript. If Lighthouse on mobile comes in under 95, the options are in TODO.md.

## Folders

```
app/                          Routes (Next.js App Router)
  layout.tsx                  <html>, header, footer, skip link, site-wide metadata
  page.tsx                    /            → src/views/HomePage
  privacy/page.tsx            /privacy/    → src/views/PrivacyPage
  not-found.tsx               404 page (exported as out/404.html)
  opengraph-image.tsx         1200×630 social card, rendered at build time
  twitter-image.tsx           same card for X/Twitter
  sitemap.ts, robots.ts       /sitemap.xml, /robots.txt
  manifest.ts                 /manifest.webmanifest (home-screen icons)

src/
  content/
    site.ts                   ★ every personal/business fact. The one file to fill in.
    i18n/en.ts                all English copy (reads facts from site.ts)
    locales.ts                list of languages + helpers
    index.ts                  getDictionary(), section ids
  styles/
    tokens.css                brand colours, type scale, spacing, tones
    base.css                  reset, focus styles, .container, utilities
    motion.css                scroll reveals, dashed boxes
  components/                 the reusable base (starter material)
    Logo, Label, MetaRow, Button, Section, Fill, PhotoFrame,
    SiteHeader, MobileMenu, SiteFooter, JsonLd, ScrollReveal
  sections/                   home page sections, one file + one CSS module each
    Hero, Capabilities, HowWeWork (+ StepsTimeline), WorkingWithUs, Work, About, Faq, Contact, ContactForm
  views/                      full pages, parameterised by locale
  lib/                        small helpers: placeholders, links, metadata, SEO, social image
  fonts/                      woff2 files used by the site (+ woff copies for build-time images)

public/                       favicons, founder photos
scripts/                      make-icons, list-placeholders, serve-out (local preview)
devlog/                       screenshots for Instagram posts
brand/                        brand references: logo and first Instagram post (HTML + PNG)
```

## Design system

**Tokens** (`src/styles/tokens.css`) hold the exact brand values from the designs in `brand/` and a fluid type scale built with `clamp()` (360px → 1440px).

**Tones.** Every section sets `data-tone="paper"` or `data-tone="carbon"`. A tone only redefines semantic variables (`--bg`, `--fg`, `--fg-body`, `--fg-meta`, `--rule`, `--focus`, `--btn-bg`…). Components read only those, never raw colours, so any component works on either background without variants. Two same-tone sections in a row get a thin rule between them automatically.

**Base components** mirror the posts:

- `Logo` — live text, `WCNI` 600 + `/` 400 orange + `labs` 400, `-0.035em` tracking.
- `Label` — orange slash + uppercase 600 label with wide tracking: `/ WHAT WE BUILD`.
- `MetaRow` — the small `WCNI/SITE v1.1 ……… 02/08` row. The home page reads like an unrolled carousel: each section gets a post-style counter.
- `Section` — full-bleed band: meta row, label, heavy headline, lead, content.
- `Button` — one component for every call to action: real `<a>` with `href`, real `<button>` without. Variants: primary (solid, inverted per tone), secondary (outline), text (underlined).
- `Fill` — renders text and draws an orange dashed box with a faint tint around any `[PLACEHOLDER]` still in it, so a missing fact can't slip through. Filled-in details are plain text. Optional links (GitHub, the repo link on case #1) are hidden by their components until filled, and an empty `PhotoFrame` is a blank frame.

**Orange** appears only in: the logo slash, label slashes, the hero cursor, the first timeline marker, focus rings on dark sections, and the dashed boxes around unfilled placeholders (none should be visible once the site is filled in).

**Motion** (`src/styles/motion.css`, `src/components/ScrollReveal.tsx`). Simple, and in the voice of the posts:

- Section labels type themselves in one character at a time, then the headline and lead rise.
- *What we build*: each rule draws from left to right, then number, title and text rise in turn.
- *How we work* follows the scroll (`src/sections/StepsTimeline.tsx`). On wide screens the section holds still while you scroll: a progress bar fills from left to right with an orange cursor on its tip and a `000%` readout, and each step appears when the bar reaches it, then disappears again if you scroll back up. On phones and tablets the page scrolls normally and a vertical line next to the steps fills down to 60% of the screen, with the same come-and-go steps. `--pin-distance` in `HowWeWork.module.css` sets how much scrolling the steps take; the number of columns on wide screens follows the number of steps (`--steps`, set by `HowWeWork.tsx`).
- The founders' crop marks close in on the photo frame.
- Dashed boxes (the open work slot, and any unfilled placeholder) march on hover, like a selection in an editor.
- The hero stays still apart from the blinking cursor.

How it works: `ScrollReveal` marks elements that are still below the screen with `data-reveal-state="out"` and flips them to `"in"` when they arrive. Siblings that arrive together get `--reveal-k` 0, 1, 2… for staggering, so the same CSS gives five steps in a row on desktop and one at a time on phones. Nothing is hidden in the HTML: without JavaScript, or with `prefers-reduced-motion`, the page is simply static. Elements already on screen are never hidden, so nothing blinks on load. To animate something new, add `data-reveal="up"` (fade and rise) or `data-reveal="custom"` plus your own `[data-reveal-state]` rules in its CSS module.

## Content and languages

**Positioning (since v1.2).** The site presents an independent software studio. The copy follows a few rules, so new content keeps the same story:

- The hero, *What we build* and About describe the studio and its range (websites, apps, custom software, internal tools, automation, APIs, platforms, ongoing development). None of them is about one format.
- *Working with us* (`WorkingWithUs.tsx`, `t.workingWithUs`) gives the two ways clients work with us: a one-time project, or ongoing follow-up (monthly maintenance and support). An overview only: no prices, packages, tiers or feature lists.
- Nothing goes on the site that we can't say for sure yet. Prices, timelines and terms stay off until they're decided; FAQ answers stay short and promise nothing specific.
- *What we build* lists capabilities, never past work. Finished projects go in *Work*.
- Every *Work* entry has a `kind`: `"client"`, `"own"` or `"demo"` (`WorkKind` in `en.ts`). The kind is printed on the card and explained in the key above the grid, so a demo can never pass for client work. Only use `"client"` for a real client who agreed to be shown.

- **Facts** (`site.ts`) vs **copy** (`i18n/en.ts`). Copy reads facts, so an email or a name is written once.
- Language-dependent facts are `Localized` (`{ en: "…" }`). Adding `"pt"` to `locales.ts` makes TypeScript flag every field that needs a translation.
- Views (`HomePage`, `PrivacyPage`) take a `locale` prop; nothing is hard-coded to English.

**Adding Portuguese (`/pt/`):**

1. Add `"pt"` to `locales` in `src/content/locales.ts`; fill the `pt` values TypeScript asks for in `site.ts`.
2. Copy `src/content/i18n/en.ts` to `pt.ts`, translate, and register it in `src/content/index.ts`.
3. Move the current routes into a route group `app/(en)/…` and create `app/(pt)/pt/…`, each with its own root `layout.tsx` so `<html lang>` is correct. Pages are one line each (`<HomePage locale="pt" />`).
4. Add `alternates.languages` to the page metadata and the `/pt/` URLs to `sitemap.ts`.

## Adding pages later

| Page | How |
|---|---|
| `/work/[slug]` | Create `app/work/[slug]/page.tsx` with `generateStaticParams()` returning the slugs in `t.work.cases`. Each case already has a `slug`. Point the card link to `/work/<slug>/`. |
| `/log/[slug]` | Same pattern. Keep entries as Markdown/MDX in `src/content/log/` and read them at build time. |
| `/products` | Create `app/products/page.tsx`, add a section to `src/sections/`, and add `{ id: "products", label: "Products" }` to `nav` in `en.ts`. Not shown yet, on purpose. |

Remember to add new URLs to `app/sitemap.ts`.

## Contact form

`src/sections/ContactForm.tsx` works with no paid service:

- **With `contact.web3formsKey`:** sends the message through [Web3Forms](https://web3forms.com) (free plan), which forwards it to the inbox the key was created with, and shows success/error. The visitor's email, when they give one, becomes the reply-to. Without JavaScript the form posts to Web3Forms directly and their confirmation page opens.
- **Without a key (placeholder):** opens the visitor's email app with the message filled in. Without JavaScript the browser does a native `mailto:` submission.

Includes labels, hints tied with `aria-describedby`, a live status message, and a honeypot field (`botcheck`, which Web3Forms also checks).

## SEO

- Per-page `<title>`, description and canonical URL (Next metadata API).
- Open Graph + Twitter card with a 1200×630 image rendered at build time in the post style.
- `sitemap.xml`, `robots.txt`, schema.org `Organization` JSON-LD (placeholders are left out of it automatically).
- Favicon set from a short form of the logo, `W/` (the full `WCNI/` is unreadable at 16px): `icon.svg` has no background and switches between carbon and paper with the browser's light/dark theme; `favicon.ico` is the fallback; `apple-touch-icon.png` and the manifest's 192/512 icons use a paper tile. Built by `npm run icons`. Icon URLs carry `?v=` (`ICON_VERSION` in `src/lib/metadata.ts`), because browsers cache tab icons by URL for a long time: bump it whenever the icons change.

## Accessibility

- Semantic landmarks, one `h1` per page, ordered headings, real `<a>`/`<button>`, skip link.
- Focus rings always visible: **orange on dark** (6:1), **carbon on light** — orange on paper is only 2.7:1, below the 3:1 needed for focus indicators.
- Text contrast measured in the browser: lowest pair is `--meta` on `--paper` at 5.87:1 (AA). Orange is never used for text.
- Phone menu: `aria-expanded`/`aria-controls`, closes on Escape (focus returns to the button), on outside click and on link choice.
- FAQ uses native `<details>`; no script needed.
- Motion: scroll reveals never run under `prefers-reduced-motion`, and anything still hidden shows as soon as it gets keyboard focus.

## Privacy

No cookies, no ads. Fonts are self-hosted. Analytics: Vercel Web Analytics (cookieless, anonymous, script served from the site's own domain), added only to builds made on Vercel and switched by `vercelAnalytics` in `site.ts`. The only third party the visitor's data reaches is Web3Forms, and only when they send the form. The privacy page says all of this; update it if any of it changes.
