import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { cn } from '@/utils/cn'

function TimelineStep({ item, index }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.55,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative flex flex-col items-center text-center"
    >
      <motion.div
        whileHover={{ scale: 1.08 }}
        transition={{ type: 'spring', stiffness: 400, damping: 18 }}
        className={cn(
          'relative z-10 flex items-center justify-center w-14 h-14 rounded-full mb-5',
          'border-2 border-border bg-card text-accent font-semibold text-sm',
          'transition-colors duration-300',
          'group-hover:border-accent group-hover:bg-accent group-hover:text-white',
          'group-hover:shadow-lg group-hover:shadow-accent/25',
        )}
        aria-label={`Step ${item.step}`}
      >
        <motion.span
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 20,
            delay: index * 0.12 + 0.15,
          }}
        >
          {item.step}
        </motion.span>
      </motion.div>

      <motion.div className="transition-transform duration-300 group-hover:-translate-y-1">
        <h3 className="text-base font-semibold mb-2 transition-colors duration-300 group-hover:text-accent-hover">
          {item.title}
        </h3>
        <p className="text-sm text-text-secondary leading-relaxed transition-colors duration-300 group-hover:text-text">
          {item.description}
        </p>
      </motion.div>
    </motion.li>
  )
}

export default function Timeline({ steps }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <div ref={ref} className="relative">
      <div
        className="hidden lg:block absolute top-7 left-[10%] right-[10%] h-0.5 bg-border rounded-full overflow-hidden"
        aria-hidden
      >
        <motion.div
          className="h-full bg-accent origin-left rounded-full"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        />
      </div>

      <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-6">
        {steps.map((item, index) => (
          <TimelineStep key={item.step} item={item} index={index} />
        ))}
      </ol>
    </div>
  )
}
