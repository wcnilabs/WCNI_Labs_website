/**
 * English copy for the whole site.
 *
 * Studio copy lives here; personal and business facts come from `../site.ts`
 * so they're filled in once. A Portuguese version is a copy of this file
 * with the same shape (TypeScript checks it against `Dictionary`).
 *
 * Positioning: an independent software studio. Show the range; never claim
 * work that isn't done. If we can't say something for sure yet (prices,
 * timelines, terms), it stays off the site.
 *
 * Voice: short, plain, two people talking. Never: elevate, unlock, seamless,
 * cutting-edge, innovative, leverage, empower, supercharge, next-level, solutions.
 */

import { site } from "../site";

const L = "en" as const;

/** What a Work entry is. Client work and demos must never be confused. */
export type WorkKind = "client" | "own" | "demo";
export const workKinds: readonly WorkKind[] = ["client", "own", "demo"];

export const en = {
  meta: {
    /** Browser tab and social preview title: just the name. */
    title: "We Can't Name It Labs",
    titleTemplate: "%s · We Can't Name It Labs",
    description:
      "An independent software studio founded by two engineers. We design, build and maintain websites, apps and custom software, starting with restaurants and small businesses.",
    ogAlt: "WCNI/labs — We couldn't name it, so we built it. An independent software studio.",
    /** Bottom line of the social card. */
    ogLine: "Independent software studio. Two engineers.",
    /** schema.org `knowsAbout` in the Organization JSON-LD. */
    knowsAbout: [
      "Software development",
      "Websites and web platforms",
      "Web and mobile apps",
      "Custom business software",
      "Internal tools and management systems",
      "Automation and integrations",
      "APIs and backends",
      "SaaS and subscription platforms",
      "Websites for restaurants and small businesses",
    ],
  },

  common: {
    skipToContent: "Skip to content",
    home: "Home",
    menu: "Menu",
    close: "Close",
    mainNav: "Main",
    startProject: "Start a project",
    placeholderTitle: "Placeholder — fill this in src/content/site.ts",
    externalHint: "(opens in a new tab)",
  },

  /** Header links. `products` is kept for later and is not shown yet. */
  nav: [
    { id: "what-we-build", label: "What we build" },
    { id: "how-we-work", label: "How we work" },
    { id: "work", label: "Work" },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact" },
  ],

  sectionMeta: "WCNI/SITE v1.2",

  hero: {
    slogan: "We couldn't name it, so we built it.",
    intro:
      "A software studio founded by two engineers. We design, build and maintain websites, apps, internal tools and the systems behind them.",
    primary: "Start a project",
    secondary: "See what we build",
    footLeft: "wcnilabs",
    footRight: "scroll",
  },

  capabilities: {
    label: "What we build",
    title: "We build what needs to be built.",
    lead: "Different problems need different software. Sometimes that's a website. Sometimes it's an app, a tool for your team, or the system that ties them together.",
    examplesLabel: "For example",
    areas: [
      {
        title: "Websites and digital experiences.",
        body: "Fast on a phone, easy to keep up to date, clear about what you do. From a one-page restaurant site with its menu and reservations to a full web platform.",
        examples: ["websites", "web platforms", "digital menus", "online bookings"],
      },
      {
        title: "Apps and custom software.",
        body: "For when a website isn't enough. Web and mobile apps, and business software shaped around how you actually work, not the other way round.",
        examples: ["web apps", "mobile apps", "custom business software"],
      },
      {
        title: "Systems and automation.",
        body: "The parts nobody sees and everybody relies on: internal tools, management systems, links between the apps you already use, and the scripts that save someone an hour a day.",
        examples: ["internal tools", "management systems", "automation", "integrations", "APIs and backends"],
      },
      {
        title: "Products and platforms.",
        body: "Software people sign up for and keep using: subscription platforms, specialised utilities, small experiments. For clients, and in time, our own.",
        examples: ["SaaS", "subscription platforms", "utilities", "experiments"],
      },
      {
        title: "Ongoing development.",
        body: "Software isn't finished at launch. We host what we build, keep it updated, support the people using it, and add what's needed next.",
        examples: ["hosting", "maintenance", "support", "new features"],
      },
    ],
    note: "Not sure which of these you need? That's normal.",
    noteLink: "Tell us the problem",
  },

  howWeWork: {
    label: "How we work",
    title: "Built around what you need.",
    lead: "Problem first, then the tool. You talk to the two people building it, from the first call to long after launch.",
    stepLabel: "Step",
    steps: [
      {
        title: "Understand.",
        body: "A call or a visit. You tell us how things work today and what gets in the way. We ask a lot of questions.",
      },
      {
        title: "Explore.",
        body: "We look at the options and tell you plainly what we'd build, and why. Often it's smaller than you expect.",
      },
      {
        title: "Design.",
        body: "Screens, flows and data, shaped with you. You see a first version before anything is final.",
      },
      {
        title: "Build.",
        body: "We build it, test it on real phones and computers, and put it live once you approve.",
      },
      {
        title: "Maintain & evolve.",
        body: "Launch is the start. We keep it running, fix what breaks, and keep improving it with you.",
      },
    ],
  },

  workingWithUs: {
    label: "Working with us",
    title: "Two ways to work with us.",
    plans: [
      {
        meta: "Once",
        title: "One-time project.",
        body: "We build it once and hand it over. A website, an app, a tool.",
      },
      {
        meta: "Every month",
        title: "Ongoing follow-up.",
        body: "Monthly maintenance and support for the apps and sites we run for you. For businesses like gyms, personal trainers, restaurants and garages.",
      },
    ],
  },

  work: {
    label: "Work",
    title: "Case study #1 is this site.",
    lead: "Before we build yours, here's how we built ours. Websites, apps, tools and experiments will join it as we finish them, each marked for what it is.",
    kindsLabel: "What each entry is",
    kinds: {
      client: { label: "Client work", note: "Built for a client. Shown with their permission." },
      own: { label: "Our own", note: "Our site, tools and products." },
      demo: { label: "Demo", note: "A prototype or experiment. Not client work." },
    } satisfies Record<WorkKind, { label: string; note: string }>,
    cases: [
      {
        slug: "how-we-built-our-own-site",
        kind: "own" as WorkKind,
        meta: "Case 001",
        year: "2026",
        title: "How we built our own site",
        summary:
          "We designed and built this site from scratch in our own visual identity: one typeface, two colours and an orange slash. It's static, loads fast on a phone and has no tracking. The same care we bring to every project.",
        facts: [
          { term: "Type", detail: "Studio website" },
          { term: "Stack", detail: "Next.js, React, plain CSS" },
          { term: "Hosting", detail: "Cloudflare Pages" },
        ],
        linkLabel: "Read the code on GitHub",
        href: site.repoUrl,
      },
    ],
    openSlot: {
      meta: "Case 002",
      status: "Open",
      title: "Your project could be next.",
      body: "A website, an app, a tool for your team, or something that doesn't have a name yet. If there's a problem to solve, we'd like to hear it.",
      linkLabel: "Start a project",
    },
  },

  about: {
    label: "About",
    title: "Two engineers.",
    lead: "Friends first. Co-founders now.",
    body: [
      "An independent software studio: no office, no investors, no account managers. You talk to the people who write the code.",
      "We're not here to follow a template. We're here to build what's needed. Websites for restaurants and small businesses are our first offer: useful work we can do well today. A starting point, not a limit.",
      "We like to stay with what we build: deliver it, keep it running, learn how it's used, make it better. Do that long enough and some of it becomes a product.",
      "We work remotely and build in public: on Instagram we share the progress, the mistakes and the real numbers.",
    ],
    basedInLabel: "Based in",
    basedIn: site.basedIn[L],
    founderMeta: "Founder",
    linksLabel: "Follow the build",
  },

  faq: {
    label: "FAQ",
    title: "Questions people ask us.",
    more: "Something else?",
    moreLink: "Ask us directly",
    items: [
      {
        q: "Do you only build websites?",
        a: ["No. Websites, apps, internal tools, automation. If it's software, ask us."],
      },
      {
        q: "I don't know exactly what I need. Can we still talk?",
        a: ["Yes. Tell us the problem, and we'll work out together whether software helps."],
      },
      {
        q: "How long does a project take, and what does it cost?",
        a: ["Depends on what it needs. We'll tell you honestly after a first chat."],
      },
    ],
  },

  contact: {
    label: "Contact",
    title: "Have something in mind?",
    lead: `Let's figure out how to build it. You don't need a plan, just the problem. We reply in ${site.contact.replyTime[L]}.`,
    channels: {
      emailCta: "Email us",
      emailLabel: "Email",
      instagramLabel: "Instagram",
    },
    form: {
      title: "Send a message",
      name: "Your name",
      business: "Business or project",
      businessHint: "e.g. “Tasca Silva, restaurant” or “a stock app for our shop”",
      reach: "Phone or email",
      message: "Message",
      messageHint: "The idea or the problem, in your own words. A website, an app, a tool, something that takes too long…",
      optional: "optional",
      submit: "Send message",
      sending: "Sending…",
      mailtoNote: "Sending opens your email app with the message ready. Nothing is stored on this site.",
      openedStatus: "Your email app should open now with the message ready. If it didn't, write to us directly.",
      sentStatus: "Thanks, message sent. We'll get back to you soon.",
      errorStatus: "Something went wrong and the message wasn't sent. Please email us directly.",
      invalidStatus: "Please fill in your name, a phone or email, and a message.",
      mailSubject: "New project",
    },
  },

  footer: {
    slogan: "We couldn't name it, so we built it.",
    siteLabel: "Site",
    elsewhereLabel: "Elsewhere",
    legalLabel: "Legal",
    privacy: "Privacy",
    rights: "We Can't Name It Labs",
    eof: "EOF",
  },

  privacy: {
    metaTitle: "Privacy",
    metaDescription: "How the WCNI Labs website handles your data: no cookies, no tracking, and only what you choose to send us.",
    label: "Privacy",
    title: "Privacy, in plain words.",
    lead: "No cookies. No tracking. No ads. We only get what you choose to send us.",
    updatedLabel: "Last updated",
    sections: [
      {
        heading: "Who we are",
        body: [
          `This website is run by WCNI Labs. For anything about your data, email us at ${site.contact.email}.`,
        ],
      },
      {
        heading: "What this site collects",
        body: [
          "Nothing by itself. We don't use cookies, analytics, tracking pixels or ads. Everything on the page, fonts included, is served from this site.",
          "If we ever add visitor statistics, we'll use a cookieless tool and update this page first.",
        ],
      },
      {
        heading: "Hosting",
        body: [
          "The site is hosted on Cloudflare Pages. Like any web host, Cloudflare processes technical data such as your IP address to deliver pages and protect the site from attacks. You can read how in Cloudflare's privacy policy (cloudflare.com/privacypolicy).",
        ],
      },
      {
        heading: "When you contact us",
        body: [
          "If you email us or use the form, we receive what you send: usually your name, your business or project, a phone number or email address, and your message.",
          "We use it only to reply to you and, if we work together, to run your project. We don't sell it and we don't share it for marketing.",
          "The form doesn't send anything through this website: it opens your own email app with the message filled in, and you decide whether to send it.",
        ],
      },
      {
        heading: "How long we keep it",
        body: ["We keep messages only as long as we need them to reply to you or to run your project, then delete them."],
      },
      {
        heading: "Your rights",
        body: [
          `You can ask us what we have about you, and ask us to correct or delete it, by emailing ${site.contact.email}. If you're in the EU, you can also complain to your national data protection authority.`,
        ],
      },
      {
        heading: "Changes",
        body: ["If this page changes, we'll update the date at the top."],
      },
    ],
  },

  notFound: {
    metaTitle: "Page not found",
    meta: "WCNI/ERR 404",
    label: "Not found",
    title: "We couldn't find it.",
    body: "This page doesn't exist, or we haven't built it yet.",
    back: "Back to the homepage",
  },
};

export type Dictionary = typeof en;
