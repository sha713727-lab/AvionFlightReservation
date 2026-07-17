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
        className="flex w-full items-center justify-between py-3 text-left sm:pointer-events-none sm:mb-3 sm:py-0"
      >
        <h4 className="text-xs font-medium uppercase tracking-[0.15em] text-white/40">
          {title}
        </h4>
        <HiChevronDown
          className={cn(
            'h-5 w-5 text-white/50 transition-transform duration-200 sm:hidden',
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
            <a href={link.href} className="footer-link text-sm text-white/60">
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
