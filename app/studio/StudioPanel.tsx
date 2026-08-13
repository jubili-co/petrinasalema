import Link from "next/link";
import type { FC } from "react";

import { cn } from "@/lib/cn";

import { GhostDrawing } from "../components/GhostDrawing";

export type StudioPrinciple = {
  title: string;
  body: string;
};

export type StudioCta = {
  label: string;
  href: string;
  microcopy?: string;
};

export type StudioExtension = {
  label: string;
  href: string;
  note: string;
  external?: boolean;
};

export type StudioContent = {
  eyebrow: string;
  hook: string;
  body: string;
  principles: StudioPrinciple[];
  ctaLede?: string;
  primaryCta: StudioCta;
  secondaryCta: StudioCta;
  extensions: StudioExtension[];
  ghost?: string;
};

type Props = {
  studio: StudioContent;
};

export const StudioPanel: FC<Props> = ({ studio }) => {
  const {
    eyebrow,
    hook,
    body,
    principles,
    ctaLede,
    primaryCta,
    secondaryCta,
    extensions,
    ghost,
  } = studio;
  const microcopyClassName = cn(
    "m-0 mt-3 font-[family-name:var(--font-antiqua)]",
    "text-[12px] leading-[16px] font-[350] text-dotto-brown/85",
  );

  return (
    <div
      data-id="studio-panel"
      className={cn(
        "relative overflow-hidden",
        "flex w-full flex-col justify-start",
        "px-6 pt-10 pb-20 md:w-1/2 md:px-[30px] md:pt-12 md:pb-24 lg:px-12",
      )}
    >
      {ghost && (
        <GhostDrawing
          src={ghost}
          sizes="(min-width: 768px) 34vw, 72vw"
          data-id="studio-ghost"
          className={cn(
            "right-[-16%] bottom-[-8%] md:right-[-6%] md:bottom-[-10%]",
            "w-[72vw] max-w-[480px] md:w-[34vw]",
          )}
        />
      )}
      <div
        data-id="studio-panel-inner"
        className="relative mx-auto w-full max-w-[420px]"
      >
        <p
          data-id="studio-eyebrow"
          className={cn(
            "m-0 mb-6 font-[family-name:var(--font-matter)]",
            "text-[13px] leading-[18px] tracking-[0.15em] text-dotto-brown uppercase",
          )}
        >
          {eyebrow}
        </p>

        <p
          data-id="studio-hook"
          className={cn(
            "m-0 font-[family-name:var(--font-antiqua)]",
            "text-[22px] leading-[1.45] font-[350] text-dotto-brown",
            "md:text-[24px] md:leading-[1.42]",
          )}
        >
          {hook}
        </p>

        <p
          data-id="studio-body"
          className={cn(
            "m-0 mt-8 font-[family-name:var(--font-antiqua)]",
            "text-[13px] leading-[18px] font-[350] text-dotto-brown",
          )}
        >
          {body}
        </p>

        <div data-id="studio-principles" className="mt-14 flex flex-col gap-10">
          {principles.map((principle) => (
            <PrincipleBlock key={principle.title} principle={principle} />
          ))}
        </div>

        <div data-id="studio-cta-block" className="mt-14">
          {ctaLede && (
            <p
              data-id="studio-cta-lede"
              className={cn(
                "m-0 mb-6 font-[family-name:var(--font-antiqua)]",
                "text-[13px] leading-[18px] font-[350] text-dotto-brown",
              )}
            >
              {ctaLede}
            </p>
          )}
          <div
            data-id="studio-ctas"
            className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-4"
          >
            <div data-id="studio-primary" className="min-w-0 flex-1">
              <StudioActionLink cta={primaryCta} variant="primary" />
              {primaryCta.microcopy && (
                <p
                  data-id="studio-primary-microcopy"
                  className={microcopyClassName}
                >
                  {primaryCta.microcopy}
                </p>
              )}
            </div>
            <div data-id="studio-secondary" className="min-w-0 flex-1">
              <StudioActionLink cta={secondaryCta} variant="secondary" />
              {secondaryCta.microcopy && (
                <p
                  data-id="studio-secondary-microcopy"
                  className={microcopyClassName}
                >
                  {secondaryCta.microcopy}
                </p>
              )}
            </div>
          </div>
        </div>

        <div
          data-id="studio-extensions"
          className="mt-16 border-t border-dotto-brown/25 pt-8"
        >
          <ul className="m-0 flex list-none flex-col gap-5 p-0">
            {extensions.map((extension) => (
              <ExtensionRow key={extension.href} extension={extension} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

type PrincipleBlockProps = {
  principle: StudioPrinciple;
};

const PrincipleBlock: FC<PrincipleBlockProps> = ({ principle }) => {
  const { title, body } = principle;

  return (
    <div data-id="studio-principle">
      <h2
        data-id="studio-principle-title"
        className={cn(
          "m-0 mb-2 font-[family-name:var(--font-matter)]",
          "text-[13px] leading-[18px] tracking-[0.15em] text-dotto-brown uppercase",
        )}
      >
        {title}
      </h2>
      <p
        data-id="studio-principle-body"
        className={cn(
          "m-0 font-[family-name:var(--font-antiqua)]",
          "text-[13px] leading-[18px] font-[350] text-dotto-brown",
        )}
      >
        {body}
      </p>
    </div>
  );
};

type StudioActionLinkProps = {
  cta: StudioCta;
  variant: "primary" | "secondary";
};

const StudioActionLink: FC<StudioActionLinkProps> = ({ cta, variant }) => {
  const { label, href } = cta;
  const isExternal = href.startsWith("http");
  const isPrimary = variant === "primary";
  const className = cn(
    "group/cta relative inline-flex w-full min-h-11 items-center justify-center",
    "overflow-hidden border border-dotto-brown py-3 pl-8 pr-8",
    "font-[family-name:var(--font-matter)] text-[12px] tracking-[0.15em] uppercase",
    { "bg-dotto-brown": isPrimary },
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
      <span data-id="studio-action-label" className={labelClassName}>
        {label}
      </span>
      <span data-id="studio-action-arrow" aria-hidden className={arrowClassName}>
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
        data-id="studio-action-link"
        className={className}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} data-id="studio-action-link" className={className}>
      {content}
    </Link>
  );
};

type ExtensionRowProps = {
  extension: StudioExtension;
};

const ExtensionRow: FC<ExtensionRowProps> = ({ extension }) => {
  const { label, href, note, external } = extension;
  const className = cn(
    "group/ext flex flex-col gap-1",
    "transition-opacity duration-200 hover:opacity-70",
  );
  const labelNode = (
    <span
      data-id="studio-extension-label"
      className={cn(
        "font-[family-name:var(--font-matter)]",
        "text-[13px] tracking-[0.15em] text-dotto-brown uppercase",
      )}
    >
      {label}
      <span aria-hidden className="ml-[0.35em] inline-block transition-transform duration-200 group-hover/ext:translate-x-0.5">
        →
      </span>
    </span>
  );
  const noteNode = (
    <span
      data-id="studio-extension-note"
      className={cn(
        "font-[family-name:var(--font-antiqua)]",
        "text-[12px] leading-[16px] font-[350] text-dotto-brown/85",
      )}
    >
      {note}
    </span>
  );

  if (external) {
    return (
      <li data-id="studio-extension">
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          data-id="studio-extension-link"
          className={className}
        >
          {labelNode}
          {noteNode}
        </a>
      </li>
    );
  }

  return (
    <li data-id="studio-extension">
      <Link href={href} data-id="studio-extension-link" className={className}>
        {labelNode}
        {noteNode}
      </Link>
    </li>
  );
};
