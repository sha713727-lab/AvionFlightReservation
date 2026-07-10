import Container from '@/components/ui/Container'
import LayeredSectionHeading from '@/components/ui/LayeredSectionHeading'
import Timeline from '@/components/ui/Timeline'
import { COPY } from '@/constants/copy'
import { STEPS } from '@/data/services'

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24 lg:py-32 bg-section border-t border-border" aria-labelledby="how-heading">
      <Container>
        <LayeredSectionHeading
          titleId="how-heading"
          watermark={COPY.process.watermark}
          title={COPY.process.title}
          description={COPY.process.description}
        />
        <Timeline steps={STEPS} />
      </Container>
    </section>
  )
}
