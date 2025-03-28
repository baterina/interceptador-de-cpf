import { BackgroundShapes } from '@/components/background-shapes'
import { Toaster } from '@/components/ui/sonner'
import { Navbar } from '@/components/user/navbar'
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Interceptador de CPF',
  description: 'Interceptador de CPF',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' className='dark'>
      <body className={`bg-neutral-950 antialiased`}>
        <BackgroundShapes />
        <main className='mx-auto flex h-screen max-w-7xl flex-col items-center justify-center gap-2 overflow-hidden xl:py-8'>
          <Navbar />

          <div className='w-full h-full p-2 overflow-hidden window'>{children}</div>
        </main>
        <Toaster position='bottom-center' richColors />
      </body>
    </html>
  )
}
