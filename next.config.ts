import type { NextConfig } from "next";

/**
 * Static export: `npm run build` writes plain HTML/CSS/JS to `out/`,
 * which Cloudflare Pages (or any static host) serves as-is.
 */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;
