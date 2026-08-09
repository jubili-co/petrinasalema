import type { Metadata } from "next";
import type { FC } from "react";

import home from "@/lib/data/home.json";
import { homeWorkBlocks } from "@/lib/work";

import { HomeInvite } from "./components/HomeInvite";
import { HomeProof } from "./components/HomeProof";
import { HomeStatement } from "./components/HomeStatement";
import { HomeWork } from "./components/HomeWork";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";

export const metadata: Metadata = {
  title: home.seoTitle,
  description: home.seoDescription,
};

const HomePage: FC = () => {
  const { statement, proof, invite } = home;
  const { lede, results, href, linkLabel } = proof;

  return (
    <main data-id="home-page" className="min-h-dvh">
      <SiteHeader />
      <HomeStatement hook={statement.hook} support={statement.support} />
      <HomeWork blocks={homeWorkBlocks()} />
      <HomeProof
        lede={lede}
        results={results}
        href={href}
        linkLabel={linkLabel}
      />
      <HomeInvite hook={invite.hook} body={invite.body} cta={invite.cta} />
      <SiteFooter />
    </main>
  );
};

export default HomePage;
