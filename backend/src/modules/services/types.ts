export interface ServiceDto {
  id: string
  slug: string
  title: string
  tagline: string
  description: string
  features: string[]
  iconKey: string
  imageKey: string
  imageAlt: string
  sortOrder: number
}

export interface ServiceListResult {
  items: ServiceDto[]
  pagination: {
    page: number
    pageSize: number
    total: number
    totalPages: number
  }
}
