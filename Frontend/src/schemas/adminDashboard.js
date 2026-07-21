import { z } from 'zod'

const adminCatalogItemSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  title: z.string().min(1),
  updatedAt: z.string().min(1),
})

export const adminDashboardSummarySchema = z.object({
  counts: z.object({
    servicesActive: z.coerce.number().int().nonnegative(),
    servicesTotal: z.coerce.number().int().nonnegative(),
    destinationTiersActive: z.coerce.number().int().nonnegative(),
    destinationPlacesActive: z.coerce.number().int().nonnegative(),
    faqsActive: z.coerce.number().int().nonnegative(),
  }),
  system: z.object({
    database: z.enum(['up', 'down']),
    generatedAt: z.string().min(1),
  }),
  recentServices: z.array(adminCatalogItemSchema),
  recentFaqs: z.array(adminCatalogItemSchema),
})
