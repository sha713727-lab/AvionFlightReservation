'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { PHONE_HREF, PHONE_NUMBER } from '@/constants/contact'
import {
  fetchPublicContactSettings,
  getFallbackContactEmail,
  getFallbackSupportPhones,
  toMailtoHref,
  toTelHref,
} from '@/modules/admin/services/adminSettingsApi'

const CANONICAL_DIGITS = PHONE_NUMBER.replace(/\D/g, '')

function lockSupportPhones(phones) {
  const extras = phones.filter((display) => display.replace(/\D/g, '') !== CANONICAL_DIGITS)
  return [PHONE_NUMBER, ...extras].map((display) => ({
    display,
    href: display === PHONE_NUMBER ? PHONE_HREF : toTelHref(display),
  }))
}

function buildValue(email, phones, callbacksEnabled) {
  const supportPhones = lockSupportPhones(phones.length > 0 ? phones : getFallbackSupportPhones())
  return {
    reservationEmail: email,
    reservationEmailHref: toMailtoHref(email),
    supportPhones,
    phoneNumber: PHONE_NUMBER,
    phoneHref: PHONE_HREF,
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
