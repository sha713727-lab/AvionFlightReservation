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
import { AdminAuthController } from '../modules/admin-auth/controller.js'
import { AdminAuthService } from '../modules/admin-auth/service.js'
import { registerAdminAuthRoutes } from '../modules/admin-auth/routes.js'
import { AdminDashboardController } from '../modules/admin-dashboard/controller.js'
import { AdminDashboardRepository } from '../modules/admin-dashboard/repository.js'
import { AdminDashboardService } from '../modules/admin-dashboard/service.js'
import { registerAdminDashboardRoutes } from '../modules/admin-dashboard/routes.js'
import { AdminServicesController } from '../modules/admin-services/controller.js'
import { AdminServiceRepository } from '../modules/admin-services/repository.js'
import { AdminServicesService } from '../modules/admin-services/service.js'
import { registerAdminServicesRoutes } from '../modules/admin-services/routes.js'
import { AdminDestinationsController } from '../modules/admin-destinations/controller.js'
import { AdminDestinationRepository } from '../modules/admin-destinations/repository.js'
import { AdminDestinationsService } from '../modules/admin-destinations/service.js'
import { registerAdminDestinationRoutes } from '../modules/admin-destinations/routes.js'
import { AdminPlacesController } from '../modules/admin-places/controller.js'
import { AdminPlaceRepository } from '../modules/admin-places/repository.js'
import { AdminPlacesService } from '../modules/admin-places/service.js'
import { registerAdminPlaceRoutes } from '../modules/admin-places/routes.js'
import { CallbackRequestController } from '../modules/callbacks/controller.js'
import { CallbackRequestRepository } from '../modules/callbacks/repository.js'
import { CallbackRequestService } from '../modules/callbacks/service.js'
import { registerCallbackRoutes } from '../modules/callbacks/routes.js'
import { AdminCallbacksController } from '../modules/admin-callbacks/controller.js'
import { AdminCallbackRepository } from '../modules/admin-callbacks/repository.js'
import { AdminCallbacksService } from '../modules/admin-callbacks/service.js'
import { registerAdminCallbackRoutes } from '../modules/admin-callbacks/routes.js'
import { AdminFaqsController } from '../modules/admin-faqs/controller.js'
import { AdminFaqRepository } from '../modules/admin-faqs/repository.js'
import { AdminFaqsService } from '../modules/admin-faqs/service.js'
import { registerAdminFaqRoutes } from '../modules/admin-faqs/routes.js'
import { SettingsController } from '../modules/settings/controller.js'
import { SettingsRepository } from '../modules/settings/repository.js'
import { SettingsService } from '../modules/settings/service.js'
import { registerSettingsRoutes } from '../modules/settings/routes.js'

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
  const adminAuthService = new AdminAuthService(context.env, context.logger, context.db)
  const adminAuthController = new AdminAuthController(adminAuthService)
  const adminDashboardController = new AdminDashboardController(
    new AdminDashboardService(new AdminDashboardRepository(context.db)),
  )
  const adminServicesController = new AdminServicesController(
    new AdminServicesService(new AdminServiceRepository(context.db), catalogCache),
  )
  const adminDestinationsController = new AdminDestinationsController(
    new AdminDestinationsService(new AdminDestinationRepository(context.db), catalogCache),
  )
  const adminPlacesController = new AdminPlacesController(
    new AdminPlacesService(new AdminPlaceRepository(context.db), catalogCache),
  )
  const callbackRequestController = new CallbackRequestController(
    new CallbackRequestService(new CallbackRequestRepository(context.db)),
  )
  const adminCallbacksController = new AdminCallbacksController(
    new AdminCallbacksService(new AdminCallbackRepository(context.db)),
  )
  const adminFaqsController = new AdminFaqsController(
    new AdminFaqsService(new AdminFaqRepository(context.db), catalogCache),
  )
  const settingsController = new SettingsController(
    new SettingsService(new SettingsRepository(context.db), catalogCache),
  )

  await app.register(
    async (api) => {
      await registerHealthRoutes(api, healthController)
      await registerServiceRoutes(api, serviceController, catalogOptions)
      await registerDestinationRoutes(api, destinationController, catalogOptions)
      await registerFaqRoutes(api, faqController, catalogOptions)
      await registerCallbackRoutes(api, callbackRequestController)
      await registerSettingsRoutes(api, settingsController, adminAuthService)
      await registerAdminAuthRoutes(api, adminAuthController, adminAuthService)
      await registerAdminDashboardRoutes(api, adminDashboardController, adminAuthService)
      await registerAdminServicesRoutes(api, adminServicesController, adminAuthService)
      await registerAdminDestinationRoutes(api, adminDestinationsController, adminAuthService)
      await registerAdminPlaceRoutes(api, adminPlacesController, adminAuthService)
      await registerAdminCallbackRoutes(api, adminCallbacksController, adminAuthService)
      await registerAdminFaqRoutes(api, adminFaqsController, adminAuthService)
    },
    { prefix: API_PREFIX },
  )
}
