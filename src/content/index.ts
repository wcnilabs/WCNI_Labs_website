import { en, type Dictionary } from "./i18n/en";
import type { Locale } from "./locales";

const dictionaries: Record<Locale, Dictionary> = { en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export { site } from "./site";
export { workKinds, type WorkKind } from "./i18n/en";
export type { Dictionary };
export * from "./locales";

/**
 * Section anchors on the home page. Header links, buttons and the sitemap
 * all point here, so renaming a section is a one-line change.
 */
export const sectionIds = {
  top: "top",
  whatWeBuild: "what-we-build",
  howWeWork: "how-we-work",
  workingWithUs: "working-with-us",
  work: "work",
  about: "about",
  faq: "faq",
  contact: "contact",
} as const;
