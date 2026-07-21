export type AdminLoginResult = {
  token: string
  expiresAt: string
  admin: {
    email: string
  }
}

export type AdminOtpChallengeResult = {
  challengeId: string
  expiresAt: string
  destinationHint: string
  resendAvailableAt: string
}

export type AdminSessionPayload = {
  sub: string
  email: string
  exp: number
}
