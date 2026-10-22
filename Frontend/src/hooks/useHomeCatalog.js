'use client'

import { useEffect, useRef, useState } from 'react'
import { fetchFaqs } from '@/services/api/catalog'

function needsClientHydration({ faqs, catalogError }) {
  return Boolean(catalogError || faqs.length === 0)
}

/**
 * If SSR catalog failed (Docker-internal), reload FAQs from the public API in the browser.
 * Homepage no longer depends on services/destinations catalog payloads.
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
        const faqs = await fetchFaqs()

        if (cancelled) {
          return
        }

        setCatalog({
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
