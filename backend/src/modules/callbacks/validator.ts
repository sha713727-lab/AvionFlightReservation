import { z } from 'zod'

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
    .refine((value) => {
      const parsed = new Date(value)
      return !Number.isNaN(parsed.getTime()) && parsed.getTime() > Date.now()
    }, 'Choose a future date and time'),
})

export type CallbackRequestBody = z.infer<typeof callbackRequestBodySchema>
