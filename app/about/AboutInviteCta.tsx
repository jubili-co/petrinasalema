import Link from "next/link";
import type { FC } from "react";

import { cn } from "@/lib/cn";

export type AboutInviteCta = {
  name: string;
  role: string;
  href: string;
};

type Props = {
  cta: AboutInviteCta;
};

export const AboutInviteCtaLink: FC<Props> = ({ cta }) => {
  const { name, role, href } = cta;
  const isExternal = href.startsWith("http");
  const target = isExternal ? "_blank" : undefined;
  const rel = isExternal ? "noopener noreferrer" : undefined;

  return (
    <div
      data-id="about-invite-cta"
      className="mt-10 border-t border-dotto-cream/25 pt-8"
    >
      <Link
        href={href}
        target={target}
        rel={rel}
        data-id="about-invite-cta-link"
        className="group/cta inline-block transition-opacity duration-200 ease-out hover:opacity-70"
      >
        <InviteLine name={name} role={role} />
      </Link>
    </div>
  );
};

type InviteLineProps = {
  name: string;
  role: string;
};

const InviteLine: FC<InviteLineProps> = ({ name, role }) => (
  <>
    <span
      data-id="about-invite-cta-name"
      className={cn(
        "font-[family-name:var(--font-matter)]",
        "text-[13px] leading-[18px] tracking-[0.15em] uppercase",
      )}
    >
      {name}
    </span>
    <span
      data-id="about-invite-cta-sep"
      className={cn(
        "font-[family-name:var(--font-matter)]",
        "text-[13px] leading-[18px] tracking-[0.15em]",
      )}
    >
      ,{" "}
    </span>
    <span
      data-id="about-invite-cta-role"
      className={cn(
        "font-[family-name:var(--font-playfair)]",
        "text-[13px] leading-[18px] font-[350] tracking-normal normal-case",
        "underline decoration-dotto-cream/50 underline-offset-4",
        "transition-colors duration-200 group-hover/cta:decoration-dotto-cream",
      )}
    >
      {role}
    </span>
    <span
      data-id="about-invite-cta-arrow"
      aria-hidden
      className="ml-[0.35em] inline-block transition-transform duration-200 ease-out group-hover/cta:translate-x-0.5"
    >
      →
    </span>
  </>
);
