import { ADMIN_SESSION_STORAGE_KEY } from '@/modules/admin/constants'

function canUseStorage() {
  return typeof window !== 'undefined' && typeof window.sessionStorage !== 'undefined'
}

export function readAdminSession() {
  if (!canUseStorage()) return null

  try {
    const raw = sessionStorage.getItem(ADMIN_SESSION_STORAGE_KEY)
    if (!raw) return null

    const parsed = JSON.parse(raw)
    if (!parsed?.token || !parsed?.expiresAt || !parsed?.admin?.email) {
      return null
    }

    if (new Date(parsed.expiresAt).getTime() <= Date.now()) {
      sessionStorage.removeItem(ADMIN_SESSION_STORAGE_KEY)
      return null
    }

    return parsed
  } catch {
    return null
  }
}

export function writeAdminSession(session) {
  if (!canUseStorage()) return
  sessionStorage.setItem(ADMIN_SESSION_STORAGE_KEY, JSON.stringify(session))
}

export function clearAdminSession() {
  if (!canUseStorage()) return
  sessionStorage.removeItem(ADMIN_SESSION_STORAGE_KEY)
}

export function hasValidAdminSession() {
  return Boolean(readAdminSession())
}
