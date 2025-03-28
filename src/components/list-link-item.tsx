'use client'

import { Prisma } from '@prisma/client'
import Link from 'next/link'

import { getLink, getLinkFavicon, plural } from '@/lib/utils'
import { CopyButton } from './copy-button'
import { LinkOptions } from './link-options'

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { ArrowRightIcon, MousePointerClickIcon } from 'lucide-react'
import Image from 'next/image'
import { useBoolean } from 'usehooks-ts'
import AnalyticsDialog from './dialog/analytics-dialog'
import { Button } from './ui/button'

const formatDate = (date: Date) => {
  return date.toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  })
}
const formatFullDate = (date: Date) => {
  return date.toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  })
}

type Props = {
  link: Prisma.LinkGetPayload<{
    include: {
      accesses: true
    }
  }>
}

export function ListLinkItem({ link }: Props) {
  const analyticsDialogOpen = useBoolean(false)

  return (
    <div className='flex items-center px-4 py-2 border-b gap-4 last:border-b-0 hover:bg-muted/50'>
      <div className='flex items-center gap-4 flex-1 min-w-0'>
        <Image className='rounded-full shrink-0' src={getLinkFavicon(link.url)} alt='' width={32} height={32} />
        <div className='flex flex-col min-w-0 w-full'>
          <div className='font-bold max-w-full truncate'>{link.title}</div>
          <div className='flex gap-2 items-center w-full min-w-0'>
            <div className='flex items-center gap-2 min-w-0'>
              <Link
                href={getLink(link)}
                className='flex font-mono text-sm items-center min-w-0'
                target='_blank'
                rel='noopener noreferrer'
                prefetch={false}
              >
                <span className='truncate min-w-0 flex-1'>{link.slug}</span>
                <span className='shrink-0'>-{link.id}</span>
              </Link>
              <CopyButton label='Copiar URL' text={getLink(link)} />
              <ArrowRightIcon className='text-muted-foreground size-4 shrink-0' />
              <Link
                href={link.url}
                className='hover:underline decoration-muted-foreground underline-offset-2 text-sm truncate text-muted-foreground'
                target='_blank'
                rel='noopener noreferrer'
              >
                {link.url}
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className='flex items-center gap-4 shrink-0'>
        <div className='text-sm'>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>{formatDate(link.createdAt)}</TooltipTrigger>
              <TooltipContent>
                <p>{formatFullDate(link.createdAt)}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className='flex gap-2'>
          <Button size='sm' variant='outline' className='cursor-pointer shrink-0' onClick={analyticsDialogOpen.setTrue}>
            <MousePointerClickIcon />
            {link.accesses.length} {plural(link.accesses.length, 'clique', 'cliques')}
          </Button>
          <LinkOptions link={link} />
        </div>
      </div>
      <AnalyticsDialog state={analyticsDialogOpen} link={link} />
    </div>
  )
}
