import type { FastifyReply, FastifyRequest } from 'fastify'
import { API_MESSAGES } from '../../constants/messages.js'
import { HTTP_STATUS } from '../../constants/http.js'
import { successResponse } from '../../utils/response.js'
import type { AdminServicesService } from './service.js'
import type {
  AdminServiceBody,
  AdminServiceIdParams,
  AdminServiceMoveBody,
} from './validator.js'

export class AdminServicesController {
  constructor(private readonly adminServicesService: AdminServicesService) {}

  async list(_request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const data = await this.adminServicesService.listServices()
    void reply
      .header('Cache-Control', 'no-store')
      .status(HTTP_STATUS.OK)
      .send(successResponse(data, API_MESSAGES.ADMIN_SERVICES_LISTED))
  }

  async options(_request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const data = this.adminServicesService.getOptions()
    void reply
      .header('Cache-Control', 'no-store')
      .status(HTTP_STATUS.OK)
      .send(successResponse(data, API_MESSAGES.ADMIN_SERVICE_OPTIONS))
  }

  async getById(
    request: FastifyRequest<{ Params: AdminServiceIdParams }>,
    reply: FastifyReply,
  ): Promise<void> {
    const data = await this.adminServicesService.getService(request.params.id)
    void reply
      .header('Cache-Control', 'no-store')
      .status(HTTP_STATUS.OK)
      .send(successResponse(data, API_MESSAGES.ADMIN_SERVICE_RETRIEVED))
  }

  async create(
    request: FastifyRequest<{ Body: AdminServiceBody }>,
    reply: FastifyReply,
  ): Promise<void> {
    const data = await this.adminServicesService.createService(request.body)
    void reply
      .header('Cache-Control', 'no-store')
      .status(HTTP_STATUS.CREATED)
      .send(successResponse(data, API_MESSAGES.ADMIN_SERVICE_CREATED))
  }

  async update(
    request: FastifyRequest<{ Params: AdminServiceIdParams; Body: AdminServiceBody }>,
    reply: FastifyReply,
  ): Promise<void> {
    const data = await this.adminServicesService.updateService(request.params.id, request.body)
    void reply
      .header('Cache-Control', 'no-store')
      .status(HTTP_STATUS.OK)
      .send(successResponse(data, API_MESSAGES.ADMIN_SERVICE_UPDATED))
  }

  async remove(
    request: FastifyRequest<{ Params: AdminServiceIdParams }>,
    reply: FastifyReply,
  ): Promise<void> {
    const data = await this.adminServicesService.deleteService(request.params.id)
    void reply
      .header('Cache-Control', 'no-store')
      .status(HTTP_STATUS.OK)
      .send(successResponse(data, API_MESSAGES.ADMIN_SERVICE_DELETED))
  }

  async move(
    request: FastifyRequest<{ Params: AdminServiceIdParams; Body: AdminServiceMoveBody }>,
    reply: FastifyReply,
  ): Promise<void> {
    const data = await this.adminServicesService.moveService(
      request.params.id,
      request.body.direction,
    )
    void reply
      .header('Cache-Control', 'no-store')
      .status(HTTP_STATUS.OK)
      .send(successResponse(data, API_MESSAGES.ADMIN_SERVICE_UPDATED))
  }

  async uploadMedia(
    request: FastifyRequest<{ Params: AdminServiceIdParams }>,
    reply: FastifyReply,
  ): Promise<void> {
    const file = this.adminServicesService.assertMediaFile(await request.file())
    const buffer = await file.toBuffer()
    const data = await this.adminServicesService.uploadMedia(
      request.params.id,
      file.mimetype,
      buffer,
      file.filename,
    )
    void reply
      .header('Cache-Control', 'no-store')
      .status(HTTP_STATUS.OK)
      .send(successResponse(data, API_MESSAGES.ADMIN_SERVICE_MEDIA_UPLOADED))
  }

  async removeMedia(
    request: FastifyRequest<{ Params: AdminServiceIdParams }>,
    reply: FastifyReply,
  ): Promise<void> {
    const data = await this.adminServicesService.removeMedia(request.params.id)
    void reply
      .header('Cache-Control', 'no-store')
      .status(HTTP_STATUS.OK)
      .send(successResponse(data, API_MESSAGES.ADMIN_SERVICE_MEDIA_REMOVED))
  }
}
