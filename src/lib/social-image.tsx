import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { getDictionary, type Locale } from "@/content";

export const socialImageSize = { width: 1200, height: 630 };

const fontFile = (weight: 400 | 600) =>
  readFile(join(process.cwd(), `src/fonts/woff/ibm-plex-mono-latin-${weight}-normal.woff`));

/**
 * 1200×630 social card in the same layout as the Instagram posts:
 * metadata row, wordmark, slogan, metadata row. Rendered once at build time.
 */
export async function renderSocialImage(locale: Locale) {
  const t = getDictionary(locale);
  const [regular, strong] = await Promise.all([fontFile(400), fontFile(600)]);

  const metaRow = {
    display: "flex",
    justifyContent: "space-between",
    fontSize: 24,
    color: "#A8A8A8",
  } as const;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 72px",
          background: "#111111",
          color: "#F2F0EB",
          fontFamily: "Plex",
        }}
      >
        <div style={metaRow}>
          <span>{t.sectionMeta}</span>
          <span>01/01</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 34 }}>
          <div style={{ display: "flex", fontSize: 150, lineHeight: 1, letterSpacing: -5.25 }}>
            <span style={{ fontWeight: 600 }}>WCNI</span>
            <span style={{ color: "#FF5A1F" }}>/</span>
            <span>labs</span>
          </div>
          <div style={{ display: "flex", fontSize: 46, lineHeight: 1.25 }}>{t.hero.slogan}</div>
        </div>
        <div style={metaRow}>
          <span>{t.meta.ogLine}</span>
          <span>wcnilabs</span>
        </div>
      </div>
    ),
    {
      ...socialImageSize,
      fonts: [
        { name: "Plex", data: regular, weight: 400, style: "normal" },
        { name: "Plex", data: strong, weight: 600, style: "normal" },
      ],
    },
  );
}
