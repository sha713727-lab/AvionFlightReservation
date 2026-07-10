import { PrismaClient } from '@prisma/client'
import { DESTINATION_SEED } from './data/destinations.js'
import { FAQ_SEED } from './data/faqs.js'
import { SERVICE_SEED } from './data/services.js'

const prisma = new PrismaClient()

async function seed(): Promise<void> {
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
          })),
        },
      },
    })
  }

  for (const faq of FAQ_SEED) {
    await prisma.faq.create({ data: { ...faq, isActive: true } })
  }
}

seed()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (error: unknown) => {
    await prisma.$disconnect()
    throw error
  })
