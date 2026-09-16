'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import {
  fetchPublicContactSettings,
  getFallbackContactEmail,
  getFallbackSupportPhones,
  toMailtoHref,
  toTelHref,
} from '@/modules/admin/services/adminSettingsApi'

function buildValue(email, phones, callbacksEnabled) {
  const list = phones.length > 0 ? phones : getFallbackSupportPhones()
  const supportPhones = list.map((display) => ({
    display,
    href: toTelHref(display),
  }))
  const primary = supportPhones[0]

  return {
    reservationEmail: email,
    reservationEmailHref: toMailtoHref(email),
    supportPhones,
    phoneNumber: primary.display,
    phoneHref: primary.href,
    callbacksEnabled: Boolean(callbacksEnabled),
  }
}

const fallbackValue = buildValue(getFallbackContactEmail(), getFallbackSupportPhones(), false)

const ContactSettingsContext = createContext(fallbackValue)

export function useContactSettings() {
  return useContext(ContactSettingsContext)
}

export default function ContactSettingsProvider({ children }) {
  const [reservationEmail, setReservationEmail] = useState(fallbackValue.reservationEmail)
  const [supportPhones, setSupportPhones] = useState(
    fallbackValue.supportPhones.map((phone) => phone.display),
  )
  const [callbacksEnabled, setCallbacksEnabled] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const data = await fetchPublicContactSettings()
        if (cancelled) return
        setReservationEmail(data.reservationEmail)
        setSupportPhones(data.supportPhones)
        setCallbacksEnabled(Boolean(data.callbacksEnabled))
      } catch {
        if (cancelled) return
        setReservationEmail(fallbackValue.reservationEmail)
        setSupportPhones(fallbackValue.supportPhones.map((phone) => phone.display))
        setCallbacksEnabled(false)
      }
    }

    void load()
    return () => {
      cancelled = true
    }
  }, [])

  const value = useMemo(
    () => buildValue(reservationEmail, supportPhones, callbacksEnabled),
    [reservationEmail, supportPhones, callbacksEnabled],
  )

  return (
    <ContactSettingsContext.Provider value={value}>{children}</ContactSettingsContext.Provider>
  )
}
