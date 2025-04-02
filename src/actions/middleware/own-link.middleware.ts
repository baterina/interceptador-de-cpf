import { Link } from '@prisma/client'
import { createMiddleware } from 'next-safe-action'

export const ownLinkMiddleware = createMiddleware<{
  metadata: { name: string }
  ctx: {
    user: { id: string }
    link: Link
  }
}>().define(async ({ next, ctx }) => {
  if (ctx.link.authorId !== ctx.user.id) {
    throw new Error('Unauthorized')
  }

  return next({
    ctx: {
      ...ctx,
      link: {
        ...ctx.link,
        authorId: ctx.user.id,
      },
    },
  })
})
