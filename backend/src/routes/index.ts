import type { FastifyInstance } from 'fastify'
import { API_PREFIX } from '../constants/http.js'
import type { AppContext } from '../types/context.js'
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
  const healthController = new HealthController(
    new HealthService(new HealthRepository(context.db)),
  )
  const serviceController = new ServiceController(
    new ServiceService(new ServiceRepository(context.db)),
  )
  const destinationController = new DestinationController(
    new DestinationService(new DestinationRepository(context.db)),
  )
  const faqController = new FaqController(
    new FaqService(new FaqRepository(context.db)),
  )

  await app.register(
    async (api) => {
      await registerHealthRoutes(api, healthController)
      await registerServiceRoutes(api, serviceController, context.env.MAX_PAGE_SIZE)
      await registerDestinationRoutes(
        api,
        destinationController,
        context.env.MAX_PAGE_SIZE,
      )
      await registerFaqRoutes(api, faqController, context.env.MAX_PAGE_SIZE)
    },
    { prefix: API_PREFIX },
  )
}
