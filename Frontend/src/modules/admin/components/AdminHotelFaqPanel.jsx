'use client'

import { useEffect, useState } from 'react'
import { HOTEL_FAQ_COPY } from '@/modules/admin/hotelFaqCopy'

const HOTEL_FAQ_LIMIT = 8

function FaqFields({ question, answer, isEnabled, errors, disabled, onChange }) {
  return (
    <div className="space-y-2">
      <label className="block text-xs font-medium text-text-secondary">
        {HOTEL_FAQ_COPY.questionLabel}
        <input
          className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
          value={question}
          disabled={disabled}
          onChange={(event) => onChange({ question: event.target.value, answer, isEnabled })}
        />
      </label>
      {errors.question ? <p className="text-xs text-red-600">{errors.question}</p> : null}
      <label className="block text-xs font-medium text-text-secondary">
        {HOTEL_FAQ_COPY.answerLabel}
        <textarea
          className="mt-1 min-h-24 w-full rounded-lg border px-3 py-2 text-sm"
          value={answer}
          disabled={disabled}
          onChange={(event) => onChange({ question, answer: event.target.value, isEnabled })}
        />
      </label>
      {errors.answer ? <p className="text-xs text-red-600">{errors.answer}</p> : null}
      <label className="flex items-center gap-2 text-xs text-text-secondary">
        <input
          type="checkbox"
          checked={isEnabled}
          disabled={disabled}
          onChange={(event) => onChange({ question, answer, isEnabled: event.target.checked })}
        />
        {HOTEL_FAQ_COPY.enabledLabel}
      </label>
    </div>
  )
}

function FaqItem({ item, editor }) {
  const [local, setLocal] = useState({
    question: item.question,
    answer: item.answer,
    isEnabled: item.isEnabled,
  })

  useEffect(() => {
    setLocal({
      question: item.question,
      answer: item.answer,
      isEnabled: item.isEnabled,
    })
  }, [item.question, item.answer, item.isEnabled])

  const disabled = Boolean(editor.savingId)
  const saving = editor.savingId === item.id

  return (
    <div className="space-y-3 rounded-xl border border-border p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm font-semibold text-primary">{item.question}</p>
        <div className="flex gap-2">
          <button
            type="button"
            className="rounded-lg border px-2 py-1 text-xs disabled:opacity-60"
            disabled={disabled}
            onClick={() => void editor.moveFaq(item.id, 'up')}
          >
            Up
          </button>
          <button
            type="button"
            className="rounded-lg border px-2 py-1 text-xs disabled:opacity-60"
            disabled={disabled}
            onClick={() => void editor.moveFaq(item.id, 'down')}
          >
            Down
          </button>
          <button
            type="button"
            className="rounded-lg border border-red-200 px-2 py-1 text-xs text-red-700 disabled:opacity-60"
            disabled={disabled}
            onClick={() => void editor.removeFaq(item.id)}
          >
            Delete
          </button>
        </div>
      </div>
      <FaqFields
        question={local.question}
        answer={local.answer}
        isEnabled={local.isEnabled}
        disabled={disabled}
        errors={{
          question: editor.fieldErrors[`${item.id}.question`],
          answer: editor.fieldErrors[`${item.id}.answer`],
        }}
        onChange={setLocal}
      />
      <button
        type="button"
        className="rounded-lg bg-accent px-3 py-1.5 text-xs font-semibold text-white disabled:opacity-60"
        disabled={disabled}
        onClick={() => void editor.saveFaq(item.id, local)}
      >
        {saving ? HOTEL_FAQ_COPY.savingItemCta : HOTEL_FAQ_COPY.saveItemCta}
      </button>
    </div>
  )
}

export default function AdminHotelFaqPanel({ faqs, editor }) {
  const atLimit = faqs.length >= HOTEL_FAQ_LIMIT

  return (
    <section className="space-y-4 rounded-2xl border border-border bg-white p-5">
      <div>
        <h2 className="text-lg font-semibold text-primary">{HOTEL_FAQ_COPY.heading}</h2>
        <p className="mt-1 text-sm text-text-secondary">{HOTEL_FAQ_COPY.description}</p>
      </div>
      {editor.error ? <p className="text-sm text-red-600">{editor.error}</p> : null}
      {editor.success ? <p className="text-sm text-emerald-700">{editor.success}</p> : null}
      {faqs.length === 0 ? (
        <p className="text-sm text-text-secondary">{HOTEL_FAQ_COPY.empty}</p>
      ) : null}
      {faqs.map((item) => (
        <FaqItem key={item.id} item={item} editor={editor} />
      ))}
      <div className="space-y-3 rounded-xl border border-dashed border-border p-4">
        <FaqFields
          question={editor.draft.question}
          answer={editor.draft.answer}
          isEnabled={editor.draft.isEnabled}
          disabled={editor.creating || atLimit}
          errors={{
            question: editor.fieldErrors.question,
            answer: editor.fieldErrors.answer,
          }}
          onChange={editor.setDraft}
        />
        {atLimit ? (
          <p className="text-sm text-text-secondary">{HOTEL_FAQ_COPY.limitReached}</p>
        ) : (
          <button
            type="button"
            className="rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-white disabled:opacity-60"
            disabled={editor.creating}
            onClick={() => void editor.createFaq()}
          >
            {editor.creating ? HOTEL_FAQ_COPY.addingCta : HOTEL_FAQ_COPY.addCta}
          </button>
        )}
      </div>
    </section>
  )
}
