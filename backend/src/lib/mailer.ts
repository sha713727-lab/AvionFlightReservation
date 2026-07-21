import type { Env } from '../config/env.js'
import type { AppLogger } from './logger.js'

type SendMailInput = {
  to: string
  subject: string
  text: string
  html: string
}

function hasSmtpConfig(env: Env): boolean {
  return Boolean(env.SMTP_HOST && env.SMTP_FROM)
}

function hasResendConfig(env: Env): boolean {
  return Boolean(env.RESEND_API_KEY && env.SMTP_FROM)
}

export function isMailConfigured(env: Env): boolean {
  return hasSmtpConfig(env) || hasResendConfig(env)
}

async function sendWithResend(env: Env, input: SendMailInput): Promise<void> {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: env.SMTP_FROM,
      to: [input.to],
      subject: input.subject,
      text: input.text,
      html: input.html,
    }),
  })

  if (!response.ok) {
    const body = await response.text()
    throw new Error(`Resend failed (${response.status}): ${body}`)
  }
}

async function sendWithSmtp(env: Env, input: SendMailInput): Promise<void> {
  const nodemailer = await import('nodemailer')
  const port = env.SMTP_PORT
  const transporter = nodemailer.default.createTransport({
    host: env.SMTP_HOST,
    port,
    secure: port === 465,
    auth:
      env.SMTP_USER && env.SMTP_PASS
        ? {
            user: env.SMTP_USER,
            pass: env.SMTP_PASS,
          }
        : undefined,
  })

  await transporter.sendMail({
    from: env.SMTP_FROM,
    to: input.to,
    subject: input.subject,
    text: input.text,
    html: input.html,
  })
}

export async function sendMail(
  env: Env,
  logger: AppLogger,
  input: SendMailInput,
): Promise<void> {
  if (hasResendConfig(env)) {
    await sendWithResend(env, input)
    return
  }

  if (hasSmtpConfig(env)) {
    await sendWithSmtp(env, input)
    return
  }

  if (env.NODE_ENV === 'development') {
    logger.warn(
      { to: input.to, subject: input.subject, text: input.text },
      'SMTP/Resend not configured — OTP email logged for local development only',
    )
    return
  }

  throw new Error('Mail delivery is not configured')
}

export function buildAdminOtpEmail(code: string): { subject: string; text: string; html: string } {
  const subject = 'Avion admin verification code'
  const text = `Your Avion admin verification code is ${code}. It expires in 5 minutes. If you did not request this, ignore this email.`
  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.5;color:#0f172a">
      <p>Your Avion admin verification code is:</p>
      <p style="font-size:28px;font-weight:700;letter-spacing:6px">${code}</p>
      <p>This code expires in 5 minutes.</p>
      <p>If you did not request this, ignore this email.</p>
    </div>
  `.trim()
  return { subject, text, html }
}
