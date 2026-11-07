# Changelog

All notable changes to the site. Format: [Keep a Changelog](https://keepachangelog.com/), versions follow the `WCNI/SITE vX.Y` label on the site.

## [1.2.0] — 2026-11-07

Same look, new story: a software studio, not a web agency. And nothing on the site that we can't say for sure yet.

### Changed
- **Hero:** intro now says what the studio does across formats ("We design, build and maintain websites, apps, internal tools and the systems behind them."). Secondary link goes to *What we build*.
- **What we do → What we build** (`Capabilities`): "We build what needs to be built." Five areas instead of the four parts of one package: websites and digital experiences, apps and custom software, systems and automation, products and platforms, ongoing development. Each with a short "for example" list.
- **How we work:** "Built around what you need." Five steps instead of four: Understand, Explore, Design, Build, Maintain & evolve. On wide screens the timeline has five columns and a longer scroll (`--pin-distance` 200vh); step text is one size smaller there.
- **Pricing → Working with us** (`WorkingWithUs`): "Two ways to work with us." A one-time project (we build it and hand it over) or ongoing follow-up (monthly maintenance and support, for businesses like gyms, personal trainers, restaurants and garages). Two short blocks in one ruled card: no prices, packages or feature lists.
- **Work:** every entry has a kind (client work / our own / demo), shown on the card and explained in a key above the grid. Case 001 is marked "Our own", and its text now says the site is built in our own visual identity (not "to match our Instagram posts") and ends "The same care we bring to every project." instead of calling it the base for every client site. Open slot: "Your project could be next."
- **About:** engineering-led and independent; keeps "We're not here to follow a template. We're here to build what's needed."; says how we like to work long-term (deliver, keep it running, learn, improve, sometimes a product).
- **FAQ:** "Questions people ask us." Cut from six questions to three short, honest ones: "Do you only build websites?", "I don't know exactly what I need. Can we still talk?", "How long does a project take, and what does it cost?" ("Depends on what it needs. We'll tell you honestly after a first chat.").
- **Contact:** "Have something in mind?" / "Let's figure out how to build it." Form field "Business or project", wider hints.
- **Navigation:** What we build · How we work · Work · About · Contact. Anchors renamed: `#what-we-do` → `#what-we-build`, `#pricing` → `#working-with-us`.
- **SEO:** page title (browser tab) is just the name, "We Can't Name It Labs" ("Privacy · We Can't Name It Labs" on other pages); new description, social card bottom line "Independent software studio. Two engineers.", Organization JSON-LD gets `knowsAbout`.
- **About:** founders filled in: Luis Lobo (embedded systems engineer) and Joel Fernandes (full-stack engineer), with their backgrounds and black-and-white portraits (`public/founders/`, 640×800, cropped so both faces are the same size). Based in Porto, Portugal (About, footer, JSON-LD).
- **Contact:** email is jlflcontent@gmail.com and the main button is now "Email us"; "We reply in less than two days."
- **Orange boxes:** filled-in details (names, roles, city, email…) are plain text again; only an unfilled `[PLACEHOLDER]` still gets the orange dashed box. GitHub links and the case #1 repo link are hidden until filled; a missing founder photo would show as a blank frame.
- Privacy page: "your business or project"; no WhatsApp; says the site is run by WCNI Labs and keeps messages only as long as needed; date updated to 2026-11-07.
- Full name is now "We Can't Name It Labs" (was "We Can't Name It Company"): footer, home-screen name, JSON-LD.
- Site label `WCNI/SITE v1.2`.

### Removed
- Prices, the package card and its included/not-included lists, and the facts behind them in `site.ts`: setup and monthly price, contract terms, timeline, ownership and domain terms (6 fewer placeholders). They come back when they're decided.
- FAQ answers that made promises we can't keep for sure yet (timeline, ownership, domain, cancelling, what you need to provide).
- WhatsApp (button, contact row, number field and link helper).
- The permanent dashed "field" boxes from 1.1 (`src/content/fields.ts`), and the `[LEGAL NAME]` and `[RETENTION PERIOD]` placeholders on the privacy page.

## [1.1.0] — 2026-11-06

A bit of motion, and the dashed boxes are now part of the look.

### Added
- Scroll reveals: section labels type themselves in; headlines and text rise; rules draw across in *What we do*; pricing items tick in; founders' crop marks close in. Off with reduced motion and without JavaScript.
- *How we work* follows the scroll: on wide screens the section holds still while a progress bar fills (orange cursor on the tip, percentage readout) and each step comes and goes as the bar reaches it; on phones a vertical line fills next to the steps.
- Dashed orange "field" boxes stay after a value is filled in (only the placeholder tint goes away), chosen in `src/content/fields.ts`. Dashes march on hover; the open work slot uses the same box.
- `manifest.webmanifest` with the 192/512 home-screen icons.

### Changed
- New tab icon: `W/` with no background, carbon on light browser themes and paper on dark ones, instead of `WCNI/` on a black square (unreadable at 16px). Home-screen icons use a paper tile. Icon URLs are versioned (`?v=2`) so browsers drop the old cached icon.
- Empty photo frames have a dashed border.
- Site label `WCNI/SITE v1.1`.

## [1.0.0] — 2026-11-06

First complete version, ready for content.

### Added
- Next.js 16 + React 19 static site with plain CSS, IBM Plex Mono self-hosted (400, 600).
- Design tokens and paper/carbon tones matching the Instagram posts; reusable components: Logo, Label, MetaRow, Button, Section, Fill, PhotoFrame.
- Sticky header with phone menu; footer with links, Instagram, GitHub, privacy.
- Home page: Hero, What we do, How we work, Pricing, Work (case study #1 + open slot), About, FAQ, Contact.
- Contact form that works without any service (opens the email app), ready for an endpoint later.
- `/privacy` page and custom 404.
- SEO: metadata, canonical URLs, Open Graph/Twitter image (1200×630, built at build time), sitemap, robots, Organization JSON-LD.
- Favicon set generated from the WCNI/ mark.
- Cloudflare Pages `_headers` (security headers, asset caching, social image type).
- `src/content/site.ts` as the single place for personal/business details; `npm run placeholders` to list what's left.
- Docs: README, ARCHITECTURE, TODO, DEVLOG, PLACEHOLDERS.
