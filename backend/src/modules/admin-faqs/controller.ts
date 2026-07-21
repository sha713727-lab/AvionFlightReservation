import type { FastifyReply, FastifyRequest } from 'fastify'
import { API_MESSAGES } from '../../constants/messages.js'
import { HTTP_STATUS } from '../../constants/http.js'
import { successResponse } from '../../utils/response.js'
import type { AdminFaqsService } from './service.js'
import type { AdminFaqBody, AdminFaqIdParams, AdminFaqMoveBody } from './validator.js'

export class AdminFaqsController {
  constructor(private readonly adminFaqsService: AdminFaqsService) {}

  async list(_request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const data = await this.adminFaqsService.list()
    void reply
      .header('Cache-Control', 'no-store')
      .status(HTTP_STATUS.OK)
      .send(successResponse(data, API_MESSAGES.ADMIN_FAQS_LISTED))
  }

  async getById(
    request: FastifyRequest<{ Params: AdminFaqIdParams }>,
    reply: FastifyReply,
  ): Promise<void> {
    const data = await this.adminFaqsService.getById(request.params.id)
    void reply
      .header('Cache-Control', 'no-store')
      .status(HTTP_STATUS.OK)
      .send(successResponse(data, API_MESSAGES.ADMIN_FAQ_RETRIEVED))
  }

  async create(
    request: FastifyRequest<{ Body: AdminFaqBody }>,
    reply: FastifyReply,
  ): Promise<void> {
    const data = await this.adminFaqsService.create(request.body)
    void reply
      .header('Cache-Control', 'no-store')
      .status(HTTP_STATUS.CREATED)
      .send(successResponse(data, API_MESSAGES.ADMIN_FAQ_CREATED))
  }

  async update(
    request: FastifyRequest<{ Params: AdminFaqIdParams; Body: AdminFaqBody }>,
    reply: FastifyReply,
  ): Promise<void> {
    const data = await this.adminFaqsService.update(request.params.id, request.body)
    void reply
      .header('Cache-Control', 'no-store')
      .status(HTTP_STATUS.OK)
      .send(successResponse(data, API_MESSAGES.ADMIN_FAQ_UPDATED))
  }

  async remove(
    request: FastifyRequest<{ Params: AdminFaqIdParams }>,
    reply: FastifyReply,
  ): Promise<void> {
    const data = await this.adminFaqsService.remove(request.params.id)
    void reply
      .header('Cache-Control', 'no-store')
      .status(HTTP_STATUS.OK)
      .send(successResponse(data, API_MESSAGES.ADMIN_FAQ_DELETED))
  }

  async move(
    request: FastifyRequest<{ Params: AdminFaqIdParams; Body: AdminFaqMoveBody }>,
    reply: FastifyReply,
  ): Promise<void> {
    const data = await this.adminFaqsService.move(request.params.id, request.body.direction)
    void reply
      .header('Cache-Control', 'no-store')
      .status(HTTP_STATUS.OK)
      .send(successResponse(data, API_MESSAGES.ADMIN_FAQ_UPDATED))
  }
}
