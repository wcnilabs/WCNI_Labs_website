import { isFilled } from "./placeholders";

/** mailto: link — or null while the address is a placeholder. */
export function mailtoHref(email: string, subject?: string): string | null {
  if (!isFilled(email)) return null;
  const query = subject ? `?subject=${encodeURIComponent(subject)}` : "";
  return `mailto:${email}${query}`;
}

/** A URL that is safe to put in href — or null while it is a placeholder. */
export function safeUrl(url: string): string | null {
  return isFilled(url) ? url : null;
}
