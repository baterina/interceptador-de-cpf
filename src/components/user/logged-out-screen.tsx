import Image from 'next/image'

export default function LoggedOutScreen() {
  return (
    <div className='flex flex-col items-center justify-center h-full p-6'>
      <div className='flex flex-col items-center max-w-md text-center'>
        <Image src='/logged-out.svg' alt='Login illustration' width={240} height={240} className='mb-8' priority />

        <h2 className='mb-3 text-2xl font-bold'>Você não está logado!</h2>
        <p className='mb-6 text-muted-foreground'>Faça login para criar e gerenciar seus links</p>
      </div>
    </div>
  )
}
