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

export const getUserEntries = actionWithAuth(async (user, limit: number = 5) => {
  return await prisma.entry.findMany({
    where: { userId: user.id },
    take: limit,
    orderBy: { createdAt: 'desc' },
  })
})

export const getUserTotalEntries = actionWithAuth(async (user) => {
  return await prisma.entry.count({
    where: { userId: user.id },
  })
})
