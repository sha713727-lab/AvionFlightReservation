import {
  HOW_IT_WORKS_PATH,
  INDEPENDENT_SERVICE_DISCLOSURE_PATH,
  REFUND_POLICY_PATH,
  SERVICE_FEES_PATH,
} from '@/constants/routes'

export const TRUST_PAGES = {
  [SERVICE_FEES_PATH]: {
    path: SERVICE_FEES_PATH,
    eyebrow: 'Commercial transparency',
    h1: 'Travel assistance fees',
    intro:
      'AvioSupportDesk charges a separate assistance fee for optional help comparing travel options and completing permitted booking steps. That fee is not an airline, hotel, or loyalty-program charge.',
    sections: [
      {
        title: 'How our fee works',
        paragraphs: [
          'We quote an assistance fee before any paid work begins. You decide whether to accept that quote. Until you accept, we do not charge for scoped assistance work.',
          'Because itineraries differ, we use a custom quote rather than publishing a single invented “from” price. The quote states currency, what the fee covers, and when it would be charged.',
        ],
      },
      {
        title: 'What the fee covers',
        paragraphs: [
          'Typical deliverables include itinerary comparison, a written cash-versus-points breakdown for options we can evaluate, explanation of visible restrictions, and guidance for steps you are permitted to take in your own rewards or supplier account.',
          'Work begins only after you accept the quoted scope and fee. If we cannot find an acceptable option within the agreed scope, the quote states whether any fee still applies.',
        ],
      },
      {
        title: 'Charges that are not our fee',
        paragraphs: [
          'Airline fares, taxes, surcharges, fuel charges, program fees, hotel rates, supplier change or cancel fees, and any remaining cash due alongside a points redemption are charged by the relevant supplier or program—not by AvioSupportDesk.',
          'Your card statement or receipt merchant name for our assistance fee will identify the actual billing entity once the owner confirms that detail. Until then, ask for the merchant identity on your written quote.',
        ],
      },
      {
        title: 'Refunds of our assistance fee',
        paragraphs: [
          'Assistance-fee refund eligibility is separate from airline or program refunds and points redeposits. Outcomes for work not started, unsuccessful searches within the agreed scope, duplicate charges, and complaints are described on our refund policy and confirmed in your quote.',
        ],
        links: [{ label: 'Refund policy', href: REFUND_POLICY_PATH }],
      },
    ],
  },
  [HOW_IT_WORKS_PATH]: {
    path: HOW_IT_WORKS_PATH,
    eyebrow: 'Process',
    h1: 'How independent booking help works',
    intro:
      'AvioSupportDesk provides optional paid assistance. You keep control of your accounts and approve any option before it is confirmed.',
    sections: [
      {
        title: '1. Request',
        paragraphs: [
          'Share the contact details and itinerary basics we need: travelers, origin and destination, dates or flexibility, cabin preference, and approximate points balance if relevant. Do not send loyalty passwords, one-time codes, or full payment card numbers through the inquiry form.',
        ],
      },
      {
        title: '2. Review options and scope',
        paragraphs: [
          'We review what we can evaluate within our service scope and explain that outcomes depend on membership eligibility, inventory, and current supplier or program rules.',
        ],
      },
      {
        title: '3. Written quote',
        paragraphs: [
          'You receive a written summary of scope, our assistance fee, currency, and known separate supplier charges when available. This is not a guarantee of award space or final supplier pricing.',
        ],
      },
      {
        title: '4. Explicit acceptance',
        paragraphs: [
          'Paid work starts only after you accept the quote. You may decline and use official self-service channels instead.',
        ],
      },
      {
        title: '5. You complete bookings in your accounts',
        paragraphs: [
          'You sign in through official supplier channels and complete account-controlled actions yourself unless a verified, permitted delegated workflow exists. After you confirm an option, we can help document next steps within our assistance scope.',
        ],
      },
    ],
  },
  [INDEPENDENT_SERVICE_DISCLOSURE_PATH]: {
    path: INDEPENDENT_SERVICE_DISCLOSURE_PATH,
    eyebrow: 'Identity',
    h1: 'Independent service disclosure',
    intro:
      'AvioSupportDesk is an independent travel assistance business. We are not an airline, bank, hotel brand, or loyalty-program operator.',
    sections: [
      {
        title: 'Operator identity',
        paragraphs: [
          'Public pages use the trading name AvioSupportDesk. The contracting legal entity, jurisdiction, and accurate address type must match the owner’s verified records. Until those details are confirmed for publication, treat the mailing address as a mailing address only—not a claim of a staffed walk-in office.',
        ],
      },
      {
        title: 'Independence and trademarks',
        paragraphs: [
          'We are not affiliated with, authorized by, or endorsed by any airline, bank, hotel brand, or loyalty program. Third-party names appear only to describe the subject of a customer request or educational guide. All trademarks belong to their owners.',
        ],
      },
      {
        title: 'Official supplier channels',
        paragraphs: [
          'For account access, loyalty decisions, and self-service travel tools, use each airline, hotel, or program’s official website or verified contact options—not unofficial numbers or lookalike sites.',
          'AvioSupportDesk offers optional independent assistance by phone or inquiry form. It is not a substitute for official operator support and we do not present ourselves as an official help desk.',
        ],
      },
      {
        title: 'Service limits',
        paragraphs: [
          'We do not claim authority to issue, change, cancel, transfer, or refund every booking. Ticket servicing depends on who issued the ticket and the supplier’s rules. We do not request loyalty passwords or one-time codes through public forms.',
          'Our assistance fee is separate from supplier and program charges and is quoted before you agree.',
        ],
        links: [
          { label: 'Service fees', href: SERVICE_FEES_PATH },
          { label: 'How it works', href: HOW_IT_WORKS_PATH },
        ],
      },
    ],
  },
}