import type { FastifyReply, FastifyRequest } from 'fastify'
import { API_MESSAGES } from '../../constants/messages.js'
import { HTTP_STATUS } from '../../constants/http.js'
import { successResponse } from '../../utils/response.js'
import type { AdminPlacesService } from './service.js'
import type {
  AdminPlaceBody,
  AdminPlaceIdParams,
  AdminPlaceListQuery,
  AdminPlaceMoveBody,
} from './validator.js'

export class AdminPlacesController {
  constructor(private readonly adminPlacesService: AdminPlacesService) {}

  async list(
    request: FastifyRequest<{ Querystring: AdminPlaceListQuery }>,
    reply: FastifyReply,
  ): Promise<void> {
    const data = await this.adminPlacesService.list(request.query.tierId)
    void reply
      .header('Cache-Control', 'no-store')
      .status(HTTP_STATUS.OK)
      .send(successResponse(data, API_MESSAGES.ADMIN_PLACES_LISTED))
  }

  async options(_request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const data = await this.adminPlacesService.options()
    void reply
      .header('Cache-Control', 'no-store')
      .status(HTTP_STATUS.OK)
      .send(successResponse(data, API_MESSAGES.ADMIN_PLACE_OPTIONS))
  }

  async getById(
    request: FastifyRequest<{ Params: AdminPlaceIdParams }>,
    reply: FastifyReply,
  ): Promise<void> {
    const data = await this.adminPlacesService.getById(request.params.id)
    void reply
      .header('Cache-Control', 'no-store')
      .status(HTTP_STATUS.OK)
      .send(successResponse(data, API_MESSAGES.ADMIN_PLACE_RETRIEVED))
  }

  async create(
    request: FastifyRequest<{ Body: AdminPlaceBody }>,
    reply: FastifyReply,
  ): Promise<void> {
    const data = await this.adminPlacesService.create(request.body)
    void reply
      .header('Cache-Control', 'no-store')
      .status(HTTP_STATUS.CREATED)
      .send(successResponse(data, API_MESSAGES.ADMIN_PLACE_CREATED))
  }

  async update(
    request: FastifyRequest<{ Params: AdminPlaceIdParams; Body: AdminPlaceBody }>,
    reply: FastifyReply,
  ): Promise<void> {
    const data = await this.adminPlacesService.update(request.params.id, request.body)
    void reply
      .header('Cache-Control', 'no-store')
      .status(HTTP_STATUS.OK)
      .send(successResponse(data, API_MESSAGES.ADMIN_PLACE_UPDATED))
  }

  async remove(
    request: FastifyRequest<{ Params: AdminPlaceIdParams; Querystring: AdminPlaceListQuery }>,
    reply: FastifyReply,
  ): Promise<void> {
    const data = await this.adminPlacesService.remove(
      request.params.id,
      request.query.tierId,
    )
    void reply
      .header('Cache-Control', 'no-store')
      .status(HTTP_STATUS.OK)
      .send(successResponse(data, API_MESSAGES.ADMIN_PLACE_DELETED))
  }

  async move(
    request: FastifyRequest<{ Params: AdminPlaceIdParams; Body: AdminPlaceMoveBody }>,
    reply: FastifyReply,
  ): Promise<void> {
    const data = await this.adminPlacesService.move(
      request.params.id,
      request.body.direction,
    )
    void reply
      .header('Cache-Control', 'no-store')
      .status(HTTP_STATUS.OK)
      .send(successResponse(data, API_MESSAGES.ADMIN_PLACE_UPDATED))
  }

  async uploadMedia(
    request: FastifyRequest<{ Params: AdminPlaceIdParams }>,
    reply: FastifyReply,
  ): Promise<void> {
    const file = this.adminPlacesService.assertMediaFile(await request.file())
    const buffer = await file.toBuffer()
    const data = await this.adminPlacesService.uploadMedia(
      request.params.id,
      file.mimetype,
      buffer,
    )
    void reply
      .header('Cache-Control', 'no-store')
      .status(HTTP_STATUS.OK)
      .send(successResponse(data, API_MESSAGES.ADMIN_PLACE_MEDIA_UPLOADED))
  }

  async removeMedia(
    request: FastifyRequest<{ Params: AdminPlaceIdParams }>,
    reply: FastifyReply,
  ): Promise<void> {
    const data = await this.adminPlacesService.removeMedia(request.params.id)
    void reply
      .header('Cache-Control', 'no-store')
      .status(HTTP_STATUS.OK)
      .send(successResponse(data, API_MESSAGES.ADMIN_PLACE_MEDIA_REMOVED))
  }
}
