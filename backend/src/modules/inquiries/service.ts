import { generateInquiryReferenceCode } from '../../utils/inquiry-reference.js'
import type { InquiryRequestRepository } from './repository.js'
import type { InquiryRequestCreateInput, InquiryRequestDto } from './types.js'

const MAX_REFERENCE_ATTEMPTS = 5

export class InquiryRequestService {
  constructor(private readonly repository: InquiryRequestRepository) {}

  async create(
    input: Omit<InquiryRequestCreateInput, 'referenceCode'>,
  ): Promise<InquiryRequestDto> {
    for (let attempt = 0; attempt < MAX_REFERENCE_ATTEMPTS; attempt += 1) {
      const referenceCode = generateInquiryReferenceCode()
      try {
        return await this.repository.create({ ...input, referenceCode })
      } catch (error) {
        const isUniqueViolation =
          error instanceof Error &&
          'code' in error &&
          (error as { code?: string }).code === 'P2002'
        if (!isUniqueViolation || attempt === MAX_REFERENCE_ATTEMPTS - 1) {
          throw error
        }
      }
    }
    throw new Error('Unable to generate inquiry reference code')
  }
}
