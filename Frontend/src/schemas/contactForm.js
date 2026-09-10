import { z } from 'zod'
import { CONTACT_FORM_MESSAGES } from '@/modules/contact/constants'
import {
  formatNorthAmericanPhone,
  isCompleteNorthAmericanPhone,
} from '@/utils/northAmericanPhone'

export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, CONTACT_FORM_MESSAGES.nameRequired)
    .max(80, CONTACT_FORM_MESSAGES.nameTooLong),
  email: z
    .string()
    .trim()
    .email(CONTACT_FORM_MESSAGES.emailRequired)
    .max(120, CONTACT_FORM_MESSAGES.emailRequired),
  phone: z
    .string()
    .trim()
    .transform((value) => formatNorthAmericanPhone(value).trim())
    .refine(isCompleteNorthAmericanPhone, CONTACT_FORM_MESSAGES.phoneInvalid),
  subject: z.string().trim().min(1, CONTACT_FORM_MESSAGES.subjectRequired),
  message: z
    .string()
    .trim()
    .min(20, CONTACT_FORM_MESSAGES.messageRequired)
    .max(2000, CONTACT_FORM_MESSAGES.messageTooLong),
})
