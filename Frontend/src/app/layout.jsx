import '@/index.css'
import localFont from 'next/font/local'
import ConditionalAnalytics from '@/components/analytics/ConditionalAnalytics'
import { Ga4Tag } from '@/components/analytics/Ga4Tag'
import { GoogleAdsTag } from '@/components/analytics/GoogleAdsTag'
import {
  GoogleTagManager,
  GoogleTagManagerNoscript,
} from '@/components/analytics/GoogleTagManager'
import ConditionalFlightPathEffect from '@/components/effects/ConditionalFlightPathEffect'
import ConditionalFloatingActions from '@/components/layout/ConditionalFloatingActions'
import ResourceHints from '@/components/performance/ResourceHints'
import { SKIP_TO_CONTENT } from '@/constants/a11y'
import {
  BING_SITE_VERIFICATION,
  GOOGLE_SITE_VERIFICATION,
} from '@/constants/analytics'
import {
  AVION_APPLE_ICON_SRC,
  AVION_FAVICON_192_SRC,
  AVION_FAVICON_48_SRC,
  AVION_FAVICON_SRC,
} from '@/constants/brand'
import { SITE_DESCRIPTION, SITE_URL } from '@/constants/contact'
import { HOME_PATH } from '@/constants/routes'
import { getSeoPageMeta } from '@/constants/seoPageMeta'
import { DEFAULT_LOCALE } from '@/constants/locales'
import { SEO_ROBOTS_INDEX } from '@/utils/seo'
import CallbackRequestProvider from '@/modules/callback/components/CallbackRequestProvider'
import ContactSettingsProvider from '@/modules/contact/components/ContactSettingsProvider'

/** Limited to Regular + Bold; font-display: swap via next/font. */
const outfit = localFont({
  src: [
    { path: '../../public/fonts/Outfit-Regular.woff2', weight: '400', style: 'normal' },
    { path: '../../public/fonts/Outfit-Bold.woff2', weight: '700', style: 'normal' },
  ],
  display: 'swap',
  variable: '--font-outfit',
  preload: true,
  fallback: ['Arial', 'sans-serif'],
  adjustFontFallback: 'Arial',
})

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#f8fafc',
}

const hasGoogleVerification =
  Boolean(GOOGLE_SITE_VERIFICATION) && GOOGLE_SITE_VERIFICATION !== 'REPLACE_WITH_CODE'
const hasBingVerification =
  Boolean(BING_SITE_VERIFICATION) && BING_SITE_VERIFICATION !== 'REPLACE_WITH_CODE'

const siteVerification = {
  ...(hasGoogleVerification ? { google: GOOGLE_SITE_VERIFICATION } : {}),
  ...(hasBingVerification ? { other: { 'msvalidate.01': BING_SITE_VERIFICATION } } : {}),
}

/**
 * Site-wide defaults only. Canonical, Open Graph, and Twitter data belong to
 * each route so error pages never inherit the homepage canonical (audit T12).
 */
export const metadata = {
  title: getSeoPageMeta(HOME_PATH).title,
  description: SITE_DESCRIPTION,
  robots: SEO_ROBOTS_INDEX,
  metadataBase: new URL(SITE_URL),
  icons: {
    icon: [
      { url: AVION_FAVICON_SRC, type: 'image/png', sizes: '32x32' },
      { url: AVION_FAVICON_48_SRC, type: 'image/png', sizes: '48x48' },
      { url: AVION_FAVICON_192_SRC, type: 'image/png', sizes: '192x192' },
    ],
    shortcut: AVION_FAVICON_48_SRC,
    apple: AVION_APPLE_ICON_SRC,
  },
  ...(Object.keys(siteVerification).length > 0 ? { verification: siteVerification } : {}),
}

const loadGa4InHead = process.env.NODE_ENV === 'production'

export default function RootLayout({ children }) {
  return (
    <html
      lang={DEFAULT_LOCALE}
      data-scroll-behavior="smooth"
      className={`${outfit.variable} ${outfit.className}`}
    >
      <head>
        {/* GA4 before other scripts — ID from constants/analytics.js */}
        {loadGa4InHead ? <Ga4Tag /> : null}
        <ResourceHints />
      </head>
      <body>
        <a href="#main-content" className="skip-link">
          {SKIP_TO_CONTENT}
        </a>
        <ConditionalFlightPathEffect />
        <ContactSettingsProvider>
          <CallbackRequestProvider>{children}</CallbackRequestProvider>
        </ContactSettingsProvider>
        <ConditionalFloatingActions />
        {/* Third-party tags at end of body; async/lazyOnload via next/script */}
        <ConditionalAnalytics includeAdmin>
          <GoogleTagManagerNoscript />
          <GoogleTagManager />
        </ConditionalAnalytics>
        <ConditionalAnalytics>
          <GoogleAdsTag />
        </ConditionalAnalytics>
      </body>
    </html>
  )
}
