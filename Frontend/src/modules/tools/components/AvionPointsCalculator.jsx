'use client'

import Button from '@/components/buttons/Button'
import {
  CALCULATOR_FIELD_NAMES,
  CALCULATOR_HINTS,
  CALCULATOR_LABELS,
} from '@/modules/tools/constants'
import AvionPointsCalculatorResults from '@/modules/tools/components/AvionPointsCalculatorResults'
import { useAvionPointsCalculator } from '@/modules/tools/hooks/useAvionPointsCalculator'
import { cn } from '@/utils/cn'

const inputClassName = cn(
  'w-full min-h-12 rounded-xl border border-border bg-section px-4 py-3 text-base text-text',
  'placeholder:text-text-muted transition-colors',
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
)

function FieldError({ id, message }) {
  if (!message) return null
  return (
    <p id={id} className="mt-1.5 text-sm text-error" role="alert">
      {message}
    </p>
  )
}

export default function AvionPointsCalculator() {
  const { values, errors, submitted, resultNote, setField, handleSubmit, handleReset } =
    useAvionPointsCalculator()

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8">
      <form className="space-y-5" onSubmit={handleSubmit} noValidate>
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label htmlFor="calc-cash-alt" className="mb-2 block text-sm font-medium text-primary">
              {CALCULATOR_LABELS.cashAlternativeTotal}
            </label>
            <input
              id="calc-cash-alt"
              name={CALCULATOR_FIELD_NAMES.cashAlternativeTotal}
              type="number"
              min="0"
              step="0.01"
              inputMode="decimal"
              value={values.cashAlternativeTotal}
              aria-invalid={Boolean(errors.cashAlternativeTotal)}
              aria-describedby="calc-cash-alt-hint calc-cash-alt-error"
              className={inputClassName}
              onChange={(event) =>
                setField(CALCULATOR_FIELD_NAMES.cashAlternativeTotal, event.target.value)
              }
            />
            <p id="calc-cash-alt-hint" className="mt-1.5 text-xs text-text-muted">
              {CALCULATOR_HINTS.cashAlternativeTotal}
            </p>
            <FieldError id="calc-cash-alt-error" message={errors.cashAlternativeTotal} />
          </div>

          <div>
            <label
              htmlFor="calc-redemption-cash"
              className="mb-2 block text-sm font-medium text-primary"
            >
              {CALCULATOR_LABELS.redemptionCashTotal}
            </label>
            <input
              id="calc-redemption-cash"
              name={CALCULATOR_FIELD_NAMES.redemptionCashTotal}
              type="number"
              min="0"
              step="0.01"
              inputMode="decimal"
              value={values.redemptionCashTotal}
              aria-invalid={Boolean(errors.redemptionCashTotal)}
              aria-describedby="calc-redemption-cash-hint calc-redemption-cash-error"
              className={inputClassName}
              onChange={(event) =>
                setField(CALCULATOR_FIELD_NAMES.redemptionCashTotal, event.target.value)
              }
            />
            <p id="calc-redemption-cash-hint" className="mt-1.5 text-xs text-text-muted">
              {CALCULATOR_HINTS.redemptionCashTotal}
            </p>
            <FieldError id="calc-redemption-cash-error" message={errors.redemptionCashTotal} />
          </div>

          <div>
            <label htmlFor="calc-points" className="mb-2 block text-sm font-medium text-primary">
              {CALCULATOR_LABELS.pointsUsed}
            </label>
            <input
              id="calc-points"
              name={CALCULATOR_FIELD_NAMES.pointsUsed}
              type="number"
              min="1"
              step="1"
              inputMode="numeric"
              value={values.pointsUsed}
              aria-invalid={Boolean(errors.pointsUsed)}
              aria-describedby="calc-points-hint calc-points-error"
              className={inputClassName}
              onChange={(event) => setField(CALCULATOR_FIELD_NAMES.pointsUsed, event.target.value)}
            />
            <p id="calc-points-hint" className="mt-1.5 text-xs text-text-muted">
              {CALCULATOR_HINTS.pointsUsed}
            </p>
            <FieldError id="calc-points-error" message={errors.pointsUsed} />
          </div>

          <div className="md:col-span-2">
            <p className="text-xs text-text-muted">{CALCULATOR_HINTS.assistanceFees}</p>
          </div>

          <div>
            <label htmlFor="calc-cash-fee" className="mb-2 block text-sm font-medium text-primary">
              {CALCULATOR_LABELS.cashAssistanceFee}
            </label>
            <input
              id="calc-cash-fee"
              name={CALCULATOR_FIELD_NAMES.cashAssistanceFee}
              type="number"
              min="0"
              step="0.01"
              inputMode="decimal"
              value={values.cashAssistanceFee}
              aria-invalid={Boolean(errors.cashAssistanceFee)}
              aria-describedby="calc-cash-fee-error"
              className={inputClassName}
              onChange={(event) =>
                setField(CALCULATOR_FIELD_NAMES.cashAssistanceFee, event.target.value)
              }
            />
            <FieldError id="calc-cash-fee-error" message={errors.cashAssistanceFee} />
          </div>

          <div>
            <label
              htmlFor="calc-redemption-fee"
              className="mb-2 block text-sm font-medium text-primary"
            >
              {CALCULATOR_LABELS.redemptionAssistanceFee}
            </label>
            <input
              id="calc-redemption-fee"
              name={CALCULATOR_FIELD_NAMES.redemptionAssistanceFee}
              type="number"
              min="0"
              step="0.01"
              inputMode="decimal"
              value={values.redemptionAssistanceFee}
              aria-invalid={Boolean(errors.redemptionAssistanceFee)}
              aria-describedby="calc-redemption-fee-error"
              className={inputClassName}
              onChange={(event) =>
                setField(CALCULATOR_FIELD_NAMES.redemptionAssistanceFee, event.target.value)
              }
            />
            <FieldError id="calc-redemption-fee-error" message={errors.redemptionAssistanceFee} />
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button type="submit" variant="primary" size="lg">
            {CALCULATOR_LABELS.submit}
          </Button>
          <Button type="button" variant="secondary" size="lg" onClick={handleReset}>
            {CALCULATOR_LABELS.reset}
          </Button>
        </div>
      </form>

      <AvionPointsCalculatorResults submitted={submitted} resultNote={resultNote} />
    </div>
  )
}
