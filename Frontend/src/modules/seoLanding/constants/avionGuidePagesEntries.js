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
import {
  OFFICIAL_AVION_TERMS_URL,
  OFFICIAL_AVION_TRAVEL_URL,
  OFFICIAL_VS_US_NOTE,
} from '@/constants/disclosures'

const chartObservation = BUSINESS_FACTS.avionChartObservation
const chartLevels = chartObservation.eliteFixedLevels
  .map((n) => n.toLocaleString('en-CA'))
  .join(' / ')
const chartCaps = chartObservation.illustrativeCapsCad
  .map((n) => `CAD ${n.toLocaleString('en-CA')}`)
  .join(' / ')

/** Avion-focused guide articles (independent assistance positioning). */
export const AVION_GUIDE_PAGES = [
  {
    slug: 'avion-points-flight-booking',
    path: GUIDE_AVION_FLIGHT_BOOKING_PATH,
    title: 'How to Book Flights with Avion Points | AvioSupportDesk',
    metaDescription:
      'Portal redemptions, chart-based awards, and partner transfers use different rules. Independent guide—not RBC or Avion Rewards.',
    question: 'How do I use Avion points to book a flight?',
    directAnswer:
      'Most members book through the authenticated Avion Rewards travel portal or apply fixed chart levels when eligible. Some itineraries use partner programs after a one-way transfer. You always complete booking in your own account; AvioSupportDesk offers optional paid help comparing paths—not program access.',
    explanation:
      `Portal redemptions price trips in points plus any cash the portal shows at checkout. Fixed chart levels apply only when membership, route, and fare conditions match the published chart—not every flight qualifies. Partner transfers move points to another program’s balance and are usually irreversible; book there after transfer completes. Avion points and Avios are related loyalty currencies with different program rules—do not assume one portal shows the other’s awards. ${OFFICIAL_VS_US_NOTE}`,
    conditions: [
      `Official booking and chart display live on Avion Rewards travel (${OFFICIAL_AVION_TRAVEL_URL}) and change without notice.`,
      'Taxes, surcharges, seat fees, and insurance are often excluded from chart caps and still payable in cash.',
      'AvioSupportDesk cannot log into your RBC or Avion account or move points without you.',
      `Program eligibility and fees are defined in Avion terms (${OFFICIAL_AVION_TERMS_URL}).`,
    ],
    expertGuidance:
      'Before transferring points, compare portal price, chart eligibility, and partner availability for the same cabin and baggage rules. Call us if you want a second set of eyes on totals and timing—we quote assistance separately from airline or program charges.',
    relatedQuestions: [
      { label: 'Avion redemption chart guide', href: GUIDE_AVION_REDEMPTION_CHART_PATH },
      { label: 'Avion transfer partners guide', href: GUIDE_AVION_TRANSFER_PARTNERS_PATH },
      { label: 'optional points redemption assistance', href: POINTS_REDEMPTION_PATH },
      { label: 'how our independent process works', href: HOW_IT_WORKS_PATH },
    ],
    keywords: ['book flights with Avion points', 'Avion travel portal'],
  },
  {
    slug: 'avion-points-redemption-chart',
    path: GUIDE_AVION_REDEMPTION_CHART_PATH,
    title: 'Avion Redemption Chart Explained | AvioSupportDesk',
    metaDescription:
      'When fixed chart levels apply, illustrative point levels and CAD caps, and what cash you may still owe. Observed data—not a fare guarantee.',
    question: 'Does the Avion redemption chart apply to every flight?',
    directAnswer:
      'No. Chart pricing applies only when your membership tier, route, airline, and fare conditions match the program’s fixed chart rules. Many trips price dynamically in the portal instead. Always read the fare shown before you commit points.',
    explanation:
      `A fixed chart ties specific point levels to maximum base fare caps in CAD for qualifying itineraries. On ${chartObservation.reviewedAtLabel}, the official Avion Rewards travel page described Avion Elite fixed-points levels of ${chartLevels} with illustrative caps near ${chartCaps}—dated observation only; recheck official terms before you rely on any level. Temporary promotions on that page may show different (including half) point totals—do not treat a promo as the permanent chart. Premium and Select products use separate points-to-CAD rates on the official page rather than the Elite fixed chart. If the underlying fare exceeds the cap or the route is excluded, chart pricing may not be available and the portal will show a different points total. ${OFFICIAL_VS_US_NOTE}`,
    conditions: [
      'Chart tables are conditional—not a universal price list for all members or dates.',
      chartObservation.note,
      'Excluded charges (taxes, fees, carrier surcharges) can remain payable in cash even when chart base fare is covered.',
      `Confirm current chart text on ${OFFICIAL_AVION_TRAVEL_URL} and ${OFFICIAL_AVION_TERMS_URL}.`,
      'AvioSupportDesk does not set or guarantee Avion chart levels.',
    ],
    expertGuidance:
      'Screenshot or note the portal quote and chart footnotes the day you book. If chart and dynamic prices both appear, compare total points plus cash for equivalent baggage and change rules—not headline points alone.',
    relatedQuestions: [
      { label: 'Avion points value examples', href: GUIDE_AVION_POINTS_VALUE_PATH },
      { label: 'points value calculator (CAD)', href: TOOL_AVION_POINTS_CALCULATOR_PATH },
      { label: 'how to book with Avion points', href: GUIDE_AVION_FLIGHT_BOOKING_PATH },
      { label: 'travel assistance fees', href: SERVICE_FEES_PATH },
    ],
    keywords: ['Avion redemption chart', 'Avion fare cap'],
  },
  {
    slug: 'avion-points-value',
    path: GUIDE_AVION_POINTS_VALUE_PATH,
    title: 'Avion Points Value Explained | AvioSupportDesk',
    metaDescription:
      'Worked comparisons at 15k, 35k, and 55k levels using hypothetical cash equivalents—no universal cents-per-point promise.',
    question: 'What are Avion points worth for flights?',
    directAnswer:
      'There is no single cents-per-point rate for every member or route. Value equals the cash you would pay for an equivalent itinerary minus points-side cash charges, divided by points used—then adjust for any independent assistance fee you choose to pay.',
    explanation:
      'Illustrative math (not live offers): if a qualifying short-haul might use 15,000 points with CAD 80 in taxes while a comparable cash ticket is CAD 420, gross cash avoided is CAD 340 before fees—about 2.27 cents per point at 15,000 points. At 35,000 points with CAD 150 cash alongside and a CAD 800 cash alternative, gross avoided is CAD 650 (~1.86 cpp). At 55,000 points with CAD 250 cash and a CAD 1,100 cash fare, gross avoided is CAD 850 (~1.55 cpp). Your results differ by date, carrier, and fare brand; use the calculator with your own quotes.',
    conditions: [
      'Compare equivalent cabin, bags, and change rules— not the most expensive fare you would never buy.',
      'Subtract optional AvioSupportDesk assistance separately; it is not an Avion program fee.',
      'Portal dynamic prices can diver sharply from chart examples on the same route.',
      `Official pricing displays on ${OFFICIAL_AVION_TRAVEL_URL}.`,
    ],
    expertGuidance:
      'Run gross value first, then add assistance fees only if you are actually comparing helped bookings. Call when you want help sanity-checking two complete quotes before you transfer or redeem.',
    relatedQuestions: [
      { label: 'Avion points calculator', href: TOOL_AVION_POINTS_CALCULATOR_PATH },
      { label: 'redemption chart conditions', href: GUIDE_AVION_REDEMPTION_CHART_PATH },
      { label: 'independent service disclosure', href: INDEPENDENT_SERVICE_DISCLOSURE_PATH },
      { label: 'general points and miles guide', href: GUIDE_POINTS_PATH },
    ],
    keywords: ['Avion points value', 'compare points to cash'],
  },
  {
    slug: 'avion-transfer-partners',
    path: GUIDE_AVION_TRANSFER_PARTNERS_PATH,
    title: 'Avion Transfer Partners Explained | AvioSupportDesk',
    metaDescription:
      'Transfers vs portal redemptions, irreversibility, and eligibility. We do not claim transfer routes absent from official terms.',
    question: 'How do Avion transfer partners work?',
    directAnswer:
      'When official terms allow, you move Avion points to a partner program at stated ratios. The transfer is typically one-way and cannot be undone. You then search and book awards in the partner account—not in the Avion portal. Availability and pricing follow the partner’s rules.',
    explanation:
      'Partner transfers differ from booking directly with points in the Avion travel portal. Eligibility may depend on card type, account standing, and which partners the program currently supports—only combinations described in official documentation should be attempted. Do not assume you can transfer to every airline loyalty program; for example, do not treat blog posts about Aeroplan as proof Avion supports that transfer unless the current Avion terms list it. After transfer, delays or bonus promotions are program-specific; book only after points appear in the partner balance.',
    conditions: [
      'Transfers are generally irreversible; mistaken transfers are rarely recoverable.',
      'Partner award space, change fees, and taxes are controlled by the partner program.',
      `Read transfer restrictions in ${OFFICIAL_AVION_TERMS_URL} before moving points.`,
      'AvioSupportDesk guides process only—we are not RBC, Avion Rewards, or partner airlines.',
    ],
    expertGuidance:
      'Hold a refundable cash fare or confirm partner award space before transferring large balances. Call us to compare portal redemption versus transfer for the same trip goals—we will not recommend a transfer path unsupported by official terms.',
    relatedQuestions: [
      { label: 'book flights with Avion points', href: GUIDE_AVION_FLIGHT_BOOKING_PATH },
      { label: 'Avion redemption chart guide', href: GUIDE_AVION_REDEMPTION_CHART_PATH },
      { label: 'travel guides hub', href: GUIDES_PATH },
      { label: 'points redemption assistance', href: POINTS_REDEMPTION_PATH },
    ],
    keywords: ['Avion partner transfer', 'transfer irreversible'],
  },
]
