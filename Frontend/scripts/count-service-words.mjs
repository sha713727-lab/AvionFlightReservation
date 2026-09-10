import { readFileSync } from 'fs'

function words(s) {
  return String(s || '')
    .split(/\s+/)
    .filter((w) => /[A-Za-z0-9]/.test(w)).length
}

function extractStrings(block) {
  const out = []
  const re = /'((?:\\'|[^'])*)'/g
  let m
  while ((m = re.exec(block))) out.push(m[1].replace(/\\'/g, "'"))
  return out
}

function collectExport(src, name) {
  const marker = `export const ${name}`
  const start = src.indexOf(marker)
  if (start < 0) return ''
  const next = src.indexOf('export const ', start + marker.length)
  return next < 0 ? src.slice(start) : src.slice(start, next)
}

const bodiesA = readFileSync(
  'Frontend/src/modules/seoLanding/constants/serviceBodiesGroupA.js',
  'utf8',
).replace(/\r\n/g, '\n')
const bodiesB = readFileSync(
  'Frontend/src/modules/seoLanding/constants/serviceBodiesGroupB.js',
  'utf8',
).replace(/\r\n/g, '\n')
const faqA = readFileSync(
  'Frontend/src/modules/seoLanding/constants/serviceFaqsGroupA.js',
  'utf8',
)
const faqB = readFileSync(
  'Frontend/src/modules/seoLanding/constants/serviceFaqsGroupB.js',
  'utf8',
)

const map = [
  ['flight-booking', 'FLIGHT_BOOKING_BODY', 'FLIGHT_BOOKING_FAQS', bodiesA, faqA],
  ['hotel-booking', 'HOTEL_BOOKING_BODY', 'HOTEL_BOOKING_FAQS', bodiesA, faqA],
  ['points-redemption', 'POINTS_REDEMPTION_BODY', 'POINTS_REDEMPTION_FAQS', bodiesA, faqA],
  ['flight-changes', 'FLIGHT_CHANGES_BODY', 'FLIGHT_CHANGES_FAQS', bodiesA, faqA],
  ['flight-cancellation', 'FLIGHT_CANCELLATION_BODY', 'FLIGHT_CANCELLATION_FAQS', bodiesB, faqB],
  ['seat-selection', 'SEAT_SELECTION_BODY', 'SEAT_SELECTION_FAQS', bodiesB, faqB],
  ['baggage-assistance', 'BAGGAGE_ASSISTANCE_BODY', 'BAGGAGE_ASSISTANCE_FAQS', bodiesB, faqB],
  ['trip-planning', 'TRIP_PLANNING_BODY', 'TRIP_PLANNING_FAQS', bodiesB, faqB],
]

const headings =
  'How It Works Benefits Why Choose AvioSupportDesk People Also Ask Ready to get help? Contact us now Call AvioSupportDesk for step-by-step phone help with flights, hotels, changes, and more. We are an independent travel assistance service—not affiliated with any airline loyalty program or bank rewards brand. Related resources'

const h1s = {
  'flight-booking': 'Flight Booking Assistance — Book Any Airline by Phone',
  'hotel-booking': 'Hotel Booking Help by Phone — Reserve Your Stay',
  'points-redemption': 'Points & Miles Redemption Help by Phone',
  'flight-changes': 'Flight Change Assistance — Rebook Any Airline Flight',
  'flight-cancellation': 'Flight Cancellation Assistance — Cancel Any Airline Flight',
  'seat-selection': 'Airline Seat Selection Help by Phone',
  'baggage-assistance': 'Baggage Fees & Allowance Assistance by Phone',
  'trip-planning': 'Trip Planning by Phone — Custom Travel Itineraries',
}

for (const [slug, bodyName, faqName, bodySrc, faqSrc] of map) {
  const bodyWords = words(extractStrings(collectExport(bodySrc, bodyName)).join(' '))
  const faqWords = words(extractStrings(collectExport(faqSrc, faqName)).join(' '))
  const total = words(h1s[slug]) + bodyWords + faqWords + words(headings)
  console.log(`${slug}\tbefore~350-450\tafter=${total}\t(body=${bodyWords}, faq=${faqWords})`)
}
