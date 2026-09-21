import { z } from 'zod'

const northAmericanPhoneSchema = z
  .string()
  .trim()
  .regex(/^\+1 \d{3} \d{3} \d{4}$/, 'Enter a USA or Canada number as +1 XXX XXX XXXX')

const inquirySubjectSchema = z.enum([
  'flight-booking',
  'flight-change',
  'cancellation-refund',
  'hotel-booking',
  'points-miles',
  'other',
])

export const inquiryRequestBodySchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(120),
  phone: northAmericanPhoneSchema,
  subject: inquirySubjectSchema,
  message: z.string().trim().min(20).max(2000),
})

export type InquiryRequestBody = z.infer<typeof inquiryRequestBodySchema>
