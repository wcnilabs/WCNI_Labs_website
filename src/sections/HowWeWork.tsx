import type { CSSProperties } from "react";
import { Section } from "@/components/Section";
import { sectionIds } from "@/content";
import { pad2 } from "@/lib/format";
import { StepsTimeline } from "./StepsTimeline";
import type { SectionProps } from "./types";
import styles from "./HowWeWork.module.css";

/**
 * The process as a timeline (five steps: understand, explore, design, build,
 * maintain & evolve). With JavaScript, the progress bar follows the scroll and
 * each step appears as the bar reaches it (StepsTimeline). Without it, all
 * steps are shown on one ruled line, first marker orange.
 */
export function HowWeWork({ t, meta }: SectionProps) {
  const s = t.howWeWork;
  const total = s.steps.length;

  return (
    <Section
      id={sectionIds.howWeWork}
      tone="carbon"
      label={s.label}
      title={s.title}
      lead={s.lead}
      meta={meta}
      className={styles.section}
    >
      <StepsTimeline className={styles.timeline} style={{ "--steps": total } as CSSProperties}>
        <div className={styles.bar} aria-hidden="true">
          <span className={styles.fill} />
          <span className={styles.tip} />
          <span className={styles.readout} data-readout>
            000%
          </span>
        </div>
        <ol role="list" className={styles.steps}>
          {s.steps.map((step, index) => (
            <li key={step.title} data-step className={styles.step}>
              <p className={styles.stepMeta}>
                <span>
                  {s.stepLabel} {pad2(index + 1)}
                </span>
                <span aria-hidden="true">/{pad2(total)}</span>
              </p>
              <h3 className={styles.title}>{step.title}</h3>
              <p className={styles.body}>{step.body}</p>
            </li>
          ))}
        </ol>
      </StepsTimeline>
    </Section>
  );
}
