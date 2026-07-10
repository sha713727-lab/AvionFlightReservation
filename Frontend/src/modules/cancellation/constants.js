import { FaComments, FaHeadset, FaShieldAlt } from 'react-icons/fa'
import {
  HiOutlineCalendar,
  HiOutlineCash,
  HiOutlineClipboardList,
  HiOutlineQuestionMarkCircle,
} from 'react-icons/hi'

export const CANCELLATION_HIGHLIGHTS = [
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

export const CANCELLATION_BEFORE_ITEMS = [
  {
    id: 'review-rules',
    title: 'Review fare and booking rules',
    icon: HiOutlineClipboardList,
  },
  {
    id: 'check-deadline',
    title: 'Check cancellation deadline',
    icon: HiOutlineCalendar,
  },
  {
    id: 'confirm-charges',
    title: 'Confirm penalty or service charges',
    icon: HiOutlineCash,
  },
  {
    id: 'ask-options',
    title: 'Ask about refund or credit options',
    icon: HiOutlineQuestionMarkCircle,
  },
]

export const CANCELLATION_SECTIONS = [
  { id: 'cancellation-rules', label: 'Cancellation Rules' },
  { id: 'before-cancelling', label: 'Before Cancelling' },
  { id: 'after-cancellation', label: 'After Cancellation' },
  { id: 'important-limitations', label: 'Important Limitations' },
  { id: 'cancellation-help', label: 'Need Cancellation Help?' },
]
