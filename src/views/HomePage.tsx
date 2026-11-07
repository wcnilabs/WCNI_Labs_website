import { JsonLd } from "@/components/JsonLd";
import { getDictionary, type Locale } from "@/content";
import { counter } from "@/lib/format";
import { organizationJsonLd } from "@/lib/seo";
import { About } from "@/sections/About";
import { Capabilities } from "@/sections/Capabilities";
import { Contact } from "@/sections/Contact";
import { Faq } from "@/sections/Faq";
import { Hero } from "@/sections/Hero";
import { HowWeWork } from "@/sections/HowWeWork";
import { Work } from "@/sections/Work";
import { WorkingWithUs } from "@/sections/WorkingWithUs";

/**
 * The home page, read top to bottom like one long carousel: each section
 * gets a post-style counter ("03/08"). Reorder or remove sections here.
 * Order: who we are, what we build, how, the two ways to work with us,
 * work so far, the people, questions, contact.
 * A future "Products" section slots in here too (kept out until it exists).
 */
const sections = [Hero, Capabilities, HowWeWork, WorkingWithUs, Work, About, Faq, Contact];

export function HomePage({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const total = sections.length;

  return (
    <>
      {sections.map((SectionComponent, index) => (
        <SectionComponent
          key={index}
          t={t}
          locale={locale}
          meta={{ left: t.sectionMeta, right: counter(index + 1, total) }}
        />
      ))}
      <JsonLd data={organizationJsonLd(t, locale)} />
    </>
  );
}
