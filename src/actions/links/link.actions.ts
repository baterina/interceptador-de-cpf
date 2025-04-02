'use server'

import { revalidatePath } from 'next/cache'

import { generateSlug } from '@/actions/links/slug.actions'
import { generateId, normalizeSlug } from '@/lib/utils'
import { prisma } from '@/prisma'
import { z } from 'zod'
import { ownLinkMiddleware } from '../middleware/own-link.middleware'
import { validLinkMiddleware } from '../middleware/valid-link.middleware'
import { authedActionClient } from '../safe-action'
import { createLinkSchema } from '../schema'

export const createLink = authedActionClient
  .metadata({
    name: 'createLink',
  })
  .schema(createLinkSchema)
  .action(async ({ parsedInput: { slug, redirectTo, title }, ctx: { user } }) => {
    const finalSlug = slug ? normalizeSlug(slug) : await generateSlug().then(res => res!.data!)

    const link = await prisma.link.create({
      data: {
        id: generateId(),
        title,
        slug: finalSlug,
        url: redirectTo,
        authorId: user.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    })

    revalidatePath('/')

    return { data: link }
  })

export const updateLink = authedActionClient
  .metadata({
    name: 'updateLink',
  })
  .schema(createLinkSchema)
  .bindArgsSchemas([z.string().describe('id')])
  .use(validLinkMiddleware)
  .use(ownLinkMiddleware)
  .action(async ({ parsedInput: { slug, redirectTo, title }, ctx: { link } }) => {
    const finalSlug = slug ? normalizeSlug(slug) : await generateSlug().then(res => res!.data!)

    const updatedLink = await prisma.link.update({
      where: {
        id: link.id,
      },
      data: {
        title,
        slug: finalSlug,
        url: redirectTo,
        updatedAt: new Date(),
      },
    })

    revalidatePath('/')

    return { data: updatedLink }
  })

export const getLinks = authedActionClient
  .metadata({
    name: 'getLinks',
  })
  .action(async ({ ctx: { user } }) => {
    const links = await prisma.link.findMany({
      where: {
        authorId: user.id,
      },
      include: {
        accesses: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return links
  })

export const deleteLink = authedActionClient
  .metadata({
    name: 'deleteLink',
  })
  .bindArgsSchemas([z.string().describe('id')])
  .use(validLinkMiddleware)
  .use(ownLinkMiddleware)
  .action(async ({ ctx: { link } }) => {
    await prisma.link.delete({
      where: {
        id: link.id,
      },
    })

    revalidatePath('/')
  })
