import {
  CALCULATOR_EXAMPLE,
  CALCULATOR_LABELS,
  CALCULATOR_MESSAGES,
} from '@/modules/tools/constants'

function formatCad(value) {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    maximumFractionDigits: 2,
  }).format(value)
}

function formatCpp(value) {
  return `${value.toFixed(2)}¢`
}

export default function AvionPointsCalculatorResults({ submitted, resultNote }) {
  return (
    <>
      <div className="mt-8 border-t border-border pt-6" aria-live="polite" aria-atomic="true">
        {submitted ? (
          <div className="space-y-4">
            <div>
              <h3 className="font-heading text-lg font-semibold text-primary">
                {CALCULATOR_LABELS.grossHeading}
              </h3>
              <dl className="mt-2 grid gap-2 text-sm text-text-secondary sm:grid-cols-2">
                <div>
                  <dt>{CALCULATOR_LABELS.grossCashAvoided}</dt>
                  <dd className="font-medium text-primary">{formatCad(submitted.grossCashAvoided)}</dd>
                </div>
                <div>
                  <dt>{CALCULATOR_LABELS.grossCpp}</dt>
                  <dd className="font-medium text-primary">{formatCpp(submitted.grossCentsPerPoint)}</dd>
                </div>
              </dl>
            </div>

            {submitted.netCashAvoided !== null ? (
              <div>
                <h3 className="font-heading text-lg font-semibold text-primary">
                  {CALCULATOR_LABELS.netHeading}
                </h3>
                <dl className="mt-2 grid gap-2 text-sm text-text-secondary sm:grid-cols-2">
                  <div>
                    <dt>{CALCULATOR_LABELS.assistanceIncrement}</dt>
                    <dd className="font-medium text-primary">
                      {formatCad(submitted.assistanceFeeIncrement)}
                    </dd>
                  </div>
                  <div>
                    <dt>{CALCULATOR_LABELS.netCashAvoided}</dt>
                    <dd className="font-medium text-primary">{formatCad(submitted.netCashAvoided)}</dd>
                  </div>
                  <div>
                    <dt>{CALCULATOR_LABELS.netCpp}</dt>
                    <dd className="font-medium text-primary">{formatCpp(submitted.netCentsPerPoint)}</dd>
                  </div>
                </dl>
              </div>
            ) : (
              <p className="text-sm text-text-secondary">{CALCULATOR_MESSAGES.netPending}</p>
            )}

            {resultNote ? (
              <p className="rounded-xl border border-border bg-section px-4 py-3 text-sm text-text-secondary">
                {resultNote}
              </p>
            ) : null}

            <p className="text-xs text-text-muted">{CALCULATOR_MESSAGES.notCashOut}</p>
          </div>
        ) : null}
      </div>

      <aside className="mt-8 rounded-xl bg-section px-4 py-3 text-sm text-text-secondary">
        <p className="font-medium text-primary">{CALCULATOR_EXAMPLE.title}</p>
        <p className="mt-1">{CALCULATOR_EXAMPLE.body}</p>
      </aside>
    </>
  )
}
