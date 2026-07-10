import { FaComments, FaHeadset, FaShieldAlt } from 'react-icons/fa'
import {
  HiOutlineCash,
  HiOutlineClipboardCheck,
  HiOutlineOfficeBuilding,
} from 'react-icons/hi'

export const REFUND_HIGHLIGHTS = [
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

export const REFUND_OVERVIEW_CARDS = [
  {
    id: 'eligibility',
    title: 'Refund Eligibility',
    description:
      'Refund eligibility depends on the rules of the airline, hotel, travel supplier, fare type, and booking condition. Some tickets or reservations may be non-refundable, partially refundable, or refundable only after deductions.',
    icon: HiOutlineClipboardCheck,
  },
  {
    id: 'supplier-refunds',
    title: 'Supplier Refunds',
    description:
      'If a supplier approves a refund, processing time may vary based on the supplier, bank, payment method, and billing system.',
    icon: HiOutlineOfficeBuilding,
  },
  {
    id: 'service-fees',
    title: 'Service Fees',
    description:
      'Service or assistance fees may be separate from supplier charges and may not be refundable once support work has been performed.',
    icon: HiOutlineCash,
  },
]

export const REFUND_PROCESS_STEPS = [
  {
    id: 'contact-support',
    number: '01',
    title: 'Contact support with your booking details.',
  },
  {
    id: 'review-rules',
    number: '02',
    title: 'We review the supplier rule attached to your booking.',
  },
  {
    id: 'submit-or-guide',
    number: '03',
    title: 'If eligible, the request is submitted or guided according to supplier procedure.',
  },
  {
    id: 'return-funds',
    number: '04',
    title: 'Approved refunds are returned based on supplier and payment processor timelines.',
  },
]
