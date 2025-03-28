'use server'

import { CreateLinkValues } from '@/components/form/create-form'
import { auth } from '@/lib/auth'
import { generateId, generateNumber, isActionError, normalizeSlug } from '@/lib/utils'
import { prisma } from '@/prisma'
import { revalidatePath } from 'next/cache'
import { headers } from 'next/headers'
import fs from 'node:fs/promises'

export async function getSession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    return { error: 'User not authenticated' }
  }

  return { data: session }
}

export async function createLink({ slug, redirectTo, title }: CreateLinkValues) {
  const session = await getSession()

  if (isActionError(session)) {
    return session
  }

  const finalSlug = slug ? normalizeSlug(slug) : await generateSlug()

  const link = await prisma.link.create({
    data: {
      id: generateId(),
      title,
      slug: finalSlug,
      url: redirectTo,
      authorId: session.data.user.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  })

  revalidatePath('/')

  return { data: link }
}

export async function updateLink(id: string, { slug, redirectTo, title }: CreateLinkValues) {
  const session = await getSession()

  if (isActionError(session)) {
    return session
  }

  const link = await prisma.link.findUnique({
    where: {
      id,
    },
  })

  if (!link) {
    return { error: 'Link not found' }
  }

  if (link.authorId !== session.data.user.id) {
    return { error: 'Unauthorized' }
  }

  const finalSlug = slug ? normalizeSlug(slug) : await generateSlug()

  const updated = await prisma.link.update({
    where: {
      id,
    },
    data: {
      title,
      slug: finalSlug,
      url: redirectTo,
      updatedAt: new Date(),
    },
  })

  revalidatePath('/')

  return { data: link }
}

export async function getLinks() {
  const session = await getSession()

  if (isActionError(session)) {
    return session
  }

  const links = await prisma.link.findMany({
    where: {
      authorId: session.data.user.id,
    },
    include: {
      accesses: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return { data: links }
}

export async function deleteLink(id: string) {
  const session = await getSession()

  if (isActionError(session)) {
    return session
  }

  const link = await prisma.link.delete({
    where: {
      id,
    },
  })

  if (!link) {
    return { error: 'Link not found' }
  }

  revalidatePath('/')

  return { data: link }
}

export async function getData(fileName: string) {
  const path = process.cwd() + `/data/${fileName}.txt`
  const file = await fs.readFile(path, 'utf8')

  return file.toString().split('\n')
}

export async function generateSlug() {
  const names = await getData('names')
  const adjectives = await getData('adjectives')
  const objects = await getData('objects')

  const name = names[generateNumber({ max: names.length - 1 })]
  const adjective = adjectives[generateNumber({ max: adjectives.length - 1 })]
  const object = objects[generateNumber({ max: objects.length - 1 })]

  return normalizeSlug(`${name} ${adjective} ${object}`)
}
