import { GEO_SOURCE_URLS } from '@/constants/geo'

/** GEO blocks (citations, key facts, tables, sources) for Group B service pages. */

export const FLIGHT_CANCELLATION_GEO = {
  keyFactsTitle: 'Key Facts About Flight Cancellation & Refunds',
  keyFacts: [
    'Airline-cancelled covered U.S. flights generally trigger refund rights when you decline alternatives.',
    'Voluntary cancels on non-refundable fares often yield credit—not cash—after any risk-free window.',
    'Credit card refunds are typically due within 7 business days once a DOT-covered refund is owed.',
    'Agency-issued tickets may need the original seller for some cancel paths.',
  ],
  citations: [
    {
      prefix: 'According to ',
      linkLabel: 'DOT regulations on refunds',
      href: GEO_SOURCE_URLS.DOT_REFUNDS,
      suffix:
        ', airlines must refund cancelled covered flights within 7 business days for credit card purchases when you do not accept alternative transportation or vouchers.',
    },
    {
      prefix: 'DOT’s ',
      linkLabel: 'Fly Rights summary',
      href: GEO_SOURCE_URLS.DOT_FLY_RIGHTS,
      suffix: ' outlines broader passenger protections that interact with cancellation and refund decisions.',
    },
    {
      prefix: 'If an airline fails to honor a refund you believe is owed, the ',
      linkLabel: 'DOT air travel complaint process',
      href: GEO_SOURCE_URLS.DOT_COMPLAINTS,
      suffix: ' explains how to file after contacting the carrier.',
    },
  ],
  comparison: {
    title: 'Cancellation outcome comparison',
    caption: 'Outcomes depend on who cancelled, fare type, and whether DOT coverage applies.',
    headers: ['Situation', 'Common outcome', 'Primary reference'],
    rows: [
      ['Airline cancels; you decline rebooking', 'Cash refund (covered U.S. rules)', 'DOT Refunds'],
      ['You cancel non-refundable fare', 'Often credit / limited recovery', 'Fare rules + airline cancel page'],
      ['Within U.S. 24-hour risk-free window', 'Possible free cancel if purchase qualifies', 'DOT Refunds / seller policy'],
    ],
  },
  sources: [
    { label: 'U.S. DOT — Refunds', href: GEO_SOURCE_URLS.DOT_REFUNDS },
    { label: 'U.S. DOT — Fly Rights', href: GEO_SOURCE_URLS.DOT_FLY_RIGHTS },
    { label: 'U.S. DOT — Air travel complaints', href: GEO_SOURCE_URLS.DOT_COMPLAINTS },
    { label: 'Air Canada — Change or cancel', href: GEO_SOURCE_URLS.AIR_CANADA_CHANGE },
  ],
}

export const SEAT_SELECTION_GEO = {
  keyFactsTitle: 'Key Facts About Airline Seat Selection',
  keyFacts: [
    'Basic economy often blocks advance seat maps until online check-in opens.',
    'Exit-row seats require meeting airline safety eligibility rules.',
    'Aircraft swaps can clear previous seat assignments without notice.',
    'Preferred and extra-legroom fees are set by the airline seat map—not by AvioSupportDesk.',
  ],
  citations: [
    {
      prefix: 'Delta explains seat maps and selection options on its ',
      linkLabel: 'official seat selection overview',
      href: GEO_SOURCE_URLS.DELTA_SEATS,
      suffix: '; fees still depend on your fare brand and route.',
    },
    {
      prefix: 'United publishes seat guidance on its ',
      linkLabel: 'seats information page',
      href: GEO_SOURCE_URLS.UNITED_SEATS,
      suffix: ', including when advance selection may be limited.',
    },
    {
      prefix: 'For U.S. consumer protections that can apply when equipment changes disrupt paid services, review ',
      linkLabel: 'DOT Fly Rights',
      href: GEO_SOURCE_URLS.DOT_FLY_RIGHTS,
      suffix: ' and your ticket receipt.',
    },
  ],
  comparison: {
    title: 'Seat access by fare theme',
    caption: 'Exact map timing varies; check your confirmation and airline app.',
    headers: ['Fare theme', 'Advance seats', 'Typical fee pattern'],
    rows: [
      ['Basic economy', 'Often locked until check-in', 'Standard seats may be free only late'],
      ['Main cabin', 'Usually open earlier', 'Preferred / extra-legroom paid'],
      ['Premium cabin', 'Included or expanded choice', 'Fewer paid upsells'],
    ],
  },
  sources: [
    { label: 'Delta — Seat maps & selection', href: GEO_SOURCE_URLS.DELTA_SEATS },
    { label: 'United — Seats', href: GEO_SOURCE_URLS.UNITED_SEATS },
    { label: 'U.S. DOT — Fly Rights', href: GEO_SOURCE_URLS.DOT_FLY_RIGHTS },
  ],
}

