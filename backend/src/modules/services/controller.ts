import type { FastifyReply, FastifyRequest } from 'fastify'
import { API_MESSAGES } from '../../constants/messages.js'
import { HTTP_STATUS } from '../../constants/http.js'
import { successResponse } from '../../utils/response.js'
import type { PaginationQuery } from '../../validators/pagination.js'
import type { ServiceService } from './service.js'
import type { ServiceSlugParams } from './validator.js'

export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  async list(
    request: FastifyRequest<{ Querystring: PaginationQuery }>,
    reply: FastifyReply,
  ): Promise<void> {
    const { page, pageSize } = request.query
    const data = await this.serviceService.listServices(page, pageSize)
    void reply
      .status(HTTP_STATUS.OK)
      .send(successResponse(data, API_MESSAGES.SERVICES_LISTED))
  }

  async getBySlug(
    request: FastifyRequest<{ Params: ServiceSlugParams }>,
    reply: FastifyReply,
  ): Promise<void> {
    const data = await this.serviceService.getServiceBySlug(request.params.slug)
    void reply
      .status(HTTP_STATUS.OK)
      .send(successResponse(data, API_MESSAGES.SERVICE_RETRIEVED))
  }
}
