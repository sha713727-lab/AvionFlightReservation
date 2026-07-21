export interface AdminPlaceDto {
  id: string
  name: string
  alt: string
  imageUrl: string
  mediaUrl: string | null
  mediaType: 'image' | 'video' | null
  sortOrder: number
  isActive: boolean
  tierId: string
  tierTitle: string
  tierSlug: string
  createdAt: string
  updatedAt: string
}

export interface AdminPlaceWriteInput {
  name: string
  alt: string
  imageUrl: string
  isActive: boolean
  tierId: string
}

export interface AdminPlaceListResult {
  items: AdminPlaceDto[]
}

export interface AdminPlaceTierOption {
  id: string
  title: string
  slug: string
  isActive: boolean
}

export interface AdminPlaceOptionsResult {
  tiers: AdminPlaceTierOption[]
}
