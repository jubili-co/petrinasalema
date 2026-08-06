import type { Metadata } from "next";
import type { FC } from "react";

import home from "@/lib/data/home.json";
import landing from "@/lib/data/landing.json";
import { resolveProjectImageSrc } from "@/lib/googleDrive";
import { homeProjectBlocks } from "@/lib/projects";

import { HomeProjects } from "./components/HomeProjects";
import { LandingFeatures } from "./components/LandingFeatures";
import { NewsletterSignup } from "./components/NewsletterSignup";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";

export const metadata: Metadata = {
  title: home.seoTitle,
  description: home.seoDescription,
};

const HomePage: FC = () => (
  <main data-id="home-page" className="min-h-dvh">
    <SiteHeader />
    <HomeProjects blocks={homeProjectBlocks()} />
    <LandingFeatures
      studioImage={resolveProjectImageSrc(landing.studioImage)}
      jubiliImage={resolveProjectImageSrc(landing.jubiliImage)}
    />
    <NewsletterSignup
      image={resolveProjectImageSrc(landing.newsletterImage)}
    />
    <SiteFooter />
  </main>
);

export default HomePage;
