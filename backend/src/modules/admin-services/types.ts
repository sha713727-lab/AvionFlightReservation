import type { ServiceIconKey, ServiceImageKey } from './constants.js'

export type AdminServiceMediaType = 'image' | 'video'

export interface AdminServiceDto {
  id: string
  slug: string
  title: string
  tagline: string
  description: string
  features: string[]
  iconKey: ServiceIconKey
  imageKey: ServiceImageKey
  imageAlt: string
  mediaUrl: string | null
  mediaType: AdminServiceMediaType | null
  sortOrder: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface AdminServiceOptionsDto {
  iconKeys: readonly ServiceIconKey[]
  imageKeys: readonly ServiceImageKey[]
}

export interface AdminServiceWriteInput {
  slug: string
  title: string
  tagline: string
  description: string
  features: string[]
  iconKey: ServiceIconKey
  imageKey: ServiceImageKey
  imageAlt: string
  isActive: boolean
}

export interface AdminServiceListResult {
  items: AdminServiceDto[]
}
