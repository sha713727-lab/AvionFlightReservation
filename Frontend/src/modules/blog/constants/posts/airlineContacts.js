import { BLOG_AIRLINE_CONTACT_GUIDE_PATH } from '@/constants/routes'

export const POST_AIRLINE_CONTACTS = {
  slug: 'airlines-customer-service-numbers-complete-contact-guide',
  path: BLOG_AIRLINE_CONTACT_GUIDE_PATH,
  title: 'Airlines Customer Service Numbers — Complete Contact Guide',
  h1: 'Airlines Customer Service Numbers — Complete Contact Guide',
  excerpt:
    'Find practical ways to reach major airline customer service teams, what to prepare before you call, and when phone support beats the app.',
  publishedAt: '2026-09-03',
  publishedLabel: 'September 3, 2026',
  updatedAt: '2026-09-10',
  updatedLabel: 'September 10, 2026',
  relatedSlugs: [
    'how-to-cancel-a-flight-and-get-a-full-refund-in-2026',
    'how-to-change-your-flight-booking-step-by-step',
    'flight-delay-compensation-passenger-rights',
  ],
  faqs: [
    {
      question: 'Why do airline customer service numbers change so often?',
      answer:
        'Airlines rotate toll-free lines, add specialty desks for elite members, and publish different numbers by country. Always confirm the number on the airline’s official contact page for your region before you dial long hold times on an outdated listing.',
    },
    {
      question: 'Should I call the airline or the online travel agency first?',
      answer:
        'Start with whoever issued the ticket. Agency-issued tickets often require the agency to authorize changes or refunds. The operating airline may still help with irregular operations, seat maps, or day-of travel issues.',
    },
  ],
  blocks: [
    {
      type: 'p',
      text: 'Airline customer service numbers change often, so treat directories as perishable. Verify phones on the airline’s own site, prepare booking details before you dial, and know when an app or independent specialist finishes the job faster than hold music.',
    },
    {
      type: 'p',
      text: 'This contact guide explains how to reach major carriers, what queues exist beyond the main reservations line, and how AvioSupportDesk {{services}} can help when you need structured phone assistance without pretending we are the airline itself.',
    },
    {
      type: 'h2',
      id: 'verify-official-numbers',
      text: 'Always verify numbers on official airline pages',
    },
    {
      type: 'p',
      text: 'Bookmark the airline’s “Contact us” page from the official domain—typically ending in .com for U.S. brands or the country’s ccTLD for foreign carriers. Avoid dialing numbers from ads that appear above search results unless the URL clearly belongs to the airline. Scammers spoof hold music and payment requests; airlines will not ask you to pay a “refund processing fee” by gift card.',
    },
    {
      type: 'p',
      text: 'For U.S. consumer complaint pathways after airline issues, review [[https://www.transportation.gov/airconsumer|DOT Air Consumer protection resources]]. For Canadian carriers and passenger rights context, see the [[https://otc-cta.gc.ca/eng|Canadian Transportation Agency]]. Those sites are not phone directories, but they help when service calls fail.',
    },
    {
      type: 'h2',
      id: 'what-to-prepare',
      text: 'What to prepare before you call airline customer service',
    },
    {
      type: 'ul',
      items: [
        'Airline confirmation code and any agency booking ID.',
        'Passenger names exactly as ticketed.',
        'Flight numbers, dates, and origin/destination airports.',
        'Form of payment used and approximate purchase date.',
        'Screenshots of error messages, schedule changes, or denied boarding notices.',
        'A clear ask: refund, change, seat, bag, or schedule clarification.',
      ],
    },
    {
      type: 'p',
      text: 'Agents resolve calls faster when you open with the confirmation code and the outcome you want. If you need {{flight-changes}} or {{flight-cancellation}}, say so early so you are not routed through a general FAQ bot loop longer than necessary.',
    },
    {
      type: 'h2',
      id: 'major-carrier-contact-patterns',
      text: 'Major carrier contact patterns (North America focus)',
    },
    {
      type: 'p',
      text: 'Large network airlines—Air Canada, United, Delta, American, Alaska, JetBlue, WestJet—usually publish separate lines or menu options for reservations, existing bookings, baggage, and elite members. Low-cost carriers may push chat and app messaging first, with phone support limited or paid. Codeshare flights add confusion: the marketing carrier on your ticket may not operate the aircraft, and day-of issues often go to the operating carrier’s airport team.',
    },
    {
      type: 'h3',
      id: 'reservations-vs-existing-booking',
      text: 'Reservations versus existing booking desks',
    },
    {
      type: 'p',
      text: 'New bookings and award redemptions sometimes sit on different phone trees than changes to tickets already issued. If you already have a ticket number (a 13-digit document number on many carriers), choose “existing reservation” menus. Calling the new-booking line with a change request can mean a full redial after a long hold.',
    },
    {
      type: 'h3',
      id: 'baggage-and-airport',
      text: 'Baggage, irregular ops, and airport desks',
    },
    {
      type: 'p',
      text: 'Delayed bag files are typically opened at the arrival airport baggage office, not on the main reservations number. For same-day misconnects, gate agents and airline app rebooking tools often move faster than the national call center. Keep {{baggage-assistance}} in mind when you need fee or allowance clarity before you fly, and use airport desks when a bag is already missing.',
    },
    {
      type: 'h2',
      id: 'hold-times-and-callbacks',
      text: 'Hold times, callbacks, and smarter timing',
    },
    {
      type: 'p',
      text: 'Midweek mornings in the airline’s primary time zone are often quieter than Monday mornings or Sunday evenings. If the airline offers an automated callback, take it—losing your place in queue by hanging up rarely helps. Elite status phone lines, when you qualify, can cut hours to minutes, which is one reason fare brands that include status credits matter for frequent callers.',
    },
    {
      type: 'h2',
      id: 'when-apps-beat-phones',
      text: 'When the app beats the phone—and when it does not',
    },
    {
      type: 'p',
      text: 'Seat maps, same-day standby lists, digital boarding passes, and simple date changes on flexible fares are often faster in the airline app. Complex multi-city tickets, name corrections, infant tickets, partner award issues, and refund disputes still usually need a human. If the app shows an error code, screenshot it before you call so the agent is not guessing.',
    },
    {
      type: 'h2',
      id: 'what-to-say-on-the-call',
      text: 'What to say in the first sixty seconds',
    },
    {
      type: 'p',
      text: 'Airline agents process hundreds of calls. Lead with the outcome you need, then the ticket identifiers: “I need a schedule change on confirmation ABC123 for Jane Doe departing Toronto on March 12.” Mention elite status or special assistance only after the locator is pulled. If you were transferred, restate the case number so the next agent does not restart from zero. Avoid storytelling until the record is open—extra narrative without a locator often lengthens hold transfers. When you reach a specialty desk for refunds or bereavement, ask whether your case stays with that desk or returns to general queue after after-hours.',
    },
    {
      type: 'h2',
      id: 'regional-contact-pages',
      text: 'Use regional contact pages, not generic search snippets',
    },
    {
      type: 'p',
      text: 'Large carriers publish different contact paths for the United States, Canada, Europe, and Latin America. A U.S. toll-free line may not help a ticket issued in CAD under a Canadian contract of carriage. Start from the airline’s site footer for your country, then open the contact or “help” hub. Bookmark that URL. Search snippets and aggregator “airline phone number” lists go stale quickly and are a common vector for spoofed numbers. Official examples include [[https://www.aircanada.com/ca/en/aco/home/book/help.html|Air Canada help]], [[https://www.united.com/en/us/fly/help-center.html|United help center]], and [[https://www.delta.com/us/en/need-help/overview|Delta need help]]—always re-check before you dial.',
    },
    {
      type: 'h2',
      id: 'independent-help',
      text: 'When independent phone help makes sense',
    },
    {
      type: 'p',
      text: 'AvioSupportDesk is not an airline call center. We provide independent {{flight-booking}}, change, and cancel assistance when you want a specialist to interpret fare rules and next steps. Use airline customer service for official account security resets, loyalty password issues, and policies only the carrier can waive. Use {{contact}} when you want structured help preparing or completing a booking-related request.',
    },
    {
      type: 'h2',
      id: 'safety-checklist',
      text: 'Safety checklist for airline phone support',
    },
    {
      type: 'ol',
      items: [
        'Confirm the domain before dialing any number from search.',
        'Never pay a “refund fee” by gift card, crypto, or wire.',
        'Do not read full credit card numbers to someone who called you unsolicited.',
        'Prefer published airline pages over screenshots shared in social media comments.',
        'End the call if payment urgency replaces a normal booking workflow.',
      ],
    },
    {
      type: 'p',
      text: 'Keep this guide handy, but treat every number as something to re-check on the airline’s site the day you call. Official pages remain the source of truth; the {{blog}} and our {{services}} pages exist to help you decide what to ask for once you are connected.',
    },
  ],
}
