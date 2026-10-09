/**
 * Non-destructive upsert for the Hilton hotels CMS page.
 * Safe to run without wiping services/faqs/destinations.
 */
import { PrismaClient } from '@prisma/client'
import { HILTON_PAGE_SEED } from './data/hilton-page.js'

const prisma = new PrismaClient()

async function seedHilton(): Promise<void> {
  const existing = await prisma.hiltonPage.findUnique({ where: { id: 'default' } })
  if (existing) {
    return
  }

  const { mediaSlots, principles, railCards, properties, ...pageFields } = HILTON_PAGE_SEED

  await prisma.hiltonPage.create({
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

seedHilton()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (error: unknown) => {
    await prisma.$disconnect()
    throw error
  })
