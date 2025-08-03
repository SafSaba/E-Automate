
import type { NextConfig } from 'next';

const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' *.googletagmanager.com *.google.com *.google-analytics.com;
  child-src 'self' *.google.com;
  style-src 'self' 'unsafe-inline' *.googleapis.com;
  img-src 'self' data: *.google-analytics.com *.googletagmanager.com *.google.com *.gstatic.com placehold.co images.unsplash.com storage.googleapis.com safwansaba.dev;
  font-src 'self' *.gstatic.com;
  connect-src 'self' *.google-analytics.com *.googletagmanager.com *.google.com *.firebaseio.com *.googleapis.com;
  frame-src 'self' *.google.com;
`;

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
      },
      {
        protocol: 'https',
        hostname: 'safwansaba.dev',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim(),
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
           {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
