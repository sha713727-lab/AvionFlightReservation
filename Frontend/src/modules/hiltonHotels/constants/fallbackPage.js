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
export function getFallbackHiltonPage() {
  return {
    id: 'default',
    status: 'published',
    metaTitle: 'Hilton Hotels Booking Help by Phone | AvioSupportDesk',
    metaDescription:
      'Independent phone help booking Hilton hotels such as Hilton Anatole, Union Square San Francisco, and Hawaiian Village. Not affiliated with Hilton Worldwide.',
    ogTitle: 'Hilton Hotels Booking Help by Phone | AvioSupportDesk',
    ogDescription:
      'Independent specialists help you compare and book Hilton hotel stays by phone. Clear fees before you agree. We do not provide Hilton Honors login.',
    heroHeading: 'Book Hilton stays with clearer phone help.',
    heroIntroduction:
      'AvioSupportDesk helps travelers review dates, rates, and options at Hilton hotels and brands—then book with a specialist by phone. We are an independent desk, not Hilton Customer Care or Hilton Honors support.',
    storyLabel: 'Hilton hotel help',
    storyParagraphs: [
      'Travelers search hilton.com, Hilton Honors, Hampton Inn, DoubleTree, Embassy Suites, Conrad, and Waldorf Astoria properties—then need a clear next step to secure the stay.',
      'Our specialists help you compare hotel options, confirm room needs, and complete the reservation by phone. Assistance fees are quoted before you agree and are separate from hotel charges. We do not provide Hilton Honors login or account access.',
      'Whether you need a city hotel, resort, airport stay, or a Hampton / Garden Inn / Homewood brand stay, we focus on practical booking help—not official loyalty support.',
    ],
    storyCtaLabel: 'Talk about your hotel stay',
    storyCtaHref: CONTACT_PATH,
    principlesHeading: 'How we help with Hilton stays',
    clientsEnabled: false,
    clientsHeading: 'Partners and trusted travel brands',
    clientsIntroduction:
      'Approved partner marks appear here when available. Hotel brand names identify booking requests only.',
    railLabel: 'A closer look at booking help',
    contactEmailOverride: null,
    mediaSlots: [
      { id: 'lead', slotKey: 'lead', mediaUrl: HOTEL_LEAD, alt: 'Modern hotel lobby for a Hilton-style stay', focalX: 0.5, focalY: 0.5 },
      { id: 'aL', slotKey: 'pairALeft', mediaUrl: PAIR_A_LEFT, alt: 'Hotel exterior for property booking research', focalX: 0.5, focalY: 0.4 },
      { id: 'aR', slotKey: 'pairARight', mediaUrl: PAIR_A_RIGHT, alt: 'Hotel guest room detail', focalX: 0.5, focalY: 0.5 },
      { id: 'bL', slotKey: 'pairBLeft', mediaUrl: PAIR_B_LEFT, alt: 'Resort pool for leisure hotel stays', focalX: 0.5, focalY: 0.45 },
      { id: 'bR', slotKey: 'pairBRight', mediaUrl: PAIR_B_RIGHT, alt: 'Hotel suite bedroom', focalX: 0.5, focalY: 0.5 },
    ],
    principles: [
      { id: 'p1', numberLabel: '01', title: 'Clarify the stay', description: 'Dates, location, room needs, and budget first.', sortOrder: 1, isEnabled: true },
      { id: 'p2', numberLabel: '02', title: 'Compare with context', description: 'Weigh Hilton and brand-family fit against rate and terms.', sortOrder: 2, isEnabled: true },
      { id: 'p3', numberLabel: '03', title: 'Book by phone', description: 'Complete the reservation with confirmation details you can keep.', sortOrder: 3, isEnabled: true },
      { id: 'p4', numberLabel: '04', title: 'Keep fees transparent', description: 'Assistance fee quoted before paid work begins.', sortOrder: 4, isEnabled: true },
      { id: 'p5', numberLabel: '05', title: 'Stay independent', description: 'Not Hilton Worldwide or Hilton Honors—no Honors login.', sortOrder: 5, isEnabled: true },
      { id: 'p6', numberLabel: '06', title: 'Support after booking', description: 'Call again with your confirmation for practical next steps.', sortOrder: 6, isEnabled: true },
    ],
    railCards: [
      { id: 'r1', cardType: 'photo', title: '', body: '', linkLabel: null, linkHref: null, factValue: null, mediaUrl: RAIL_PHOTO, mediaAlt: 'Resort pathway', sortOrder: 1, isEnabled: true },
      { id: 'r2', cardType: 'partnership', title: 'From first dates to confirmation', body: 'Share destination, dates, and room needs for clearer Hilton options.', linkLabel: 'Start a conversation', linkHref: CONTACT_PATH, factValue: null, mediaUrl: null, mediaAlt: '', sortOrder: 2, isEnabled: true },
      { id: 'r3', cardType: 'capabilities', title: 'Hotels, flights, and trip planning', body: 'Stay strategy plus related flight help when needed.', linkLabel: null, linkHref: null, factValue: null, mediaUrl: null, mediaAlt: '', sortOrder: 3, isEnabled: true },
      { id: 'r4', cardType: 'standard', title: 'Clear scope', body: 'Shared next steps before any fee. Honors login is out of scope.', linkLabel: null, linkHref: null, factValue: null, mediaUrl: null, mediaAlt: '', sortOrder: 4, isEnabled: true },
    ],
    properties: [
      { id: 'pr1', title: 'Hilton Anatole', blurb: 'Dallas convention and leisure hotel booking help by phone.', mediaUrl: null, mediaAlt: '', sortOrder: 1, isEnabled: true },
      { id: 'pr2', title: 'Millennium Hilton One UN Plaza', blurb: 'Midtown East New York hotel assistance for business and leisure.', mediaUrl: null, mediaAlt: '', sortOrder: 2, isEnabled: true },
      { id: 'pr3', title: 'Hilton San Francisco Union Square', blurb: 'Union Square SF stays for city and conference travel.', mediaUrl: null, mediaAlt: '', sortOrder: 3, isEnabled: true },
      { id: 'pr4', title: 'Hilton Orlando', blurb: 'Orlando convention and leisure hotel booking help.', mediaUrl: null, mediaAlt: '', sortOrder: 4, isEnabled: true },
      { id: 'pr5', title: 'Hilton Hawaiian Village', blurb: 'Waikiki Beach resort booking assistance for Hawaii stays.', mediaUrl: null, mediaAlt: '', sortOrder: 5, isEnabled: true },
      { id: 'pr6', title: 'Capital Hilton', blurb: 'Washington, D.C. hotel help for business and leisure visits.', mediaUrl: null, mediaAlt: '', sortOrder: 6, isEnabled: true },
      { id: 'pr7', title: 'Conrad New York Downtown', blurb: 'Downtown Manhattan Conrad booking help for upscale stays.', mediaUrl: null, mediaAlt: '', sortOrder: 7, isEnabled: true },
      { id: 'pr8', title: 'Hampton Inn & Embassy Suites', blurb: 'Brand-family booking help across Hampton and Embassy Suites.', mediaUrl: null, mediaAlt: '', sortOrder: 8, isEnabled: true },
    ],
    faqs: [
      {
        id: 'hf1',
        question: 'Is AvioSupportDesk part of Hilton Worldwide?',
        answer:
          'No. AvioSupportDesk is an independent travel assistance service. We are not affiliated with, authorized by, or endorsed by Hilton Worldwide, Hilton Hotels & Resorts, or Hilton Honors. Hotel names identify booking requests only. Our assistance fee is quoted before you agree and is separate from hotel charges.',
        sortOrder: 1,
        isEnabled: true,
      },
      {
        id: 'hf2',
        question: 'Do you need my Hilton Honors login?',
        answer:
          'No. We never ask for Hilton Honors passwords or account access. You keep control of your loyalty login. We help compare publicly available rates and complete permitted booking steps after you accept a written assistance-fee quote.',
        sortOrder: 2,
        isEnabled: true,
      },
      {
        id: 'hf3',
        question: 'Which Hilton sub-brands can you help with?',
        answer:
          'We can help you review stays at Hilton hotels and related brands travelers commonly request, including Hampton Inn, DoubleTree, Embassy Suites, Conrad, and Waldorf Astoria. Brand names identify the hotel you want. We are not Hilton Customer Care.',
        sortOrder: 3,
        isEnabled: true,
      },
      {
        id: 'hf4',
        question: 'Are your rates lower than booking direct with Hilton?',
        answer:
          'We do not claim lower rates than booking on the hotel website. We help you compare available options and complete a reservation by phone. Hotel charges remain the hotel’s. Our assistance fee is separate and is quoted before you agree.',
        sortOrder: 4,
        isEnabled: true,
      },
      {
        id: 'hf5',
        question: 'How do Hilton hotel changes and cancellations work?',
        answer:
          'Hotel change and cancellation rules belong to the property and the rate you booked. We can explain those rules in plain language and help you request a permitted change. Our assistance fee is quoted before paid work begins and stays separate from hotel charges.',
        sortOrder: 5,
        isEnabled: true,
      },
    ],
    clientLogos: [],
    updatedAt: new Date(0).toISOString(),
  }
}
