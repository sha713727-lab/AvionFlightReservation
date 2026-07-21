export type CallbackRequestStatus = 'new' | 'contacted' | 'closed'

export interface CallbackRequestDto {
  id: string
  name: string
  phone: string
  preferredAt: string
  status: CallbackRequestStatus
  createdAt: string
  updatedAt: string
}

export interface CallbackRequestCreateInput {
  name: string
  phone: string
  preferredAt: Date
}

export interface CallbackRequestListResult {
  items: CallbackRequestDto[]
}
