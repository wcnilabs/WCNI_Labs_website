import type { ReactNode } from "react";
import type { Dictionary, Locale } from "@/content";

/** Props every home-page section receives. */
export type SectionProps = {
  t: Dictionary;
  locale: Locale;
  /** Metadata row shown at the top of the section: "WCNI/SITE v1.1 ... 02/08". */
  meta: { left: ReactNode; right: ReactNode };
};
