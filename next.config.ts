import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  outputFileTracingRoot: import.meta.dirname,
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
