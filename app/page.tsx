import type { Metadata } from "next";
import type { FC } from "react";

import home from "@/lib/data/home.json";
import landing from "@/lib/data/landing.json";
import { resolveProjectImageSrc } from "@/lib/googleDrive";
import { homeWorkBlocks } from "@/lib/work";

import { HomeInvite } from "./components/HomeInvite";
import { HomeProof } from "./components/HomeProof";
import { HomeStatement } from "./components/HomeStatement";
import { HomeWork } from "./components/HomeWork";
import { NewsletterSignup } from "./components/NewsletterSignup";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";

export const metadata: Metadata = {
  title: home.seoTitle,
  description: home.seoDescription,
};

const HomePage: FC = () => {
  const { statement, proof, invite, newsletterDescription } = home;

  return (
    <main data-id="home-page" className="min-h-dvh">
      <SiteHeader />
      <HomeStatement hook={statement.hook} support={statement.support} />
      <HomeWork blocks={homeWorkBlocks()} />
      <HomeProof text={proof.text} attribution={proof.attribution} />
      <HomeInvite hook={invite.hook} body={invite.body} cta={invite.cta} />
      <NewsletterSignup
        image={resolveProjectImageSrc(landing.newsletterImage)}
        description={newsletterDescription}
      />
      <SiteFooter />
    </main>
  );
};

export default HomePage;
