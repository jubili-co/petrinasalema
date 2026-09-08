"use client";

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

type PostHogClient = typeof import("posthog-js").default;

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
  void import("posthog-js").then(({ default: posthog }) => {
    initPostHog(posthog);
  });
}

function initPostHog(posthog: PostHogClient): void {
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
