import { Fill } from "@/components/Fill";
import { Section } from "@/components/Section";
import { getDictionary, site, type Locale } from "@/content";
import styles from "./PrivacyPage.module.css";

export function PrivacyPage({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const p = t.privacy;
  const updated = new Date(`${site.legal.privacyUpdated}T00:00:00Z`);
  const updatedText = updated.toLocaleDateString(locale, { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });

  return (
    <Section
      id="privacy"
      tone="paper"
      headingLevel={1}
      label={p.label}
      title={p.title}
      lead={p.lead}
      meta={{ left: t.sectionMeta, right: `${p.updatedLabel} ${site.legal.privacyUpdated}` }}
    >
      <div className={styles.layout}>
        <p className={styles.updated}>
          {p.updatedLabel}: <time dateTime={site.legal.privacyUpdated}>{updatedText}</time>
        </p>
        <div className={styles.body}>
          {p.sections.map((section) => (
            <section key={section.heading} className={styles.block}>
              <h2 className={styles.heading}>{section.heading}</h2>
              <div className={styles.text}>
                {section.body.map((paragraph) => (
                  <p key={paragraph}>
                    <Fill>{paragraph}</Fill>
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </Section>
  );
}
