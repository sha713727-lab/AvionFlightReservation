import type { DatabaseClient } from '../../database/prisma.js'
import type { AdminInquiryDto, AdminInquiryStatus } from './types.js'
import { toInquiryDto } from './status.js'

export class AdminInquiryRepository {
  constructor(private readonly db: DatabaseClient) {}

  async findAll(status?: AdminInquiryStatus): Promise<AdminInquiryDto[]> {
    const rows = await this.db.inquiryRequest.findMany({
      where: status ? { status } : undefined,
      orderBy: [{ createdAt: 'desc' }],
    })
    return rows.map(toInquiryDto)
  }

  async findById(id: string): Promise<AdminInquiryDto | null> {
    const row = await this.db.inquiryRequest.findUnique({ where: { id } })
    return row ? toInquiryDto(row) : null
  }

  async updateStatus(id: string, status: AdminInquiryStatus): Promise<AdminInquiryDto> {
    const row = await this.db.inquiryRequest.update({
      where: { id },
      data: { status },
    })
    return toInquiryDto(row)
  }

  async deleteById(id: string): Promise<void> {
    await this.db.inquiryRequest.delete({ where: { id } })
  }
}
