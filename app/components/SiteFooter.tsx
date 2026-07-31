import Link from "next/link";
import type { FC } from "react";

import { cn } from "@/lib/cn";

import { LogoStudioAshby } from "./LogoStudioAshby";

type Props = {
  className?: string;
};

export const SiteFooter: FC<Props> = ({ className }) => (
  <footer
    data-id="site-footer"
    className={cn(
      "relative z-[99] mt-auto w-full bg-brown text-cream",
      "px-6 py-8 md:px-12 md:py-[32px]",
      className,
    )}
  >
    <div
      data-id="site-footer-inner"
      className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center"
    >
      <Link
        href="/"
        data-id="site-footer-logo"
        className="block w-[200px] md:w-[240px]"
        aria-label="Studio Ashby home"
      >
        <LogoStudioAshby />
      </Link>

      <div
        data-id="site-footer-meta"
        className="flex flex-col gap-2 text-[12px] tracking-[0.08em] uppercase md:items-end"
      >
        <Link
          href="/privacy-policy"
          data-id="site-footer-privacy"
          className="transition-opacity duration-200 ease-out hover:opacity-60"
        >
          Privacy Policy
        </Link>
        <p data-id="site-footer-copy">
          © {new Date().getFullYear()} Studio Ashby
        </p>
      </div>
    </div>
  </footer>
);
