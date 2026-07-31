import type { Metadata } from "next";
import type { FC } from "react";

import home from "@/lib/data/home.json";
import landing from "@/lib/data/landing.json";

import {
  HomeProjects,
  type HomeProjectBlock,
} from "./components/HomeProjects";
import { LandingFeatures } from "./components/LandingFeatures";
import { NewsletterSignup } from "./components/NewsletterSignup";
import { SiteFooter } from "./components/SiteFooter";
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
    <LandingFeatures
      studioImage={landing.studioImage}
      sisterImage={landing.sisterImage}
    />
    <NewsletterSignup image={landing.newsletterImage} />
    <SiteFooter />
  </main>
);

export default HomePage;
