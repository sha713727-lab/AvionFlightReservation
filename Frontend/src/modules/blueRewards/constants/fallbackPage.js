import { CONTACT_PATH, SERVICE_FEES_PATH } from '@/constants/routes'

/** Pack WebPs from `public/blue-rewards` (Blue_Rewards_Page_Image_Pack). */
export const BLUE_REWARDS_MEDIA = {
  lead: {
    mediaUrl: '/blue-rewards/01-lead-airport-journey.webp',
    alt: 'Traveller overlooking a passenger aircraft from a bright airport departure lounge.',
    focalX: 0.5,
    focalY: 0.5,
  },
  pairALeft: {
    mediaUrl: '/blue-rewards/02-pair-a-left-oceanview-stay.webp',
    alt: 'Ocean-view hotel suite with linen bedding and an open balcony.',
    focalX: 0.5,
    focalY: 0.5,
  },
  pairARight: {
    mediaUrl: '/blue-rewards/03-pair-a-right-coastal-discovery.webp',
    alt: 'Stone steps leading through a coastal village towards a blue harbour.',
    focalX: 0.5,
    focalY: 0.5,
  },
  pairBLeft: {
    mediaUrl: '/blue-rewards/04-pair-b-left-scenic-road-trip.webp',
    alt: 'Blue SUV at a scenic mountain-lake turnout beside a winding road.',
    focalX: 0.5,
    focalY: 0.5,
  },
  pairBRight: {
    mediaUrl: '/blue-rewards/05-pair-b-right-cruise-horizon.webp',
    alt: 'Cruise-ship loungers overlooking a calm sea and distant islands.',
    focalX: 0.5,
    focalY: 0.5,
  },
  railPhoto: {
    mediaUrl: '/blue-rewards/06-rail-travel-planning.webp',
    alt: 'Traveller reviewing plans on a laptop in an airport lounge.',
    focalX: 0.5,
    focalY: 0.42,
  },
}

