import Link from "next/link";
import type { FC } from "react";

import { DsText } from "@/app/components/ds/DsText";
import { PaperWord } from "@/app/components/PaperWord";
import { SketchArtifact } from "@/app/components/SketchArtifact";
import { cn } from "@/lib/cn";
import { FIT_CALL_DOOR, FIT_CALL_PATH } from "@/lib/site";
import {
  workOffersDoor,
  workPlace,
  type WorkCaseStudy,
  type WorkItem,
  type WorkLink,
  type WorkResult,
} from "@/lib/work";

import { getChrome } from "./WorkDetailsChrome";

type Props = {
  item: WorkItem;
  nextSlug: string;
};

export const WorkDetails: FC<Props> = ({ item, nextSlug }) => {
  const {
    slug,
    name,
    subtitle,
    location,
    description,
    scope,
    links,
    caseStudy,
  } = item;
  const place = workPlace(location);
  const hasSubtitle = Boolean(subtitle);
  const hasScope = scope.length > 0;
  const hasLinks = links.length > 0;
  const linksHeading = links.length === 1 ? "Link" : "Links";
  const showDoor = workOffersDoor(item);
  const { sketch, stamps } = getChrome(slug);
  const { src, fade, className: sketchClassName, imageClassName } = sketch;

  return (
    <section
      data-id="work-details"
      className={cn(
        "relative overflow-hidden bg-inverse text-chalk",
        "px-6 pt-[30px] pb-20 md:min-h-[40rem] md:px-12 md:pb-28",
      )}
    >
      <SketchArtifact
        src={src}
        fade={fade}
        tone="chalk"
        sizes="(min-width: 768px) 58vw, 90vw"
        data-id="work-details-sketch"
        className={sketchClassName}
        imageClassName={imageClassName}
      />
      {stamps.map(({ word, className }) => (
        <PaperWord
          key={word}
          word={word}
          tone="chalk"
          className={className}
          data-id="work-details-word"
        />
      ))}
      <div
        data-id="work-details-inner"
        className={cn(
          "relative flex flex-col gap-12",
          "md:flex-row md:flex-nowrap md:items-start md:gap-0",
        )}
      >
        <div data-id="work-details-main" className="w-full md:w-1/2">
          <div
            data-id="work-details-copy"
            className="mb-[54px] max-w-full md:mb-[70px] md:max-w-[70%]"
          >
            <DsText
              data-id="work-details-title"
              variant="h2"
              className={cn({ "mb-[10px]": hasSubtitle })}
            >
              {name},
              <span
                data-id="work-details-location"
                className={cn(
                  "ml-[10px] inline-block font-[family-name:var(--font-playfair)]",
                  "text-[length:var(--text-copy)] leading-[var(--leading-copy)] font-[350] tracking-normal normal-case",
                )}
              >
                {place}
              </span>
            </DsText>
            {hasSubtitle && (
              <p
                data-id="work-details-subtitle"
                className={cn(
                  "m-0 mb-[18px] font-[family-name:var(--font-playfair)]",
                  "text-[length:var(--text-copy)] leading-[var(--leading-copy)] font-[350]",
                )}
              >
                {subtitle}
              </p>
            )}
            <p
              data-id="work-details-body"
              className={cn(
                "m-0 font-[family-name:var(--font-playfair)]",
                "text-[length:var(--text-copy)] leading-[var(--leading-copy)] font-[350]",
              )}
            >
              {description}
            </p>
            {hasScope && (
              <div data-id="work-details-scope" className="mt-[30px]">
                <h3
                  data-id="work-details-scope-title"
                  className={cn(
                    "m-0 mb-[10px] font-[family-name:var(--font-matter)]",
                    "text-[length:var(--text-copy)] leading-[var(--leading-copy)] tracking-[0.15em] uppercase",
                  )}
                >
                  Scope
                </h3>
                <p
                  data-id="work-details-scope-list"
                  className={cn(
                    "m-0 font-[family-name:var(--font-playfair)]",
                    "text-[length:var(--text-copy)] leading-[var(--leading-copy)] font-[350]",
                  )}
                >
                  {scope.join(" · ")}
                </p>
              </div>
            )}
            {caseStudy && <WorkCaseStudyBlock caseStudy={caseStudy} />}
            {showDoor && (
              <Link
                href={FIT_CALL_PATH}
                data-id="work-details-door"
                className={cn(
                  "mt-[18px] inline-block font-[family-name:var(--font-playfair)]",
                  "text-[length:var(--text-copy)] leading-[var(--leading-copy)] font-[350] text-chalk",
                  "underline underline-offset-4 transition-opacity duration-200 hover:opacity-70",
                )}
              >
                {FIT_CALL_DOOR}
              </Link>
            )}
          </div>
        </div>

        <div data-id="work-details-meta" className="w-full md:w-[35%]">
          <div className="mb-[18px] flex justify-end md:hidden">
            <Link
              href={`/work/${nextSlug}`}
              data-id="work-details-next-mobile"
              className={cn(
                "font-[family-name:var(--font-matter)] text-[length:var(--text-copy)] leading-[var(--leading-copy)]",
                "tracking-[0.15em] uppercase",
                "transition-opacity duration-200 hover:opacity-50",
              )}
            >
              Next
            </Link>
          </div>

          {hasLinks && (
            <div data-id="work-details-links">
              <h3
                data-id="work-details-links-title"
                className={cn(
                  "m-0 mb-[10px] font-[family-name:var(--font-matter)]",
                  "text-[length:var(--text-copy)] leading-[var(--leading-copy)] tracking-[0.15em] uppercase",
                )}
              >
                {linksHeading}
              </h3>
              <ul
                data-id="work-details-links-list"
                className="m-0 list-none p-0"
              >
                {links.map((link) => (
                  <ExternalLinkItem key={link.href} link={link} />
                ))}
              </ul>
            </div>
          )}
        </div>

        <div
          data-id="work-details-next"
          className="hidden w-[15%] justify-end md:flex"
        >
          <Link
            href={`/work/${nextSlug}`}
            data-id="work-details-next-link"
            className={cn(
              "font-[family-name:var(--font-matter)]",
              "text-[length:var(--text-copy)] leading-[var(--leading-copy)] tracking-[0.15em] uppercase",
              "transition-opacity duration-200 hover:opacity-50",
            )}
          >
            Next
          </Link>
        </div>
      </div>
    </section>
  );
};

