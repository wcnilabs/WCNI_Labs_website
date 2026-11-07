import { Button } from "@/components/Button";
import { Fill } from "@/components/Fill";
import { Section } from "@/components/Section";
import { sectionIds } from "@/content";
import { pad2 } from "@/lib/format";
import type { SectionProps } from "./types";
import styles from "./Faq.module.css";

/** Plain <details> elements: keyboard-friendly and no JavaScript needed. */
export function Faq({ t, meta }: SectionProps) {
  const f = t.faq;

  return (
    <Section id={sectionIds.faq} tone="paper" label={f.label} title={f.title} meta={meta}>
      <div className={styles.layout}>
        <div className={styles.list}>
          {f.items.map((item, index) => (
            <details key={item.q} data-reveal="up" className={styles.item}>
              <summary className={styles.summary}>
                <span className={styles.number} aria-hidden="true">
                  Q.{pad2(index + 1)}
                </span>
                <span className={styles.question}>{item.q}</span>
                <span className={styles.icon} aria-hidden="true" />
              </summary>
              <div className={styles.answer}>
                {item.a.map((paragraph) => (
                  <p key={paragraph}>
                    <Fill>{paragraph}</Fill>
                  </p>
                ))}
              </div>
            </details>
          ))}
        </div>

        <aside data-reveal="up" className={styles.more}>
          <p>{f.more}</p>
          <Button href={`#${sectionIds.contact}`} variant="text" arrow="right">
            {f.moreLink}
          </Button>
        </aside>
      </div>
    </Section>
  );
}
