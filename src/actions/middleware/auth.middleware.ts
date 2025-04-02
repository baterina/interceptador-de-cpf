'use server'

import { auth } from '@/lib/auth'
import { createMiddleware } from 'next-safe-action'
import { headers } from 'next/headers'

export const authMiddleware = createMiddleware<{ metadata: { name: string } }>().define(async ({ next }) => {
  const result = await auth.api.getSession({
    headers: await headers(),
  })

  if (!result) {
    throw new Error('Unauthorized')
  }

  return next({
    ctx: {
      session: result.session,
      user: result.user,
    },
  })
})
