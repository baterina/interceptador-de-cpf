import { createSafeActionClient, DEFAULT_SERVER_ERROR_MESSAGE } from 'next-safe-action'

import { Prisma } from '@prisma/client'
import { z, ZodError } from 'zod'
import { authMiddleware } from './middleware/auth.middleware'
import { DATABASE_ERROR_MESSAGE, VALIDATION_ERROR_MESSAGE } from './safe-action-helpers'

export const actionClient = createSafeActionClient({
  handleServerError(e) {
    if (e instanceof ZodError) {
      console.error(e.message)
      return VALIDATION_ERROR_MESSAGE
    } else if (
      e instanceof Prisma.PrismaClientInitializationError ||
      e instanceof Prisma.PrismaClientKnownRequestError ||
      e instanceof Prisma.PrismaClientUnknownRequestError ||
      e instanceof Prisma.PrismaClientValidationError
    ) {
      console.error(e.message)
      return DATABASE_ERROR_MESSAGE
    } else if (e instanceof Error) {
      return e.message
    }

    return DEFAULT_SERVER_ERROR_MESSAGE
  },
  defineMetadataSchema() {
    return z.object({
      name: z.string(),
    })
  },
})

export const authedActionClient = actionClient.use(authMiddleware)
