import { prisma } from '@/prisma'
import { redirect } from 'next/navigation'

import { parseLink } from '@/lib/utils'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { slug, id } = parseLink(request.url)

  const link = await prisma.link.findUnique({
    where: {
      id,
    },
  })

  if (!link) {
    return NextResponse.json(
      {
        error: 'Link not found',
      },
      {
        status: 404,
      }
    )
  }

  // prevent infinite loop
  const parsedRedirect = parseLink(link.url)

  if (id === parsedRedirect.id) {
    return NextResponse.json(
      {
        error: 'Link would cause infinite loop',
      },
      {
        status: 400,
      }
    )
  }

  await prisma.access.create({
    data: {
      linkId: link.id,
      createdAt: new Date(),
    },
  })

  return redirect(link.url)
}
