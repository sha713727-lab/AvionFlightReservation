import {
  FaPlane,
  FaHotel,
  FaGift,
  FaExchangeAlt,
  FaBan,
  FaChair,
  FaSuitcase,
  FaRoute,
  FaUmbrellaBeach,
  FaHeadset,
  FaUserTie,
  FaBolt,
  FaShieldAlt,
  FaTag,
  FaAward,
} from 'react-icons/fa'
import {
  FLIGHT_BOOKING_SERVICE_IMAGE,
  HOTEL_BOOKING_SERVICE_IMAGE,
  REWARD_TRAVEL_SERVICE_IMAGE,
  FLIGHT_CHANGE_SERVICE_IMAGE,
  CANCELLATION_SERVICE_IMAGE,
  SEAT_SELECTION_SERVICE_IMAGE,
  BAGGAGE_SERVICE_IMAGE,
  TRIP_PLANNING_SERVICE_IMAGE,
  VACATION_PACKAGE_SERVICE_IMAGE,
} from '@/constants/images'

export const SERVICES = [
  {
    id: 'flights',
    title: 'Flight Booking',
    tagline: 'Exclusive fares and flexible routes to destinations worldwide.',
    description:
      'Our travel specialists help you book flights by phone across Canada, the USA, Europe, Mexico, and worldwide using the best available routes and fares.',
    features: [
      'Access to exclusive unpublished fares',
      'Multi-city and complex routing handled for you',
      'Business & first-class deals at economy prices',
      '24/7 support before, during, and after your flight',
    ],
    icon: FaPlane,
    image: FLIGHT_BOOKING_SERVICE_IMAGE,
    imageAlt: 'Flight booking by phone with Avion Flight Reservation',
  },
  {
    id: 'hotels',
    title: 'Hotel Booking',
    tagline: 'Handpicked stays from boutique hotels to luxury resorts.',
    description:
      'We arrange hotel reservations that match your style and budget, from city-center business hotels to secluded beachfront resorts.',
    features: [
      'Personally vetted hotel recommendations',
      'Member rates and exclusive perks',
      'Free upgrades when available',
      'Flexible cancellation options',
    ],
    icon: FaHotel,
    image: HOTEL_BOOKING_SERVICE_IMAGE,
    imageAlt: 'Hotel booking and hotel reservation service',
  },
  {
    id: 'rewards',
    title: 'Points Redemption Help',
    tagline: 'Maximize your points and miles for premium travel experiences.',
    description:
      'Turn airline miles and credit card rewards into travel. Our specialists help compare redemption options and book the trip that fits your points value.',
    features: [
      'Points & miles valuation and strategy',
      'Business-class redemptions on a budget',
      'Transfer partner optimization',
      'End-to-end redemption booking',
    ],
    icon: FaGift,
    image: REWARD_TRAVEL_SERVICE_IMAGE,
    imageAlt: 'Points redemption help for travel bookings',
  },
  {
    id: 'changes',
    title: 'Flight Changes',
    tagline: 'Quick rebooking and itinerary adjustments with expert support.',
    description:
      'Plans change — we handle flight change assistance, airline policy review, and rebooking support with minimal hassle.',
    features: [
      'Same-day change assistance',
      'Airline policy navigation on your behalf',
      'Alternative routing when flights cancel',
      'Credit and voucher management',
    ],
    icon: FaExchangeAlt,
    image: FLIGHT_CHANGE_SERVICE_IMAGE,
    imageAlt: 'Flight change assistance and rebooking support',
  },
  {
    id: 'cancellation',
    title: 'Cancellation',
    tagline: 'Hassle-free cancellations with guidance on refunds and credits.',
    description:
      'Need flight cancellation support? We manage refunds, credits, and supplier communication so every eligible option is reviewed.',
    features: [
      'Full cancellation handling',
      'Refund and credit recovery',
      'Travel insurance claim support',
      'Future travel credit tracking',
    ],
    icon: FaBan,
    image: CANCELLATION_SERVICE_IMAGE,
    imageAlt: 'Flight cancellation support for refunds and credits',
  },
  {
    id: 'seats',
    title: 'Seat Selection',
    tagline: 'Secure the best seats for comfort on every journey.',
    description:
      'From extra legroom to window seats and family seating together, we manage airline seat selection for a smoother journey.',
    features: [
      'Preferred seat assignments',
      'Extra legroom and exit row booking',
      'Family and group seating together',
      'Last-minute seat change assistance',
    ],
    icon: FaChair,
    image: SEAT_SELECTION_SERVICE_IMAGE,
    imageAlt: 'Airline seat selection assistance',
  },
  {
    id: 'baggage',
    title: 'Baggage',
    tagline: 'Extra baggage allowances and priority handling arranged for you.',
    description:
      'Avoid surprise fees at the airport. We arrange baggage booking, excess baggage, sports equipment transport, and priority handling in advance.',
    features: [
      'Pre-paid excess baggage booking',
      'Sports and oversized equipment transport',
      'Priority baggage handling',
      'Lost luggage claim assistance',
    ],
    icon: FaSuitcase,
    image: BAGGAGE_SERVICE_IMAGE,
    imageAlt: 'Baggage booking and excess baggage assistance',
  },
  {
    id: 'planning',
    title: 'Trip Planning',
    tagline: 'Custom itineraries crafted by experienced travel specialists.',
    description:
      'Tell us your travel goals and we build a custom trip planning itinerary with flights, hotels, transfers, activities, and local recommendations.',
    features: [
      'Fully customized day-by-day itineraries',
      'Local experience recommendations',
      'Ground transfers and logistics',
      'Real-time itinerary adjustments',
    ],
    icon: FaRoute,
    image: TRIP_PLANNING_SERVICE_IMAGE,
    imageAlt: 'Custom trip planning with flight and hotel support',
  },
  {
    id: 'packages',
    title: 'Vacation Packages',
    tagline: 'All-inclusive packages combining flights, hotels, and experiences.',
    description:
      'One call, one price, everything included. Our vacation packages bundle flight and hotel bookings with stays and experiences into seamless getaways.',
    features: [
      'Flight + hotel bundle savings',
      'Honeymoon and group packages',
      'All-inclusive resort bookings',
      'Guided tours and excursions add-ons',
    ],
    icon: FaUmbrellaBeach,
    image: VACATION_PACKAGE_SERVICE_IMAGE,
    imageAlt: 'Vacation packages with flight and hotel bookings',
  },
]

