'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from '@prisma/client'
import { RefreshCwIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'

import { generateSlug } from '@/actions/links/slug.actions'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog'
import { createLinkSchema, CreateLinkValues } from './create-form'

export type Props = {
  link: Link
  onSubmit: (values: CreateLinkValues) => void
}

export function EditLinkForm({ link, onSubmit }: Props) {
  const form = useForm({
    resolver: zodResolver(createLinkSchema),
    defaultValues: {
      slug: link.slug,
      title: link.title,
      redirectTo: link.url,
    },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2 text-left'>
        <DialogHeader>
          <DialogTitle>Editar link</DialogTitle>
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
          <Button type='submit'>Salvar</Button>
        </DialogFooter>
      </form>
    </Form>
  )
}
