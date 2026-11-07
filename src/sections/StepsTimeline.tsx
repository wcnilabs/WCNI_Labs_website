"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

/** Wide screens hold the section still and scrub the steps; narrower ones get a vertical line. */
const WIDE = "(min-width: 68rem)";
/** Share of the held scroll that fills the bar; the rest shows the finished line before letting go. */
const FILL_SHARE = 0.85;
/** Phones and tablets: the line fills up to this point of the screen (fraction of its height). */
const ANCHOR = 0.6;
/** Distance from a step's top to the centre of its marker, in px (matches the CSS). */
const MARKER_Y = 10;

const clamp = (n: number, min = 0, max = 1) => Math.min(max, Math.max(min, n));

type StepsTimelineProps = {
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
};

/**
 * Scroll-linked progress for the "How we work" steps. The bar follows the
 * scroll, and each step appears when the bar reaches it (and goes away again
 * when you scroll back up).
 *
 * - Wide screens ("pin"): the section stays in place while you scroll through
 *   it; the bar fills from left to right across the steps.
 * - Phones/tablets ("line"): the page scrolls normally; a vertical line next
 *   to the steps fills down to 60% of the screen.
 *
 * Expects inside: [data-step] items, and optionally [data-readout] for the
 * percentage. Styles: HowWeWork.module.css. Without JavaScript or with reduced
 * motion, nothing here runs and the steps are simply all shown.
 */
export function StepsTimeline({ className, style, children }: StepsTimelineProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    const section = root?.closest("section");
    const container = root?.closest<HTMLElement>(".container");
    if (!root || !section || !container) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const steps = Array.from(root.querySelectorAll<HTMLElement>("[data-step]"));
    const readout = root.querySelector<HTMLElement>("[data-readout]");
    if (steps.length === 0) return;

    const wide = window.matchMedia(WIDE);
    let mode: "pin" | "line" = "line";
    let pinTop = 0;
    let lastFill = -1;

    const render = (fill: number, isActive: (index: number) => boolean) => {
      if (fill !== lastFill) {
        root.style.setProperty("--p", fill.toFixed(4));
        if (readout) readout.textContent = `${String(Math.round(fill * 100)).padStart(3, "0")}%`;
        lastFill = fill;
      }
      steps.forEach((step, index) => step.toggleAttribute("data-active", isActive(index)));
      root.toggleAttribute("data-done", fill >= 1);
    };

    const update = () => {
      if (mode === "pin") {
        const style = getComputedStyle(section);
        const padTop = parseFloat(style.paddingTop);
        const held = section.clientHeight - padTop - parseFloat(style.paddingBottom) - container.offsetHeight;
        const naturalTop = section.getBoundingClientRect().top + padTop;
        const progress = held > 0 ? clamp((pinTop - naturalTop) / held) : 1;
        const fill = clamp(progress / FILL_SHARE);
        render(fill, (index) => fill >= index / steps.length + 0.01);
      } else {
        const anchor = window.innerHeight * ANCHOR;
        const first = steps[0].getBoundingClientRect().top + MARKER_Y;
        const track = steps[steps.length - 1].offsetTop - steps[0].offsetTop;
        const fill = track > 0 ? clamp((anchor - first) / track) : 1;
        render(fill, (index) => anchor >= steps[index].getBoundingClientRect().top + MARKER_Y);
      }
    };

    const layout = () => {
      mode = wide.matches ? "pin" : "line";
      root.dataset.scrub = mode;
      if (mode === "pin") {
        section.setAttribute("data-pin", "");
        const header = document.querySelector("body > header");
        const headerHeight = header?.getBoundingClientRect().height ?? 56;
        // Stick just under the header; if the section is taller than the screen,
        // stick it by its bottom edge (with a small margin) so the steps stay in view.
        pinTop = Math.min(headerHeight, window.innerHeight - container.offsetHeight - 24);
        section.style.setProperty("--pin-top", `${pinTop}px`);
        root.style.removeProperty("--track");
      } else {
        section.removeAttribute("data-pin");
        section.style.removeProperty("--pin-top");
        const track = steps[steps.length - 1].offsetTop - steps[0].offsetTop;
        root.style.setProperty("--track", `${track}px`);
      }
      lastFill = -1;
      update();
    };

    layout();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", layout);
    wide.addEventListener("change", layout);
    const resizeObserver = new ResizeObserver(layout);
    resizeObserver.observe(container);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", layout);
      wide.removeEventListener("change", layout);
      resizeObserver.disconnect();
      section.removeAttribute("data-pin");
      section.style.removeProperty("--pin-top");
      root.removeAttribute("data-scrub");
      root.removeAttribute("data-done");
      steps.forEach((step) => step.removeAttribute("data-active"));
    };
  }, []);

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
