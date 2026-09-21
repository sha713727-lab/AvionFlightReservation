import { z } from 'zod'

export const INQUIRY_STATUSES = [
  'new',
  'contacted',
  'qualified',
  'quote_accepted',
  'completed',
  'misdial',
  'closed',
]

export const inquiryStatusSchema = z.enum([
  'new',
  'contacted',
  'qualified',
  'quote_accepted',
  'completed',
  'misdial',
  'closed',
])

export const adminInquirySchema = z.object({
  id: z.string().min(1),
  referenceCode: z.string().min(1),
  name: z.string().min(1),
  email: z.string().min(1),
  phone: z.string().min(1),
  subject: z.string().min(1),
  message: z.string().min(1),
  status: inquiryStatusSchema,
  createdAt: z.string().min(1),
  updatedAt: z.string().min(1),
})

export const adminInquiryListSchema = z.object({
  items: z.array(adminInquirySchema),
})
