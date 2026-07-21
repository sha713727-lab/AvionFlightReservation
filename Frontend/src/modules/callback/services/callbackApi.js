import { API_V1_PREFIX } from '@/constants/api'
import { apiPost } from '@/services/api/client'
import { callbackCreatedSchema } from '@/schemas/callbackRequest'

/** Public callback create path — keep as a string so HMR cannot leave an object key undefined. */
const CALLBACKS_PATH = `${API_V1_PREFIX}/callbacks`

export async function submitCallbackRequest(body) {
  return apiPost(CALLBACKS_PATH, body, callbackCreatedSchema)
}
