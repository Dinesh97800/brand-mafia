import type { NextConfig } from "next";

// GitHub Pages project sites live at https://<user>.github.io/<repo>/
const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1];
const basePath =
  process.env.NEXT_PUBLIC_BASE_PATH ?? (repoName ? `/${repoName}` : "");

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath || undefined,
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
