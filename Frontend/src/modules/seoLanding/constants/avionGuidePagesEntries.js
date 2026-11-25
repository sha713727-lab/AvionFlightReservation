import {
  GUIDE_AVION_FLIGHT_BOOKING_PATH,
  GUIDE_AVION_POINTS_VALUE_PATH,
  GUIDE_AVION_REDEMPTION_CHART_PATH,
  GUIDE_AVION_TRANSFER_PARTNERS_PATH,
  GUIDE_POINTS_PATH,
  GUIDES_PATH,
  HOW_IT_WORKS_PATH,
  INDEPENDENT_SERVICE_DISCLOSURE_PATH,
  POINTS_REDEMPTION_PATH,
  SERVICE_FEES_PATH,
  TOOL_AVION_POINTS_CALCULATOR_PATH,
} from '@/constants/routes'
import { BUSINESS_FACTS } from '@/constants/businessFacts'
import { GEO_BYLINES } from '@/constants/geo'

const INDEPENDENCE_NOTE =
  'AvioSupportDesk is independent travel assistance—not an airline, bank, or loyalty-program operator.'

const chartObservation = BUSINESS_FACTS.loyaltyChartObservation
const chartLevels = chartObservation.eliteFixedLevels
  .map((n) => n.toLocaleString('en-CA'))
  .join(' / ')
const chartCaps = chartObservation.illustrativeCapsCad
  .map((n) => `CAD ${n.toLocaleString('en-CA')}`)
  .join(' / ')

