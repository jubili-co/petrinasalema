import createMDX from "@next/mdx";
import type { NextConfig } from "next";

/** Leftover Squarespace Work gallery slugs. Those projects are not on this site. */
const SQUARESPACE_WORK_SLUGS = [
  "emergentdwelling",
  "gullbergsvass",
  "hospitality",
  "learningcentre",
  "masakiapartment",
  "seniorhousing",
  "sikikacentre",
  "work-avenue",
] as const;

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  skipTrailingSlashRedirect: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/d/**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/ingest/static/:path*",
        destination: "https://eu-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/ingest/:path*",
        destination: "https://eu.i.posthog.com/:path*",
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/contact",
        destination: "/book",
        permanent: true,
      },
      {
        source: "/projects",
        destination: "/work",
        permanent: true,
      },
      {
        source: "/project/:slug",
        destination: "/work/:slug",
        permanent: true,
      },
      {
        source: "/materiality",
        destination: "https://jubili.co",
        permanent: false,
      },
      {
        source: "/skillsset/:path*",
        destination: "/about",
        permanent: true,
      },
      ...SQUARESPACE_WORK_SLUGS.map((slug) => ({
        source: `/${slug}/:path*`,
        destination: "/work",
        permanent: true,
      })),
      {
        source: "/:path*",
        has: [{ type: "host", value: "petrinasalema.vercel.app" }],
        destination: "https://www.petrinasalema.com/:path*",
        permanent: true,
      },
    ];
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);

