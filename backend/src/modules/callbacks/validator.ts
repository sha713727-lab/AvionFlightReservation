import { z } from 'zod'
import { isFuturePreferredAt, parsePreferredAt } from '../../utils/preferred-at.js'

const northAmericanPhoneSchema = z
  .string()
  .trim()
  .regex(/^\+1 \d{3} \d{3} \d{4}$/, 'Enter a USA or Canada number as +1 XXX XXX XXXX')

export const callbackRequestBodySchema = z.object({
  name: z.string().trim().min(2).max(80),
  phone: northAmericanPhoneSchema,
  preferredAt: z
    .string()
    .trim()
    .min(1)
    .refine(isFuturePreferredAt, 'Choose a future date and time')
    .transform((value) => parsePreferredAt(value) as Date),
})

export type CallbackRequestBody = z.infer<typeof callbackRequestBodySchema>
