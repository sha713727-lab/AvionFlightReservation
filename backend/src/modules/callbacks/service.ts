import { API_MESSAGES } from '../../constants/messages.js'
import { ERROR_CODES } from '../../constants/error-codes.js'
import { forbiddenError } from '../../lib/errors.js'
import type { SettingsService } from '../settings/service.js'
import type { CallbackRequestRepository } from './repository.js'
import type { CallbackRequestCreateInput, CallbackRequestDto } from './types.js'

export class CallbackRequestService {
  constructor(
    private readonly repository: CallbackRequestRepository,
    private readonly settingsService: SettingsService,
  ) {}

  async create(input: CallbackRequestCreateInput): Promise<CallbackRequestDto> {
    const settings = await this.settingsService.getContact()
    if (!settings.callbacksEnabled) {
      throw forbiddenError(API_MESSAGES.CALLBACK_DISABLED, ERROR_CODES.CALLBACK_DISABLED)
    }
    return this.repository.create(input)
  }
}
