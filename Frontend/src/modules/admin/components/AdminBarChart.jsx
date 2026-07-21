'use client'

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { ADMIN_COPY } from '@/modules/admin/constants'
import { ADMIN_CHART_COLORS, buildCatalogBarData } from '@/modules/admin/utils/chartData'

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-xl border border-border bg-section px-3 py-2 text-sm shadow-md">
      <p className="font-medium text-primary">{label}</p>
      <p className="mt-0.5 text-text-secondary">{payload[0].value}</p>
    </div>
  )
}

export default function AdminBarChart({ counts }) {
  const data = buildCatalogBarData(counts, {
    servicesShort: ADMIN_COPY.chartServicesShort,
    destinationsShort: ADMIN_COPY.chartDestinationsShort,
    placesShort: ADMIN_COPY.chartPlacesShort,
    faqsShort: ADMIN_COPY.chartFaqsShort,
  })

  return (
    <section className="rounded-2xl border border-border bg-section p-5 shadow-sm shadow-primary/5">
      <h2 className="font-heading text-lg font-semibold tracking-tight text-primary">
        {ADMIN_COPY.catalogBarsTitle}
      </h2>
      <p className="mt-1 text-sm text-text-secondary">{ADMIN_COPY.catalogBarsDescription}</p>

      <div className="mt-6 h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barSize={36} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
            <CartesianGrid stroke={ADMIN_CHART_COLORS.grid} vertical={false} strokeDasharray="4 4" />
            <XAxis
              dataKey="name"
              tick={{ fill: ADMIN_CHART_COLORS.text, fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              allowDecimals={false}
              tick={{ fill: ADMIN_CHART_COLORS.text, fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip cursor={{ fill: ADMIN_CHART_COLORS.track }} content={<ChartTooltip />} />
            <Bar dataKey="value" radius={[10, 10, 4, 4]}>
              {data.map((entry) => (
                <Cell key={entry.name} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}
