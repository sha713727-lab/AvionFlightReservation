'use client'

import { useEffect, useRef, useState } from 'react'
import {
  fetchDestinations,
  fetchFaqs,
  fetchServices,
} from '@/services/api/catalog'

function needsClientHydration({ services, destinations, faqs, catalogError }) {
  return Boolean(
    catalogError ||
      services.length === 0 ||
      destinations.length === 0 ||
      faqs.length === 0,
  )
}

/**
 * If SSR catalog failed (Docker-internal), reload from the public API in the browser.
 */
export function useHomeCatalog(initialCatalog) {
  const initialRef = useRef(initialCatalog)
  const [catalog, setCatalog] = useState(initialCatalog)
  const [isHydrating, setIsHydrating] = useState(() =>
    needsClientHydration(initialCatalog),
  )

  useEffect(() => {
    const initial = initialRef.current

    if (!needsClientHydration(initial)) {
      setIsHydrating(false)
      return undefined
    }

    let cancelled = false

    async function hydrate() {
      try {
        const [services, destinations, faqs] = await Promise.all([
          fetchServices(),
          fetchDestinations(),
          fetchFaqs(),
        ])

        if (cancelled) {
          return
        }

        setCatalog({
          services,
          destinations,
          faqs,
          catalogError: null,
        })
      } catch {
        if (!cancelled) {
          setCatalog(initial)
        }
      } finally {
        if (!cancelled) {
          setIsHydrating(false)
        }
      }
    }

    hydrate()

    return () => {
      cancelled = true
    }
  }, [])

  return { ...catalog, isHydrating }
}
