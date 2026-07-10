'use client'

import Container from '@/components/ui/Container'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations/FadeIn'
import { CONTACT_HIGHLIGHTS } from '@/modules/contact/constants'

export default function ContactHighlights() {
  return (
    <section className="bg-section-alt py-10 lg:py-12" aria-label="Contact highlights">
      <Container>
        <StaggerContainer className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
          {CONTACT_HIGHLIGHTS.map((item) => {
            const Icon = item.icon

            return (
              <StaggerItem key={item.id}>
                <FadeIn>
                  <div className="flex items-center gap-3 rounded-full border border-border bg-card px-5 py-3.5 shadow-card">
                    <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                      <Icon className="h-4 w-4" aria-hidden />
                    </span>
                    <p className="text-sm font-medium tracking-tight text-primary">{item.title}</p>
                  </div>
                </FadeIn>
              </StaggerItem>
            )
          })}
        </StaggerContainer>
      </Container>
    </section>
  )
}
