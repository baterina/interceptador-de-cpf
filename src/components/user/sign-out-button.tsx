'use client'

import { authClient } from '@/lib/auth-client'
import { LogOutIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button } from '../ui/button'

export function SignOutButton() {
  const router = useRouter()

  async function signOut() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.refresh()
        },
      },
    })
  }

  return (
    <Button size='icon' variant='ghost' onClick={signOut}>
      <LogOutIcon />
    </Button>
  )
}
