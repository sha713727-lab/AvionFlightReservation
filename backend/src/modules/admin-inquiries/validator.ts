import { z } from 'zod'

export const INQUIRY_STATUSES = [
  'new',
  'contacted',
  'qualified',
  'quote_accepted',
  'completed',
  'misdial',
  'closed',
] as const

export const adminInquiryIdParamsSchema = z.object({
  id: z.string().trim().min(1).max(64),
})

export const adminInquiryListQuerySchema = z.object({
  status: z.enum(INQUIRY_STATUSES).optional(),
})

export const adminInquiryStatusBodySchema = z.object({
  status: z.enum(INQUIRY_STATUSES),
})

export type AdminInquiryIdParams = z.infer<typeof adminInquiryIdParamsSchema>
export type AdminInquiryListQuery = z.infer<typeof adminInquiryListQuerySchema>
export type AdminInquiryStatusBody = z.infer<typeof adminInquiryStatusBodySchema>
