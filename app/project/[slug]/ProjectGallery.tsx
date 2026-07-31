import Image from "next/image";
import type { FC } from "react";

import { cn } from "@/lib/cn";
import type { ProjectsImage } from "@/lib/projects";

type Props = {
  name: string;
  images: ProjectsImage[];
};

export const ProjectGallery: FC<Props> = ({ name, images }) => {
  if (images.length === 0) {
    return (
      <section
        data-id="project-gallery"
        className="flex min-h-[50dvh] items-end bg-cream px-6 pt-[100px] pb-9 md:px-12 md:pt-[120px]"
      >
        <h1
          data-id="project-gallery-title"
          className={cn(
            "m-0 font-[family-name:var(--font-matter)]",
            "text-[13px] leading-[18px] tracking-[0.15em] text-brown uppercase",
          )}
        >
          {name}
        </h1>
      </section>
    );
  }

  return (
    <section data-id="project-gallery" className="w-full bg-cream">
      {images.map((image) => (
        <figure
          key={`${image.src}-${image.alt}`}
          data-id="project-gallery-figure"
          className="relative m-0 w-full"
        >
          <div
            data-id="project-gallery-frame"
            className="relative aspect-[1440/1860] w-full md:aspect-[21/9]"
          >
            <Image
              src={image.src}
              alt={image.alt || name}
              fill
              sizes="100vw"
              data-id="project-gallery-image"
              className="object-cover"
            />
          </div>
          {image.caption && (
            <figcaption
              data-id="project-gallery-caption"
              className={cn(
                "px-6 py-3 font-[family-name:var(--font-antiqua)]",
                "text-[13px] leading-[18px] font-[350] text-brown md:px-12",
              )}
            >
              {image.caption}
            </figcaption>
          )}
        </figure>
      ))}
    </section>
  );
};
