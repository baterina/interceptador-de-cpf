import { GithubIcon, SatelliteIcon } from 'lucide-react'
import Link from 'next/link'
import { Button } from '../ui/button'
import { LoggedInUser } from './logged-in-user'

export async function Navbar() {
  return (
    <div className='flex items-center w-full gap-2 p-2 window'>
      <div className='flex items-center font-bold gap-1 flex-1'>
        <span className='bg-[#3b5edc] w-15 h-10 inline-block p-2 text-xs rounded-sm'>CPF</span>
        <SatelliteIcon className='size-8' />
      </div>
      <div className='flex items-center gap-2 font-bold'>
        <Link href='https://github.com/baterina/interceptador-de-cpf' target='_blank' prefetch={false}>
          <Button type='button' size='icon' variant='outline'>
            <GithubIcon />
          </Button>
        </Link>
      </div>
      <span className='border-l border-neutral-700 w-px h-4' />
      <div className='flex items-center gap-2'>
        <LoggedInUser />
      </div>
    </div>
  )
}