type WorkCaseStudyBlockProps = {
  caseStudy: WorkCaseStudy;
};

const WorkCaseStudyBlock: FC<WorkCaseStudyBlockProps> = ({ caseStudy }) => {
  const { problem, decisions, result, results } = caseStudy;
  const bodyClassName = cn(
    "m-0 font-[family-name:var(--font-playfair)]",
    "text-[length:var(--text-copy)] leading-[var(--leading-copy)] font-[350]",
  );
  const labelClassName = cn(
    "m-0 mb-2 font-[family-name:var(--font-matter)]",
    "text-[12px] leading-[16px] tracking-[0.15em] uppercase text-chalk/70",
  );

  return (
    <div data-id="work-case-study" className="mt-8 flex flex-col gap-6">
      <div data-id="work-case-study-problem">
        <p className={labelClassName}>The brief</p>
        <p data-id="work-case-study-problem-body" className={bodyClassName}>
          {problem}
        </p>
      </div>
      <div data-id="work-case-study-decisions">
        <p className={labelClassName}>What changed</p>
        <p data-id="work-case-study-decisions-body" className={bodyClassName}>
          {decisions}
        </p>
      </div>
      <div data-id="work-case-study-result">
        <p className={labelClassName}>What held</p>
        <p data-id="work-case-study-result-body" className={bodyClassName}>
          {result}
        </p>
      </div>
      {results.length > 0 && <WorkResultsList results={results} />}
    </div>
  );
};

type WorkResultsListProps = {
  results: WorkResult[];
};

const WorkResultsList: FC<WorkResultsListProps> = ({ results }) => (
  <ul
    data-id="work-case-study-results"
    className="m-0 flex list-none flex-col gap-4 border-t border-chalk/25 p-0 pt-6"
  >
    {results.map((entry) => (
      <WorkResultRow key={`${entry.value}-${entry.label}`} result={entry} />
    ))}
  </ul>
);

type WorkResultRowProps = {
  result: WorkResult;
};

const WorkResultRow: FC<WorkResultRowProps> = ({ result }) => {
  const { value, label } = result;

  return (
    <li data-id="work-case-study-result-row">
      <p
        data-id="work-case-study-result-value"
        className={cn(
          "m-0 font-[family-name:var(--font-matter)]",
          "text-[length:var(--text-copy)] leading-[var(--leading-copy)] tracking-[0.08em] uppercase",
        )}
      >
        {value}
      </p>
      <p
        data-id="work-case-study-result-label"
        className={cn(
          "m-0 mt-1 font-[family-name:var(--font-playfair)]",
          "text-[length:var(--text-copy)] leading-[var(--leading-copy)] font-[350] text-chalk/85",
        )}
      >
        {label}
      </p>
    </li>
  );
};

type ExternalLinkItemProps = {
  link: WorkLink;
};

const ExternalLinkItem: FC<ExternalLinkItemProps> = ({ link }) => {
  const { href, text } = link;

  return (
    <li data-id="work-details-link" className="mb-[10px] last:mb-0">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        data-id="work-details-link-anchor"
        className={cn(
          "font-[family-name:var(--font-playfair)] text-[length:var(--text-copy)] leading-[var(--leading-copy)] font-[350]",
          "underline transition-opacity duration-200 hover:opacity-50",
        )}
      >
        {text}
      </a>
    </li>
  );
};
