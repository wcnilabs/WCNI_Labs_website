import { Button } from "@/components/Button";
import { Section } from "@/components/Section";
import { sectionIds } from "@/content";
import { pad2 } from "@/lib/format";
import type { SectionProps } from "./types";
import styles from "./Capabilities.module.css";

/**
 * What we build: the areas the studio works in, as a ruled, numbered spec list.
 * These are capabilities, not a portfolio. Finished projects belong in Work.
 */
export function Capabilities({ t, meta }: SectionProps) {
  const s = t.capabilities;

  return (
    <Section id={sectionIds.whatWeBuild} tone="paper" label={s.label} title={s.title} lead={s.lead} meta={meta}>
      <ol role="list" className={styles.areas}>
        {s.areas.map((area, index) => (
          <li key={area.title} data-reveal="custom" className={styles.area}>
            <span className={styles.number} aria-hidden="true">
              {pad2(index + 1)}
            </span>
            <h3 className={styles.title}>{area.title}</h3>
            <div className={styles.text}>
              <p className={styles.body}>{area.body}</p>
              <ul role="list" aria-label={s.examplesLabel} className={styles.examples}>
                {area.examples.map((example) => (
                  <li key={example}>{example}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>

      <div data-reveal="up" className={styles.note}>
        <p>{s.note}</p>
        <Button href={`#${sectionIds.contact}`} variant="text" arrow="right">
          {s.noteLink}
        </Button>
      </div>
    </Section>
  );
}
