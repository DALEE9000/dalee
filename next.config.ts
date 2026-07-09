import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.hardcover.app",
      },
    ],
  },
  // A stray lockfile in the home directory makes Next guess the wrong
  // workspace root without this
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
