import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";

import { cn } from "@/lib/cn";

type Props = {
  studioImage: string;
  sisterImage: string;
};

export const LandingHero: FC<Props> = ({ studioImage, sisterImage }) => (
  <section
    id="landing"
    data-id="landing-hero"
    className="relative h-[100dvh] w-full overflow-hidden"
  >
    <div
      data-id="landing-hero-inner"
      className="flex h-full w-full flex-col md:flex-row"
    >
      <Link
        href="/"
        data-id="landing-hero-studio"
        className={cn(
          "group relative block h-1/2 w-full overflow-hidden bg-brown",
          "md:h-full md:w-1/2",
        )}
      >
        <div
          data-id="landing-hero-studio-inner"
          className="relative z-[2] flex h-full items-center justify-center px-[18px] py-[18px] md:px-[82px] md:py-[8%]"
        >
          <Image
            src="/images/landing-studio.svg"
            alt="Studio Ashby"
            width={560}
            height={791}
            priority
            className="h-auto max-h-[70%] w-full max-w-[420px] object-contain md:max-h-none md:max-w-[560px]"
          />
        </div>
        <div
          data-id="landing-hero-studio-image"
          className={cn(
            "absolute inset-0 z-[1] opacity-0 transition-opacity duration-1000 ease",
            "group-hover:opacity-100",
          )}
        >
          <Image
            src={studioImage}
            alt="Studio Ashby interior"
            fill
            priority
            sizes="50vw"
            className="object-cover"
          />
        </div>
      </Link>

      <Link
        href="/sister"
        data-id="landing-hero-sister"
        className={cn(
          "group relative block h-1/2 w-full overflow-hidden bg-sister-mustard",
          "md:h-full md:w-1/2",
        )}
      >
        <div
          data-id="landing-hero-sister-inner"
          className="relative z-[2] flex h-full items-center justify-center px-[18px] py-[18px] md:px-[54px] md:py-[10%]"
        >
          <Image
            src="/images/landing-sister.svg"
            alt="Sister by Studio Ashby — Furniture & Art"
            width={600}
            height={801}
            priority
            className="h-auto max-h-[70%] w-full max-w-[420px] object-contain md:max-h-none md:max-w-[600px]"
          />
        </div>
        <div
          data-id="landing-hero-sister-image"
          className={cn(
            "absolute inset-0 z-[1] opacity-0 transition-opacity duration-1000 ease",
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
