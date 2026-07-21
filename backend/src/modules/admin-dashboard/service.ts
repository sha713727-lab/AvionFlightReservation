import type { AdminDashboardRepository } from './repository.js'
import type { AdminDashboardSummary } from './types.js'

export class AdminDashboardService {
  constructor(private readonly repository: AdminDashboardRepository) {}

  getSummary(): Promise<AdminDashboardSummary> {
    return this.repository.getSummary()
  }
}
