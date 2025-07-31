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

export const getUserEntries = actionWithAuth(async (user, { limit }: { limit?: number }) => {
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

export const deleteEntry = actionWithAuth(async (user, entryId: string) => {
  const entry = await prisma.entry.findUnique({
    where: { id: entryId },
    select: { id: true, userId: true },
  })
  if (!entry) {
    throw new Error('Entry not found')
  }

  if (entry.userId !== user.id) {
    throw new Error('You are not allowed to delete this entry')
  }

  return await prisma.entry.delete({
    where: { id: entryId },
  })
})
