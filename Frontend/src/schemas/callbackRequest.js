import { z } from 'zod'
import { CALLBACK_VALIDATION_MESSAGES } from '@/modules/callback/constants'
import {
  formatNorthAmericanPhone,
  isCompleteNorthAmericanPhone,
} from '@/utils/northAmericanPhone'
import { datetimeLocalToIso, isFutureDatetimeLocal } from '@/utils/datetimeLocal'

export const callbackRequestSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, CALLBACK_VALIDATION_MESSAGES.nameRequired)
    .max(80, CALLBACK_VALIDATION_MESSAGES.nameTooLong),
  phone: z
    .string()
    .trim()
    .transform((value) => formatNorthAmericanPhone(value).trim())
    .refine(isCompleteNorthAmericanPhone, CALLBACK_VALIDATION_MESSAGES.phoneInvalid),
  preferredAt: z
    .string()
    .trim()
    .min(1, CALLBACK_VALIDATION_MESSAGES.datetimeRequired)
    .refine(isFutureDatetimeLocal, CALLBACK_VALIDATION_MESSAGES.datetimeFuture)
    .transform((value) => {
      const iso = datetimeLocalToIso(value)
      if (!iso) {
        throw new Error(CALLBACK_VALIDATION_MESSAGES.datetimeFuture)
      }
      return iso
    }),
})

export const callbackCreatedSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  phone: z.string().min(1),
  preferredAt: z.string().min(1),
  status: z.enum(['new', 'contacted', 'closed']),
  createdAt: z.string().min(1),
  updatedAt: z.string().min(1),
})
