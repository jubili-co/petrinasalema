import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";

import { cn } from "@/lib/cn";

type Props = {
  studioImage: string;
  sisterImage: string;
};

export const LandingFeatures: FC<Props> = ({ studioImage, sisterImage }) => (
  <section
    id="landing"
    data-id="landing-features"
    className="relative h-[100dvh] w-full overflow-hidden"
  >
    <div
      data-id="landing-features-inner"
      className="flex h-full w-full flex-col md:flex-row"
    >
      <Link
        href="/"
        data-id="landing-features-studio"
        className={cn(
          "group relative block h-1/2 w-full overflow-hidden bg-dotto-brown",
          "md:h-full md:w-1/2",
        )}
      >
        <div
          data-id="landing-features-studio-inner"
          className={cn(
            "relative z-[2] flex h-full items-center justify-center",
            "p-[18px] md:px-[82px] md:py-[8.3%]",
          )}
        >
          <span
            data-id="landing-features-studio-mark"
            className={cn(
              "font-[family-name:var(--font-beaux)] text-dotto-cream uppercase",
              "text-[clamp(56px,9vw,140px)] leading-none tracking-[0.12em]",
              "transition-colors duration-200",
              "group-hover:text-white",
            )}
          >
            Jubili
          </span>
        </div>
        <div
          data-id="landing-features-studio-image"
          className={cn(
            "absolute inset-0 z-[1] opacity-0",
            "group-hover:opacity-100",
          )}
        >
          <Image
            src={studioImage}
            alt="Dotto interior"
            fill
            sizes="50vw"
            className="object-cover"
          />
        </div>
      </Link>

      <Link
        href="/sister"
        data-id="landing-features-sister"
        className={cn(
          "group relative block h-1/2 w-full overflow-hidden bg-dotto-mustard",
          "md:h-full md:w-1/2",
        )}
      >
        <div
          data-id="landing-features-sister-inner"
          className={cn(
            "relative z-[2] flex h-full items-center justify-center",
            "p-[18px] md:px-[54px] md:py-[10%]",
          )}
        >
          <Image
            src="/images/landing-sister.png"
            alt="Sister by Dotto — Furniture & Art"
            width={600}
            height={801}
            data-id="landing-features-sister-mark"
            className={cn(
              "h-[38.5dvh] w-full object-contain",
              "md:h-[85.1dvh] md:max-h-[1228px]",
              "group-hover:brightness-0 group-hover:invert",
            )}
          />
        </div>
        <div
          data-id="landing-features-sister-image"
          className={cn(
            "absolute inset-0 z-[1] opacity-0",
            "group-hover:opacity-100",
          )}
        >
          <Image
            src={sisterImage}
            alt="Sister store"
            fill
            sizes="50vw"
            className="object-cover"
          />
        </div>
      </Link>
    </div>
  </section>
);
