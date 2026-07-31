import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";

import { cn } from "@/lib/cn";
import landing from "@/lib/data/landing.json";

import { SiteHeader } from "../components/SiteHeader";

export const metadata: Metadata = {
  title: "Sister by Studio Ashby",
  description:
    "Furniture, art, hardware and rugs from Sister by Studio Ashby.",
};

const SisterPage: FC = () => (
  <main data-id="sister-page" className="min-h-dvh bg-sister-mustard">
    <SiteHeader variant="home" />
    <section
      data-id="sister-hero"
      className="group relative flex min-h-dvh items-center justify-center px-6 pt-[78px]"
    >
      <div
        data-id="sister-hero-media"
        className="absolute inset-0 opacity-0 transition-opacity duration-1000 ease group-hover:opacity-100"
      >
        <Image
          src={landing.sisterImage}
          alt="Sister by Studio Ashby"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div
        data-id="sister-hero-content"
        className="relative z-[1] flex w-full max-w-[720px] flex-col items-center text-center"
      >
        <Image
          src="/images/landing-sister.png"
          alt="Sister by Studio Ashby — Furniture & Art"
          width={600}
          height={801}
          priority
          data-id="sister-hero-mark"
          className="h-auto w-full max-w-[480px] object-contain"
        />
        <p
          data-id="sister-hero-copy"
          className="mt-10 max-w-[36ch] font-[family-name:var(--font-antiqua)] text-[17px] leading-relaxed text-sister-blue"
        >
          Furniture, hardware, rugs and artist collaborations from the Sister
          collection.
        </p>
        <Link
          href="https://studioashby.com/sister/"
          target="_blank"
          rel="noopener noreferrer"
          data-id="sister-hero-cta"
          className={cn(
            "mt-10 min-h-11 border border-sister-blue px-8 py-3",
            "font-[family-name:var(--font-matter)] text-[12px] tracking-[0.15em] text-sister-blue uppercase",
            "transition-colors duration-200 ease-out",
            "hover:bg-sister-blue hover:text-cream active:scale-[0.97]",
          )}
        >
          Visit Sister Store
        </Link>
      </div>
    </section>
  </main>
);

export default SisterPage;
