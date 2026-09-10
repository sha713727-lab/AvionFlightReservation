import { INTERNATIONAL_REGION_IMAGES } from '@/constants/images'

export const INTERNATIONAL_FLIGHT_REGIONS = [
  {
    id: 'europe',
    code: 'EU',
    name: 'Europe',
    description: 'Transatlantic & European cities',
    imageSrc: INTERNATIONAL_REGION_IMAGES.europe,
    imageAlt: 'Eiffel Tower in Paris for Europe international flight booking',
  },
  {
    id: 'canada',
    code: 'CA',
    name: 'Canada Domestic',
    description: 'All major Canadian routes',
    imageSrc: INTERNATIONAL_REGION_IMAGES.canada,
    imageAlt: 'Toronto skyline for Canada domestic flight booking',
  },
  {
    id: 'mexico',
    code: 'MX',
    name: 'Mexico & Cancun',
    description: 'Leisure & resort destinations',
    imageSrc: INTERNATIONAL_REGION_IMAGES.mexico,
    imageAlt: 'Tropical Cancun beach for Mexico vacation flight booking',
  },
  {
    id: 'usa',
    code: 'US',
    name: 'United States',
    description: 'Domestic & cross-border routes',
    imageSrc: INTERNATIONAL_REGION_IMAGES.usa,
    imageAlt: 'New York City skyline for USA flight booking by phone',
  },
]

export const INTERNATIONAL_FLIGHT_STEPS = [
  {
    id: 'call',
    number: '01',
    title: 'Call Us',
    description:
      'Dial our number. A travel specialist answers your call to discuss your trip.',
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
