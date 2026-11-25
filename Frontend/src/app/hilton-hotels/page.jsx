import { redirect } from 'next/navigation'
import { HOTEL_BOOKING_PATH } from '@/constants/routes'

export default function HiltonHotelsRedirectPage() {
  redirect(HOTEL_BOOKING_PATH)
}
