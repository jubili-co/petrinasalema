/**
 * Hex mirror of `app/colors.css` for non-CSS contexts (viewport theme-color, etc.).
 * Prefer Tailwind utilities (`bg-dotto-maroon`) or `cssColor()` for UI.
 */
export const COLOR_HEX = {
  "dotto-cream": "#f9f3f0",
  "dotto-brown": "#633b2f",
  "dotto-brown-muted": "#ae9891",
  "dotto-mustard": "#b19e18",
  "dotto-orange": "#e87308",
  "dotto-blue": "#45519f",
  "dotto-maroon": "#893521",
  "dotto-olive": "#645e26",
  "dotto-sand": "#eee9e2",
  "dotto-blush": "#f2e5dc",
} as const;

export type ColorToken = keyof typeof COLOR_HEX;

export function isColorToken(value: string): value is ColorToken {
  return Object.hasOwn(COLOR_HEX, value);
}

/** CSS custom-property reference for inline styles. */
export function cssColor(token: ColorToken): string {
  return `var(--${token})`;
}

/**
 * Resolve a content color: token name → `var(--token)`, else pass through
 * (raw hex still accepted). Missing values use `fallback`.
 */
export function resolveCssColor(
  value: string | null | undefined,
  fallback: ColorToken,
): string {
  if (!value) {
    return cssColor(fallback);
  }

  if (isColorToken(value)) {
    return cssColor(value);
  }

  return value;
}
