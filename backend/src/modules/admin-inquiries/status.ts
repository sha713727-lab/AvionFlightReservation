import type { AdminInquiryDto, AdminInquiryStatus } from './types.js'

export const INQUIRY_STATUS_SET = new Set<AdminInquiryStatus>([
  'new',
  'contacted',
  'qualified',
  'quote_accepted',
  'completed',
  'misdial',
  'closed',
])

export function toInquiryStatus(value: string): AdminInquiryStatus {
  if (INQUIRY_STATUS_SET.has(value as AdminInquiryStatus)) {
    return value as AdminInquiryStatus
  }
  return 'new'
}

export function toInquiryDto(row: {
  id: string
  referenceCode: string
  name: string
  email: string
  phone: string
  subject: string
  message: string
  status: string
  createdAt: Date
  updatedAt: Date
}): AdminInquiryDto {
  return {
    id: row.id,
    referenceCode: row.referenceCode,
    name: row.name,
    email: row.email,
    phone: row.phone,
    subject: row.subject,
    message: row.message,
    status: toInquiryStatus(row.status),
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  }
}
