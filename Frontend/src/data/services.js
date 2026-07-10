import {
  FaHeadset,
  FaUserTie,
  FaBolt,
  FaShieldAlt,
  FaTag,
  FaAward,
} from 'react-icons/fa'

export const WHY_US = [
  {
    id: 'support',
    title: '24/7 Support',
    description: 'Round-the-clock assistance whenever you need it, wherever you are.',
    icon: FaHeadset,
  },
  {
    id: 'agents',
    title: 'Expert Travel Specialists',
    description: 'Certified travel specialists with years of industry experience.',
    icon: FaUserTie,
  },
  {
    id: 'fast',
    title: 'Fast Flight Booking',
    description: 'Streamlined booking process — confirmed in minutes, not hours.',
    icon: FaBolt,
  },
  {
    id: 'secure',
    title: 'Secure Payment',
    description: 'Bank-grade encryption and trusted payment partners.',
    icon: FaShieldAlt,
  },
  {
    id: 'deals',
    title: 'Best Available Fares',
    description: 'Access to unpublished fares and exclusive partner rates.',
    icon: FaTag,
  },
  {
    id: 'satisfaction',
    title: 'Customer Satisfaction',
    description: '98% success rate with thousands of happy travelers worldwide.',
    icon: FaAward,
  },
]

export const STATS = [
  { value: 9995, suffix: '', label: 'Happy Customers', live: true },
  { value: 98, suffix: '%', label: 'Success Rate' },
  { value: 50, suffix: '+', label: 'Airline Partners' },
  { value: 24, suffix: '/7', label: 'Expert Support' },
]

export const STEPS = [
  {
    step: 1,
    title: 'Contact',
    description: 'Call or request help with your flight reservation needs.',
  },
  {
    step: 2,
    title: 'Discuss',
    description: 'Our specialist learns your preferences, budget, and timeline.',
  },
  {
    step: 3,
    title: 'Options',
    description: 'Receive curated flight options and fares tailored to you.',
  },
  {
    step: 4,
    title: 'Confirm',
    description: 'Review, approve, and secure your booking with confidence.',
  },
  {
    step: 5,
    title: 'Travel',
    description: 'Enjoy your journey with 24/7 support every step of the way.',
  },
]
