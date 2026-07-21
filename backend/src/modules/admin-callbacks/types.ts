export type AdminCallbackStatus = 'new' | 'contacted' | 'closed'

export interface AdminCallbackDto {
  id: string
  name: string
  phone: string
  preferredAt: string
  status: AdminCallbackStatus
  createdAt: string
  updatedAt: string
}

export interface AdminCallbackListResult {
  items: AdminCallbackDto[]
}
