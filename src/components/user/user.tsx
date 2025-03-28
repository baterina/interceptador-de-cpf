import type { User } from 'better-auth'
import Image from 'next/image'
import { Avatar, AvatarFallback } from '../ui/avatar'

export function User({ user }: { user: User }) {
  return (
    <div className='flex items-center gap-2 rounded-md bg-neutral-800 p-2 text-sm'>
      <Avatar className='size-6'>
        <Image src={user.image as string} width={24} height={24} alt={`${user.name}'s avatar`} />
        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <span>{user.name}</span>
    </div>
  )
}
