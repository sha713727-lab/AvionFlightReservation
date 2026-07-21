import type { DatabaseClient } from '../../database/prisma.js'
import type {
  CallbackRequestCreateInput,
  CallbackRequestDto,
  CallbackRequestStatus,
} from './types.js'

function toStatus(value: string): CallbackRequestStatus {
  if (value === 'contacted' || value === 'closed') return value
  return 'new'
}

function toDto(row: {
  id: string
  name: string
  phone: string
  preferredAt: Date
  status: string
  createdAt: Date
  updatedAt: Date
}): CallbackRequestDto {
  return {
    id: row.id,
    name: row.name,
    phone: row.phone,
    preferredAt: row.preferredAt.toISOString(),
    status: toStatus(row.status),
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  }
}

export class CallbackRequestRepository {
  constructor(private readonly db: DatabaseClient) {}

  async create(input: CallbackRequestCreateInput): Promise<CallbackRequestDto> {
    const row = await this.db.callbackRequest.create({
      data: {
        name: input.name,
        phone: input.phone,
        preferredAt: input.preferredAt,
        status: 'new',
      },
    })
    return toDto(row)
  }
}
