'use client'

import { signOutAction } from '@/actions/auth/client.actions'
import { LogOutIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button } from '../ui/button'

export function SignOutButton() {
  const router = useRouter()

  return (
    <Button
      size='icon'
      variant='ghost'
      onClick={() =>
        signOutAction().then(() => {
          router.refresh()
        })
      }
    >
      <LogOutIcon />
    </Button>
  )
}
