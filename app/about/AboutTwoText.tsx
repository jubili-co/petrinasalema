import type { FC } from "react";

export type TwoTextSection = {
  type: "twoText";
  leftTitle?: string | null;
  leftParagraphs: string[];
  rightTitle?: string | null;
  rightParagraphs: string[];
  leftColor?: string | null;
  rightColor?: string | null;
};

type Props = {
  section: TwoTextSection;
};

export const AboutTwoText: FC<Props> = ({ section }) => (
  <section
    data-id="about-two-text"
    className="grid min-h-[60dvh] grid-cols-1 md:grid-cols-2"
  >
    <div
      data-id="about-two-text-left"
      className="flex flex-col justify-end px-6 py-16 text-cream md:px-12 md:py-20"
      style={{ backgroundColor: section.leftColor || "#633B2F" }}
    >
      {section.leftTitle && (
        <h2
          data-id="about-two-text-left-title"
          className="mb-8 font-[family-name:var(--font-matter)] text-[13px] tracking-[0.15em] uppercase"
        >
          {section.leftTitle}
        </h2>
      )}
      <div className="max-w-[420px] space-y-5">
        {section.leftParagraphs.map((paragraph) => (
          <p
            key={paragraph.slice(0, 48)}
            data-id="about-two-text-left-paragraph"
            className="font-[family-name:var(--font-antiqua)] text-[17px] leading-[1.55]"
          >
            {paragraph}
          </p>
        ))}
      </div>
    </div>
    <div
      data-id="about-two-text-right"
      className="flex flex-col justify-end px-6 py-16 text-brown md:px-12 md:py-20"
      style={{ backgroundColor: section.rightColor || "#F9F3F0" }}
    >
      {section.rightTitle && (
        <h2
          data-id="about-two-text-right-title"
          className="mb-8 font-[family-name:var(--font-matter)] text-[13px] tracking-[0.15em] uppercase"
        >
          {section.rightTitle}
        </h2>
      )}
      <div className="max-w-[420px] space-y-5">
        {section.rightParagraphs.map((paragraph) => (
          <p
            key={paragraph.slice(0, 48)}
            data-id="about-two-text-right-paragraph"
            className="font-[family-name:var(--font-antiqua)] text-[17px] leading-[1.55]"
          >
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  </section>
);
