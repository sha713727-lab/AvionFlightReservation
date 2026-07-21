export interface AdminDestinationDto {
  id: string
  slug: string
  title: string
  points: number
  sortOrder: number
  isActive: boolean
  placesCount: number
  createdAt: string
  updatedAt: string
}

export interface AdminDestinationWriteInput {
  slug: string
  title: string
  points: number
  isActive: boolean
}

export interface AdminDestinationListResult {
  items: AdminDestinationDto[]
}
