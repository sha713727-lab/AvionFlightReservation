'use client'

import { HiOutlineLogout } from 'react-icons/hi'
import { ADMIN_COPY } from '@/modules/admin/constants'
import { cn } from '@/utils/cn'

export default function AdminTopBar({
  onSignOut,
  title = ADMIN_COPY.welcomeTitle,
  description = ADMIN_COPY.dashboardDescription,
}) {
  return (
    <header className="border-b border-border bg-section px-4 py-5 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-[clamp(1.5rem,3vw,2rem)] font-semibold tracking-tight text-primary">
            {title}
          </h1>
          <p className="mt-1 text-sm text-text-secondary">{description}</p>
        </div>

        <button
          type="button"
          onClick={onSignOut}
          className={cn(
            'inline-flex items-center gap-2 self-start rounded-xl border border-border bg-section px-4 py-2.5 text-sm font-medium text-primary',
            'transition-colors hover:border-accent hover:text-accent',
            'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
          )}
        >
          <HiOutlineLogout className="h-4 w-4" aria-hidden />
          {ADMIN_COPY.signOutCta}
        </button>
      </div>
    </header>
  )
}
