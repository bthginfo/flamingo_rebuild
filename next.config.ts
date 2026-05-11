import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  outputFileTracingRoot: import.meta.dirname,
  /** Avoid automatic 308 from `/path/` → `/path` on smoke tests and deep links with trailing slash. */
  skipTrailingSlashRedirect: true,
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**'
      }
    ]
  }
};

export default nextConfig;
