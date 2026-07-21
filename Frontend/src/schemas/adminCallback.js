import { z } from 'zod'

export const CALLBACK_STATUSES = ['new', 'contacted', 'closed']

export const adminCallbackSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  phone: z.string().min(1),
  preferredAt: z.string().min(1),
  status: z.enum(['new', 'contacted', 'closed']),
  createdAt: z.string().min(1),
  updatedAt: z.string().min(1),
})

export const adminCallbackListSchema = z.object({
  items: z.array(adminCallbackSchema),
})
