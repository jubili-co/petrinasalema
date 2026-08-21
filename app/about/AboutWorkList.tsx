import Link from "next/link";
import type { FC } from "react";

import { resolveCssColor } from "@/lib/colors";
import { cn } from "@/lib/cn";

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
        src="/papers/bereiche--flaechen-tabelle-line.webp"
        fade="diag"
        sizes="(min-width: 768px) 55vw, 80vw"
        data-id="about-work-list-sketch"
        className="-top-[10%] -right-[8%] h-[120%] w-[70%] md:w-[55%]"
        imageClassName="-rotate-[24deg] scale-[1.6] object-left brightness-0 invert opacity-[0.22]"
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
          className={cn(
            "block",
            "underline-offset-4 decoration-dotto-cream/50",
            "transition-opacity duration-200 ease-out",
            "hover:opacity-70 hover:underline",
            "focus-visible:opacity-70 focus-visible:underline",
          )}
        >
          {line}
        </Link>
      )}
      {!href && line}
    </li>
  );
};
