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
    title: 'Supplier refund eligibility',
    description:
      'Airline, hotel, and program refunds depend on the rules of the ticket issuer or supplier, fare type, and booking conditions. Some tickets are non-refundable, partially refundable, or refundable only after deductions.',
    icon: HiOutlineClipboardCheck,
  },
  {
    id: 'supplier-refunds',
    title: 'Supplier refunds',
    description:
      'If a supplier approves a refund or points redeposit, processing time varies by supplier, bank, payment method, and billing system. That outcome is separate from any AvioSupportDesk assistance fee.',
    icon: HiOutlineOfficeBuilding,
  },
  {
    id: 'service-fees',
    title: 'Assistance fee refunds',
    description:
      'AvioSupportDesk assistance-fee refunds are separate from supplier refunds. Whether a fee applies for work not started, unsuccessful searches within the agreed scope, duplicate charges, or complaints is stated in your written quote. Exact numeric rules require owner confirmation.',
    icon: HiOutlineCash,
  },
]

/** Supplier-ticket refund path. */
export const REFUND_PROCESS_STEPS = [
  {
    id: 'contact-support',
    number: '01',
    title: 'Contact us with booking details and the outcome you are seeking.',
  },
  {
    id: 'review-rules',
    number: '02',
    title: 'We review who issued the ticket and the supplier rules that apply.',
  },
  {
    id: 'submit-or-guide',
    number: '03',
    title: 'If eligible, the supplier request is submitted or guided according to procedure.',
  },
  {
    id: 'return-funds',
    number: '04',
    title: 'Approved supplier refunds return on supplier and payment-processor timelines.',
  },
]

/** Separate path for our own assistance fee. */
export const ASSISTANCE_FEE_REFUND_STEPS = [
  {
    id: 'identify-fee',
    number: '01',
    title: 'Identify the AvioSupportDesk assistance charge on your quote or receipt.',
  },
  {
    id: 'check-quote',
    number: '02',
    title: 'Compare the request against the refund conditions in your accepted quote.',
  },
  {
    id: 'outcomes',
    number: '03',
    title:
      'Typical review outcomes cover work not started, unsuccessful searches within scope, duplicate charges, and complaints—subject to the agreed policy.',
  },
  {
    id: 'resolve',
    number: '04',
    title: 'We confirm the assistance-fee decision in writing. Supplier refunds remain separate.',
  },
]
