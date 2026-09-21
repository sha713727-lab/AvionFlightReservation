import { ERROR_CODES } from '../../constants/error-codes.js'
import { API_MESSAGES } from '../../constants/messages.js'
import { notFoundError } from '../../lib/errors.js'
import type { AdminInquiryRepository } from './repository.js'
import type {
  AdminInquiryDto,
  AdminInquiryListResult,
  AdminInquiryStatus,
} from './types.js'

export class AdminInquiriesService {
  constructor(private readonly repository: AdminInquiryRepository) {}

  async list(status?: AdminInquiryStatus): Promise<AdminInquiryListResult> {
    return { items: await this.repository.findAll(status) }
  }

  async updateStatus(id: string, status: AdminInquiryStatus): Promise<AdminInquiryDto> {
    const current = await this.repository.findById(id)
    if (!current) {
      throw notFoundError(API_MESSAGES.NOT_FOUND, ERROR_CODES.INQUIRY_NOT_FOUND)
    }
    return this.repository.updateStatus(id, status)
  }

  async remove(id: string): Promise<AdminInquiryListResult> {
    const current = await this.repository.findById(id)
    if (!current) {
      throw notFoundError(API_MESSAGES.NOT_FOUND, ERROR_CODES.INQUIRY_NOT_FOUND)
    }
    await this.repository.deleteById(id)
    return { items: await this.repository.findAll() }
  }
}
