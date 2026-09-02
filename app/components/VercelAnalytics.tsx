"use client";

import dynamic from "next/dynamic";
import { useSyncExternalStore, type FC } from "react";

import {
  readCookieConsent,
  subscribeCookieConsent,
} from "./CookieConsent";

const Analytics = dynamic(
  () => import("@vercel/analytics/next").then((mod) => mod.Analytics),
  { ssr: false },
);

export const VercelAnalytics: FC = () => {
  const consent = useSyncExternalStore(
    subscribeCookieConsent,
    readCookieConsent,
    getServerSnapshot,
  );
  const shouldTrack = consent === "accepted";

  return shouldTrack && <Analytics />;
};

function getServerSnapshot(): null {
  return null;
}
