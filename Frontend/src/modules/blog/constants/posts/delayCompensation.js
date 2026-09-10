import { BLOG_DELAY_COMPENSATION_PATH } from '@/constants/routes'

export const POST_DELAY_COMPENSATION = {
  slug: 'flight-delay-compensation-passenger-rights',
  path: BLOG_DELAY_COMPENSATION_PATH,
  title: 'Flight Delay Compensation — Know Your Passenger Rights',
  h1: 'Flight Delay Compensation — Know Your Passenger Rights',
  excerpt:
    'Understand delay compensation basics for U.S., Canadian, and EU itineraries, what airlines must provide, and how to document a claim.',
  publishedAt: '2026-09-05',
  publishedLabel: 'September 5, 2026',
  updatedAt: '2026-09-10',
  updatedLabel: 'September 10, 2026',
  relatedSlugs: [
    'how-to-cancel-a-flight-and-get-a-full-refund-in-2026',
    'how-to-change-your-flight-booking-step-by-step',
    'airlines-customer-service-numbers-complete-contact-guide',
  ],
  faqs: [
    {
      question: 'Do U.S. airlines always pay cash compensation for delays?',
      answer:
        'U.S. rules focus heavily on refunds when airlines cancel or make significant changes and you choose not to travel, plus tarmac delay limits. Cash “delay compensation” like EU261 is not mirrored dollar-for-dollar in the United States for every long delay. Check DOT guidance and your airline’s contract of carriage.',
    },
    {
      question: 'Does weather delay qualify for EU261-style compensation?',
      answer:
        'Extraordinary circumstances such as severe weather often reduce or eliminate standardized cash compensation under EU261, though care obligations like meals or hotels can still apply depending on the situation. Each case turns on cause and length of delay.',
    },
    {
      question: 'What should I save to support a delay claim?',
      answer:
        'Keep boarding passes, delay notices, meal receipts if required by the airline’s care policy, rebooking confirmations, and timestamps from the airline app. Written case numbers from airline customer service matter more than social media screenshots alone.',
    },
  ],
  blocks: [
    {
      type: 'p',
      text: 'Passenger rights for delayed flights differ in the United States, Canada, and the European Union. Treat disruption as a documentation problem first—timestamps, delay notices, and receipts—then use the correct regime’s checklist instead of mixing rules across borders.',
    },
    {
      type: 'p',
      text: 'This explainer covers what to expect in 2026, how to document delays, and when to pursue refunds versus care (meals, hotels) versus standardized cash compensation. For booking changes after a delay cascade, {{flight-changes}} can help you evaluate rebooking options while you track airline obligations. Keep expectations realistic: the rulebook that applies is the one covering your specific itinerary, not the country where you live.',
    },
    {
      type: 'h2',
      id: 'us-delay-rights',
      text: 'United States: refunds, tarmac rules, and contingency plans',
    },
    {
      type: 'p',
      text: 'U.S. air travel consumer rules emphasize refunds when airlines cancel flights or make significant schedule changes and you choose not to travel, along with tarmac delay limits and contingency plan requirements for large carriers. They do not create a single EU-style cash payout for every lengthy airborne delay. Start with [[https://www.transportation.gov/airconsumer|DOT Air Consumer information]] and the airline’s contract of carriage linked from its legal pages.',
    },
    {
      type: 'p',
      text: 'If the airline cancels and you no longer want to fly, request a refund of the unused ticket value rather than accepting a voucher unless you prefer credit. If the airline rebooks you and you accept, cash delay compensation may still be limited, but meal or hotel vouchers can appear under airline customer-service policies during long disruptions.',
    },
    {
      type: 'h2',
      id: 'canada-appr',
      text: 'Canada: Air Passenger Protection Regulations',
    },
    {
      type: 'p',
      text: 'Canada’s Air Passenger Protection Regulations set minimum standards for communication, assistance, and compensation in certain delay and cancel scenarios, with amounts that can depend on delay length and whether the airline controlled the disruption. Review the [[https://otc-cta.gc.ca/eng/air-passenger-protection|CTA Air Passenger Protection]] pages for current categories. Always confirm whether your itinerary is covered and which operating carrier is responsible.',
    },
    {
      type: 'h2',
      id: 'eu261',
      text: 'EU261 and long delays on qualifying European flights',
    },
    {
      type: 'p',
      text: 'Regulation (EC) No 261/2004—commonly called EU261—can require care and standardized compensation for covered flights that arrive late by a qualifying threshold, subject to extraordinary circumstances defenses. Coverage typically involves flights departing EU airports (and some arrivals on EU carriers). Read official summaries via [[https://europa.eu/youreurope/citizens/travel/passenger-rights/air/index_en.htm|Your Europe air passenger rights]] before paying a claim-farming company a large cut of any award.',
    },
    {
      type: 'h2',
      id: 'document-everything',
      text: 'Document everything while you are still at the airport',
    },
    {
      type: 'ol',
      items: [
        'Screenshot the original and new departure times in the airline app.',
        'Ask gate agents whether hotel or meal vouchers are being issued.',
        'Keep boarding passes even if you are rebooked overnight.',
        'Note connection misconnects and whether bags were rechecked.',
        'Open a written case with airline customer service before leaving the airport when possible.',
      ],
    },
    {
      type: 'h2',
      id: 'care-vs-compensation',
      text: 'Care versus compensation versus refund',
    },
    {
      type: 'p',
      text: 'Care means meals, communication, and sometimes hotels during long delays. Compensation means a cash-like payment under a specific regulation. A refund returns ticket money when you elect not to travel after a cancel or significant change. You can sometimes receive care during a delay and later pursue compensation—those are not always mutually exclusive—but stacking claims incorrectly can slow everything down.',
    },
    {
      type: 'h2',
      id: 'codeshares-and-partners',
      text: 'Codeshares, partners, and who pays',
    },
    {
      type: 'p',
      text: 'On codeshare itineraries, the operating carrier usually manages the irregular operation on the ground, while the marketing carrier may still be the seller on your receipt. File with the airline that shows the delayed flight in its system, and copy the seller if you bought through an agency. Partner award tickets can add a third party—the program that issued the award—into the conversation.',
    },
    {
      type: 'h2',
      id: 'evidence-to-collect',
      text: 'Evidence to collect during the delay',
    },
    {
      type: 'p',
      text: 'Compensation claims fail when travelers only remember “it was late.” Capture the scheduled and actual departure times from the airline app, gate display photos, delay reason codes if shown, meal or hotel voucher serials, and receipts for reasonable expenses you paid yourself. Note whether the airline offered rebooking options you declined. For EU itineraries, keep boarding passes and booking confirmations that prove the carrier and route. U.S. travelers chasing refunds after significant changes should retain the airline’s written notice. Canadian travelers should record whether the delay was within the carrier’s control under APPR categories. Store files in one folder before you leave the airport—memory fades faster than battery life.',
    },
    {
      type: 'h2',
      id: 'tarmac-and-communication',
      text: 'Tarmac delays and communication duties',
    },
    {
      type: 'p',
      text: 'Long tarmac delays trigger separate consumer expectations around food, water, lavatories, and the right to deplane after set thresholds on many U.S. domestic flights. Read [[https://www.transportation.gov/airconsumer|DOT air consumer materials]] for current U.S. tarmac delay rules, and treat airline contract language as the operational detail layer. Communication matters too: unexplained multi-hour waits without updates are a common complaint theme. Ask agents for the delay reason category in writing when possible—that category often decides whether standard care or cash-like compensation applies under Canadian or EU frameworks.',
    },
    {
      type: 'h2',
      id: 'missed-connections',
      text: 'Missed connections and protected itineraries',
    },
    {
      type: 'p',
      text: 'A short delay on the first flight can erase a legal connection. When both flights are on one ticket, airlines generally must rebook you onward at no extra fare difference for protected itineraries, though hotel care still depends on cause and regime. Separately ticketed flights are riskier—the second airline may treat you as a no-show if you miss the departure. If you self-rebook on a different carrier without authorization, you can complicate refunds. Ask whether your bags can make the new connection and whether overnight care applies. For voluntary date moves after a disruption settles, compare {{flight-changes}} against waiting for the airline’s involuntary rebooking options so you do not pay twice for the same recovery.',
    },
    {
      type: 'h2',
      id: 'after-you-get-home',
      text: 'After you get home: filing a clean claim',
    },
    {
      type: 'p',
      text: 'Submit claims through the airline’s official delay or refund form with PDF attachments, not only social media tags. Include passenger names, ticket numbers, flight numbers, and a short timeline. If you need to adjust remaining travel after a disruption, {{flight-changes}} or {{flight-cancellation}} support can help you choose between rebooking and refunding unused segments. {{contact}} AvioSupportDesk when the paperwork is unclear and you want a second set of eyes on next steps.',
    },
    {
      type: 'p',
      text: 'Passenger rights are real, but they are regime-specific. Identify which rulebook covers your itinerary, collect evidence early, and pursue care, compensation, or refunds through official channels. For more practical travel explainers, visit the {{blog}}.',
    },
  ],
}
