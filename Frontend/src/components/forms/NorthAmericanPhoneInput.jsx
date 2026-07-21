'use client'

import {
  NORTH_AMERICAN_PHONE_PLACEHOLDER,
  extractNorthAmericanNationalDigits,
  formatNorthAmericanPhone,
  removeLastNorthAmericanDigit,
} from '@/utils/northAmericanPhone'
import { cn } from '@/utils/cn'

export default function NorthAmericanPhoneInput({
  id,
  name,
  value,
  disabled = false,
  placeholder = NORTH_AMERICAN_PHONE_PLACEHOLDER,
  className,
  'aria-invalid': ariaInvalid,
  'aria-describedby': ariaDescribedBy,
  onChange,
  onBlur,
}) {
  const handleChange = (event) => {
    onChange(formatNorthAmericanPhone(event.target.value))
  }

  const handleKeyDown = (event) => {
    if (disabled) return

    if (event.key === 'Backspace' || event.key === 'Delete') {
      event.preventDefault()
      const input = event.currentTarget
      const selectionLength = (input.selectionEnd ?? 0) - (input.selectionStart ?? 0)
      const national = extractNorthAmericanNationalDigits(value)

      if (selectionLength > 1 || national.length === 0) {
        if (national.length === 0) return
        if (selectionLength > 1) {
          onChange('+1 ')
        }
        return
      }

      onChange(removeLastNorthAmericanDigit(value))
    }
  }

  const handleFocus = (event) => {
    const current = String(value ?? '').trim()
    if (!current || current === '+1') {
      onChange('+1 ')
    }
    requestAnimationFrame(() => {
      const input = event.target
      const end = input.value.length
      input.setSelectionRange(end, end)
    })
  }

  const handlePaste = (event) => {
    event.preventDefault()
    const pasted = event.clipboardData.getData('text')
    onChange(formatNorthAmericanPhone(pasted))
  }

  return (
    <input
      id={id}
      name={name}
      type="tel"
      inputMode="numeric"
      autoComplete="tel-national"
      value={value || '+1 '}
      disabled={disabled}
      placeholder={placeholder}
      aria-invalid={ariaInvalid}
      aria-describedby={ariaDescribedBy}
      className={cn(className)}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      onFocus={handleFocus}
      onPaste={handlePaste}
      onBlur={onBlur}
    />
  )
}
