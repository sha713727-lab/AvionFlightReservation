import { z } from 'zod'

export const destinationSlugParamsSchema = z.object({
  slug: z.string().min(1).max(100),
})

export type DestinationSlugParams = z.infer<typeof destinationSlugParamsSchema>
