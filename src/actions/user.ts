'use server'

import { actionWithAuth } from '~/lib/auth'
import prisma from '~/lib/db'
import { OnboardUserSchema } from '~/schema/user'

export const onboardUser = actionWithAuth(async (user, data: OnboardUserSchema) => {
  await Promise.all([
    prisma.user.update({
      where: { id: user.id },
      data: {
        name: data.name,
        isOnboarded: true,
      },
    }),
    prisma.book.create({
      data: {
        title: data.bookTitle,
        mood: data.bookMood,
        isPublic: data.bookIsPublic,
        authorId: user.id,
      },
    }),
  ])
})

export const getCurrentUser = actionWithAuth(async (user) => user)
