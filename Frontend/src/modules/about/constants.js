import { FaComments, FaHeadset, FaShieldAlt, FaClock, FaUserCheck, FaLock } from 'react-icons/fa'
import { HiOutlineChatAlt2, HiOutlineClipboardList, HiOutlineSwitchHorizontal } from 'react-icons/hi'
import { RESERVATION_EMAIL } from '@/constants/contact'

export const ABOUT_HIGHLIGHTS = [
  {
    id: 'independent-help',
    title: 'Independent Travel Help',
    description: 'Unbiased assistance focused on your trip needs, not airline or bank affiliations.',
    icon: FaShieldAlt,
  },
  {
    id: 'clear-support',
    title: 'Clear Booking Support',
    description: 'Simple explanations of options, conditions, and next steps before you book.',
    icon: FaComments,
  },
  {
    id: 'phone-assistance',
    title: 'Phone Assistance Available',
    description: 'Speak directly with a specialist when you prefer help over self-serve booking.',
    icon: FaHeadset,
  },
]

export const ABOUT_MISSION_POINTS = [
  {
    id: 'explain-choices',
    title: 'Explain booking choices in simple language',
    icon: HiOutlineChatAlt2,
  },
  {
    id: 'compare-options',
    title: 'Help compare available travel options',
    icon: HiOutlineClipboardList,
  },
  {
    id: 'support-changes',
    title: 'Support customers with changes and questions',
    icon: HiOutlineSwitchHorizontal,
  },
]

export const ABOUT_VALUES = [
  {
    id: 'honest-info',
    title: 'Honest service information',
    description: 'Straightforward details so you know what to expect before you decide.',
  },
  {
    id: 'professional-support',
    title: 'Professional phone support',
    description: 'Responsive specialists who guide you through booking and follow-up questions.',
  },
  {
    id: 'respect-rules',
    title: 'Respect for supplier rules and customer choices',
    description: 'We honor airline and hotel terms while helping you choose what fits your trip.',
  },
]

export const ABOUT_WHY_CHOOSE = [
  {
    id: 'human-help',
    title: 'Real specialists by phone',
    description: 'Talk through fares, changes, and policies with a person—not a chatbot maze.',
    icon: FaHeadset,
  },
  {
    id: 'independent',
    title: 'Truly independent guidance',
    description: 'We are not an airline desk. Advice stays focused on your itinerary and budget.',
    icon: FaShieldAlt,
  },
  {
    id: 'quoted-fees',
    title: 'Assistance fees quoted first',
    description:
      'Optional paid help starts only after you accept a written scope and fee. Supplier charges stay separate.',
    icon: FaClock,
  },
  {
    id: 'plain-language',
    title: 'Plain-language explanations',
    description: 'Fees, fare brands, and refund rules explained before you commit.',
    icon: FaUserCheck,
  },
]

/** Verified highlights only — no unverified traveler counts or ratings. */
export const ABOUT_STATS = []

export const ABOUT_TEAM = []

export const ABOUT_TRUST_BADGES = [
  { id: 'independent', label: 'Independent travel support', icon: FaShieldAlt },
  { id: 'secure', label: 'Secure contact handling', icon: FaLock },
  { id: 'phone', label: 'Phone assistance available', icon: FaHeadset },
  { id: 'clear', label: 'Clear fee explanations', icon: FaComments },
]

export const ABOUT_WHAT_IS = {
  heading: 'What is AvioSupportDesk?',
  body: 'AvioSupportDesk is an independent travel assistance service operated for customers who need phone or written help comparing Avion points options, cash fares, and related booking steps. We are not an airline, bank, hotel brand, or official rewards desk. Assistance fees are quoted before you agree and stay separate from supplier charges. The Toronto address on this site is for correspondence only—not a walk-in office.',
}

export const ABOUT_SCOPE = {
  heading: 'What we provide — and what we do not',
  provided: [
    'Independent Avion points booking assistance and cash-versus-points comparisons within an accepted scope.',
    'Phone and inquiry help for flight bookings, changes, cancellations, hotels, seats, baggage, and trip planning when those requests fit our services.',
    'Written assistance-fee quotes before paid work starts, with supplier charges kept separate.',
    'Educational guides and tools that cite official public sources where rules are discussed.',
  ],
  notProvided: [
    'Official RBC, Avion Rewards, airline, or hotel account support.',
    'Login help, password resets, OTP handling, or access to customer rewards accounts.',
    'Guaranteed award inventory, waived supplier fees, or outcomes we cannot control.',
    'Walk-in counter service at the correspondence mailing address.',
  ],
}

export const ABOUT_EDITORIAL_STANDARDS = {
  heading: 'Editorial standards',
  intro:
    'Guides and policy pages are written as independent travel assistance, not as airline, bank, or hotel advice. Content is reviewed by the AvioSupportDesk editorial process and shows a last-reviewed date.',
  items: [
    {
      id: 'sources',
      title: 'Official sources cited',
      body: 'Where a guide relies on a public rule, we list the official source so you can check the current wording yourself.',
    },
    {
      id: 'review-dates',
      title: 'Review dates on guides',
      body: 'Guides and service pages show when the content was published or last reviewed so you can tell whether the explanation is current.',
    },
    {
      id: 'verification',
      title: 'How information is verified',
      body: 'We cross-check fare, refund, and passenger-rights themes against public regulator and carrier pages listed in Sources. Illustrative points examples are labeled as non-live teaching scenarios.',
    },
    {
      id: 'independence',
      title: 'Independence',
      body: 'We are not affiliated with RBC, Avion Rewards, British Airways Avios, airlines, Wyndham Hotels & Resorts, or Hilton. Brand names identify the travel request only.',
    },
    {
      id: 'corrections',
      title: 'Corrections',
      body: `If you find an error, email ${RESERVATION_EMAIL}. We correct factual mistakes on the page and note the review date.`,
    },
  ],
}
