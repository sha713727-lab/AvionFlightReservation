import { FaComments, FaHeadset, FaShieldAlt } from 'react-icons/fa'

export const TERMS_HIGHLIGHTS = [
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

export const TERMS_CLAUSES = [
  {
    id: 'independent-service-disclosure',
    number: '01',
    title: 'Independent Service Disclosure',
    description:
      'Flight Reservation is an independent travel assistance provider. We are not an airline, airport, hotel, bank, rewards program, or card issuer. Brand names, airline names, hotel names, or travel program names may be used only for identification of customer travel requests.',
  },
  {
    id: 'booking-information',
    number: '02',
    title: 'Booking Information',
    description:
      'All prices, schedules, availability, taxes, baggage rules, fare restrictions, and supplier charges are controlled by the relevant travel provider and may change before confirmation.',
  },
  {
    id: 'customer-responsibility',
    number: '03',
    title: 'Customer Responsibility',
    description:
      'Customers must provide accurate passenger names, travel dates, contact details, and payment information. Errors may result in additional charges or denial of travel.',
  },
  {
    id: 'fees-and-charges',
    number: '04',
    title: 'Fees and Charges',
    description:
      'Service fees, supplier fees, airline penalties, fare differences, and taxes may apply depending on the request. Any applicable charges should be reviewed before confirmation.',
  },
  {
    id: 'changes-cancellations-refunds',
    number: '05',
    title: 'Changes, Cancellations, and Refunds',
    description:
      'Changes, cancellations, and refunds depend on supplier rules and the fare or booking type selected. Some bookings may be non-refundable or may carry penalties.',
  },
  {
    id: 'website-use',
    number: '06',
    title: 'Website Use',
    description:
      'Visitors agree not to misuse this website, submit false information, copy website materials without permission, or attempt unauthorized access to website systems.',
  },
]
