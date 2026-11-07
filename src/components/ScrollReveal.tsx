"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/** Reveal when the element's top passes this fraction of the viewport height. */
const TRIGGER = 0.88;

/**
 * Scroll reveal for every element marked `data-reveal` (styles in src/styles/motion.css).
 *
 * - Progressive: the HTML is fully visible without JavaScript. This only hides
 *   elements that are still below the screen once the page is running, so
 *   nothing on screen ever blinks out.
 * - Siblings that come into view together are numbered 0, 1, 2… (`--reveal-k`)
 *   so CSS can stagger them. A row of four steps on desktop gets 0–3; the same
 *   steps stacked on a phone each get 0, because they arrive one at a time.
 * - Does nothing for people who prefer reduced motion.
 */
export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const show = (el: HTMLElement, k: number) => {
      el.style.setProperty("--reveal-k", String(k));
      el.dataset.revealState = "in";
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const arriving = entries
          .filter((entry) => entry.isIntersecting)
          .map((entry) => entry.target as HTMLElement)
          .sort((a, b) => (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1));
        // Stagger counts siblings only: four steps in one list get 0–3,
        // even if the section heading above them arrived in the same frame.
        const perParent = new Map<Element | null, number>();
        for (const el of arriving) {
          const k = perParent.get(el.parentElement) ?? 0;
          perParent.set(el.parentElement, k + 1);
          show(el, k);
          observer.unobserve(el);
        }
      },
      { rootMargin: `0px 0px -${Math.round((1 - TRIGGER) * 100)}% 0px` },
    );

    const fold = window.innerHeight * TRIGGER;
    for (const el of document.querySelectorAll<HTMLElement>("[data-reveal]")) {
      if (el.dataset.revealState) continue;
      // Already on screen (or above it): leave it alone.
      if (el.getBoundingClientRect().top < fold) continue;
      el.dataset.revealState = "out";
      observer.observe(el);
    }

    return () => {
      observer.disconnect();
      // Never leave anything hidden behind.
      for (const el of document.querySelectorAll<HTMLElement>('[data-reveal-state="out"]')) {
        el.removeAttribute("data-reveal-state");
      }
    };
  }, [pathname]);

  return null;
}
