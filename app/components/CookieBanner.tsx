"use client";

import Link from "next/link";
import { useSyncExternalStore, type FC } from "react";

import { cn } from "@/lib/cn";

import {
  readCookieConsent,
  subscribeCookieConsent,
  writeCookieConsent,
} from "./CookieConsent";

export const CookieBanner: FC = () => {
  const consent = useSyncExternalStore(
    subscribeCookieConsent,
    readCookieConsent,
    getServerSnapshot,
  );
  const isVisible = !consent;

  const onAccept = () => {
    writeCookieConsent("accepted");
  };

  const onDecline = () => {
    writeCookieConsent("declined");
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div
      data-id="cookie-banner"
      className={cn(
        // position
        "fixed inset-x-0 bottom-0 z-[9999]",
        // spacing
        "px-[15px] py-[15px] md:px-[30px] md:py-[10px]",
        // color
        "bg-inverse text-chalk",
        // motion
        "animate-[cookie-slide-up_0.5s_var(--ease-out-soft)]",
      )}
    >
      <div
        data-id="cookie-banner-content"
        className={cn(
          "mx-auto flex max-w-[1200px] flex-col items-start gap-[15px]",
          "md:flex-row md:items-center md:justify-between md:gap-5",
        )}
      >
        <p
          data-id="cookie-banner-copy"
          className="font-[family-name:var(--font-matter)] text-[length:var(--text-copy)] leading-[var(--leading-copy)] font-light"
        >
          If you accept, this site records anonymous page views so the studio
          can see what people actually use. No advertising cookies. The details
          are in{" "}
          <Link href="/privacy" className="underline underline-offset-2">
            Privacy
          </Link>
          .
        </p>

        <div
          data-id="cookie-banner-actions"
          className="flex shrink-0 items-center gap-3"
        >
          <button
            type="button"
            data-id="cookie-banner-decline"
            onClick={onDecline}
            className={cn(
              "min-h-11 border border-chalk px-5 py-2",
              "text-[13px] tracking-[0.12em] uppercase",
              "transition-colors duration-200 ease-out",
              "hover:bg-chalk/10",
            )}
          >
            Decline
          </button>
          <button
            type="button"
            data-id="cookie-banner-accept"
            onClick={onAccept}
            className={cn(
              "min-h-11 bg-chalk px-5 py-2 text-ink",
              "text-[13px] tracking-[0.12em] uppercase",
              "transition-colors duration-200 ease-out",
              "hover:bg-wash",
            )}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

function getServerSnapshot(): "accepted" {
  return "accepted";
}
