import { motion } from 'framer-motion'
import { FaPhone } from 'react-icons/fa'
import { COPY } from '@/constants/copy'
import { PHONE_HREF, PHONE_NUMBER } from '@/constants/contact'

export default function FloatingActions() {
  return (
    <motion.a
      href={PHONE_HREF}
      aria-label={`${COPY.cta.callNow}: ${PHONE_NUMBER}`}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 300, damping: 20 }}
      whileHover={{ scale: 1.1, y: -4 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-40 hidden h-14 w-14 items-center justify-center rounded-full bg-accent text-white shadow-lg shadow-accent/30 lg:flex"
    >
      <span className="absolute inset-0 rounded-full bg-accent animate-ping-soft opacity-30" aria-hidden />
      <FaPhone className="relative z-10 h-5 w-5" aria-hidden />
    </motion.a>
  )
}
