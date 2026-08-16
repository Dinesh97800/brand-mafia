import type { NextConfig } from "next";

const repoName =
  process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "brand-mafia";

const isStaticExport =
  process.env.STATIC_EXPORT === "true" || process.env.GITHUB_ACTIONS === "true";

const basePath =
  process.env.NEXT_PUBLIC_BASE_PATH ??
  (isStaticExport ? `/${repoName}` : "");

const nextConfig: NextConfig = {
  ...(isStaticExport ? { output: "export" as const } : {}),
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
