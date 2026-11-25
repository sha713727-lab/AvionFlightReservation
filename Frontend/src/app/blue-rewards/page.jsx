import { redirect } from 'next/navigation'
import { POINTS_REDEMPTION_PATH } from '@/constants/routes'

export default function BlueRewardsRedirectPage() {
  redirect(POINTS_REDEMPTION_PATH)
}
