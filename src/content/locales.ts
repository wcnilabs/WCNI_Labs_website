/**
 * Languages the site is published in.
 *
 * To add Portuguese later:
 *   1. add "pt" here,
 *   2. fix the TypeScript errors in `site.ts` (every Localized field now needs a "pt" value),
 *   3. copy `i18n/en.ts` to `i18n/pt.ts` and translate it,
 *   4. add `app/pt/page.tsx` and `app/pt/privacy/page.tsx` that render the same views with "pt".
 */
export const locales = ["en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

/** A value written once per language. */
export type Localized<T = string> = Record<Locale, T>;

/** URL prefix for a locale: "" for the default language, "/pt" for Portuguese, etc. */
export function localePrefix(locale: Locale): string {
  return locale === defaultLocale ? "" : `/${locale}`;
}

/** Value used in <html lang> and Open Graph. */
export const htmlLang: Record<Locale, string> = { en: "en" };
export const ogLocale: Record<Locale, string> = { en: "en_GB" };
