import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { IoChevronDown } from 'react-icons/io5'
import { cn } from '@/utils/cn'
import { SPRING } from '@/components/animations/motionPresets'

export default function Accordion({ items }) {
  const [openId, setOpenId] = useState(null)

  return (
    <div className="space-y-2" role="region" aria-label="Frequently asked questions">
      {items.map((item, index) => {
        const isOpen = openId === item.id
        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ delay: index * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.01 }}
            className={cn(
              'rounded-xl border bg-card overflow-hidden transition-colors duration-300',
              isOpen ? 'border-accent/30 shadow-md shadow-accent/5' : 'border-border hover:border-accent/20',
            )}
          >
            <button
              type="button"
              id={`faq-btn-${item.id}`}
              aria-expanded={isOpen}
              aria-controls={`faq-panel-${item.id}`}
              onClick={() => setOpenId(isOpen ? null : item.id)}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-sm font-medium text-primary hover:text-accent transition-colors duration-300"
            >
              {item.question}
              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={SPRING}
                className={cn(
                  'flex items-center justify-center w-8 h-8 rounded-full shrink-0 transition-colors duration-300',
                  isOpen ? 'bg-accent/10 text-accent' : 'bg-section-alt text-text-secondary',
                )}
              >
                <IoChevronDown className="w-4 h-4" aria-hidden />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`faq-panel-${item.id}`}
                  role="region"
                  aria-labelledby={`faq-btn-${item.id}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-5 text-sm text-text-secondary leading-relaxed">{item.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )
      })}
    </div>
  )
}
