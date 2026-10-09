'use client'

import AdminHotelFaqPanel from '@/modules/admin/components/AdminHotelFaqPanel'
import useAdminHiltonFaqs from '@/modules/admin/hooks/useAdminHiltonFaqs'

export default function AdminHiltonFaqPanel({ token, faqs, applyPage }) {
  const editor = useAdminHiltonFaqs(token, applyPage)
  return <AdminHotelFaqPanel faqs={faqs} editor={editor} />
}
