# DEVLOG

How we built our own site, milestone by milestone. Raw material for Instagram posts.
Screenshots are in [`devlog/`](devlog/).

---

## Milestone 1 — Tokens, fonts, layout and logo

**Built.** The design tokens (exact colours from the posts), a fluid type scale, IBM Plex Mono self-hosted in two weights, and the base components: `Logo`, `Label`, `MetaRow`, `Section`, `Button`.

**Decision: tones instead of colours.** Every section says `data-tone="paper"` or `data-tone="carbon"`, and components only use semantic variables like `--fg` and `--rule`. A button or a label works on either background with no extra code, which is what makes the alternating paper/carbon rhythm of the carousel easy to copy on the web.

**Problem → fix.** The build machine had no Node.js. We installed the official Node 24 LTS build into the home folder (checksum verified, no admin rights). npm also picked TypeScript 7 by default, the new native compiler; we pinned TypeScript 6, which Next.js 16 is built against.

**Post idea.** Side by side: the Instagram slide and the CSS tokens file. Caption: "Same seven colours. Same font. The site is just the carousel, unrolled."

---

## Milestone 2 — Hero and header

**Built.** The dark hero, composed like slide 1: metadata row, huge wordmark, slogan, intro, one solid button and one quiet link. Sticky header with a phone menu.

**Decision: the logo is text, not an image.** `WCNI` 600 + orange `/` + `labs` 400, with `-0.035em` tracking. It stays sharp at any size, weighs nothing, and is the same component in the header, hero and footer. The only animation on the site is a blinking orange cursor after the slogan, and it stops for people who ask for less motion.

**Problem → fix.** The slogan broke as "…so / we built it." On the post it breaks as "…so we / built it." Widening the slogan's max width from 24 to 27 characters gave the same break as the post.

**Post idea.** `devlog/m1-hero-desktop.png` next to `brand/images/post1-slide1.png`, and `devlog/m1-hero-mobile.png`.

---

## Milestone 3 — The other sections

