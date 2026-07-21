import type { FastifyReply, FastifyRequest } from 'fastify'
import { API_MESSAGES } from '../../constants/messages.js'
import { HTTP_STATUS } from '../../constants/http.js'
import { successResponse } from '../../utils/response.js'
import type { SettingsService } from './service.js'
import type { ContactSettingsBody } from './validator.js'

export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  async getContact(_request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const data = await this.settingsService.getContact()
    void reply
      .header('Cache-Control', 'public, max-age=60')
      .status(HTTP_STATUS.OK)
      .send(successResponse(data, API_MESSAGES.CONTACT_SETTINGS_RETRIEVED))
  }

  async updateContact(
    request: FastifyRequest<{ Body: ContactSettingsBody }>,
    reply: FastifyReply,
  ): Promise<void> {
    const data = await this.settingsService.updateContact(request.body)
    void reply
      .header('Cache-Control', 'no-store')
      .status(HTTP_STATUS.OK)
      .send(successResponse(data, API_MESSAGES.CONTACT_SETTINGS_UPDATED))
  }
}
