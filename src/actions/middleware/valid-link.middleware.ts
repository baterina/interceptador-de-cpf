import { prisma } from '@/prisma'
import { createMiddleware } from 'next-safe-action'
import { z } from 'zod'

export const validLinkMiddleware = createMiddleware<{
  metadata: { name: string }
  ctx: {
    user: { id: string }
  }
}>().define(async ({ next, ctx, bindArgsClientInputs }) => {
  const args = z.string().parse(bindArgsClientInputs[0])
  const link = await prisma.link.findUnique({
    where: {
      id: args,
    },
  })

  if (!link) {
    throw new Error('Link not found')
  }

  return next({
    ctx: {
      ...ctx,
      link,
    },
  })
})
