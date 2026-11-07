"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { cx } from "@/lib/cx";
import styles from "./MobileMenu.module.css";

type MobileMenuProps = {
  links: { href: string; label: string }[];
  navLabel: string;
  openLabel: string;
  closeLabel: string;
  className?: string;
};

/**
 * Phone menu: a real <button> that opens a list of links under the header.
 * Escape closes it and returns focus to the button; choosing a link closes it.
 */
export function MobileMenu({ links, navLabel, openLabel, closeLabel, className }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

  const close = useCallback((returnFocus: boolean) => {
    setOpen(false);
    if (returnFocus) buttonRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close(true);
    };
    const onPointer = (event: PointerEvent) => {
      const target = event.target as Node;
      if (!panelRef.current?.contains(target) && !buttonRef.current?.contains(target)) close(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open, close]);

  return (
    <div className={cx(styles.menu, className)}>
      <button
        ref={buttonRef}
        type="button"
        className={styles.toggle}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
      >
        <span>{open ? closeLabel : openLabel}</span>
        <span className={styles.icon} data-open={open} aria-hidden="true" />
      </button>

      <div ref={panelRef} id={panelId} className={styles.panel} hidden={!open}>
        <nav aria-label={navLabel} className="container">
          <ol role="list" className={styles.list}>
            {links.map((link, index) => (
              <li key={link.href}>
                <a href={link.href} className={styles.link} onClick={() => close(false)}>
                  <span className={styles.index} aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {link.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </div>
  );
}
