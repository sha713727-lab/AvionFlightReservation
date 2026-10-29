import type { FastifyReply, FastifyRequest } from 'fastify'
import { API_MESSAGES } from '../../constants/messages.js'
import { HTTP_STATUS } from '../../constants/http.js'
import { successResponse } from '../../utils/response.js'
import type { AdminBlueRewardsPageService } from './service.js'
import type {
  AdminBlueRewardsItemIdParams,
  AdminBlueRewardsLogoBody,
  AdminBlueRewardsMoveBody,
  AdminBlueRewardsPageBody,
  AdminBlueRewardsPrincipleBody,
  AdminBlueRewardsPropertyBody,
  AdminBlueRewardsRailCardBody,
  AdminBlueRewardsSlotParams,
} from './validator.js'

export class AdminBlueRewardsPageController {
  constructor(private readonly service: AdminBlueRewardsPageService) {}

  private ok(reply: FastifyReply, data: unknown, message: string, status: number = HTTP_STATUS.OK) {
    void reply.header('Cache-Control', 'no-store').status(status).send(successResponse(data, message))
  }

  async getPage(_request: FastifyRequest, reply: FastifyReply): Promise<void> {
    this.ok(reply, await this.service.getPage(), API_MESSAGES.ADMIN_BLUE_REWARDS_PAGE_RETRIEVED)
  }

  async updatePage(
    request: FastifyRequest<{ Body: AdminBlueRewardsPageBody }>,
    reply: FastifyReply,
  ): Promise<void> {
    this.ok(reply, await this.service.updatePage(request.body), API_MESSAGES.ADMIN_BLUE_REWARDS_PAGE_UPDATED)
  }

  async uploadSlotMedia(
    request: FastifyRequest<{ Params: AdminBlueRewardsSlotParams }>,
    reply: FastifyReply,
  ): Promise<void> {
    const file = this.service.assertMediaFile(await request.file())
    const buffer = await file.toBuffer()
    this.ok(
      reply,
      await this.service.uploadSlotMedia(
        request.params.slotKey,
        file.mimetype,
        buffer,
        file.filename ?? '',
      ),
      API_MESSAGES.ADMIN_BLUE_REWARDS_MEDIA_UPLOADED,
    )
  }

  async removeSlotMedia(
    request: FastifyRequest<{ Params: AdminBlueRewardsSlotParams }>,
    reply: FastifyReply,
  ): Promise<void> {
    this.ok(
      reply,
      await this.service.removeSlotMedia(request.params.slotKey),
      API_MESSAGES.ADMIN_BLUE_REWARDS_MEDIA_REMOVED,
    )
  }

  async createPrinciple(
    request: FastifyRequest<{ Body: AdminBlueRewardsPrincipleBody }>,
    reply: FastifyReply,
  ): Promise<void> {
    this.ok(
      reply,
      await this.service.createPrinciple(request.body),
      API_MESSAGES.ADMIN_BLUE_REWARDS_ITEM_CREATED,
      HTTP_STATUS.CREATED,
    )
  }

  async updatePrinciple(
    request: FastifyRequest<{ Params: AdminBlueRewardsItemIdParams; Body: AdminBlueRewardsPrincipleBody }>,
    reply: FastifyReply,
  ): Promise<void> {
    this.ok(
      reply,
      await this.service.updatePrinciple(request.params.id, request.body),
      API_MESSAGES.ADMIN_BLUE_REWARDS_ITEM_UPDATED,
    )
  }

  async deletePrinciple(
    request: FastifyRequest<{ Params: AdminBlueRewardsItemIdParams }>,
    reply: FastifyReply,
  ): Promise<void> {
    this.ok(
      reply,
      await this.service.deletePrinciple(request.params.id),
      API_MESSAGES.ADMIN_BLUE_REWARDS_ITEM_DELETED,
    )
  }

  async movePrinciple(
    request: FastifyRequest<{ Params: AdminBlueRewardsItemIdParams; Body: AdminBlueRewardsMoveBody }>,
    reply: FastifyReply,
  ): Promise<void> {
    this.ok(
      reply,
      await this.service.movePrinciple(request.params.id, request.body.direction),
      API_MESSAGES.ADMIN_BLUE_REWARDS_ITEM_UPDATED,
    )
  }

  async createRailCard(
    request: FastifyRequest<{ Body: AdminBlueRewardsRailCardBody }>,
    reply: FastifyReply,
  ): Promise<void> {
    this.ok(
      reply,
      await this.service.createRailCard(request.body),
      API_MESSAGES.ADMIN_BLUE_REWARDS_ITEM_CREATED,
      HTTP_STATUS.CREATED,
    )
  }

  async updateRailCard(
    request: FastifyRequest<{ Params: AdminBlueRewardsItemIdParams; Body: AdminBlueRewardsRailCardBody }>,
    reply: FastifyReply,
  ): Promise<void> {
    this.ok(
      reply,
      await this.service.updateRailCard(request.params.id, request.body),
      API_MESSAGES.ADMIN_BLUE_REWARDS_ITEM_UPDATED,
    )
  }

  async deleteRailCard(
    request: FastifyRequest<{ Params: AdminBlueRewardsItemIdParams }>,
    reply: FastifyReply,
  ): Promise<void> {
    this.ok(
      reply,
      await this.service.deleteRailCard(request.params.id),
      API_MESSAGES.ADMIN_BLUE_REWARDS_ITEM_DELETED,
    )
  }

