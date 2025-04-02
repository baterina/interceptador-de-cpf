import { LoggedInUser } from './logged-in-user'

export async function Navbar() {
  return (
    <div className='flex items-center justify-between w-full gap-2 p-2 window'>
      <div className='flex items-center gap-2'></div>
      <div className='flex items-center gap-2'>
        <LoggedInUser />
      </div>
    </div>
  )
}
