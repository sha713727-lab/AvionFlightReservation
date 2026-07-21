export type AdminCatalogItem = {
  id: string
  slug: string
  title: string
  updatedAt: string
}

export type AdminDashboardSummary = {
  counts: {
    servicesActive: number
    servicesTotal: number
    destinationTiersActive: number
    destinationPlacesActive: number
    faqsActive: number
  }
  system: {
    database: 'up' | 'down'
    generatedAt: string
  }
  recentServices: AdminCatalogItem[]
  recentFaqs: AdminCatalogItem[]
}
