import type { FastifyReply, FastifyRequest } from 'fastify'
import { API_MESSAGES } from '../../constants/messages.js'
import { HTTP_STATUS } from '../../constants/http.js'
import { successResponse } from '../../utils/response.js'
import type { AdminDestinationsService } from './service.js'
import type {
  AdminDestinationBody,
  AdminDestinationIdParams,
  AdminDestinationMoveBody,
} from './validator.js'

export class AdminDestinationsController {
  constructor(private readonly adminDestinationsService: AdminDestinationsService) {}

  async list(_request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const data = await this.adminDestinationsService.list()
    void reply
      .header('Cache-Control', 'no-store')
      .status(HTTP_STATUS.OK)
      .send(successResponse(data, API_MESSAGES.ADMIN_DESTINATIONS_LISTED))
  }

  async getById(
    request: FastifyRequest<{ Params: AdminDestinationIdParams }>,
    reply: FastifyReply,
  ): Promise<void> {
    const data = await this.adminDestinationsService.getById(request.params.id)
    void reply
      .header('Cache-Control', 'no-store')
      .status(HTTP_STATUS.OK)
      .send(successResponse(data, API_MESSAGES.ADMIN_DESTINATION_RETRIEVED))
  }

  async create(
    request: FastifyRequest<{ Body: AdminDestinationBody }>,
    reply: FastifyReply,
  ): Promise<void> {
    const data = await this.adminDestinationsService.create(request.body)
    void reply
      .header('Cache-Control', 'no-store')
      .status(HTTP_STATUS.CREATED)
      .send(successResponse(data, API_MESSAGES.ADMIN_DESTINATION_CREATED))
  }

  async update(
    request: FastifyRequest<{ Params: AdminDestinationIdParams; Body: AdminDestinationBody }>,
    reply: FastifyReply,
  ): Promise<void> {
    const data = await this.adminDestinationsService.update(request.params.id, request.body)
    void reply
      .header('Cache-Control', 'no-store')
      .status(HTTP_STATUS.OK)
      .send(successResponse(data, API_MESSAGES.ADMIN_DESTINATION_UPDATED))
  }

  async remove(
    request: FastifyRequest<{ Params: AdminDestinationIdParams }>,
    reply: FastifyReply,
  ): Promise<void> {
    const data = await this.adminDestinationsService.remove(request.params.id)
    void reply
      .header('Cache-Control', 'no-store')
      .status(HTTP_STATUS.OK)
      .send(successResponse(data, API_MESSAGES.ADMIN_DESTINATION_DELETED))
  }

  async move(
    request: FastifyRequest<{
      Params: AdminDestinationIdParams
      Body: AdminDestinationMoveBody
    }>,
    reply: FastifyReply,
  ): Promise<void> {
    const data = await this.adminDestinationsService.move(
      request.params.id,
      request.body.direction,
    )
    void reply
      .header('Cache-Control', 'no-store')
      .status(HTTP_STATUS.OK)
      .send(successResponse(data, API_MESSAGES.ADMIN_DESTINATION_UPDATED))
  }
}
