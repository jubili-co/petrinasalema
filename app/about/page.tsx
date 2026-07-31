import type { Metadata } from "next";
import type { FC } from "react";

import about from "@/lib/data/about.json";

import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { AboutTextImage, type TextImageSection } from "./AboutTextImage";
import { AboutTwoText, type TwoTextSection } from "./AboutTwoText";

export const metadata: Metadata = {
  title: about.seoTitle,
  description: about.seoDescription,
};

const AboutPage: FC = () => (
  <main data-id="about-page" className="min-h-dvh bg-cream">
    <SiteHeader variant="home" />
    <div data-id="about-sections">
      {about.sections.map((section, index) => {
        if (section.type === "textImage") {
          return (
            <AboutTextImage
              key={`${section.title}-${index}`}
              section={section as TextImageSection}
              isFirst={index === 0}
            />
          );
        }

        if (section.type === "twoText") {
          return (
            <AboutTwoText
              key={`${section.leftTitle}-${index}`}
              section={section as TwoTextSection}
            />
          );
        }

        return null;
      })}
    </div>
    <SiteFooter />
  </main>
);

export default AboutPage;
