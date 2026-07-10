import type { FastifyReply, FastifyRequest } from 'fastify'
import { API_MESSAGES } from '../../constants/messages.js'
import { HTTP_STATUS } from '../../constants/http.js'
import { successResponse } from '../../utils/response.js'
import type { PaginationQuery } from '../../validators/pagination.js'
import type { DestinationService } from './service.js'
import type { DestinationSlugParams } from './validator.js'

export class DestinationController {
  constructor(private readonly destinationService: DestinationService) {}

  async list(
    request: FastifyRequest<{ Querystring: PaginationQuery }>,
    reply: FastifyReply,
  ): Promise<void> {
    const { page, pageSize } = request.query
    const data = await this.destinationService.listDestinations(page, pageSize)
    void reply
      .status(HTTP_STATUS.OK)
      .send(successResponse(data, API_MESSAGES.DESTINATIONS_LISTED))
  }

  async getBySlug(
    request: FastifyRequest<{ Params: DestinationSlugParams }>,
    reply: FastifyReply,
  ): Promise<void> {
    const data = await this.destinationService.getDestinationBySlug(request.params.slug)
    void reply
      .status(HTTP_STATUS.OK)
      .send(successResponse(data, API_MESSAGES.DESTINATION_RETRIEVED))
  }
}
