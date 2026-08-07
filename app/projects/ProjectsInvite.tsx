import Link from "next/link";
import type { FC } from "react";

import { cn } from "@/lib/cn";

export const ProjectsInvite: FC = () => (
  <div
    data-id="projects-grid-invite"
    className="relative flex aspect-[1440/1860] p-5 md:p-7"
  >
    <div
      data-id="projects-grid-invite-inner"
      className={cn(
        "flex h-full w-full flex-col items-center justify-center gap-10",
        "border border-dotto-brown bg-dotto-cream px-6 text-center",
      )}
    >
      <p
        data-id="projects-grid-invite-close"
        className={cn(
          "m-0 max-w-[18ch] font-[family-name:var(--font-antiqua)]",
          "text-[17px] leading-relaxed font-[350] text-dotto-brown",
        )}
      >
        If the work fits, write.
      </p>
      <div
        data-id="projects-grid-invite-actions"
        className="flex flex-col items-center gap-4"
      >
        <Link
          href="/book"
          data-id="projects-grid-invite-cta"
          className={cn(
            "group/cta inline-flex min-h-11 items-center justify-center whitespace-nowrap",
            "border border-dotto-brown px-8 py-3",
            "font-[family-name:var(--font-matter)] text-[12px] tracking-[0.15em] uppercase",
            "transition-colors duration-200 ease-out",
            "hover:bg-dotto-brown active:scale-[0.97]",
          )}
        >
          <span className="text-dotto-brown transition-colors duration-200 ease-out group-hover/cta:text-dotto-cream">
            Send a note
          </span>
        </Link>
        <p
          data-id="projects-grid-invite-lede"
          className={cn(
            "m-0 max-w-[28ch] font-[family-name:var(--font-antiqua)]",
            "text-[12px] leading-[16px] font-[350] text-dotto-brown/75",
          )}
        >
          I take on a few projects a year, in Vienna or wherever you call home.
        </p>
      </div>
    </div>
  </div>
);
