import { ERROR_CODES } from '../../constants/error-codes.js'
import { API_MESSAGES } from '../../constants/messages.js'
import { notFoundError } from '../../lib/errors.js'
import type { AdminCallbackRepository } from './repository.js'
import type {
  AdminCallbackDto,
  AdminCallbackListResult,
  AdminCallbackStatus,
} from './types.js'

export class AdminCallbacksService {
  constructor(private readonly repository: AdminCallbackRepository) {}

  async list(status?: AdminCallbackStatus): Promise<AdminCallbackListResult> {
    return { items: await this.repository.findAll(status) }
  }

  async updateStatus(id: string, status: AdminCallbackStatus): Promise<AdminCallbackDto> {
    const current = await this.repository.findById(id)
    if (!current) {
      throw notFoundError(API_MESSAGES.NOT_FOUND, ERROR_CODES.CALLBACK_NOT_FOUND)
    }
    return this.repository.updateStatus(id, status)
  }

  async remove(id: string): Promise<AdminCallbackListResult> {
    const current = await this.repository.findById(id)
    if (!current) {
      throw notFoundError(API_MESSAGES.NOT_FOUND, ERROR_CODES.CALLBACK_NOT_FOUND)
    }
    await this.repository.deleteById(id)
    return { items: await this.repository.findAll() }
  }
}
