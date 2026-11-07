import { cx } from "@/lib/cx";
import styles from "./Logo.module.css";

type LogoProps = {
  className?: string;
  /** Hide from screen readers when the surrounding element already names it. */
  decorative?: boolean;
};

/**
 * The wordmark, built as live text: WCNI (600) + / (400, signal orange) + labs (400).
 * Size it with font-size on the element or a parent.
 */
export function Logo({ className, decorative = false }: LogoProps) {
  const a11y = decorative
    ? ({ "aria-hidden": true } as const)
    : ({ role: "img", "aria-label": "WCNI Labs" } as const);

  return (
    <span className={cx(styles.logo, className)} {...a11y}>
      <span className={styles.wcni}>WCNI</span>
      <span className={styles.slash}>/</span>
      <span>labs</span>
    </span>
  );
}
