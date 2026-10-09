/** Seed content for the /wyndham-hotels CMS page. Media URLs use existing stock photography. */

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

export const WYNDHAM_PAGE_SEED = {
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
  storyCtaHref: '/contact',
  principlesHeading: 'How we help with Wyndham stays',
  clientsEnabled: false,
  clientsHeading: 'Partners and trusted travel brands',
  clientsIntroduction:
    'Approved partner marks appear here when available. Hotel brand names identify booking requests only.',
  railLabel: 'A closer look at booking help',
  contactEmailOverride: null as string | null,
  mediaSlots: [
    {
      slotKey: 'lead',
      mediaUrl: HOTEL_LEAD,
      alt: 'Modern hotel lobby and seating for a Wyndham-style stay',
    },
    {
      slotKey: 'pairALeft',
      mediaUrl: PAIR_A_LEFT,
      alt: 'Hotel exterior and entrance for property booking research',
    },
    {
      slotKey: 'pairARight',
      mediaUrl: PAIR_A_RIGHT,
      alt: 'Hotel guest room detail for accommodation planning',
    },
    {
      slotKey: 'pairBLeft',
      mediaUrl: PAIR_B_LEFT,
      alt: 'Resort pool and outdoor seating for leisure hotel stays',
    },
    {
      slotKey: 'pairBRight',
      mediaUrl: PAIR_B_RIGHT,
      alt: 'Hotel suite bedroom prepared for overnight guests',
    },
  ],
  principles: [
    {
      numberLabel: '01',
      title: 'Clarify the stay',
      description:
        'We start with dates, location, room needs, and budget so every Wyndham or nearby hotel option supports a clear goal.',
      sortOrder: 1,
    },
    {
      numberLabel: '02',
      title: 'Compare with context',
      description:
        'Specialists help you weigh property fit—airport, downtown, resort, or conference—against rate and cancellation terms.',
      sortOrder: 2,
    },
    {
      numberLabel: '03',
      title: 'Book by phone',
      description:
        'When you are ready, we complete the reservation by phone with confirmation details and next steps you can keep.',
      sortOrder: 3,
    },
    {
      numberLabel: '04',
      title: 'Keep fees transparent',
      description:
        'Our assistance fee is quoted before paid work begins and remains separate from hotel and program charges.',
      sortOrder: 4,
    },
    {
      numberLabel: '05',
      title: 'Stay independent',
      description:
        'We are not Wyndham Hotels & Resorts, Wyndham Rewards, or any hotel brand hotline—hotel names identify your request only.',
      sortOrder: 5,
    },
    {
      numberLabel: '06',
      title: 'Support after booking',
      description:
        'Need a change, add-on, or follow-up question? Call again with your confirmation so we can help you take the next practical step.',
      sortOrder: 6,
    },
  ],
  railCards: [
    {
      cardType: 'photo',
      title: '',
      body: '',
      mediaUrl: RAIL_PHOTO,
      mediaAlt: 'Resort pathway for leisure hotel booking inspiration',
      sortOrder: 1,
    },
    {
      cardType: 'partnership',
      title: 'From first dates to confirmation',
      body: 'Share your destination, travel window, and room needs—we bring clarity to the hotel options ahead.',
      linkLabel: 'Start a conversation',
      linkHref: '/contact',
      sortOrder: 2,
    },
    {
      cardType: 'capabilities',
      title: 'Hotels, flights, and trip planning',
      body: 'Strategy for the stay, booking support, and related flight help when your trip needs both.',
      sortOrder: 3,
    },
    {
      cardType: 'standard',
      title: 'Clear scope',
      body: 'Useful feedback. A shared understanding of what comes next before any fee is charged.',
      sortOrder: 4,
    },
  ],
  properties: [
    {
      title: 'Wyndham Atlanta Buckhead Hotel & Conference Center',
      blurb:
        'Conference and Buckhead stays—help comparing dates, meeting needs, and nearby Atlanta hotel options by phone.',
      sortOrder: 1,
    },
    {
      title: 'Wyndham New Orleans - French Quarter',
      blurb:
        'French Quarter hotel booking help for leisure and event travel, including nearby New Orleans stay options.',
      sortOrder: 2,
    },
    {
      title: 'Wyndham DFW Airport',
      blurb:
        'Irving / DFW airport overnight stays—specialists help lock room nights around early flights and connections.',
      sortOrder: 3,
    },
    {
      title: 'Wyndham San Diego Bayside',
      blurb:
        'North Harbor Drive and downtown San Diego bayfront hotel help for leisure and business trips.',
      sortOrder: 4,
    },
    {
      title: 'Wyndham Deerfield Beach Resort',
      blurb:
        'Oceanfront Deerfield Beach resort booking assistance for Florida leisure stays and family trips.',
      sortOrder: 5,
    },
    {
      title: 'Wyndham Philadelphia Historic District',
      blurb:
        'Arch Street / historic district hotel help for center-city Philadelphia visits and weekend stays.',
      sortOrder: 6,
    },
    {
      title: 'Wyndham Virginia Beach Oceanfront',
      blurb:
        'Virginia Beach oceanfront hotel booking help for beach weekends and longer leisure stays.',
      sortOrder: 7,
    },
    {
      title: 'Wyndham Houston Near NRG Park / Medical Center',
      blurb:
        'Houston medical center and NRG Park area hotel assistance for events, appointments, and overnight stays.',
      sortOrder: 8,
    },
  ],
  faqs: [
    {
      question: 'Is AvioSupportDesk part of Wyndham Hotels & Resorts?',
      answer:
        'No. AvioSupportDesk is an independent travel assistance service. We are not affiliated with, authorized by, or endorsed by Wyndham Hotels & Resorts or Wyndham Rewards. Hotel names identify booking requests only. Our assistance fee is quoted before you agree and is separate from hotel charges.',
      sortOrder: 1,
      isEnabled: true,
    },
    {
      question: 'Do you need my Wyndham Rewards login?',
      answer:
        'No. We never ask for loyalty passwords or account access. You keep control of your rewards login. We help compare publicly available rates and complete permitted booking steps after you accept a written assistance-fee quote.',
      sortOrder: 2,
      isEnabled: true,
    },
    {
      question: 'Which Wyndham sub-brands can you help with?',
      answer:
        'We can help you review stays at Wyndham hotels and related properties travelers commonly request, including city, airport, and resort locations listed on this page. Brand names identify the hotel you want. We are not the hotel’s reservations desk.',
      sortOrder: 3,
      isEnabled: true,
    },
    {
      question: 'Are your rates lower than booking direct with Wyndham?',
      answer:
        'We do not claim lower rates than booking on the hotel website. We help you compare available options and complete a reservation by phone. Hotel charges remain the hotel’s. Our assistance fee is separate and is quoted before you agree.',
      sortOrder: 4,
      isEnabled: true,
    },
    {
      question: 'How do Wyndham hotel changes and cancellations work?',
      answer:
        'Hotel change and cancellation rules belong to the property and the rate you booked. We can explain those rules in plain language and help you request a permitted change. Our assistance fee is quoted before paid work begins and stays separate from hotel charges.',
      sortOrder: 5,
      isEnabled: true,
    },
  ],
}
