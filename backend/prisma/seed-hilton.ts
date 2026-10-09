/**
 * Non-destructive ensure for the Hilton hotels CMS page.
 * Creates the page when missing. If it exists, inserts seed FAQs only when
 * none are present and replaces meta only when it is outside the CMS ranges.
 */
import { PrismaClient } from '@prisma/client'
import { HILTON_PAGE_SEED } from './data/hilton-page.js'

const prisma = new PrismaClient()
const META_TITLE_MIN = 30
const META_TITLE_MAX = 65
const META_DESC_MIN = 120
const META_DESC_MAX = 165

function isMetaOutOfRange(title: string, description: string): boolean {
  const titleLen = title.trim().length
  const descLen = description.trim().length
  return (
    titleLen < META_TITLE_MIN ||
    titleLen > META_TITLE_MAX ||
    descLen < META_DESC_MIN ||
    descLen > META_DESC_MAX
  )
}

async function seedHilton(): Promise<void> {
  const { mediaSlots, principles, railCards, properties, faqs, ...pageFields } = HILTON_PAGE_SEED
  const existing = await prisma.hiltonPage.findUnique({
    where: { id: 'default' },
    include: { faqs: true },
  })

  if (!existing) {
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
        faqs: { create: faqs },
      },
    })
    return
  }

  if (existing.faqs.length === 0) {
    await prisma.hiltonFaq.createMany({
      data: faqs.map((item) => ({ ...item, pageId: 'default' })),
    })
  }

  if (isMetaOutOfRange(existing.metaTitle, existing.metaDescription)) {
    await prisma.hiltonPage.update({
      where: { id: 'default' },
      data: {
        metaTitle: pageFields.metaTitle,
        metaDescription: pageFields.metaDescription,
        ogTitle: pageFields.ogTitle,
        ogDescription: pageFields.ogDescription,
      },
    })
  }
}

seedHilton()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (error: unknown) => {
    await prisma.$disconnect()
    throw error
  })
