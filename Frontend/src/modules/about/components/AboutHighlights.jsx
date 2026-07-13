'use client'

import Container from '@/components/ui/Container'
import { StaggerContainer, StaggerItem } from '@/components/animations/FadeIn'
import { ABOUT_HIGHLIGHTS } from '@/modules/about/constants'
import { cn } from '@/utils/cn'

export default function AboutHighlights() {
  return (
    <section className="border-y border-border/70 bg-section py-14 lg:py-16" aria-label="About highlights">
      <Container>
        <StaggerContainer className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
          {ABOUT_HIGHLIGHTS.map((item) => {
            const Icon = item.icon

            return (
              <StaggerItem key={item.id}>
                <div
                  className={cn(
                    'flex h-full flex-col rounded-2xl border border-border bg-card p-7',
                    'shadow-card transition-all duration-300',
                    'hover:-translate-y-1 hover:border-accent/30 hover:shadow-card-hover',
                  )}
                >
                  <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <h2 className="mb-2 text-xl font-semibold tracking-tight text-primary">
                    {item.title}
                  </h2>
                  <p className="text-sm leading-relaxed text-text-secondary">{item.description}</p>
                </div>
              </StaggerItem>
            )
          })}
        </StaggerContainer>
      </Container>
    </section>
  )
}
