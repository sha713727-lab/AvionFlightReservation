import type { FastifyReply, FastifyRequest } from 'fastify'
import { API_MESSAGES } from '../../constants/messages.js'
import { HTTP_STATUS } from '../../constants/http.js'
import { successResponse } from '../../utils/response.js'
import type { AdminCallbacksService } from './service.js'
import type {
  AdminCallbackIdParams,
  AdminCallbackListQuery,
  AdminCallbackStatusBody,
} from './validator.js'

export class AdminCallbacksController {
  constructor(private readonly adminCallbacksService: AdminCallbacksService) {}

  async list(
    request: FastifyRequest<{ Querystring: AdminCallbackListQuery }>,
    reply: FastifyReply,
  ): Promise<void> {
    const data = await this.adminCallbacksService.list(request.query.status)
    void reply
      .header('Cache-Control', 'no-store')
      .status(HTTP_STATUS.OK)
      .send(successResponse(data, API_MESSAGES.ADMIN_CALLBACKS_LISTED))
  }

  async updateStatus(
    request: FastifyRequest<{
      Params: AdminCallbackIdParams
      Body: AdminCallbackStatusBody
    }>,
    reply: FastifyReply,
  ): Promise<void> {
    const data = await this.adminCallbacksService.updateStatus(
      request.params.id,
      request.body.status,
    )
    void reply
      .header('Cache-Control', 'no-store')
      .status(HTTP_STATUS.OK)
      .send(successResponse(data, API_MESSAGES.ADMIN_CALLBACK_UPDATED))
  }

  async remove(
    request: FastifyRequest<{ Params: AdminCallbackIdParams }>,
    reply: FastifyReply,
  ): Promise<void> {
    const data = await this.adminCallbacksService.remove(request.params.id)
    void reply
      .header('Cache-Control', 'no-store')
      .status(HTTP_STATUS.OK)
      .send(successResponse(data, API_MESSAGES.ADMIN_CALLBACK_DELETED))
  }
}
