import QRCode from 'react-qr-code'
import { useBoolean } from 'usehooks-ts'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { getLink } from '@/lib/utils'
import { Link } from '@prisma/client'

export type Props = {
  state: ReturnType<typeof useBoolean>
  link: Link
}

export function QrCodeDialog({ state, link }: Props) {
  return (
    <Dialog open={state.value} onOpenChange={state.toggle}>
      <DialogContent className='w-fit'>
        <DialogHeader>
          <DialogTitle>QRCode</DialogTitle>
        </DialogHeader>
        <div className='p-4 bg-white'>
          <QRCode value={getLink(link)} />
        </div>
      </DialogContent>
    </Dialog>
  )
}
