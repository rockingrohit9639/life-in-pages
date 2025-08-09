import { logger, task, wait } from '@trigger.dev/sdk/v3'
import { generateChapter } from '~/actions/ai'
import prisma from '~/lib/db'

type CreateChapterPayload = {
  userId: string
}

export const createChapterTask = task({
  id: 'create-chapter',
  run: async (payload: CreateChapterPayload) => {
    logger.log('Getting user entries')
    const notUsedEntries = await prisma.entry.findMany({
      where: { userId: payload.userId, isUsed: false },
      orderBy: { createdAt: 'asc' },
    })

    logger.log(`Found ${notUsedEntries.length} entries`)
    await generateChapter({
      entries: notUsedEntries,
      userId: payload.userId,
    })

    logger.log('Chapter created')
    return { message: 'Chapter created' }
  },
})
