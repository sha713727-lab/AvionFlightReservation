import { z } from 'zod'

export const ADMIN_FAQ_VALIDATION = {
  slugRequired: 'Enter a lowercase slug (e.g. booking-help).',
  questionRequired: 'Enter a question between 5 and 300 characters.',
  answerRequired: 'Enter an answer between 10 and 5000 characters.',
}

export const adminFaqSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  question: z.string().min(1),
  answer: z.string().min(1),
  sortOrder: z.number().int(),
  isActive: z.boolean(),
  createdAt: z.string().min(1),
  updatedAt: z.string().min(1),
})

export const adminFaqListSchema = z.object({
  items: z.array(adminFaqSchema),
})

export const adminFaqFormSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(2, ADMIN_FAQ_VALIDATION.slugRequired)
    .max(80, ADMIN_FAQ_VALIDATION.slugRequired)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, ADMIN_FAQ_VALIDATION.slugRequired),
  question: z
    .string()
    .trim()
    .min(5, ADMIN_FAQ_VALIDATION.questionRequired)
    .max(300, ADMIN_FAQ_VALIDATION.questionRequired),
  answer: z
    .string()
    .trim()
    .min(10, ADMIN_FAQ_VALIDATION.answerRequired)
    .max(5000, ADMIN_FAQ_VALIDATION.answerRequired),
  isActive: z.boolean(),
})
