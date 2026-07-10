export interface FaqDto {
  id: string
  slug: string
  question: string
  answer: string
  sortOrder: number
}

export interface FaqListResult {
  items: FaqDto[]
  pagination: {
    page: number
    pageSize: number
    total: number
    totalPages: number
  }
}
