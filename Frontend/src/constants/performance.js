/** Third-party origins used for dns-prefetch / preconnect (Core Web Vitals). */
export const PRECONNECT_ORIGINS = [
  { href: 'https://www.googletagmanager.com', crossOrigin: true },
  { href: 'https://www.google-analytics.com', crossOrigin: true },
  { href: 'https://www.googleadservices.com', crossOrigin: true },
  { href: 'https://googleads.g.doubleclick.net', crossOrigin: true },
]

export const DNS_PREFETCH_ORIGINS = [
  'https://www.googletagmanager.com',
  'https://www.google-analytics.com',
  'https://www.googleadservices.com',
  'https://googleads.g.doubleclick.net',
  'https://www.google.com',
  'https://images.unsplash.com',
  'https://www.clarity.ms',
  'https://scripts.clarity.ms',
  'https://js.callrail.com',
  'https://cdn.callrail.com',
]

/** Local font files preloaded alongside next/font (display: swap). */
export const PRELOAD_FONTS = [
  { href: '/fonts/Outfit-Regular.woff2', type: 'font/woff2' },
  { href: '/fonts/Outfit-Bold.woff2', type: 'font/woff2' },
]
