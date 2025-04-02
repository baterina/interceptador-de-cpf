import { normalizeSlug } from '@/lib/utils'
import { z } from 'zod'

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
