import { FaComments, FaHeadset, FaShieldAlt, FaClock, FaUserCheck, FaLock } from 'react-icons/fa'
import { HiOutlineChatAlt2, HiOutlineClipboardList, HiOutlineSwitchHorizontal } from 'react-icons/hi'

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
