import { useBoolean } from 'usehooks-ts'

import { deleteLink } from '@/app/actions'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

export type Props = {
  state: ReturnType<typeof useBoolean>
  linkId: string
}

export function DeleteLinkDialog({ state, linkId }: Props) {
  return (
    <AlertDialog open={state.value} onOpenChange={state.toggle}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
          <AlertDialogDescription>
            Essa ação não pode ser desfeita. Esse link será excluído e futuros acessos não serão mais possíveis.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Não, cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={() => deleteLink(linkId)}>Sim, excluir</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
