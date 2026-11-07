import { Button } from "@/components/Button";
import { MetaRow } from "@/components/MetaRow";
import { Section } from "@/components/Section";
import { sectionIds, workKinds } from "@/content";
import { cx } from "@/lib/cx";
import { safeUrl } from "@/lib/links";
import type { SectionProps } from "./types";
import styles from "./Work.module.css";

/**
 * Case studies. Each entry in `t.work.cases` renders as a card; add projects
 * to that list (and later a /work/[slug] page) and they drop in here.
 * Every entry has a `kind` (client work, our own, demo), shown on the card and
 * explained in the key above the grid, so a demo never passes for client work.
 */
export function Work({ t, meta }: SectionProps) {
  const w = t.work;

  return (
    <Section id={sectionIds.work} tone="paper" label={w.label} title={w.title} lead={w.lead} meta={meta}>
      <dl data-reveal="up" className={styles.key} aria-label={w.kindsLabel}>
        {workKinds.map((kind) => (
          <div key={kind} className={styles.keyItem}>
            <dt>{w.kinds[kind].label}</dt>
            <dd>{w.kinds[kind].note}</dd>
          </div>
        ))}
      </dl>

      <div className={styles.grid}>
        {w.cases.map((study) => {
          const href = safeUrl(study.href);
          const titleId = `case-${study.slug}`;
          return (
            <article key={study.slug} data-reveal="up" className={styles.card} aria-labelledby={titleId}>
              <MetaRow
                left={study.meta}
                right={`${w.kinds[study.kind].label} · ${study.year}`}
                ruled
                decorative={false}
              />
              <h3 id={titleId} className={styles.title}>
                {study.title}
              </h3>
              <p className={styles.summary}>{study.summary}</p>
              <dl className={styles.facts}>
                {study.facts.map((fact) => (
                  <div key={fact.term} className={styles.fact}>
                    <dt>{fact.term}</dt>
                    <dd>{fact.detail}</dd>
                  </div>
                ))}
              </dl>
              {href && (
                <div className={styles.link}>
                  <Button href={href} variant="text" arrow="out">
                    {study.linkLabel}
                  </Button>
                </div>
              )}
            </article>
          );
        })}

        <article data-reveal="up" className={cx("dash-box", styles.card, styles.slot)} aria-labelledby="case-open-slot">
          <MetaRow left={w.openSlot.meta} right={w.openSlot.status} ruled />
          <h3 id="case-open-slot" className={styles.title}>
            {w.openSlot.title}
          </h3>
          <p className={styles.summary}>{w.openSlot.body}</p>
          <div className={styles.link}>
            <Button href={`#${sectionIds.contact}`} variant="text" arrow="right">
              {w.openSlot.linkLabel}
            </Button>
          </div>
        </article>
      </div>
    </Section>
  );
}
