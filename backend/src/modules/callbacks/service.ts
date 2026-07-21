import type { CallbackRequestRepository } from './repository.js'
import type { CallbackRequestCreateInput, CallbackRequestDto } from './types.js'

export class CallbackRequestService {
  constructor(private readonly repository: CallbackRequestRepository) {}

  async create(input: CallbackRequestCreateInput): Promise<CallbackRequestDto> {
    return this.repository.create(input)
  }
}
