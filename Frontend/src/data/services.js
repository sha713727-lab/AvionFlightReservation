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
    title: 'Request',
    description: 'Call or submit an inquiry with itinerary basics—never passwords or OTPs.',
  },
  {
    step: 2,
    title: 'Options',
    description: 'We review eligibility and outline options within our stated assistance scope.',
  },
  {
    step: 3,
    title: 'Written quote',
    description: 'You receive our assistance fee and scope in writing before paid work begins.',
  },
  {
    step: 4,
    title: 'Accept',
    description: 'You approve the quote. You complete account-controlled steps yourself.',
  },
  {
    step: 5,
    title: 'Follow-up',
    description: 'We help document next steps within the agreed scope after you confirm an option.',
  },
]
