import {
  FaHeadset,
  FaUserTie,
  FaBolt,
  FaShieldAlt,
  FaSearchDollar,
  FaComments,
} from 'react-icons/fa'

export const WHY_US = [
  {
    id: 'support',
    title: 'Phone assistance available',
    description:
      'Reach a travel specialist by phone when you need booking help, changes, or trip questions during staffed hours.',
    icon: FaHeadset,
  },
  {
    id: 'agents',
    title: 'Independent travel assistance',
    description:
      'Specialists help compare options, explain supplier rules, and guide you through each booking step.',
    icon: FaUserTie,
  },
  {
    id: 'fast',
    title: 'Personalized booking support',
    description:
      'Share your dates, destinations, and preferences — we focus on clear options for your trip.',
    icon: FaBolt,
  },
  {
    id: 'secure',
    title: 'Clear booking guidance',
    description:
      'We explain fares, conditions, and our separate assistance fee before you confirm so you can decide with confidence.',
    icon: FaShieldAlt,
  },
  {
    id: 'deals',
    title: 'Flexible travel solutions',
    description:
      'Help with flights, hotels, points redemption requests, and itinerary planning based on your goals.',
    icon: FaSearchDollar,
  },
  {
    id: 'satisfaction',
    title: 'Dedicated customer assistance',
    description:
      'Independent support for booking questions, changes, cancellations, and supplier policy review.',
    icon: FaComments,
  },
]

export const VALUE_PROPS = [
  { label: 'Expert Travel Assistance' },
  { label: 'Personalized Booking Support' },
  { label: 'Flexible Travel Solutions' },
  { label: 'Dedicated Customer Assistance' },
]

export const STEPS = [
  {
    step: 1,
    title: 'Contact Us',
    description: 'Call or submit a request explaining your travel requirements—never passwords or OTPs.',
  },
  {
    step: 2,
    title: 'Understand Your Needs',
    description: 'A human specialist discusses your plans and the options that fit your trip.',
  },
  {
    step: 3,
    title: 'Review Available Options',
    description: 'We explain booking, points, and travel arrangements, including supplier charges.',
  },
  {
    step: 4,
    title: 'Approve the Assistance Fee',
    description: 'You receive a separate service-fee quotation. No paid work starts until you accept.',
  },
  {
    step: 5,
    title: 'Complete Your Arrangement',
    description: 'With your approval, we assist subject to supplier availability and program rules.',
  },
]
