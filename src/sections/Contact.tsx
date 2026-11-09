import { Button } from "@/components/Button";
import { Fill } from "@/components/Fill";
import { Section } from "@/components/Section";
import { sectionIds, site } from "@/content";
import { mailtoHref } from "@/lib/links";
import { ContactForm } from "./ContactForm";
import type { SectionProps } from "./types";
import styles from "./Contact.module.css";

/** On narrow phones a long address wraps after the "@", not mid-word. */
function breakAfterAt(address: string) {
  const at = address.indexOf("@");
  if (at < 0) return address;
  return (
    <>
      {address.slice(0, at + 1)}
      <wbr />
      {address.slice(at + 1)}
    </>
  );
}

/** Email first, then the form. */
export function Contact({ t, meta }: SectionProps) {
  const c = t.contact;
  const email = mailtoHref(site.contact.email);

  return (
    <Section
      id={sectionIds.contact}
      tone="carbon"
      label={c.label}
      title={c.title}
      lead={<Fill>{c.lead}</Fill>}
      meta={meta}
    >
      <div className={styles.layout}>
        <div data-reveal="up" className={styles.channels}>
          <div className={styles.primary}>
            <Button href={email ?? "#contact-form"} arrow="out" className={styles.cta}>
              {c.channels.emailCta}
            </Button>
          </div>

          <dl className={styles.list}>
            <div className={styles.row}>
              <dt>{c.channels.emailLabel}</dt>
              <dd>
                {email ? (
                  <a href={email}>{breakAfterAt(site.contact.email)}</a>
                ) : (
                  <Fill>{site.contact.email}</Fill>
                )}
              </dd>
            </div>
            <div className={styles.row}>
              <dt>{c.channels.instagramLabel}</dt>
              <dd>
                <a href={site.social.instagram.url} rel="me">
                  {site.social.instagram.handle}
                </a>
              </dd>
            </div>
          </dl>
        </div>

        <div data-reveal="up">
          <ContactForm
            id="contact-form"
            copy={c.form}
            email={site.contact.email}
            accessKey={site.contact.web3formsKey}
          />
        </div>
      </div>
    </Section>
  );
}
