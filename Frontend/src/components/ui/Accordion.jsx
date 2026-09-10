'use client'

import { useState } from 'react'
import { IoChevronDown } from 'react-icons/io5'
import { cn } from '@/utils/cn'

export default function Accordion({ items }) {
  const [openId, setOpenId] = useState(null)

  return (
    <div className="space-y-2">
      {items.map((item) => {
        const isOpen = openId === item.id
        return (
          <div
            key={item.id}
            className={cn(
              'rounded-xl border bg-card overflow-hidden transition-colors duration-300',
              isOpen ? 'border-accent/30 shadow-md shadow-accent/5' : 'border-border hover:border-accent/20',
            )}
          >
            <h3 className="m-0">
              <button
                type="button"
                id={`faq-btn-${item.id}`}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${item.id}`}
                onClick={() => setOpenId(isOpen ? null : item.id)}
                className="flex min-h-12 w-full items-center justify-between gap-4 px-5 py-4 text-left text-base font-medium text-primary transition-colors duration-300 hover:text-accent sm:px-6"
              >
                {item.question}
                <span
                  className={cn(
                    'flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-transform duration-300',
                    isOpen ? 'rotate-180 bg-accent/10 text-accent' : 'bg-section-alt text-text-secondary',
                  )}
                >
                  <IoChevronDown className="h-4 w-4" aria-hidden />
                </span>
              </button>
            </h3>
            <div
              id={`faq-panel-${item.id}`}
              role="region"
              aria-labelledby={`faq-btn-${item.id}`}
              hidden={!isOpen}
              className={isOpen ? 'block' : 'hidden'}
            >
              <p className="faq-answer px-5 pb-5 text-base leading-relaxed text-text-secondary sm:px-6">
                {item.answer}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
