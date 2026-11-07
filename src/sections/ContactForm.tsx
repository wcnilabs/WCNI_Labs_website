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
  /** Optional POST endpoint (e.g. a Cloudflare Pages Function). Empty = mailto mode. */
  endpoint: string;
};

/**
 * Works without any paid service:
 *  - no endpoint configured → opens the visitor's email app with the message filled in;
 *  - endpoint configured    → POSTs JSON to it and shows the result.
 * Without JavaScript the browser falls back to a native mailto: form submission.
 */
export function ContactForm({ id, copy, email, endpoint }: ContactFormProps) {
  const [status, setStatus] = useState<Status>("idle");
  const hasEmail = isFilled(email);
  const useEndpoint = endpoint.trim() !== "";

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
    if (field("website")) return;

    const payload = {
      name: field("name"),
      business: field("business"),
      reach: field("reach"),
      message: field("message"),
    };

    if (useEndpoint) {
      setStatus("sending");
      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        form.reset();
        setStatus("sent");
      } catch {
        setStatus("error");
      }
      return;
    }

    const subject = `${copy.mailSubject}: ${payload.business || payload.name}`;
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
      // No-JS fallback: the browser hands the fields to the email app.
      action={!useEndpoint && hasEmail ? `mailto:${email}` : undefined}
      method="post"
      encType="text/plain"
      aria-labelledby={`${id}-title`}
    >
      <h3 id={`${id}-title`} className={styles.title}>
        {copy.title}
      </h3>

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

      {/* Honeypot for bots — hidden from people and assistive tech. */}
      <div className={styles.trap} aria-hidden="true">
        <label htmlFor={`${id}-website`}>Website</label>
        <input id={`${id}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className={styles.submitRow}>
        <Button type="submit" variant="secondary" arrow="right" disabled={status === "sending"}>
          {status === "sending" ? copy.sending : copy.submit}
        </Button>
        {!useEndpoint && <p className={styles.note}>{copy.mailtoNote}</p>}
      </div>

      <p role="status" aria-live="polite" className={styles.status} data-status={status}>
        {statusText[status] ?? ""}
      </p>
    </form>
  );
}
