import type { FC } from "react";

import { cn } from "@/lib/cn";

export type TextRun = {
  text: string;
  strong?: boolean;
  href?: string;
};

export type TextParagraph =
  { type: "text"; text: string } | { type: "rich"; runs: TextRun[] };

type Props = {
  paragraphs: TextParagraph[];
};

export const AboutBody: FC<Props> = ({ paragraphs }) => (
  <div data-id="about-body" className="w-full max-w-[568px] md:w-[70%]">
    {paragraphs.map((paragraph, index) => (
      <AboutParagraph key={`about-body-${index}`} paragraph={paragraph} />
    ))}
  </div>
);

type AboutParagraphProps = {
  paragraph: TextParagraph;
};

const AboutParagraph: FC<AboutParagraphProps> = ({ paragraph }) => {
  const className = cn(
    "m-0 mb-[18px] whitespace-pre-line",
    "font-[family-name:var(--font-antiqua)] text-[13px] leading-[18px] font-[350]",
    "last:mb-0",
  );

  if (paragraph.type === "text") {
    return (
      <p data-id="about-body-paragraph" className={className}>
        {paragraph.text}
      </p>
    );
  }

  return (
    <p data-id="about-body-paragraph" className={className}>
      {paragraph.runs.map((run, index) => (
        <TextRun key={`${run.text}-${index}`} run={run} />
      ))}
    </p>
  );
};

type TextRunProps = {
  run: TextRun;
};

const TextRun: FC<TextRunProps> = ({ run }) => {
  const { text, strong, href } = run;

  if (!href && strong) {
    return <strong>{text}</strong>;
  }

  if (!href) {
    return <span>{text}</span>;
  }

  return <BodyLink href={href} text={text} strong={Boolean(strong)} />;
};

type BodyLinkProps = {
  href: string;
  text: string;
  strong: boolean;
};

const BodyLink: FC<BodyLinkProps> = ({ href, text, strong }) => {
  const isExternal = href.startsWith("http");
  const target = isExternal ? "_blank" : undefined;
  const rel = isExternal ? "noopener noreferrer" : undefined;

  if (strong) {
    return (
      <a
        href={href}
        data-id="about-body-link"
        className="text-cream underline"
        target={target}
        rel={rel}
      >
        <strong>{text}</strong>
      </a>
    );
  }

  return (
    <a
      href={href}
      data-id="about-body-link"
      className="text-cream underline"
      target={target}
      rel={rel}
    >
      {text}
    </a>
  );
};
