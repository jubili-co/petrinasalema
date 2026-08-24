import type { FC, ReactNode } from "react";

import { cn } from "@/lib/cn";
import { PAPERS } from "@/lib/papers";

import { CtaLink } from "../components/CtaLink";
import { PaperWord } from "../components/PaperWord";
import { SketchArtifact } from "../components/SketchArtifact";

export type BookOffer = {
  title: string;
  body: string;
  note?: string;
  finance?: string;
};

export type BookCta = {
  label: string;
  href: string;
  microcopy?: string;
};

export type BookContent = {
  hook: string;
  projectOffer: BookOffer;
  jumpstartOffer: BookOffer;
  primaryCta: BookCta;
  secondaryCta: BookCta;
};

type Props = {
  book: BookContent;
};

const SKETCH_SRC = `${PAPERS}/schnitt-a-b--schnitt-line.webp`;

export const BookPanel: FC<Props> = ({ book }) => {
  const { hook, projectOffer, jumpstartOffer, primaryCta, secondaryCta } = book;
  const microcopyClassName = cn(
    "m-0 mt-3 font-[family-name:var(--font-playfair)]",
    "text-[12px] leading-[16px] font-[350] text-dotto-brown/85",
  );
  const projectAction = (
    <div data-id="book-primary">
      <CtaLink
        href={primaryCta.href}
        variant="primary"
        data-id="book-action-link"
      >
        {primaryCta.label}
      </CtaLink>
      {primaryCta.microcopy && (
        <p data-id="book-primary-microcopy" className={microcopyClassName}>
          {primaryCta.microcopy}
        </p>
      )}
    </div>
  );
  const jumpstartAction = (
    <div data-id="book-secondary">
      <CtaLink
        href={secondaryCta.href}
        variant="secondary"
        data-id="book-action-link"
      >
        {secondaryCta.label}
      </CtaLink>
      {secondaryCta.microcopy && (
        <p data-id="book-secondary-microcopy" className={microcopyClassName}>
          {secondaryCta.microcopy}
        </p>
      )}
    </div>
  );
  return (
    <div
      data-id="book-panel"
      className={cn(
        "relative overflow-hidden",
        "flex w-full flex-col justify-start",
        "px-6 pt-10 pb-20 md:w-1/2 md:px-[30px] md:pt-12 md:pb-24 lg:px-12",
      )}
    >
      <SketchArtifact
        src={SKETCH_SRC}
        fade="left"
        sizes="(min-width: 768px) 50vw, 100vw"
        data-id="book-sketch"
        className="inset-x-0 -bottom-32 h-[16rem] md:h-[18rem]"
        imageClassName="object-[50%_30%]"
      />
      <PaperWord
        word="hofansicht"
        data-id="book-word"
        className="-right-8 top-[4.5rem] w-32 -rotate-[20deg] md:w-40"
      />
      <PaperWord
        word="schnittAb"
        data-id="book-word"
        className="top-[26rem] -left-5 w-[6.75rem] rotate-[16deg] md:w-32"
      />
      <div
        data-id="book-panel-inner"
        className="relative mx-auto w-full max-w-[420px]"
      >
        <p
          data-id="book-hook"
          className={cn(
            "m-0 font-[family-name:var(--font-playfair)]",
            "text-[22px] leading-[1.45] font-[350] text-dotto-brown",
            "md:text-[24px] md:leading-[1.42]",
          )}
        >
          {hook}
        </p>

        <div data-id="book-offers" className="mt-16 flex flex-col gap-14">
          <OfferBlock offer={projectOffer} action={projectAction} />
          <OfferBlock offer={jumpstartOffer} action={jumpstartAction} />
        </div>
      </div>
    </div>
  );
};

type OfferBlockProps = {
  offer: BookOffer;
  action: ReactNode;
};

const OfferBlock: FC<OfferBlockProps> = ({ offer, action }) => {
  const { title, body, note, finance } = offer;
  const asideClassName = cn(
    "m-0 mt-3 font-[family-name:var(--font-playfair)]",
    "text-[13px] leading-[18px] font-[350] text-dotto-brown/85",
  );

  return (
    <div data-id="book-offer">
      <h2
        data-id="book-offer-title"
        className={cn(
          "m-0 mb-2 font-[family-name:var(--font-matter)]",
          "text-[13px] leading-[18px] tracking-[0.15em] text-dotto-brown uppercase",
        )}
      >
        {title}
      </h2>
      <p
        data-id="book-offer-body"
        className={cn(
          "m-0 font-[family-name:var(--font-playfair)]",
          "text-[13px] leading-[18px] font-[350] text-dotto-brown",
        )}
      >
        {body}
      </p>
      {note && (
        <p data-id="book-offer-note" className={asideClassName}>
          {note}
        </p>
      )}
      {finance && (
        <p data-id="book-offer-finance" className={asideClassName}>
          {finance}
        </p>
      )}
      <div data-id="book-offer-action" className="mt-5">
        {action}
      </div>
    </div>
  );
};
