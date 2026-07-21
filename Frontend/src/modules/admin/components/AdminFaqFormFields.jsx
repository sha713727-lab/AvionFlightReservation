'use client'

import { ADMIN_COPY } from '@/modules/admin/constants'
import { cn } from '@/utils/cn'

const inputClassName = cn(
  'w-full rounded-xl border border-border bg-section px-4 py-3 text-sm text-text',
  'placeholder:text-text-muted transition-colors',
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
  'disabled:cursor-not-allowed disabled:opacity-60',
)

function FieldError({ id, message }) {
  if (!message) return null
  return (
    <p id={id} className="mt-1.5 text-sm text-error" role="alert">
      {message}
    </p>
  )
}

export default function AdminFaqFormFields({ values, errors, disabled, setField, setSlug }) {
  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="faq-question" className="mb-2 block text-sm font-medium text-primary">
          {ADMIN_COPY.fieldQuestion}
        </label>
        <input
          id="faq-question"
          value={values.question}
          disabled={disabled}
          placeholder={ADMIN_COPY.fieldQuestionPlaceholder}
          className={inputClassName}
          aria-invalid={Boolean(errors.question)}
          aria-describedby={errors.question ? 'faq-question-error' : undefined}
          onChange={(event) => setField('question', event.target.value)}
        />
        <FieldError id="faq-question-error" message={errors.question} />
      </div>

      <div>
        <label htmlFor="faq-slug" className="mb-2 block text-sm font-medium text-primary">
          {ADMIN_COPY.fieldSlug}
        </label>
        <input
          id="faq-slug"
          value={values.slug}
          disabled={disabled}
          placeholder={ADMIN_COPY.fieldFaqSlugPlaceholder}
          className={inputClassName}
          aria-invalid={Boolean(errors.slug)}
          aria-describedby={errors.slug ? 'faq-slug-error' : undefined}
          onChange={(event) => setSlug(event.target.value)}
        />
        <FieldError id="faq-slug-error" message={errors.slug} />
      </div>

      <div>
        <label htmlFor="faq-answer" className="mb-2 block text-sm font-medium text-primary">
          {ADMIN_COPY.fieldAnswer}
        </label>
        <textarea
          id="faq-answer"
          rows={6}
          value={values.answer}
          disabled={disabled}
          placeholder={ADMIN_COPY.fieldAnswerPlaceholder}
          className={cn(inputClassName, 'resize-y')}
          aria-invalid={Boolean(errors.answer)}
          aria-describedby={errors.answer ? 'faq-answer-error' : undefined}
          onChange={(event) => setField('answer', event.target.value)}
        />
        <FieldError id="faq-answer-error" message={errors.answer} />
      </div>

      <label className="flex items-center gap-3 text-sm text-primary">
        <input
          type="checkbox"
          checked={values.isActive}
          disabled={disabled}
          className="h-4 w-4 rounded border-border text-accent focus-visible:outline-accent"
          onChange={(event) => setField('isActive', event.target.checked)}
        />
        {ADMIN_COPY.fieldActive}
      </label>
    </div>
  )
}
