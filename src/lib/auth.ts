import { currentUser } from '@clerk/nextjs/server'
import { User } from '@prisma/client'
import { redirect } from 'next/navigation'
import { cache } from 'react'
import prisma from './db'

/**
 * This function is a wrapper for server actions that require authentication.
 * It will check if the user is authenticated and if not, it will redirect to the login page.
 * It will also check if the user is authorized to access the action and if not, it will return an error.
 */
export const actionWithAuth = cache(
  <TArgs extends unknown[], TResult>(action: (user: User, ...args: TArgs) => Promise<TResult>) => {
    return async (...args: TArgs): Promise<TResult> => {
      const user = await currentUser()
      if (!user) {
        throw redirect('/sign-in')
      }

      const dbUser = await prisma.user.findUnique({
        where: { clerkId: user.id },
      })
      if (!dbUser) {
        throw redirect('/sign-in')
      }

      return action(dbUser, ...args)
    }
  },
)
