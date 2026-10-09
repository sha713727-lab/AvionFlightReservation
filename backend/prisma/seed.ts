import { PrismaClient } from '@prisma/client'
import { Redis } from 'ioredis'
import { DESTINATION_SEED } from './data/destinations.js'
import { FAQ_SEED } from './data/faqs.js'
import { SERVICE_SEED } from './data/services.js'
import { WYNDHAM_PAGE_SEED } from './data/wyndham-page.js'

const prisma = new PrismaClient()
const CATALOG_CACHE_PREFIX = 'avion-catalog:'

async function flushCatalogCache(): Promise<void> {
  const redisUrl = process.env.REDIS_URL
  if (!redisUrl) {
    return
  }

  const redis = new Redis(redisUrl, {
    maxRetriesPerRequest: 1,
    enableReadyCheck: true,
  })

  try {
    const keys = await redis.keys(`${CATALOG_CACHE_PREFIX}*`)
    if (keys.length > 0) {
      await redis.del(...keys)
    }
  } finally {
    redis.disconnect()
  }
}

async function seed(): Promise<void> {
  if (process.env.NODE_ENV === 'production' && process.env.ALLOW_DESTRUCTIVE_SEED !== 'true') {
    throw new Error(
      'Refusing destructive seed in production. Set ALLOW_DESTRUCTIVE_SEED=true to override.',
    )
  }

  await prisma.destinationPlace.deleteMany()
  await prisma.destinationTier.deleteMany()
  await prisma.service.deleteMany()
  await prisma.faq.deleteMany()

  for (const service of SERVICE_SEED) {
    await prisma.service.create({ data: { ...service, isActive: true } })
  }

  for (const tier of DESTINATION_SEED) {
    await prisma.destinationTier.create({
      data: {
        slug: tier.slug,
        title: tier.title,
        points: tier.points,
        sortOrder: tier.sortOrder,
        isActive: true,
        places: {
          create: tier.places.map((place, index) => ({
            name: place.name,
            alt: place.alt,
            imageUrl: place.imageUrl,
            sortOrder: index + 1,
            isActive: true,
          })),
        },
      },
    })
  }

  for (const faq of FAQ_SEED) {
    await prisma.faq.create({ data: { ...faq, isActive: true } })
  }

  await prisma.wyndhamFaq.deleteMany()
  await prisma.wyndhamClientLogo.deleteMany()
  await prisma.wyndhamPropertyHighlight.deleteMany()
  await prisma.wyndhamRailCard.deleteMany()
  await prisma.wyndhamPrinciple.deleteMany()
  await prisma.wyndhamMediaSlot.deleteMany()
  await prisma.wyndhamPage.deleteMany()

  const {
    mediaSlots,
    principles,
    railCards,
    properties,
    faqs,
    ...pageFields
  } = WYNDHAM_PAGE_SEED

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
      faqs: { create: faqs },
    },
  })

  await flushCatalogCache()
}

seed()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (error: unknown) => {
    await prisma.$disconnect()
    throw error
  })
