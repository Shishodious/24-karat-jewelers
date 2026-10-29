import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  // Every route is prerendered, so links prefetch whole pages (which lets product photos morph into the product page).
  partialPrefetching: false,
  images: {
    qualities: [75, 85],
  },
};

export default nextConfig;
