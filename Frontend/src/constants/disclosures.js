import {
  INDEPENDENT_SERVICE_DISCLOSURE_PATH,
  SERVICE_FEES_PATH,
} from '@/constants/routes'

/** Shared independent-service / fee notice for call, inquiry, and CTA surfaces. */
export const INDEPENDENT_SERVICE_DISCLOSURE =
  'Independent paid travel assistance. AvioSupportDesk is not an airline, bank, hotel chain, or loyalty-program operator. Our assistance fee is separate from supplier charges and is quoted before you agree.'

export const INDEPENDENT_SERVICE_DISCLOSURE_SHORT =
  'AvioSupportDesk is an independent travel support and assistance company. We are not affiliated with airlines, hotel brands, banks, or third-party loyalty programs.'

export const DISCLOSURE_FEE_LINK_LABEL = 'See our service fees'
export const DISCLOSURE_IDENTITY_LINK_LABEL = 'Independent service disclosure'

export const DISCLOSURE_LINKS = [
  { label: DISCLOSURE_FEE_LINK_LABEL, href: SERVICE_FEES_PATH },
  {
    label: DISCLOSURE_IDENTITY_LINK_LABEL,
    href: INDEPENDENT_SERVICE_DISCLOSURE_PATH,
  },
]
