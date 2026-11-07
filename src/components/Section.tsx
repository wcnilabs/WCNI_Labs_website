import type { ReactNode } from "react";
import { cx } from "@/lib/cx";
import { Label } from "./Label";
import { MetaRow } from "./MetaRow";
import styles from "./Section.module.css";

export type Tone = "paper" | "carbon";

type SectionProps = {
  id: string;
  tone: Tone;
  /** Uppercase label after the orange slash. */
  label: string;
  /** The big headline. */
  title: ReactNode;
  /** Calm sentence under the headline. */
  lead?: ReactNode;
  /** Metadata row at the top, like the posts: left text and "02/08". */
  meta?: { left: ReactNode; right?: ReactNode };
  /** h2 on the home page; h1 on single-topic pages such as /privacy. */
  headingLevel?: 1 | 2;
  children?: ReactNode;
  className?: string;
};

/**
 * A full-bleed band in one tone (paper or carbon), laid out like a post:
 * metadata row, label, heavy headline, lead, then the section's own content.
 */
export function Section({
  id,
  tone,
  label,
  title,
  lead,
  meta,
  headingLevel = 2,
  children,
  className,
}: SectionProps) {
  const Heading = headingLevel === 1 ? "h1" : "h2";
  const titleId = `${id}-title`;

  return (
    <section id={id} data-tone={tone} className={cx(styles.section, className)} aria-labelledby={titleId}>
      <div className="container">
        {meta && (
          <div data-reveal="up" className={styles.meta}>
            <MetaRow left={meta.left} right={meta.right} />
          </div>
        )}
        <header data-reveal="custom" className={styles.head}>
          <Label>{label}</Label>
          <Heading id={titleId} className={styles.title}>
            {title}
          </Heading>
          {lead && <p className={styles.lead}>{lead}</p>}
        </header>
        {children && <div className={styles.body}>{children}</div>}
      </div>
    </section>
  );
}
