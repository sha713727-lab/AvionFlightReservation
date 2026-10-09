/** Seed content for the /hilton-hotels CMS page. Media URLs use existing stock photography. */

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

export const HILTON_PAGE_SEED = {
  status: 'published',
  metaTitle: 'Hilton Hotels Booking Help | AvioSupportDesk',
  metaDescription:
    'Get independent phone help booking Hilton hotels—Hilton Anatole, Millennium Hilton One UN Plaza, Hilton San Francisco Union Square, Hilton Orlando, Hawaiian Village, and more. Not affiliated with Hilton Worldwide.',
  ogTitle: 'Hilton Hotels Booking Help | AvioSupportDesk',
  ogDescription:
    'Independent specialists help you compare and book Hilton hotel stays by phone. Clear fees before you agree. We do not provide Hilton Honors login.',
  heroHeading: 'Book Hilton stays with clearer phone help.',
  heroIntroduction:
    'AvioSupportDesk helps travelers review dates, rates, and options at Hilton hotels and brands—then book with a specialist by phone. We are an independent desk, not Hilton Customer Care or Hilton Honors support.',
  storyLabel: 'Hilton hotel help',
  storyParagraphs: [
    'Travelers search hilton.com, Hilton Honors, Hampton Inn, DoubleTree, Embassy Suites, Conrad, and Waldorf Astoria properties—then need a clear next step to secure the stay without fighting online forms alone.',
    'Our specialists help you compare hotel options, confirm room needs, and complete the reservation by phone. Assistance fees are quoted before you agree and are separate from hotel charges. We do not provide Hilton Honors login, account access, or official loyalty support.',
    'Whether you need a city convention hotel, resort, airport stay, or a Hampton / Garden Inn / Homewood / Home2 / Tru brand stay, we focus on practical booking help—not Go Hilton employee travel or credit-card products.',
  ],
  storyCtaLabel: 'Talk about your hotel stay',
  storyCtaHref: '/contact',
  principlesHeading: 'How we help with Hilton stays',
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
      alt: 'Modern hotel lobby and seating for a Hilton-style stay',
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
        'We start with dates, location, room needs, and budget so every Hilton or brand-family option supports a clear goal.',
      sortOrder: 1,
    },
    {
      numberLabel: '02',
      title: 'Compare with context',
      description:
        'Specialists help you weigh property fit—Hampton, DoubleTree, Embassy Suites, Conrad, or full-service Hilton—against rate and cancellation terms.',
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
        'We are not Hilton Worldwide, Hilton Honors, or any hotel brand hotline—hotel names identify your request only. We do not provide Honors login.',
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
      body: 'Share your destination, travel window, and room needs—we bring clarity to the Hilton and brand-family options ahead.',
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
      body: 'Useful feedback. A shared understanding of what comes next before any fee is charged. Honors login is out of scope.',
      sortOrder: 4,
    },
  ],
  properties: [
    {
      title: 'Hilton Anatole',
      blurb:
        'Dallas Anatole convention and leisure stays—help comparing dates, event needs, and nearby hotel options by phone.',
      sortOrder: 1,
    },
    {
      title: 'Millennium Hilton New York One UN Plaza',
      blurb:
        'Midtown East / United Nations area hotel booking help for New York business and leisure trips.',
      sortOrder: 2,
    },
    {
      title: 'Hilton San Francisco Union Square',
      blurb:
        'Union Square San Francisco hotel assistance for city stays, conferences, and weekend travel.',
      sortOrder: 3,
    },
    {
      title: 'Hilton Orlando',
      blurb:
        'Orlando convention and leisure hotel booking help near major attractions and meeting venues.',
      sortOrder: 4,
    },
    {
      title: 'Hilton Hawaiian Village Waikiki Beach Resort',
      blurb:
        'Waikiki Beach resort booking assistance for Hawaii leisure stays and family trips.',
      sortOrder: 5,
    },
    {
      title: 'Capital Hilton',
      blurb:
        'Washington, D.C. Capital Hilton stays—help locking room nights for business and leisure visits.',
      sortOrder: 6,
    },
    {
      title: 'Conrad New York Downtown',
      blurb:
        'Downtown Manhattan Conrad booking help for upscale New York stays and event travel.',
      sortOrder: 7,
    },
    {
      title: 'Hampton Inn, Garden Inn & Embassy Suites',
      blurb:
        'Brand-family booking help across Hampton Inn, Hilton Garden Inn, and Embassy Suites for value and extended stays.',
      sortOrder: 8,
    },
    {
      title: 'Homewood Suites, Home2 Suites & Tru by Hilton',
      blurb:
        'Extended-stay and value brand assistance when your trip needs a suite, kitchen, or longer stay.',
      sortOrder: 9,
    },
    {
      title: 'Waldorf Astoria & luxury Hilton brands',
      blurb:
        'Premium and luxury brand booking help when the stay calls for Waldorf Astoria or similar upscale properties.',
      sortOrder: 10,
    },
  ],
}
