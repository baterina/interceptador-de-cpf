'use client'

import { signInAction } from '@/actions/auth/client.actions'
import { LogInIcon } from 'lucide-react'
import { Button } from '../ui/button'

export function SignInButton() {
  return (
    <Button onClick={() => signInAction()}>
      <LogInIcon />
      Login
    </Button>
  )
}
