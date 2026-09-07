"use client";

import posthog from "posthog-js";
import { useEffect, useSyncExternalStore, type FC } from "react";

import {
  POSTHOG_PROXY,
  POSTHOG_TOKEN,
  POSTHOG_UI_HOST,
} from "@/lib/posthog";

import {
  readCookieConsent,
  subscribeCookieConsent,
} from "./CookieConsent";

export const PostHogAnalytics: FC = () => {
  const consent = useSyncExternalStore(
    subscribeCookieConsent,
    readCookieConsent,
    getServerSnapshot,
  );
  const hasAccepted = consent === "accepted";

  useEffect(() => {
    if (!hasAccepted) {
      return;
    }
    startPostHog();
  }, [hasAccepted]);

  return null;
};

function getServerSnapshot(): null {
  return null;
}

function startPostHog(): void {
  if (posthog.__loaded) {
    return;
  }

  posthog.init(POSTHOG_TOKEN, {
    api_host: POSTHOG_PROXY,
    ui_host: POSTHOG_UI_HOST,
    defaults: "2026-01-30",
    capture_exceptions: true,
    disable_session_recording: true,
    persistence: "localStorage+cookie",
  });
}
