'use server'

import { actionWithAuth } from '~/lib/auth'
import prisma from '~/lib/db'

export const getUserBook = actionWithAuth(async (user) => {
  const book = await prisma.book.findUniqueOrThrow({
    where: { authorId: user.id },
    include: {
      chapters: {
        select: { id: true, title: true, content: true },
      },
    },
  })

  return book
})
