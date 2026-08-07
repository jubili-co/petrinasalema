import Link from "next/link";
import type { FC, ReactNode } from "react";

import { cn } from "@/lib/cn";

export type BookOffer = {
  title: string;
  body: string;
  note?: string;
};

export type BookCta = {
  label: string;
  href: string;
  microcopy?: string;
};

export type BookQuote = {
  text: string;
  attribution: string;
};

export type BookContent = {
  hook: string;
  projectOffer: BookOffer;
  jumpstartOffer: BookOffer;
  primaryCta: BookCta;
  quote: BookQuote;
  secondaryCta: BookCta;
  emails: {
    general: string;
    jubili: string;
  };
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
    emails,
  } = book;
  const projectAction = (
    <div data-id="book-primary">
      <BookActionLink cta={primaryCta} variant="primary" />
      {primaryCta.microcopy && (
        <p
          data-id="book-primary-microcopy"
          className={cn(
            "m-0 mt-3 font-[family-name:var(--font-antiqua)]",
            "text-[12px] leading-[16px] font-[350] text-dotto-brown/85",
          )}
        >
          {primaryCta.microcopy}
        </p>
      )}
    </div>
  );
  const jumpstartAction = (
    <div data-id="book-secondary">
      <BookActionLink cta={secondaryCta} variant="secondary" />
      {secondaryCta.microcopy && (
        <p
          data-id="book-secondary-microcopy"
          className={cn(
            "m-0 mt-2 font-[family-name:var(--font-antiqua)]",
            "text-[11px] leading-[15px] font-[350] text-dotto-brown/80",
          )}
        >
          {secondaryCta.microcopy}
        </p>
      )}
    </div>
  );
  return (
    <div
      data-id="book-panel"
      className={cn(
        "flex w-full flex-col justify-start",
        "px-6 pt-8 pb-16 md:w-1/2 md:px-[30px] md:pt-10 md:pb-20 lg:px-12",
      )}
    >
      <div data-id="book-panel-inner" className="mx-auto w-full max-w-[420px]">
        <p
          data-id="book-hook"
          className={cn(
            "m-0 font-[family-name:var(--font-antiqua)]",
            "text-[22px] leading-[1.4] font-[350] text-dotto-brown",
            "md:text-[24px] md:leading-[1.38]",
          )}
        >
          {hook}
        </p>

        <div data-id="book-offers" className="mt-14 flex flex-col gap-12">
          <OfferBlock
            offer={projectOffer}
            action={projectAction}
            emphasis="lead"
          />
          <OfferBlock
            offer={jumpstartOffer}
            action={jumpstartAction}
            emphasis="quiet"
          />
        </div>

        <blockquote
          data-id="book-quote"
          className="m-0 mt-12 border-l border-dotto-brown/35 pl-4"
        >
          <p
            data-id="book-quote-text"
            className={cn(
              "m-0 font-[family-name:var(--font-antiqua)]",
              "text-[14px] leading-[20px] font-[350] text-dotto-brown",
            )}
          >
            “{quote.text}”
          </p>
          <footer
            data-id="book-quote-attribution"
            className={cn(
              "mt-2 font-[family-name:var(--font-matter)]",
              "text-[11px] tracking-[0.12em] text-dotto-brown/80 uppercase",
            )}
          >
            {quote.attribution}
          </footer>
        </blockquote>

        <div
          data-id="book-side-door"
          className="mt-14 border-t border-dotto-brown/25 pt-7"
        >
          <p
            data-id="book-side-door-lede"
            className={cn(
              "m-0 mb-5 font-[family-name:var(--font-antiqua)]",
              "text-[12px] leading-[16px] font-[350] text-dotto-brown/80",
            )}
          >
            For press or anything else, email works.
          </p>

          <EmailRow label="Studio" value={emails.general} />
          <EmailRow label="Jubili" value={emails.jubili} />
        </div>
      </div>
    </div>
  );
};

type OfferEmphasis = "lead" | "quiet";

type OfferBlockProps = {
  offer: BookOffer;
  action: ReactNode;
  emphasis: OfferEmphasis;
};

