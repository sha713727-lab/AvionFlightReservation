import { redirect } from 'next/navigation'
import { HOTEL_BOOKING_PATH } from '@/constants/routes'

export default function WyndhamHotelsRedirectPage() {
  redirect(HOTEL_BOOKING_PATH)
}
