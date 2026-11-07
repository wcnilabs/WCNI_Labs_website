import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { Label } from "@/components/Label";
import { MetaRow } from "@/components/MetaRow";
import { getDictionary } from "@/content";
import { cx } from "@/lib/cx";
import styles from "./not-found.module.css";

const t = getDictionary("en");

export const metadata: Metadata = {
  title: t.notFound.metaTitle,
  robots: { index: false, follow: true },
};

export default function NotFound() {
  const n = t.notFound;
  return (
    <section data-tone="carbon" className={styles.page} aria-labelledby="not-found-title">
      <div className={cx("container", styles.inner)}>
        <MetaRow left={n.meta} right="404/404" />
        <div className={styles.body}>
          <Label>{n.label}</Label>
          <h1 id="not-found-title" className={styles.title}>
            {n.title}
          </h1>
          <p className={styles.text}>{n.body}</p>
          <Button href="/" arrow="right">
            {n.back}
          </Button>
        </div>
        <MetaRow left="wcnilabs" right="EOF" />
      </div>
    </section>
  );
}
