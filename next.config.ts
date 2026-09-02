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
    ];
  },
  headers() {
    return agentsTxtHeaders;
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
