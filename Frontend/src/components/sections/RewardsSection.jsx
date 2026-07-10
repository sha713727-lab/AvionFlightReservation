'use client'

import { FaGift, FaPhone } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { useState } from 'react'
import Container from '@/components/ui/Container'
import SectionHeading from '@/components/ui/SectionHeading'
import Button from '@/components/buttons/Button'
import Modal from '@/components/ui/Modal'
import { FadeIn } from '@/components/animations/FadeIn'
import { SPRING } from '@/components/animations/motionPresets'
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
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} transition={SPRING}>
                <Button variant="primary" size="lg" icon={FaGift} onClick={() => setModalOpen(true)}>
                  {COPY.rewards.cta}
                </Button>
              </motion.div>
            </FadeIn>

            <FadeIn direction="left">
              <motion.div
                whileHover={{ scale: 1.03, rotate: 1 }}
                transition={SPRING}
                className="group relative overflow-hidden rounded-2xl shadow-lg transition-shadow duration-500 hover:shadow-xl"
              >
                <motion.img
                  src={REWARDS_CABIN_IMAGE_SRC}
                  alt={COPY.rewards.imageAlt}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </motion.div>
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
