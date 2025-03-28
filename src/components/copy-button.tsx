'use client'

import { CopyCheckIcon, CopyIcon } from 'lucide-react'
import { useBoolean } from 'usehooks-ts'
import { Button } from './ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'

export type Props = {
  label: string
  text: string
}

export function CopyButton({ label, text }: Props) {
  const copied = useBoolean(false)

  async function copyToClipboard() {
    await navigator.clipboard.writeText(text)

    copied.setTrue()

    setTimeout(() => {
      copied.setFalse()
    }, 2000)
  }

  return (
    <TooltipProvider>
      <Tooltip open={copied.value}>
        <TooltipTrigger asChild>
          <Button
            type='button'
            variant='ghost'
            size='icon'
            className='size-3 cursor-pointer'
            onClick={() => copyToClipboard()}
          >
            {copied.value ? <CopyCheckIcon className='size3.5' /> : <CopyIcon className='size-3.5' />}
            <span className='sr-only'>{label}</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>Link copiado!</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
