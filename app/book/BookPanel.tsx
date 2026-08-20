import type { FC, ReactNode } from "react";

import { cn } from "@/lib/cn";

import { CtaLink } from "../components/CtaLink";
import { PaperFigure } from "../components/PaperFigure";
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

export type BookQuoteFigure = {
  src: string;
  alt: string;
  caption: string;
};

export type BookQuote = {
  text: string;
  attribution: string;
  figure?: BookQuoteFigure;
};

export type BookContent = {
  hook: string;
  projectOffer: BookOffer;
  jumpstartOffer: BookOffer;
  primaryCta: BookCta;
  quote: BookQuote;
  secondaryCta: BookCta;
  email: string;
};

type Props = {
  book: BookContent;
};

export const BookPanel: FC<Props> = ({ book }) => {
  const {
    hook,
    projectOffer,
    jumpstartOffer,
    primaryCta,
    quote,
    secondaryCta,
    email,
  } = book;
  const { text, attribution, figure } = quote;
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
        "relative",
        "flex w-full flex-col justify-start",
        "px-6 pt-10 pb-20 md:w-1/2 md:px-[30px] md:pt-12 md:pb-24 lg:px-12",
      )}
    >
      <SketchArtifact
        src="/papers/schnitt-a-b--schnitt-line.webp"
        fade="inset"
        sizes="(min-width: 768px) 50vw, 100vw"
        data-id="book-sketch"
        className="right-0 bottom-[8%] left-[10%] h-[48%]"
        imageClassName="-rotate-[8deg] scale-[1.45] object-top"
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

        <div data-id="book-close" className="mt-16">
          <blockquote data-id="book-quote" className="m-0">
            <p
              data-id="book-quote-text"
              className={cn(
                "m-0 font-[family-name:var(--font-playfair)]",
                "text-[15px] leading-[22px] font-[350] text-dotto-brown",
              )}
            >
              “{text}”
              <cite
                data-id="book-quote-attribution"
                className="not-italic text-dotto-brown/85"
              >
                {" · "}
                {attribution}
              </cite>
            </p>
          </blockquote>
          {figure && (
            <PaperFigure
              src={figure.src}
              alt={figure.alt}
              caption={figure.caption}
              sizes="(min-width: 768px) 420px, 100vw"
              className="mt-8"
            />
          )}

          <div
            data-id="book-email-divider"
            role="presentation"
            className="mt-10 border-t border-dotto-brown/25"
          />
          <a
            href={`mailto:${email}`}
            data-id="book-email"
            className={cn(
              "mt-6 block font-[family-name:var(--font-playfair)]",
              "text-[13px] leading-[18px] font-[350] text-dotto-brown",
              "transition-opacity duration-200 hover:opacity-70",
            )}
          >
            {email}
          </a>
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
