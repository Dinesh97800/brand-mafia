import type { NextConfig } from "next";

// GitHub Pages project sites live at https://<user>.github.io/<repo>/
// Only apply basePath in production builds (e.g. GitHub Actions), not local dev.
const repoName =
  process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "brand-mafia";
const isProduction = process.env.NODE_ENV === "production";
const basePath =
  process.env.NEXT_PUBLIC_BASE_PATH ??
  (isProduction ? `/${repoName}` : "");

const nextConfig: NextConfig = {
  output: "export",
  ...(basePath ? { basePath, assetPrefix: basePath } : {}),
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
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
