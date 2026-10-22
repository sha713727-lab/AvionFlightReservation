/** Single preconnect — frees 3G connection slots for LCP (hero + fonts). */
export const PRECONNECT_ORIGINS = [
  { href: 'https://www.googletagmanager.com', crossOrigin: true },
]

/** dns-prefetch for secondary analytics/ad/media hosts (cheaper than preconnect). */
export const DNS_PREFETCH_ORIGINS = [
  'https://www.google-analytics.com',
  'https://www.googleadservices.com',
  'https://googleads.g.doubleclick.net',
  'https://www.google.com',
  'https://images.unsplash.com',
]
