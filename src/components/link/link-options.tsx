'use client'

import { Prisma } from '@prisma/client'

import { MoreHorizontal } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { useBoolean } from 'usehooks-ts'
import AnalyticsDialog from '../dialog/analytics-dialog'
import { DeleteLinkDialog } from '../dialog/delete-link-dialog'
import { EditLinkDialog } from '../dialog/edit-link-dialog'
import { QrCodeDialog } from '../dialog/qr-code-dialog'

export type Props = {
  link: Prisma.LinkGetPayload<{
    include: {
      accesses: true
    }
  }>
}

export function LinkOptions({ link }: Props) {
  const deleteDialogOpen = useBoolean(false)
  const analyticsDialogOpen = useBoolean(false)
  const qrCodeDialogOpen = useBoolean(false)
  const editDialogOpen = useBoolean(false)

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='outline' size='icon' className='w-8 h-8'>
            <MoreHorizontal className='w-4 h-4' />
            <span className='sr-only'>Abrir menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>Opções</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={editDialogOpen.setTrue}>Editar link</DropdownMenuItem>
          <DropdownMenuItem onClick={analyticsDialogOpen.setTrue}>Ver estatísticas</DropdownMenuItem>
          <DropdownMenuItem onClick={qrCodeDialogOpen.setTrue}>QR Code</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className='text-destructive' onClick={deleteDialogOpen.setTrue}>
            Excluir link
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteLinkDialog state={deleteDialogOpen} linkId={link.id} />
      <AnalyticsDialog state={analyticsDialogOpen} link={link} />
      <QrCodeDialog state={qrCodeDialogOpen} link={link} />
      <EditLinkDialog state={editDialogOpen} link={link} />
    </>
  )
}
