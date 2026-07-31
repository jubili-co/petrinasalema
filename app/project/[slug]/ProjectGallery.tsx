import Image from "next/image";
import type { FC } from "react";

import { cn } from "@/lib/cn";
import type { ProjectGalleryBlock } from "@/lib/projects";

type Props = {
  title: string;
  gallery: ProjectGalleryBlock[];
};

export const ProjectGallery: FC<Props> = ({ title, gallery }) => {
  const blocks = gallery.filter(isCompleteGalleryBlock);

  return (
    <div data-id="project-gallery" className="w-full">
      {blocks.map((block, index) => {
        const isHero = index === 0;

        if (block.type === "landscape") {
          return (
            <section
              key={`${block.image}-${index}`}
              data-id="project-gallery-landscape"
              className="relative mb-[2px] h-[100dvh] w-full overflow-hidden last:mb-0"
            >
              <Image
                src={block.image}
                alt={block.alt}
                fill
                priority={isHero}
                sizes="100vw"
                className="object-cover"
              />
              <div
                data-id="project-gallery-overlay"
                className="absolute inset-0 bg-black/20"
              />
              {isHero && (
                <div
                  data-id="project-gallery-hero-title"
                  className={cn(
                    "absolute top-1/2 left-1/2 z-[1] -translate-x-1/2 -translate-y-1/2",
                    "px-6 text-center",
                  )}
                >
                  <h1
                    className={cn(
                      "m-0 font-[family-name:var(--font-matter)]",
                      "text-[13px] leading-[18px] tracking-[0.15em] text-cream uppercase",
                    )}
                  >
                    {title}
                  </h1>
                </div>
              )}
            </section>
          );
        }

        return (
          <section
            key={`${block.image1}-${block.image2}-${index}`}
            data-id="project-gallery-portrait"
            className={cn(
              "mb-[2px] flex w-full flex-col overflow-hidden last:mb-0",
              "md:flex-row",
            )}
          >
            <div
              data-id="project-gallery-portrait-item"
              className="relative aspect-[1275/1646] w-full md:mr-px md:w-1/2 md:aspect-auto md:h-[min(100dvh,929px)]"
            >
              <Image
                src={block.image1}
                alt={block.alt1}
                fill
                sizes="50vw"
                className="object-cover"
              />
            </div>
            <div
              data-id="project-gallery-portrait-item"
              className="relative aspect-[1275/1646] w-full md:ml-px md:w-1/2 md:aspect-auto md:h-[min(100dvh,929px)]"
            >
              <Image
                src={block.image2}
                alt={block.alt2}
                fill
                sizes="50vw"
                className="object-cover"
              />
            </div>
          </section>
        );
      })}
    </div>
  );
};

function isCompleteGalleryBlock(block: ProjectGalleryBlock): boolean {
  if (block.type === "landscape") {
    return Boolean(block.image);
  }

  return Boolean(block.image1) && Boolean(block.image2);
}
