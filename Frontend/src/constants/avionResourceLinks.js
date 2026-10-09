import {
  GUIDE_AVION_FLIGHT_BOOKING_PATH,
  GUIDE_AVION_POINTS_VALUE_PATH,
  GUIDE_AVION_REDEMPTION_CHART_PATH,
  GUIDE_AVION_TRANSFER_PARTNERS_PATH,
  TOOL_AVION_POINTS_CALCULATOR_PATH,
} from '@/constants/routes'

/** Avion education + tool destinations surfaced before conversion. */
export const AVION_RESOURCE_LINKS = [
  {
    href: GUIDE_AVION_FLIGHT_BOOKING_PATH,
    title: 'How to book flights with Avion points',
    description:
      'Portal redemptions, eligible fixed-chart awards, and partner transfers explained with official sources.',
  },
  {
    href: GUIDE_AVION_REDEMPTION_CHART_PATH,
    title: 'Avion redemption chart explained',
    description:
      'When chart levels apply, observed point levels and CAD caps, and the cash you may still owe.',
  },
  {
    href: GUIDE_AVION_POINTS_VALUE_PATH,
    title: 'What Avion points are worth',
    description:
      'Worked comparisons for different balances instead of one universal cents-per-point claim.',
  },
  {
    href: GUIDE_AVION_TRANSFER_PARTNERS_PATH,
    title: 'Avion transfer partners explained',
    description:
      'How partner transfers differ from portal redemptions: eligibility, timing, and why transfers cannot be reversed.',
  },
  {
    href: TOOL_AVION_POINTS_CALCULATOR_PATH,
    title: 'Avion points value calculator',
    description:
      'Compare a cash fare with a redemption using your own quotes, before and after assistance fees.',
  },
]
