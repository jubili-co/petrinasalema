import type { FC } from "react";

import { cn } from "@/lib/cn";

import { CtaLink } from "../components/CtaLink";

export const WorkInvite: FC = () => (
  <div
    data-id="work-grid-invite"
    className="relative flex aspect-[1440/1860] p-5 md:p-7"
  >
    <div
      data-id="work-grid-invite-inner"
      className={cn(
        "flex h-full w-full flex-col items-center justify-center gap-10",
        "border border-dotto-brown bg-dotto-cream px-6 text-center",
      )}
    >
      <p
        data-id="work-grid-invite-close"
        className={cn(
          "m-0 max-w-[18ch] font-[family-name:var(--font-playfair)]",
          "text-[17px] leading-relaxed font-[350] text-dotto-brown",
        )}
      >
        If a home like these is next, book a fit call.
      </p>
      <div
        data-id="work-grid-invite-actions"
        className="flex flex-col items-center gap-4"
      >
        <CtaLink
          href="/book"
          variant="secondary"
          data-id="work-grid-invite-cta"
        >
          Fit call
        </CtaLink>
        <p
          data-id="work-grid-invite-lede"
          className={cn(
            "m-0 max-w-[28ch] font-[family-name:var(--font-playfair)]",
            "text-[12px] leading-[16px] font-[350] text-dotto-brown/75",
          )}
        >
          A few residences a year. Most take one to three months, in Vienna or
          wherever you call home.
        </p>
      </div>
    </div>
  </div>
);
