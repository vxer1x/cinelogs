import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Ignores all ESLint errors during builds
  },
  // Other Next.js configurations
};

// Export the Next.js config along with sitemap configuration
module.exports = {
  ...nextConfig,
  siteUrl: 'https://vxer.info', // Your site URL
  generateRobotsTxt: true, // Optionally generate robots.txt
  // You can add other options like changefreq, priority, etc.
};
