import type { Metadata } from "next";
import Link from "next/link";
import { Fragment, type FC } from "react";

import { FadeImage } from "@/app/components/FadeImage";
import { cn } from "@/lib/cn";
import { PAPERS } from "@/lib/papers";
import {
  workChapterGroups,
  workPlace,
  type WorkChapter,
  type WorkChapterGroup,
  type WorkItem,
} from "@/lib/work";

import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { PaperWord } from "../components/PaperWord";
import { SketchArtifact } from "../components/SketchArtifact";
import { WorkInvite } from "./WorkInvite";

export const metadata: Metadata = {
  title: "Work | Petrina Salema",
  description:
    "Homes and hospitality spaces by Petrina Salema, with architectural projects from a decade in practice. Vienna, and projects abroad.",
};

const WorkPage: FC = () => {
  const groups = workChapterGroups();

  return (
    <main data-id="work-page" className="min-h-dvh bg-canvas">
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
      <WorkChapterHeading chapter={id} label={label} note={note} />
      {items.map((item) => (
        <WorkGridCard key={item.id} item={item} />
      ))}
      {isHomes && <WorkInvite />}
    </Fragment>
  );
};

type WorkChapterHeadingProps = {
  chapter: WorkChapter;
  label: string;
  note: string;
};

const WorkChapterHeading: FC<WorkChapterHeadingProps> = ({
  chapter,
  label,
  note,
}) => {
  const isPrior = chapter === "prior";
  const isHomes = chapter === "homes";
  const priorSketchSrc = `${PAPERS}/schnitt-c-d--schnitt-line.webp`;
  const homesSketchSrc = `${PAPERS}/strassenansicht--haus-line.webp`;

  return (
    <div
      data-id="work-chapter-heading"
      className={cn(
        "relative overflow-hidden",
        "col-span-full bg-canvas px-6 py-10",
        "md:px-12 md:py-12",
      )}
    >
      {isPrior && (
        <SketchArtifact
          src={priorSketchSrc}
          fade="inset"
          sizes="(min-width: 768px) 52vw, 75vw"
          data-id="work-chapter-sketch"
          className="top-0 right-0 h-full w-[75%] md:w-[52%]"
          imageClassName="rotate-[16deg] scale-[1.2] object-left"
        />
      )}
      {isPrior && (
        <PaperWord
          word="schnittCd"
          data-id="work-chapter-word"
          className="-right-7 top-3 w-32 rotate-[11deg] md:w-40"
        />
      )}
      {isHomes && (
        <SketchArtifact
          src={homesSketchSrc}
          fade="inset"
          sizes="(min-width: 768px) 32vw, 52vw"
          data-id="work-chapter-sketch"
          className="top-0 left-0 h-full w-[52%] md:w-[32%]"
          imageClassName="-rotate-[6deg] scale-[1.35] object-bottom"
        />
      )}
      {isHomes && (
        <PaperWord
          word="strassenansicht"
          data-id="work-chapter-word"
          className="-bottom-2 -left-10 w-44 -rotate-[7deg] md:w-56"
        />
      )}
      <div data-id="work-chapter-copy" className="relative">
        <h2
          data-id="work-chapter-title"
          className={cn(
            "m-0 font-[family-name:var(--font-matter)]",
            "text-[14px] tracking-[0.15em] text-ink uppercase",
          )}
        >
          {label}
        </h2>
        <p
          data-id="work-chapter-note"
          className={cn(
            "m-0 mt-3 max-w-[46ch] font-[family-name:var(--font-playfair)]",
            "text-[length:var(--text-copy)] leading-[var(--leading-copy)] font-[350] text-ink/80",
          )}
        >
          {note}
        </p>
      </div>
    </div>
  );
};

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
      className="group relative aspect-[1440/1860] overflow-hidden bg-inverse"
    >
      {cover && (
        <div
          data-id="work-grid-card-media"
          className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.02]"
        >
          <FadeImage
            src={cover.src}
            alt={cover.alt || name}
            placeholder={cover.placeholder}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover"
            data-id="work-grid-card-image"
          />
        </div>
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
          className="m-0 font-[family-name:var(--font-matter)] text-[14px] tracking-[0.15em] text-chalk uppercase"
        >
          {name}
        </h3>
        <p
          data-id="work-grid-card-subtitle"
          className="m-0 mt-2 font-[family-name:var(--font-playfair)] text-[length:var(--text-copy)] leading-[var(--leading-copy)] font-[350] text-chalk"
        >
          {subtitle}
        </p>
        <p
          data-id="work-grid-card-location"
          className="m-0 mt-1 font-[family-name:var(--font-playfair)] text-[length:var(--text-copy)] leading-[var(--leading-copy)] font-[350] text-chalk/80"
        >
          {workPlace(location)}
        </p>
      </div>
    </Link>
  );
};
