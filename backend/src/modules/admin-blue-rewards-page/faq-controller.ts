import type { FastifyReply, FastifyRequest } from 'fastify'
import { API_MESSAGES } from '../../constants/messages.js'
import { HTTP_STATUS } from '../../constants/http.js'
import { successResponse } from '../../utils/response.js'
import type { AdminBlueRewardsFaqOps } from './faq-ops.js'
import type {
  AdminBlueRewardsFaqBody,
  AdminBlueRewardsItemIdParams,
  AdminBlueRewardsMoveBody,
} from './validator.js'

export class AdminBlueRewardsFaqController {
  constructor(private readonly ops: AdminBlueRewardsFaqOps) {}

  private ok(reply: FastifyReply, data: unknown, message: string, status: number = HTTP_STATUS.OK) {
    return reply.header('Cache-Control', 'no-store').status(status).send(successResponse(data, message))
  }

  async create(
    request: FastifyRequest<{ Body: AdminBlueRewardsFaqBody }>,
    reply: FastifyReply,
  ): Promise<void> {
    return this.ok(
      reply,
      await this.ops.create(request.body),
      API_MESSAGES.ADMIN_BLUE_REWARDS_ITEM_CREATED,
      HTTP_STATUS.CREATED,
    )
  }

  async update(
    request: FastifyRequest<{ Params: AdminBlueRewardsItemIdParams; Body: AdminBlueRewardsFaqBody }>,
    reply: FastifyReply,
  ): Promise<void> {
    return this.ok(
      reply,
      await this.ops.update(request.params.id, request.body),
      API_MESSAGES.ADMIN_BLUE_REWARDS_ITEM_UPDATED,
    )
  }

  async delete(
    request: FastifyRequest<{ Params: AdminBlueRewardsItemIdParams }>,
    reply: FastifyReply,
  ): Promise<void> {
    return this.ok(
      reply,
      await this.ops.delete(request.params.id),
      API_MESSAGES.ADMIN_BLUE_REWARDS_ITEM_DELETED,
    )
  }

  async move(
    request: FastifyRequest<{ Params: AdminBlueRewardsItemIdParams; Body: AdminBlueRewardsMoveBody }>,
    reply: FastifyReply,
  ): Promise<void> {
    return this.ok(
      reply,
      await this.ops.move(request.params.id, request.body.direction),
      API_MESSAGES.ADMIN_BLUE_REWARDS_ITEM_UPDATED,
    )
  }
}
