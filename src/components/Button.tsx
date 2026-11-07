import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cx } from "@/lib/cx";
import styles from "./Button.module.css";

type Variant = "primary" | "secondary" | "text";
type Arrow = "right" | "down" | "out" | null;

type BaseProps = {
  children: ReactNode;
  variant?: Variant;
  /** Small trailing arrow that nudges on hover. */
  arrow?: Arrow;
  className?: string;
};

type LinkProps = BaseProps & { href: string } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children">;
type NativeButtonProps = BaseProps & { href?: undefined } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

const glyph: Record<Exclude<Arrow, null>, string> = { right: "→", down: "↓", out: "↗" };

/**
 * One component for every call to action.
 * With `href` it renders a real <a>; without, a real <button>.
 */
export function Button(props: LinkProps | NativeButtonProps) {
  const { children, variant = "primary", arrow = null, className, ...rest } = props;
  const classes = cx(styles.button, styles[variant], arrow && styles[`arrow-${arrow}`], className);
  const content = (
    <>
      <span>{children}</span>
      {arrow && (
        <span className={styles.arrow} aria-hidden="true">
          {glyph[arrow]}
        </span>
      )}
    </>
  );

  if ("href" in rest && rest.href !== undefined) {
    const { href, ...anchorProps } = rest as LinkProps;
    return (
      <a href={href} className={classes} {...anchorProps}>
        {content}
      </a>
    );
  }

  const { type = "button", ...buttonProps } = rest as NativeButtonProps;
  return (
    <button type={type} className={classes} {...buttonProps}>
      {content}
    </button>
  );
}
