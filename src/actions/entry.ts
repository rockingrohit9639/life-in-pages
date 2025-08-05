'use server'

import { endOfMonth, startOfMonth } from 'date-fns'
import { ENTRY_REQUIRED_AFTER_PREVIEW, ENTRY_REQUIRED_BEFORE_PREVIEW } from '~/constants/entry'
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

export const getEntryDatesOfMonth = actionWithAuth(async (user) => {
  const entriesInMonth = await prisma.entry.findMany({
    where: {
      userId: user.id,
      AND: [
        { createdAt: { gte: startOfMonth(new Date()) } },
        { createdAt: { lte: endOfMonth(new Date()) } },
      ],
    },
    select: {
      createdAt: true,
    },
  })

  return entriesInMonth.map((entry) => entry.createdAt)
})

export const getNextChapterProgress = actionWithAuth(async (user) => {
  const totalEntries = await prisma.entry.count({
    where: { userId: user.id, isUsed: false },
  })

  /** @TODO Check if user has generated the preview */
  const isPreviewGenerated = false

  if (isPreviewGenerated) {
    return {
      progress: Math.floor(Math.min((totalEntries / ENTRY_REQUIRED_AFTER_PREVIEW) * 100, 100)),
    }
  }

  return {
    progress: Math.floor(Math.min((totalEntries / ENTRY_REQUIRED_BEFORE_PREVIEW) * 100, 100)),
  }
})

function getTotalEntries(userId: string) {
  return prisma.entry.count({ where: { userId } })
}

async function getEntriesPerDay(userId: string) {
  const now = new Date()

  const entriesPerDay = await prisma.entry.aggregateRaw({
    pipeline: [
      {
        $match: {
          userId: { $oid: userId },
          createdAt: {
            $gte: { $date: startOfMonth(now) },
            $lte: { $date: endOfMonth(now) },
          },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$createdAt' },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ],
  })

  const _entriesPerDay = entriesPerDay as unknown as Array<{ _id: string; count: number }>

  return _entriesPerDay.map((entry) => ({
    date: entry._id,
    count: entry.count,
  }))
}

export const getHomePageData = actionWithAuth(async (user) => {
  const [totalEntries, entriesPerDay] = await Promise.all([
    getTotalEntries(user.id),
    getEntriesPerDay(user.id),
  ])

  return {
    totalEntries,
    entriesPerDay,
  }
})
