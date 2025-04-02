'use client'

import { authClient } from '@/lib/auth-client'
import { actionClient } from '../safe-action'

export const signInAction = actionClient
  .metadata({
    name: 'signIn',
  })
  .action(async () => {
    return authClient.signIn.social({
      provider: 'discord',
    })
  })

export const signOutAction = actionClient
  .metadata({
    name: 'signOut',
  })
  .action(async () => {
    return authClient.signOut()
  })
