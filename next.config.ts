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
  async redirects() {
    return [
      {
        source: "/mathematics",
        destination: "/nerd-corner",
        permanent: true,
      },
      {
        source: "/mathematics/:slug",
        destination: "/nerd-corner/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
