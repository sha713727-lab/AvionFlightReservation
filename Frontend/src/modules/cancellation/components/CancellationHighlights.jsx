'use client'

import Container from '@/components/ui/Container'
import { StaggerContainer, StaggerItem } from '@/components/animations/FadeIn'
import { CANCELLATION_HIGHLIGHTS } from '@/modules/cancellation/constants'

export default function CancellationHighlights() {
  return (
    <section className="border-y border-border/70 bg-section py-10 lg:py-12" aria-label="Cancellation highlights">
      <Container>
        <StaggerContainer className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
          {CANCELLATION_HIGHLIGHTS.map((item) => {
            const Icon = item.icon

            return (
              <StaggerItem key={item.id}>
                <div className="flex items-center gap-3 rounded-full border border-border bg-card px-5 py-3.5 shadow-card">
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                    <Icon className="h-4 w-4" aria-hidden />
                  </span>
                  <p className="text-sm font-medium tracking-tight text-primary">{item.title}</p>
                </div>
              </StaggerItem>
            )
          })}
        </StaggerContainer>
      </Container>
    </section>
  )
}
