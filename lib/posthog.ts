import { isFitDoorPath } from "@/lib/locale";
import { CONSULT_CAL_HREF, hrefPathname, INTRO_CAL_HREF } from "@/lib/site";

export const POSTHOG_TOKEN =
  process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN ??
  "phc_scngVHFCkE7GuueBN5xM3XtYFjMGpRRnkLNsgtiugyoS";

export const POSTHOG_HOST =
  process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://eu.i.posthog.com";

export const POSTHOG_UI_HOST = "https://eu.posthog.com";

export const POSTHOG_PROXY = "/ingest";

/** Soft /book invite. Also used by the PostHog action that ORs $pageview on /book. */
export const FIT_DOOR_OPENED = "fit_door_opened" as const;

/** Cal door click. Property `offer` is `fit_call` or `paid_hour`. */
export const BOOK_CALL_OPENED = "book_call_opened" as const;

/**
 * Cal Booking Created → PostHog. No Dotto API.
 * Live workflow: https://eu.posthog.com/project/268328/workflows/01a0810f-4603-0000-1181-c66fdb1af700/workflow
 * TD-006
 */
export const INTRO_BOOKED = "intro_booked" as const;
export const CONSULT_BOOKED = "consult_booked" as const;

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
