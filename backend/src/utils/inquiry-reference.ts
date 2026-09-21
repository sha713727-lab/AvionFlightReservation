import { randomBytes } from 'node:crypto'

const REFERENCE_PREFIX = 'INQ-'

export function generateInquiryReferenceCode(): string {
  return `${REFERENCE_PREFIX}${randomBytes(4).toString('hex').toUpperCase()}`
}
