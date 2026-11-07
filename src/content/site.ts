/**
 * ============================================================================
 *  SITE FACTS — the one file to fill in before launch.
 * ============================================================================
 *
 *  Every personal or business fact on the website lives here: names, roles,
 *  contact details, links and legal details. The page copy (in `i18n/en.ts`)
 *  reads from this file, so you never have to hunt through components.
 *
 *  Anything still written like "[THIS]" is a placeholder:
 *    - on the site it shows in a dashed orange box, so it's easy to spot
 *      (optional links, like GitHub, are simply hidden until filled);
 *    - `npm run placeholders` lists every one that is left;
 *    - PLACEHOLDERS.md explains what each one is for.
 *
 *  Fields marked `{ en: ... }` are per language (see `locales.ts`).
 * ============================================================================
 */

import type { Localized } from "./locales";

export type Founder = {
  /** Full name, e.g. "Ana Silva". */
  name: string;
  /** Role shown under the name, e.g. "Co-founder, engineering". */
  role: Localized;
  /** One or two sentences: studies, specialities, tools. */
  background: Localized;
  /**
   * Photo (optional, shown in black and white).
   *  - "[PHOTO]"            → shows a blank frame
   *  - "/founders/ana.jpg"  → put the file in `public/founders/` (4:5 ratio, ~800×1000px)
   *  - null                 → no photo frame at all
   */
  photo: string | null;
  /** Alt text for the photo. */
  photoAlt?: Localized;
};

/**
 * The two founders, in the order they appear on the site.
 * Photos: public/founders/, 640×800 (4:5), black and white, cropped so both
 * faces are the same size (eyes at 44% of the height).
 */
const founders: Founder[] = [
  {
    name: "Luis Lobo",
    role: { en: "Embedded systems engineer" },
    background: {
      en: "MSc in Industrial Electronics and Computer Engineering, specialised in embedded systems. Python, C, Linux, automation, web.",
    },
    photo: "/founders/luis.jpg",
    photoAlt: { en: "Portrait of Luis Lobo" },
  },
  {
    name: "Joel Fernandes",
    role: { en: "Full-stack engineer" },
    background: {
      en: "Background in multimedia technology and design. Full-stack web development: React, JavaScript, HTML, CSS.",
    },
    photo: "/founders/joel.jpg",
    photoAlt: { en: "Portrait of Joel Fernandes" },
  },
];

export const site = {
  /* ---------------------------------------------------------------- Brand */
  name: "WCNI Labs",
  fullName: "We Can't Name It Labs",

  /**
   * Public address of the site. Used for canonical URLs, the sitemap and
   * social previews. Change it when the real domain is connected.
   * [SITE URL]
   */
  url: "https://wcnilabs.pages.dev",

  /** Where you are based. Shown in About and the footer. e.g. "Braga, Portugal" */
  basedIn: { en: "Porto, Portugal" } as Localized,

  /* -------------------------------------------------------------- Contact */
  contact: {
    /** Public email address. Also where the contact form sends. */
    email: "jlflcontent@gmail.com",

    /** How fast you reply. Completes the sentence "We reply in …" */
    replyTime: { en: "less than two days" } as Localized,

    /**
     * Optional form endpoint. Leave empty and the form opens the visitor's
     * email app with the message filled in (no service needed).
     * Set to e.g. "/api/contact" once a Cloudflare Pages Function exists (see TODO.md).
     */
    formEndpoint: "",
  },

  /* --------------------------------------------------------------- Social */
  social: {
    instagram: { handle: "@wcnilabs", url: "https://www.instagram.com/wcnilabs/" },
    /** e.g. { handle: "wcnilabs", url: "https://github.com/wcnilabs" } */
    github: { handle: "[GITHUB HANDLE]", url: "[GITHUB URL]" },
  },

  /** Public repository of this website (case study #1). e.g. "https://github.com/wcnilabs/website" */
  repoUrl: "[GITHUB REPO URL]",

  /*
   * No prices, contract terms or timelines on the site for now (removed in
   * v1.2 until they're decided). Add them back here when they are.
   */

  /* ------------------------------------------------------------- Founders */
  founders,

  /* ---------------------------------------------------------------- Legal */
  legal: {
    /** ISO date the privacy page was last changed. */
    privacyUpdated: "2026-11-07",
  },

  /* ------------------------------------------------------------ Analytics */
  /**
   * Cloudflare Web Analytics token (cookieless). Empty = no analytics at all.
   * Update the privacy page before turning it on.
   */
  cloudflareAnalyticsToken: "",
};

export type Site = typeof site;
