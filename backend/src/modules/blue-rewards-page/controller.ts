import type { FastifyReply, FastifyRequest } from 'fastify'
import { API_MESSAGES } from '../../constants/messages.js'
import { HTTP_STATUS } from '../../constants/http.js'
import { successResponse } from '../../utils/response.js'
import type { BlueRewardsPageService } from './service.js'

export class BlueRewardsPageController {
  constructor(private readonly BlueRewardsPageService: BlueRewardsPageService) {}

  async getPublished(_request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const data = await this.BlueRewardsPageService.getPublished()
    void reply
      .header('Cache-Control', 'public, max-age=60, stale-while-revalidate=300')
      .status(HTTP_STATUS.OK)
      .send(successResponse(data, API_MESSAGES.BLUE_REWARDS_PAGE_RETRIEVED))
  }
}
