'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ADMIN_PATH } from '@/constants/routes'
import { hasValidAdminSession } from '@/modules/admin/utils/session'

export default function AdminLoginSessionRedirect() {
  const router = useRouter()

  useEffect(() => {
    if (hasValidAdminSession()) {
      router.replace(ADMIN_PATH)
    }
  }, [router])

  return null
}
