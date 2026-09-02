import type { FC } from "react";

import { cn } from "@/lib/cn";
import { PAPERS } from "@/lib/papers";
import { FIT_CALL_DOOR, FIT_CALL_PATH, FIT_CALL_SOFT_LABEL } from "@/lib/site";

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
          "relative m-0 max-w-[24ch] font-[family-name:var(--font-playfair)]",
          "text-[17px] leading-relaxed font-[350] text-ink",
        )}
      >
        {FIT_CALL_DOOR}
      </p>
      <div
        data-id="work-grid-invite-actions"
        className="relative flex flex-col items-center gap-4"
      >
        <CtaLink
          href={FIT_CALL_PATH}
          variant="secondary"
          data-id="work-grid-invite-cta"
        >
          {FIT_CALL_SOFT_LABEL}
        </CtaLink>
        <p
          data-id="work-grid-invite-lede"
          className={cn(
            "m-0 max-w-[28ch] font-[family-name:var(--font-playfair)]",
            "text-[length:var(--text-copy)] leading-[var(--leading-copy)] font-[350] text-ink/75",
          )}
        >
          I take on a few homes and hospitality spaces a year. Most take one to
          three months, in person in Vienna, and remotely.
        </p>
      </div>
    </div>
  </div>
);