export const WHY_US = [
  { id: 'support', title: '24/7 Support', description: 'Round-the-clock assistance whenever you need it, wherever you are.', icon: FaHeadset },
  { id: 'agents', title: 'Expert Travel Agents', description: 'Certified travel specialists with years of industry experience.', icon: FaUserTie },
  { id: 'fast', title: 'Fast Flight Booking', description: 'Streamlined booking process — confirmed in minutes, not hours.', icon: FaBolt },
  { id: 'secure', title: 'Secure Payment', description: 'Bank-grade encryption and trusted payment partners.', icon: FaShieldAlt },
  { id: 'deals', title: 'Best Available Fares', description: 'Access to unpublished fares and exclusive partner rates.', icon: FaTag },
  { id: 'satisfaction', title: 'Customer Satisfaction', description: '98% success rate with thousands of happy travelers worldwide.', icon: FaAward },
]

export const STATS = [
  { value: 10000, suffix: '+', label: 'Happy Customers' },
  { value: 98, suffix: '%', label: 'Success Rate' },
  { value: 50, suffix: '+', label: 'Airline Partners' },
  { value: 24, suffix: '/7', label: 'Expert Support' },
]

export const STEPS = [
  { step: 1, title: 'Contact', description: 'Call or request help with your flight reservation needs.' },
  { step: 2, title: 'Discuss', description: 'Our specialist learns your preferences, budget, and timeline.' },
  { step: 3, title: 'Options', description: 'Receive curated flight options and fares tailored to you.' },
  { step: 4, title: 'Confirm', description: 'Review, approve, and secure your booking with confidence.' },
  { step: 5, title: 'Travel', description: 'Enjoy your journey with 24/7 support every step of the way.' },
]
