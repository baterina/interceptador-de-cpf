import { useBoolean } from 'usehooks-ts'

import { updateLink } from '@/actions/links/link.actions'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Link } from '@prisma/client'
import { toast } from 'sonner'
import { CreateLinkValues } from '../form/create-form'
import { EditLinkForm } from '../form/edit-form'

export type Props = {
  state: ReturnType<typeof useBoolean>
  link: Link
}

export function EditLinkDialog({ state, link }: Props) {
  const update = updateLink.bind(null, link.id)
  async function onSubmit(values: CreateLinkValues) {
    const result = await update(values)

    state.setFalse()

    toast.success(`Link salvo com sucesso!`)
  }

  return (
    <Dialog open={state.value} onOpenChange={state.toggle}>
      <DialogContent>
        <EditLinkForm link={link} onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  )
}
