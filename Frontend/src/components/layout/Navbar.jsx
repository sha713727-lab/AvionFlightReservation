import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { HiMenuAlt3, HiX, HiPhone } from 'react-icons/hi'
import { COPY } from '@/constants/copy'
import { NAV_LINKS } from '@/constants/navigation'
import { SITE_NAME, PHONE_HREF, PHONE_NUMBER } from '@/constants/contact'
import { HOME_PATH } from '@/constants/routes'
import { useScrollDirection } from '@/hooks/useScrollDirection'
import { EASE } from '@/components/animations/motionPresets'
import AvionLogo from '@/components/brand/AvionLogo'
import Button from '@/components/buttons/Button'
import Container from '@/components/ui/Container'
import MobileNav from '@/components/layout/MobileNav'
import NavLink from '@/components/layout/NavLink'
import NavLegalDropdown from '@/components/layout/NavLegalDropdown'
import { useCallExpertModal } from '@/modules/call/components/CallExpertProvider'
import { cn } from '@/utils/cn'

export default function Navbar({ overDarkHero = false }) {
  const { isScrolled } = useScrollDirection()
  const [mobileOpen, setMobileOpen] = useState(false)
  const callModal = useCallExpertModal()
  const useLightNav = overDarkHero && !isScrolled

  const closeMobileNav = () => setMobileOpen(false)

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: EASE }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500',
          isScrolled
            ? 'glass py-3 shadow-sm shadow-primary/5'
            : overDarkHero
              ? 'bg-transparent py-5'
              : 'max-lg:glass max-lg:py-3 max-lg:shadow-sm max-lg:shadow-primary/5 bg-transparent py-5',
        )}
      >
        <Container>
          <div className="flex items-center justify-between gap-4">
            <motion.a
              href={HOME_PATH}
              aria-label={`${SITE_NAME} home`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative z-10 inline-flex min-w-0 shrink-0 items-center"
            >
              <AvionLogo size="md" hideName tone={useLightNav ? 'dark' : 'light'} />
            </motion.a>

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

            <div className="relative z-10 flex shrink-0 items-center justify-end gap-2">
              <div className="hidden lg:block">
                <Button variant="primary" size="md" onClick={callModal.open}>
                  {COPY.cta.bookConsultation}
                </Button>
              </div>

              <motion.a
                href={PHONE_HREF}
                aria-label={`${COPY.cta.callNow}: ${PHONE_NUMBER}`}
                whileTap={{ scale: 0.95 }}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent text-white shadow-sm shadow-accent/20 lg:hidden"
              >
                <HiPhone className="h-4 w-4 shrink-0" aria-hidden />
              </motion.a>

              <motion.button
                type="button"
                whileTap={{ scale: 0.9 }}
                className={cn('p-2 lg:hidden', useLightNav ? 'text-white' : 'text-primary')}
                onClick={() => setMobileOpen((open) => !open)}
                aria-expanded={mobileOpen}
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {mobileOpen ? (
                    <motion.span
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <HiX className="w-6 h-6" />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <HiMenuAlt3 className="w-6 h-6" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </Container>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && <MobileNav isOpen={mobileOpen} onClose={closeMobileNav} />}
      </AnimatePresence>
    </>
  )
}
