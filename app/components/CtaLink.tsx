import Link from "next/link";
import type { FC, PropsWithChildren } from "react";

import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";
type Tone = "brown" | "cream";
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
  tone = "brown",
  arrow = "right",
  className,
  "data-id": dataId = "cta-link",
}) => {
  const isExternal = href.startsWith("http");
  const isLeft = arrow === "left";
  const inkClassName = inkClass(variant, tone);
  const shellClassName = shellClass(variant, tone, isLeft, className);
  const labelClassName = labelClass(isLeft, inkClassName);
  const arrowClassName = arrowClass(variant, isLeft, inkClassName);
  const mark = isLeft ? "←" : "→";
  const content = (
    <>
      <span data-id="cta-link-label" className={labelClassName}>
        {children}
      </span>
      <span data-id="cta-link-arrow" aria-hidden className={arrowClassName}>
        {mark}
      </span>
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
  const isBrown = tone === "brown";
  const isCream = tone === "cream";

  return cn(
    "group/cta relative inline-flex min-h-11 items-center overflow-hidden",
    {
      // boxed layout
      "justify-center border py-3 pl-8 pr-8": !isGhost,
      // boxed type
      "font-[family-name:var(--font-matter)] text-[12px] tracking-[0.15em] uppercase":
        !isGhost,
      "border-dotto-brown bg-dotto-brown": isPrimary && isBrown,
      "border-dotto-cream bg-dotto-cream": isPrimary && isCream,
      "border-dotto-brown": isSecondary && isBrown,
      "border-dotto-cream": isSecondary && isCream,
      // ghost — no fill, no border, no focus ring
      "justify-start bg-transparent py-0 outline-none": isGhost,
      "font-[family-name:var(--font-antiqua)] text-[14px] leading-[21px] font-[350]":
        isGhost,
      "focus-visible:opacity-70": isGhost,
      "-ml-5 pl-5": isGhost && isLeft,
      "-mr-5 pr-5": isGhost && !isLeft,
    },
    className,
  );
}

function labelClass(isLeft: boolean, inkClassName: string): string {
  return cn(
    "inline-block translate-x-0 will-change-transform",
    "transition-transform duration-300 ease-out",
    {
      "group-hover/cta:-translate-x-1.5": !isLeft,
      "group-hover/cta:translate-x-1.5": isLeft,
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
    "pointer-events-none absolute inset-y-0 flex items-center",
    "text-[15px] leading-none",
    "opacity-0 will-change-transform",
    "transition-[opacity,transform] duration-300 ease-out",
    "group-hover/cta:opacity-100",
    "group-hover/cta:[transform:translate3d(0,0,0)]",
    {
      "right-4 [transform:translate3d(2px,0,0)]": !isLeft,
      "left-4 [transform:translate3d(-2px,0,0)]": isLeft && !isGhost,
      "left-0 [transform:translate3d(-2px,0,0)]": isLeft && isGhost,
    },
    inkClassName,
  );
}

function inkClass(variant: Variant, tone: Tone): string {
  if (variant === "primary") {
    return tone === "brown" ? "text-dotto-cream" : "text-dotto-brown";
  }

  return tone === "cream" ? "text-dotto-cream" : "text-dotto-brown";
}
