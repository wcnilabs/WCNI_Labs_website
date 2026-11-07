import { Section } from "@/components/Section";
import { sectionIds } from "@/content";
import { cx } from "@/lib/cx";
import type { SectionProps } from "./types";
import styles from "./WorkingWithUs.module.css";

/**
 * The two ways clients work with us: a one-time project, or ongoing follow-up.
 * An overview only: no prices, packages or feature lists until they're decided.
 */
export function WorkingWithUs({ t, meta }: SectionProps) {
  const w = t.workingWithUs;

  return (
    <Section id={sectionIds.workingWithUs} tone="paper" label={w.label} title={w.title} meta={meta}>
      <ul role="list" data-reveal="up" className={styles.card}>
        {w.plans.map((plan) => (
          <li key={plan.title} className={cx(styles.cell, styles.plan)}>
            <p className={styles.kicker}>{plan.meta}</p>
            <h3 className={styles.name}>{plan.title}</h3>
            <p className={styles.body}>{plan.body}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
