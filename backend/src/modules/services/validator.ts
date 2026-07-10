import { z } from 'zod'

export const serviceSlugParamsSchema = z.object({
  slug: z.string().min(1).max(100),
})

export type ServiceSlugParams = z.infer<typeof serviceSlugParamsSchema>
