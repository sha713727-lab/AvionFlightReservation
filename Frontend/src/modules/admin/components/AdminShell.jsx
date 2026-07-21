'use client'

import { useEffect, useState } from 'react'
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi'
import AvionLogo from '@/components/brand/AvionLogo'
import { ADMIN_COPY } from '@/modules/admin/constants'
import AdminSidebar from '@/modules/admin/components/AdminSidebar'
import AdminTopBar from '@/modules/admin/components/AdminTopBar'
import { cn } from '@/utils/cn'

export default function AdminShell({
  onSignOut,
  children,
  title,
  description,
}) {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (!menuOpen) return undefined
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <div className="min-h-dvh bg-background">
      <div className="mx-auto flex min-h-dvh w-full max-w-[90rem]">
        <aside className="sticky top-0 hidden h-dvh w-64 shrink-0 border-r border-border lg:block">
          <AdminSidebar />
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex items-center justify-between gap-3 border-b border-border bg-section px-4 py-3 lg:hidden">
            <AvionLogo size="sm" tone="light" hideName />
            <button
              type="button"
              className={cn(
                'inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border text-primary',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
              )}
              aria-label={menuOpen ? ADMIN_COPY.closeMenu : ADMIN_COPY.openMenu}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? (
                <HiOutlineX className="h-5 w-5" aria-hidden />
              ) : (
                <HiOutlineMenu className="h-5 w-5" aria-hidden />
              )}
            </button>
          </div>

          <AdminTopBar onSignOut={onSignOut} title={title} description={description} />
          <div className="flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">{children}</div>
        </div>
      </div>

      {menuOpen ? (
        <div className="fixed inset-0 z-40 lg:hidden" role="dialog" aria-modal="true">
          <button
            type="button"
            className="absolute inset-0 bg-primary/40"
            aria-label={ADMIN_COPY.closeMenu}
            onClick={closeMenu}
          />
          <div className="absolute inset-y-0 left-0 w-[min(18rem,88vw)] border-r border-border bg-section shadow-xl">
            <AdminSidebar onNavigate={closeMenu} />
          </div>
        </div>
      ) : null}
    </div>
  )
}