/** Used when the CMS API is unavailable so the public route still renders. */
export function getFallbackBlueRewardsPage() {
  return {
    id: 'default',
    status: 'published',
    metaTitle: 'Blue Rewards Travel Redemption Help | AvioSupportDesk',
    metaDescription:
      'Get independent help with Blue Rewards travel redemption. Compare travel options, understand points and cash costs, and follow the official booking process.',
    ogTitle: 'Blue Rewards Travel Redemption Help | AvioSupportDesk',
    ogDescription:
      'Independent guidance for Blue Rewards travel redemption. Compare points and cash costs, then book through official channels. Not affiliated with Blue Rewards or BMO.',
    heroHeading: 'Blue Rewards Travel Redemption Assistance',
    heroIntroduction:
      'Put your Blue Points towards your next trip.\n\nPlanning a getaway with your rewards? AvioSupportDesk helps you understand your travel options, compare points against cash prices, and review the details before you redeem.\n\nGet personalised guidance for your destination, dates and budget while keeping control of your Blue Rewards account. We are an independent paid travel-assistance service, not affiliated with Blue Rewards or BMO.',
    heroPrimaryCtaLabel: 'Get Redemption Guidance',
    heroSecondaryCtaLabel: 'View Our Service Fees',
    heroSecondaryCtaHref: SERVICE_FEES_PATH,
    officialLinkLabel: 'Visit the official Blue Rewards Travel website',
    officialLinkHref: 'https://travel.bluerewards.ca/',
    storyLabel: 'A clearer way to plan travel with your points',
    storyParagraphs: [
      'A points balance is only the starting point. Your travel dates, preferred route, accommodation needs and remaining cash costs all matter when choosing a redemption.',
      'We help you review the options available for your trip and understand what each includes. Whether you are comparing flights, planning a hotel stay or considering a package, our guidance helps you make an informed decision before confirming your booking.',
    ],
    storyCtaLabel: 'Request Travel Redemption Help',
    storyCtaHref: CONTACT_PATH,
    principlesHeading: 'How our redemption assistance works',
    clientsEnabled: false,
    clientsHeading: '',
    clientsIntroduction: '',
    railLabel: 'Understand the total before you redeem',
    contactEmailOverride: null,
    mediaSlots: [
      {
        id: 'lead',
        slotKey: 'lead',
        mediaUrl: BLUE_REWARDS_MEDIA.lead.mediaUrl,
        alt: BLUE_REWARDS_MEDIA.lead.alt,
        focalX: BLUE_REWARDS_MEDIA.lead.focalX,
        focalY: BLUE_REWARDS_MEDIA.lead.focalY,
      },
      {
        id: 'aL',
        slotKey: 'pairALeft',
        mediaUrl: BLUE_REWARDS_MEDIA.pairALeft.mediaUrl,
        alt: BLUE_REWARDS_MEDIA.pairALeft.alt,
        focalX: BLUE_REWARDS_MEDIA.pairALeft.focalX,
        focalY: BLUE_REWARDS_MEDIA.pairALeft.focalY,
      },
      {
        id: 'aR',
        slotKey: 'pairARight',
        mediaUrl: BLUE_REWARDS_MEDIA.pairARight.mediaUrl,
        alt: BLUE_REWARDS_MEDIA.pairARight.alt,
        focalX: BLUE_REWARDS_MEDIA.pairARight.focalX,
        focalY: BLUE_REWARDS_MEDIA.pairARight.focalY,
      },
      {
        id: 'bL',
        slotKey: 'pairBLeft',
        mediaUrl: BLUE_REWARDS_MEDIA.pairBLeft.mediaUrl,
        alt: BLUE_REWARDS_MEDIA.pairBLeft.alt,
        focalX: BLUE_REWARDS_MEDIA.pairBLeft.focalX,
        focalY: BLUE_REWARDS_MEDIA.pairBLeft.focalY,
      },
      {
        id: 'bR',
        slotKey: 'pairBRight',
        mediaUrl: BLUE_REWARDS_MEDIA.pairBRight.mediaUrl,
        alt: BLUE_REWARDS_MEDIA.pairBRight.alt,
        focalX: BLUE_REWARDS_MEDIA.pairBRight.focalX,
        focalY: BLUE_REWARDS_MEDIA.pairBRight.focalY,
      },
    ],
    principles: [
      {
        id: 'p1',
        numberLabel: '01',
        title: 'Tell us about your trip',
        description:
          'Share your destination, departure city, travel dates, number of travellers and approximate Blue Points balance. Let us know whether your dates are flexible and how much you are comfortable paying alongside your points.',
        sortOrder: 1,
        isEnabled: true,
      },
      {
        id: 'p2',
        numberLabel: '02',
        title: 'Review your assistance quote',
        description:
          'We explain the help we can provide and give you a written quote before paid work begins. Your quote identifies our assistance fee, currency and agreed scope.',
        sortOrder: 2,
        isEnabled: true,
      },
      {
        id: 'p3',
        numberLabel: '03',
        title: 'Compare your options',
        description:
          'We help review the options we can evaluate, including points required, remaining cash costs, travel arrangements and relevant restrictions.',
        sortOrder: 3,
        isEnabled: true,
      },
      {
        id: 'p4',
        numberLabel: '04',
        title: 'Complete your booking through official channels',
        description:
          'You sign in to your own account and complete the redemption through the official booking process. We can explain the steps while you retain control of your account and final decision.',
        sortOrder: 4,
        isEnabled: true,
      },
    ],
    railCards: [
      {
        id: 'r0',
        cardType: 'photo',
        title: '',
        body: '',
        linkLabel: null,
        linkHref: null,
        factValue: null,
        mediaUrl: BLUE_REWARDS_MEDIA.railPhoto.mediaUrl,
        mediaAlt: BLUE_REWARDS_MEDIA.railPhoto.alt,
        sortOrder: 0,
        isEnabled: true,
      },
      {
        id: 'r1',
        cardType: 'standard',
        title: 'Look beyond the points total',
        body: 'A useful comparison looks beyond the number of points displayed. Blue Points can cover eligible booking costs, including taxes and fees, with exceptions for cruises and charges payable at the property. A credit card may still be required. Always review the final payment breakdown before confirming.',
        linkLabel: null,
        linkHref: null,
        factValue: null,
        mediaUrl: null,
        mediaAlt: '',
        sortOrder: 1,
        isEnabled: true,
      },
      {
        id: 'r2',
        cardType: 'partnership',
        title: 'Our assistance fee',
        body: 'Our separately quoted assistance fee is independent of travel and programme charges.',
        linkLabel: 'View Our Service Fees',
        linkHref: SERVICE_FEES_PATH,
        factValue: null,
        mediaUrl: null,
        mediaAlt: '',
        sortOrder: 2,
        isEnabled: true,
      },
    ],
    properties: [
      {
        id: 'pr1',
        title: 'Flights',
        blurb:
          'Compare departure times, connections, cabin options and baggage conditions to find a journey that suits your plans.',
        mediaUrl: null,
        mediaAlt: '',
        sortOrder: 1,
        isEnabled: true,
      },
      {
        id: 'pr2',
        title: 'Hotels and stays',
        blurb:
          'Review location, room type, included amenities and cancellation terms before choosing where to stay.',
        mediaUrl: null,
        mediaAlt: '',
        sortOrder: 2,
        isEnabled: true,
      },
      {
        id: 'pr3',
        title: 'Car rentals',
        blurb:
          'Understand vehicle categories, pickup arrangements, mileage conditions and charges payable at the rental counter.',
        mediaUrl: null,
        mediaAlt: '',
        sortOrder: 3,
        isEnabled: true,
      },
      {
        id: 'pr4',
        title: 'Travel packages',
        blurb:
          'Consider flights and accommodation together, checking the complete itinerary, inclusions and conditions before committing.',
        mediaUrl: null,
        mediaAlt: '',
        sortOrder: 4,
        isEnabled: true,
      },
      {
        id: 'pr5',
        title: 'Activities and experiences',
        blurb:
          'Explore eligible activities for your destination and check dates, admission details and cancellation conditions.',
        mediaUrl: null,
        mediaAlt: '',
        sortOrder: 5,
        isEnabled: true,
      },
      {
        id: 'pr6',
        title: 'Cruises',
        blurb:
          'Explore cruise redemption options through Blue Rewards’ cruise partner, redtag.ca. Cruise bookings have separate minimum-points and payment requirements.',
        mediaUrl: null,
        mediaAlt: '',
        sortOrder: 6,
        isEnabled: true,
      },
    ],
    faqs: [
      {
        id: 'bf1',
        question: 'How do I redeem Blue Points for travel?',
        answer:
          'Sign in through the official Blue Rewards website, open the travel section and search for your preferred trip. Review the available payment options and complete the booking through the official checkout. We provide optional guidance throughout your decision-making process.',
        sortOrder: 1,
        isEnabled: true,
      },
      {
        id: 'bf2',
        question: 'Can you redeem my points over the phone?',
        answer:
          'We can explain your options and booking steps by phone. You complete the online redemption through the official Blue Rewards channels. We do not take control of your rewards account or request your password or one-time verification codes.',
        sortOrder: 2,
        isEnabled: true,
      },
      {
        id: 'bf3',
        question: 'Do I have to pay AvioSupportDesk to use my points?',
        answer:
          'No. Our assistance is optional. You can use the official Blue Rewards booking channels yourself. If you choose our help, we explain our separate assistance fee before you agree. Travel costs and any programme or supplier charges remain separate.',
        sortOrder: 3,
        isEnabled: true,
      },
    ],
    clientLogos: [],
    updatedAt: new Date(0).toISOString(),
  }
}
