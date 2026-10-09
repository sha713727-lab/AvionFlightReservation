import {
  ABOUT_PATH,
  BAGGAGE_ASSISTANCE_PATH,
  BLOG_AIRLINE_CONTACT_GUIDE_PATH,
  BLOG_CANCEL_FLIGHT_REFUND_PATH,
  BLOG_CHANGE_FLIGHT_PATH,
  BLOG_DELAY_COMPENSATION_PATH,
  BLOG_PATH,
  BLOG_SAVE_MONEY_FLIGHTS_PATH,
  CANCELLATION_POLICY_PATH,
  CONTACT_PATH,
  COOKIE_POLICY_PATH,
  DESTINATIONS_PATH,
  FLIGHT_BOOKING_PATH,
  FLIGHT_CANCELLATION_PATH,
  FLIGHT_CHANGES_PATH,
  GUIDE_BAGGAGE_PATH,
  GUIDE_FLIGHT_BOOKING_PATH,
  GUIDE_FLIGHT_CANCELLATIONS_PATH,
  GUIDE_FLIGHT_CHANGES_PATH,
  GUIDE_POINTS_PATH,
  GUIDE_AVION_FLIGHT_BOOKING_PATH,
  GUIDE_AVION_POINTS_VALUE_PATH,
  GUIDE_AVION_REDEMPTION_CHART_PATH,
  GUIDE_AVION_TRANSFER_PARTNERS_PATH,
  GUIDES_PATH,
  HOME_PATH,
  HOW_IT_WORKS_PATH,
  INDEPENDENT_SERVICE_DISCLOSURE_PATH,
  SERVICE_FEES_PATH,
  TOOL_AVION_POINTS_CALCULATOR_PATH,
  HOTEL_BOOKING_PATH,
  WYNDHAM_HOTELS_PATH,
  HILTON_HOTELS_PATH,
  INTERNATIONAL_FLIGHT_PATH,
  POINTS_REDEMPTION_PATH,
  PRIVACY_POLICY_PATH,
  REFUND_POLICY_PATH,
  SEAT_SELECTION_PATH,
  SERVICES_PATH,
  TERMS_PATH,
  TRIP_PLANNING_PATH,
} from '@/constants/routes'

/**
 * Unique SEO titles, descriptions, and on-page H1s for every public route.
 * Exactly one H1 per page; H1 includes the primary keyword (not logo/site name alone).
 */
