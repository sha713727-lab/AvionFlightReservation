/**
 * Non-destructive upsert for the Wyndham hotels CMS page.
 * Safe to run without wiping services/faqs/destinations.
 */
import { PrismaClient } from '@prisma/client'
import { WYNDHAM_PAGE_SEED } from './data/wyndham-page.js'

const prisma = new PrismaClient()

async function seedWyndham(): Promise<void> {
  const existing = await prisma.wyndhamPage.findUnique({ where: { id: 'default' } })
  if (existing) {
    return
  }

  const { mediaSlots, principles, railCards, properties, ...pageFields } = WYNDHAM_PAGE_SEED

  await prisma.wyndhamPage.create({
    data: {
      id: 'default',
      ...pageFields,
      mediaSlots: { create: mediaSlots },
      principles: {
        create: principles.map((item) => ({ ...item, isEnabled: true })),
      },
      railCards: {
        create: railCards.map((item) => ({ ...item, isEnabled: true })),
      },
      properties: {
        create: properties.map((item) => ({ ...item, isEnabled: true })),
      },
    },
  })
}

seedWyndham()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (error: unknown) => {
    await prisma.$disconnect()
    throw error
  })
