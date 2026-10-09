import type { FastifyReply, FastifyRequest } from 'fastify'
import { API_MESSAGES } from '../../constants/messages.js'
import { HTTP_STATUS } from '../../constants/http.js'
import { successResponse } from '../../utils/response.js'
import type { WyndhamPageService } from './service.js'

export class WyndhamPageController {
  constructor(private readonly wyndhamPageService: WyndhamPageService) {}

  async getPublished(_request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const data = await this.wyndhamPageService.getPublished()
    void reply
      .header('Cache-Control', 'public, max-age=60, stale-while-revalidate=300')
      .status(HTTP_STATUS.OK)
      .send(successResponse(data, API_MESSAGES.WYNDHAM_PAGE_RETRIEVED))
  }
}
