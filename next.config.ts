import type { NextConfig } from "next";

const isStaticExport =
  process.env.STATIC_EXPORT === "true" || process.env.GITHUB_ACTIONS === "true";

// brandmafia.co is a custom domain at the site root. Do not default to
// /brand-mafia — that breaks /_next chunk URLs on production.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  ...(isStaticExport
    ? { output: "export" as const, trailingSlash: true }
    : {}),
  ...(basePath ? { basePath, assetPrefix: basePath } : {}),
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  async redirects() {
    return [
      {
        source: "/services/web-dev",
        destination: "/services/web-development",
        permanent: true,
      },
    ];
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
    ],
  },
};

export default nextConfig;
