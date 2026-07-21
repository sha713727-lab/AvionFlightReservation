import type { DatabaseClient } from '../../database/prisma.js'
import type { AdminCallbackDto, AdminCallbackStatus } from './types.js'

function toStatus(value: string): AdminCallbackStatus {
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
}): AdminCallbackDto {
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

export class AdminCallbackRepository {
  constructor(private readonly db: DatabaseClient) {}

  async findAll(status?: AdminCallbackStatus): Promise<AdminCallbackDto[]> {
    const rows = await this.db.callbackRequest.findMany({
      where: status ? { status } : undefined,
      orderBy: [{ createdAt: 'desc' }],
    })
    return rows.map(toDto)
  }

  async findById(id: string): Promise<AdminCallbackDto | null> {
    const row = await this.db.callbackRequest.findUnique({ where: { id } })
    return row ? toDto(row) : null
  }

  async updateStatus(id: string, status: AdminCallbackStatus): Promise<AdminCallbackDto> {
    const row = await this.db.callbackRequest.update({
      where: { id },
      data: { status },
    })
    return toDto(row)
  }

  async deleteById(id: string): Promise<void> {
    await this.db.callbackRequest.delete({ where: { id } })
  }
}
