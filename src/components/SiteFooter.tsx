import type { Dictionary, Locale } from "@/content";
import { localePrefix, site } from "@/content";
import { cx } from "@/lib/cx";
import { safeUrl } from "@/lib/links";
import { Fill } from "./Fill";
import { Logo } from "./Logo";
import { MetaRow } from "./MetaRow";
import styles from "./SiteFooter.module.css";

type SiteFooterProps = { t: Dictionary; locale: Locale };

export function SiteFooter({ t, locale }: SiteFooterProps) {
  const base = localePrefix(locale);
  const year = new Date().getFullYear();
  const github = safeUrl(site.social.github.url);

  return (
    <footer data-tone="paper" className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.brand}>
            <a href={`${base}/`} className={styles.logoLink}>
              <Logo decorative className={styles.logo} />
              <span className="visually-hidden">WCNI Labs — {t.common.home}</span>
            </a>
            <p className={styles.slogan}>{t.footer.slogan}</p>
            <p className={styles.place}>
              <Fill>{site.basedIn[locale]}</Fill>
            </p>
          </div>

          <nav aria-labelledby="footer-site" className={styles.col}>
            <p id="footer-site" className={styles.colTitle}>
              {t.footer.siteLabel}
            </p>
            <ul role="list" className={styles.links}>
              {t.nav.map((item) => (
                <li key={item.id}>
                  <a href={`${base}/#${item.id}`}>{item.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.col}>
            <p className={styles.colTitle}>{t.footer.elsewhereLabel}</p>
            <ul role="list" className={styles.links}>
              <li>
                <a href={site.social.instagram.url} rel="me">
                  Instagram {site.social.instagram.handle}
                </a>
              </li>
              {github && (
                <li>
                  <a href={github} rel="me">
                    GitHub
                  </a>
                </li>
              )}
            </ul>
          </div>

          <div className={styles.col}>
            <p className={styles.colTitle}>{t.footer.legalLabel}</p>
            <ul role="list" className={styles.links}>
              <li>
                <a href={`${base}/privacy/`}>{t.footer.privacy}</a>
              </li>
            </ul>
          </div>
        </div>

        <MetaRow
          ruled={false}
          decorative={false}
          className={cx(styles.bottom)}
          left={`© ${year} WCNI Labs · ${t.footer.rights}`}
          right={<span aria-hidden="true">{t.footer.eof}</span>}
        />
      </div>
    </footer>
  );
}
