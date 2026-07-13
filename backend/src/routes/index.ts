import type { FastifyInstance } from 'fastify'
import { API_PREFIX } from '../constants/http.js'
import type { AppContext } from '../types/context.js'
import type { CatalogRouteOptions } from '../types/routes.js'
import { HealthController } from '../modules/health/controller.js'
import { HealthRepository } from '../modules/health/repository.js'
import { HealthService } from '../modules/health/service.js'
import { registerHealthRoutes } from '../modules/health/routes.js'
import { ServiceController } from '../modules/services/controller.js'
import { ServiceRepository } from '../modules/services/repository.js'
import { ServiceService } from '../modules/services/service.js'
import { registerServiceRoutes } from '../modules/services/routes.js'
import { DestinationController } from '../modules/destinations/controller.js'
import { DestinationRepository } from '../modules/destinations/repository.js'
import { DestinationService } from '../modules/destinations/service.js'
import { registerDestinationRoutes } from '../modules/destinations/routes.js'
import { FaqController } from '../modules/faqs/controller.js'
import { FaqRepository } from '../modules/faqs/repository.js'
import { FaqService } from '../modules/faqs/service.js'
import { registerFaqRoutes } from '../modules/faqs/routes.js'

export async function registerRoutes(
  app: FastifyInstance,
  context: AppContext,
): Promise<void> {
  const catalogOptions: CatalogRouteOptions = {
    maxPageSize: context.env.MAX_PAGE_SIZE,
    defaultPageSize: context.env.DEFAULT_PAGE_SIZE,
    heavyRateLimit: {
      max: context.env.HEAVY_RATE_LIMIT_MAX,
      timeWindow: context.env.HEAVY_RATE_LIMIT_WINDOW_MS,
    },
  }

  const rateLimitStore = context.redis ? 'redis' : 'memory'
  const { catalogCache } = context

  const healthController = new HealthController(
    new HealthService(
      new HealthRepository(context.db, context.logger),
      catalogCache,
      rateLimitStore,
    ),
  )
  const serviceController = new ServiceController(
    new ServiceService(new ServiceRepository(context.db), catalogCache),
  )
  const destinationController = new DestinationController(
    new DestinationService(new DestinationRepository(context.db), catalogCache),
  )
  const faqController = new FaqController(
    new FaqService(new FaqRepository(context.db), catalogCache),
  )

  await app.register(
    async (api) => {
      await registerHealthRoutes(api, healthController)
      await registerServiceRoutes(api, serviceController, catalogOptions)
      await registerDestinationRoutes(api, destinationController, catalogOptions)
      await registerFaqRoutes(api, faqController, catalogOptions)
    },
    { prefix: API_PREFIX },
  )
}
