import type { FastifyReply, FastifyRequest } from 'fastify'
import { API_MESSAGES } from '../../constants/messages.js'
import { HTTP_STATUS } from '../../constants/http.js'
import { ERROR_CODES } from '../../constants/error-codes.js'
import { successResponse, errorResponse } from '../../utils/response.js'
import type { HealthService } from './service.js'

export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  async getHealth(_request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const data = await this.healthService.getStatus()

    if (data.status === 'ok') {
      void reply
        .status(HTTP_STATUS.OK)
        .send(successResponse(data, API_MESSAGES.HEALTH_OK))
      return
    }

    void reply
      .status(HTTP_STATUS.SERVICE_UNAVAILABLE)
      .send(errorResponse(API_MESSAGES.HEALTH_DEGRADED, ERROR_CODES.DATABASE, []))
  }
}
