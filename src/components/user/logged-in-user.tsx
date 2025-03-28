import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { SignInButton } from './sign-in-button'
import { SignOutButton } from './sign-out-button'
import { User } from './user'

export async function LoggedInUser() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (session) {
    return (
      <div className='flex items-center gap-2'>
        <User user={session.user} />
        <SignOutButton />
      </div>
    )
  }

  return (
    <div className='flex items-center gap-2'>
      <SignInButton />
    </div>
  )
}
