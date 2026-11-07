import type { Dictionary, Locale } from "@/content";
import { localePrefix } from "@/content";
import { cx } from "@/lib/cx";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import styles from "./SiteHeader.module.css";

type SiteHeaderProps = { t: Dictionary; locale: Locale };

/** Small sticky bar: logo left, section links right, a simple menu on phones. */
export function SiteHeader({ t, locale }: SiteHeaderProps) {
  const base = localePrefix(locale);
  const links = t.nav.map((item) => ({ href: `${base}/#${item.id}`, label: item.label }));

  return (
    <header className={styles.header} data-tone="carbon">
      <div className={cx("container", styles.inner)}>
        <a href={`${base}/`} className={styles.home}>
          <Logo decorative className={styles.logo} />
          <span className="visually-hidden">WCNI Labs — {t.common.home}</span>
        </a>

        <nav aria-label={t.common.mainNav} className={styles.desktop}>
          <ul role="list" className={styles.list}>
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href} className={styles.link}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <MobileMenu
          links={links}
          navLabel={t.common.mainNav}
          openLabel={t.common.menu}
          closeLabel={t.common.close}
          className={styles.mobile}
        />
      </div>
    </header>
  );
}
