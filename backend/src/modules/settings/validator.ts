import { z } from 'zod'

const supportPhoneSchema = z
  .string()
  .trim()
  .regex(/^\+1 \d{3} \d{3} \d{4}$/, 'Enter a USA or Canada number as +1 XXX XXX XXXX')

export const contactSettingsBodySchema = z.object({
  reservationEmail: z.string().trim().email().max(160),
  supportPhones: z
    .array(supportPhoneSchema)
    .min(1, 'Add at least one contact number')
    .max(5, 'You can add up to 5 contact numbers'),
})

export type ContactSettingsBody = z.infer<typeof contactSettingsBodySchema>
