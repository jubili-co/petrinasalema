import Link from "next/link";
import type { FC } from "react";

import { resolveCssColor } from "@/lib/colors";
import { cn } from "@/lib/cn";
import { PAPERS } from "@/lib/papers";

import { PaperWord } from "../components/PaperWord";
import { SketchArtifact } from "../components/SketchArtifact";
import {
  AboutInviteCtaLink,
  type AboutInviteCta,
} from "./AboutInviteCta";
import { AboutTitle } from "./AboutTitle";

export type WorkListItem = {
  name: string;
  role: string;
  href?: string;
};

export type WorkListCta = AboutInviteCta;

export type WorkListSection = {
  type: "workList";
  title?: string | null;
  color?: string | null;
  items: WorkListItem[];
  cta?: WorkListCta | null;
};

type Props = {
  section: WorkListSection;
};

const SKETCH_SRC = `${PAPERS}/bereiche--flaechen-tabelle-line.webp`;

export const AboutWorkList: FC<Props> = ({ section }) => {
  const { title, items, cta, color } = section;
  const background = resolveCssColor(color, "dotto-olive");

  return (
    <section
      data-id="about-work-list"
      className="relative flex min-h-[100dvh] w-full items-center overflow-hidden"
      style={{ backgroundColor: background }}
    >
      <SketchArtifact
        src={SKETCH_SRC}
        fade="diag"
        sizes="(min-width: 768px) 55vw, 80vw"
        data-id="about-work-list-sketch"
        className="-top-[10%] -right-[8%] h-[120%] w-[70%] md:w-[55%]"
        imageClassName="-rotate-[24deg] scale-[1.6] object-left brightness-0 invert opacity-[0.22]"
      />
      <PaperWord
        word="kellerAlt"
        tone="chalk"
        data-id="about-work-list-word"
        className="-left-4 bottom-[16%] w-20 -rotate-[24deg] md:w-24"
      />
      <div
        data-id="about-work-list-inner"
        className="relative w-full px-6 py-16 text-dotto-cream md:px-12 md:py-20"
      >
        <AboutTitle title={title} />
        <ul
          data-id="about-work-list-items"
          className="m-0 flex w-full list-none flex-col gap-[10px]"
        >
          {items.map((item) => (
            <WorkListRow key={item.name} item={item} />
          ))}
        </ul>
        {cta && <AboutInviteCtaLink cta={cta} />}
      </div>
    </section>
  );
};

type WorkListRowProps = {
  item: WorkListItem;
};

const WorkListRow: FC<WorkListRowProps> = ({ item }) => {
  const { name, role, href } = item;
  const line = (
    <>
      <span
        data-id="about-work-list-name"
        className={cn(
          "font-[family-name:var(--font-matter)]",
          "text-[13px] leading-[18px] tracking-[0.15em] uppercase",
        )}
      >
        {name}
      </span>
      <span
        data-id="about-work-list-sep"
        className={cn(
          "font-[family-name:var(--font-matter)]",
          "text-[13px] leading-[18px] tracking-[0.15em]",
        )}
      >
        ,{" "}
      </span>
      <span
        data-id="about-work-list-role"
        className={cn(
          "font-[family-name:var(--font-playfair)]",
          "text-[13px] leading-[18px] font-[350] tracking-normal normal-case",
        )}
      >
        {role}
      </span>
    </>
  );

  return (
    <li data-id="about-work-list-row">
      {href && (
        <Link
          href={href}
          data-id="about-work-list-link"
          className="relative inline-block pb-1"
        >
          {line}
          <span
            data-id="about-work-list-link-rule"
            aria-hidden
            className={cn(
              "pointer-events-none absolute inset-x-0 bottom-0 block h-px",
              "bg-dotto-cream opacity-0",
              "transition-opacity duration-150 ease-[var(--ease-out-soft)]",
              "motion-reduce:transition-none",
            )}
          />
        </Link>
      )}
      {!href && line}
    </li>
  );
};
