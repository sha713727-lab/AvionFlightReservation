import { DNS_PREFETCH_ORIGINS, PRECONNECT_ORIGINS } from '@/constants/performance'

/**
 * Early connection hints for LCP/FCP, rendered in <head> from the root layout.
 * Fonts are preloaded by next/font from /_next/static/media — never duplicate them.
 */
export default function ResourceHints() {
  return (
    <>
      {PRECONNECT_ORIGINS.map((origin) => (
        <link
          key={`preconnect-${origin.href}`}
          rel="preconnect"
          href={origin.href}
          crossOrigin={origin.crossOrigin ? 'anonymous' : undefined}
        />
      ))}
      {DNS_PREFETCH_ORIGINS.map((href) => (
        <link key={`dns-${href}`} rel="dns-prefetch" href={href} />
      ))}
    </>
  )
}
