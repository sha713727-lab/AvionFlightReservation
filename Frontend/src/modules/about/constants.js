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
    id: 'always-on',
    title: '24/7 availability',
    description: 'Reach support any day of the year when flights shift or plans change mid-trip.',
    icon: FaClock,
  },
  {
    id: 'plain-language',
    title: 'Plain-language explanations',
    description: 'Fees, fare brands, and refund rules explained before you commit.',
    icon: FaUserCheck,
  },
]

export const ABOUT_STATS = [
  { id: 'support-hours', value: '24/7', label: 'Phone support coverage' },
  { id: 'regions', value: '4+', label: 'Regions we book regularly' },
  { id: 'services', value: '8+', label: 'Travel support services' },
  { id: 'focus', value: '100%', label: 'Independent of airlines' },
]

export const ABOUT_TEAM = [
  {
    id: 'booking-leads',
    name: 'Booking Specialists',
    role: 'Flight & hotel reservations',
    bio: 'Help travelers compare itineraries, fare brands, and confirmation steps by phone.',
    initials: 'BS',
  },
  {
    id: 'change-desk',
    name: 'Changes & Cancellations Desk',
    role: 'Rebooking and refund guidance',
    bio: 'Walk customers through airline change fees, credits, and supplier cancellation rules.',
    initials: 'CC',
  },
  {
    id: 'points-desk',
    name: 'Points & Miles Advisors',
    role: 'Award travel assistance',
    bio: 'Explain redemption options, taxes, and when cash fares may beat points.',
    initials: 'PM',
  },
]

export const ABOUT_TRUST_BADGES = [
  { id: 'independent', label: 'Independent travel support', icon: FaShieldAlt },
  { id: 'secure', label: 'Secure contact handling', icon: FaLock },
  { id: 'phone', label: 'Live phone assistance', icon: FaHeadset },
  { id: 'clear', label: 'Clear fee explanations', icon: FaComments },
]