**Built.** What we do (numbered 01–04 spec list), How we work (four-step timeline), Pricing (one datasheet card), Work (case study #1 is this site + an open slot), About (two founder blocks with crop-mark photo frames), FAQ, Contact.

**Decision: no icons, no feature cards.** Numbers, rules and type do all the work, like a lab notebook. The pricing card is drawn as a datasheet: cells divided by 1px rules, prices in big mono numerals, "+" for included and "–" for not included.

**Problem → fix.** Pricing and Work are both light sections, so they ran into each other with no visual break. A single CSS rule now draws a thin line between any two sections of the same tone. Also: the long `[MONTHLY PRICE]` placeholder pushed "/month" onto two lines; it now never splits.

**Post idea.** `devlog/m3-pricing-card.png` ("Our whole price list fits on one card"), `devlog/m3-how-we-work.png`, `devlog/m3-full-page-desktop.jpg` as a scrolling reel.

---

## Milestone 4 — Contact form and SEO

**Built.** The contact form, `/privacy`, the 404 page ("We couldn't find it."), sitemap, robots, canonical URLs, Organization JSON-LD, a 1200×630 social card rendered at build time in the post style, and the favicon set from the `WCNI/` profile mark.

**Decision: a form that needs no service.** By default the form opens the visitor's own email app with the message filled in. No backend, no third party, nothing stored, and it even works with JavaScript off. When we want direct sending, one setting points it at a Cloudflare function.

**Problem → fix.** Next.js writes the social card as a file called `opengraph-image`, with no extension, so a static host may not know it's a PNG and link previews could break. A `_headers` file tells Cloudflare Pages to serve it as `image/png`.

**Post idea.** `devlog/m4-og-image.png` ("This is what our link looks like when you share it"), and the favicon generated from the profile picture.

---

## Milestone 5 — Polish, accessibility and performance

**Built.** Keyboard pass (skip link, visible focus everywhere), contrast check of every text colour pair in the browser, mobile menu with Escape and outside-click closing, checks at 360, 375, 768, 1280 and 1920px (no horizontal scroll at any of them), and a placeholder system.

**Decision: orange focus rings only on dark.** Orange on our paper colour is 2.7:1, under the 3:1 a focus ring needs. So focus rings are orange on carbon sections and carbon on paper sections. Lowest text contrast on the site: 5.87:1 (grey labels on paper), above the AA minimum of 4.5:1.

**Problem → fix.** Our placeholder finder flagged `[L]` and `[0]` in the code as missing content. They're array lookups, not placeholders. The pattern now needs at least two characters starting with a letter, e.g. `[EMAIL]`.

**Placeholders.** Any value not filled in yet shows with a dashed orange outline on the page, and `npm run placeholders` lists them with file and line. All of them live in one file, `src/content/site.ts`.

**Post idea.** A split screen: the page with dashed placeholder boxes, then the same page filled in. Caption: "Every unknown is marked. Nothing invented."

---

## Milestone 6 — Motion, fields and a new tab icon

**Built.** Scroll animations: section labels type themselves in like a terminal, rules draw across, pricing items tick in, the founders' crop marks close in. *How we work* follows the scroll: the section holds still, a progress bar fills as you scroll with an orange cursor riding its tip, and each step appears when the bar reaches it (and goes away if you scroll back up). On a phone, a line down the side fills instead. The dashed orange boxes around details to fill in are now permanent: tinted while a value is missing, plain dashes once it's filled, like a form written by hand. The dashes march when you point at them.

**Decision: animate only what's below the screen.** A small script hides elements only once the page is running and only if they're still below the screen, then shows them as they arrive. So the page never blinks on load, works with JavaScript off, and stays completely still for people who turn on "reduce motion". Things that arrive together are numbered 0, 1, 2… and the CSS staggers them: the same code gives a left-to-right timeline on a laptop and one step at a time on a phone.

**Problem → fix.** The tab icon was `WCNI/` on a black square. At 16px that's just a black square. The new icon keeps only `W/`, has no background, and switches between black and off-white with the browser's theme (`devlog/m6-favicon-before-after.png`).

**Problem → fix.** The first version of *How we work* played on its own once you reached it: the line drew itself on a timer. It looked fine, but the steps didn't feel connected to your scrolling. Now the bar is the scroll: the section is held in place (CSS `position: sticky` plus extra height to scroll through) and the fill is simply "how far through that extra height you are". On a 1280×800 laptop the held section was 75px taller than the screen, so its spacing tightens while it's held.

**Problem → fix.** After the new icon shipped, the tab still showed the black square: browsers cache tab icons by URL for a long time. The icon links now end in `?v=2`, a new address the browser has never seen, so it fetches the new icon.

**Post idea.** A 5-second screen recording scrolling through *How we work* (the bar filling with the scroll is the hook), and `devlog/m6-favicon-before-after.png`. Caption: "Our tab icon was a black square. Now it's two characters."

---

## Milestone 7 — A software studio, not a web agency

**Why.** Reading v1.1 back, the whole site sold one thing. The page title said "Websites for small local businesses", the hero said "We build websites that bring small businesses customers", and About said "Right now we build websites… Next, our own software products." That reads like a web agency planning to become a software studio someday. We're the other way round: a software studio that is starting with websites for restaurants and small businesses.

**Built.** No redesign: same colours, type, logo, layout and motion. The words changed, and the structure only where the words needed it.
- *What we do* became *What we build*: "We build what needs to be built." Five areas, from websites to internal tools, automation, platforms and ongoing development. They are capabilities, not a portfolio.
- The website package moved into its own section, *Starting point*: "First up: restaurants and small businesses." Same datasheet card, same placeholder prices.
- *How we work* went from four website steps to five that fit any project: Understand, Explore, Design, Build, Maintain & evolve.
- *Work* entries now say what they are: client work, our own, or a demo.
- Contact: "Have something in mind? Let's figure out how to build it."

**Decision: label the offer, don't hide it.** Restaurant owners still need a clear package and a clear price, so the card stays. It just sits under a label that says what it is: where we're starting. One line under it ("Need more than a website?…") keeps the door open.

**Decision: say what each project is.** With one case study it would be easy to pad the Work section with mock-ups. Instead every entry carries a kind, printed on the card and explained in a key above the grid. A demo can't pass for client work, and case #1 is still honestly our own site.

**Decision: drop a good line because of one word.** "Different problems. Different solutions." was a candidate headline, but "solutions" is on our own banned list. It became "Different problems need different software." in the *What we build* lead.

**Problem → fix.** The new hero intro ran to four lines and pushed "Start a project" below the fold on a 1280×800 laptop (button bottom at 826px). Going back to our identity line, "A software studio founded by two engineers.", brought it to three lines and the button back on screen (792px).

**Problem → fix.** Five steps in the pinned timeline left about 18 characters per line. The step text is one size smaller on wide screens (only there), which gives ~22 characters and still fits the held section on a laptop screen.

**Second pass: say less.** Reading it back with fresh eyes, we cut more. The *Starting point* card had prices, a package and a feature list for one kind of client; it's now *Working with us*: two short blocks, a one-time project or ongoing follow-up, no prices. The FAQ went from six detailed answers to three short ones, because we're early and don't have firm answers on timelines, terms or prices yet. And case #1 no longer says the site was made "to match our Instagram posts": it's built in our own visual identity, and Instagram is just one place that identity shows up.

**Decision: if we can't say it for sure, it's not on the site.** Placeholders like `[TIMELINE]` and `[CONTRACT TERMS]` invited us to make promises before we'd decided them. We deleted the fields instead of leaving them empty: six fewer placeholders, and "Depends on what it needs. We'll tell you honestly after a first chat." as the answer until we know better.

**Post idea.** Before/after of the hero and the page title side by side: "Websites for small local businesses" → "Independent software studio". Caption: "We're a software studio. Websites are one thing we build, not the only one." Screenshots not saved yet (no headless browser on this machine); take them from the deployed site.
