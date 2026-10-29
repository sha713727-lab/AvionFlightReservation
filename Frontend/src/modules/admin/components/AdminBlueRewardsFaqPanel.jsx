'use client'

import AdminHotelFaqPanel from '@/modules/admin/components/AdminHotelFaqPanel'
import useAdminBlueRewardsFaqs from '@/modules/admin/hooks/useAdminBlueRewardsFaqs'

export default function AdminBlueRewardsFaqPanel({ token, faqs, applyPage }) {
  const editor = useAdminBlueRewardsFaqs(token, applyPage)
  return <AdminHotelFaqPanel faqs={faqs} editor={editor} />
}
