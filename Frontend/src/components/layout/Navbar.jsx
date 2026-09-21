'use client'

import { useState } from 'react'
import { HiMenuAlt3, HiX, HiPhone } from 'react-icons/hi'
import { COPY } from '@/constants/copy'
import { NAV_LINKS } from '@/constants/navigation'
import { SITE_NAME } from '@/constants/contact'
import { HOME_PATH } from '@/constants/routes'
import { CTA_PLACEMENT } from '@/constants/analytics'
import { useScrollDirection } from '@/hooks/useScrollDirection'
import AvionLogo from '@/components/brand/AvionLogo'
import Button from '@/components/buttons/Button'
import Container from '@/components/ui/Container'
import MobileNav from '@/components/layout/MobileNav'
import NavLink from '@/components/layout/NavLink'
import NavLegalDropdown from '@/components/layout/NavLegalDropdown'
import TrackedTelLink from '@/components/links/TrackedTelLink'
import { useCallExpertModal } from '@/modules/call/components/CallExpertProvider'
import { useContactSettings } from '@/modules/contact/components/ContactSettingsProvider'
import { cn } from '@/utils/cn'

export default function Navbar({ overDarkHero = false }) {
  const { isScrolled } = useScrollDirection()
  const { phoneNumber, phoneHref } = useContactSettings()
  const [mobileOpen, setMobileOpen] = useState(false)
  const callModal = useCallExpertModal()
  const useLightNav = overDarkHero && !isScrolled

  const closeMobileNav = () => setMobileOpen(false)

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 w-full',
          isScrolled
            ? 'glass pt-4 pb-3 shadow-sm shadow-primary/5'
            : overDarkHero
              ? 'bg-transparent pt-6 pb-5'
              : 'max-lg:glass max-lg:pt-5 max-lg:pb-3 max-lg:shadow-sm max-lg:shadow-primary/5 bg-transparent pt-6 pb-5',
        )}
      >
        <Container>
          <div className="flex items-center justify-between gap-4">
            <a
              href={HOME_PATH}
              aria-label={`${SITE_NAME} home`}
              className="relative z-10 inline-flex min-w-0 shrink-0 items-center"
            >
              <AvionLogo size="md" hideName priority tone={useLightNav ? 'dark' : 'light'} />
            </a>

            <nav
              className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 lg:flex"
              aria-label="Main navigation"
            >
              {NAV_LINKS.map((link) => (
                <NavLink key={link.href} href={link.href} onDark={useLightNav}>
                  {link.label}
                </NavLink>
              ))}
              <NavLegalDropdown onDark={useLightNav} />
            </nav>

            <div className="relative z-10 flex shrink-0 items-center justify-end gap-2 sm:gap-3">
              <div className="hidden lg:block">
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => callModal.open(CTA_PLACEMENT.navbar)}
                >
                  {COPY.cta.bookConsultation}
                </Button>
              </div>

              <TrackedTelLink
                href={phoneHref}
                aria-label={`${COPY.cta.callNow}: ${phoneNumber}`}
                className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent text-white shadow-sm shadow-accent/20 lg:hidden"
              >
                <HiPhone className="h-5 w-5 shrink-0" aria-hidden />
              </TrackedTelLink>

              <button
                type="button"
                className={cn(
                  'inline-flex h-12 w-12 items-center justify-center rounded-full lg:hidden',
                  useLightNav ? 'text-white' : 'text-primary',
                )}
                onClick={() => setMobileOpen((open) => !open)}
                aria-expanded={mobileOpen}
                aria-controls="mobile-navigation"
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              >
                {mobileOpen ? (
                  <HiX className="h-6 w-6" aria-hidden />
                ) : (
                  <HiMenuAlt3 className="h-6 w-6" aria-hidden />
                )}
              </button>
            </div>
          </div>
        </Container>
      </header>

      {mobileOpen ? <MobileNav isOpen={mobileOpen} onClose={closeMobileNav} /> : null}
    </>
  )
}
