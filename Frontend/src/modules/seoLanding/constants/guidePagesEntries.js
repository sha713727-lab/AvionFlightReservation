import {
  BAGGAGE_ASSISTANCE_PATH,
  FLIGHT_BOOKING_PATH,
  CANCELLATION_POLICY_PATH,
  FLIGHT_CANCELLATION_PATH,
  FLIGHT_CHANGES_PATH,
  GUIDE_BAGGAGE_PATH,
  GUIDE_FLIGHT_BOOKING_PATH,
  GUIDE_FLIGHT_CANCELLATIONS_PATH,
  GUIDE_FLIGHT_CHANGES_PATH,
  GUIDE_POINTS_PATH,
  GUIDES_PATH,
  POINTS_REDEMPTION_PATH,
  SERVICES_PATH,
} from '@/constants/routes'

export const GUIDE_HUB = {
  slug: 'guides',
  path: GUIDES_PATH,
  title: 'Travel Guides | Avion Flight Reservation',
  metaDescription:
    'Plain-language guides on booking flights, changes, cancellations, baggage, and points. Independent Avion Flight Reservation—not affiliated with bank or airline loyalty brands.',
  h1: 'Travel Guides for Flight Booking & Airline Help',
  intro:
    'AvioSupportDesk travel guides answer common booking, change, cancellation, baggage, and points questions in a direct format first, then add detail. Use them for self-serve clarity; call our reservation line when your ticket needs one-on-one phone help.',
  keywords: ['flight booking guide', 'travel help guides', 'airline change guide'],
}

