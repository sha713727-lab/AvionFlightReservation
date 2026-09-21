'use client'

import { useEffect, useId, useRef } from 'react'
import { IoClose } from 'react-icons/io5'
import { cn } from '@/utils/cn'

const FOCUSABLE_SELECTOR =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  className,
  closeOnBackdrop = true,
}) {
  const dialogRef = useRef(null)
  const previousFocusRef = useRef(null)
  const onCloseRef = useRef(onClose)
  const titleId = useId()

  useEffect(() => {
    onCloseRef.current = onClose
  }, [onClose])

  useEffect(() => {
    if (!isOpen) return undefined

    previousFocusRef.current = document.activeElement
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const dialog = dialogRef.current
    const preferred = dialog?.querySelector('input, select, textarea')
    const focusable = dialog?.querySelectorAll(FOCUSABLE_SELECTOR)
    const first = preferred || focusable?.[0]
    const focusTimer = window.setTimeout(() => {
      first?.focus({ preventScroll: true })
    }, 0)

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onCloseRef.current()
        return
      }

      const nodes = dialog?.querySelectorAll(FOCUSABLE_SELECTOR)
      if (event.key !== 'Tab' || !nodes || nodes.length === 0) return

      const firstEl = nodes[0]
      const lastEl = nodes[nodes.length - 1]

      if (event.shiftKey && document.activeElement === firstEl) {
        event.preventDefault()
        lastEl.focus()
      } else if (!event.shiftKey && document.activeElement === lastEl) {
        event.preventDefault()
        firstEl.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)

    return () => {
      window.clearTimeout(focusTimer)
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
      if (previousFocusRef.current instanceof HTMLElement) {
        previousFocusRef.current.focus({ preventScroll: true })
      }
    }
  }, [isOpen])

  if (!isOpen) {
    return null
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-primary/60 backdrop-blur-sm"
        aria-hidden
        onClick={closeOnBackdrop ? onClose : undefined}
      />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        className={cn(
          'relative z-10 w-full max-w-md max-h-[min(90dvh,40rem)] overflow-y-auto rounded-2xl bg-card p-5 shadow-2xl sm:p-8',
          className,
        )}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 inline-flex h-12 w-12 items-center justify-center rounded-lg text-text-secondary transition-colors hover:bg-background hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:top-4 sm:right-4"
          aria-label="Close dialog"
        >
          <IoClose className="h-5 w-5" />
        </button>
        {title && (
          <h3 id={titleId} className="mb-4 pr-8 text-xl font-semibold">
            {title}
          </h3>
        )}
        {children}
      </div>
    </div>
  )
}
