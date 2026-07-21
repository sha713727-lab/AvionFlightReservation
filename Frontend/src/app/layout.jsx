import '@/index.css'
import { Outfit } from 'next/font/google'
import AnalyticsScripts from '@/components/analytics/AnalyticsScripts'
import ConditionalAnalytics from '@/components/analytics/ConditionalAnalytics'
import {
  GoogleTagManager,
  GoogleTagManagerNoscript,
} from '@/components/analytics/GoogleTagManager'
import ConditionalFlightPathEffect from '@/components/effects/ConditionalFlightPathEffect'
import { SKIP_TO_CONTENT } from '@/constants/a11y'
import { AVION_FAVICON_SRC, AVION_LOGO_SRC, BRAND_FULL_NAME } from '@/constants/brand'
import {
  CONTACT_EMAILS,
  PHONE_NUMBER,
  SITE_DESCRIPTION,
  SITE_URL,
} from '@/constants/contact'
import { AVION_HERO_BACKGROUND_SRC } from '@/constants/images'
import { DEFAULT_LOCALE } from '@/constants/locales'
import CallbackRequestProvider from '@/modules/callback/components/CallbackRequestProvider'
import ContactSettingsProvider from '@/modules/contact/components/ContactSettingsProvider'

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
})

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: `${BRAND_FULL_NAME} — Book Flights by Phone | Canada & USA`,
  description: SITE_DESCRIPTION,
  keywords: [
    'flight reservation',
    'book flights by phone',
    'travel specialist',
    'hotel booking',
    'points redemption help',
    'Canada flights',
    'USA flights',
    'international flights',
  ],
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: AVION_FAVICON_SRC,
    shortcut: AVION_FAVICON_SRC,
    apple: AVION_LOGO_SRC,
  },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    title: `${BRAND_FULL_NAME} — Book Flights by Phone`,
    description: SITE_DESCRIPTION,
    images: [AVION_HERO_BACKGROUND_SRC],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${BRAND_FULL_NAME} — Book Flights by Phone`,
    description: SITE_DESCRIPTION,
    images: [AVION_HERO_BACKGROUND_SRC],
  },
}

export default function RootLayout({ children }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: BRAND_FULL_NAME,
    description:
      'Independent travel assistance for flight and hotel reservations by phone.',
    url: SITE_URL,
    telephone: PHONE_NUMBER,
    email: CONTACT_EMAILS,
    areaServed: ['Canada', 'United States', 'Europe', 'Mexico'],
    priceRange: '$$',
  }

  return (
    <html
      lang={DEFAULT_LOCALE}
      data-scroll-behavior="smooth"
      className={`${outfit.variable} ${outfit.className}`}
    >
      <body>
        <ConditionalAnalytics>
          <GoogleTagManagerNoscript />
          <GoogleTagManager />
          <AnalyticsScripts />
        </ConditionalAnalytics>
        <a href="#main-content" className="skip-link">
          {SKIP_TO_CONTENT}
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ConditionalFlightPathEffect />
        <ContactSettingsProvider>
          <CallbackRequestProvider>{children}</CallbackRequestProvider>
        </ContactSettingsProvider>
      </body>
    </html>
  )
}
