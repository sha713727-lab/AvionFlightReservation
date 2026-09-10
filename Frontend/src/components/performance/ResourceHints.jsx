import {
  DNS_PREFETCH_ORIGINS,
  PRECONNECT_ORIGINS,
  PRELOAD_FONTS,
} from '@/constants/performance'

/**
 * Early connection + font hints for LCP/FCP.
 * Rendered in <head> from the root layout.
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
      {PRELOAD_FONTS.map((font) => (
        <link
          key={font.href}
          rel="preload"
          href={font.href}
          as="font"
          type={font.type}
          crossOrigin="anonymous"
        />
      ))}
    </>
  )
}
