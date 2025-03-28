import { useBoolean } from 'usehooks-ts'

import { updateLink } from '@/app/actions'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { isActionError } from '@/lib/utils'
import { Link } from '@prisma/client'
import { toast } from 'sonner'
import { CreateLinkValues } from '../form/create-form'
import { EditLinkForm } from '../form/edit-form'

export type Props = {
  state: ReturnType<typeof useBoolean>
  link: Link
}

export function EditLinkDialog({ state, link }: Props) {
  async function onSubmit(values: CreateLinkValues) {
    const result = await updateLink(link.id, values)

    if (!result) {
      return
    }

    if (isActionError(result)) {
      return toast.error(result.error)
    }

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
