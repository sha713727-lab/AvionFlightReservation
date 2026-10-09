'use client'

import { useState } from 'react'

const SLOT_LABELS = {
  lead: 'Lead photograph',
  pairALeft: 'Photo pair A — left',
  pairARight: 'Photo pair A — right',
  pairBLeft: 'Photo pair B — left',
  pairBRight: 'Photo pair B — right',
}

export default function AdminHiltonMediaPanel({ mediaSlots, onUpload, onRemove }) {
  const [busyKey, setBusyKey] = useState('')

  const handleUpload = async (slotKey, file) => {
    if (!file) return
    setBusyKey(slotKey)
    try {
      await onUpload(slotKey, file)
    } finally {
      setBusyKey('')
    }
  }

  return (
    <section className="space-y-4 rounded-2xl border border-border bg-white p-5">
      <h2 className="text-lg font-semibold text-primary">Page photographs</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {mediaSlots.map((slot) => (
          <div key={slot.id} className="space-y-3 rounded-xl border border-border p-4">
            <p className="text-sm font-medium text-primary">
              {SLOT_LABELS[slot.slotKey] || slot.slotKey}
            </p>
            {slot.mediaUrl ? (
              <img
                src={slot.mediaUrl}
                alt={slot.alt || slot.slotKey}
                className="h-36 w-full rounded-lg object-cover"
              />
            ) : (
              <div className="flex h-36 items-center justify-center rounded-lg bg-section text-sm text-text-secondary">
                No image
              </div>
            )}
            <div className="flex flex-wrap gap-2">
              <label className="cursor-pointer rounded-lg border border-border px-3 py-2 text-xs font-medium">
                {busyKey === slot.slotKey ? 'Uploading…' : 'Upload'}
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="sr-only"
                  disabled={Boolean(busyKey)}
                  onChange={(event) => {
                    const file = event.target.files?.[0]
                    event.target.value = ''
                    void handleUpload(slot.slotKey, file)
                  }}
                />
              </label>
              {slot.mediaUrl ? (
                <button
                  type="button"
                  className="rounded-lg border border-border px-3 py-2 text-xs font-medium text-red-700"
                  disabled={Boolean(busyKey)}
                  onClick={() => void onRemove(slot.slotKey)}
                >
                  Remove
                </button>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
