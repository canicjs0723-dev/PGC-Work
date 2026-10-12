import type { NextConfig } from "next";

// GITHUB_PAGES=1 builds a static export for GitHub Pages, served under /<repo-name>.
const pages = process.env.GITHUB_PAGES === "1";
const repositoryName = process.env.GITHUB_REPOSITORY?.split("/").at(-1) || "rk_pgc";
const basePath = pages ? process.env.PAGES_BASE_PATH ?? `/${repositoryName}` : "";

const nextConfig: NextConfig = {
  turbopack: { root: process.cwd() },
  ...(pages
    ? {
        output: "export" as const,
        basePath,
        trailingSlash: true,
        env: { NEXT_PUBLIC_BASE_PATH: basePath, NEXT_PUBLIC_STATIC_EXPORT: "1" },
        images: { loader: "custom" as const, loaderFile: "./src/lib/image-loader.ts" },
      }
    : {}),
};

export default nextConfig;
