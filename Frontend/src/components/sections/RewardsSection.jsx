'use client'

import { FaGift, FaPhone } from 'react-icons/fa'
import Image from 'next/image'
import { useState } from 'react'
import Container from '@/components/ui/Container'
import SectionHeading from '@/components/ui/SectionHeading'
import Button from '@/components/buttons/Button'
import Modal from '@/components/ui/Modal'
import { FadeIn } from '@/components/animations/FadeIn'
import { COPY } from '@/constants/copy'
import { REWARDS_CABIN_IMAGE_SRC } from '@/constants/images'
import { useCallExpertModal } from '@/modules/call/components/CallExpertProvider'

function RewardsSection() {
  const [modalOpen, setModalOpen] = useState(false)
  const callModal = useCallExpertModal()

  const openCallModal = () => {
    setModalOpen(false)
    callModal.open()
  }

  return (
    <>
      <section
        id="rewards"
        className="border-y border-border bg-section-alt py-24 lg:py-32"
        aria-labelledby="rewards-heading"
      >
        <Container>
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <FadeIn direction="right">
              <SectionHeading
                titleId="rewards-heading"
                eyebrow={COPY.rewards.eyebrow}
                title={COPY.rewards.title}
                description={COPY.rewards.description}
                align="left"
                className="mb-8 max-w-lg"
              />
              <div className="inline-block transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98]">
                <Button variant="primary" size="lg" icon={FaGift} onClick={() => setModalOpen(true)}>
                  {COPY.rewards.cta}
                </Button>
              </div>
            </FadeIn>

            <FadeIn direction="left">
              <div className="group relative overflow-hidden rounded-2xl shadow-lg transition-all duration-500 hover:scale-[1.02] hover:rotate-1 hover:shadow-xl">
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={REWARDS_CABIN_IMAGE_SRC}
                    alt={COPY.rewards.imageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={COPY.rewards.modalTitle}>
        <p className="mb-6 text-sm leading-relaxed text-text-secondary">{COPY.rewards.modalDescription}</p>
        <div className="flex flex-col gap-3">
          <Button variant="primary" size="lg" icon={FaPhone} className="w-full" onClick={openCallModal}>
            {COPY.cta.talkWithExpert}
          </Button>
        </div>
      </Modal>
    </>
  )
}

export default RewardsSection
