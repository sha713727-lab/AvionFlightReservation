import { z } from 'zod'
import { inquiryStatusSchema } from '@/schemas/adminInquiry'

export const inquiryCreatedSchema = z.object({
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
