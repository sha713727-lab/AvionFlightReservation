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
