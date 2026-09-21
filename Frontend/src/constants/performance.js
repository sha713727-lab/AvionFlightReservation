/** Third-party origins used for dns-prefetch / preconnect (Core Web Vitals). */
export const PRECONNECT_ORIGINS = [
  { href: 'https://www.googletagmanager.com', crossOrigin: true },
  { href: 'https://www.google-analytics.com', crossOrigin: true },
  { href: 'https://www.googleadservices.com', crossOrigin: true },
  { href: 'https://googleads.g.doubleclick.net', crossOrigin: true },
]

/** Only origins this site actually requests — hints must match the tag inventory. */
export const DNS_PREFETCH_ORIGINS = [
  'https://www.googletagmanager.com',
  'https://www.google-analytics.com',
  'https://www.googleadservices.com',
  'https://googleads.g.doubleclick.net',
  'https://www.google.com',
  'https://images.unsplash.com',
]
