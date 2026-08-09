import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Fragment, type FC } from "react";

import { cn } from "@/lib/cn";
import {
  workChapterGroups,
  workPlace,
  type WorkChapterGroup,
  type WorkItem,
} from "@/lib/work";

import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { WorkInvite } from "./WorkInvite";

export const metadata: Metadata = {
  title: "Work | Petrina Salema",
  description:
    "Homes and hospitality spaces by Petrina Salema, with prior architecture from a decade in practice. Vienna, and projects abroad.",
};

const WorkPage: FC = () => {
  const groups = workChapterGroups();

  return (
    <main data-id="work-page" className="min-h-dvh bg-dotto-cream">
      <SiteHeader />
      <section
        data-id="work-grid"
        className="mt-[74px] grid grid-cols-1 gap-px md:mt-[79px] md:grid-cols-2 lg:grid-cols-3"
      >
        {groups.map((group) => (
          <WorkChapterBlock key={group.id} group={group} />
        ))}
      </section>
      <SiteFooter />
    </main>
  );
};

export default WorkPage;

type WorkChapterBlockProps = {
  group: WorkChapterGroup;
};

const WorkChapterBlock: FC<WorkChapterBlockProps> = ({ group }) => {
  const { id, label, note, items } = group;
  const isHomes = id === "homes";

  return (
    <Fragment>
      <WorkChapterHeading label={label} note={note} />
      {items.map((item) => (
        <WorkGridCard key={item.id} item={item} />
      ))}
      {isHomes && <WorkInvite />}
    </Fragment>
  );
};

type WorkChapterHeadingProps = {
  label: string;
  note: string;
};

const WorkChapterHeading: FC<WorkChapterHeadingProps> = ({ label, note }) => (
  <div
    data-id="work-chapter-heading"
    className={cn(
      "col-span-full bg-dotto-cream px-6 py-10",
      "md:px-12 md:py-12",
    )}
  >
    <h2
      data-id="work-chapter-title"
      className={cn(
        "m-0 font-[family-name:var(--font-matter)]",
        "text-[13px] tracking-[0.15em] text-dotto-brown uppercase",
      )}
    >
      {label}
    </h2>
    <p
      data-id="work-chapter-note"
      className={cn(
        "m-0 mt-3 max-w-[46ch] font-[family-name:var(--font-antiqua)]",
        "text-[13px] leading-[18px] font-[350] text-dotto-brown/80",
      )}
    >
      {note}
    </p>
  </div>
);

type WorkGridCardProps = {
  item: WorkItem;
};

const WorkGridCard: FC<WorkGridCardProps> = ({ item }) => {
  const { slug, name, subtitle, location, images } = item;
  const cover = images[0];

  return (
    <Link
      href={`/work/${slug}`}
      data-id="work-grid-card"
      className="group relative aspect-[1440/1860] overflow-hidden bg-dotto-brown"
    >
      {cover && (
        <Image
          src={cover.src}
          alt={cover.alt || name}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
        />
      )}
      <div
        data-id="work-grid-card-overlay"
        className={cn(
          "absolute inset-0 flex flex-col justify-end",
          "bg-gradient-to-t from-black/50 via-transparent to-transparent",
          "p-6",
        )}
      >
        <h3
          data-id="work-grid-card-title"
          className="m-0 font-[family-name:var(--font-matter)] text-[13px] tracking-[0.15em] text-dotto-cream uppercase"
        >
          {name}
        </h3>
        <p
          data-id="work-grid-card-subtitle"
          className="m-0 mt-2 font-[family-name:var(--font-antiqua)] text-[13px] leading-[18px] font-[350] text-dotto-cream"
        >
          {subtitle}
        </p>
        <p
          data-id="work-grid-card-location"
          className="m-0 mt-1 font-[family-name:var(--font-antiqua)] text-[13px] leading-[18px] font-[350] text-dotto-cream/80"
        >
          {workPlace(location)}
        </p>
      </div>
    </Link>
  );
};
