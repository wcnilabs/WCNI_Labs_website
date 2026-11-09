# WCNI/labs — website

The website of **WCNI Labs** (We Can't Name It Labs), an independent software studio from Porto, Portugal, run by Luis Lobo and Joel Fernandes.

*We couldn't name it, so we built it.*

A static site: Next.js and React, plain CSS, one typeface (IBM Plex Mono), hosted on Vercel. No cookies and no ads; anonymous visit counts (Vercel Web Analytics), and the contact form sends through Web3Forms.

## What's on it

One page, read top to bottom like an Instagram carousel:

1. **Hero:** who we are, in one sentence.
2. **What we build:** websites, apps and custom software, systems and automation, products and platforms, ongoing development.
3. **How we work:** understand, explore, design, build, maintain & evolve. The timeline follows the scroll.
4. **Working with us:** a one-time project, or ongoing follow-up.
5. **Work:** case study #1 is this site. Every entry is marked as client work, our own, or a demo.
6. **About:** the two of us.
7. **FAQ** and **Contact** (email, or a form that opens your email app).

Plus `/privacy` and a 404 page.

## Run it locally

Needs **Node.js 20.9 or newer** (24 LTS recommended, see `.nvmrc`).

```bash
npm install
```

```bash
npm run dev          # http://localhost:3000, live reload
```

```bash
npm run build        # static site → out/
```

```bash
npm run preview      # serves out/ on http://localhost:4173, like production
```

| Command | What it does |
|---|---|
| `npm run typecheck` | TypeScript check |
| `npm run placeholders` | Lists every `[PLACEHOLDER]` still in the source (exit code 1 while any remain) |
| `npm run icons` | Rebuilds the favicon set in `public/` from the `W/` mark (only if the mark changes) |

## Editing content

| What | Where |
|---|---|
| Names, roles, photos, contact, links, location | `src/content/site.ts` |
| All the English copy | `src/content/i18n/en.ts` |
| Founder portraits (640×800, black and white) | `public/founders/` |
| Colours, type scale, spacing, motion timings | `src/styles/tokens.css` |

Anything written like `[THIS]` is a placeholder: it shows on the page in a dashed orange box until it's filled in. Optional links stay hidden until they have a value. [PLACEHOLDERS.md](PLACEHOLDERS.md) lists what's left.

## Deploy (Vercel)

1. Vercel dashboard → **Add New → Project** → import `wcnilabs/WCNI_Labs_website` (give the Vercel GitHub app access to the `wcnilabs` organisation if it isn't listed).
2. Project name: `wcnilabs`, so the address is `https://wcnilabs.vercel.app` (the `url` in `src/content/site.ts`). If Vercel gives a different address, update `url` to match.
3. Build settings: leave the defaults (Framework preset **Next.js**). The static export in `out/` is picked up automatically.
4. Deploy. Every push to `main` redeploys; pull requests get preview URLs.
5. **Analytics → Enable** (Web Analytics). The script is already in builds made on Vercel; it starts counting once enabled.
6. Later, custom domain: **Settings → Domains → Add**, set the `vercel.app` address to redirect to it, then update `url` in `src/content/site.ts` and redeploy.

`vercel.json` sets security headers, long caching for build assets, and the content type of the social images.

Note: Vercel's free Hobby plan is for non-commercial use only. A studio site counts as commercial under their terms, so plan on Pro, or move to a host whose free plan allows it (the site is a plain static export and runs anywhere).

## Project structure

```
app/                   routes: /, /privacy, 404, sitemap, robots, manifest, social image
src/content/           site facts (site.ts) and copy (i18n/en.ts)
src/components/        reusable pieces: Logo, Label, MetaRow, Button, Section, PhotoFrame…
src/sections/          home page sections
src/views/             full pages
src/styles/            tokens, base styles, motion
src/lib/               small helpers: links, metadata, SEO, social image
public/                favicons, founder photos
scripts/               icons, placeholder check, local preview server
brand/                 brand references: logo and first Instagram post (HTML + PNG)
devlog/                screenshots from the build
```

## Docs

- [ARCHITECTURE.md](ARCHITECTURE.md): how the site is built, and why.
- [CHANGELOG.md](CHANGELOG.md): what changed in each version.
- [DEVLOG.md](DEVLOG.md): build notes, milestone by milestone.
- [TODO.md](TODO.md): what's next.
- [PLACEHOLDERS.md](PLACEHOLDERS.md): details still to fill in.

## Credits

Design and code by WCNI Labs.
IBM Plex Mono © IBM Corp., SIL Open Font License 1.1 (`src/fonts/OFL-LICENSE.txt`).
