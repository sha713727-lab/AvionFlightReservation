'use client'

import Button from '@/components/buttons/Button'
import NorthAmericanPhoneInput from '@/components/forms/NorthAmericanPhoneInput'
import { COPY } from '@/constants/copy'
import {
  CONTACT_FORM_FIELD_NAMES,
  CONTACT_FORM_SUBJECTS,
} from '@/modules/contact/constants'
import { useContactForm } from '@/modules/contact/hooks/useContactForm'
import { cn } from '@/utils/cn'

const inputClassName = cn(
  'w-full min-h-12 rounded-xl border border-border bg-section px-4 py-3 text-base text-text',
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

export default function ContactForm() {
  const { values, errors, formError, isSubmitting, isSuccess, setField, handleSubmit } =
    useContactForm()

  return (
    <form className="space-y-5" onSubmit={handleSubmit} noValidate>
      {formError ? (
        <p className="rounded-xl border border-error/20 bg-error/5 px-4 py-3 text-sm text-error" role="alert">
          {formError}
        </p>
      ) : null}

      {isSuccess ? (
        <div className="rounded-xl border border-accent/20 bg-accent/5 px-4 py-3" role="status">
          <p className="font-medium text-primary">{COPY.contactPage.formSuccessTitle}</p>
          <p className="mt-1 text-sm text-text-secondary">{COPY.contactPage.formSuccessDescription}</p>
        </div>
      ) : null}

      <div>
        <label htmlFor="contact-name" className="mb-2 block text-sm font-medium text-primary">
          {COPY.contactPage.formNameLabel}
        </label>
        <input
          id="contact-name"
          name={CONTACT_FORM_FIELD_NAMES.name}
          type="text"
          autoComplete="name"
          value={values.name}
          disabled={isSubmitting}
          placeholder={COPY.contactPage.formNamePlaceholder}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? 'contact-name-error' : undefined}
          className={inputClassName}
          onChange={(event) => setField(CONTACT_FORM_FIELD_NAMES.name, event.target.value)}
        />
        <FieldError id="contact-name-error" message={errors.name} />
      </div>

      <div>
        <label htmlFor="contact-email" className="mb-2 block text-sm font-medium text-primary">
          {COPY.contactPage.formEmailLabel}
        </label>
        <input
          id="contact-email"
          name={CONTACT_FORM_FIELD_NAMES.email}
          type="email"
          autoComplete="email"
          inputMode="email"
          value={values.email}
          disabled={isSubmitting}
          placeholder={COPY.contactPage.formEmailPlaceholder}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'contact-email-error' : undefined}
          className={inputClassName}
          onChange={(event) => setField(CONTACT_FORM_FIELD_NAMES.email, event.target.value)}
        />
        <FieldError id="contact-email-error" message={errors.email} />
      </div>

      <div>
        <label htmlFor="contact-phone" className="mb-2 block text-sm font-medium text-primary">
          {COPY.contactPage.formPhoneLabel}
        </label>
        <NorthAmericanPhoneInput
          id="contact-phone"
          name={CONTACT_FORM_FIELD_NAMES.phone}
          value={values.phone}
          disabled={isSubmitting}
          placeholder={COPY.contactPage.formPhonePlaceholder}
          aria-invalid={Boolean(errors.phone)}
          aria-describedby={errors.phone ? 'contact-phone-error' : undefined}
          className={inputClassName}
          onChange={(nextPhone) => setField(CONTACT_FORM_FIELD_NAMES.phone, nextPhone)}
        />
        <FieldError id="contact-phone-error" message={errors.phone} />
      </div>

      <div>
        <label htmlFor="contact-subject" className="mb-2 block text-sm font-medium text-primary">
          {COPY.contactPage.formSubjectLabel}
        </label>
        <select
          id="contact-subject"
          name={CONTACT_FORM_FIELD_NAMES.subject}
          value={values.subject}
          disabled={isSubmitting}
          aria-invalid={Boolean(errors.subject)}
          aria-describedby={errors.subject ? 'contact-subject-error' : undefined}
          className={inputClassName}
          onChange={(event) => setField(CONTACT_FORM_FIELD_NAMES.subject, event.target.value)}
        >
          <option value="">{COPY.contactPage.formSubjectPlaceholder}</option>
          {CONTACT_FORM_SUBJECTS.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
        <FieldError id="contact-subject-error" message={errors.subject} />
      </div>

      <div>
        <label htmlFor="contact-message" className="mb-2 block text-sm font-medium text-primary">
          {COPY.contactPage.formMessageLabel}
        </label>
        <textarea
          id="contact-message"
          name={CONTACT_FORM_FIELD_NAMES.message}
          rows={5}
          value={values.message}
          disabled={isSubmitting}
          placeholder={COPY.contactPage.formMessagePlaceholder}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'contact-message-error' : undefined}
          className={cn(inputClassName, 'min-h-32 resize-y')}
          onChange={(event) => setField(CONTACT_FORM_FIELD_NAMES.message, event.target.value)}
        />
        <FieldError id="contact-message-error" message={errors.message} />
      </div>

      <Button type="submit" variant="primary" size="lg" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? COPY.contactPage.formSubmittingCta : COPY.contactPage.formSubmitCta}
      </Button>
    </form>
  )
}
