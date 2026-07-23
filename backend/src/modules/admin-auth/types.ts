export type AdminLoginResult = {
  token: string
  expiresAt: string
  admin: {
    email: string
  }
}

export type AdminPinChallengeResult = {
  challengeId: string
  expiresAt: string
}

export type AdminPinChangeResult = {
  updated: true
}

export type AdminSessionPayload = {
  sub: string
  email: string
  exp: number
}