export const GUIDE_PAGES = [
  {
    slug: 'flight-booking',
    path: GUIDE_FLIGHT_BOOKING_PATH,
    title: 'How to Book a Flight by Phone | Avion Guide',
    metaDescription:
      'Step-by-step overview of booking flights by phone: what to prepare, how fares work, and when specialist help saves time. Avion Flight Reservation.',
    question: 'How do I book a flight by phone with a travel specialist?',
    directAnswer:
      'Call Avion Flight Reservation at +1 877 702 9887 with your dates, cities, passenger count, and payment ready if you plan to purchase. A specialist searches available itineraries, explains fare rules in plain language, and walks you through confirmation when you approve an option.',
    explanation:
      'Phone booking helps when routes are complex, passengers need different cabins, or you want a human to sanity-check connection times. Specialists use the same airline inventory systems available to agencies, but you stay in control of which fare you select. Independent assistance is not the same as calling an airline directly—our role is to compare options across carriers we support and clarify policies before you pay.',
    conditions: [
      'Fares and seats can change between search and purchase; locking a price may require immediate payment.',
      'Passenger names must match government ID, especially for international travel.',
      'Some ultra-low fares restrict changes, seat selection, or carry-on bags.',
      'Avion Flight Reservation is not affiliated with RBC Avion Rewards, Avios, or any airline.',
    ],
    expertGuidance:
      'Call before you transfer bank points or hold multiple online baskets—you may get clearer totals and avoid duplicate charges. If you already started online, have confirmation emails or session details ready so we do not rebuild work unnecessarily.',
    relatedQuestions: [
      { label: 'flight booking assistance', href: FLIGHT_BOOKING_PATH },
      { label: 'points and miles travel guide', href: GUIDE_POINTS_PATH },
      { label: 'all travel services', href: SERVICES_PATH },
    ],
    keywords: ['book flight by phone', 'flight reservation steps'],
  },
  {
    slug: 'flight-changes',
    path: GUIDE_FLIGHT_CHANGES_PATH,
    title: 'How Do Airline Flight Changes Work? | Avion Guide',
    metaDescription:
      'Understand airline change fees, fare differences, and same-day options before you modify a ticket. Independent guide from Avion Flight Reservation.',
    question: 'How do airline flight changes work?',
    directAnswer:
      'A change replaces all or part of your ticket with a new flight. The airline checks your fare rules, charges any change fee, and collects a fare difference if the new flight costs more. Some tickets cannot be changed; others allow free changes within a risk-free window right after purchase.',
    explanation:
      'Change policies live in the fare class printed on your receipt, not in general marketing pages. Basic economy often restricts changes until you upgrade the fare. Partner tickets may need the operating carrier to reissue. When storms or schedule cancellations happen, airlines sometimes open free change waivers—those are temporary and route-specific.',
    conditions: [
      'Same-day standby or same-day confirmed change programs are airline-specific and may require elite status.',
      'Name changes are usually not permitted; minor corrections may require proof and a fee.',
      'If you no-show, remaining segments may be canceled automatically.',
      'Third-party sellers may add their own service fees on top of airline charges.',
    ],
    expertGuidance:
      'Before accepting an automatic rebooking email, compare arrival times and connection lengths. Call us with your confirmation code if you want alternate flights reviewed against your fare rules.',
    relatedQuestions: [
      { label: 'flight change assistance', href: FLIGHT_CHANGES_PATH },
      { label: 'flight cancellation and refunds guide', href: GUIDE_FLIGHT_CANCELLATIONS_PATH },
      { label: 'travel guides hub', href: GUIDES_PATH },
    ],
    keywords: ['airline change fee', 'change flight ticket'],
  },
  {
    slug: 'flight-cancellations',
    path: GUIDE_FLIGHT_CANCELLATIONS_PATH,
    title: 'How Do Flight Cancellations and Refunds Work? | Avion Guide',
    metaDescription:
      'Learn when airline tickets are refundable, when you receive credits, and how cancellation timing affects outcomes. Avion Flight Reservation guide.',
    question: 'What happens when I cancel a flight?',
    directAnswer:
      'The airline applies your ticket’s fare rules. Refundable fares may return to your original payment after processing time. Non-refundable fares often become a credit minus fees, or may not be cancelable at all after a stated deadline. Void windows sometimes allow same-day cancellation without penalty.',
    explanation:
      'Cancellation is not the same as a schedule change initiated by the airline. When carriers cancel flights, they owe you rebooking or refund options under their contract of carriage. When you cancel voluntarily, your purchased fare governs. Travel insurance, if you bought a separate policy, may cover certain insured reasons but is not part of the airline ticket.',
    conditions: [
      'Partial cancellations on group bookings may reprice remaining passengers.',
      'Award tickets return miles according to program rules, sometimes with a redeposit fee.',
      'Hotels and cars booked separately follow their own cancellation clocks.',
      'Chargeback rights with your bank are separate from airline refund policies.',
    ],
    expertGuidance:
      'If you might rebook within a year, ask whether a credit or refund is more flexible before canceling. Call with your confirmation code so we can read the exact rule tied to your ticket.',
    relatedQuestions: [
      { label: 'flight cancellation assistance', href: FLIGHT_CANCELLATION_PATH },
      { label: 'cancellation policy', href: CANCELLATION_POLICY_PATH },
      { label: 'airline flight change guide', href: GUIDE_FLIGHT_CHANGES_PATH },
    ],
    keywords: ['flight refund rules', 'cancel airline ticket'],
  },
  {
    slug: 'baggage',
    path: GUIDE_BAGGAGE_PATH,
    title: 'Airline Baggage Rules Explained | Avion Guide',
    metaDescription:
      'Carry-on, checked bag, and fee basics for North American flights. When to call for baggage help. Avion Flight Reservation independent guide.',
    question: 'How do airline baggage allowances work?',
    directAnswer:
      'Your allowance depends on the operating airline, fare brand, route, and sometimes loyalty status. Carry-on size limits and personal item rules are enforced at the gate. Checked bags are priced per direction and may cost more at the airport than if prepaid online or by phone.',
    explanation:
      'Codeshare flights usually follow the operating carrier’s baggage chart even if you booked through a partner name. International trips may include a free checked bag on full-fare economy while basic economy is carry-on only. Specialty items—skis, strollers, musical instruments—have dimension and weight tables you should verify before packing.',
    conditions: [
      'Overweight and oversize fees apply even when the first bag is free.',
      'Interline agreements may not transfer bags on separate tickets you booked yourself.',
      'Lithium battery rules differ for checked versus carry-on storage.',
      'Duty-free liquids may be restricted on connections through certain countries.',
    ],
    expertGuidance:
      'If two airlines on one itinerary show different allowances, assume the stricter rule for each segment. Call us with flight numbers before you pay airport excess fees—we can often confirm if prepayment is still available.',
    relatedQuestions: [
      { label: 'baggage allowance and fee help', href: BAGGAGE_ASSISTANCE_PATH },
      { label: 'how to book a flight by phone', href: GUIDE_FLIGHT_BOOKING_PATH },
      { label: 'all travel services', href: SERVICES_PATH },
    ],
    keywords: ['airline baggage allowance', 'carry-on rules'],
  },
  {
    slug: 'points-and-miles',
    path: GUIDE_POINTS_PATH,
    title: 'Points and Miles Basics for Flights | Avion Guide',
    metaDescription:
      'Understand transferring bank points, award space, taxes, and when cash fares beat redemptions. Independent Avion Flight Reservation guide.',
    question: 'How should I use points or miles for a flight?',
    directAnswer:
      'Compare the cash price to the points cost plus taxes for the same flight. Transfer bank points only after you confirm award space on the partner airline. Book through the program that owns the miles when possible, because change rules follow that program.',
    explanation:
      'Bank travel portals quote cash-equivalent redemptions with simpler rules but not always the best value. Airline miles may offer better cent-per-point value on premium cabins yet come with limited seats. Transfers are usually one-way and instant or delayed depending on the partner—mistakes cannot be reversed. Avion Flight Reservation helps with general redemption steps but does not represent RBC Avion Rewards, Avios, or other branded programs.',
    conditions: [
      'Award charts change; dynamic pricing makes some routes unpredictable.',
      'Taxes and carrier surcharges can exceed hundreds on certain international partners.',
      'Stopovers and open jaws may be allowed only on specific program rules.',
      'Points expire under program inactivity rules unless you earn or redeem periodically.',
    ],
    expertGuidance:
      'Hold a refundable cash fare only when you understand both cancellation policies. Call us before transferring large point balances so we can sanity-check space and fees.',
    relatedQuestions: [
      { label: 'points and miles redemption help', href: POINTS_REDEMPTION_PATH },
      { label: 'how to book a flight by phone', href: GUIDE_FLIGHT_BOOKING_PATH },
      { label: 'travel guides hub', href: GUIDES_PATH },
    ],
    keywords: ['redeem travel points', 'airline miles guide'],
  },
]