  async moveRailCard(
    request: FastifyRequest<{ Params: AdminBlueRewardsItemIdParams; Body: AdminBlueRewardsMoveBody }>,
    reply: FastifyReply,
  ): Promise<void> {
    this.ok(
      reply,
      await this.service.moveRailCard(request.params.id, request.body.direction),
      API_MESSAGES.ADMIN_BLUE_REWARDS_ITEM_UPDATED,
    )
  }

  async uploadRailMedia(
    request: FastifyRequest<{ Params: AdminBlueRewardsItemIdParams }>,
    reply: FastifyReply,
  ): Promise<void> {
    const file = this.service.assertMediaFile(await request.file())
    const buffer = await file.toBuffer()
    this.ok(
      reply,
      await this.service.uploadRailMedia(
        request.params.id,
        file.mimetype,
        buffer,
        file.filename ?? '',
      ),
      API_MESSAGES.ADMIN_BLUE_REWARDS_MEDIA_UPLOADED,
    )
  }

  async createProperty(
    request: FastifyRequest<{ Body: AdminBlueRewardsPropertyBody }>,
    reply: FastifyReply,
  ): Promise<void> {
    this.ok(
      reply,
      await this.service.createProperty(request.body),
      API_MESSAGES.ADMIN_BLUE_REWARDS_ITEM_CREATED,
      HTTP_STATUS.CREATED,
    )
  }

  async updateProperty(
    request: FastifyRequest<{ Params: AdminBlueRewardsItemIdParams; Body: AdminBlueRewardsPropertyBody }>,
    reply: FastifyReply,
  ): Promise<void> {
    this.ok(
      reply,
      await this.service.updateProperty(request.params.id, request.body),
      API_MESSAGES.ADMIN_BLUE_REWARDS_ITEM_UPDATED,
    )
  }

  async deleteProperty(
    request: FastifyRequest<{ Params: AdminBlueRewardsItemIdParams }>,
    reply: FastifyReply,
  ): Promise<void> {
    this.ok(
      reply,
      await this.service.deleteProperty(request.params.id),
      API_MESSAGES.ADMIN_BLUE_REWARDS_ITEM_DELETED,
    )
  }

  async moveProperty(
    request: FastifyRequest<{ Params: AdminBlueRewardsItemIdParams; Body: AdminBlueRewardsMoveBody }>,
    reply: FastifyReply,
  ): Promise<void> {
    this.ok(
      reply,
      await this.service.moveProperty(request.params.id, request.body.direction),
      API_MESSAGES.ADMIN_BLUE_REWARDS_ITEM_UPDATED,
    )
  }

  async uploadPropertyMedia(
    request: FastifyRequest<{ Params: AdminBlueRewardsItemIdParams }>,
    reply: FastifyReply,
  ): Promise<void> {
    const file = this.service.assertMediaFile(await request.file())
    const buffer = await file.toBuffer()
    this.ok(
      reply,
      await this.service.uploadPropertyMedia(
        request.params.id,
        file.mimetype,
        buffer,
        file.filename ?? '',
      ),
      API_MESSAGES.ADMIN_BLUE_REWARDS_MEDIA_UPLOADED,
    )
  }

  async createLogo(
    request: FastifyRequest<{ Body: AdminBlueRewardsLogoBody }>,
    reply: FastifyReply,
  ): Promise<void> {
    this.ok(
      reply,
      await this.service.createLogo(request.body),
      API_MESSAGES.ADMIN_BLUE_REWARDS_ITEM_CREATED,
      HTTP_STATUS.CREATED,
    )
  }

  async updateLogo(
    request: FastifyRequest<{ Params: AdminBlueRewardsItemIdParams; Body: AdminBlueRewardsLogoBody }>,
    reply: FastifyReply,
  ): Promise<void> {
    this.ok(
      reply,
      await this.service.updateLogo(request.params.id, request.body),
      API_MESSAGES.ADMIN_BLUE_REWARDS_ITEM_UPDATED,
    )
  }

  async deleteLogo(
    request: FastifyRequest<{ Params: AdminBlueRewardsItemIdParams }>,
    reply: FastifyReply,
  ): Promise<void> {
    this.ok(
      reply,
      await this.service.deleteLogo(request.params.id),
      API_MESSAGES.ADMIN_BLUE_REWARDS_ITEM_DELETED,
    )
  }

  async moveLogo(
    request: FastifyRequest<{ Params: AdminBlueRewardsItemIdParams; Body: AdminBlueRewardsMoveBody }>,
    reply: FastifyReply,
  ): Promise<void> {
    this.ok(
      reply,
      await this.service.moveLogo(request.params.id, request.body.direction),
      API_MESSAGES.ADMIN_BLUE_REWARDS_ITEM_UPDATED,
    )
  }

  async uploadLogoMedia(
    request: FastifyRequest<{ Params: AdminBlueRewardsItemIdParams }>,
    reply: FastifyReply,
  ): Promise<void> {
    const file = this.service.assertMediaFile(await request.file())
    const buffer = await file.toBuffer()
    this.ok(
      reply,
      await this.service.uploadLogoMedia(
        request.params.id,
        file.mimetype,
        buffer,
        file.filename ?? '',
      ),
      API_MESSAGES.ADMIN_BLUE_REWARDS_MEDIA_UPLOADED,
    )
  }
}
