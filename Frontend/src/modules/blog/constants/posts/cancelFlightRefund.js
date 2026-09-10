import { BLOG_CANCEL_FLIGHT_REFUND_PATH } from '@/constants/routes'

export const POST_CANCEL_FLIGHT_REFUND = {
  slug: 'how-to-cancel-a-flight-and-get-a-full-refund-in-2026',
  path: BLOG_CANCEL_FLIGHT_REFUND_PATH,
  title: 'How to Cancel a Flight and Get a Full Refund in 2026',
  h1: 'How to Cancel a Flight and Get a Full Refund in 2026',
  excerpt:
    'Learn when airlines owe a cash refund versus credit, how 24-hour windows work, and the steps to cancel correctly in 2026.',
  publishedAt: '2026-09-01',
  publishedLabel: 'September 1, 2026',
  updatedAt: '2026-09-10',
  updatedLabel: 'September 10, 2026',
  relatedSlugs: [
    'how-to-change-your-flight-booking-step-by-step',
    'flight-delay-compensation-passenger-rights',
    'airlines-customer-service-numbers-complete-contact-guide',
  ],
  faqs: [
    {
      question: 'Can I get a full refund if my ticket is non-refundable?',
      answer:
        'Usually not for a voluntary cancel after the risk-free window, unless the airline cancels the flight, makes a significant schedule change, or issues a waiver. Non-refundable fares often convert to travel credit with an expiration date instead of cash.',
    },
    {
      question: 'How long does an airline refund take to appear on my card?',
      answer:
        'After the airline releases the refund, banks commonly post it within several business days to a few weeks. Keep the airline refund confirmation number so you can follow up if the posting is delayed.',
    },
    {
      question: 'Does the 24-hour rule apply to tickets bought through a travel agent?',
      answer:
        'U.S. Department of Transportation risk-free cancellation rules focus on tickets sold by U.S. airlines and their agents for flights to, from, or within the United States when purchased a week or more before departure. Confirm whether your seller is covered before you assume a free cancel.',
    },
  ],
  blocks: [
    {
      type: 'p',
      text: 'In 2026, a full cash refund depends on who sold the ticket, the fare brand, timing, and whether the airline or you cancelled. This guide shows when cash is owed versus credit, and the steps to cancel correctly when rules allow a refund.',
    },
    {
      type: 'p',
      text: 'If your situation is time-sensitive, {{flight-cancellation}} from AvioSupportDesk can review confirmation details by phone before you confirm an irreversible cancel. For DIY steps, start with your confirmation email and the airline’s official cancel page—not a random third-party “refund guarantee” site.',
    },
    {
      type: 'h2',
      id: 'when-full-refunds-apply',
      text: 'When a full cash refund usually applies',
    },
    {
      type: 'p',
      text: 'A full refund to the original form of payment is most common in these situations: you cancel inside a qualifying 24-hour risk-free window; the airline cancels the flight and you decline rebooking; the airline makes a significant schedule change and you choose a refund; or you purchased a fully refundable fare and cancel inside that fare’s stated window. Always verify the written fare rules attached to your ticket—marketing pages can lag behind inventory systems.',
    },
    {
      type: 'p',
      text: 'U.S. travelers should read the [[https://www.transportation.gov/airconsumer/refunds|U.S. Department of Transportation refund guidance]] for airline-canceled flights and significant changes. Canadian travelers can review [[https://otc-cta.gc.ca/eng/air-passenger-protection|Canada’s Air Passenger Protection Regulations]] for airline obligations when a flight is canceled or delayed. These pages are authoritative starting points; your ticket contract of carriage still controls many voluntary cancel outcomes.',
    },
    {
      type: 'h2',
      id: 'twenty-four-hour-window',
      text: 'The 24-hour risk-free cancellation window',
    },
    {
      type: 'p',
      text: 'Many U.S. airline purchases made at least seven days before departure qualify for a risk-free cancel within 24 hours of booking. That window is one of the cleanest paths to a full refund in 2026—but only when your purchase channel is covered. Tickets bought through some online travel agencies, consolidators, or non-U.S. sellers may follow different clocks. Note the exact booking timestamp in your confirmation, not “end of day” in your local timezone unless the seller states otherwise.',
    },
    {
      type: 'ol',
      items: [
        'Open the confirmation email and note purchase date, time, and seller name.',
        'Confirm whether the ticket is marked refundable, non-refundable, or basic economy.',
        'Cancel through the same channel you used to buy whenever possible.',
        'Save the cancel confirmation and any refund reference number immediately.',
        'Watch your card statement for the matching credit and keep screenshots if posting lags.',
      ],
    },
    {
      type: 'h2',
      id: 'non-refundable-tickets',
      text: 'Non-refundable tickets, credits, and partial cash',
    },
    {
      type: 'p',
      text: 'Most deeply discounted fares on Air Canada, United, Delta, American, WestJet, and similar carriers are non-refundable for voluntary cancels after the risk-free period. That does not always mean zero value. Airlines frequently convert residual value into a future travel credit with an expiration date. Government taxes on unused international segments can sometimes be claimed even when the base fare stays as credit—ask the airline to itemize before you assume nothing is recoverable.',
    },
    {
      type: 'p',
      text: 'Basic economy brands often block cancels after purchase except where required by law or airline waiver. If you might need flexibility, compare the price gap to a main cabin or refundable fare before you buy. After the fact, {{flight-changes}} can be cheaper than canceling and rebuying when dates merely need to move.',
    },
    {
      type: 'h2',
      id: 'airline-canceled-flights',
      text: 'When the airline cancels or changes your flight',
    },
    {
      type: 'p',
      text: 'If the airline cancels, you typically may accept a rebooking or request a refund of the unused portion. Significant schedule changes—often measured in hours of departure shift, though thresholds vary—can also unlock a refund choice. Do not ignore airline app notifications; missing a rebooking deadline can complicate options. Document the original and new times with screenshots from the airline, not only from a third-party itinerary manager.',
    },
    {
      type: 'h2',
      id: 'step-by-step-cancel',
      text: 'Step-by-step: how to cancel and request a refund',
    },
    {
      type: 'ol',
      items: [
        'Gather the airline confirmation code, passenger names, and original payment method.',
        'Read the fare rules PDF or “receipt and itinerary” section for cancel language.',
        'Check for active waivers on the airline’s travel alerts page during storms or strikes.',
        'Submit the cancel online if available; call if the site only offers credit when you believe a cash refund applies.',
        'Ask explicitly: cash refund to original form of payment, travel credit, or mixed outcome.',
        'Request an email confirmation with refund amount and expected timing.',
        'If a third party sold the ticket, open a case with that seller and the operating airline—do not assume one call covers both.',
      ],
    },
    {
      type: 'h2',
      id: 'third-party-bookings',
      text: 'Third-party bookings and agency tickets',
    },
    {
      type: 'p',
      text: 'Tickets issued by online travel agencies can restrict airline agents from processing refunds without the agency’s authorization. Have the agency booking ID and the airline record locator ready. If the agency delays a refund you are owed after an airline cancel, escalate with written timelines and keep every case number. Independent help such as {{flight-cancellation}} can clarify which channel must act, but the seller of record still controls many agency-issued tickets.',
    },
    {
      type: 'h2',
      id: 'common-mistakes',
      text: 'Common mistakes that cost people refunds',
    },
    {
      type: 'ul',
      items: [
        'No-showing without canceling—many fares then forfeit remaining value.',
        'Canceling the wrong passenger on a multi-name booking without confirming a split.',
        'Assuming “free cancel” marketing from a hotel-style OTA applies to airline tickets.',
        'Waiting past credit expiration dates after accepting non-cash residual value.',
        'Mixing up schedule-change refund rights with voluntary cancel rules.',
      ],
    },
    {
      type: 'h2',
      id: 'documentation-checklist',
      text: 'Documentation checklist that speeds refunds',
    },
    {
      type: 'p',
      text: 'Refunds stall when evidence is incomplete. Before you call or submit an online form, collect the e-ticket number, airline record locator, agency booking ID if any, passenger names exactly as ticketed, original payment last four digits, fare brand name, and screenshots of the cancel or schedule-change notice. If a medical or bereavement exception might apply, ask the airline which documents they accept before you gather sealed letters that may not help. Keep a simple timeline: purchase time, cancel request time, case numbers, and promised follow-up dates. That packet makes it easier for {{flight-cancellation}} specialists—or airline agents—to argue the correct outcome instead of restarting discovery on every transfer.',
    },
    {
      type: 'h2',
      id: 'refunds-vs-credits-2026',
      text: 'Refunds versus credits in 2026: how to choose',
    },
    {
      type: 'p',
      text: 'When both a cash refund and a travel credit are offered, choose deliberately. Cash protects you if you may not fly that airline again. Credits can be useful when you already plan another trip on the same carrier before the credit expires, but expiration dates, name-change limits, and redeposit rules can erase the perceived “full value.” Ask whether companion tickets, basic economy restrictions, or partner redemptions reduce what the credit can buy. Never accept a credit verbally without an email showing amount, currency, and expiry. If the airline canceled and you want cash, say so clearly—agents sometimes default to rebooking language that sounds helpful but delays the refund path you actually prefer.',
    },
    {
      type: 'h2',
      id: 'when-to-call-for-help',
      text: 'When to call for help',
    },
    {
      type: 'p',
      text: 'Call for help when the airline site only shows credit but you believe a cash refund applies, when one passenger needs to cancel from a shared PNR, when an agency and airline give conflicting answers, or when a storm waiver is active and wording is unclear. {{contact}} AvioSupportDesk or use {{flight-cancellation}} for a structured review of your confirmation. For related reading, browse the {{blog}} for delay rights and change guides that often sit next to refund decisions.',
    },
    {
      type: 'p',
      text: 'Bottom line for 2026: full refunds are real—and rule-bound. Match your cancel reason to the correct policy bucket, document everything, and do not confuse travel credit with cash. Acting inside the right window matters more than arguing after the ticket has already been voided the wrong way.',
    },
  ],
}
