import Link from "next/link";
import type { FC, PropsWithChildren } from "react";

import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";
type Tone = "ink" | "chalk";
type Arrow = "left" | "right";

type Props = PropsWithChildren<{
  href: string;
  variant?: Variant;
  tone?: Tone;
  arrow?: Arrow;
  className?: string;
  "data-id"?: string;
}>;

export const CtaLink: FC<Props> = ({
  href,
  children,
  variant = "primary",
  tone = "ink",
  arrow = "right",
  className,
  "data-id": dataId = "cta-link",
}) => {
  const isExternal = href.startsWith("http");
  const isLeft = arrow === "left";
  const isGhost = variant === "ghost";
  const inkClassName = inkClass(variant, tone);
  const shellClassName = shellClass(variant, tone, isLeft, className);
  const labelClassName = labelClass(isLeft, isGhost, inkClassName);
  const arrowClassName = arrowClass(variant, isLeft, inkClassName);
  const mark = isLeft ? "←" : "→";
  const arrowMark = (
    <span data-id="cta-link-arrow" aria-hidden className={arrowClassName}>
      {mark}
    </span>
  );
  const content = (
    <>
      {isLeft && arrowMark}
      <span data-id="cta-link-label" className={labelClassName}>
        {children}
      </span>
      {!isLeft && arrowMark}
    </>
  );

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        data-id={dataId}
        className={shellClassName}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} data-id={dataId} className={shellClassName}>
      {content}
    </Link>
  );
};

function shellClass(
  variant: Variant,
  tone: Tone,
  isLeft: boolean,
  className: string | undefined,
): string {
  const isGhost = variant === "ghost";
  const isPrimary = variant === "primary";
  const isSecondary = variant === "secondary";
  const isInk = tone === "ink";
  const isChalk = tone === "chalk";

  return cn(
    "group/cta relative inline-flex min-h-11 items-center",
    {
      // boxed layout
      "justify-center overflow-hidden border py-3 pl-8 pr-8": !isGhost,
      // boxed type
      "font-[family-name:var(--font-matter)] text-[12px] tracking-[0.15em] uppercase":
        !isGhost,
      "border-inverse bg-inverse": isPrimary && isInk,
      "border-chalk bg-chalk": isPrimary && isChalk,
      "border-ink": isSecondary && isInk,
      "border-chalk": isSecondary && isChalk,
      // ghost — no fill, no border, no underline
      "justify-start gap-2 bg-transparent py-0 no-underline outline-none hover:no-underline":
        isGhost,
      "font-[family-name:var(--font-playfair)] text-[14px] leading-[21px] font-[350]":
        isGhost,
      "focus-visible:opacity-70": isGhost,
      "-ml-6": isGhost && isLeft,
      "-mr-6": isGhost && !isLeft,
    },
    className,
  );
}

function labelClass(
  isLeft: boolean,
  isGhost: boolean,
  inkClassName: string,
): string {
  return cn(
    "inline-block translate-x-0 will-change-transform",
    "transition-transform duration-300 ease-out",
    {
      "group-hover/cta:-translate-x-1.5": !isGhost && !isLeft,
      "group-hover/cta:translate-x-1.5": !isGhost && isLeft,
    },
    inkClassName,
  );
}

function arrowClass(
  variant: Variant,
  isLeft: boolean,
  inkClassName: string,
): string {
  const isGhost = variant === "ghost";

  return cn(
    "pointer-events-none flex items-center text-[15px] leading-none",
    {
      "absolute inset-y-0 opacity-0 will-change-transform": !isGhost,
      "transition-[opacity,transform] duration-300 ease-out": !isGhost,
      "group-hover/cta:opacity-100": !isGhost,
      "group-hover/cta:[transform:translate3d(0,0,0)]": !isGhost,
      "right-4 [transform:translate3d(2px,0,0)]": !isGhost && !isLeft,
      "left-4 [transform:translate3d(-2px,0,0)]": !isGhost && isLeft,
      "inline-block transition-transform duration-200 ease-out": isGhost,
      "group-hover/cta:-translate-x-0.5": isGhost && isLeft,
      "group-hover/cta:translate-x-0.5": isGhost && !isLeft,
    },
    inkClassName,
  );
}

function inkClass(variant: Variant, tone: Tone): string {
  if (variant === "primary") {
    return tone === "ink" ? "text-chalk" : "text-ink";
  }

  return tone === "chalk" ? "text-chalk" : "text-ink";
}