const OfferBlock: FC<OfferBlockProps> = ({ offer, action, emphasis }) => {
  const { title, body, note } = offer;
  const isLead = emphasis === "lead";

  return (
    <div data-id="book-offer">
      <h2
        data-id="book-offer-title"
        className={cn(
          "m-0 mb-2 font-[family-name:var(--font-matter)] uppercase",
          {
            "text-[13px] leading-[18px] tracking-[0.15em] text-dotto-brown":
              isLead,
            "text-[11px] leading-[16px] tracking-[0.14em] text-dotto-brown":
              !isLead,
          },
        )}
      >
        {title}
      </h2>
      <p
        data-id="book-offer-body"
        className={cn("m-0 font-[family-name:var(--font-antiqua)] font-[350]", {
          "text-[13px] leading-[18px] text-dotto-brown": isLead,
          "text-[12px] leading-[17px] text-dotto-brown/85": !isLead,
        })}
      >
        {body}
      </p>
      {note && (
        <p
          data-id="book-offer-note"
          className={cn(
            "m-0 mt-3 font-[family-name:var(--font-antiqua)]",
            "text-[13px] leading-[18px] font-[350] text-dotto-brown/85",
          )}
        >
          {note}
        </p>
      )}
      <div
        data-id="book-offer-action"
        className={cn({ "mt-5": isLead, "mt-4": !isLead })}
      >
        {action}
      </div>
    </div>
  );
};

type BookActionLinkProps = {
  cta: BookCta;
  variant: "primary" | "secondary";
};

const BookActionLink: FC<BookActionLinkProps> = ({ cta, variant }) => {
  const { label, href } = cta;
  const isExternal = href.startsWith("http");
  const isPrimary = variant === "primary";
  const className = cn(
    "group/cta relative inline-flex items-center justify-center",
    "overflow-hidden font-[family-name:var(--font-matter)] uppercase",
    {
      "min-h-11 py-3 pl-8 pr-8 text-[12px] tracking-[0.15em] border border-dotto-brown bg-dotto-brown":
        isPrimary,
      "min-h-9 py-2.5 pl-6 pr-6 text-[11px] tracking-[0.12em] border border-dotto-brown":
        !isPrimary,
    },
  );
  const toneClassName = cn({
    "text-dotto-cream": isPrimary,
    "text-dotto-brown": !isPrimary,
  });
  const labelClassName = cn(
    "inline-block translate-x-0 will-change-transform",
    "transition-transform duration-300 ease-out",
    "group-hover/cta:-translate-x-1.5",
    toneClassName,
  );
  const arrowClassName = cn(
    "pointer-events-none absolute inset-y-0 right-4",
    "flex items-center text-[15px] leading-none",
    "opacity-0 will-change-transform",
    "[transform:translate3d(2px,0,0)]",
    "transition-[opacity,transform] duration-300 ease-out",
    "group-hover/cta:opacity-100",
    "group-hover/cta:[transform:translate3d(0,0,0)]",
    toneClassName,
  );
  const content = (
    <>
      <span data-id="book-action-label" className={labelClassName}>
        {label}
      </span>
      <span data-id="book-action-arrow" aria-hidden className={arrowClassName}>
        →
      </span>
    </>
  );

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        data-id="book-action-link"
        className={className}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} data-id="book-action-link" className={className}>
      {content}
    </Link>
  );
};

type EmailRowProps = {
  label: string;
  value: string;
};

const EmailRow: FC<EmailRowProps> = ({ label, value }) => (
  <div data-id="book-email-block" className="mb-4 last:mb-0">
    <h2
      data-id="book-side-heading"
      className={cn(
        "mb-1.5 font-[family-name:var(--font-matter)]",
        "text-[10px] tracking-[0.14em] text-dotto-brown/80 uppercase",
      )}
    >
      {label}
    </h2>
    <a
      href={`mailto:${value}`}
      data-id="book-email"
      className={cn(
        "font-[family-name:var(--font-antiqua)] text-[12px] text-dotto-brown",
        "transition-opacity duration-200 hover:opacity-70",
      )}
    >
      {value}
    </a>
  </div>
);
