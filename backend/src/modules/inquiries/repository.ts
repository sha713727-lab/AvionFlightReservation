import type { DatabaseClient } from '../../database/prisma.js'
import { toInquiryStatus } from '../admin-inquiries/status.js'
import type {
  InquiryRequestCreateInput,
  InquiryRequestDto,
} from './types.js'

function toDto(row: {
  id: string
  referenceCode: string
  name: string
  email: string
  phone: string
  subject: string
  message: string
  status: string
  createdAt: Date
  updatedAt: Date
}): InquiryRequestDto {
  return {
    id: row.id,
    referenceCode: row.referenceCode,
    name: row.name,
    email: row.email,
    phone: row.phone,
    subject: row.subject,
    message: row.message,
    status: toInquiryStatus(row.status),
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  }
}

export class InquiryRequestRepository {
  constructor(private readonly db: DatabaseClient) {}

  async create(input: InquiryRequestCreateInput): Promise<InquiryRequestDto> {
    const row = await this.db.inquiryRequest.create({
      data: {
        referenceCode: input.referenceCode,
        name: input.name,
        email: input.email,
        phone: input.phone,
        subject: input.subject,
        message: input.message,
        status: 'new',
      },
    })
    return toDto(row)
  }
}
