"use client";

import Link from "next/link";
import { useSyncExternalStore, type FC } from "react";

import { cn } from "@/lib/cn";

const STORAGE_KEY = "studio-ashby-cookies";

function subscribe(onStoreChange: () => void): () => void {
  window.addEventListener("storage", onStoreChange);
  return () => {
    window.removeEventListener("storage", onStoreChange);
  };
}

function getSnapshot(): string | null {
  return window.localStorage.getItem(STORAGE_KEY);
}

function getServerSnapshot(): string | null {
  return "accepted";
}

export const CookieBanner: FC = () => {
  const stored = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const isVisible = !stored;

  const onAccept = () => {
    window.localStorage.setItem(STORAGE_KEY, "accepted");
    window.dispatchEvent(new Event("storage"));
  };

  const onDecline = () => {
    window.localStorage.setItem(STORAGE_KEY, "declined");
    window.dispatchEvent(new Event("storage"));
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
        "bg-brown text-cream",
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
          className="font-[family-name:var(--font-matter)] text-[13px] leading-[1.45] font-light"
        >
          We use cookies to enhance your browsing experience and analyse site
          usage. By clicking &apos;Accept All&apos;, you consent to our use of
          cookies. You can learn more in our{" "}
          <Link href="/privacy-policy" className="underline underline-offset-2">
            Privacy Policy
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
              "min-h-11 border border-cream px-5 py-2",
              "text-[12px] tracking-[0.12em] uppercase",
              "transition-colors duration-200 ease-out",
              "hover:bg-cream/10",
            )}
          >
            Decline
          </button>
          <button
            type="button"
            data-id="cookie-banner-accept"
            onClick={onAccept}
            className={cn(
              "min-h-11 bg-cream px-5 py-2 text-brown",
              "text-[12px] tracking-[0.12em] uppercase",
              "transition-colors duration-200 ease-out",
              "hover:bg-[#f2e4de]",
            )}
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
};
