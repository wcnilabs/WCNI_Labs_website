import type { ReactNode } from "react";
import { PLACEHOLDER_PATTERN } from "@/lib/placeholders";
import styles from "./Fill.module.css";

/**
 * Renders text as is, but draws an orange dashed box around any
 * "[PLACEHOLDER]" still in it, so a missing fact is impossible to miss
 * while building. Filled-in details are plain text.
 */
export function Fill({ children }: { children: string }) {
  const parts: ReactNode[] = [];
  let last = 0;

  for (const match of children.matchAll(new RegExp(PLACEHOLDER_PATTERN.source, "g"))) {
    const start = match.index ?? 0;
    if (start > last) parts.push(children.slice(last, start));
    parts.push(
      <span key={start} className={`dash-box ${styles.todo}`} title="Placeholder: fill this in src/content/site.ts">
        {match[0]}
      </span>,
    );
    last = start + match[0].length;
  }
  if (last < children.length) parts.push(children.slice(last));

  return <>{parts}</>;
}
