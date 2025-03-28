import { createAuthClient } from 'better-auth/react'

export const authClient = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL! + process.env.BETTER_AUTH_PATH!, // the base url of your auth server
})
