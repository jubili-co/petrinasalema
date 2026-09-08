export type SiteLocale = "en" | "de-AT";

export const DEFAULT_LOCALE: SiteLocale = "en";
export const DE_PREFIX = "/de" as const;

export const VIENNA_HOME_SLUGS = [
  "tegelweg-rental-maisonette-vienna",
  "brabbeegasse-single-unit-apartment-vienna",
] as const;

export type ViennaHomeSlug = (typeof VIENNA_HOME_SLUGS)[number];

export function isViennaHomeSlug(slug: string): slug is ViennaHomeSlug {
  return VIENNA_HOME_SLUGS.some((entry) => entry === slug);
}

export function localeFromPathname(pathname: string): SiteLocale {
  if (pathname === DE_PREFIX || pathname.startsWith(`${DE_PREFIX}/`)) {
    return "de-AT";
  }

  return DEFAULT_LOCALE;
}

export function htmlLang(locale: SiteLocale): string {
  return locale === "de-AT" ? "de-AT" : "en";
}

export function ogLocale(locale: SiteLocale): string {
  return locale === "de-AT" ? "de_AT" : "en_AT";
}

export function localizedPath(path: string, locale: SiteLocale): string {
  const normalized = path === "" ? "/" : path;
  if (locale === DEFAULT_LOCALE) {
    return normalized;
  }

  if (normalized === "/") {
    return DE_PREFIX;
  }

  return `${DE_PREFIX}${normalized}`;
}

export function englishPath(path: string): string {
  if (path === DE_PREFIX) {
    return "/";
  }

  if (path.startsWith(`${DE_PREFIX}/`)) {
    return path.slice(DE_PREFIX.length);
  }

  return path;
}

export function isFitDoorPath(pathname: string): boolean {
  return pathname === "/book" || pathname === localizedPath("/book", "de-AT");
}
