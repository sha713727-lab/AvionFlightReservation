'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { COPY } from '@/constants/copy'
import { EASE, SPRING } from '@/components/animations/motionPresets'
import { cn } from '@/utils/cn'

export default function DestinationPlaceCard({
  name,
  image,
  alt,
  tierTitle,
  points,
  featured = false,
}) {
  const [hasError, setHasError] = useState(false)

  return (
    <motion.article
      layout
      whileHover={{ y: -8 }}
      transition={SPRING}
      className={cn(
        'group relative overflow-hidden rounded-3xl border border-border bg-card shadow-card',
        featured ? 'min-h-[320px] sm:min-h-[380px] lg:min-h-[440px]' : 'min-h-[240px] sm:min-h-[280px]',
      )}
    >
      {!hasError ? (
        <motion.img
          src={image}
          alt={alt}
          loading="lazy"
          decoding="async"
          onError={() => setHasError(true)}
          className="absolute inset-0 h-full w-full object-cover"
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.7, ease: EASE }}
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent" />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/35 to-transparent transition-opacity duration-500 group-hover:from-primary/95" />

      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs font-medium uppercase tracking-[0.16em] text-white/65"
        >
          {tierTitle}
        </motion.p>
        <h3
          className={cn(
            'mt-2 font-heading font-semibold tracking-tight text-white',
            featured ? 'text-3xl sm:text-4xl' : 'text-2xl',
          )}
        >
          {name}
        </h3>
        <p className="mt-2 text-sm text-white/80">
          {COPY.destinations.redeemFromLabel}{' '}
          <span className="font-semibold text-secondary">
            {points.toLocaleString()} {COPY.destinations.pointsLabel}
          </span>
        </p>
      </div>
    </motion.article>
  )
}
