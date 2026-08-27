/**
 * Site palettes. Switch themes by changing `ACTIVE_THEME`.
 * CSS roles (`bg-canvas`, `text-ink`, …) read these via `:root` vars.
 */

const THEMES = {
  petrina: {
    canvas: "#f9f3f0",
    ink: "#45519f",
    "ink-muted": "#ae9891",
    inverse: "#45519f",
    chalk: "#f9f3f0",
    wash: "#f2e5dc",
    accent: "#b19e18",
    "band-a": "#893521",
    "band-b": "#645e26",
    "band-c": "#45519f",
  },
  trail: {
    canvas: "#f4f4ec",
    ink: "#2f2e2a",
    "ink-muted": "#9a9a94",
    inverse: "#4f6719",
    chalk: "#ffffff",
    wash: "#eaedd4",
    accent: "#867bdb",
    "band-a": "#4f6719",
    "band-b": "#867bdb",
    "band-c": "#f56908",
  },
} as const;

/** One-line theme switch. */
export const ACTIVE_THEME: keyof typeof THEMES = "petrina";

export const COLOR_HEX = THEMES[ACTIVE_THEME];

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

/** `:root` custom properties for the active palette. */
export function themeRootCss(): string {
  const declarations = Object.entries(COLOR_HEX)
    .map(([token, hex]) => `--${token}: ${hex}`)
    .join("; ");
  return `:root { ${declarations}; }`;
}
