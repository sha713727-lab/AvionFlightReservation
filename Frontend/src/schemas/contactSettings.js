import { z } from 'zod'
import { PHONE_NUMBER, RESERVATION_EMAIL } from '@/constants/contact'
import {
  formatNorthAmericanPhone,
  isCompleteNorthAmericanPhone,
} from '@/utils/northAmericanPhone'

const supportPhoneSchema = z
  .string()
  .trim()
  .transform((value) => formatNorthAmericanPhone(value).trim())
  .refine(isCompleteNorthAmericanPhone, {
    message: 'Enter a USA or Canada number as +1 XXX XXX XXXX.',
  })

export const contactSettingsSchema = z.object({
  reservationEmail: z.string().email(),
  supportPhones: z.array(z.string().min(1)).min(1),
  updatedAt: z.string().min(1),
})

export const contactSettingsFormSchema = z.object({
  reservationEmail: z
    .string()
    .trim()
    .email('Enter a valid email address.')
    .max(160, 'Email must be 160 characters or fewer.'),
  supportPhones: z
    .array(supportPhoneSchema)
    .min(1, 'Add at least one contact number.')
    .max(5, 'You can add up to 5 contact numbers.'),
})

export function toMailtoHref(email) {
  const trimmed = String(email).trim()
  if (!trimmed) return 'mailto:'
  if (trimmed.toLowerCase().startsWith('mailto:')) return trimmed
  return `mailto:${trimmed}`
}

export function toTelHref(display) {
  const trimmed = String(display).trim()
  const hasPlus = trimmed.startsWith('+')
  const digits = trimmed.replace(/\D/g, '')
  return `tel:${hasPlus ? `+${digits}` : digits}`
}

export function getFallbackContactEmail() {
  return RESERVATION_EMAIL
}

export function getFallbackSupportPhones() {
  return [PHONE_NUMBER]
}
