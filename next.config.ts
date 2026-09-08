import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const agentsTxtHeaders = [
  {
    source: "/agents.txt",
    headers: [
      { key: "Content-Type", value: "text/plain; charset=utf-8" },
      { key: "Access-Control-Allow-Origin", value: "*" },
      { key: "Cache-Control", value: "public, max-age=3600" },
    ],
  },
];

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
        source: "/:path*",
        has: [{ type: "host", value: "petrinasalema.vercel.app" }],
        destination: "https://www.petrinasalema.com/:path*",
        permanent: true,
      },
    ];
  },
  headers() {
    return agentsTxtHeaders;
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
