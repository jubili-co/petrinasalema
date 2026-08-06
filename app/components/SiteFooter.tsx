import Link from "next/link";
import type { FC } from "react";

import { cn } from "@/lib/cn";
import { FOOTER_LEGAL_LINKS, FOOTER_PRIMARY_LINKS } from "@/lib/site";

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

      <nav
        data-id="site-footer-nav"
        className={cn(
          "flex w-full flex-col gap-5",
          "md:flex-1 md:flex-row md:items-center md:justify-center md:gap-14",
        )}
        aria-label="Footer"
      >
        <ul
          data-id="site-footer-nav-primary"
          className={cn(
            "flex flex-col gap-3",
            "md:flex-row md:flex-wrap md:items-center md:gap-0",
          )}
        >
          {FOOTER_PRIMARY_LINKS.map((item) => (
            <li
              key={item.href}
              data-id="site-footer-nav-item"
              className="md:mx-[12px] md:first:ml-0 md:last:mr-0"
            >
              <FooterNavLink item={item} isLegal={false} />
            </li>
          ))}
        </ul>
        <ul
          data-id="site-footer-nav-legal"
          className={cn(
            "flex flex-col gap-3",
            "md:flex-row md:flex-wrap md:items-center md:gap-0",
          )}
        >
          {FOOTER_LEGAL_LINKS.map((item) => (
            <li
              key={item.href}
              data-id="site-footer-nav-item"
              className="md:mx-[10px] md:first:ml-0 md:last:mr-0"
            >
              <FooterNavLink item={item} isLegal />
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

type FooterLink = {
  href: string;
  label: string;
  external?: boolean;
};

type FooterNavLinkProps = {
  item: FooterLink;
  isLegal: boolean;
};

const FooterNavLink: FC<FooterNavLinkProps> = ({ item, isLegal }) => {
  const { href, label, external } = item;
  const className = cn(
    "font-[family-name:var(--font-matter)] uppercase no-underline",
    "transition-opacity duration-1000 ease-out hover:opacity-50",
    {
      "text-[11px] leading-[15px] tracking-[1.65px] text-dotto-cream":
        !isLegal,
      "text-[10px] leading-[14px] tracking-[1.4px] text-dotto-cream/40":
        isLegal,
    },
  );

  if (external) {
    return (
      <a
        href={href}
        data-id="site-footer-nav-link"
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {label}
      </a>
    );
  }

  return (
    <Link href={href} data-id="site-footer-nav-link" className={className}>
      {label}
    </Link>
  );
};
