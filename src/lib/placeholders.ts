/**
 * Placeholders are written like "[SETUP PRICE]": square brackets around
 * uppercase words. Keep this pattern in sync with scripts/list-placeholders.mjs.
 */
export const PLACEHOLDER_PATTERN = /\[[A-Z][A-Z0-9 ,.'’&/()-]+\]/g;

/** True if the string contains at least one placeholder. */
export function hasPlaceholder(value: string | null | undefined): boolean {
  if (!value) return false;
  return new RegExp(PLACEHOLDER_PATTERN.source).test(value);
}

/** True if the value is usable for real (non-empty, no placeholder left). */
export function isFilled(value: string | null | undefined): value is string {
  return Boolean(value && value.trim() && !hasPlaceholder(value));
}
