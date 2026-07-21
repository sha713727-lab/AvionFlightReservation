'use client'

import { useMemo, useState } from 'react'
import Button from '@/components/buttons/Button'
import { ADMIN_COPY } from '@/modules/admin/constants'
import AdminPlaceDeleteModal from '@/modules/admin/components/AdminPlaceDeleteModal'
import AdminPlaceFormModal from '@/modules/admin/components/AdminPlaceFormModal'
import AdminPlaceRow from '@/modules/admin/components/AdminPlaceRow'
import { useAdminPlaces } from '@/modules/admin/hooks/useAdminPlaces'
import { cn } from '@/utils/cn'

const selectClassName = cn(
  'w-full max-w-xs rounded-xl border border-border bg-section px-4 py-3 text-sm text-text',
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
)

export default function AdminPlacesHome({ token }) {
  const {
    items,
    tiers,
    tierFilter,
    setTierFilter,
    isLoading,
    error,
    actionError,
    successMessage,
    pendingId,
    loadingLabel,
    savePlace,
    removePlace,
    movePlace,
    clearFeedback,
  } = useAdminPlaces(token)

  const [editorOpen, setEditorOpen] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [deletingItem, setDeletingItem] = useState(null)

  const siblingBounds = useMemo(() => {
    const map = new Map()
    const byTier = new Map()
    items.forEach((place) => {
      const list = byTier.get(place.tierId) || []
      list.push(place)
      byTier.set(place.tierId, list)
    })
    byTier.forEach((list) => {
      list.forEach((place, index) => {
        map.set(place.id, { isFirst: index === 0, isLast: index === list.length - 1 })
      })
    })
    return map
  }, [items])

  const openCreate = () => {
    clearFeedback()
    setEditingItem(null)
    setEditorOpen(true)
  }

  const openEdit = (place) => {
    clearFeedback()
    setEditingItem(place)
    setEditorOpen(true)
  }

  const handleSave = async (payload, mediaOptions) => {
    await savePlace(payload, editingItem?.id, mediaOptions)
  }

  const handleDelete = async () => {
    if (!deletingItem) return
    await removePlace(deletingItem.id)
    setDeletingItem(null)
  }

  if (isLoading) {
    return (
      <p className="text-sm text-text-secondary" role="status">
        {loadingLabel}
      </p>
    )
  }

  if (error) {
    return (
      <p className="rounded-xl border border-error/20 bg-error/5 px-4 py-3 text-sm text-error" role="alert">
        {error || ADMIN_COPY.placesLoadError}
      </p>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-heading text-lg font-semibold tracking-tight text-primary">
            {ADMIN_COPY.placesTitle}
          </h2>
          <p className="mt-1 text-sm text-text-secondary">{ADMIN_COPY.placesDescription}</p>
        </div>
        <Button
          type="button"
          variant="primary"
          size="md"
          className="rounded-xl self-start"
          disabled={tiers.length === 0}
          onClick={openCreate}
        >
          {ADMIN_COPY.placesAddCta}
        </Button>
      </div>

      <div>
        <label htmlFor="places-tier-filter" className="mb-2 block text-sm font-medium text-primary">
          {ADMIN_COPY.placesFilterLabel}
        </label>
        <select
          id="places-tier-filter"
          value={tierFilter}
          className={selectClassName}
          onChange={(event) => setTierFilter(event.target.value)}
        >
          <option value="">{ADMIN_COPY.placesFilterAll}</option>
          {tiers.map((tier) => (
            <option key={tier.id} value={tier.id}>
              {tier.title}
            </option>
          ))}
        </select>
      </div>

      {tiers.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-border bg-section px-4 py-10 text-center text-sm text-text-secondary">
          {ADMIN_COPY.placesNeedTier}
        </p>
      ) : null}

      {actionError ? (
        <p className="rounded-xl border border-error/20 bg-error/5 px-4 py-3 text-sm text-error" role="alert">
          {actionError}
        </p>
      ) : null}

      {successMessage ? (
        <p
          className="rounded-xl border border-success/20 bg-success/5 px-4 py-3 text-sm text-success"
          role="status"
        >
          {successMessage}
        </p>
      ) : null}

      {tiers.length > 0 && items.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-border bg-section px-4 py-10 text-center text-sm text-text-secondary">
          {ADMIN_COPY.placesEmpty}
        </p>
      ) : null}

      {items.length > 0 ? (
        <ul className="space-y-3">
          {items.map((place) => {
            const bounds = siblingBounds.get(place.id) || { isFirst: true, isLast: true }
            return (
              <AdminPlaceRow
                key={place.id}
                place={place}
                isFirst={bounds.isFirst}
                isLast={bounds.isLast}
                isPending={pendingId === place.id}
                onEdit={() => openEdit(place)}
                onDelete={() => setDeletingItem(place)}
                onMoveUp={() => movePlace(place.id, 'up')}
                onMoveDown={() => movePlace(place.id, 'down')}
              />
            )
          })}
        </ul>
      ) : null}

      <AdminPlaceFormModal
        isOpen={editorOpen}
        place={editingItem}
        tiers={tiers}
        defaultTierId={tierFilter}
        onClose={() => setEditorOpen(false)}
        onSubmit={handleSave}
      />

      <AdminPlaceDeleteModal
        isOpen={Boolean(deletingItem)}
        place={deletingItem}
        isDeleting={pendingId === deletingItem?.id}
        onClose={() => setDeletingItem(null)}
        onConfirm={handleDelete}
      />
    </div>
  )
}
