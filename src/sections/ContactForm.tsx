"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/Button";
import type { Dictionary } from "@/content";
import { isFilled } from "@/lib/placeholders";
import styles from "./ContactForm.module.css";

type Copy = Dictionary["contact"]["form"];
type Status = "idle" | "sending" | "sent" | "opened" | "error" | "invalid";

type ContactFormProps = {
  id: string;
  copy: Copy;
  /** Where messages go in mailto mode. */
  email: string;
  /** Web3Forms access key. A placeholder or empty = mailto mode. */
  accessKey: string;
};

const WEB3FORMS_URL = "https://api.web3forms.com/submit";
const looksLikeEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

/**
 * Two modes, both free:
 *  - Web3Forms key set → sends the message through Web3Forms (to the key's inbox)
 *    and shows the result. Without JavaScript, the browser posts the form to
 *    Web3Forms directly and their confirmation page opens.
 *  - no key yet        → opens the visitor's email app with the message filled in
 *    (a native mailto: form submission without JavaScript).
 */
export function ContactForm({ id, copy, email, accessKey }: ContactFormProps) {
  const [status, setStatus] = useState<Status>("idle");
  const hasEmail = isFilled(email);
  const useService = isFilled(accessKey);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      setStatus("invalid");
      form.reportValidity();
      return;
    }

    const data = new FormData(form);
    const field = (name: string) => String(data.get(name) ?? "").trim();
    // Honeypot: real people never see or fill this field.
    if (data.get("botcheck")) return;

    const payload = {
      name: field("name"),
      business: field("business"),
      reach: field("reach"),
      message: field("message"),
    };
    const subject = `${copy.mailSubject}: ${payload.business || payload.name}`;

    if (useService) {
      setStatus("sending");
      try {
        const response = await fetch(WEB3FORMS_URL, {
          method: "POST",
          headers: { "content-type": "application/json", accept: "application/json" },
          body: JSON.stringify({
            access_key: accessKey,
            subject,
            from_name: "WCNI Labs website",
            // Reply straight to the visitor when they left an email address.
            ...(looksLikeEmail(payload.reach) ? { replyto: payload.reach } : {}),
            // The keys are the labels shown in the email we receive.
            [copy.name]: payload.name,
            [copy.business]: payload.business || "—",
            [copy.reach]: payload.reach,
            [copy.message]: payload.message,
          }),
        });
        const result = (await response.json().catch(() => null)) as { success?: boolean } | null;
        if (!response.ok || !result?.success) throw new Error(`HTTP ${response.status}`);
        form.reset();
        setStatus("sent");
      } catch {
        setStatus("error");
      }
      return;
    }

    const body = [
      `${copy.name}: ${payload.name}`,
      `${copy.business}: ${payload.business || "—"}`,
      `${copy.reach}: ${payload.reach}`,
      "",
      payload.message,
    ].join("\n");
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatus("opened");
  }

  const statusText: Partial<Record<Status, string>> = {
    sending: copy.sending,
    sent: copy.sentStatus,
    opened: copy.openedStatus,
    error: copy.errorStatus,
    invalid: copy.invalidStatus,
  };

  return (
    <form
      id={id}
      className={styles.form}
      onSubmit={onSubmit}
      noValidate
      // No-JS fallback: post to Web3Forms, or hand the fields to the email app.
      action={useService ? WEB3FORMS_URL : hasEmail ? `mailto:${email}` : undefined}
      method="post"
      encType={useService ? undefined : "text/plain"}
      aria-labelledby={`${id}-title`}
    >
      <h3 id={`${id}-title`} className={styles.title}>
        {copy.title}
      </h3>

      {useService && (
        <>
          <input type="hidden" name="access_key" value={accessKey} />
          <input type="hidden" name="subject" value={copy.mailSubject} />
          <input type="hidden" name="from_name" value="WCNI Labs website" />
        </>
      )}

      <div className={styles.pair}>
        <div className={styles.field}>
          <label htmlFor={`${id}-name`} className={styles.label}>
            {copy.name}
          </label>
          <input id={`${id}-name`} name="name" type="text" autoComplete="name" required className={styles.input} />
        </div>

        <div className={styles.field}>
          <label htmlFor={`${id}-business`} className={styles.label}>
            {copy.business}
            <span className={styles.optional}>{copy.optional}</span>
          </label>
          <input
            id={`${id}-business`}
            name="business"
            type="text"
            autoComplete="organization"
            aria-describedby={`${id}-business-hint`}
            className={styles.input}
          />
          <p id={`${id}-business-hint`} className={styles.hint}>
            {copy.businessHint}
          </p>
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor={`${id}-reach`} className={styles.label}>
          {copy.reach}
        </label>
        <input id={`${id}-reach`} name="reach" type="text" autoComplete="email" required className={styles.input} />
      </div>

      <div className={styles.field}>
        <label htmlFor={`${id}-message`} className={styles.label}>
          {copy.message}
        </label>
        <textarea
          id={`${id}-message`}
          name="message"
          rows={5}
          required
          aria-describedby={`${id}-message-hint`}
          className={styles.input}
        />
        <p id={`${id}-message-hint`} className={styles.hint}>
          {copy.messageHint}
        </p>
      </div>

      {/* Honeypot for bots — hidden from people and assistive tech.
          "botcheck" is the name Web3Forms also checks on its side. */}
      <div className={styles.trap} aria-hidden="true">
        <label htmlFor={`${id}-botcheck`}>Leave this empty</label>
        <input id={`${id}-botcheck`} name="botcheck" type="checkbox" tabIndex={-1} autoComplete="off" />
      </div>

      <div className={styles.submitRow}>
        <Button type="submit" variant="secondary" arrow="right" disabled={status === "sending"}>
          {status === "sending" ? copy.sending : copy.submit}
        </Button>
        {!useService && <p className={styles.note}>{copy.mailtoNote}</p>}
      </div>

      <p role="status" aria-live="polite" className={styles.status} data-status={status}>
        {statusText[status] ?? ""}
      </p>
    </form>
  );
}
