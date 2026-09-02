import type { Metadata } from "next";
import Link from "next/link";
import type { FC } from "react";

import { FadeImage } from "@/app/components/FadeImage";
import { cn } from "@/lib/cn";
import landing from "@/lib/data/landing.json";
import { resolveProjectImageSrc } from "@/lib/googleDrive";
import { placeholderSrc } from "@/lib/placeholderSrc";
import { FIT_CALL_PATH, FIT_CALL_SOFT_LABEL } from "@/lib/site";

import { LogoJubiliWordmark } from "../components/LogoJubiliWordmark";
import { SiteHeader } from "../components/SiteHeader";

export const metadata: Metadata = {
  title: "Jubili | Petrina Salema",
  description:
    "Rooms designed to host and to earn. Furniture, art, hardware and rugs from the Jubili collection.",
};

const JubiliPage: FC = () => {
  const src = resolveProjectImageSrc(landing.jubiliImage);
  const placeholder = placeholderSrc(landing.jubiliImage);

  return (
    <main data-id="jubili-page" className="min-h-dvh bg-accent">
      <SiteHeader />
      <section
        data-id="jubili-hero"
        className="group relative flex min-h-dvh items-center justify-center px-6 pt-[78px]"
      >
        <div
          data-id="jubili-hero-media"
          className="absolute inset-0 opacity-0 transition-opacity duration-1000 ease group-hover:opacity-100"
        >
          <FadeImage
            src={src}
            alt="Jubili collection"
            placeholder={placeholder}
            fill
            priority
            sizes="100vw"
            className="object-cover brightness-[0.72] contrast-[0.82]"
            data-id="jubili-hero-image"
          />
          <div
            data-id="jubili-hero-media-blend"
            className="absolute inset-0 bg-black/35 mix-blend-multiply"
          />
        </div>
        <div
          data-id="jubili-hero-content"
          className="relative z-[1] flex w-full max-w-[720px] flex-col items-center text-center text-white"
        >
          <div data-id="jubili-hero-mark" className="w-full max-w-[280px]">
            <LogoJubiliWordmark />
          </div>
          <p
            data-id="jubili-hero-copy"
            className="mt-10 max-w-[36ch] font-[family-name:var(--font-playfair)] text-[17px] leading-relaxed"
          >
            Rooms designed to host and to earn. Furniture, hardware, rugs and
            artist collaborations from the Jubili collection.
          </p>
          <Link
            href={FIT_CALL_PATH}
            data-id="jubili-hero-cta"
            className={cn(
              "mt-10 min-h-11 border border-white px-8 py-3",
              "font-[family-name:var(--font-matter)] text-[13px] tracking-[0.15em] text-white uppercase",
              "transition-colors duration-200 ease-out",
              "hover:bg-white hover:text-black active:scale-[0.97]",
            )}
          >
            {FIT_CALL_SOFT_LABEL}
          </Link>
        </div>
      </section>
    </main>
  );
};

export default JubiliPage;
