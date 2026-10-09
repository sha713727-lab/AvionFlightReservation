'use client'

import { useState } from 'react'

function ItemRow({ title, onMoveUp, onMoveDown, onDelete, children }) {
  return (
    <div className="space-y-3 rounded-xl border border-border p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm font-semibold text-primary">{title}</p>
        <div className="flex gap-2">
          <button type="button" className="rounded-lg border px-2 py-1 text-xs" onClick={onMoveUp}>
            Up
          </button>
          <button type="button" className="rounded-lg border px-2 py-1 text-xs" onClick={onMoveDown}>
            Down
          </button>
          <button
            type="button"
            className="rounded-lg border border-red-200 px-2 py-1 text-xs text-red-700"
            onClick={onDelete}
          >
            Delete
          </button>
        </div>
      </div>
      {children}
    </div>
  )
}

export default function AdminWyndhamListsPanel({
  page,
  createPrinciple,
  updatePrinciple,
  deletePrinciple,
  movePrinciple,
  createRailCard,
  updateRailCard,
  deleteRailCard,
  moveRailCard,
  uploadRailMedia,
  createProperty,
  updateProperty,
  deleteProperty,
  moveProperty,
  uploadPropertyMedia,
}) {
  const [principleDraft, setPrincipleDraft] = useState({
    numberLabel: '07',
    title: '',
    description: '',
    isEnabled: true,
  })
  const [propertyDraft, setPropertyDraft] = useState({
    title: '',
    blurb: '',
    isEnabled: true,
  })

  return (
    <div className="space-y-8">
      <section className="space-y-4 rounded-2xl border border-border bg-white p-5">
        <h2 className="text-lg font-semibold text-primary">Principles</h2>
        {page.principles.map((item) => (
          <ItemRow
            key={item.id}
            title={`${item.numberLabel}. ${item.title}`}
            onMoveUp={() => void movePrinciple(item.id, 'up')}
            onMoveDown={() => void movePrinciple(item.id, 'down')}
            onDelete={() => void deletePrinciple(item.id)}
          >
            <input
              className="mb-2 w-full rounded-lg border px-3 py-2 text-sm"
              value={item.title}
              onChange={(event) =>
                void updatePrinciple(item.id, {
                  numberLabel: item.numberLabel,
                  title: event.target.value,
                  description: item.description,
                  isEnabled: item.isEnabled,
                })
              }
            />
            <textarea
              className="w-full rounded-lg border px-3 py-2 text-sm"
              rows={3}
              value={item.description}
              onChange={(event) =>
                void updatePrinciple(item.id, {
                  numberLabel: item.numberLabel,
                  title: item.title,
                  description: event.target.value,
                  isEnabled: item.isEnabled,
                })
              }
            />
          </ItemRow>
        ))}
        <div className="space-y-2 rounded-xl bg-section p-4">
          <p className="text-sm font-medium">Add principle</p>
          <input
            className="w-full rounded-lg border px-3 py-2 text-sm"
            placeholder="Title"
            value={principleDraft.title}
            onChange={(event) =>
              setPrincipleDraft((current) => ({ ...current, title: event.target.value }))
            }
          />
          <textarea
            className="w-full rounded-lg border px-3 py-2 text-sm"
            placeholder="Description"
            rows={2}
            value={principleDraft.description}
            onChange={(event) =>
              setPrincipleDraft((current) => ({ ...current, description: event.target.value }))
            }
          />
          <button
            type="button"
            className="rounded-lg bg-accent px-3 py-2 text-xs font-semibold text-white"
            onClick={() => {
              void createPrinciple(principleDraft).then(() =>
                setPrincipleDraft({
                  numberLabel: String(page.principles.length + 2).padStart(2, '0'),
                  title: '',
                  description: '',
                  isEnabled: true,
                }),
              )
            }}
          >
            Add principle
          </button>
        </div>
      </section>

      <section className="space-y-4 rounded-2xl border border-border bg-white p-5">
        <h2 className="text-lg font-semibold text-primary">Property highlights</h2>
        {page.properties.map((item) => (
          <ItemRow
            key={item.id}
            title={item.title}
            onMoveUp={() => void moveProperty(item.id, 'up')}
            onMoveDown={() => void moveProperty(item.id, 'down')}
            onDelete={() => void deleteProperty(item.id)}
          >
            <input
              className="mb-2 w-full rounded-lg border px-3 py-2 text-sm"
              value={item.title}
              onChange={(event) =>
                void updateProperty(item.id, {
                  title: event.target.value,
                  blurb: item.blurb,
                  mediaAlt: item.mediaAlt,
                  isEnabled: item.isEnabled,
                })
              }
            />
            <textarea
              className="mb-2 w-full rounded-lg border px-3 py-2 text-sm"
              rows={3}
              value={item.blurb}
              onChange={(event) =>
                void updateProperty(item.id, {
                  title: item.title,
                  blurb: event.target.value,
                  mediaAlt: item.mediaAlt,
                  isEnabled: item.isEnabled,
                })
              }
            />
            <label className="inline-flex cursor-pointer rounded-lg border px-3 py-2 text-xs">
              Upload image
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="sr-only"
                onChange={(event) => {
                  const file = event.target.files?.[0]
                  event.target.value = ''
                  if (file) void uploadPropertyMedia(item.id, file)
                }}
              />
            </label>
          </ItemRow>
        ))}
        <div className="space-y-2 rounded-xl bg-section p-4">
          <p className="text-sm font-medium">Add property</p>
          <input
            className="w-full rounded-lg border px-3 py-2 text-sm"
            placeholder="Property title"
            value={propertyDraft.title}
            onChange={(event) =>
              setPropertyDraft((current) => ({ ...current, title: event.target.value }))
            }
          />
          <textarea
            className="w-full rounded-lg border px-3 py-2 text-sm"
            placeholder="Short blurb"
            rows={2}
            value={propertyDraft.blurb}
            onChange={(event) =>
              setPropertyDraft((current) => ({ ...current, blurb: event.target.value }))
            }
          />
          <button
            type="button"
            className="rounded-lg bg-accent px-3 py-2 text-xs font-semibold text-white"
            onClick={() => {
              void createProperty(propertyDraft).then(() =>
                setPropertyDraft({ title: '', blurb: '', isEnabled: true }),
              )
            }}
          >
            Add property
          </button>
        </div>
      </section>

      <section className="space-y-4 rounded-2xl border border-border bg-white p-5">
        <h2 className="text-lg font-semibold text-primary">Company rail cards</h2>
        {page.railCards.map((item) => (
          <ItemRow
            key={item.id}
            title={`${item.cardType}: ${item.title || 'Untitled'}`}
            onMoveUp={() => void moveRailCard(item.id, 'up')}
            onMoveDown={() => void moveRailCard(item.id, 'down')}
            onDelete={() => void deleteRailCard(item.id)}
          >
            <input
              className="mb-2 w-full rounded-lg border px-3 py-2 text-sm"
              value={item.title}
              onChange={(event) =>
                void updateRailCard(item.id, {
                  cardType: item.cardType,
                  title: event.target.value,
                  body: item.body,
                  linkLabel: item.linkLabel,
                  linkHref: item.linkHref,
                  factValue: item.factValue,
                  mediaAlt: item.mediaAlt,
                  isEnabled: item.isEnabled,
                })
              }
            />
            <textarea
              className="mb-2 w-full rounded-lg border px-3 py-2 text-sm"
              rows={2}
              value={item.body}
              onChange={(event) =>
                void updateRailCard(item.id, {
                  cardType: item.cardType,
                  title: item.title,
                  body: event.target.value,
                  linkLabel: item.linkLabel,
                  linkHref: item.linkHref,
                  factValue: item.factValue,
                  mediaAlt: item.mediaAlt,
                  isEnabled: item.isEnabled,
                })
              }
            />
            {item.cardType === 'photo' ? (
              <label className="inline-flex cursor-pointer rounded-lg border px-3 py-2 text-xs">
                Upload photo
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="sr-only"
                  onChange={(event) => {
                    const file = event.target.files?.[0]
                    event.target.value = ''
                    if (file) void uploadRailMedia(item.id, file)
                  }}
                />
              </label>
            ) : null}
          </ItemRow>
        ))}
        <button
          type="button"
          className="rounded-lg bg-accent px-3 py-2 text-xs font-semibold text-white"
          onClick={() =>
            void createRailCard({
              cardType: 'standard',
              title: 'New card',
              body: 'Describe this booking principle.',
              isEnabled: true,
            })
          }
        >
          Add rail card
        </button>
      </section>
    </div>
  )
}
