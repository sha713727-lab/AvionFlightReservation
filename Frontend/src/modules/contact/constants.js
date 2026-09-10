import { FaComments, FaHeadset, FaShieldAlt } from 'react-icons/fa'
import {
  HiOutlineCalendar,
  HiOutlineDocumentText,
  HiOutlineLocationMarker,
  HiOutlineUserGroup,
} from 'react-icons/hi'

export const CONTACT_HIGHLIGHTS = [
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

export const CONTACT_PREP_ITEMS = [
  {
    id: 'city-airport',
    title: 'Travel city or airport',
    icon: HiOutlineLocationMarker,
  },
  {
    id: 'dates-time',
    title: 'Preferred dates and time',
    icon: HiOutlineCalendar,
  },
  {
    id: 'passenger-names',
    title: 'Passenger names as per ID/passport',
    icon: HiOutlineUserGroup,
  },
  {
    id: 'booking-reference',
    title: 'Any booking reference, if available',
    icon: HiOutlineDocumentText,
  },
]

export const CONTACT_FORM_FIELD_NAMES = {
  name: 'name',
  email: 'email',
  phone: 'phone',
  subject: 'subject',
  message: 'message',
}

export const CONTACT_FORM_SUBJECTS = [
  { value: 'flight-booking', label: 'Flight booking help' },
  { value: 'flight-change', label: 'Flight change or rebooking' },
  { value: 'cancellation-refund', label: 'Cancellation or refund question' },
  { value: 'hotel-booking', label: 'Hotel booking help' },
  { value: 'points-miles', label: 'Points and miles help' },
  { value: 'other', label: 'Other travel question' },
]

export const CONTACT_FORM_MESSAGES = {
  nameRequired: 'Enter your full name.',
  nameTooLong: 'Name must be 80 characters or fewer.',
  emailRequired: 'Enter a valid email address.',
  phoneInvalid: 'Enter a complete North American phone number.',
  subjectRequired: 'Choose a subject.',
  messageRequired: 'Enter a message (at least 20 characters).',
  messageTooLong: 'Message must be 2000 characters or fewer.',
  submitFailed: 'We could not open your email app. Please call or email us directly.',
}

export const CONTACT_MAP = {
  embedSrc: '',
  query: '100 King Street West, Suite 1500, Toronto, ON M5X 1C9, Canada',
}
