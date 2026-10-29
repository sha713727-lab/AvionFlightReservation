'use client'

import Link from 'next/link'
import { ADMIN_COPY } from '@/modules/admin/constants'
import { BLUE_REWARDS_PATH } from '@/constants/routes'
import useAdminBlueRewardsPage from '@/modules/admin/hooks/useAdminBlueRewardsPage'
import AdminBlueRewardsPageFields from '@/modules/admin/components/AdminBlueRewardsPageFields'
import AdminBlueRewardsMediaPanel from '@/modules/admin/components/AdminBlueRewardsMediaPanel'
import AdminBlueRewardsListsPanel from '@/modules/admin/components/AdminBlueRewardsListsPanel'
import AdminBlueRewardsFaqPanel from '@/modules/admin/components/AdminBlueRewardsFaqPanel'

export default function AdminBlueRewardsPageEditor({ token }) {
  const editor = useAdminBlueRewardsPage(token)

  if (editor.loading) {
    return <p className="text-sm text-text-secondary">{ADMIN_COPY.blueRewardsLoading}</p>
  }

  if (!editor.form || !editor.page) {
    return <p className="text-sm text-red-600">{editor.error || ADMIN_COPY.blueRewardsLoadError}</p>
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
          {editor.saving ? ADMIN_COPY.blueRewardsSavingCta : ADMIN_COPY.blueRewardsSaveCta}
        </button>
        <Link
          href={BLUE_REWARDS_PATH}
          target="_blank"
          rel="noreferrer"
          className="rounded-xl border border-border px-4 py-2.5 text-sm font-medium text-primary"
        >
          {ADMIN_COPY.blueRewardsPreviewCta}
        </Link>
      </div>

      {editor.error ? <p className="text-sm text-red-600">{editor.error}</p> : null}
      {editor.success ? <p className="text-sm text-emerald-700">{editor.success}</p> : null}

      <AdminBlueRewardsPageFields
        form={editor.form}
        fieldErrors={editor.fieldErrors}
        onChange={editor.updateField}
        disabled={editor.saving}
      />

      <AdminBlueRewardsMediaPanel
        mediaSlots={editor.page.mediaSlots}
        onUpload={editor.uploadSlot}
        onRemove={editor.removeSlot}
      />

      <AdminBlueRewardsFaqPanel
        token={token}
        faqs={editor.page.faqs}
        applyPage={editor.applyPage}
      />

      <AdminBlueRewardsListsPanel
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
