import { GEO_SOURCE_URLS } from '@/constants/geo'

/** GEO blocks (citations, key facts, tables, sources) for Group A service pages. */

export const FLIGHT_BOOKING_GEO = {
  keyFactsTitle: 'Key Facts About Flight Booking by Phone',
  keyFacts: [
    'Ticket price, taxes, and carrier rules are set by the airline—not by AvioSupportDesk.',
    'Passenger names must match government ID before the ticket is issued.',
    'U.S. DOT consumer protections apply to flights to, from, or within the United States when the seller is covered.',
    'Fare brand (basic vs. main) often controls bags, seats, and change flexibility more than the airline name alone.',
  ],
  citations: [
    {
      prefix: 'According to ',
      linkLabel: 'DOT Fly Rights guidance',
      href: GEO_SOURCE_URLS.DOT_FLY_RIGHTS,
      suffix:
        ', passengers on covered U.S. itineraries have defined consumer protections for oversales, tarmac delays, and related air travel rights.',
    },
    {
      prefix: 'Under ',
      linkLabel: 'DOT refund rules',
      href: GEO_SOURCE_URLS.DOT_REFUNDS,
      suffix:
        ', when an airline cancels a covered flight and you do not accept alternative travel or vouchers, a refund is generally due within 7 business days for credit card purchases.',
    },
    {
      prefix: 'For Canada-connected trips, review ',
      linkLabel: 'Canadian Transportation Agency air travel guidance',
      href: GEO_SOURCE_URLS.CTA_CANADA_AIR,
      suffix: ' alongside the operating carrier’s contract of carriage before you ticket.',
    },
  ],
  comparison: {
    title: 'Fare brand comparison (typical themes)',
    caption:
      'Themes vary by airline and route. Confirm the fare rules shown for your exact itinerary before purchase.',
    headers: ['Fare theme', 'What usually changes', 'Verify on'],
    rows: [
      ['Basic economy', 'Fewer free seats/bags; stricter change rules', 'Airline fare rules at checkout'],
      ['Main / standard', 'More included amenities; clearer change paths', 'Carrier booking summary'],
      ['Flexible / refundable', 'Higher price; easier cancel or change windows', 'Ticket receipt & contract of carriage'],
    ],
  },
  sources: [
    { label: 'U.S. DOT — Fly Rights', href: GEO_SOURCE_URLS.DOT_FLY_RIGHTS },
    { label: 'U.S. DOT — Refunds', href: GEO_SOURCE_URLS.DOT_REFUNDS },
    { label: 'Canadian Transportation Agency — Air travel', href: GEO_SOURCE_URLS.CTA_CANADA_AIR },
  ],
}

export const HOTEL_BOOKING_GEO = {
  keyFactsTitle: 'Key Facts About Hotel Booking by Phone',
  keyFacts: [
    'Prepaid rates often cost less but lock stricter cancellation deadlines than flexible rates.',
    'Resort or facility fees may be collected only at the hotel—even when room tax appears in the quote.',
    'Late arrivals after red-eye flights should be noted so the property holds the room.',
    'AvioSupportDesk is independent—we do not operate as a hotel brand loyalty desk.',
  ],
  citations: [
    {
      prefix: 'When your stay connects to a U.S. flight disruption, ',
      linkLabel: 'DOT refund guidance',
      href: GEO_SOURCE_URLS.DOT_REFUNDS,
      suffix:
        ' explains airline refund timing; hotel cancellation still follows the rate rules on your reservation.',
    },
    {
      prefix: 'For passenger-rights context on disrupted U.S. air travel that can affect hotel nights, see ',
      linkLabel: 'DOT Fly Rights',
      href: GEO_SOURCE_URLS.DOT_FLY_RIGHTS,
      suffix: '.',
    },
    {
      prefix: 'If a supplier dispute escalates on a U.S. air segment tied to your trip, you may use the ',
      linkLabel: 'DOT air travel complaint process',
      href: GEO_SOURCE_URLS.DOT_COMPLAINTS,
      suffix: ' after contacting the airline or ticket seller first.',
    },
  ],
  comparison: {
    title: 'Hotel rate type comparison',
    caption: 'Always read the cancellation cutoff shown for the rate you select.',
    headers: ['Rate type', 'Typical trade-off', 'Watch for'],
    rows: [
      ['Prepaid / non-refundable', 'Lower nightly total', 'No free cancel after purchase'],
      ['Flexible', 'Higher total; free cancel until deadline', 'Cutoff often 24–72 hours before arrival'],
      ['Member / opaque web rate', 'May not book through phone channels', 'Coverage confirmation on the call'],
    ],
  },
  sources: [
    { label: 'U.S. DOT — Refunds', href: GEO_SOURCE_URLS.DOT_REFUNDS },
    { label: 'U.S. DOT — Fly Rights', href: GEO_SOURCE_URLS.DOT_FLY_RIGHTS },
    { label: 'U.S. DOT — Air travel complaints', href: GEO_SOURCE_URLS.DOT_COMPLAINTS },
  ],
}