export const SEO_PAGE_META = {
  [HOME_PATH]: {
    title: 'Independent Points & Flight Help | AvioSupportDesk',
    description:
      'Independent help comparing Avion points and flight options. See our process, assistance fees, and booking guidance before you request help by phone or form.',
    h1: 'Independent help using Avion points for flights',
    keywords: [
      'Avion points help',
      'independent flight assistance',
      'points redemption assistance',
      'AvioSupportDesk',
    ],
  },
  [SERVICES_PATH]: {
    title: 'Travel Services: Flights, Hotels & More | AvioSupportDesk',
    description:
      'Phone help for flight bookings, hotel stays, Avion points, changes, cancellations, and trip planning. Compare services and fees, then talk with a specialist.',
    h1: 'Flight & Travel Services — Book Support by Phone',
    keywords: ['travel services', 'flight booking help', 'hotel booking by phone'],
  },
  [DESTINATIONS_PATH]: {
    title: 'Popular Flight Destinations by Phone | AvioSupportDesk',
    description:
      'Browse flight destinations across Canada, the USA, Europe, and Mexico, with route ideas and typical connections. Speak with a specialist to book by phone.',
    h1: 'Popular Flight Destinations Across Canada, USA & Beyond',
    keywords: ['flight destinations', 'Canada flights', 'USA flights', 'Europe flights'],
  },
  [INTERNATIONAL_FLIGHT_PATH]: {
    title: 'International Flights Booked by Phone | AvioSupportDesk',
    description:
      'Book international flights by phone to Europe, Canada, Mexico, and the USA. Compare routings, connections, and fare rules with an independent specialist.',
    h1: 'International Flights Booked by Phone',
    keywords: ['international flights', 'book flights by phone', 'transatlantic flights'],
  },
  [FLIGHT_BOOKING_PATH]: {
    title: 'Flight Booking Assistance by Phone | AvioSupportDesk',
    description:
      'Book domestic and international flights by phone with fare rules, baggage terms, and change conditions explained before you pay. Independent travel service.',
    h1: 'Flight Booking Assistance by Phone',
    keywords: ['book flights', 'flight reservation by phone', 'airline booking help'],
  },
  [HOTEL_BOOKING_PATH]: {
    title: 'Hotel Booking Help by Phone — Rates & Rules | AvioSupportDesk',
    description:
      'Reserve hotels by phone for business or leisure trips. We explain room types, deposit and cancellation rules, and total taxes before you confirm your stay.',
    h1: 'Hotel Booking Help by Phone — Reserve Your Stay',
    keywords: ['hotel booking', 'book hotel by phone', 'hotel reservation help'],
  },
  [WYNDHAM_HOTELS_PATH]: {
    title: 'Wyndham Hotels Booking Help by Phone | AvioSupportDesk',
    description:
      'Independent phone help booking Wyndham hotels in Atlanta, New Orleans, San Diego, Philadelphia, and more. Not affiliated with Wyndham Hotels & Resorts.',
    h1: 'Book Wyndham stays with clearer phone help.',
    keywords: [
      'wyndham hotels',
      'wyndham hotel booking',
      'wyndham atlanta buckhead',
      'wyndham new orleans french quarter',
      'wyndham san diego bayside',
      'wyndham deerfield beach',
      'wyndham philadelphia historic district',
      'wyndham dfw airport',
      'wyndham virginia beach oceanfront',
      'wyndham houston nrg',
      'book wyndham by phone',
    ],
  },
  [HILTON_HOTELS_PATH]: {
    title: 'Hilton Hotels Booking Help by Phone | AvioSupportDesk',
    description:
      'Independent phone help booking Hilton hotels such as Hilton Anatole, Union Square San Francisco, and Hawaiian Village. Not affiliated with Hilton Worldwide.',
    h1: 'Book Hilton stays with clearer phone help.',
    keywords: [
      'hilton hotels',
      'hilton hotel booking',
      'hilton anatole',
      'hilton san francisco union square',
      'hilton orlando',
      'hilton hawaiian village',
      'hampton inn booking',
      'doubletree hotel booking',
      'book hilton by phone',
    ],
  },
  [POINTS_REDEMPTION_PATH]: {
    title: 'Avion Points Booking Assistance | AvioSupportDesk',
    description:
      'Get independent guidance on Avion flight redemption options. Separate assistance fees are quoted before you agree. Not affiliated with RBC or Avion Rewards.',
    h1: 'Avion Points Booking Assistance',
    keywords: [
      'Avion points redemption',
      'points booking assistance',
      'independent award help',
    ],
  },
  [FLIGHT_CHANGES_PATH]: {
    title: 'Flight Change Assistance by Phone | AvioSupportDesk',
    description:
      'Need to change flight dates, times, or routes? We explain airline change fees, fare differences, and rebooking options by phone before anything is changed.',
    h1: 'Flight Change Assistance by Phone',
    keywords: ['flight change', 'rebook flight', 'airline change fee help'],
  },
  [FLIGHT_CANCELLATION_PATH]: {
    title: 'Flight Cancellation & Refund Help | AvioSupportDesk',
    description:
      'Cancel a flight with phone guidance on refunds, travel credits, and airline fare rules. Get independent help weighing your options before you cancel it.',
    h1: 'Flight Cancellation & Refund Assistance by Phone',
    keywords: ['flight cancellation', 'flight refund help', 'cancel airline ticket'],
  },
  [SEAT_SELECTION_PATH]: {
    title: 'Airline Seat Selection Help by Phone | AvioSupportDesk',
    description:
      'Choose seats, sit families together, and understand paid seat fees before you fly. Get seat-map guidance by phone from an independent travel specialist.',
    h1: 'Airline Seat Selection Help by Phone',
    keywords: ['seat selection', 'airline seats', 'choose flight seats'],
  },
  [BAGGAGE_ASSISTANCE_PATH]: {
    title: 'Baggage Fees & Bag Allowance Help | AvioSupportDesk',
    description:
      'Understand carry-on limits, checked bag fees, and special-item rules before airport day. Get baggage policy guidance by phone from an independent specialist.',
    h1: 'Baggage Fees & Allowance Assistance by Phone',
    keywords: ['baggage allowance', 'checked bag fees', 'carry-on rules'],
  },
  [TRIP_PLANNING_PATH]: {
    title: 'Trip Planning Help by Phone — Multi-City | AvioSupportDesk',
    description:
      'Plan multi-city trips, open-jaw routes, and tight connections with phone support. Build a workable itinerary with an independent trip planning specialist.',
    h1: 'Trip Planning by Phone — Custom Travel Itineraries',
    keywords: ['trip planning', 'custom itinerary', 'multi-city travel'],
  },
  [GUIDES_PATH]: {
    title: 'Travel Guides: Booking, Changes & More | AvioSupportDesk',
    description:
      'Plain-language guides on booking, Avion points, changes, cancellations, and bags. Learn first, then request optional independent assistance when you need it.',
    h1: 'Travel Guides for Flight Booking & Airline Help',
    keywords: ['travel guides', 'flight booking guide', 'Avion points guides'],
  },
  [GUIDE_FLIGHT_BOOKING_PATH]: {
    title: 'How to Book a Flight by Phone Guide | AvioSupportDesk',
    description:
      'Step-by-step guide to booking flights by phone: what to prepare, how fares and timing work, and what to confirm before you pay. Written in plain language.',
    h1: 'How to Book a Flight by Phone — Complete Guide',
    keywords: ['how to book a flight', 'phone booking guide', 'flight reservation steps'],
  },
  [GUIDE_FLIGHT_CHANGES_PATH]: {
    title: 'Airline Change Fees & Rules Explained | AvioSupportDesk',
    description:
      'How airline change fees, fare differences, and same-day change rules work, with examples of what to check before you rebook a flight yourself or with help.',
    h1: 'Airline Change Fees and Rules, Explained',
    keywords: ['flight change guide', 'airline change rules', 'rebooking explained'],
  },
  [GUIDE_FLIGHT_CANCELLATIONS_PATH]: {
    title: 'Airline Refund vs Credit Rules Explained | AvioSupportDesk',
    description:
      'When airlines owe a cash refund, when they offer a travel credit, and how fare rules, schedule changes, and 24-hour windows affect what you can get back.',
    h1: 'Airline Refund vs Credit Rules, Explained',
    keywords: ['cancellation guide', 'flight refund guide', 'airline credit vs refund'],
  },
  [GUIDE_BAGGAGE_PATH]: {
    title: 'Airline Baggage Rules Explained | AvioSupportDesk',
    description:
      'Carry-on, checked bag, and fee basics explained for North American trips, including weight limits and special items, so you can check your allowance early.',
    h1: 'Airline Baggage Rules Explained — Fees & Limits',
    keywords: ['baggage rules', 'carry-on guide', 'checked luggage fees'],
  },
  [GUIDE_POINTS_PATH]: {
    title: 'Points & Miles Basics for Flights | AvioSupportDesk',
    description:
      'Learn how transfers, award space, taxes, and fees work, and when paying cash beats using points on flights. A plain-language primer before you redeem points.',
    h1: 'Points & Miles Basics for Flight Travel',
    keywords: ['points and miles guide', 'award travel basics', 'transfer partners'],
  },
  [GUIDE_AVION_FLIGHT_BOOKING_PATH]: {
    title: 'How to Book Flights with Avion Points | AvioSupportDesk',
    description:
      'Guide to Avion flight redemptions: portal booking, chart levels, cash still due, and when optional paid help is useful. Independent—not RBC or Avion Rewards.',
    h1: 'How to book flights with Avion points',
    keywords: ['Avion points flights', 'Avion travel booking', 'independent redemption help'],
  },
  [GUIDE_AVION_REDEMPTION_CHART_PATH]: {
    title: 'Avion Points Redemption Chart Explained | AvioSupportDesk',
    description:
      'When fixed chart levels apply, route and membership conditions, fare caps, and charges excluded from chart pricing, with links to official Avion rules.',
    h1: 'Avion points redemption chart explained',
    keywords: ['Avion redemption chart', 'Avion fare caps', 'fixed chart levels'],
  },
  [GUIDE_AVION_POINTS_VALUE_PATH]: {
    title: 'What Are Avion Points Worth? Worked Examples | AvioSupportDesk',
    description:
      'Compare cash fare, points required, and remaining charges with worked examples at 15k, 35k, and 55k levels. No universal cents-per-point claim—see your own math.',
    h1: 'What Avion Points Are Worth: Worked Examples',
    keywords: ['Avion points value', 'cents per point', 'points vs cash'],
  },
  [GUIDE_AVION_TRANSFER_PARTNERS_PATH]: {
    title: 'Avion Transfer Partners Explained | AvioSupportDesk',
    description:
      'How Avion partner transfers differ from portal redemptions: eligibility, irreversibility, and timing. We do not promise routes that official terms do not support.',
    h1: 'Avion transfer partners explained',
    keywords: ['Avion transfer partners', 'partner transfer rules', 'Avion vs Avios'],
  },
  [TOOL_AVION_POINTS_CALCULATOR_PATH]: {
    title: 'Avion Points Calculator: Cents per Point | AvioSupportDesk',
    description:
      'Estimate gross and net cents per point by comparing equivalent cash and redemption totals in CAD, including optional independent assistance fees you enter.',
    h1: 'Avion points value calculator',
    keywords: ['Avion points calculator', 'points value calculator', 'CAD redemption math'],
  },
  [SERVICE_FEES_PATH]: {
    title: 'Travel Assistance Fees Explained | AvioSupportDesk',
    description:
      'Understand our independent assistance fees, what they cover, and how they differ from airline, hotel, and Avion Rewards program charges quoted at checkout.',
    h1: 'Travel assistance fees',
    keywords: ['travel assistance fees', 'independent booking fees', 'AvioSupportDesk fees'],
  },
  [HOW_IT_WORKS_PATH]: {
    title: 'How Independent Booking Help Works | AvioSupportDesk',
    description:
      'Our process: you request help, we review eligibility and options, quote assistance in writing, and you complete program or airline actions in your own accounts.',
    h1: 'How independent booking help works',
    keywords: ['how booking assistance works', 'independent travel help process'],
  },
  [INDEPENDENT_SERVICE_DISCLOSURE_PATH]: {
    title: 'Independent Service Disclosure | AvioSupportDesk',
    description:
      'AvioSupportDesk is independent paid travel assistance—not RBC, Avion Rewards, or any airline. Learn what we can and cannot do with your loyalty accounts.',
    h1: 'Independent service disclosure',
    keywords: ['independent travel service', 'AvioSupportDesk disclosure', 'not affiliated RBC'],
  },
  [BLOG_PATH]: {
    title: 'Travel Tips & Airline Guides Blog | AvioSupportDesk',
    description:
      'Practical posts on flight refunds, reaching airlines through official channels, delay rights, changing bookings, and saving on airfare, reviewed for 2026.',
    h1: 'AvioSupportDesk Blog — Travel Tips & Airline Guides',
    keywords: ['travel blog', 'airline guides', 'flight help tips', 'AvioSupportDesk blog'],
  },
  [BLOG_CANCEL_FLIGHT_REFUND_PATH]: {
    title: 'How to Cancel a Flight & Get a Refund in 2026 | AvioSupportDesk',
    description:
      'Step by step: how to cancel a flight in 2026, when the 24-hour rule applies, and how to request a cash refund instead of a credit when the airline owes one.',
    h1: 'How to Cancel a Flight and Get a Refund in 2026',
    keywords: ['cancel flight refund', 'flight refund 2026', '24-hour cancellation'],
  },
  [BLOG_AIRLINE_CONTACT_GUIDE_PATH]: {
    title: 'How to Reach Airline Customer Service Safely | AvioSupportDesk',
    description:
      'How to reach airline customer service through official channels: what to prepare, where to find verified contact pages, and how to avoid lookalike numbers.',
    h1: 'How to Reach Airline Customer Service Through Official Channels',
    keywords: [
      'reach airline customer service',
      'official airline contact page',
      'avoid fake airline phone numbers',
    ],
  },
  [BLOG_DELAY_COMPENSATION_PATH]: {
    title: 'Flight Delay Compensation & Your Rights | AvioSupportDesk',
    description:
      'Understand U.S., Canadian, and EU delay rules, the difference between care and compensation, and how to document a claim with the airline after a delay.',
    h1: 'Flight Delay Compensation — Know Your Passenger Rights',
    keywords: ['flight delay compensation', 'passenger rights', 'EU261', 'APPR'],
  },
  [BLOG_CHANGE_FLIGHT_PATH]: {
    title: 'How to Change a Flight Booking, Step by Step | AvioSupportDesk',
    description:
      'Change a flight booking step by step: check fare rules, compare fees and fare differences, and know when same-day changes or free changes apply in 2026.',
    h1: 'How to Change Your Flight Booking — Step-by-Step Guide',
    keywords: ['change flight booking', 'flight change fees', 'rebook flight guide'],
  },
  [BLOG_SAVE_MONEY_FLIGHTS_PATH]: {
    title: 'Top 10 Tips to Save Money on Flights | AvioSupportDesk',
    description:
      'Ten practical ways to lower airfare in 2026, from flexible dates and nearby airports to fare brands and bag fees, without falling for fake deal traps.',
    h1: 'Top 10 Tips to Save Money on Flight Bookings',
    keywords: ['save money on flights', 'cheap flight tips', 'airfare savings'],
  },
  [ABOUT_PATH]: {
    title: 'About AvioSupportDesk — Independent Travel Assistance',
    description:
      'Learn how AvioSupportDesk provides independent phone help for flights, hotels, and Avion points questions. We are not a bank, an airline, or a hotel brand.',
    h1: 'About AvioSupportDesk, an Independent Travel Assistance Service',
    keywords: ['about AvioSupportDesk', 'independent travel assistance', 'travel support company'],
  },
  [CONTACT_PATH]: {
    title: 'Contact AvioSupportDesk — Independent Travel Help',
    description:
      'Contact AvioSupportDesk for independent flight, hotel, and Avion points assistance by phone, email, or inquiry form. Not affiliated with RBC or Avion Rewards.',
    h1: 'Contact AvioSupportDesk for independent travel help',
    keywords: ['contact flight support', 'travel helpline', 'call to book flights'],
  },
  [PRIVACY_POLICY_PATH]: {
    title: 'Privacy Policy — How We Use Your Data | AvioSupportDesk',
    description:
      'How AvioSupportDesk collects, uses, and protects contact details shared for travel help, how cookies work on this site, and how to make a privacy request.',
    h1: 'Privacy Policy — How AvioSupportDesk Protects Your Data',
    keywords: ['privacy policy', 'data protection', 'GDPR', 'CCPA', 'travel support privacy'],
  },
  [CANCELLATION_POLICY_PATH]: {
    title: 'Cancellation Policy — Booking Rules | AvioSupportDesk',
    description:
      'How cancellations work for bookings we assist with, including airline and hotel supplier rules, assistance fee terms, and what we can and cannot reverse.',
    h1: 'Cancellation Policy — Booking & Supplier Rules',
    keywords: ['cancellation policy', 'booking cancellation rules', 'travel cancel terms'],
  },
  [TERMS_PATH]: {
    title: 'Terms of Service — Travel Support Rules | AvioSupportDesk',
    description:
      'Review the AvioSupportDesk terms of service: independence from airlines and loyalty programs, assistance fees, refunds, and the limits of our liability.',
    h1: 'Terms of Service — AvioSupportDesk Service Rules',
    keywords: ['terms of service', 'travel assistance terms', 'independent travel support'],
  },
  [REFUND_POLICY_PATH]: {
    title: 'Refund Policy — Eligibility & Process | AvioSupportDesk',
    description:
      'Refund eligibility for AvioSupportDesk assistance fees, how supplier refund timelines work, and how we review refund requests and confirm the outcome.',
    h1: 'Refund Policy — Eligibility & Request Process',
    keywords: ['refund policy', 'travel refund process', 'booking refund help'],
  },
  [COOKIE_POLICY_PATH]: {
    title: 'Cookie Policy — Website Tracking Info | AvioSupportDesk',
    description:
      'How AvioSupportDesk uses cookies and similar technologies for site performance and analytics, which ones are optional, and how to manage your choices.',
    h1: 'Cookie Policy — How This Website Uses Cookies',
    keywords: ['cookie policy', 'website cookies', 'tracking disclosure'],
  },
}

export function getSeoPageMeta(path) {
  const meta = SEO_PAGE_META[path]
  if (!meta) {
    throw new Error(`Missing SEO_PAGE_META for path: ${path}`)
  }
  return meta
}

export function getSeoPageH1(path) {
  return getSeoPageMeta(path).h1
}
