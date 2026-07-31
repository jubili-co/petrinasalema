import type { Metadata } from "next";
import type { FC } from "react";

import home from "@/lib/data/home.json";
import landing from "@/lib/data/landing.json";

import {
  HomeProjects,
  type HomeProjectBlock,
} from "./components/HomeProjects";
import { LandingHero } from "./components/LandingHero";
import { NewsletterSignup } from "./components/NewsletterSignup";
import { SiteHeader } from "./components/SiteHeader";

export const metadata: Metadata = {
  title: home.seoTitle,
  description: home.seoDescription,
};

const blocks = home.blocks as HomeProjectBlock[];

const HomePage: FC = () => (
  <main data-id="home-page" className="min-h-dvh">
    <SiteHeader variant="home" />
    <HomeProjects blocks={blocks} />
    <LandingHero
      studioImage={landing.studioImage}
      sisterImage={landing.sisterImage}
    />
    <NewsletterSignup image={landing.newsletterImage} />
  </main>
);

export default HomePage;
