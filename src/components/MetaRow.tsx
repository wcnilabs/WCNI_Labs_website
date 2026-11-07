import type { ReactNode } from "react";
import { cx } from "@/lib/cx";
import styles from "./MetaRow.module.css";

type MetaRowProps = {
  left: ReactNode;
  right?: ReactNode;
  /** Draw a thin rule under the row. */
  ruled?: boolean;
  /** Metadata rows are decoration by default; set false when they carry real info. */
  decorative?: boolean;
  className?: string;
};

/** The small mono row at the top of every post: "WCNI/LOG 001 ........ 01/05". */
export function MetaRow({ left, right, ruled = false, decorative = true, className }: MetaRowProps) {
  return (
    <div
      className={cx(styles.row, ruled && styles.ruled, className)}
      aria-hidden={decorative || undefined}
    >
      <span>{left}</span>
      {right != null && <span className={styles.right}>{right}</span>}
    </div>
  );
}
