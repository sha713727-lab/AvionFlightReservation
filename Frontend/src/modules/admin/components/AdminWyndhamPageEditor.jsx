'use client'

import Link from 'next/link'
import { ADMIN_COPY } from '@/modules/admin/constants'
import { WYNDHAM_HOTELS_PATH } from '@/constants/routes'
import useAdminWyndhamPage from '@/modules/admin/hooks/useAdminWyndhamPage'
import AdminWyndhamPageFields from '@/modules/admin/components/AdminWyndhamPageFields'
import AdminWyndhamMediaPanel from '@/modules/admin/components/AdminWyndhamMediaPanel'
import AdminWyndhamListsPanel from '@/modules/admin/components/AdminWyndhamListsPanel'

export default function AdminWyndhamPageEditor({ token }) {
  const editor = useAdminWyndhamPage(token)

  if (editor.loading) {
    return <p className="text-sm text-text-secondary">{ADMIN_COPY.wyndhamLoading}</p>
  }

  if (!editor.form || !editor.page) {
    return <p className="text-sm text-red-600">{editor.error || ADMIN_COPY.wyndhamLoadError}</p>
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => void editor.savePage()}
          disabled={editor.saving}
          className="rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
        >
          {editor.saving ? ADMIN_COPY.wyndhamSavingCta : ADMIN_COPY.wyndhamSaveCta}
        </button>
        <Link
          href={WYNDHAM_HOTELS_PATH}
          target="_blank"
          rel="noreferrer"
          className="rounded-xl border border-border px-4 py-2.5 text-sm font-medium text-primary"
        >
          {ADMIN_COPY.wyndhamPreviewCta}
        </Link>
      </div>

      {editor.error ? <p className="text-sm text-red-600">{editor.error}</p> : null}
      {editor.success ? <p className="text-sm text-emerald-700">{editor.success}</p> : null}

      <AdminWyndhamPageFields
        form={editor.form}
        fieldErrors={editor.fieldErrors}
        onChange={editor.updateField}
        disabled={editor.saving}
      />

      <AdminWyndhamMediaPanel
        mediaSlots={editor.page.mediaSlots}
        onUpload={editor.uploadSlot}
        onRemove={editor.removeSlot}
      />

      <AdminWyndhamListsPanel
        page={editor.page}
        createPrinciple={editor.createPrinciple}
        updatePrinciple={editor.updatePrinciple}
        deletePrinciple={editor.deletePrinciple}
        movePrinciple={editor.movePrinciple}
        createRailCard={editor.createRailCard}
        updateRailCard={editor.updateRailCard}
        deleteRailCard={editor.deleteRailCard}
        moveRailCard={editor.moveRailCard}
        uploadRailMedia={editor.uploadRailMedia}
        createProperty={editor.createProperty}
        updateProperty={editor.updateProperty}
        deleteProperty={editor.deleteProperty}
        moveProperty={editor.moveProperty}
        uploadPropertyMedia={editor.uploadPropertyMedia}
      />
    </div>
  )
}
