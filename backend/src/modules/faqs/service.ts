import { ERROR_CODES } from '../../constants/error-codes.js'
import { API_MESSAGES } from '../../constants/messages.js'
import { notFoundError } from '../../lib/errors.js'
import { buildPaginationMeta } from '../../utils/pagination.js'
import type { FaqRepository } from './repository.js'
import type { FaqDto, FaqListResult } from './types.js'

export class FaqService {
  constructor(private readonly repository: FaqRepository) {}

  async listFaqs(page: number, pageSize: number): Promise<FaqListResult> {
    const { items, total } = await this.repository.findManyActive(page, pageSize)

    return {
      items,
      pagination: buildPaginationMeta(total, page, pageSize),
    }
  }

  async getFaqBySlug(slug: string): Promise<FaqDto> {
    const faq = await this.repository.findActiveBySlug(slug)

    if (!faq) {
      throw notFoundError(API_MESSAGES.NOT_FOUND, ERROR_CODES.FAQ_NOT_FOUND)
    }

    return faq
  }
}
