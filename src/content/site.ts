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
   * social previews. For now the free Vercel address; change it when a
   * custom domain is connected (see README → Deploy).
   */
  url: "https://wcnilabs.vercel.app",

  /** Where you are based. Shown in About and the footer. e.g. "Braga, Portugal" */
  basedIn: { en: "Porto, Portugal" } as Localized,

  /* -------------------------------------------------------------- Contact */
  contact: {
    /** Public email address. Also where the contact form sends. */
    email: "jlflcontent@gmail.com",

    /** How fast you reply. Completes the sentence "We reply in …" */
    replyTime: { en: "less than two days" } as Localized,

    /**
     * Web3Forms access key (web3forms.com). The form sends messages through
     * Web3Forms, which forwards them to the inbox the key was created with.
     * The key is public by design: it can only send to that inbox.
     * While it's a placeholder, the form opens the visitor's email app instead.
     */
    web3formsKey: "faa1f3c4-7c3c-4d7a-9f0f-0edf45981f3d",
  },

  /* --------------------------------------------------------------- Social */
  social: {
    instagram: { handle: "@wcnilabs", url: "https://www.instagram.com/wcnilabs/" },
    /** e.g. { handle: "wcnilabs", url: "https://github.com/wcnilabs" } */
    github: { handle: "wcnilabs", url: "https://github.com/wcnilabs" },
  },

  /** Public repository of this website (case study #1). */
  repoUrl: "https://github.com/wcnilabs/WCNI_Labs_website",

  /*
   * No prices, contract terms or timelines on the site for now (removed in
   * v1.2 until they're decided). Add them back here when they are.
   */

  /* ------------------------------------------------------------- Founders */
  founders,

  /* ---------------------------------------------------------------- Legal */
  legal: {
    /** ISO date the privacy page was last changed. */
    privacyUpdated: "2026-11-09",
  },

  /* ------------------------------------------------------------ Analytics */
  /**
   * Vercel Web Analytics: cookieless, anonymous page-view counts. The script
   * is only added to builds made on Vercel, and Analytics must also be
   * enabled in the Vercel dashboard (Project → Analytics → Enable).
   * Set to false to remove it (and update the privacy page).
   */
  vercelAnalytics: true,
};

export type Site = typeof site;
