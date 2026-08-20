import type { FC } from "react";

import { cn } from "@/lib/cn";

import { CtaLink } from "./CtaLink";
import { SketchArtifact } from "./SketchArtifact";

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

export const HomeInvite: FC<Props> = ({ hook, body, cta }) => {
  const { label, href, microcopy } = cta;

  return (
    <section
      data-id="home-invite"
      className={cn(
        "relative overflow-hidden",
        "flex w-full justify-center bg-dotto-brown",
        "px-6 py-28 md:px-12 md:py-40",
      )}
    >
      <SketchArtifact
        src="/papers/alt-obergeschoss--plan-line.webp"
        fade="left"
        sizes="(min-width: 768px) 55vw, 80vw"
        data-id="home-invite-sketch"
        className="-bottom-[20%] -left-[18%] h-[95%] w-[80%] md:w-[55%]"
        imageClassName="rotate-[16deg] scale-[1.3] object-right brightness-0 invert opacity-[0.18]"
      />
      <div
        data-id="home-invite-inner"
        className="relative flex w-full max-w-[640px] flex-col items-center gap-8 text-center"
      >
        <p
          data-id="home-invite-hook"
          className={cn(
            "m-0 font-[family-name:var(--font-playfair)]",
            "text-[22px] leading-[1.45] font-[350] text-balance text-dotto-cream",
            "md:text-[24px] md:leading-[1.42]",
          )}
        >
          {hook}
        </p>
        <p
          data-id="home-invite-body"
          className={cn(
            "m-0 max-w-[44ch] font-[family-name:var(--font-playfair)]",
            "text-[13px] leading-[18px] font-[350] text-balance text-dotto-cream/85",
          )}
        >
          {body}
        </p>
        <div
          data-id="home-invite-action"
          className="mt-2 flex flex-col items-center"
        >
          <CtaLink
            href={href}
            variant="primary"
            tone="cream"
            data-id="home-invite-cta"
          >
            {label}
          </CtaLink>
          {microcopy && (
            <p
              data-id="home-invite-microcopy"
              className={cn(
                "m-0 mt-3 font-[family-name:var(--font-playfair)]",
                "text-[12px] leading-[16px] font-[350] text-dotto-cream/85",
              )}
            >
              {microcopy}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};
