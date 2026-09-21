'use client'

import { useEffect } from 'react'
import { CTA_PLACEMENT } from '@/constants/analytics'
import { trackServiceFeeView } from '@/utils/analytics'

/** Fires once per mount when the service-fees page is viewed. */
export default function ServiceFeeViewTracker() {
  useEffect(() => {
    trackServiceFeeView(CTA_PLACEMENT.serviceFeesPage)
  }, [])

  return null
}
