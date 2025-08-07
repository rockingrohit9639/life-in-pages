import { Entry } from '@prisma/client'
import { generateObject } from 'ai'
import { google } from '@ai-sdk/google'
import { getLIPPrompt, LIP_SYSTEM_PROMPT } from '~/constants/ai'
import prisma from '~/lib/db'
import z from 'zod'

export async function generateChapter({
  entries,
  userId,
}: {
  entries: Pick<Entry, 'id' | 'content' | 'createdAt'>[]
  userId: string
}) {
  const book = await prisma.book.findUniqueOrThrow({
    where: { authorId: userId },
  })

  const { object } = await generateObject({
    model: google('models/gemini-2.0-flash-exp'),
    system: LIP_SYSTEM_PROMPT,
    prompt: getLIPPrompt({ entries, bookMood: book.mood }),
    schema: z.object({
      title: z.string().describe('The title for the chapter based on the entries used'),
      content: z.string().describe('The content for the chapter based on the entries used'),
    }),
  })

  await Promise.all([
    prisma.chapter.create({
      data: {
        userId,
        bookId: book.id,
        entriesUsed: { connect: entries.map((entry) => ({ id: entry.id })) },
        content: object.content,
        title: object.title,
      },
    }),
    prisma.entry.updateMany({
      where: { id: { in: entries.map((entry) => entry.id) } },
      data: { isUsed: true },
    }),
  ])
}
