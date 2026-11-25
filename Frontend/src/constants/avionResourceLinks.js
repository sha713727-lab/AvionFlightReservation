import {
  GUIDE_AVION_FLIGHT_BOOKING_PATH,
  GUIDE_AVION_POINTS_VALUE_PATH,
  GUIDE_AVION_REDEMPTION_CHART_PATH,
  GUIDE_AVION_TRANSFER_PARTNERS_PATH,
  TOOL_AVION_POINTS_CALCULATOR_PATH,
} from '@/constants/routes'

/** Points education + tool destinations surfaced before conversion. */
export const AVION_RESOURCE_LINKS = [
  {
    href: GUIDE_AVION_FLIGHT_BOOKING_PATH,
    title: 'How to book flights with points and miles',
    description:
      'Portal redemptions, chart awards, and partner transfers explained with official sources.',
  },
  {
    href: GUIDE_AVION_REDEMPTION_CHART_PATH,
    title: 'Points redemption chart explained',
    description:
      'When chart levels apply, observed point levels and cash caps, and the cash you may still owe.',
  },
  {
    href: GUIDE_AVION_POINTS_VALUE_PATH,
    title: 'What reward points are worth',
    description:
      'Worked comparisons for different balances instead of one universal cents-per-point claim.',
  },
  {
    href: GUIDE_AVION_TRANSFER_PARTNERS_PATH,
    title: 'Transfer partners explained',
    description:
      'How partner transfers differ from portal redemptions: eligibility, timing, and why transfers cannot be reversed.',
  },
  {
    href: TOOL_AVION_POINTS_CALCULATOR_PATH,
    title: 'Points value calculator',
    description:
      'Compare a cash fare with a redemption using your own quotes, before and after assistance fees.',
  },
]