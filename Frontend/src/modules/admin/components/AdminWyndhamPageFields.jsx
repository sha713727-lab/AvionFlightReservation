'use client'

function Field({ label, error, children }) {
  return (
    <label className="block space-y-1.5">
      <span className="text-sm font-medium text-primary">{label}</span>
      {children}
      {error ? <span className="block text-xs text-red-600">{error}</span> : null}
    </label>
  )
}

const inputClass =
  'w-full rounded-xl border border-border bg-white px-3 py-2.5 text-sm text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent'

export default function AdminWyndhamPageFields({ form, fieldErrors, onChange, disabled }) {
  return (
    <section className="space-y-4 rounded-2xl border border-border bg-white p-5">
      <h2 className="text-lg font-semibold text-primary">SEO, hero & story</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Status" error={fieldErrors.status}>
          <select
            className={inputClass}
            value={form.status}
            disabled={disabled}
            onChange={(event) => onChange('status', event.target.value)}
          >
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </Field>
        <Field label="Contact email override" error={fieldErrors.contactEmailOverride}>
          <input
            className={inputClass}
            value={form.contactEmailOverride}
            disabled={disabled}
            onChange={(event) => onChange('contactEmailOverride', event.target.value)}
          />
        </Field>
        <Field label="Meta title" error={fieldErrors.metaTitle}>
          <input
            className={inputClass}
            value={form.metaTitle}
            disabled={disabled}
            onChange={(event) => onChange('metaTitle', event.target.value)}
          />
        </Field>
        <Field label="OG title" error={fieldErrors.ogTitle}>
          <input
            className={inputClass}
            value={form.ogTitle}
            disabled={disabled}
            onChange={(event) => onChange('ogTitle', event.target.value)}
          />
        </Field>
      </div>
      <Field label="Meta description" error={fieldErrors.metaDescription}>
        <textarea
          className={inputClass}
          rows={3}
          value={form.metaDescription}
          disabled={disabled}
          onChange={(event) => onChange('metaDescription', event.target.value)}
        />
      </Field>
      <Field label="OG description" error={fieldErrors.ogDescription}>
        <textarea
          className={inputClass}
          rows={2}
          value={form.ogDescription}
          disabled={disabled}
          onChange={(event) => onChange('ogDescription', event.target.value)}
        />
      </Field>
      <Field label="Hero heading" error={fieldErrors.heroHeading}>
        <input
          className={inputClass}
          value={form.heroHeading}
          disabled={disabled}
          onChange={(event) => onChange('heroHeading', event.target.value)}
        />
      </Field>
      <Field label="Hero introduction" error={fieldErrors.heroIntroduction}>
        <textarea
          className={inputClass}
          rows={3}
          value={form.heroIntroduction}
          disabled={disabled}
          onChange={(event) => onChange('heroIntroduction', event.target.value)}
        />
      </Field>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Story label" error={fieldErrors.storyLabel}>
          <input
            className={inputClass}
            value={form.storyLabel}
            disabled={disabled}
            onChange={(event) => onChange('storyLabel', event.target.value)}
          />
        </Field>
        <Field label="Principles heading" error={fieldErrors.principlesHeading}>
          <input
            className={inputClass}
            value={form.principlesHeading}
            disabled={disabled}
            onChange={(event) => onChange('principlesHeading', event.target.value)}
          />
        </Field>
        <Field label="Story CTA label" error={fieldErrors.storyCtaLabel}>
          <input
            className={inputClass}
            value={form.storyCtaLabel}
            disabled={disabled}
            onChange={(event) => onChange('storyCtaLabel', event.target.value)}
          />
        </Field>
        <Field label="Story CTA href" error={fieldErrors.storyCtaHref}>
          <input
            className={inputClass}
            value={form.storyCtaHref}
            disabled={disabled}
            onChange={(event) => onChange('storyCtaHref', event.target.value)}
          />
        </Field>
      </div>
      <Field label="Story paragraphs (blank line between)" error={fieldErrors.storyParagraphsText}>
        <textarea
          className={inputClass}
          rows={8}
          value={form.storyParagraphsText}
          disabled={disabled}
          onChange={(event) => onChange('storyParagraphsText', event.target.value)}
        />
      </Field>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Rail label" error={fieldErrors.railLabel}>
          <input
            className={inputClass}
            value={form.railLabel}
            disabled={disabled}
            onChange={(event) => onChange('railLabel', event.target.value)}
          />
        </Field>
        <Field label="Enable logo strip" error={fieldErrors.clientsEnabled}>
          <select
            className={inputClass}
            value={form.clientsEnabled ? 'yes' : 'no'}
            disabled={disabled}
            onChange={(event) => onChange('clientsEnabled', event.target.value === 'yes')}
          >
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </Field>
      </div>
      <Field label="Clients heading" error={fieldErrors.clientsHeading}>
        <input
          className={inputClass}
          value={form.clientsHeading}
          disabled={disabled}
          onChange={(event) => onChange('clientsHeading', event.target.value)}
        />
      </Field>
      <Field label="Clients introduction" error={fieldErrors.clientsIntroduction}>
        <textarea
          className={inputClass}
          rows={2}
          value={form.clientsIntroduction}
          disabled={disabled}
          onChange={(event) => onChange('clientsIntroduction', event.target.value)}
        />
      </Field>
    </section>
  )
}
