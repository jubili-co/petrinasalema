export type CookieConsent = "accepted" | "declined";

const STORAGE_KEY = "dotto-cookies";

export function subscribeCookieConsent(onStoreChange: () => void): () => void {
  window.addEventListener("storage", onStoreChange);
  return () => {
    window.removeEventListener("storage", onStoreChange);
  };
}

export function readCookieConsent(): CookieConsent | null {
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "accepted" || stored === "declined") {
    return stored;
  }
  return null;
}

export function writeCookieConsent(value: CookieConsent): void {
  window.localStorage.setItem(STORAGE_KEY, value);
  window.dispatchEvent(new Event("storage"));
}