/** Loyalty-points education guides (paths retain legacy slugs for stable URLs). */
export const AVION_GUIDE_PAGES = [
  {
    slug: 'avion-points-flight-booking',
    path: GUIDE_AVION_FLIGHT_BOOKING_PATH,
    publishedIso: GEO_BYLINES.avionGuidesPublishedIso,
    title: 'How to Book Flights With Points & Miles | AvioSupportDesk',
    metaDescription:
      'Portal, chart, and partner-path redemptions use different rules. Independent guide to comparing options before you move points—not a bank or loyalty operator.',
    question: 'How do I book a flight with loyalty points or miles?',
    directAnswer:
      'Most travelers redeem through their program’s authenticated travel portal, apply fixed chart levels when eligible, or move points to a partner program and book there. You always complete booking in your own account; AvioSupportDesk offers optional paid help comparing paths—not program access.',
    explanation:
      `Portal redemptions price trips in points plus any cash the portal shows at checkout. Fixed chart levels apply only when membership, route, and fare conditions match the published chart—not every flight qualifies. Partner transfers move points to another program’s balance and are usually irreversible; book there after transfer completes. Different programs use different currencies and rules—do not assume one portal shows another program’s awards. ${INDEPENDENCE_NOTE}`,
    conditions: [
      'Booking tools and chart displays live on your program issuer’s authenticated portal and change without notice.',
      'Taxes, surcharges, seat fees, and insurance are often excluded from chart caps and still payable in cash.',
      'AvioSupportDesk cannot log into your loyalty account or move points without you.',
      'Program eligibility and fees are defined in your issuer’s or program’s current terms.',
    ],
    expertGuidance:
      'Before transferring points, compare portal price, chart eligibility, and partner availability for the same cabin and baggage rules. Call us if you want a second set of eyes on totals and timing—we quote assistance separately from airline or program charges.',
    relatedQuestions: [
      { label: 'fixed redemption chart guide', href: GUIDE_AVION_REDEMPTION_CHART_PATH },
      { label: 'loyalty transfer partners guide', href: GUIDE_AVION_TRANSFER_PARTNERS_PATH },
      { label: 'optional points redemption assistance', href: POINTS_REDEMPTION_PATH },
      { label: 'how our independent process works', href: HOW_IT_WORKS_PATH },
    ],
    keywords: ['book flights with points', 'travel portal redemption', 'award booking steps'],
  },
  {
    slug: 'avion-points-redemption-chart',
    path: GUIDE_AVION_REDEMPTION_CHART_PATH,
    publishedIso: GEO_BYLINES.avionGuidesPublishedIso,
    title: 'Fixed Points Charts for Flights Explained | AvioSupportDesk',
    metaDescription:
      'When fixed chart levels apply, illustrative point levels and CAD caps, and what cash you may still owe. Observed data—not a fare guarantee.',
    question: 'Does a fixed points chart apply to every flight?',
    directAnswer:
      'No. Chart pricing applies only when your membership tier, route, airline, and fare conditions match the program’s fixed chart rules. Many trips price dynamically in the portal instead. Always read the fare shown before you commit points.',
    explanation:
      `A fixed chart ties specific point levels to maximum base fare caps in CAD for qualifying itineraries. On ${chartObservation.reviewedAtLabel}, illustrative fixed-point levels of ${chartLevels} with caps near ${chartCaps} appeared in public educational materials—dated observation only; confirm current rules with your program issuer before you rely on any level. Temporary promotions may show different point totals—do not treat a promo as the permanent chart. Some card tiers use separate earn or redemption rates rather than the fixed chart. If the underlying fare exceeds the cap or the route is excluded, chart pricing may not be available and the portal will show a different points total. ${INDEPENDENCE_NOTE}`,
    conditions: [
      'Chart tables are conditional—not a universal price list for all members or dates.',
      chartObservation.note,
      'Excluded charges (taxes, fees, carrier surcharges) can remain payable in cash even when chart base fare is covered.',
      'Confirm current chart text with your program issuer and in your authenticated account before you book.',
      'AvioSupportDesk does not set or guarantee any program’s chart levels.',
    ],
    expertGuidance:
      'Screenshot or note the portal quote and chart footnotes the day you book. If chart and dynamic prices both appear, compare total points plus cash for equivalent baggage and change rules—not headline points alone.',
    relatedQuestions: [
      { label: 'travel points value examples', href: GUIDE_AVION_POINTS_VALUE_PATH },
      { label: 'points value calculator (CAD)', href: TOOL_AVION_POINTS_CALCULATOR_PATH },
      { label: 'how to book with points and miles', href: GUIDE_AVION_FLIGHT_BOOKING_PATH },
      { label: 'travel assistance fees', href: SERVICE_FEES_PATH },
    ],
    keywords: ['fixed points chart', 'award fare caps', 'redemption chart levels'],
  },
  {
    slug: 'avion-points-value',
    path: GUIDE_AVION_POINTS_VALUE_PATH,
    publishedIso: GEO_BYLINES.avionGuidesPublishedIso,
    title: 'What Are Travel Points Worth? Worked Examples | AvioSupportDesk',
    metaDescription:
      'Compare cash fare, points required, and remaining charges with worked examples at common award levels. No universal cents-per-point claim—see your own math.',
    question: 'What are travel loyalty points worth for flights?',
    directAnswer:
      'There is no single cents-per-point rate for every member or route. Value equals the cash you would pay for an equivalent itinerary minus points-side cash charges, divided by points used—then adjust for any independent assistance fee you choose to pay.',
    explanation:
      'Illustrative math (not live offers): if a qualifying short-haul might use 15,000 points with CAD 80 in taxes while a comparable cash ticket is CAD 420, gross cash avoided is CAD 340 before fees—about 2.27 cents per point at 15,000 points. At 35,000 points with CAD 150 cash alongside and a CAD 800 cash alternative, gross avoided is CAD 650 (~1.86 cpp). At 55,000 points with CAD 250 cash and a CAD 1,100 cash fare, gross avoided is CAD 850 (~1.55 cpp). Your results differ by date, carrier, and fare brand; use the calculator with your own quotes.',
    conditions: [
      'Compare equivalent cabin, bags, and change rules— not the most expensive fare you would never buy.',
      'Subtract optional AvioSupportDesk assistance separately; it is not a loyalty program fee.',
      'Portal dynamic prices can diverge sharply from chart examples on the same route.',
      'Pricing displays in your program issuer’s authenticated travel portal.',
    ],
    expertGuidance:
      'Run gross value first, then add assistance fees only if you are actually comparing helped bookings. Call when you want help sanity-checking two complete quotes before you transfer or redeem.',
    relatedQuestions: [
      { label: 'points value calculator', href: TOOL_AVION_POINTS_CALCULATOR_PATH },
      { label: 'redemption chart conditions', href: GUIDE_AVION_REDEMPTION_CHART_PATH },
      { label: 'independent service disclosure', href: INDEPENDENT_SERVICE_DISCLOSURE_PATH },
      { label: 'general points and miles guide', href: GUIDE_POINTS_PATH },
    ],
    keywords: ['travel points value', 'compare points to cash', 'cents per point'],
  },
  {
    slug: 'avion-transfer-partners',
    path: GUIDE_AVION_TRANSFER_PARTNERS_PATH,
    publishedIso: GEO_BYLINES.avionGuidesPublishedIso,
    title: 'Loyalty Transfer Partners Explained | AvioSupportDesk',
    metaDescription:
      'How partner transfers differ from portal redemptions: eligibility, irreversibility, and timing. We do not promise routes that official program terms disallow.',
    question: 'How do loyalty program transfer partners work?',
    directAnswer:
      'When your program terms allow, you move points to a partner program at stated ratios. The transfer is typically one-way and cannot be undone. You then search and book awards in the partner account—not in your bank or card travel portal. Availability and pricing follow the partner’s rules.',
    explanation:
      'Partner transfers differ from booking directly with points in a card or bank travel portal. Eligibility may depend on account type, standing, and which partners your program currently supports—only combinations described in your issuer’s current documentation should be attempted. Do not assume you can transfer to every airline loyalty program; confirm supported partners in your program terms before moving balances. After transfer, delays or bonus promotions are program-specific; book only after points appear in the partner balance.',
    conditions: [
      'Transfers are generally irreversible; mistaken transfers are rarely recoverable.',
      'Partner award space, change fees, and taxes are controlled by the partner program.',
      'Read transfer restrictions in your program issuer’s current terms before moving points.',
      'AvioSupportDesk guides process only—we are not an airline, bank, or loyalty-program operator.',
    ],
    expertGuidance:
      'Hold a refundable cash fare or confirm partner award space before transferring large balances. Call us to compare portal redemption versus transfer for the same trip goals—we will not recommend a transfer path unsupported by documented program terms.',
    relatedQuestions: [
      { label: 'book flights with points and miles', href: GUIDE_AVION_FLIGHT_BOOKING_PATH },
      { label: 'fixed redemption chart guide', href: GUIDE_AVION_REDEMPTION_CHART_PATH },
      { label: 'travel guides hub', href: GUIDES_PATH },
      { label: 'points redemption assistance', href: POINTS_REDEMPTION_PATH },
    ],
    keywords: ['loyalty transfer partners', 'partner transfer rules', 'portal vs transfer'],
  },
]