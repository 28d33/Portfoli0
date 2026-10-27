import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Keep the same routing as the original static site. */
  trailingSlash: true,
  reactStrictMode: true,
};

export default nextConfig;
