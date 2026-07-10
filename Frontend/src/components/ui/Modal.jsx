'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { IoClose } from 'react-icons/io5'
import { cn } from '@/utils/cn'

export default function Modal({ isOpen, onClose, title, children, className }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-primary/60 backdrop-blur-sm" aria-hidden />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            className={cn(
              'relative z-10 w-full max-w-md rounded-2xl bg-card p-8 shadow-2xl',
              className,
            )}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 rounded-lg p-2 text-text-secondary transition-colors hover:bg-background hover:text-primary"
              aria-label="Close dialog"
            >
              <IoClose className="h-5 w-5" />
            </button>
            {title && (
              <h3 id="modal-title" className="mb-4 pr-8 text-xl font-semibold">
                {title}
              </h3>
            )}
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
