'use client'

import {
  HiOutlineAnnotation,
  HiOutlineCollection,
  HiOutlineLocationMarker,
  HiOutlinePhone,
  HiOutlineServer,
} from 'react-icons/hi'
import { ADMIN_COPY } from '@/modules/admin/constants'
import AdminBarChart from '@/modules/admin/components/AdminBarChart'
import AdminCatalogList from '@/modules/admin/components/AdminCatalogList'
import AdminCoverageChart from '@/modules/admin/components/AdminCoverageChart'
import AdminRecentCallbacks from '@/modules/admin/components/AdminRecentCallbacks'
import CatalogMixDonut from '@/modules/admin/components/CatalogMixDonut'
import AdminStatCard from '@/modules/admin/components/AdminStatCard'
import { useAdminDashboard } from '@/modules/admin/hooks/useAdminDashboard'
import { cn } from '@/utils/cn'

export default function AdminDashboardHome({ token }) {
  const { summary, isLoading, error, loadingLabel } = useAdminDashboard(token)

  if (isLoading) {
    return (
      <p className="text-sm text-text-secondary" role="status">
        {loadingLabel}
      </p>
    )
  }

  if (error || !summary) {
    return (
      <p className="rounded-xl border border-error/20 bg-error/5 px-4 py-3 text-sm text-error" role="alert">
        {error || ADMIN_COPY.loadError}
      </p>
    )
  }

  const { counts, system, recentServices, recentFaqs, recentCallbacks } = summary
  const databaseUp = system.database === 'up'

  return (
    <div className="space-y-6 lg:space-y-8">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <AdminStatCard
          label={ADMIN_COPY.statsServices}
          value={counts.servicesActive}
          hint={`${counts.servicesTotal} ${ADMIN_COPY.statsServicesTotal}`}
          icon={HiOutlineCollection}
          tone="accent"
        />
        <AdminStatCard
          label={ADMIN_COPY.statsDestinations}
          value={counts.destinationTiersActive}
          icon={HiOutlineLocationMarker}
          tone="primary"
        />
        <AdminStatCard
          label={ADMIN_COPY.statsPlaces}
          value={counts.destinationPlacesActive}
          icon={HiOutlineServer}
          tone="secondary"
        />
        <AdminStatCard
          label={ADMIN_COPY.statsFaqs}
          value={counts.faqsActive}
          icon={HiOutlineAnnotation}
          tone="success"
        />
        <AdminStatCard
          label={ADMIN_COPY.statsCallbacksNew}
          value={counts.callbacksNew}
          hint={`${counts.callbacksTotal} ${ADMIN_COPY.statsCallbacksTotal}`}
          icon={HiOutlinePhone}
          tone="accent"
        />
      </div>

      <AdminRecentCallbacks items={recentCallbacks} />

      <div className="grid gap-6 xl:grid-cols-2">
        <AdminCoverageChart counts={counts} />
        <CatalogMixDonut counts={counts} />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <AdminBarChart counts={counts} />
        <section className="rounded-2xl border border-border bg-section p-5 shadow-sm shadow-primary/5">
          <h2 className="font-heading text-lg font-semibold tracking-tight text-primary">
            {ADMIN_COPY.systemTitle}
          </h2>
          <div className="mt-6 rounded-2xl bg-section-alt px-4 py-5">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-text-muted">
              {ADMIN_COPY.databaseLabel}
            </p>
            <p
              className={cn(
                'mt-3 inline-flex rounded-lg px-3 py-1.5 text-sm font-semibold',
                databaseUp ? 'bg-success/15 text-success' : 'bg-error/15 text-error',
              )}
            >
              {databaseUp ? ADMIN_COPY.databaseUp : ADMIN_COPY.databaseDown}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-text-secondary">
              {ADMIN_COPY.dashboardDescription}
            </p>
          </div>
        </section>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <AdminCatalogList
          title={ADMIN_COPY.recentServicesTitle}
          items={recentServices}
          emptyLabel={ADMIN_COPY.emptyServices}
        />
        <AdminCatalogList
          title={ADMIN_COPY.recentFaqsTitle}
          items={recentFaqs}
          emptyLabel={ADMIN_COPY.emptyFaqs}
        />
      </div>
    </div>
  )
}
