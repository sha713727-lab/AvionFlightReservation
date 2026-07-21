'use client'

import { HiEye, HiEyeOff } from 'react-icons/hi'
import { ADMIN_COPY } from '@/modules/admin/constants'

export default function AdminPasswordField({
  id,
  name,
  value,
  disabled,
  placeholder,
  invalid,
  describedBy,
  visible,
  onVisibleChange,
  onChange,
}) {
  return (
    <div
      className="admin-password-field"
      style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr) 2.75rem',
        alignItems: 'stretch',
        border: '1px solid var(--color-border)',
        borderRadius: '0.75rem',
        backgroundColor: 'var(--color-section)',
      }}
    >
      <input
        id={id}
        name={name}
        type={visible ? 'text' : 'password'}
        autoComplete="current-password"
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        aria-invalid={invalid}
        aria-describedby={describedBy}
        onChange={onChange}
        style={{
          width: '100%',
          minWidth: 0,
          border: 0,
          background: 'transparent',
          padding: '0.75rem 1rem',
          fontSize: '0.875rem',
          color: 'var(--color-text)',
          outline: 'none',
        }}
      />
      <button
        type="button"
        disabled={disabled}
        aria-label={visible ? ADMIN_COPY.hidePassword : ADMIN_COPY.showPassword}
        aria-pressed={visible}
        onClick={() => onVisibleChange(!visible)}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: 0,
          border: 0,
          borderLeft: '1px solid var(--color-border)',
          borderRadius: '0 0.75rem 0.75rem 0',
          background: 'transparent',
          color: 'var(--color-primary)',
          cursor: disabled ? 'not-allowed' : 'pointer',
          opacity: disabled ? 0.5 : 1,
        }}
      >
        {visible ? (
          <HiEyeOff size={20} aria-hidden />
        ) : (
          <HiEye size={20} aria-hidden />
        )}
      </button>
    </div>
  )
}
