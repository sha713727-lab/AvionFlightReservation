import type { FastifyReply, FastifyRequest } from 'fastify'
import { API_MESSAGES } from '../../constants/messages.js'
import { HTTP_STATUS } from '../../constants/http.js'
import { successResponse } from '../../utils/response.js'
import type { AdminHiltonFaqOps } from './faq-ops.js'
import type {
  AdminHiltonFaqBody,
  AdminHiltonItemIdParams,
  AdminHiltonMoveBody,
} from './validator.js'

export class AdminHiltonFaqController {
  constructor(private readonly ops: AdminHiltonFaqOps) {}

  private ok(reply: FastifyReply, data: unknown, message: string, status: number = HTTP_STATUS.OK) {
    return reply.header('Cache-Control', 'no-store').status(status).send(successResponse(data, message))
  }

  async create(
    request: FastifyRequest<{ Body: AdminHiltonFaqBody }>,
    reply: FastifyReply,
  ): Promise<void> {
    return this.ok(
      reply,
      await this.ops.create(request.body),
      API_MESSAGES.ADMIN_HILTON_ITEM_CREATED,
      HTTP_STATUS.CREATED,
    )
  }

  async update(
    request: FastifyRequest<{ Params: AdminHiltonItemIdParams; Body: AdminHiltonFaqBody }>,
    reply: FastifyReply,
  ): Promise<void> {
    return this.ok(
      reply,
      await this.ops.update(request.params.id, request.body),
      API_MESSAGES.ADMIN_HILTON_ITEM_UPDATED,
    )
  }

  async delete(
    request: FastifyRequest<{ Params: AdminHiltonItemIdParams }>,
    reply: FastifyReply,
  ): Promise<void> {
    return this.ok(
      reply,
      await this.ops.delete(request.params.id),
      API_MESSAGES.ADMIN_HILTON_ITEM_DELETED,
    )
  }

  async move(
    request: FastifyRequest<{ Params: AdminHiltonItemIdParams; Body: AdminHiltonMoveBody }>,
    reply: FastifyReply,
  ): Promise<void> {
    return this.ok(
      reply,
      await this.ops.move(request.params.id, request.body.direction),
      API_MESSAGES.ADMIN_HILTON_ITEM_UPDATED,
    )
  }
}
