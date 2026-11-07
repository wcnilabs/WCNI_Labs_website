import type { MetadataRoute } from "next";
import { defaultLocale, getDictionary, site } from "@/content";
import { ICON_VERSION } from "@/lib/metadata";

export const dynamic = "force-static";

/** /manifest.webmanifest: home-screen name and icons (the tab icon is icon.svg). */
export default function manifest(): MetadataRoute.Manifest {
  const t = getDictionary(defaultLocale);

  return {
    name: site.fullName,
    short_name: site.name,
    description: t.meta.description,
    start_url: "/",
    display: "browser",
    background_color: "#f2f0eb",
    theme_color: "#111111",
    icons: [
      { src: `/icon-192.png?v=${ICON_VERSION}`, sizes: "192x192", type: "image/png" },
      { src: `/icon-512.png?v=${ICON_VERSION}`, sizes: "512x512", type: "image/png" },
    ],
  };
}
