'use client'

import { authClient } from '@/lib/auth-client'
import { LogInIcon } from 'lucide-react'
import { Button } from '../ui/button'

export function SignInButton() {
  async function signIn() {
    const result = await authClient.signIn.social({
      provider: 'discord',
    })
  }

  return (
    <Button onClick={signIn}>
      <LogInIcon />
      Login
    </Button>
  )
}
