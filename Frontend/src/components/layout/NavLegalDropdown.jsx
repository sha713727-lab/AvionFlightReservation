'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { HiChevronDown } from 'react-icons/hi'
import { LEGAL_LINKS, LEGAL_NAV_LABEL } from '@/constants/navigation'
import { EASE } from '@/components/animations/motionPresets'
import { cn } from '@/utils/cn'

export default function NavLegalDropdown({ onDark = false }) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef(null)
  const closeTimerRef = useRef(null)

  const clearCloseTimer = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }
  }

  const openMenu = () => {
    clearCloseTimer()
    setOpen(true)
  }

  const scheduleCloseMenu = () => {
    clearCloseTimer()
    closeTimerRef.current = setTimeout(() => {
      setOpen(false)
    }, 120)
  }

  useEffect(() => {
    return () => clearCloseTimer()
  }, [])

  useEffect(() => {
    if (!open) {
      return undefined
    }

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setOpen(false)
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [open])

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={openMenu}
      onMouseLeave={scheduleCloseMenu}
    >
      <button
        type="button"
        className={cn(
          'inline-flex flex-row items-center gap-1 whitespace-nowrap text-sm font-medium transition-colors duration-300',
          onDark ? 'text-white hover:text-white' : 'text-text-secondary hover:text-primary',
        )}
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((current) => !current)}
        onFocus={openMenu}
      >
        <span>{LEGAL_NAV_LABEL}</span>
        <HiChevronDown
          className={cn(
            'h-4 w-4 shrink-0 transition-transform duration-200',
            open && 'rotate-180',
          )}
          aria-hidden
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            aria-label={LEGAL_NAV_LABEL}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.2, ease: EASE }}
            className="absolute left-1/2 top-full z-50 pt-3 -translate-x-1/2"
          >
            <div className="w-56 rounded-2xl border border-border bg-card p-2 shadow-card-hover">
              {LEGAL_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  role="menuitem"
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-3 py-2.5 text-sm text-text-secondary transition-colors hover:bg-accent/5 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
