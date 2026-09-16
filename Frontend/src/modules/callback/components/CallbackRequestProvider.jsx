'use client'

import { createContext, useCallback, useContext, useEffect, useMemo } from 'react'
import { usePathname } from 'next/navigation'
import CallbackRequestModal from '@/modules/callback/components/CallbackRequestModal'
import { useCallbackScrollTrigger } from '@/modules/callback/hooks/useCallbackScrollTrigger'
import { useContactSettings } from '@/modules/contact/components/ContactSettingsProvider'
import { ADMIN_PATH } from '@/constants/routes'

const LEGACY_SESSION_KEY = 'avion-callback-modal-done'

const CallbackRequestContext = createContext(null)

export function useCallbackRequestModal() {
  return useContext(CallbackRequestContext)
}

function CallbackRequestController({ children }) {
  const {
    isPromptOpen,
    isFormOpen,
    isSuccessOpen,
    openForm,
    showSuccess,
    closeAll,
  } = useCallbackScrollTrigger()

  const open = useCallback(() => {
    openForm()
  }, [openForm])

  const value = useMemo(() => ({ open }), [open])

  return (
    <CallbackRequestContext.Provider value={value}>
      {children}
      <CallbackRequestModal
        isPromptOpen={isPromptOpen}
        isFormOpen={isFormOpen}
        isSuccessOpen={isSuccessOpen}
        openForm={openForm}
        showSuccess={showSuccess}
        closeAll={closeAll}
      />
    </CallbackRequestContext.Provider>
  )
}

function DisabledCallbackRequestProvider({ children }) {
  const value = useMemo(() => ({ open: () => {} }), [])
  return (
    <CallbackRequestContext.Provider value={value}>{children}</CallbackRequestContext.Provider>
  )
}

export default function CallbackRequestProvider({ children }) {
  const pathname = usePathname()
  const { callbacksEnabled } = useContactSettings()
  const isAdminRoute = pathname === ADMIN_PATH || pathname.startsWith(`${ADMIN_PATH}/`)

  useEffect(() => {
    try {
      sessionStorage.removeItem(LEGACY_SESSION_KEY)
    } catch {
      // Ignore storage access failures.
    }
  }, [])

  if (isAdminRoute) {
    return children
  }

  if (!callbacksEnabled) {
    return <DisabledCallbackRequestProvider>{children}</DisabledCallbackRequestProvider>
  }

  return <CallbackRequestController key={pathname}>{children}</CallbackRequestController>
}
