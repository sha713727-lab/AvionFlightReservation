import type { FastifyReply, FastifyRequest } from 'fastify'
import { API_MESSAGES } from '../../constants/messages.js'
import { HTTP_STATUS } from '../../constants/http.js'
import { successResponse } from '../../utils/response.js'
import type { AdminDashboardService } from './service.js'

export class AdminDashboardController {
  constructor(private readonly adminDashboardService: AdminDashboardService) {}

  async getSummary(_request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const data = await this.adminDashboardService.getSummary()
    void reply
      .header('Cache-Control', 'no-store')
      .status(HTTP_STATUS.OK)
      .send(successResponse(data, API_MESSAGES.ADMIN_DASHBOARD_OK))
  }
}
