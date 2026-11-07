import { site, type Dictionary, type Locale } from "@/content";
import { safeUrl } from "./links";
import { isFilled } from "./placeholders";

/** schema.org Organization. Placeholders are left out so no "[EMAIL]" reaches search engines. */
export function organizationJsonLd(t: Dictionary, locale: Locale): Record<string, unknown> {
  const sameAs = [site.social.instagram.url, safeUrl(site.social.github.url)].filter(Boolean);
  const founders = site.founders
    .filter((f) => isFilled(f.name))
    .map((f) => ({ "@type": "Person", name: f.name }));

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    alternateName: site.fullName,
    url: site.url,
    logo: new URL("/icon-512.png", site.url).toString(),
    slogan: t.hero.slogan,
    description: t.meta.description,
    knowsAbout: t.meta.knowsAbout,
    ...(isFilled(site.contact.email) && { email: site.contact.email }),
    ...(founders.length > 0 && { founder: founders }),
    ...(isFilled(site.basedIn[locale]) && { address: site.basedIn[locale] }),
    sameAs,
  };
}
