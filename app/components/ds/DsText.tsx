import { cva, type VariantProps } from "class-variance-authority";
import { createElement, type ComponentProps, type ElementType, type FC } from "react";

import { cn } from "@/lib/cn";

const dsTextVariants = cva("", {
  variants: {
    variant: {
      // System voice: Matter caps for labels, buttons, table headers, badges.
      label:
        "font-[family-name:var(--font-matter)] text-sm font-normal tracking-wide uppercase",
      // Louder editorial caps for section/group headings above content.
      eyebrow: cn(
        "font-[family-name:var(--font-matter)] text-xs font-semibold",
        "tracking-widest uppercase text-ink-muted",
      ),
      title:
        "font-[family-name:var(--font-matter)] text-base font-semibold tracking-tight",
      body: cn(
        "font-[family-name:var(--font-playfair)]",
        "text-[13px] leading-[18px] font-[350]",
      ),
      caption:
        "font-[family-name:var(--font-matter)] text-xs text-ink-muted",
      h1: cn(
        "m-0 font-[family-name:var(--font-playfair)]",
        "text-[clamp(40px,6vw,72px)] leading-none tracking-[0.08em] uppercase",
      ),
      // Matches AboutTitle / about-page section heading.
      h2: cn(
        "m-0 mb-[18px] font-[family-name:var(--font-matter)]",
        "text-[13px] leading-[18px] tracking-[0.15em] uppercase",
      ),
      h3: cn(
        "m-0 mb-4 font-[family-name:var(--font-matter)]",
        "text-[13px] leading-[18px] tracking-[0.12em] uppercase",
      ),
      h4: cn(
        "m-0 mb-3 font-[family-name:var(--font-matter)]",
        "text-[13px] leading-[18px] tracking-[0.1em] uppercase",
      ),
      h5: cn(
        "m-0 mb-2 font-[family-name:var(--font-playfair)]",
        "text-[13px] leading-[18px] font-[350]",
      ),
      h6: cn(
        "m-0 mb-2 font-[family-name:var(--font-playfair)]",
        "text-[12px] leading-4 font-[350] text-ink-muted",
      ),
    },
  },
  defaultVariants: {
    variant: "body",
  },
});

type HeadingVariant = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

type Props = ComponentProps<"span"> &
  VariantProps<typeof dsTextVariants> & {
    as?: ElementType;
  };

export const DsText: FC<Props> = ({
  as,
  className,
  variant = "body",
  ...props
}) => {
  const tag = as ?? defaultTagForVariant(variant);

  return createElement(tag, {
    className: cn(dsTextVariants({ variant }), className),
    "data-id": "ds-text",
    "data-variant": variant,
    ...props,
  });
};

export { dsTextVariants };

function defaultTagForVariant(
  variant: VariantProps<typeof dsTextVariants>["variant"],
): ElementType {
  if (isHeadingVariant(variant)) {
    return variant;
  }

  return "span";
}

function isHeadingVariant(
  variant: VariantProps<typeof dsTextVariants>["variant"],
): variant is HeadingVariant {
  return (
    variant === "h1" ||
    variant === "h2" ||
    variant === "h3" ||
    variant === "h4" ||
    variant === "h5" ||
    variant === "h6"
  );
}
