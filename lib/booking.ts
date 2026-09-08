import { withCalUtm } from "@/lib/site";

export type TrackedCta = {
  href: string;
};

export function withTrackedCtas<
  T extends { primaryCta: TrackedCta; secondaryCta: TrackedCta },
>(content: T): T {
  const { primaryCta, secondaryCta } = content;
  return {
    ...content,
    primaryCta: { ...primaryCta, href: withCalUtm(primaryCta.href) },
    secondaryCta: { ...secondaryCta, href: withCalUtm(secondaryCta.href) },
  };
}
