import type { FastifyReply, FastifyRequest } from 'fastify'
import { API_MESSAGES } from '../../constants/messages.js'
import { HTTP_STATUS } from '../../constants/http.js'
import { successResponse } from '../../utils/response.js'
import type { InquiryRequestService } from './service.js'
import type { InquiryRequestBody } from './validator.js'

export class InquiryRequestController {
  constructor(private readonly inquiryRequestService: InquiryRequestService) {}

  async create(
    request: FastifyRequest<{ Body: InquiryRequestBody }>,
    reply: FastifyReply,
  ): Promise<void> {
    const data = await this.inquiryRequestService.create({
      name: request.body.name,
      email: request.body.email,
      phone: request.body.phone,
      subject: request.body.subject,
      message: request.body.message,
    })
    void reply
      .header('Cache-Control', 'no-store')
      .status(HTTP_STATUS.CREATED)
      .send(successResponse(data, API_MESSAGES.INQUIRY_CREATED))
  }
}
