export type AdminCatalogItem = {
  id: string
  slug: string
  title: string
  updatedAt: string
}

export type AdminRecentCallbackItem = {
  id: string
  name: string
  phone: string
  status: 'new' | 'contacted' | 'closed'
  preferredAt: string
  createdAt: string
}

export type AdminRecentInquiryItem = {
  id: string
  referenceCode: string
  name: string
  subject: string
  status:
    | 'new'
    | 'contacted'
    | 'qualified'
    | 'quote_accepted'
    | 'completed'
    | 'misdial'
    | 'closed'
  createdAt: string
}

export type AdminDashboardSummary = {
  counts: {
    servicesActive: number
    servicesTotal: number
    destinationTiersActive: number
    destinationPlacesActive: number
    faqsActive: number
    callbacksNew: number
    callbacksTotal: number
    inquiriesNew: number
    inquiriesTotal: number
  }
  system: {
    database: 'up' | 'down'
    generatedAt: string
  }
  recentServices: AdminCatalogItem[]
  recentFaqs: AdminCatalogItem[]
  recentCallbacks: AdminRecentCallbackItem[]
  recentInquiries: AdminRecentInquiryItem[]
}
