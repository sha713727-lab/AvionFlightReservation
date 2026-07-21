'use client'

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { ADMIN_COPY } from '@/modules/admin/constants'
import { buildCatalogMixData } from '@/modules/admin/utils/chartData'

function MixTooltip({ active, payload }) {
  if (!active || !payload?.length) return null
  const item = payload[0]
  return (
    <div className="rounded-xl border border-border bg-section px-3 py-2 text-sm shadow-md">
      <p className="font-medium text-primary">{item.name}</p>
      <p className="mt-0.5 text-text-secondary">{item.value}</p>
    </div>
  )
}

export default function CatalogMixDonut({ counts }) {
  const data = buildCatalogMixData(counts, {
    services: ADMIN_COPY.statsServices,
    destinations: ADMIN_COPY.statsDestinations,
    places: ADMIN_COPY.statsPlaces,
    faqs: ADMIN_COPY.statsFaqs,
  })
  const total = data.reduce((sum, item) => sum + item.value, 0)

  return (
    <section className="rounded-2xl border border-border bg-section p-5 shadow-sm shadow-primary/5">
      <div className="mb-4">
        <h2 className="font-heading text-lg font-semibold tracking-tight text-primary">
          {ADMIN_COPY.catalogMixTitle}
        </h2>
        <p className="mt-1 text-sm text-text-secondary">{ADMIN_COPY.catalogMixDescription}</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr] lg:items-center">
        <div className="relative mx-auto h-64 w-full max-w-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                innerRadius="62%"
                outerRadius="88%"
                paddingAngle={3}
                stroke="none"
              >
                {data.map((entry) => (
                  <Cell key={entry.name} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip content={<MixTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-text-muted">
              {ADMIN_COPY.chartTotalLabel}
            </p>
            <p className="mt-1 font-heading text-3xl font-semibold text-primary">{total}</p>
          </div>
        </div>

        <ul className="space-y-3">
          {data.length === 0 ? (
            <li className="text-sm text-text-secondary">{ADMIN_COPY.chartEmpty}</li>
          ) : (
            data.map((item) => {
              const percent = total > 0 ? Math.round((item.value / total) * 100) : 0
              return (
                <li key={item.name} className="flex items-center justify-between gap-3 text-sm">
                  <span className="inline-flex min-w-0 items-center gap-2.5">
                    <span
                      className="h-2.5 w-2.5 shrink-0 rounded-full"
                      style={{ backgroundColor: item.fill }}
                      aria-hidden
                    />
                    <span className="truncate font-medium text-primary">{item.name}</span>
                  </span>
                  <span className="shrink-0 text-text-secondary">
                    {item.value}
                    <span className="ml-2 text-text-muted">{percent}%</span>
                  </span>
                </li>
              )
            })
          )}
        </ul>
      </div>
    </section>
  )
}