export const BAGGAGE_ASSISTANCE_GEO = {
  keyFactsTitle: 'Key Facts About Baggage Allowance & Fees',
  keyFacts: [
    'IATA states baggage rules are set by airlines—not by a single global allowance chart.',
    'Basic economy on many U.S. carriers limits free cabin bags compared with main cabin.',
    'Prepaid checked bags are often cheaper than airport counter rates when still available.',
    'Codeshare itineraries may follow the operating carrier’s baggage rules.',
  ],
  citations: [
    {
      prefix: 'According to ',
      linkLabel: 'IATA Travel & Baggage guidance',
      href: GEO_SOURCE_URLS.IATA_BAGGAGE,
      suffix:
        ', baggage allowances and fees are airline-specific, so travelers should verify rules with the operating carrier for each trip.',
    },
    {
      prefix: 'For prohibited and restricted items screening, consult the ',
      linkLabel: 'TSA What Can I Bring? list',
      href: GEO_SOURCE_URLS.TSA_WHAT_CAN_I_BRING,
      suffix: ' before you pack batteries, liquids, or sports equipment.',
    },
    {
      prefix: 'Air Canada publishes route- and fare-based baggage details on its ',
      linkLabel: 'official baggage page',
      href: GEO_SOURCE_URLS.AIR_CANADA_BAGS,
      suffix: '; United, Delta, and American post parallel policy pages for U.S. carriers.',
    },
  ],
  comparison: {
    title: 'Baggage policy references by airline',
    caption: 'Use these official pages to confirm allowance before you prepay bags.',
    headers: ['Airline', 'Policy focus', 'Official page'],
    rows: [
      ['United', 'Checked & carry-on fees by route', 'united.com baggage'],
      ['Delta', 'Allowance & special items', 'delta.com baggage'],
      ['American', 'Bag fees & size limits', 'aa.com baggage'],
      ['Air Canada', 'Calculator + fare-based rules', 'aircanada.com baggage'],
    ],
  },
  sources: [
    { label: 'IATA — Travel & Baggage', href: GEO_SOURCE_URLS.IATA_BAGGAGE },
    { label: 'TSA — What Can I Bring?', href: GEO_SOURCE_URLS.TSA_WHAT_CAN_I_BRING },
    { label: 'United — Baggage', href: GEO_SOURCE_URLS.UNITED_BAGS },
    { label: 'Delta — Baggage', href: GEO_SOURCE_URLS.DELTA_BAGS },
    { label: 'American Airlines — Baggage', href: GEO_SOURCE_URLS.AMERICAN_BAGS },
    { label: 'Air Canada — Baggage', href: GEO_SOURCE_URLS.AIR_CANADA_BAGS },
  ],
}

export const TRIP_PLANNING_GEO = {
  keyFactsTitle: 'Key Facts About Trip Planning by Phone',
  keyFacts: [
    'Multi-city plans should respect airline minimum connection times at each hub.',
    'Long-haul arrivals followed by same-day hotel check-in need realistic buffers for immigration.',
    'Open-jaw tickets can reduce backtracking compared with forcing a return to the same city.',
    'Visa and entry rules remain the traveler’s responsibility via official government sources.',
  ],
  citations: [
    {
      prefix: 'When building U.S.-connected itineraries, ',
      linkLabel: 'DOT Fly Rights',
      href: GEO_SOURCE_URLS.DOT_FLY_RIGHTS,
      suffix: ' summarizes consumer protections that matter if a carrier disrupts a segment mid-trip.',
    },
    {
      prefix: 'Refund timing after airline cancellations on covered flights is explained in ',
      linkLabel: 'DOT refund rules',
      href: GEO_SOURCE_URLS.DOT_REFUNDS,
      suffix: ', which can affect whether you keep hotels or rebook the whole journey.',
    },
    {
      prefix: 'Baggage rules still vary by airline on multi-carrier trips—see ',
      linkLabel: 'IATA Travel & Baggage',
      href: GEO_SOURCE_URLS.IATA_BAGGAGE,
      suffix: ' and each operating carrier’s policy before you pack across connections.',
    },
  ],
  comparison: {
    title: 'Itinerary building approaches',
    caption: 'Choose the structure that matches your risk tolerance for missed connections.',
    headers: ['Approach', 'Best for', 'Main caution'],
    rows: [
      ['Single ticket multi-city', 'Protected connections on one PNR', 'Schedule change can ripple'],
      ['Separate one-ways', 'Flexible mid-trip changes', 'Missed connection may be unprotected'],
      ['Open-jaw', 'Different start/end cities', 'Ground transfer planning needed'],
    ],
  },
  sources: [
    { label: 'U.S. DOT — Fly Rights', href: GEO_SOURCE_URLS.DOT_FLY_RIGHTS },
    { label: 'U.S. DOT — Refunds', href: GEO_SOURCE_URLS.DOT_REFUNDS },
    { label: 'IATA — Travel & Baggage', href: GEO_SOURCE_URLS.IATA_BAGGAGE },
    { label: 'Canadian Transportation Agency — Air travel', href: GEO_SOURCE_URLS.CTA_CANADA_AIR },
  ],
}
