import { FaComments, FaHeadset, FaShieldAlt } from 'react-icons/fa'
import {
  HiOutlineChatAlt2,
  HiOutlineClipboardCheck,
  HiOutlinePhone,
  HiOutlineRefresh,
} from 'react-icons/hi'

export const PRIVACY_HIGHLIGHTS = [
  {
    id: 'independent-help',
    title: 'Independent Travel Help',
    icon: FaShieldAlt,
  },
  {
    id: 'clear-support',
    title: 'Clear Booking Support',
    icon: FaComments,
  },
  {
    id: 'phone-assistance',
    title: 'Phone Assistance Available',
    icon: FaHeadset,
  },
]

export const PRIVACY_USAGE_ITEMS = [
  {
    id: 'booking-assistance',
    title: 'To provide booking assistance',
    icon: HiOutlineClipboardCheck,
  },
  {
    id: 'customer-questions',
    title: 'To respond to customer questions',
    icon: HiOutlineChatAlt2,
  },
  {
    id: 'support-requests',
    title: 'To process travel support requests',
    icon: HiOutlinePhone,
  },
  {
    id: 'booking-updates',
    title: 'To communicate important booking updates',
    icon: HiOutlineRefresh,
  },
]

export const PRIVACY_SECTIONS = [
  { id: 'information-we-may-collect', label: 'Information We May Collect' },
  { id: 'how-information-is-used', label: 'How Information Is Used' },
  { id: 'information-sharing', label: 'Information Sharing' },
  { id: 'data-protection', label: 'Data Protection' },
  { id: 'your-choice', label: 'Your Choice' },
  { id: 'privacy-contact', label: 'Privacy Contact' },
]