export const POINTS_REDEMPTION_GEO = {
  keyFactsTitle: 'Key Facts About Points & Miles Redemption',
  keyFacts: [
    'Award space is controlled by airlines and can differ from cash seat availability on the same flight.',
    'Bank point transfers are usually irreversible once completed in your account.',
    'Long-haul awards can still require large cash taxes or carrier surcharges.',
    'AvioSupportDesk does not represent RBC Avion Rewards, Avios, or any airline loyalty program.',
  ],
  citations: [
    {
      prefix: 'Cash refund timelines for airline-cancelled U.S. flights are summarized in ',
      linkLabel: 'DOT refund rules',
      href: GEO_SOURCE_URLS.DOT_REFUNDS,
      suffix: '; award tickets often follow separate program change and redeposit rules.',
    },
    {
      prefix: 'Passenger rights on covered U.S. itineraries are outlined in ',
      linkLabel: 'DOT Fly Rights',
      href: GEO_SOURCE_URLS.DOT_FLY_RIGHTS,
      suffix: ', which still apply when you travel on an award seat operated by a covered carrier.',
    },
    {
      prefix: 'IATA notes that baggage allowances remain airline-specific—see ',
      linkLabel: 'IATA Travel & Baggage',
      href: GEO_SOURCE_URLS.IATA_BAGGAGE,
      suffix: ' before assuming award tickets include the same bags as cash fares.',
    },
  ],
  comparison: {
    title: 'Cash booking vs. award redemption',
    caption: 'Compare both prices when visible; award taxes can erase “free” seat value.',
    headers: ['Option', 'What you pay', 'Main risk'],
    rows: [
      ['Cash fare', 'Published fare + taxes', 'Change/cancel fees by fare brand'],
      ['Airline miles award', 'Miles + taxes/surcharges', 'Award space & redeposit rules'],
      ['Bank points transfer', 'Points moved to partner + award cost', 'Irreversible transfer timing'],
    ],
  },
  sources: [
    { label: 'U.S. DOT — Refunds', href: GEO_SOURCE_URLS.DOT_REFUNDS },
    { label: 'U.S. DOT — Fly Rights', href: GEO_SOURCE_URLS.DOT_FLY_RIGHTS },
    { label: 'IATA — Travel & Baggage', href: GEO_SOURCE_URLS.IATA_BAGGAGE },
  ],
}

export const FLIGHT_CHANGES_GEO = {
  keyFactsTitle: 'Key Facts About Flight Changes',
  keyFacts: [
    'Change cost is usually a published fee plus any fare difference to the new flight.',
    'Basic economy and ultra-low fares often block exchanges entirely.',
    'Same-day confirmed or standby options are airline-specific and inventory-limited.',
    'Significant airline-driven schedule changes on covered U.S. flights may create refund rights instead of a paid change.',
  ],
  citations: [
    {
      prefix: 'According to ',
      linkLabel: 'DOT refund regulations',
      href: GEO_SOURCE_URLS.DOT_REFUNDS,
      suffix:
        ', a significant delay or change on a covered flight can entitle you to a refund if you decline alternative transportation—review timing thresholds on the DOT page.',
    },
    {
      prefix: 'United publishes passenger change and cancel options on its ',
      linkLabel: 'official change/cancel page',
      href: GEO_SOURCE_URLS.UNITED_CHANGE,
      suffix: '; your ticketed fare still controls eligibility.',
    },
    {
      prefix: 'Delta documents change and cancel paths on its ',
      linkLabel: 'change & cancel overview',
      href: GEO_SOURCE_URLS.DELTA_CHANGE,
      suffix: ', which you should compare with the fare rules on your confirmation.',
    },
  ],
  comparison: {
    title: 'Change scenario comparison',
    caption: 'Airline pages describe general options; your PNR fare rules are decisive.',
    headers: ['Scenario', 'Typical path', 'Official reference'],
    rows: [
      ['You change dates (voluntary)', 'Fee + fare difference if allowed', 'Carrier change/cancel page'],
      ['Airline significant schedule change', 'Accept new flight or seek refund rights', 'DOT Refunds page'],
      ['Same-day switch', 'Confirmed change or standby if offered', 'Airline same-day policy'],
    ],
  },
  sources: [
    { label: 'U.S. DOT — Refunds', href: GEO_SOURCE_URLS.DOT_REFUNDS },
    { label: 'United — Change or cancel', href: GEO_SOURCE_URLS.UNITED_CHANGE },
    { label: 'Delta — Change & cancel', href: GEO_SOURCE_URLS.DELTA_CHANGE },
    { label: 'American Airlines — Change/cancel', href: GEO_SOURCE_URLS.AMERICAN_CHANGE },
  ],
}
