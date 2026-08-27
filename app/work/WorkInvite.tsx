import type { FC } from "react";

import { cn } from "@/lib/cn";
import { PAPERS } from "@/lib/papers";

import { CtaLink } from "../components/CtaLink";
import { PaperWord } from "../components/PaperWord";
import { SketchArtifact } from "../components/SketchArtifact";

const SKETCH_SRC = `${PAPERS}/neu-mansarde--plan-line.webp`;

export const WorkInvite: FC = () => (
  <div
    data-id="work-grid-invite"
    className="relative flex aspect-[1440/1860] p-5 md:p-7"
  >
    <div
      data-id="work-grid-invite-inner"
      className={cn(
        "relative overflow-hidden",
        "flex h-full w-full flex-col items-center justify-center gap-10",
        "border border-ink bg-canvas px-6 text-center",
      )}
    >
      <SketchArtifact
        src={SKETCH_SRC}
        fade="in"
        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
        data-id="work-invite-sketch"
        className="inset-0"
        imageClassName="rotate-[48deg] scale-[1.7]"
      />
      <PaperWord
        word="fassadeDolomit"
        data-id="work-invite-word"
        className="-right-12 top-[18%] w-48 rotate-[28deg]"
      />
      <p
        data-id="work-grid-invite-close"
        className={cn(
          "relative m-0 max-w-[18ch] font-[family-name:var(--font-playfair)]",
          "text-[17px] leading-relaxed font-[350] text-ink",
        )}
      >
        {"If you're looking for a home like these, book an Intro Call now."}
      </p>
      <div
        data-id="work-grid-invite-actions"
        className="relative flex flex-col items-center gap-4"
      >
        <CtaLink
          href="/book"
          variant="secondary"
          data-id="work-grid-invite-cta"
        >
          Intro Call
        </CtaLink>
        <p
          data-id="work-grid-invite-lede"
          className={cn(
            "m-0 max-w-[28ch] font-[family-name:var(--font-playfair)]",
            "text-[length:var(--text-copy)] leading-[var(--leading-copy)] font-[350] text-ink/75",
          )}
        >
          Taking on a few homes and hospitality spaces a year. Projects last for
          one to three months. Working locally in Vienna, and remotely worldwide.
        </p>
      </div>
    </div>
  </div>
);
