import { CONTACT_PATH } from '@/constants/routes'

const HOTEL_LEAD =
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=2200&q=70'
const PAIR_A_LEFT =
  'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&q=70'
const PAIR_A_RIGHT =
  'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1200&q=70'
const PAIR_B_LEFT =
  'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=70'
const PAIR_B_RIGHT =
  'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=70'
const RAIL_PHOTO =
  'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1000&q=70'

/** Used when the CMS API is unavailable so the public route still renders. */
export function getFallbackWyndhamPage() {
  return {
    id: 'default',
    status: 'published',
    metaTitle: 'Wyndham Hotels Booking Help by Phone | AvioSupportDesk',
    metaDescription:
      'Independent phone help booking Wyndham hotels in Atlanta, New Orleans, San Diego, Philadelphia, and more. Not affiliated with Wyndham Hotels & Resorts.',
    ogTitle: 'Wyndham Hotels Booking Help by Phone | AvioSupportDesk',
    ogDescription:
      'Independent specialists help you compare and book Wyndham hotel stays by phone. Clear fees before you agree.',
    heroHeading: 'Book Wyndham stays with clearer phone help.',
    heroIntroduction:
      'AvioSupportDesk helps travelers review dates, rates, and options at Wyndham hotels and resorts—then book with a specialist by phone. We are an independent desk, not Wyndham Customer Care.',
    storyLabel: 'Wyndham hotel help',
    storyParagraphs: [
      'Travelers search for specific Wyndham properties—Atlanta Buckhead, New Orleans French Quarter, DFW Airport, San Diego Bayside, Deerfield Beach Resort, Philadelphia Historic District, Virginia Beach Oceanfront, and Houston near NRG Park—then need a clear next step to secure the stay.',
      'Our specialists help you compare hotel options, confirm room needs, and complete the reservation by phone. Assistance fees are quoted before you agree and are separate from hotel charges.',
      'Whether you need a conference hotel, oceanfront resort, airport stay, or city-center property, we focus on practical booking help—not loyalty account access or official brand support.',
    ],
    storyCtaLabel: 'Talk about your hotel stay',
    storyCtaHref: CONTACT_PATH,
    principlesHeading: 'How we help with Wyndham stays',
    clientsEnabled: false,
    clientsHeading: 'Partners and trusted travel brands',
    clientsIntroduction:
      'Approved partner marks appear here when available. Hotel brand names identify booking requests only.',
    railLabel: 'A closer look at booking help',
    contactEmailOverride: null,
    mediaSlots: [
      { id: 'lead', slotKey: 'lead', mediaUrl: HOTEL_LEAD, alt: 'Modern hotel lobby for a Wyndham-style stay', focalX: 0.5, focalY: 0.5 },
      { id: 'aL', slotKey: 'pairALeft', mediaUrl: PAIR_A_LEFT, alt: 'Hotel exterior for property booking research', focalX: 0.5, focalY: 0.4 },
      { id: 'aR', slotKey: 'pairARight', mediaUrl: PAIR_A_RIGHT, alt: 'Hotel guest room detail', focalX: 0.5, focalY: 0.5 },
      { id: 'bL', slotKey: 'pairBLeft', mediaUrl: PAIR_B_LEFT, alt: 'Resort pool for leisure hotel stays', focalX: 0.5, focalY: 0.45 },
      { id: 'bR', slotKey: 'pairBRight', mediaUrl: PAIR_B_RIGHT, alt: 'Hotel suite bedroom', focalX: 0.5, focalY: 0.5 },
    ],
    principles: [
      { id: 'p1', numberLabel: '01', title: 'Clarify the stay', description: 'We start with dates, location, room needs, and budget so every Wyndham or nearby hotel option supports a clear goal.', sortOrder: 1, isEnabled: true },
      { id: 'p2', numberLabel: '02', title: 'Compare with context', description: 'Specialists help you weigh property fit—airport, downtown, resort, or conference—against rate and cancellation terms.', sortOrder: 2, isEnabled: true },
      { id: 'p3', numberLabel: '03', title: 'Book by phone', description: 'When you are ready, we complete the reservation by phone with confirmation details and next steps you can keep.', sortOrder: 3, isEnabled: true },
      { id: 'p4', numberLabel: '04', title: 'Keep fees transparent', description: 'Our assistance fee is quoted before paid work begins and remains separate from hotel and program charges.', sortOrder: 4, isEnabled: true },
      { id: 'p5', numberLabel: '05', title: 'Stay independent', description: 'We are not Wyndham Hotels & Resorts, Wyndham Rewards, or any hotel brand hotline—hotel names identify your request only.', sortOrder: 5, isEnabled: true },
      { id: 'p6', numberLabel: '06', title: 'Support after booking', description: 'Need a change, add-on, or follow-up question? Call again with your confirmation so we can help you take the next practical step.', sortOrder: 6, isEnabled: true },
    ],
    railCards: [
      { id: 'r1', cardType: 'photo', title: '', body: '', linkLabel: null, linkHref: null, factValue: null, mediaUrl: RAIL_PHOTO, mediaAlt: 'Resort pathway for leisure hotel booking', sortOrder: 1, isEnabled: true },
      { id: 'r2', cardType: 'partnership', title: 'From first dates to confirmation', body: 'Share your destination, travel window, and room needs—we bring clarity to the hotel options ahead.', linkLabel: 'Start a conversation', linkHref: CONTACT_PATH, factValue: null, mediaUrl: null, mediaAlt: '', sortOrder: 2, isEnabled: true },
      { id: 'r3', cardType: 'capabilities', title: 'Hotels, flights, and trip planning', body: 'Strategy for the stay, booking support, and related flight help when your trip needs both.', linkLabel: null, linkHref: null, factValue: null, mediaUrl: null, mediaAlt: '', sortOrder: 3, isEnabled: true },
      { id: 'r4', cardType: 'standard', title: 'Clear scope', body: 'Useful feedback. A shared understanding of what comes next before any fee is charged.', linkLabel: null, linkHref: null, factValue: null, mediaUrl: null, mediaAlt: '', sortOrder: 4, isEnabled: true },
    ],
    properties: [
      { id: 'pr1', title: 'Wyndham Atlanta Buckhead Hotel & Conference Center', blurb: 'Conference and Buckhead stays—help comparing dates, meeting needs, and nearby Atlanta hotel options by phone.', mediaUrl: null, mediaAlt: '', sortOrder: 1, isEnabled: true },
      { id: 'pr2', title: 'Wyndham New Orleans - French Quarter', blurb: 'French Quarter hotel booking help for leisure and event travel, including nearby New Orleans stay options.', mediaUrl: null, mediaAlt: '', sortOrder: 2, isEnabled: true },
      { id: 'pr3', title: 'Wyndham DFW Airport', blurb: 'Irving / DFW airport overnight stays—specialists help lock room nights around early flights and connections.', mediaUrl: null, mediaAlt: '', sortOrder: 3, isEnabled: true },
      { id: 'pr4', title: 'Wyndham San Diego Bayside', blurb: 'North Harbor Drive and downtown San Diego bayfront hotel help for leisure and business trips.', mediaUrl: null, mediaAlt: '', sortOrder: 4, isEnabled: true },
      { id: 'pr5', title: 'Wyndham Deerfield Beach Resort', blurb: 'Oceanfront Deerfield Beach resort booking assistance for Florida leisure stays and family trips.', mediaUrl: null, mediaAlt: '', sortOrder: 5, isEnabled: true },
      { id: 'pr6', title: 'Wyndham Philadelphia Historic District', blurb: 'Arch Street / historic district hotel help for center-city Philadelphia visits and weekend stays.', mediaUrl: null, mediaAlt: '', sortOrder: 6, isEnabled: true },
      { id: 'pr7', title: 'Wyndham Virginia Beach Oceanfront', blurb: 'Virginia Beach oceanfront hotel booking help for beach weekends and longer leisure stays.', mediaUrl: null, mediaAlt: '', sortOrder: 7, isEnabled: true },
      { id: 'pr8', title: 'Wyndham Houston Near NRG Park / Medical Center', blurb: 'Houston medical center and NRG Park area hotel assistance for events, appointments, and overnight stays.', mediaUrl: null, mediaAlt: '', sortOrder: 8, isEnabled: true },
    ],
    faqs: [
      {
        id: 'wf1',
        question: 'Is AvioSupportDesk part of Wyndham Hotels & Resorts?',
        answer:
          'No. AvioSupportDesk is an independent travel assistance service. We are not affiliated with, authorized by, or endorsed by Wyndham Hotels & Resorts or Wyndham Rewards. Hotel names identify booking requests only. Our assistance fee is quoted before you agree and is separate from hotel charges.',
        sortOrder: 1,
        isEnabled: true,
      },
      {
        id: 'wf2',
        question: 'Do you need my Wyndham Rewards login?',
        answer:
          'No. We never ask for loyalty passwords or account access. You keep control of your rewards login. We help compare publicly available rates and complete permitted booking steps after you accept a written assistance-fee quote.',
        sortOrder: 2,
        isEnabled: true,
      },
      {
        id: 'wf3',
        question: 'Which Wyndham sub-brands can you help with?',
        answer:
          'We can help you review stays at Wyndham hotels and related properties travelers commonly request, including city, airport, and resort locations listed on this page. Brand names identify the hotel you want. We are not the hotel’s reservations desk.',
        sortOrder: 3,
        isEnabled: true,
      },
      {
        id: 'wf4',
        question: 'Are your rates lower than booking direct with Wyndham?',
        answer:
          'We do not claim lower rates than booking on the hotel website. We help you compare available options and complete a reservation by phone. Hotel charges remain the hotel’s. Our assistance fee is separate and is quoted before you agree.',
        sortOrder: 4,
        isEnabled: true,
      },
      {
        id: 'wf5',
        question: 'How do Wyndham hotel changes and cancellations work?',
        answer:
          'Hotel change and cancellation rules belong to the property and the rate you booked. We can explain those rules in plain language and help you request a permitted change. Our assistance fee is quoted before paid work begins and stays separate from hotel charges.',
        sortOrder: 5,
        isEnabled: true,
      },
    ],
    clientLogos: [],
    updatedAt: '2026-10-09T00:00:00.000Z',
  }
}
