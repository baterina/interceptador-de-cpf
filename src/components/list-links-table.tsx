import { ExternalLink } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Prisma } from '@prisma/client'

import { getLink } from '@/lib/utils'
import { CopyButton } from './copy-button'
import { LinkOptions } from './link-options'
import { ScrollArea, ScrollBar } from './ui/scroll-area'

export type Props = {
  links: Prisma.LinkGetPayload<{
    include: {
      accesses: true
    }
  }>[]
}

export function ListLinksTable({ links }: Props) {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    })
  }

  return (
    <ScrollArea className='h-full w-full px-4 pb-4'>
      <div className='border rounded-md'>
        <Table>
          <TableHeader className='sticky top-0'>
            <TableRow>
              <TableHead className='w-[250px]'>Título</TableHead>
              <TableHead className='w-[100px]'>Slug</TableHead>
              <TableHead className='w-[300px]'>URL de destino</TableHead>
              <TableHead className='w-[100px] text-right'>Acessos</TableHead>
              <TableHead className='w-[120px]'>Criado em</TableHead>
              <TableHead className='w-[70px]'></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {links.map(link => (
              <TableRow key={link.id}>
                <TableCell className='font-medium'>{link.title}</TableCell>
                <TableCell>
                  <div className='flex items-center space-x-2'>
                    <Link
                      href={getLink(link)}
                      className='flex font-mono text-sm whitespace-nowrap'
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <span className='max-w-[300px] truncate'>{link.slug}</span>
                      <span>-{link.id}</span>
                    </Link>
                    <CopyButton label='Copiar URL' text={getLink(link)} />
                  </div>
                </TableCell>
                <TableCell className='max-w-[300px] truncate' title={link.url}>
                  <div className='flex items-center space-x-2'>
                    <span className='text-sm truncate text-muted-foreground'>{link.url}</span>
                    <Link href={link.url} target='_blank' rel='noopener noreferrer'>
                      <Button
                        variant='ghost'
                        type='button'
                        size='icon'
                        className='w-6 h-6 cursor-pointer'
                        title='Open destination URL'
                      >
                        <ExternalLink className='h-3.5 w-3.5' />
                        <span className='sr-only'>Abrir URL</span>
                      </Button>
                    </Link>
                  </div>
                </TableCell>
                <TableCell className='text-right'>{link.accesses.length} cliques</TableCell>
                <TableCell>{formatDate(link.createdAt)}</TableCell>
                <TableCell>
                  <LinkOptions link={link} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <ScrollBar orientation='horizontal' />
    </ScrollArea>
  )
}
