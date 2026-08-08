import Link from "next/link";
import type { FC } from "react";

import { cn } from "@/lib/cn";

export type HomeInviteCta = {
  label: string;
  href: string;
  microcopy?: string;
};

type Props = {
  hook: string;
  body: string;
  cta: HomeInviteCta;
};

export const HomeInvite: FC<Props> = ({ hook, body, cta }) => (
  <section
    data-id="home-invite"
    className={cn(
      "flex w-full justify-center bg-dotto-brown",
      "px-6 py-28 md:px-12 md:py-40",
    )}
  >
    <div
      data-id="home-invite-inner"
      className="flex w-full max-w-[640px] flex-col items-center gap-8 text-center"
    >
      <p
        data-id="home-invite-hook"
        className={cn(
          "m-0 font-[family-name:var(--font-antiqua)]",
          "text-[22px] leading-[1.45] font-[350] text-balance text-dotto-cream",
          "md:text-[24px] md:leading-[1.42]",
        )}
      >
        {hook}
      </p>
      <p
        data-id="home-invite-body"
        className={cn(
          "m-0 max-w-[44ch] font-[family-name:var(--font-antiqua)]",
          "text-[13px] leading-[18px] font-[350] text-balance text-dotto-cream/85",
        )}
      >
        {body}
      </p>
      <div data-id="home-invite-action" className="mt-2 flex flex-col items-center">
        <HomeInviteAction cta={cta} />
        {cta.microcopy && (
          <p
            data-id="home-invite-microcopy"
            className={cn(
              "m-0 mt-3 font-[family-name:var(--font-antiqua)]",
              "text-[12px] leading-[16px] font-[350] text-dotto-cream/85",
            )}
          >
            {cta.microcopy}
          </p>
        )}
      </div>
    </div>
  </section>
);

type HomeInviteActionProps = {
  cta: HomeInviteCta;
};

const HomeInviteAction: FC<HomeInviteActionProps> = ({ cta }) => {
  const { label, href } = cta;
  const labelClassName = cn(
    "inline-block translate-x-0 text-dotto-brown will-change-transform",
    "transition-transform duration-300 ease-out",
    "group-hover/cta:-translate-x-1.5",
  );
  const arrowClassName = cn(
    "pointer-events-none absolute inset-y-0 right-4",
    "flex items-center text-[15px] leading-none text-dotto-brown",
    "opacity-0 will-change-transform",
    "[transform:translate3d(2px,0,0)]",
    "transition-[opacity,transform] duration-300 ease-out",
    "group-hover/cta:opacity-100",
    "group-hover/cta:[transform:translate3d(0,0,0)]",
  );

  return (
    <Link
      href={href}
      data-id="home-invite-cta"
      className={cn(
        "group/cta relative inline-flex min-h-11 items-center justify-center",
        "overflow-hidden border border-dotto-cream bg-dotto-cream py-3 pl-8 pr-8",
        "font-[family-name:var(--font-matter)] text-[12px] tracking-[0.15em] uppercase",
      )}
    >
      <span data-id="home-invite-cta-label" className={labelClassName}>
        {label}
      </span>
      <span data-id="home-invite-cta-arrow" aria-hidden className={arrowClassName}>
        →
      </span>
    </Link>
  );
};
