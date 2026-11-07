import { Button } from "@/components/Button";
import { Logo } from "@/components/Logo";
import { MetaRow } from "@/components/MetaRow";
import { sectionIds } from "@/content";
import { cx } from "@/lib/cx";
import type { SectionProps } from "./types";
import styles from "./Hero.module.css";

/** Dark opening screen, composed like post 1 slide 1. */
export function Hero({ t, meta }: SectionProps) {
  return (
    <section id={sectionIds.top} data-tone="carbon" className={styles.hero} aria-labelledby="hero-title">
      <div className={cx("container", styles.inner)}>
        <MetaRow left={meta.left} right={meta.right} />

        <div className={styles.body}>
          <h1 id="hero-title" className={styles.title}>
            <Logo className={styles.logo} />
            <span className={styles.slogan}>
              {t.hero.slogan}
              <span className={styles.cursor} aria-hidden="true" />
            </span>
          </h1>

          <p className={styles.intro}>{t.hero.intro}</p>

          <div className={styles.actions}>
            <Button href={`#${sectionIds.contact}`} arrow="right">
              {t.hero.primary}
            </Button>
            <Button href={`#${sectionIds.whatWeBuild}`} variant="text" arrow="down">
              {t.hero.secondary}
            </Button>
          </div>
        </div>

        <MetaRow left={t.hero.footLeft} right={`${t.hero.footRight} ↓`} />
      </div>
    </section>
  );
}
