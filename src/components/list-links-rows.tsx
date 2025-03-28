import { Prisma } from '@prisma/client'

import { ListLinkItem } from './list-link-item'
import { ScrollArea, ScrollBar } from './ui/scroll-area'

export type Props = {
  links: Prisma.LinkGetPayload<{
    include: {
      accesses: true
    }
  }>[]
}

export function ListLinksRows({ links }: Props) {
  return (
    <ScrollArea className='h-full px-4 pb-4 min-w-0 w-full'>
      <div className='border rounded-md w-full'>
        {links.map(link => (
          <ListLinkItem key={link.id} link={link} />
        ))}
      </div>
      <ScrollBar orientation='horizontal' />
      <ScrollBar orientation='vertical' />
    </ScrollArea>
  )
}
