'use client'

import AdminHotelFaqPanel from '@/modules/admin/components/AdminHotelFaqPanel'
import useAdminWyndhamFaqs from '@/modules/admin/hooks/useAdminWyndhamFaqs'

export default function AdminWyndhamFaqPanel({ token, faqs, applyPage }) {
  const editor = useAdminWyndhamFaqs(token, applyPage)
  return <AdminHotelFaqPanel faqs={faqs} editor={editor} />
}
