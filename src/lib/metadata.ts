import type { Metadata } from "next";
import { getDictionary, ogLocale, site, type Locale } from "@/content";

/**
 * Browsers cache tab icons for a long time by URL. Bump this whenever the
 * icons in public/ change (npm run icons), so everyone gets the new ones.
 */
export const ICON_VERSION = "2";
const v = `?v=${ICON_VERSION}`;

/** Site-wide metadata: titles, description, social cards and icons. Pages add their own canonical URL. */
export function baseMetadata(locale: Locale): Metadata {
  const t = getDictionary(locale);

  return {
    metadataBase: new URL(site.url),
    title: { default: t.meta.title, template: t.meta.titleTemplate },
    description: t.meta.description,
    applicationName: site.name,
    authors: [{ name: site.name, url: site.url }],
    creator: site.name,
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: ogLocale[locale],
      title: t.meta.title,
      description: t.meta.description,
      url: "/",
    },
    twitter: {
      card: "summary_large_image",
      title: t.meta.title,
      description: t.meta.description,
    },
    icons: {
      // sizes="32x32" on the .ico makes Chrome pick the SVG; 192/512 live in the manifest.
      icon: [
        { url: `/favicon.ico${v}`, sizes: "32x32" },
        { url: `/icon.svg${v}`, type: "image/svg+xml" },
      ],
      apple: [{ url: `/apple-touch-icon.png${v}`, sizes: "180x180" }],
    },
    formatDetection: { telephone: false, email: false, address: false },
  };
}
