import { z } from 'zod'
import { CALLBACK_VALIDATION_MESSAGES } from '@/modules/callback/constants'

const PHONE_PATTERN = /^\+?[\d\s().-]{7,20}$/

export const callbackRequestSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, CALLBACK_VALIDATION_MESSAGES.nameRequired)
    .max(80, CALLBACK_VALIDATION_MESSAGES.nameTooLong),
  phone: z
    .string()
    .trim()
    .min(7, CALLBACK_VALIDATION_MESSAGES.phoneRequired)
    .max(20, CALLBACK_VALIDATION_MESSAGES.phoneTooLong)
    .regex(PHONE_PATTERN, CALLBACK_VALIDATION_MESSAGES.phoneInvalid),
  preferredAt: z
    .string()
    .trim()
    .min(1, CALLBACK_VALIDATION_MESSAGES.datetimeRequired)
    .refine((value) => {
      const parsed = new Date(value)
      return !Number.isNaN(parsed.getTime()) && parsed.getTime() > Date.now()
    }, CALLBACK_VALIDATION_MESSAGES.datetimeFuture),
})
