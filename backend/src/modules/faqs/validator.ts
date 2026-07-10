import { z } from 'zod'

export const faqSlugParamsSchema = z.object({
  slug: z.string().min(1).max(100),
})

export type FaqSlugParams = z.infer<typeof faqSlugParamsSchema>
