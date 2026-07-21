export interface AdminFaqDto {
  id: string
  slug: string
  question: string
  answer: string
  sortOrder: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface AdminFaqWriteInput {
  slug: string
  question: string
  answer: string
  isActive: boolean
}

export interface AdminFaqListResult {
  items: AdminFaqDto[]
}
