'use server'

import { actionWithAuth } from '~/lib/auth'
import prisma from '~/lib/db'
import { CreateEntrySchema } from '~/schema/entry'

export const createEntry = actionWithAuth(async (user, data: CreateEntrySchema) => {
  return await prisma.entry.create({
    data: {
      content: data.content,
      user: { connect: { id: user.id } },
    },
  })
})
