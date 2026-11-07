import localFont from "next/font/local";

/**
 * IBM Plex Mono, self-hosted (SIL Open Font License, see OFL-LICENSE.txt).
 * Only the two weights the site uses are shipped and preloaded: 400 and 600.
 * `display: swap` plus next/font's metric-matched fallback keeps layout shift near zero.
 * The .woff files in ./woff are only used at build time (social image, icons).
 */
export const plexMono = localFont({
  src: [
    { path: "./ibm-plex-mono-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./ibm-plex-mono-latin-600-normal.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-plex",
  display: "swap",
  preload: true,
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "Consolas", "monospace"],
});
