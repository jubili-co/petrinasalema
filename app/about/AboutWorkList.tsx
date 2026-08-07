import type { FC } from "react";

import { resolveCssColor } from "@/lib/colors";
import { cn } from "@/lib/cn";

import {
  AboutInviteCtaLink,
  type AboutInviteCta,
} from "./AboutInviteCta";
import { AboutTitle } from "./AboutTitle";

export type WorkListItem = {
  name: string;
  role: string;
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
  const { title, items, cta } = section;
  const background = resolveCssColor(section.color, "dotto-olive");

  return (
    <section
      data-id="about-work-list"
      className="flex min-h-[100dvh] w-full items-center"
      style={{ backgroundColor: background }}
    >
      <div
        data-id="about-work-list-inner"
        className="w-full px-6 py-16 text-dotto-cream md:px-12 md:py-20"
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
  const { name, role } = item;

  return (
    <li data-id="about-work-list-row">
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
          "font-[family-name:var(--font-antiqua)]",
          "text-[13px] leading-[18px] font-[350] tracking-normal normal-case",
        )}
      >
        {role}
      </span>
    </li>
  );
};
