import {
  BAGGAGE_ASSISTANCE_PATH,
  CONTACT_PATH,
  FLIGHT_BOOKING_PATH,
  FLIGHT_CANCELLATION_PATH,
  FLIGHT_CHANGES_PATH,
  BLOG_PATH,
  SERVICES_PATH,
} from '@/constants/routes'

/** Shared keyword-rich internal links for blog body copy. */
export const BLOG_LINK_MAP = {
  blog: { href: BLOG_PATH, label: 'AvioSupportDesk Blog' },
  contact: { href: CONTACT_PATH, label: 'contact AvioSupportDesk' },
  services: { href: SERVICES_PATH, label: 'travel services by phone' },
  'flight-booking': { href: FLIGHT_BOOKING_PATH, label: 'flight booking assistance' },
  'flight-cancellation': { href: FLIGHT_CANCELLATION_PATH, label: 'flight cancellation assistance' },
  'flight-changes': { href: FLIGHT_CHANGES_PATH, label: 'flight change assistance' },
  'baggage-assistance': { href: BAGGAGE_ASSISTANCE_PATH, label: 'baggage allowance help' },
}

export function countWordsFromBlocks(blocks) {
  return blocks.reduce((total, block) => {
    if (block.type === 'p' || block.type === 'h2' || block.type === 'h3') {
      return total + String(block.text || '').split(/\s+/).filter(Boolean).length
    }
    if (block.type === 'ul' || block.type === 'ol') {
      return (
        total +
        (block.items || []).reduce(
          (sum, item) => sum + String(item).split(/\s+/).filter(Boolean).length,
          0,
        )
      )
    }
    return total
  }, 0)
}

export function estimateReadMinutes(wordCount) {
  return Math.max(1, Math.round(wordCount / 200))
}

export function buildToc(blocks) {
  return blocks
    .filter((block) => block.type === 'h2' && block.id)
    .map((block) => ({ id: block.id, label: block.text }))
}
