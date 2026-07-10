'use client'

import Container from '@/components/ui/Container'
import { StaggerContainer, StaggerItem } from '@/components/animations/FadeIn'
import { TERMS_HIGHLIGHTS } from '@/modules/terms/constants'

export default function TermsHighlights() {
  return (
    <section className="bg-background py-8 lg:py-10" aria-label="Terms highlights">
      <Container>
        <StaggerContainer className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4">
          {TERMS_HIGHLIGHTS.map((item) => {
            const Icon = item.icon

            return (
              <StaggerItem key={item.id}>
                <div className="flex items-center gap-3 border-l-4 border-accent bg-section px-5 py-4">
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center bg-accent/10 text-accent">
                    <Icon className="h-4 w-4" aria-hidden />
                  </span>
                  <p className="text-sm font-semibold tracking-tight text-primary">{item.title}</p>
                </div>
              </StaggerItem>
            )
          })}
        </StaggerContainer>
      </Container>
    </section>
  )
}
