import type { FC } from "react";

import { cn } from "@/lib/cn";
import { PAPERS } from "@/lib/papers";

import { CtaLink } from "./CtaLink";
import { PaperWord } from "./PaperWord";
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

const SKETCH_SRC = `${PAPERS}/alt-obergeschoss--plan-line.webp`;

export const HomeInvite: FC<Props> = ({ hook, body, cta }) => {
  const { label, href, microcopy } = cta;

  return (
    <section
      data-id="home-invite"
      className={cn(
        "relative overflow-hidden",
        "flex w-full justify-center bg-inverse",
        "px-6 py-28 md:px-12 md:py-40",
      )}
    >
      <SketchArtifact
        src={SKETCH_SRC}
        fade="left"
        sizes="(min-width: 768px) 55vw, 80vw"
        data-id="home-invite-sketch"
        className="-bottom-[20%] -left-[18%] h-[95%] w-[80%] md:w-[55%]"
        imageClassName="rotate-[16deg] scale-[1.3] object-right brightness-0 invert opacity-[0.18]"
      />
      <PaperWord
        word="zentralBeheizt"
        tone="chalk"
        data-id="home-invite-word"
        className="-right-10 top-[16%] w-36 -rotate-[14deg] md:w-48"
      />
      <PaperWord
        word="mansarde"
        tone="chalk"
        data-id="home-invite-word"
        className="-left-8 bottom-[12%] w-24 rotate-[72deg] md:w-32"
      />
      <div
        data-id="home-invite-inner"
        className="relative flex w-full max-w-[640px] flex-col items-center gap-8 text-center"
      >
        <p
          data-id="home-invite-hook"
          className={cn(
            "m-0 font-[family-name:var(--font-playfair)]",
            "text-[22px] leading-[1.45] font-[350] text-balance text-chalk",
            "md:text-[24px] md:leading-[1.42]",
          )}
        >
          {hook}
        </p>
        <p
          data-id="home-invite-body"
          className={cn(
            "m-0 max-w-[44ch] font-[family-name:var(--font-playfair)]",
            "text-[length:var(--text-copy)] leading-[var(--leading-copy)] font-[350] text-balance text-chalk/85",
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
            tone="chalk"
            data-id="home-invite-cta"
          >
            {label}
          </CtaLink>
          {microcopy && (
            <p
              data-id="home-invite-microcopy"
              className={cn(
                "m-0 mt-3 font-[family-name:var(--font-playfair)]",
                "text-[13px] leading-[18px] font-[350] text-chalk/85",
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
