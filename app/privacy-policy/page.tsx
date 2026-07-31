import type { Metadata } from "next";
import type { FC } from "react";

import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";

export const metadata: Metadata = {
  title: "Privacy Policy | Studio Ashby",
  description: "Privacy policy for Studio Ashby.",
};

const PrivacyPolicyPage: FC = () => (
  <main data-id="privacy-page" className="min-h-dvh bg-cream">
    <SiteHeader />
    <article
      data-id="privacy-content"
      className="mx-auto max-w-[640px] px-6 pt-32 pb-20 md:px-12"
    >
      <h1
        data-id="privacy-title"
        className="mb-8 font-[family-name:var(--font-matter)] text-[13px] tracking-[0.15em] uppercase"
      >
        Privacy Policy
      </h1>
      <div
        data-id="privacy-body"
        className="space-y-5 font-[family-name:var(--font-antiqua)] text-[17px] leading-[1.55]"
      >
        <p>
          This clone is a design recreation for educational and portfolio
          purposes. No personal data is collected, stored, or shared by this
          demonstration site.
        </p>
        <p>
          Cookie preferences chosen in the banner are stored only in your
          browser&apos;s local storage and never transmitted to a server.
        </p>
        <p>
          For the official Studio Ashby privacy policy, please visit{" "}
          <a
            href="https://studioashby.com/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2"
          >
            studioashby.com/privacy-policy
          </a>
          .
        </p>
      </div>
    </article>
    <SiteFooter />
  </main>
);

export default PrivacyPolicyPage;
