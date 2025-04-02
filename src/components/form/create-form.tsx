'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { RefreshCwIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { generateSlug } from '@/actions/links/slug.actions'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { normalizeSlug } from '@/lib/utils'
import { useEffect } from 'react'
import { DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog'

export const createLinkSchema = z.object({
  slug: z
    .string()
    .max(100, { message: 'O identificador deve ter no máximo 100 caracteres' })
    .optional()
    .transform(value => (value ? normalizeSlug(value) : '')),
  title: z
    .string()
    .max(50, { message: 'O título deve ter no máximo 50 caracteres' })
    .nonempty({ message: 'Esse campo é obrigatório' }),
  redirectTo: z.string().url({ message: 'URL inválido' }).nonempty({ message: 'Esse campo é obrigatório' }),
})

export type CreateLinkValues = z.infer<typeof createLinkSchema>

export type Props = {
  onSubmit: (values: CreateLinkValues) => void
}

export function CreateLinkForm({ onSubmit }: Props) {
  const form = useForm({
    resolver: zodResolver(createLinkSchema),
    defaultValues: {
      slug: '',
      title: '',
      redirectTo: '',
    },
  })

  useEffect(() => {
    generateSlug()
      .then(res => res!.data!)
      .then(slug => form.setValue('slug', slug))
  }, [])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2 text-left'>
        <DialogHeader>
          <DialogTitle>Criar link</DialogTitle>
          <DialogDescription>Defina um título e o URL de destino do seu link</DialogDescription>
        </DialogHeader>
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>Esse será um identificador interno do seu link</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='redirectTo'
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL de destino</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>Esse será o URL que o link irá redirecionar</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='slug'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Identificador</FormLabel>
              <FormControl>
                <div className='flex items-center'>
                  <Input {...field} />
                  <Button
                    type='button'
                    size='icon'
                    variant='outline'
                    className='ml-2'
                    onClick={() =>
                      generateSlug()
                        .then(res => res!.data!)
                        .then(slug => form.setValue('slug', slug))
                    }
                  >
                    <RefreshCwIcon />
                  </Button>
                </div>
              </FormControl>
              <FormDescription>Esse será o identificador externo do seu link</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter>
          <Button type='submit'>Criar</Button>
        </DialogFooter>
      </form>
    </Form>
  )
}
