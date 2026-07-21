'use client'

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { ADMIN_COPY } from '@/modules/admin/constants'
import { ADMIN_CHART_COLORS } from '@/modules/admin/utils/chartData'

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-xl border border-border bg-section px-3 py-2 text-sm shadow-md">
      <p className="font-medium text-primary">{label}</p>
      <p className="mt-0.5 text-text-secondary">
        {ADMIN_COPY.chartCoverageLabel}: {payload[0].value}
      </p>
    </div>
  )
}

function buildCoverageSeries(counts) {
  const services = counts.servicesActive
  const destinations = counts.destinationTiersActive
  const places = counts.destinationPlacesActive
  const faqs = counts.faqsActive

  return [
    { label: ADMIN_COPY.chartSeriesServices, value: services },
    { label: ADMIN_COPY.chartSeriesDestinations, value: destinations },
    { label: ADMIN_COPY.chartSeriesPlaces, value: places },
    {
      label: ADMIN_COPY.chartSeriesCombined,
      value: services + destinations + places + faqs,
    },
  ]
}

export default function AdminCoverageChart({ counts }) {
  const data = buildCoverageSeries(counts)

  return (
    <section className="rounded-2xl border border-border bg-section p-5 shadow-sm shadow-primary/5">
      <h2 className="font-heading text-lg font-semibold tracking-tight text-primary">
        {ADMIN_COPY.coverageTitle}
      </h2>
      <p className="mt-1 text-sm text-text-secondary">{ADMIN_COPY.coverageDescription}</p>

      <div className="mt-6 h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
            <defs>
              <linearGradient id="adminCoverageFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={ADMIN_CHART_COLORS.accent} stopOpacity={0.35} />
                <stop offset="100%" stopColor={ADMIN_CHART_COLORS.accent} stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke={ADMIN_CHART_COLORS.grid} vertical={false} strokeDasharray="4 4" />
            <XAxis
              dataKey="label"
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
            <Tooltip content={<ChartTooltip />} />
            <Area
              type="monotone"
              dataKey="value"
              stroke={ADMIN_CHART_COLORS.accent}
              strokeWidth={2.5}
              fill="url(#adminCoverageFill)"
              activeDot={{ r: 5, fill: ADMIN_CHART_COLORS.accent }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}
