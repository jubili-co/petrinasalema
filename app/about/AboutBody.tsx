import type { FC } from "react";

import { cn } from "@/lib/cn";

export type TextRun = {
  text: string;
  strong: boolean;
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
      {paragraph.runs.map((run, index) => {
        if (run.strong) {
          return <strong key={`${run.text}-${index}`}>{run.text}</strong>;
        }

        return <span key={`${run.text}-${index}`}>{run.text}</span>;
      })}
    </p>
  );
};
