'use client'

import Container from '@/components/ui/Container'
import { StaggerContainer, StaggerItem } from '@/components/animations/FadeIn'
import { REFUND_HIGHLIGHTS } from '@/modules/refund/constants'

export default function RefundHighlights() {
  return (
    <section className="bg-section py-8 lg:py-10" aria-label="Refund highlights">
      <Container>
        <StaggerContainer className="flex flex-wrap justify-center gap-3">
          {REFUND_HIGHLIGHTS.map((item) => {
            const Icon = item.icon

            return (
              <StaggerItem key={item.id}>
                <div className="inline-flex items-center gap-2.5 rounded-full bg-accent/10 px-4 py-2.5 text-accent">
                  <Icon className="h-4 w-4" aria-hidden />
                  <span className="text-sm font-medium text-primary">{item.title}</span>
                </div>
              </StaggerItem>
            )
          })}
        </StaggerContainer>
      </Container>
    </section>
  )
}
