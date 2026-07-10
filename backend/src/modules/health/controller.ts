import type { FastifyReply, FastifyRequest } from 'fastify'
import { API_MESSAGES } from '../../constants/messages.js'
import { HTTP_STATUS } from '../../constants/http.js'
import { successResponse } from '../../utils/response.js'
import type { HealthService } from './service.js'

export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  async getHealth(_request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const data = await this.healthService.getStatus()
    const statusCode = data.status === 'ok' ? HTTP_STATUS.OK : HTTP_STATUS.INTERNAL
    const message =
      data.status === 'ok' ? API_MESSAGES.HEALTH_OK : API_MESSAGES.HEALTH_DEGRADED

    void reply.status(statusCode).send(successResponse(data, message))
  }
}
