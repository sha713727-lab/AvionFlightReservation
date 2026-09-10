import { GEO_SOURCE_URLS } from '@/constants/geo'

/** Sources / references keyed by blog post slug. */
export const BLOG_SOURCES_BY_SLUG = {
  'how-to-cancel-a-flight-and-get-a-full-refund-in-2026': [
    { label: 'U.S. DOT — Refunds', href: GEO_SOURCE_URLS.DOT_REFUNDS },
    { label: 'U.S. DOT — Fly Rights', href: GEO_SOURCE_URLS.DOT_FLY_RIGHTS },
    { label: 'U.S. DOT — Air travel complaints', href: GEO_SOURCE_URLS.DOT_COMPLAINTS },
  ],
  'how-to-change-your-flight-booking-step-by-step': [
    { label: 'U.S. DOT — Refunds', href: GEO_SOURCE_URLS.DOT_REFUNDS },
    { label: 'United — Change or cancel', href: GEO_SOURCE_URLS.UNITED_CHANGE },
    { label: 'American Airlines — Change/cancel', href: GEO_SOURCE_URLS.AMERICAN_CHANGE },
  ],
  'flight-delay-compensation-passenger-rights': [
    { label: 'U.S. DOT — Fly Rights', href: GEO_SOURCE_URLS.DOT_FLY_RIGHTS },
    { label: 'U.S. DOT — Refunds', href: GEO_SOURCE_URLS.DOT_REFUNDS },
    { label: 'Canadian Transportation Agency — Air travel', href: GEO_SOURCE_URLS.CTA_CANADA_AIR },
  ],
  'airlines-customer-service-numbers-complete-contact-guide': [
    { label: 'U.S. DOT — Air travel complaints', href: GEO_SOURCE_URLS.DOT_COMPLAINTS },
    { label: 'U.S. DOT — Fly Rights', href: GEO_SOURCE_URLS.DOT_FLY_RIGHTS },
    { label: 'Delta — Change & cancel', href: GEO_SOURCE_URLS.DELTA_CHANGE },
  ],
  'top-10-tips-to-save-money-on-flight-bookings': [
    { label: 'U.S. DOT — Fly Rights', href: GEO_SOURCE_URLS.DOT_FLY_RIGHTS },
    { label: 'IATA — Travel & Baggage', href: GEO_SOURCE_URLS.IATA_BAGGAGE },
    { label: 'TSA — What Can I Bring?', href: GEO_SOURCE_URLS.TSA_WHAT_CAN_I_BRING },
  ],
}
