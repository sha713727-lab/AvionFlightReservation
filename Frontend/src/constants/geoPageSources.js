import { GEO_SOURCE_URLS } from '@/constants/geo'
import {
  OFFICIAL_AVION_TERMS_URL,
  OFFICIAL_AVION_TRAVEL_URL,
} from '@/constants/disclosures'

/** Sources / references for guide articles. */
export const GUIDE_SOURCES_BY_SLUG = {
  'flight-booking': [
    { label: 'U.S. DOT — Fly Rights', href: GEO_SOURCE_URLS.DOT_FLY_RIGHTS },
    { label: 'U.S. DOT — Refunds', href: GEO_SOURCE_URLS.DOT_REFUNDS },
    { label: 'Canadian Transportation Agency — Air travel', href: GEO_SOURCE_URLS.CTA_CANADA_AIR },
  ],
  'flight-changes': [
    { label: 'U.S. DOT — Refunds', href: GEO_SOURCE_URLS.DOT_REFUNDS },
    { label: 'United — Change or cancel', href: GEO_SOURCE_URLS.UNITED_CHANGE },
    { label: 'Delta — Change & cancel', href: GEO_SOURCE_URLS.DELTA_CHANGE },
  ],
  'flight-cancellations': [
    { label: 'U.S. DOT — Refunds', href: GEO_SOURCE_URLS.DOT_REFUNDS },
    { label: 'U.S. DOT — Air travel complaints', href: GEO_SOURCE_URLS.DOT_COMPLAINTS },
    { label: 'Air Canada — Change or cancel', href: GEO_SOURCE_URLS.AIR_CANADA_CHANGE },
  ],
  baggage: [
    { label: 'IATA — Travel & Baggage', href: GEO_SOURCE_URLS.IATA_BAGGAGE },
    { label: 'TSA — What Can I Bring?', href: GEO_SOURCE_URLS.TSA_WHAT_CAN_I_BRING },
    { label: 'Air Canada — Baggage', href: GEO_SOURCE_URLS.AIR_CANADA_BAGS },
  ],
  'points-and-miles': [
    { label: 'U.S. DOT — Fly Rights', href: GEO_SOURCE_URLS.DOT_FLY_RIGHTS },
    { label: 'IATA — Travel & Baggage', href: GEO_SOURCE_URLS.IATA_BAGGAGE },
    { label: 'U.S. DOT — Refunds', href: GEO_SOURCE_URLS.DOT_REFUNDS },
  ],
  'avion-points-flight-booking': [
    { label: 'Avion Rewards — Travel', href: OFFICIAL_AVION_TRAVEL_URL },
    { label: 'Avion Rewards — Terms and conditions', href: OFFICIAL_AVION_TERMS_URL },
  ],
  'avion-points-redemption-chart': [
    { label: 'Avion Rewards — Travel (chart display)', href: OFFICIAL_AVION_TRAVEL_URL },
    { label: 'Avion Rewards — Terms and conditions', href: OFFICIAL_AVION_TERMS_URL },
  ],
  'avion-points-value': [
    { label: 'Avion Rewards — Travel', href: OFFICIAL_AVION_TRAVEL_URL },
    { label: 'Avion Rewards — Terms and conditions', href: OFFICIAL_AVION_TERMS_URL },
  ],
  'avion-transfer-partners': [
    { label: 'Avion Rewards — Terms and conditions', href: OFFICIAL_AVION_TERMS_URL },
    { label: 'Avion Rewards — Travel', href: OFFICIAL_AVION_TRAVEL_URL },
  ],
}

export const ABOUT_PAGE_SOURCES = [
  { label: 'U.S. DOT — Fly Rights', href: GEO_SOURCE_URLS.DOT_FLY_RIGHTS },
  { label: 'U.S. DOT — Refunds', href: GEO_SOURCE_URLS.DOT_REFUNDS },
  { label: 'Canadian Transportation Agency — Air travel', href: GEO_SOURCE_URLS.CTA_CANADA_AIR },
]
