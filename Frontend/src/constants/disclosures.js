import {
  INDEPENDENT_SERVICE_DISCLOSURE_PATH,
  SERVICE_FEES_PATH,
} from '@/constants/routes'

/** Shared independent-service / fee notice for call, inquiry, and CTA surfaces. */
export const INDEPENDENT_SERVICE_DISCLOSURE =
  'Independent paid travel assistance. AvioSupportDesk is not affiliated with RBC, Avion Rewards, or any airline. Our assistance fee is separate from supplier charges and is quoted before you agree.'

export const INDEPENDENT_SERVICE_DISCLOSURE_SHORT =
  'We are an independent travel assistance service, not affiliated with RBC, Avion Rewards, or any airline.'

export const DISCLOSURE_FEE_LINK_LABEL = 'See our service fees'
export const DISCLOSURE_IDENTITY_LINK_LABEL = 'Independent service disclosure'

export const DISCLOSURE_LINKS = [
  { label: DISCLOSURE_FEE_LINK_LABEL, href: SERVICE_FEES_PATH },
  {
    label: DISCLOSURE_IDENTITY_LINK_LABEL,
    href: INDEPENDENT_SERVICE_DISCLOSURE_PATH,
  },
]

/** Official self-service option — labeled outbound, not our service. */
export const OFFICIAL_AVION_TRAVEL_URL = 'https://www.avionrewards.com/travel/'
export const OFFICIAL_AVION_TERMS_URL =
  'https://www.avionrewards.com/terms-and-conditions/index.html'
export const OFFICIAL_AVION_TRAVEL_LABEL =
  'Prefer to book directly? Visit the official Avion Rewards travel website.'

/** Official Avion Rewards Travel phone — never present as AvioSupportDesk. */
export const OFFICIAL_AVION_TRAVEL_PHONE = '1-877-636-2870'
export const OFFICIAL_AVION_TRAVEL_PHONE_HREF = 'tel:+18776362870'
export const OFFICIAL_AVION_TRAVEL_PHONE_LABEL =
  'Official Avion Rewards Travel (not AvioSupportDesk)'
export const OFFICIAL_VS_US_NOTE =
  'Avion Rewards (avionrewards.com) is the official program. AvioSupportDesk is an independent paid assistance service and does not provide official account access, login help, or program decisions.'
