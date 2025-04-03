'use client'

import { useBoolean } from 'usehooks-ts'

import { createLink } from '@/actions/links/link.actions'
import { CreateLinkValues } from '@/actions/schema'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { isActionError } from '@/lib/utils'
import { PlusIcon } from 'lucide-react'
import { toast } from 'sonner'
import { CreateLinkForm } from '../form/create-form'
import { Button } from '../ui/button'

export function CreateLinkButton() {
  const openState = useBoolean(false)

  async function onSubmit(values: CreateLinkValues) {
    const result = await createLink(values)

    if (!result) {
      return
    }

    if (isActionError(result)) {
      return toast.error(result.error)
    }

    const link = result.data

    openState.setFalse()

    toast.success(`Link criado com sucesso!`)
  }

  return (
    <Dialog open={openState.value} onOpenChange={openState.toggle}>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon /> Criar novo link
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <CreateLinkForm onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  )
}
