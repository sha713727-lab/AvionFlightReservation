import type { FastifyReply, FastifyRequest } from 'fastify'
import { API_MESSAGES } from '../../constants/messages.js'
import { HTTP_STATUS } from '../../constants/http.js'
import { successResponse } from '../../utils/response.js'
import type { AdminInquiriesService } from './service.js'
import type {
  AdminInquiryIdParams,
  AdminInquiryListQuery,
  AdminInquiryStatusBody,
} from './validator.js'

export class AdminInquiriesController {
  constructor(private readonly adminInquiriesService: AdminInquiriesService) {}

  async list(
    request: FastifyRequest<{ Querystring: AdminInquiryListQuery }>,
    reply: FastifyReply,
  ): Promise<void> {
    const data = await this.adminInquiriesService.list(request.query.status)
    void reply
      .header('Cache-Control', 'no-store')
      .status(HTTP_STATUS.OK)
      .send(successResponse(data, API_MESSAGES.ADMIN_INQUIRIES_LISTED))
  }

  async updateStatus(
    request: FastifyRequest<{
      Params: AdminInquiryIdParams
      Body: AdminInquiryStatusBody
    }>,
    reply: FastifyReply,
  ): Promise<void> {
    const data = await this.adminInquiriesService.updateStatus(
      request.params.id,
      request.body.status,
    )
    void reply
      .header('Cache-Control', 'no-store')
      .status(HTTP_STATUS.OK)
      .send(successResponse(data, API_MESSAGES.ADMIN_INQUIRY_UPDATED))
  }

  async remove(
    request: FastifyRequest<{ Params: AdminInquiryIdParams }>,
    reply: FastifyReply,
  ): Promise<void> {
    const data = await this.adminInquiriesService.remove(request.params.id)
    void reply
      .header('Cache-Control', 'no-store')
      .status(HTTP_STATUS.OK)
      .send(successResponse(data, API_MESSAGES.ADMIN_INQUIRY_DELETED))
  }
}
