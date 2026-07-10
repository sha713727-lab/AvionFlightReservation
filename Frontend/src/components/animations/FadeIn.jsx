import { motion, useReducedMotion } from 'framer-motion'
import { EASE, SPRING } from './motionPresets'

const variants = {
  up: { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } },
  down: { hidden: { opacity: 0, y: -40 }, visible: { opacity: 1, y: 0 } },
  left: { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0 } },
  scale: { hidden: { opacity: 0, scale: 0.92 }, visible: { opacity: 1, scale: 1 } },
  fade: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
}

export function FadeIn({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  className = '',
  once = true,
}) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-60px' }}
      variants={variants[direction] || variants.up}
      transition={{
        duration: reduceMotion ? 0 : duration,
        delay: reduceMotion ? 0 : delay,
        ease: EASE,
      }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerContainer({ children, className = '', stagger = 0.1, delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className = '' }) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 30, scale: 0.97 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.55, ease: EASE },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

export function HoverLift({
  children,
  className = '',
  y = -6,
  scale = 1,
  as: Component = motion.div,
}) {
  const reduceMotion = useReducedMotion()

  return (
    <Component
      className={className}
      whileHover={reduceMotion ? {} : { y, scale, transition: SPRING }}
      whileTap={reduceMotion ? {} : { scale: 0.98 }}
    >
      {children}
    </Component>
  )
}
