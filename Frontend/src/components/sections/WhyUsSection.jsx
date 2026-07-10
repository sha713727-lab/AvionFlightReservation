import { motion } from 'framer-motion'
import Container from '@/components/ui/Container'
import LayeredSectionHeading from '@/components/ui/LayeredSectionHeading'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations/FadeIn'
import { SPRING } from '@/components/animations/motionPresets'
import { WHY_US_CARD_ACCENTS } from '@/constants/sectionThemes'
import { COPY } from '@/constants/copy'
import { WHY_US, STATS } from '@/data/services'
import { useCounter } from '@/hooks/useCounter'
import { cn } from '@/utils/cn'

function StatCounter({ value, suffix, label }) {
  const { count, ref } = useCounter(value)
  return (
    <motion.div
      ref={ref}
      whileHover={{ y: -2 }}
      transition={SPRING}
      className="group text-center cursor-default"
    >
      <p className="text-3xl lg:text-4xl font-semibold text-accent mb-1 tracking-tight transition-colors duration-300 group-hover:text-accent-hover">
        {count.toLocaleString()}{suffix}
      </p>
      <p className="text-sm text-text-secondary transition-colors duration-300 group-hover:text-text">
        {label}
      </p>
    </motion.div>
  )
}

export default function WhyUsSection() {
  return (
    <section id="why-us" className="py-24 lg:py-32 bg-section-alt" aria-labelledby="why-us-heading">
      <Container>
        <LayeredSectionHeading
          titleId="why-us-heading"
          watermark={COPY.whyUs.watermark}
          title={COPY.whyUs.title}
          description={COPY.whyUs.description}
        />

        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {WHY_US.map((item, index) => {
            const accent = WHY_US_CARD_ACCENTS[index % WHY_US_CARD_ACCENTS.length]
            const Icon = item.icon

            return (
              <StaggerItem key={item.id}>
                <motion.article
                  whileHover={{ y: -4 }}
                  transition={SPRING}
                  className={cn(
                    'group h-full rounded-xl border border-border border-l-4 bg-card p-7 lg:p-8',
                    'shadow-sm hover:shadow-card-hover transition-all duration-300',
                    accent.stripe,
                  )}
                >
                  <div
                    className={cn(
                      'mb-5 flex h-11 w-11 items-center justify-center rounded-lg transition-colors duration-300',
                      accent.iconBg,
                    )}
                  >
                    <Icon className={cn('h-5 w-5', accent.icon)} aria-hidden />
                  </div>

                  <h3 className="mb-2 text-lg font-semibold text-primary transition-colors duration-300 group-hover:text-accent">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-text-secondary">
                    {item.description}
                  </p>
                </motion.article>
              </StaggerItem>
            )
          })}
        </StaggerContainer>

        <FadeIn>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 rounded-xl border border-border bg-card py-12 px-8 shadow-sm">
            {STATS.map((stat) => (
              <StatCounter key={stat.label} {...stat} />
            ))}
          </div>
        </FadeIn>
      </Container>
    </section>
  )
}
