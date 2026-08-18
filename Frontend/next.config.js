import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.dirname(fileURLToPath(import.meta.url))

const STATIC_CACHE = 'public, max-age=31536000, immutable'
const ASSET_CACHE = 'public, max-age=31536000, stale-while-revalidate=86400'

const nextConfig = {
  output: 'standalone',
  poweredByHeader: false,
  compress: true,
  turbopack: {
    root,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 2678400,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [32, 48, 64, 96, 128, 256, 384],
    qualities: [70, 75],
    localPatterns: [
      { pathname: '/**' },
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'aviosupportdesk.com',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'www.aviosupportdesk.com',
        pathname: '/uploads/**',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '4000',
        pathname: '/uploads/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '4000',
        pathname: '/uploads/**',
      },
      {
        protocol: 'http',
        hostname: 'api',
        port: '4000',
        pathname: '/uploads/**',
      },
    ],
  },
  async rewrites() {
    // Prefer internal Docker API URL at runtime when present; build-time public URL hairpins.
    const apiOrigin = (
      process.env.API_INTERNAL_URL ||
      process.env.NEXT_PUBLIC_API_URL ||
      'http://127.0.0.1:4000'
    ).replace(/\/$/, '')
    const uploadRewrite = {
      source: '/uploads/:path*',
      destination: `${apiOrigin}/uploads/:path*`,
    }

    if (process.env.NODE_ENV === 'production') {
      return [uploadRewrite]
    }

    return [
      {
        source: '/api/:path*',
        destination: `${apiOrigin}/api/:path*`,
      },
      uploadRewrite,
    ]
  },
  async headers() {
    return [
      {
        source: '/_next/static/:path*',
        headers: [{ key: 'Cache-Control', value: STATIC_CACHE }],
      },
      {
        source: '/:path*.webp',
        headers: [{ key: 'Cache-Control', value: ASSET_CACHE }],
      },
      {
        source: '/:path*.avif',
        headers: [{ key: 'Cache-Control', value: ASSET_CACHE }],
      },
      {
        source: '/:path*.woff2',
        headers: [{ key: 'Cache-Control', value: STATIC_CACHE }],
      },
      {
        source: '/avion-hero-background.png',
        headers: [{ key: 'Cache-Control', value: ASSET_CACHE }],
      },
      {
        source: '/:path*.png',
        headers: [{ key: 'Cache-Control', value: ASSET_CACHE }],
      },
      {
        source: '/:path*.svg',
        headers: [{ key: 'Cache-Control', value: ASSET_CACHE }],
      },
      {
        source: '/:path*.ico',
        headers: [{ key: 'Cache-Control', value: ASSET_CACHE }],
      },
      {
        source: '/partners/:path*',
        headers: [{ key: 'Cache-Control', value: ASSET_CACHE }],
      },
    ]
  },
  async redirects() {
    return [
      {
        source: '/en',
        destination: '/',
        permanent: false,
      },
      {
        source: '/en/:path*',
        destination: '/:path*',
        permanent: false,
      },
    ]
  },
}

export default nextConfig
