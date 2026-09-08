import { isFitDoorPath } from "@/lib/locale";
import { CONSULT_CAL_HREF, hrefPathname, INTRO_CAL_HREF } from "@/lib/site";

export const POSTHOG_TOKEN =
  process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN ??
  "phc_scngVHFCkE7GuueBN5xM3XtYFjMGpRRnkLNsgtiugyoS";

export const POSTHOG_HOST =
  process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://eu.i.posthog.com";

export const POSTHOG_UI_HOST = "https://eu.posthog.com";

export const POSTHOG_PROXY = "/ingest";

export type BookOfferId = "fit_call" | "paid_hour";

export function offerFromHref(href: string): BookOfferId | undefined {
  const pathname = hrefPathname(href);
  if (pathname === hrefPathname(INTRO_CAL_HREF)) {
    return "fit_call";
  }

  if (pathname === hrefPathname(CONSULT_CAL_HREF)) {
    return "paid_hour";
  }

  return undefined;
}

export function isFitDoorHref(href: string): boolean {
  return isFitDoorPath(hrefPathname(href));
}
