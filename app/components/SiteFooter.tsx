import Link from "next/link";
import type { FC } from "react";

import { cn } from "@/lib/cn";
import { FOOTER_LINKS } from "@/lib/site";

import { LogoPetina } from "./LogoDotto";

type Props = {
  className?: string;
};

export const SiteFooter: FC<Props> = ({ className }) => (
  <footer
    data-id="site-footer"
    className={cn(
      "relative z-[99] mt-auto w-full bg-dotto-brown text-dotto-cream",
      "px-6 py-8 md:h-[96px] md:px-12 md:py-8 md:pb-[35px]",
      className,
    )}
  >
    <div
      data-id="site-footer-inner"
      className={cn(
        "flex flex-col items-start justify-between gap-10",
        "md:h-full md:flex-row md:items-center md:gap-4",
      )}
    >
      <div data-id="site-footer-brand" className="w-full md:w-1/5">
        <Link
          href="/"
          data-id="site-footer-logo"
          className="block w-full max-w-[223px] text-dotto-cream"
          aria-label="Petrina Salema home"
        >
          <LogoPetina />
        </Link>
      </div>

      <nav data-id="site-footer-nav" className="w-full md:flex-1">
        <ul
          data-id="site-footer-nav-list"
          className={cn(
            "flex flex-col gap-3",
            "md:flex-row md:flex-wrap md:items-center md:justify-center md:gap-0",
          )}
        >
          {FOOTER_LINKS.map((item) => (
            <li
              key={item.href}
              data-id="site-footer-nav-item"
              className="md:mx-[10px] md:last:mr-0"
            >
              <FooterNavLink item={item} />
            </li>
          ))}
        </ul>
      </nav>

      <div
        data-id="site-footer-meta"
        className={cn(
          "w-full md:w-1/5 text-right",
          "font-[family-name:var(--font-matter)]",
          "text-[11px] leading-tight text-dotto-brown-muted",
        )}
      >
        <p>Design + Furnishing</p>
        <p>Vienna &amp; wherever you call home</p>
      </div>
    </div>
  </footer>
);

type FooterLink = (typeof FOOTER_LINKS)[number];

type FooterNavLinkProps = {
  item: FooterLink;
};

const FooterNavLink: FC<FooterNavLinkProps> = ({ item }) => {
  const className = cn(
    "font-[family-name:var(--font-matter)] text-[11px] leading-[15px]",
    "tracking-[1.65px] text-dotto-cream uppercase no-underline",
    "transition-opacity duration-1000 ease-out hover:opacity-50",
  );

  if ("external" in item && item.external) {
    return (
      <a
        href={item.href}
        data-id="site-footer-nav-link"
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {item.label}
      </a>
    );
  }

  return (
    <Link href={item.href} data-id="site-footer-nav-link" className={className}>
      {item.label}
    </Link>
  );
};
