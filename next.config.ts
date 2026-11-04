import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The site is fully static and deploys to any static host (GitHub Pages, Caddy, Nginx).
  output: "export",
  trailingSlash: true,
  images: {
    // Static export cannot use the default on-demand image optimizer.
    unoptimized: true,
  },
  poweredByHeader: false,
};

export default nextConfig;
