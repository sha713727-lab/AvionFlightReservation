import type { FastifyReply, FastifyRequest } from 'fastify'
import { API_MESSAGES } from '../../constants/messages.js'
import { HTTP_STATUS } from '../../constants/http.js'
import { successResponse } from '../../utils/response.js'
import type { AdminAuthService } from './service.js'
import type {
  AdminLoginBody,
  AdminPinChangeBody,
  AdminPinVerifyBody,
} from './validator.js'

export class AdminAuthController {
  constructor(private readonly adminAuthService: AdminAuthService) {}

  async login(
    request: FastifyRequest<{ Body: AdminLoginBody }>,
    reply: FastifyReply,
  ): Promise<void> {
    const data = await this.adminAuthService.beginLogin(request.body)
    void reply
      .header('Cache-Control', 'no-store')
      .status(HTTP_STATUS.OK)
      .send(successResponse(data, API_MESSAGES.ADMIN_PIN_CHALLENGE))
  }

  async verifyPin(
    request: FastifyRequest<{ Body: AdminPinVerifyBody }>,
    reply: FastifyReply,
  ): Promise<void> {
    const data = await this.adminAuthService.verifyPin(request.body)
    void reply
      .header('Cache-Control', 'no-store')
      .status(HTTP_STATUS.OK)
      .send(successResponse(data, API_MESSAGES.ADMIN_LOGIN_OK))
  }

  async changePin(
    request: FastifyRequest<{ Body: AdminPinChangeBody }>,
    reply: FastifyReply,
  ): Promise<void> {
    const data = await this.adminAuthService.changePin(request.body)
    void reply
      .header('Cache-Control', 'no-store')
      .status(HTTP_STATUS.OK)
      .send(successResponse(data, API_MESSAGES.ADMIN_PIN_UPDATED))
  }
}
