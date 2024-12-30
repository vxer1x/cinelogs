import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Ignores all ESLint errors during builds
  },
  /* other config options here */
};

export default nextConfig;
