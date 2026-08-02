import type { FC, ReactNode } from "react";

import { DsText } from "@/app/components/ds/DsText";

export type TextRun = {
  text: string;
  strong?: boolean;
  href?: string;
};

export type TextParagraph =
  | { type: "text"; text: string }
  | { type: "rich"; runs: TextRun[] };

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
  if (paragraph.type === "text") {
    return (
      <DsText
        as="p"
        data-id="about-body-paragraph"
        variant="body"
        className="m-0 mb-[18px] whitespace-pre-line last:mb-0"
      >
        {paragraph.text}
      </DsText>
    );
  }

  return (
    <DsText
      as="p"
      data-id="about-body-paragraph"
      variant="body"
      className="m-0 mb-[18px] whitespace-pre-line last:mb-0"
    >
      {paragraph.runs.map((run, index) => (
        <TextRunView key={`${run.text}-${index}`} run={run} />
      ))}
    </DsText>
  );
};

type TextRunViewProps = {
  run: TextRun;
};

const TextRunView: FC<TextRunViewProps> = ({ run }) => {
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
  if (strong) {
    return (
      <BodyAnchor href={href}>
        <strong>{text}</strong>
      </BodyAnchor>
    );
  }

  return <BodyAnchor href={href}>{text}</BodyAnchor>;
};

type BodyAnchorProps = {
  href: string;
  children: ReactNode;
};

const BodyAnchor: FC<BodyAnchorProps> = ({ href, children }) => {
  const isExternal = href.startsWith("http");
  const target = isExternal ? "_blank" : undefined;
  const rel = isExternal ? "noopener noreferrer" : undefined;

  return (
    <a
      href={href}
      data-id="about-body-link"
      className="text-inherit underline underline-offset-2"
      target={target}
      rel={rel}
    >
      {children}
    </a>
  );
};
