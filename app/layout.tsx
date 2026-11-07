import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import Script from "next/script";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { defaultLocale, getDictionary, htmlLang, site } from "@/content";
import { plexMono } from "@/fonts";
import { baseMetadata } from "@/lib/metadata";
import "@/styles/tokens.css";
import "@/styles/base.css";
import "@/styles/motion.css";

const locale = defaultLocale;

export const metadata: Metadata = baseMetadata(locale);

export const viewport: Viewport = {
  themeColor: "#111111",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const t = getDictionary(locale);
  const analyticsToken = site.cloudflareAnalyticsToken.trim();

  return (
    <html lang={htmlLang[locale]} className={plexMono.variable}>
      <body>
        <a href="#main" className="skip-link">
          {t.common.skipToContent}
        </a>
        <SiteHeader t={t} locale={locale} />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter t={t} locale={locale} />
        <ScrollReveal />
        {analyticsToken && (
          // Cloudflare Web Analytics: cookieless. Only loads when a token is set in site.ts.
          <Script
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon={JSON.stringify({ token: analyticsToken })}
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  );
}
