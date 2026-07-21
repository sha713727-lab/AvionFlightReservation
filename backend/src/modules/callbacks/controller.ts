import type { FastifyReply, FastifyRequest } from 'fastify'
import { API_MESSAGES } from '../../constants/messages.js'
import { HTTP_STATUS } from '../../constants/http.js'
import { successResponse } from '../../utils/response.js'
import type { CallbackRequestService } from './service.js'
import type { CallbackRequestBody } from './validator.js'

export class CallbackRequestController {
  constructor(private readonly callbackRequestService: CallbackRequestService) {}

  async create(
    request: FastifyRequest<{ Body: CallbackRequestBody }>,
    reply: FastifyReply,
  ): Promise<void> {
    const data = await this.callbackRequestService.create({
      name: request.body.name,
      phone: request.body.phone,
      preferredAt: new Date(request.body.preferredAt),
    })
    void reply
      .header('Cache-Control', 'no-store')
      .status(HTTP_STATUS.CREATED)
      .send(successResponse(data, API_MESSAGES.CALLBACK_CREATED))
  }
}
