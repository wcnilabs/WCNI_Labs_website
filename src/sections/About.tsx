import { Fill } from "@/components/Fill";
import { PhotoFrame } from "@/components/PhotoFrame";
import { Section } from "@/components/Section";
import { sectionIds, site } from "@/content";
import { pad2 } from "@/lib/format";
import { safeUrl } from "@/lib/links";
import type { SectionProps } from "./types";
import styles from "./About.module.css";

/** Who we are. Names, roles, photos and backgrounds come from src/content/site.ts. */
export function About({ t, locale, meta }: SectionProps) {
  const a = t.about;
  const github = safeUrl(site.social.github.url);

  return (
    <Section id={sectionIds.about} tone="carbon" label={a.label} title={a.title} lead={a.lead} meta={meta}>
      <div className={styles.intro}>
        <div data-reveal="up" className={styles.text}>
          {a.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <dl data-reveal="up" className={styles.facts}>
          <div className={styles.fact}>
            <dt>{a.basedInLabel}</dt>
            <dd>
              <Fill>{a.basedIn}</Fill>
            </dd>
          </div>
          <div className={styles.fact}>
            <dt>{a.linksLabel}</dt>
            <dd className={styles.links}>
              <a href={site.social.instagram.url} rel="me">
                Instagram {site.social.instagram.handle}
              </a>
              {github && (
                <a href={github} rel="me">
                  GitHub {site.social.github.handle}
                </a>
              )}
            </dd>
          </div>
        </dl>
      </div>

      <ul role="list" className={styles.founders}>
        {site.founders.map((founder, index) => (
          <li key={index} data-reveal="custom" className={styles.founder}>
            {founder.photo !== null && (
              <div className={styles.photo}>
                <PhotoFrame src={founder.photo} alt={founder.photoAlt?.[locale] ?? founder.name} />
              </div>
            )}
            <div className={styles.person}>
              <p className={styles.kicker}>
                {a.founderMeta} {pad2(index + 1)}
              </p>
              <h3 className={styles.name}>
                <Fill>{founder.name}</Fill>
              </h3>
              <p className={styles.role}>
                <Fill>{founder.role[locale]}</Fill>
              </p>
              <p className={styles.background}>
                <Fill>{founder.background[locale]}</Fill>
              </p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
