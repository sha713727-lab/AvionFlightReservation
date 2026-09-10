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
  GUIDES_PATH,
  HOME_PATH,
  HOTEL_BOOKING_PATH,
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
    title: '24/7 Flight Support — Avio Support Desk | AvioSupportDesk',
    description:
      'Get 24/7 flight booking, cancellation & refund help from Avio Support Desk experts. Call now for instant airline support worldwide. Talk to an agent today!',
    h1: '24/7 Airline Customer Support & Flight Booking Help',
    keywords: [
      'flight support',
      'airline customer service',
      'book flights by phone',
      'Avio Support Desk',
    ],
  },
  [SERVICES_PATH]: {
    title: 'Travel Services: Flights, Hotels & More | AvioSupportDesk',
    description:
      'Explore phone booking for flights, hotels, points, changes & trip planning. Get clear help from specialists—call now for personalized travel support today!',
    h1: 'Flight & Travel Services — Book Support by Phone',
    keywords: ['travel services', 'flight booking help', 'hotel booking by phone'],
  },
  [DESTINATIONS_PATH]: {
    title: 'Popular Flight Destinations by Phone | AvioSupportDesk',
    description:
      'Browse Canada, USA, Europe & Mexico flight destinations and book by phone. Get route options fast—call now for destination booking help from our team!',
    h1: 'Popular Flight Destinations Across Canada, USA & Beyond',
    keywords: ['flight destinations', 'Canada flights', 'USA flights', 'Europe flights'],
  },
  [INTERNATIONAL_FLIGHT_PATH]: {
    title: 'International Flights Booked by Phone | AvioSupportDesk',
    description:
      'Book international flights by phone to Europe, Canada, Mexico & the USA. Compare itineraries with a specialist—call now for overseas booking help today!',
    h1: 'International Flights Booked by Phone',
    keywords: ['international flights', 'book flights by phone', 'transatlantic flights'],
  },
  [FLIGHT_BOOKING_PATH]: {
    title: 'Book Flights Fast — Phone Booking Help | AvioSupportDesk',
    description:
      'Book domestic & international flights by phone with clear fare guidance. Get itinerary options in minutes—call now for instant flight booking help today!',
    h1: 'Flight Booking Assistance — Book Any Airline by Phone',
    keywords: ['book flights', 'flight reservation by phone', 'airline booking help'],
  },
  [HOTEL_BOOKING_PATH]: {
    title: 'Hotel Booking Help by Phone — Reserve Now | AvioSupportDesk',
    description:
      'Reserve hotels by phone for business or leisure with room & cancel-rule guidance. Get the right stay faster—call now for hotel booking help from our team!',
    h1: 'Hotel Booking Help by Phone — Reserve Your Stay',
    keywords: ['hotel booking', 'book hotel by phone', 'hotel reservation help'],
  },
  [POINTS_REDEMPTION_PATH]: {
    title: 'Points & Miles Redemption Help | AvioSupportDesk',
    description:
      'Redeem airline miles & travel points with expert phone guidance on awards & taxes. Avoid wasted points—call now for redemption help and book smarter today!',
    h1: 'Points & Miles Redemption Help by Phone',
    keywords: ['points redemption', 'miles redemption', 'award travel help'],
  },
  [FLIGHT_CHANGES_PATH]: {
    title: 'Flight Change Assistance — Rebook Fast | AvioSupportDesk',
    description:
      'Need to change dates, times or routes? We explain airline fees & rebooking options by phone. Call now for flight change help and update your trip today!',
    h1: 'Flight Change Assistance — Rebook Any Airline Flight',
    keywords: ['flight change', 'rebook flight', 'airline change fee help'],
  },
  [FLIGHT_CANCELLATION_PATH]: {
    title: 'Flight Cancellation & Refund Help | AvioSupportDesk',
    description:
      'Cancel flights with phone guidance on refunds, credits & airline rules. Maximize what you can recover—call now for instant cancellation help, 24/7 support!',
    h1: 'Flight Cancellation Assistance — Cancel Any Airline Flight',
    keywords: ['flight cancellation', 'flight refund help', 'cancel airline ticket'],
  },
  [SEAT_SELECTION_PATH]: {
    title: 'Airline Seat Selection Help by Phone | AvioSupportDesk',
    description:
      'Choose seats, seat families together & understand paid seat fees before you fly. Get clear seat-map help—call now for seat selection assistance today!',
    h1: 'Airline Seat Selection Help by Phone',
    keywords: ['seat selection', 'airline seats', 'choose flight seats'],
  },
  [BAGGAGE_ASSISTANCE_PATH]: {
    title: 'Baggage Fees & Bag Allowance Help | AvioSupportDesk',
    description:
      'Understand carry-on limits, checked bag fees & special-item rules before airport day. Avoid surprise fees—call now for baggage policy help from experts!',
    h1: 'Baggage Fees & Allowance Assistance by Phone',
    keywords: ['baggage allowance', 'checked bag fees', 'carry-on rules'],
  },
  [TRIP_PLANNING_PATH]: {
    title: 'Trip Planning by Phone — Custom Itineraries | AvioSupportDesk',
    description:
      'Plan multi-city trips and connections with specialist phone support. Build a clearer itinerary—call now for trip planning help today!',
    h1: 'Trip Planning by Phone — Custom Travel Itineraries',
    keywords: ['trip planning', 'custom itinerary', 'multi-city travel'],
  },
  [GUIDES_PATH]: {
    title: 'Travel Guides: Booking, Changes & More | AvioSupportDesk',
    description:
      'Read plain-language guides on booking, changes, cancellations, bags & points. Learn fast, then get help—call now when you need specialist booking support!',
    h1: 'Travel Guides for Flight Booking & Airline Help',
    keywords: ['travel guides', 'flight booking guide', 'airline help guides'],
  },
  [GUIDE_FLIGHT_BOOKING_PATH]: {
    title: 'How to Book a Flight by Phone Guide | AvioSupportDesk',
    description:
      'Step-by-step guide to booking flights by phone: what to prepare, fares & timing. Ready to book? Call now for live specialist help and confirm your trip today!',
    h1: 'How to Book a Flight by Phone — Complete Guide',
    keywords: ['how to book a flight', 'phone booking guide', 'flight reservation steps'],
  },
  [GUIDE_FLIGHT_CHANGES_PATH]: {
    title: 'How Airline Flight Changes Work | AvioSupportDesk',
    description:
      'Learn how flight changes, fees & fare differences work before you rebook. Need your trip updated? Call now for change assistance from our phone specialists!',
    h1: 'How Airline Flight Changes Work — Traveler Guide',
    keywords: ['flight change guide', 'airline change rules', 'rebooking explained'],
  },
  [GUIDE_FLIGHT_CANCELLATIONS_PATH]: {
    title: 'Flight Cancellation & Refunds Guide | AvioSupportDesk',
    description:
      'Understand cancellations, refunds vs credits & what airlines usually allow. Need to cancel now? Call for expert cancellation help and protect your options!',
    h1: 'Flight Cancellation & Refunds Guide for Travelers',
    keywords: ['cancellation guide', 'flight refund guide', 'airline credit vs refund'],
  },
  [GUIDE_BAGGAGE_PATH]: {
    title: 'Airline Baggage Rules Explained | AvioSupportDesk',
    description:
      'Carry-on, checked bags & fee basics explained for North American trips. Unsure about your allowance? Call now for baggage help before you pay airport fees!',
    h1: 'Airline Baggage Rules Explained — Fees & Limits',
    keywords: ['baggage rules', 'carry-on guide', 'checked luggage fees'],
  },
  [GUIDE_POINTS_PATH]: {
    title: 'Points & Miles Basics for Flights | AvioSupportDesk',
    description:
      'Learn transfers, award space, taxes & when cash beats points on flights. Ready to redeem smarter? Call now for points guidance and book the better option!',
    h1: 'Points & Miles Basics for Flight Travel',
    keywords: ['points and miles guide', 'award travel basics', 'transfer partners'],
  },
  [BLOG_PATH]: {
    title: 'Travel Tips, Airline Guides & Flight Help | AvioSupportDesk Blog',
    description:
      'Read AvioSupportDesk blog posts on flight refunds, airline contacts, delay rights, changes & booking savings. Call now when you need specialist phone support!',
    h1: 'AvioSupportDesk Blog — Travel Tips & Airline Guides',
    keywords: ['travel blog', 'airline guides', 'flight help tips', 'AvioSupportDesk blog'],
  },
  [BLOG_CANCEL_FLIGHT_REFUND_PATH]: {
    title: 'Cancel a Flight & Get a Full Refund in 2026 | AvioSupportDesk',
    description:
      'Learn when airlines owe cash refunds vs credits, how 24-hour windows work, and cancel steps for 2026. Need help now? Call AvioSupportDesk for cancel support!',
    h1: 'How to Cancel a Flight and Get a Full Refund in 2026',
    keywords: ['cancel flight refund', 'flight refund 2026', '24-hour cancellation'],
  },
  [BLOG_AIRLINE_CONTACT_GUIDE_PATH]: {
    title: 'Airline Customer Service Numbers Guide | AvioSupportDesk',
    description:
      'Reach airline customer service safely: what to prepare, official contact pages, and when phone beats the app. Call AvioSupportDesk for independent booking help!',
    h1: 'Airlines Customer Service Numbers — Complete Contact Guide',
    keywords: ['airline customer service numbers', 'airline phone contact', 'call airline help'],
  },
  [BLOG_DELAY_COMPENSATION_PATH]: {
    title: 'Flight Delay Compensation & Passenger Rights | AvioSupportDesk',
    description:
      'Understand U.S., Canadian & EU delay rights, care vs compensation, and how to document claims. Need rebooking help after a delay? Call AvioSupportDesk now!',
    h1: 'Flight Delay Compensation — Know Your Passenger Rights',
    keywords: ['flight delay compensation', 'passenger rights', 'EU261', 'APPR'],
  },
  [BLOG_CHANGE_FLIGHT_PATH]: {
    title: 'Change Your Flight Booking — Step-by-Step | AvioSupportDesk',
    description:
      'Change flight bookings with clear steps on fees, fare differences, and same-day options. Ready to rebook? Call AvioSupportDesk for help!',
    h1: 'How to Change Your Flight Booking — Step-by-Step Guide',
    keywords: ['change flight booking', 'flight change fees', 'rebook flight guide'],
  },
  [BLOG_SAVE_MONEY_FLIGHTS_PATH]: {
    title: 'Top 10 Tips to Save Money on Flights | AvioSupportDesk',
    description:
      'Ten practical ways to lower airfare in 2026—dates, airports, fare brands, and bags—without fake deal traps. Call AvioSupportDesk to compare.',
    h1: 'Top 10 Tips to Save Money on Flight Bookings',
    keywords: ['save money on flights', 'cheap flight tips', 'airfare savings'],
  },
  [ABOUT_PATH]: {
    title: 'About AvioSupportDesk — Trusted Travel Support Since 2026',
    description:
      'Learn how AvioSupportDesk provides independent phone help for flights, hotels & trip questions. Not a bank or airline—call now to talk with a specialist today!',
    h1: 'About AvioSupportDesk — Your Trusted Travel Support Partner',
    keywords: ['about AvioSupportDesk', 'independent travel assistance', 'travel support company'],
  },
  [CONTACT_PATH]: {
    title: 'Contact Us — 24/7 Flight Support Helpline | AvioSupportDesk',
    description:
      'Contact AvioSupportDesk for 24/7 flight booking & airline support by phone. Reach a specialist fast—call now for booking, changes, refunds or trip questions!',
    h1: 'Contact AvioSupportDesk — Get Instant Flight Support',
    keywords: ['contact flight support', 'travel helpline', 'call to book flights'],
  },
  [PRIVACY_POLICY_PATH]: {
    title: 'Privacy Policy — Your Data Protection | AvioSupportDesk',
    description:
      'Read how AvioSupportDesk collects and uses contact details for travel help, cookies, and privacy requests. Questions? Call our team today.',
    h1: 'Privacy Policy — How AvioSupportDesk Protects Your Data',
    keywords: ['privacy policy', 'data protection', 'GDPR', 'CCPA', 'travel support privacy'],
  },
  [CANCELLATION_POLICY_PATH]: {
    title: 'Cancellation Policy — Booking Rules | AvioSupportDesk',
    description:
      'See how cancellations work for bookings we assist with, including supplier rules and limits. Need to cancel? Call for guidance now.',
    h1: 'Cancellation Policy — Booking & Supplier Rules',
    keywords: ['cancellation policy', 'booking cancellation rules', 'travel cancel terms'],
  },
  [TERMS_PATH]: {
    title: 'Terms of Service — Travel Support Rules | AvioSupportDesk',
    description:
      'Review AvioSupportDesk terms: independent of airlines, fees, refunds, and liability limits. Need clarity? Call and ask a specialist.',
    h1: 'Terms of Service — AvioSupportDesk Service Rules',
    keywords: ['terms of service', 'travel assistance terms', 'independent travel support'],
  },
  [REFUND_POLICY_PATH]: {
    title: 'Refund Policy — Eligibility & Process | AvioSupportDesk',
    description:
      'Learn refund eligibility, supplier timelines & how refund requests are reviewed. Need a refund check? Call now for refund help and clear next steps today!',
    h1: 'Refund Policy — Eligibility & Request Process',
    keywords: ['refund policy', 'travel refund process', 'booking refund help'],
  },
  [COOKIE_POLICY_PATH]: {
    title: 'Cookie Policy — Website Tracking Info | AvioSupportDesk',
    description:
      'See how cookies support browsing & site performance on AvioSupportDesk. Prefer human help instead? Call now for phone support with your travel request today!',
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
