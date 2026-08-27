import type { FC } from "react";

import { resolveCssColor } from "@/lib/colors";
import { cn } from "@/lib/cn";

import { AboutBody, type TextParagraph } from "./AboutBody";
import { AboutTitle } from "./AboutTitle";

export type TwoTextSection = {
  type: "twoText";
  leftTitle?: string | null;
  leftSubtitle?: string | null;
  leftParagraphs: TextParagraph[];
  rightTitle?: string | null;
  rightSubtitle?: string | null;
  rightParagraphs: TextParagraph[];
  leftColor?: string | null;
  rightColor?: string | null;
  leftTextPosition?: string;
  rightTextPosition?: string;
  dynamicHeight?: boolean;
};

type Props = {
  section: TwoTextSection;
};

export const AboutTwoText: FC<Props> = ({ section }) => {
  const leftBackground = resolveCssColor(section.leftColor, "inverse");
  const rightBackground = resolveCssColor(section.rightColor, "band-b");
  const isLeftTop = section.leftTextPosition !== "bottom";
  const isRightTop = section.rightTextPosition !== "bottom";

  return (
    <section
      data-id="about-two-text"
      className="flex min-h-[100dvh] w-full flex-col md:flex-row md:flex-nowrap"
    >
      <div
        data-id="about-two-text-left"
        className="flex w-full text-chalk md:w-1/2 md:min-h-[100dvh]"
        style={{ backgroundColor: leftBackground }}
      >
        <div
          data-id="about-two-text-left-content"
          className={cn("flex w-full flex-col px-6 py-9 md:px-12 md:py-9", {
            "justify-start": isLeftTop,
            "justify-end": !isLeftTop,
          })}
        >
          <div data-id="about-two-text-left-inner" className="w-full">
            <AboutTitle
              title={section.leftTitle}
              subtitle={section.leftSubtitle}
            />
            <AboutBody paragraphs={section.leftParagraphs} />
          </div>
        </div>
      </div>

      <div
        data-id="about-two-text-right"
        className="flex w-full text-chalk md:w-1/2 md:min-h-[100dvh]"
        style={{ backgroundColor: rightBackground }}
      >
        <div
          data-id="about-two-text-right-content"
          className={cn("flex w-full flex-col px-6 py-9 md:px-12 md:py-9", {
            "justify-start": isRightTop,
            "justify-end": !isRightTop,
          })}
        >
          <div data-id="about-two-text-right-inner" className="w-full">
            <AboutTitle
              title={section.rightTitle}
              subtitle={section.rightSubtitle}
            />
            <AboutBody paragraphs={section.rightParagraphs} />
          </div>
        </div>
      </div>
    </section>
  );
};
