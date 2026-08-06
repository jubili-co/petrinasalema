"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type FC } from "react";

import { cn } from "@/lib/cn";
import { NAV_LINKS } from "@/lib/site";

import { LogoJubiliMark } from "./LogoJubiliMark";
import { LogoPetina } from "./LogoDotto";

const SCROLL_DELTA = 1;
const TOP_REVEAL_Y = 12;

export const SiteHeader: FC = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isHeaderHidden, setIsHeaderHidden] = useState(false);
  const [menuPath, setMenuPath] = useState(pathname);
  const lastScrollY = useRef(0);
  const shouldHideHeader = isHeaderHidden && !isOpen;

  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setIsOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const onScroll = () => {
      const scrollY = window.scrollY;
      const delta = scrollY - lastScrollY.current;

      if (scrollY < TOP_REVEAL_Y) {
        setIsHeaderHidden(false);
      } else if (delta > SCROLL_DELTA) {
        setIsHeaderHidden(true);
      } else if (delta < -SCROLL_DELTA) {
        setIsHeaderHidden(false);
      }

      lastScrollY.current = scrollY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const onToggle = () => {
    setIsOpen((open) => !open);
  };

  return (
    <>
      <header
        data-id="site-header"
        className={cn(
          // position
          "fixed inset-x-0 top-0 z-[999]",
          // layout
          "flex items-center justify-center",
          // spacing
          "px-6 py-[17px] md:px-12",
          // typography / color
          "bg-dotto-cream font-[family-name:var(--font-matter)] text-[13px] tracking-[0.15em] text-dotto-brown uppercase",
          // motion — translate only so the page behind doesn’t fade with the bar
          "transition-[translate] duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] will-change-[translate]",
          {
            "-translate-y-full pointer-events-none": shouldHideHeader,
            "translate-y-0": !shouldHideHeader,
          },
        )}
      >
        <div
          data-id="site-header-inner"
          className="relative flex w-full items-center justify-between"
        >
          <Link
            href="/"
            data-id="site-header-logo"
            className="relative z-10 block w-[180px] md:w-[274px]"
            aria-label="Petrina Salema home"
          >
            <LogoPetina />
          </Link>

          <nav
            data-id="site-header-nav"
            className="absolute left-1/2 hidden -translate-x-1/2 md:block"
          >
            <ul className="flex items-center font-semibold">
              {NAV_LINKS.map(({ href, label }) => (
                <li key={href} className="mx-[20px] lg:mx-[27px]">
                  <Link
                    href={href}
                    data-id="site-header-nav-link"
                    className="transition-opacity duration-200 ease-out hover:opacity-50"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div
            data-id="site-header-actions"
            className="relative z-10 flex items-center gap-4"
          >
            <Link
              href="/jubili"
              data-id="site-header-jubili-mark"
              className="hidden md:block"
              aria-label="Jubili store"
            >
              <LogoJubiliMark />
            </Link>

            <button
              type="button"
              data-id="site-header-hamburger"
              className="flex min-h-11 min-w-11 items-center justify-end md:hidden"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              onClick={onToggle}
            >
              <span
                className={cn(
                  "relative block h-[11px] w-[22px]",
                  "before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-current before:transition-transform before:duration-200",
                  "after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-current after:transition-transform after:duration-200",
                  {
                    "before:top-1/2 before:-translate-y-1/2 before:rotate-45 after:bottom-auto after:top-1/2 after:-translate-y-1/2 after:-rotate-45":
                      isOpen,
                  },
                )}
              />
            </button>
          </div>
        </div>
      </header>

      {isOpen && (
        <div
          data-id="site-off-canvas"
          className={cn(
            // position
            "fixed inset-0 z-[998]",
            // layout
            "flex flex-col justify-between",
            // spacing
            "px-6 pt-28 pb-[max(2rem,var(--safe-bottom))]",
            // color
            "bg-dotto-cream text-dotto-brown",
          )}
        >
          <nav data-id="site-off-canvas-nav">
            <ul className="flex flex-col gap-6">
              {NAV_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    data-id="site-off-canvas-link"
                    className="font-[family-name:var(--font-matter)] text-sm tracking-[0.15em] uppercase"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <Link
            href="/jubili"
            data-id="site-off-canvas-jubili"
            className="flex items-center justify-between border-t border-dotto-brown/20 pt-6"
          >
            <span className="text-sm tracking-[0.15em] uppercase">Jubili</span>
            <LogoJubiliMark />
          </Link>
        </div>
      )}
    </>
  );
};
