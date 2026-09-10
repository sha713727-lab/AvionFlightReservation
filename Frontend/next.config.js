import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.dirname(fileURLToPath(import.meta.url))

const STATIC_CACHE = 'public, max-age=31536000, immutable'
const ASSET_CACHE = 'public, max-age=31536000, stale-while-revalidate=86400'

const SECURITY_HEADERS = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin-allow-popups' },
  {
    key: 'Permissions-Policy',
    value:
      'camera=(), microphone=(), geolocation=(), payment=(), usb=(), midi=(), bluetooth=(), interest-cohort=()',
  },
  {
    key: 'Content-Security-Policy',
    value:
      "default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'self'; form-action 'self'; upgrade-insecure-requests; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://www.googleadservices.com https://googleads.g.doubleclick.net https://www.google.com https://www.clarity.ms https://scripts.clarity.ms https://*.clarity.ms https://js.callrail.com https://cdn.callrail.com https://*.callrail.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https:; font-src 'self'; connect-src 'self' https://www.googletagmanager.com https://www.google-analytics.com https://analytics.google.com https://*.google-analytics.com https://*.analytics.google.com https://www.google.com https://www.google.ca https://www.google.com.mx https://www.google.com.pk https://*.google.com https://www.googleadservices.com https://googleads.g.doubleclick.net https://stats.g.doubleclick.net https://*.g.doubleclick.net https://www.clarity.ms https://*.clarity.ms https://c.bing.com https://js.callrail.com https://api.callrail.com https://cdn.callrail.com https://*.callrail.com; frame-src 'self' https://www.googletagmanager.com; media-src 'self'; worker-src 'self' blob:;",
  },
]

const nextConfig = {
  output: 'standalone',
  poweredByHeader: false,
  compress: true,
  turbopack: {
    root,
  },
  experimental: {
    optimizePackageImports: ['react-icons', 'framer-motion', 'recharts'],
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
    const ogImageRewrite = {
      source: '/og-image.jpg',
      destination: '/avion-hero-background.png',
    }

    if (process.env.NODE_ENV === 'production') {
      return [uploadRewrite, ogImageRewrite]
    }

    return [
      {
        source: '/api/:path*',
        destination: `${apiOrigin}/api/:path*`,
      },
      uploadRewrite,
      ogImageRewrite,
    ]
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: SECURITY_HEADERS,
      },
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
    source: '/fonts/:path*',
    headers: [{ key: 'Cache-Control', value: STATIC_CACHE }],
  },
  {
    source: '/avion-hero-background.webp',
    headers: [
      { key: 'Cache-Control', value: ASSET_CACHE },
    ],
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
        source: '/:path*',
        has: [{ type: 'host', value: 'www.aviosupportdesk.com' }],
        destination: 'https://aviosupportdesk.com/:path*',
        permanent: true,
      },
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
      {
        source: '/internationalFlight',
        destination: '/international-flights',
        permanent: true,
      },
      {
        source: '/internationalFlight/:path*',
        destination: '/international-flights',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
