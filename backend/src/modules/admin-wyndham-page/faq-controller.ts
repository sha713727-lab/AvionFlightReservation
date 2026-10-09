import type { FastifyReply, FastifyRequest } from 'fastify'
import { API_MESSAGES } from '../../constants/messages.js'
import { HTTP_STATUS } from '../../constants/http.js'
import { successResponse } from '../../utils/response.js'
import type { AdminWyndhamFaqOps } from './faq-ops.js'
import type {
  AdminWyndhamFaqBody,
  AdminWyndhamItemIdParams,
  AdminWyndhamMoveBody,
} from './validator.js'

export class AdminWyndhamFaqController {
  constructor(private readonly ops: AdminWyndhamFaqOps) {}

  private ok(reply: FastifyReply, data: unknown, message: string, status: number = HTTP_STATUS.OK) {
    return reply.header('Cache-Control', 'no-store').status(status).send(successResponse(data, message))
  }

  async create(
    request: FastifyRequest<{ Body: AdminWyndhamFaqBody }>,
    reply: FastifyReply,
  ): Promise<void> {
    return this.ok(
      reply,
      await this.ops.create(request.body),
      API_MESSAGES.ADMIN_WYNDHAM_ITEM_CREATED,
      HTTP_STATUS.CREATED,
    )
  }

  async update(
    request: FastifyRequest<{ Params: AdminWyndhamItemIdParams; Body: AdminWyndhamFaqBody }>,
    reply: FastifyReply,
  ): Promise<void> {
    return this.ok(
      reply,
      await this.ops.update(request.params.id, request.body),
      API_MESSAGES.ADMIN_WYNDHAM_ITEM_UPDATED,
    )
  }

  async delete(
    request: FastifyRequest<{ Params: AdminWyndhamItemIdParams }>,
    reply: FastifyReply,
  ): Promise<void> {
    return this.ok(
      reply,
      await this.ops.delete(request.params.id),
      API_MESSAGES.ADMIN_WYNDHAM_ITEM_DELETED,
    )
  }

  async move(
    request: FastifyRequest<{ Params: AdminWyndhamItemIdParams; Body: AdminWyndhamMoveBody }>,
    reply: FastifyReply,
  ): Promise<void> {
    return this.ok(
      reply,
      await this.ops.move(request.params.id, request.body.direction),
      API_MESSAGES.ADMIN_WYNDHAM_ITEM_UPDATED,
    )
  }
}
