import { INTERNATIONAL_REGION_IMAGES } from '@/constants/images'

export const INTERNATIONAL_FLIGHT_REGIONS = [
  {
    id: 'europe',
    code: 'EU',
    name: 'Europe',
    description: 'Transatlantic & European cities',
    imageSrc: INTERNATIONAL_REGION_IMAGES.europe,
    imageAlt: 'Eiffel Tower in Paris, Europe',
  },
  {
    id: 'canada',
    code: 'CA',
    name: 'Canada Domestic',
    description: 'All major Canadian routes',
    imageSrc: INTERNATIONAL_REGION_IMAGES.canada,
    imageAlt: 'Toronto skyline, Canada',
  },
  {
    id: 'mexico',
    code: 'MX',
    name: 'Mexico & Cancun',
    description: 'Leisure & resort destinations',
    imageSrc: INTERNATIONAL_REGION_IMAGES.mexico,
    imageAlt: 'Tropical beach in Mexico',
  },
  {
    id: 'usa',
    code: 'US',
    name: 'United States',
    description: 'Domestic & cross-border routes',
    imageSrc: INTERNATIONAL_REGION_IMAGES.usa,
    imageAlt: 'New York City skyline at night',
  },
]

export const INTERNATIONAL_FLIGHT_STEPS = [
  {
    id: 'call',
    number: '01',
    title: 'Call Us',
    description:
      'Dial our number. A real specialist picks up — no hold queues, no automated menus.',
  },
  {
    id: 'share',
    number: '02',
    title: 'Share Your Trip',
    description: 'Tell us where you\'re going and when. We search available fares for you.',
  },
  {
    id: 'booked',
    number: '03',
    title: 'You\'re Booked',
    description: 'We confirm your ticket and send you the details. Done.',
  },
]
