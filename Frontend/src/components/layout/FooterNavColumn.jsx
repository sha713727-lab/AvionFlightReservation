'use client'

import { useState } from 'react'
import { HiChevronDown } from 'react-icons/hi'
import { cn } from '@/utils/cn'

export default function FooterNavColumn({ title, links }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-b border-white/10 sm:border-0">
      <button
        type="button"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((current) => !current)}
        className="flex min-h-12 w-full items-center justify-between py-3 text-left sm:pointer-events-none sm:mb-3 sm:min-h-0 sm:py-0"
      >
        <p className="text-xs font-medium uppercase tracking-[0.15em] text-white/75">
          {title}
        </p>
        <HiChevronDown
          className={cn(
            'h-5 w-5 text-white/75 transition-transform duration-200 sm:hidden',
            isOpen && 'rotate-180',
          )}
          aria-hidden
        />
      </button>

      <ul
        className={cn(
          'space-y-2 overflow-hidden pb-3 transition-[max-height,opacity] duration-300 sm:pb-0',
          isOpen
            ? 'max-h-96 opacity-100'
            : 'max-h-0 opacity-0 sm:max-h-none sm:opacity-100',
        )}
      >
        {links.map((link) => (
          <li key={link.label}>
            <a href={link.href} className="footer-link inline-flex min-h-12 items-center text-base text-white/80 sm:min-h-0 sm:text-sm">
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
