import type { FastifyReply, FastifyRequest } from 'fastify'
import { API_MESSAGES } from '../../constants/messages.js'
import { HTTP_STATUS } from '../../constants/http.js'
import { successResponse } from '../../utils/response.js'
import type { PaginationQuery } from '../../validators/pagination.js'
import type { FaqService } from './service.js'
import type { FaqSlugParams } from './validator.js'

export class FaqController {
  constructor(private readonly faqService: FaqService) {}

  async list(
    request: FastifyRequest<{ Querystring: PaginationQuery }>,
    reply: FastifyReply,
  ): Promise<void> {
    const { page, pageSize } = request.query
    const data = await this.faqService.listFaqs(page, pageSize)
    void reply.status(HTTP_STATUS.OK).send(successResponse(data, API_MESSAGES.FAQS_LISTED))
  }

  async getBySlug(
    request: FastifyRequest<{ Params: FaqSlugParams }>,
    reply: FastifyReply,
  ): Promise<void> {
    const data = await this.faqService.getFaqBySlug(request.params.slug)
    void reply.status(HTTP_STATUS.OK).send(successResponse(data, API_MESSAGES.FAQ_RETRIEVED))
  }
}
