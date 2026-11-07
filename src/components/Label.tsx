import type { CSSProperties, ReactNode } from "react";
import { cx } from "@/lib/cx";
import styles from "./Label.module.css";

type LabelProps = {
  children: ReactNode;
  as?: "p" | "span" | "h2" | "h3";
  className?: string;
};

/**
 * Section label from the posts: an orange slash, then an uppercase label. "/ WHAT WE DO"
 * `--chars` (slash + text) lets a section type the label in one character at a time.
 */
export function Label({ children, as: Tag = "p", className }: LabelProps) {
  const chars = typeof children === "string" ? children.length + 2 : undefined;

  return (
    <Tag className={cx(styles.label, className)} style={chars ? ({ "--chars": chars } as CSSProperties) : undefined}>
      <span className={styles.slash} aria-hidden="true">
        /
      </span>
      <span>{children}</span>
    </Tag>
  );
}
