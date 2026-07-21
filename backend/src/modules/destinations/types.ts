export interface DestinationPlaceDto {
  id: string
  name: string
  alt: string
  imageUrl: string
  mediaUrl: string | null
  mediaType: 'image' | 'video' | null
  sortOrder: number
}

export interface DestinationTierDto {
  id: string
  slug: string
  title: string
  points: number
  sortOrder: number
  places: DestinationPlaceDto[]
}

export interface DestinationListResult {
  items: DestinationTierDto[]
  pagination: {
    page: number
    pageSize: number
    total: number
    totalPages: number
  }
}
