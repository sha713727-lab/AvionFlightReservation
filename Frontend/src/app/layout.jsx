import '@/index.css'
import { AVION_FAVICON_SRC, AVION_LOGO_SRC, BRAND_FULL_NAME } from '@/constants/brand'
import { EMAIL, PHONE_NUMBER, SITE_DESCRIPTION, SITE_URL } from '@/constants/contact'
import { AVION_HERO_BACKGROUND_SRC } from '@/constants/images'
import { DEFAULT_LOCALE } from '@/constants/locales'
import FlightPathEffect from '@/components/effects/FlightPathEffect'

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: `${BRAND_FULL_NAME} — Book Flights by Phone | Canada & USA`,
  description: SITE_DESCRIPTION,
  keywords: [
    'flight reservation',
    'book flights by phone',
    'travel agent',
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
    '@type': 'TravelAgency',
    name: BRAND_FULL_NAME,
    description: 'Independent travel agency for flight and hotel reservations by phone.',
    url: SITE_URL,
    telephone: PHONE_NUMBER,
    email: EMAIL,
    areaServed: ['Canada', 'United States', 'Europe', 'Mexico'],
    priceRange: '$$',
  }

  return (
    <html lang={DEFAULT_LOCALE}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <FlightPathEffect />
        {children}
      </body>
    </html>
  )
}
